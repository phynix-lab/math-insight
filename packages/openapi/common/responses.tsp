import "@typespec/http";
import "./types.tsp";

using Http;

namespace Common;

model IdPayload {
  id: Uuid;
}

model ApiResponse<T> {
  data: T;
}

model ApiCreatedResponse<T> {
  @statusCode statusCode: 201;
  @body body: ApiResponse<T>;
}

model PageMeta {
  @minValue(1)
  page: int32;

  @minValue(1)
  limit: int32;

  @minValue(0)
  total: int32;
}

model PaginatedResponse<T> {
  data: T[];
  meta: PageMeta;
}

model PaginationQuery {
  @query
  @minValue(1)
  page?: int32 = 1;

  @query
  @minValue(1)
  @maxValue(100)
  limit?: int32 = 20;
}
