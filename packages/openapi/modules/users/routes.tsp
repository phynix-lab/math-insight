import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/users")
@tag("Users")
interface Users {
  @get
  @doc("Danh sách tài khoản và quyền trong trung tâm (Admin).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          userId: "550e8400-e29b-41d4-a716-446655440101",
          displayName: "Thầy Nguyễn Minh Quân",
          phone: "0901234567",
          email: "quan.nguyen@mathinsight.vn",
          isActive: true,
          canReviewApplications: true,
          roles: #[AppRole.teacher],
          createdAt: utcDateTime.fromISO("2026-10-01T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-17T09:00:00Z"),
        },
        #{
          userId: "550e8400-e29b-41d4-a716-446655440102",
          displayName: "Cô Trần Thu Hà",
          phone: "0912345678",
          email: "ha.tran@mathinsight.vn",
          isActive: true,
          canReviewApplications: false,
          roles: #[AppRole.teacher],
          createdAt: utcDateTime.fromISO("2026-10-05T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-10T10:30:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 2 },
    },
  })
  list(...UserListQuery):
    | PaginatedResponse<UserProfile>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;

  @post
  @doc("Tạo tài khoản giáo viên hoặc quản trị viên mới (Admin).")
  create(@body body: CreateUserRequest):
    | ApiCreatedResponse<UserProfile>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | ConflictError;

  @patch
  @route("/me")
  @doc("Tự cập nhật tên hiển thị và số điện thoại của tài khoản đang đăng nhập.")
  updateMe(@body body: UpdateMyProfileRequest):
    | ApiResponse<UserProfile>
    | BadRequestError
    | UnauthorizedError;

  @get
  @doc("Xem chi tiết tài khoản theo userId (Admin hoặc chính user).")
  @opExample(#{
    parameters: #{ userId: "550e8400-e29b-41d4-a716-446655440101" },
    returnType: #{
      data: #{
        userId: "550e8400-e29b-41d4-a716-446655440101",
        displayName: "Thầy Nguyễn Minh Quân",
        phone: "0901234567",
        email: "quan.nguyen@mathinsight.vn",
        isActive: true,
        canReviewApplications: true,
        roles: #[AppRole.teacher],
        createdAt: utcDateTime.fromISO("2026-10-01T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-17T09:00:00Z"),
      },
    },
  })
  get(@path userId: Uuid):
    | ApiResponse<UserProfile>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @patch
  @doc("Admin cập nhật hồ sơ, trạng thái hoạt động hoặc cờ duyệt đơn (FR-012).")
  @opExample(#{
    parameters: #{
      userId: "550e8400-e29b-41d4-a716-446655440101",
      body: #{
        canReviewApplications: true,
      },
    },
    returnType: #{
      data: #{
        userId: "550e8400-e29b-41d4-a716-446655440101",
        displayName: "Thầy Nguyễn Minh Quân",
        phone: "0901234567",
        email: "quan.nguyen@mathinsight.vn",
        isActive: true,
        canReviewApplications: true,
        roles: #[AppRole.teacher],
        createdAt: utcDateTime.fromISO("2026-10-01T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-26T08:00:00Z"),
      },
    },
  })
  update(@path userId: Uuid, @body body: UpdateUserRequest):
    | ApiResponse<UserProfile>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @put
  @route("/{userId}/roles")
  @doc("Admin cập nhật danh sách vai trò; bị chặn gỡ role teacher nếu còn phụ trách lớp chưa inactive.")
  @opExample(#{
    parameters: #{
      userId: "550e8400-e29b-41d4-a716-446655440101",
      body: #{
        roles: #[AppRole.teacher],
      },
    },
    returnType: #{
      data: #{
        userId: "550e8400-e29b-41d4-a716-446655440101",
        displayName: "Thầy Nguyễn Minh Quân",
        phone: "0901234567",
        email: "quan.nguyen@mathinsight.vn",
        isActive: true,
        canReviewApplications: true,
        roles: #[AppRole.teacher],
        createdAt: utcDateTime.fromISO("2026-10-01T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-26T08:00:00Z"),
      },
    },
  })
  updateRoles(@path userId: Uuid, @body body: UpdateUserRolesRequest):
    | ApiResponse<UserProfile>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;
}
