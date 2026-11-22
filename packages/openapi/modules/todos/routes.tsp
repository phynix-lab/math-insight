import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/todos")
@tag("Todos")
interface Todos {
  @get
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440001",
          title: "Ôn tập giải tích chương 1",
          description: "Làm 10 bài tập giới hạn hàm số và đạo hàm cơ bản",
          priority: TodoPriority.high,
          completed: false,
          createdAt: utcDateTime.fromISO("2026-11-20T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-20T08:30:00Z"),
        },
        #{
          id: "550e8400-e29b-41d4-a716-446655440002",
          title: "Hoàn thành bài tập đại số tuyến tính",
          description: "Giải hệ phương trình bằng phép khử Gauss và ma trận nghịch đảo",
          priority: TodoPriority.medium,
          completed: true,
          createdAt: utcDateTime.fromISO("2026-11-19T14:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-20T07:45:00Z"),
        },
        #{
          id: "550e8400-e29b-41d4-a716-446655440003",
          title: "Đọc tài liệu xác suất thống kê",
          description: "Tóm tắt phân phối chuẩn và định lý Bayes",
          priority: TodoPriority.low,
          completed: false,
          createdAt: utcDateTime.fromISO("2026-11-18T10:15:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-18T10:15:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 3 },
    },
  })
  list(...TodoListQuery): PaginatedResponse<Todo> | BadRequestError;

  @post
  create(@body body: CreateTodoRequest):
    | ApiCreatedResponse<IdPayload>
    | BadRequestError;

  @get
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440001" },
    returnType: #{
      data: #{
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Ôn tập giải tích chương 1",
        description: "Làm 10 bài tập giới hạn hàm số và đạo hàm cơ bản",
        priority: TodoPriority.high,
        completed: false,
        createdAt: utcDateTime.fromISO("2026-11-20T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-20T08:30:00Z"),
      },
    },
  })
  get(@path id: Uuid): ApiResponse<Todo> | NotFoundError;

  @patch
  update(@path id: Uuid, @body body: UpdateTodoRequest):
    | NoContentResponse
    | BadRequestError
    | NotFoundError;

  @delete
  delete(@path id: Uuid): NoContentResponse | NotFoundError;
}
