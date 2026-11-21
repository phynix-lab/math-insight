import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi";
import "@typespec/openapi3";
import "./modules/todos/index.tsp";
import "./modules/auth/index.tsp";
import "./modules/users/index.tsp";
import "./modules/classes/index.tsp";
import "./modules/students/index.tsp";
import "./modules/applications/index.tsp";
import "./modules/sessions/index.tsp";
import "./modules/attendance/index.tsp";
import "./modules/dashboard/index.tsp";
import "./modules/audit-logs/index.tsp";

using Http;
using OpenAPI;

@service(#{ title: "Math Insight API" })
@info(#{ version: "1.0.0" })
@server("/api", "API base path")
namespace MathInsight;
