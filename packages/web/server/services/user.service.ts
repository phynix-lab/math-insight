import "server-only"

import type { CurrentUser } from "@/lib/api/generated/model/currentUser"
import type { UserProfile } from "@/lib/api/generated/model/userProfile"
import type { CreateUserRequest } from "@/lib/api/generated/model/createUserRequest"
import type { UpdateUserRequest } from "@/lib/api/generated/model/updateUserRequest"
import type { UpdateMyProfileRequest } from "@/lib/api/generated/model/updateMyProfileRequest"
import type { UsersListParams } from "@/lib/api/generated/model/usersListParams"
import type { AppRole } from "@/types/navigation"
import { userRepository } from "@/server/repositories/user.repository"
import { auditLogRepository } from "@/server/repositories/audit-log.repository"

export class UserServiceError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string
  ) {
    super(message)
    this.name = "UserServiceError"
  }
}

export const userService = {
  async listUsers(
    actorUser: CurrentUser,
    query?: UsersListParams
  ): Promise<{ data: UserProfile[]; total: number }> {
    if (!actorUser.roles.includes("admin")) {
      throw new UserServiceError(
        403,
        "FORBIDDEN",
        "Bạn không có quyền truy cập danh sách người dùng."
      )
    }
    return userRepository.listUsers(query)
  },

  async getUserById(
    actorUser: CurrentUser,
    userId: string
  ): Promise<UserProfile> {
    const isSelf = actorUser.userId === userId
    const isAdmin = actorUser.roles.includes("admin")

    if (!isSelf && !isAdmin) {
      throw new UserServiceError(
        403,
        "FORBIDDEN",
        "Bạn không có quyền xem thông tin tài khoản này."
      )
    }

    const user = await userRepository.findById(userId)
    if (!user) {
      throw new UserServiceError(
        404,
        "NOT_FOUND",
        "Không tìm thấy người dùng."
      )
    }

    return user
  },

  /**
   * AC 1: Tạo giáo viên với tên và email.
   * Tài khoản có role 'teacher', is_active = true, can_review_applications = false.
   */
  async createTeacher(
    actorUser: CurrentUser,
    data: CreateUserRequest
  ): Promise<UserProfile> {
    if (!actorUser.roles.includes("admin")) {
      throw new UserServiceError(
        403,
        "FORBIDDEN",
        "Chỉ Quản trị viên mới có quyền tạo tài khoản giáo viên."
      )
    }

    const existing = await userRepository.findByEmail(data.email)
    if (existing) {
      throw new UserServiceError(
        409,
        "EMAIL_ALREADY_EXISTS",
        "Email này đã được sử dụng trong hệ thống."
      )
    }

    // Đảm bảo AC 1: role teacher, can_review_applications = false nếu không chỉ định rõ
    const created = await userRepository.createTeacher({
      ...data,
      roles: data.roles && data.roles.length > 0 ? data.roles : ["teacher"],
      canReviewApplications: data.canReviewApplications ?? false,
    })

    await auditLogRepository.createLog({
      actorUserId: actorUser.userId,
      actorDisplayName: actorUser.displayName,
      action: "USER_CREATED",
      entityType: "profile",
      entityId: created.userId,
      beforeData: null,
      afterData: {
        email: created.email,
        displayName: created.displayName,
        roles: created.roles,
        canReviewApplications: created.canReviewApplications,
      },
      reason: `Tạo tài khoản giáo viên: ${created.displayName}`,
    })

    return created
  },

  /**
   * AC 2: Ghi audit_logs PROFILE_PRIVILEGE_CHANGED khi bật cờ duyệt đơn.
   * AC 3: Giáo viên cố đổi is_active hoặc can_review_applications của chính mình -> bị từ chối 403.
   * AC 5: Ngừng hoạt động giáo viên (is_active = false) -> không đăng nhập được nữa.
   */
  async updateUser(
    actorUser: CurrentUser,
    targetUserId: string,
    data: UpdateUserRequest
  ): Promise<UserProfile> {
    const isAdmin = actorUser.roles.includes("admin")

    // AC 3: Nếu không phải Admin mà cố đổi isActive hoặc canReviewApplications -> từ chối
    if (!isAdmin && (data.isActive !== undefined || data.canReviewApplications !== undefined)) {
      throw new UserServiceError(
        403,
        "FORBIDDEN",
        "Bạn không có quyền thay đổi trạng thái hoạt động hoặc quyền duyệt đơn."
      )
    }

    const currentProfile = await userRepository.findById(targetUserId)
    if (!currentProfile) {
      throw new UserServiceError(
        404,
        "NOT_FOUND",
        "Không tìm thấy người dùng."
      )
    }

    const privilegeChanged =
      data.canReviewApplications !== undefined &&
      data.canReviewApplications !== currentProfile.canReviewApplications

    const statusChanged =
      data.isActive !== undefined && data.isActive !== currentProfile.isActive

    const updated = await userRepository.updateProfile(targetUserId, data)
    if (!updated) {
      throw new UserServiceError(
        404,
        "NOT_FOUND",
        "Không thể cập nhật hồ sơ người dùng."
      )
    }

    // AC 2: Ghi bản ghi PROFILE_PRIVILEGE_CHANGED khi thay đổi cờ duyệt đơn
    if (privilegeChanged) {
      await auditLogRepository.createLog({
        actorUserId: actorUser.userId,
        actorDisplayName: actorUser.displayName,
        action: "PROFILE_PRIVILEGE_CHANGED",
        entityType: "profile",
        entityId: targetUserId,
        beforeData: {
          canReviewApplications: currentProfile.canReviewApplications,
        },
        afterData: {
          canReviewApplications: updated.canReviewApplications,
        },
        reason: `Admin thay đổi quyền duyệt đơn cho giáo viên ${updated.displayName} thành ${updated.canReviewApplications ? "Bật" : "Tắt"}.`,
      })
    }

    // Ghi log khi thay đổi trạng thái hoạt động (AC-5)
    if (statusChanged) {
      await auditLogRepository.createLog({
        actorUserId: actorUser.userId,
        actorDisplayName: actorUser.displayName,
        action: updated.isActive ? "USER_ACTIVATED" : "USER_DEACTIVATED",
        entityType: "profile",
        entityId: targetUserId,
        beforeData: { isActive: currentProfile.isActive },
        afterData: { isActive: updated.isActive },
        reason: `Admin đổi trạng thái tài khoản ${updated.displayName} thành ${updated.isActive ? "Hoạt động" : "Ngừng hoạt động"}.`,
      })
    }

    return updated
  },

  /**
   * AC 4: Given giáo viên đang phụ trách lớp chưa inactive, when admin gỡ role teacher,
   * then bị chặn kèm thông báo lý do.
   */
  async updateUserRoles(
    actorUser: CurrentUser,
    targetUserId: string,
    roles: AppRole[]
  ): Promise<UserProfile> {
    if (!actorUser.roles.includes("admin")) {
      throw new UserServiceError(
        403,
        "FORBIDDEN",
        "Chỉ Quản trị viên mới có quyền cập nhật vai trò người dùng."
      )
    }

    const currentProfile = await userRepository.findById(targetUserId)
    if (!currentProfile) {
      throw new UserServiceError(
        404,
        "NOT_FOUND",
        "Không tìm thấy người dùng."
      )
    }

    // Kiểm tra AC 4: nếu trước đó có role teacher và vai trò mới KHÔNG có role teacher
    const hadTeacherRole = currentProfile.roles.includes("teacher")
    const willHaveTeacherRole = roles.includes("teacher")

    if (hadTeacherRole && !willHaveTeacherRole) {
      const activeClassesCount =
        await userRepository.countActiveClassesByTeacher(targetUserId)

      if (activeClassesCount > 0) {
        throw new UserServiceError(
          409,
          "TEACHER_HAS_ACTIVE_CLASSES",
          `Không thể gỡ vai trò giáo viên vì người dùng đang phụ trách ${activeClassesCount} lớp học đang hoạt động. Vui lòng chuyển giao lớp trước khi gỡ vai trò.`
        )
      }
    }

    const updated = await userRepository.updateRoles(targetUserId, roles)
    if (!updated) {
      throw new UserServiceError(
        404,
        "NOT_FOUND",
        "Không thể cập nhật vai trò."
      )
    }

    await auditLogRepository.createLog({
      actorUserId: actorUser.userId,
      actorDisplayName: actorUser.displayName,
      action: "USER_ROLES_CHANGED",
      entityType: "profile",
      entityId: targetUserId,
      beforeData: { roles: currentProfile.roles },
      afterData: { roles: updated.roles },
      reason: `Admin cập nhật vai trò cho người dùng ${updated.displayName}: [${roles.join(", ")}].`,
    })

    return updated
  },

  /**
   * AC 3: Người dùng tự cập nhật thông tin cá nhân (chỉ tên hiển thị và số điện thoại).
   */
  async updateMyProfile(
    actorUser: CurrentUser,
    data: UpdateMyProfileRequest
  ): Promise<UserProfile> {
    const updated = await userRepository.updateProfile(actorUser.userId, {
      displayName: data.displayName,
      phone: data.phone,
    })

    if (!updated) {
      throw new UserServiceError(
        404,
        "NOT_FOUND",
        "Không tìm thấy hồ sơ người dùng."
      )
    }

    return updated
  },
}
