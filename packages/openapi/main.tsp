import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi";
import "@typespec/openapi3";
import "./modules/todos/index.tsp";

using Http;
using OpenAPI;

@service(#{ title: "Math Insight API" })
@info(#{ version: "1.0.0" })
@server("/api", "API base path")
namespace MathInsight;
