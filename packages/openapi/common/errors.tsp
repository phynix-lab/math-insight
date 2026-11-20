import "@typespec/http";

using Http;

namespace Common;

model ValidationIssue {
  path: (string | int32)[];
  message: string;
}

model ErrorBody {
  error: string;
  details?: ValidationIssue[];
}

@error
model BadRequestError {
  @statusCode statusCode: 400;
  @body body: ErrorBody;
}

@error
model UnauthorizedError {
  @statusCode statusCode: 401;
  @body body: ErrorBody;
}

@error
model ForbiddenError {
  @statusCode statusCode: 403;
  @body body: ErrorBody;
}

@error
model NotFoundError {
  @statusCode statusCode: 404;
  @body body: ErrorBody;
}

@error
model ConflictError {
  @statusCode statusCode: 409;
  @body body: ErrorBody;
}
