import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model Todo {
  id: Uuid;

  @minLength(1)
  @maxLength(120)
  title: string;

  @maxLength(500)
  description: string;

  priority: TodoPriority;
  completed: boolean;
  ...Timestamps;
}

model TodoListQuery {
  ...PaginationQuery;

  @query
  completed?: boolean;

  @query
  priority?: TodoPriority;
}

model CreateTodoRequest {
  @minLength(1)
  @maxLength(120)
  title: string;

  @maxLength(500)
  description?: string = "";

  priority?: TodoPriority = TodoPriority.medium;
  completed?: boolean = false;
}

model UpdateTodoRequest {
  @minLength(1)
  @maxLength(120)
  title?: string;

  @maxLength(500)
  description?: string;

  priority?: TodoPriority;
  completed?: boolean;
}
