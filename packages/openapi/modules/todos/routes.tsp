import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/todos")
@tag("Todos")
interface Todos {
  @get
  list(...TodoListQuery): PaginatedResponse<Todo> | BadRequestError;

  @post
  create(@body body: CreateTodoRequest):
    | ApiCreatedResponse<Todo>
    | BadRequestError;

  @get
  get(@path id: Uuid): ApiResponse<Todo> | NotFoundError;

  @patch
  update(@path id: Uuid, @body body: UpdateTodoRequest):
    | ApiResponse<Todo>
    | BadRequestError
    | NotFoundError;

  @delete
  delete(@path id: Uuid): NoContentResponse | NotFoundError;
}
