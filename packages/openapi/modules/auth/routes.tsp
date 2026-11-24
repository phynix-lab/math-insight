import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../users/enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/auth")
@tag("Auth")
interface Auth {
  @post
  @route("/login")
  @doc("Đăng nhập bằng email và mật khẩu (FR-001).")
  @opExample(#{
    parameters: #{
      body: #{
        email: "admin@mathinsight.edu.vn",
        password: "password123",
      },
    },
    returnType: #{
      data: #{
        user: #{
          userId: "550e8400-e29b-41d4-a716-446655440001",
          email: "admin@mathinsight.edu.vn",
          displayName: "Nguyễn Quốc Huy",
          phone: "0901234567",
          isActive: true,
          canReviewApplications: true,
          roles: #[AppRole.admin],
          studentId: null,
        },
        expiresAt: utcDateTime.fromISO("2026-11-29T00:00:00Z"),
      },
    },
  })
  login(@body body: LoginRequest):
    | ApiResponse<AuthSession>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;

  @post
  @route("/logout")
  @doc("Đăng xuất và hủy phiên làm việc hiện tại (FR-001).")
  logout(): NoContentResponse | UnauthorizedError;

  @post
  @route("/refresh")
  @doc("Làm mới phiên đăng nhập bằng refresh cookie.")
  refresh(): ApiResponse<AuthSession> | UnauthorizedError;

  @get
  @route("/me")
  @doc("Lấy thông tin tài khoản, vai trò và hồ sơ học sinh liên kết của người dùng hiện tại.")
  @opExample(#{
    returnType: #{
      data: #{
        userId: "550e8400-e29b-41d4-a716-446655440101",
        email: "quan.nguyen@mathinsight.vn",
        displayName: "Thầy Nguyễn Minh Quân",
        phone: "0901234567",
        isActive: true,
        canReviewApplications: true,
        roles: #[AppRole.teacher],
        studentId: null,
      },
    },
  })
  me(): ApiResponse<CurrentUser> | UnauthorizedError;
}
