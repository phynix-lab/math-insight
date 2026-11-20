# Math Insight API

- **OpenAPI Version:** `3.2.0`
- **API Version:** `1.0.0`

## Contents

**Operations**

- [GET /todos](#scalar-operation-get-todos)
- [POST /todos](#scalar-operation-post-todos)
- [GET /todos/{id}](#scalar-operation-get-todosid)
- [PATCH /todos/{id}](#scalar-operation-patch-todosid)
- [DELETE /todos/{id}](#scalar-operation-delete-todosid)

**Schemas**

- [Common.ErrorBody](#scalar-schema-commonerrorbody)
- [Common.IdPayload](#scalar-schema-commonidpayload)
- [Common.PageMeta](#scalar-schema-commonpagemeta)
- [Common.Uuid](#scalar-schema-commonuuid)
- [Common.ValidationIssue](#scalar-schema-commonvalidationissue)
- [CreateTodoRequest](#scalar-schema-createtodorequest)
- [Todo](#scalar-schema-todo)
- [TodoPriority](#scalar-schema-todopriority)
- [UpdateTodoRequest](#scalar-schema-updatetodorequest)

<a id="scalar-context-global-servers"></a>

## Servers

- **URL:** `/api`
  - **Description:** API base path

## Tags

### Todos

## Operations

<a id="scalar-operation-get-todos"></a>

### GET /todos

- **Method:** `GET`
- **Path:** `/todos`
- **Operation ID:** `Todos_list`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`completed`**: `boolean`, explode: `false`
- **`priority`**: `string`, possible values: `"low", "medium", "high"`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [Todo](#scalar-schema-todo)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Ôn tập giải tích chương 1",
      "description": "Làm 10 bài tập giới hạn hàm số và đạo hàm cơ bản",
      "priority": "high",
      "completed": false,
      "createdAt": "2026-11-20T08:00:00Z",
      "updatedAt": "2026-11-20T08:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Hoàn thành bài tập đại số tuyến tính",
      "description": "Giải hệ phương trình bằng phép khử Gauss và ma trận nghịch đảo",
      "priority": "medium",
      "completed": true,
      "createdAt": "2026-11-19T14:00:00Z",
      "updatedAt": "2026-11-20T07:45:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "title": "Đọc tài liệu xác suất thống kê",
      "description": "Tóm tắt phân phối chuẩn và định lý Bayes",
      "priority": "low",
      "completed": false,
      "createdAt": "2026-11-18T10:15:00Z",
      "updatedAt": "2026-11-18T10:15:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 3
  }
}
```

##### 400 The server could not understand the request due to invalid syntax.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

<a id="scalar-example-1"></a>

**Generated example:**

```json
{
  "error": "",
  "details": [
    {
      "path": [
        ""
      ],
      "message": ""
    }
  ]
}
```

<a id="scalar-operation-post-todos"></a>

### POST /todos

- **Method:** `POST`
- **Path:** `/todos`
- **Operation ID:** `Todos_create`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateTodoRequest](#scalar-schema-createtodorequest)

<a id="scalar-example-2"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "medium",
  "completed": false
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [Common.IdPayload](#scalar-schema-commonidpayload)

<a id="scalar-example-3"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

##### 400 The server could not understand the request due to invalid syntax.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-todosid"></a>

### GET /todos/{id}

- **Method:** `GET`
- **Path:** `/todos/{id}`
- **Operation ID:** `Todos_get`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Todo](#scalar-schema-todo)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Ôn tập giải tích chương 1",
    "description": "Làm 10 bài tập giới hạn hàm số và đạo hàm cơ bản",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-11-20T08:00:00Z",
    "updatedAt": "2026-11-20T08:30:00Z"
  }
}
```

##### 404 The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-todosid"></a>

### PATCH /todos/{id}

- **Method:** `PATCH`
- **Path:** `/todos/{id}`
- **Operation ID:** `Todos_update`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateTodoRequest](#scalar-schema-updatetodorequest)

<a id="scalar-example-4"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "low",
  "completed": true
}
```

#### Responses

##### 204 There is no content to send for this request, but the headers may be useful.

##### 400, 404

- `400` The server could not understand the request due to invalid syntax.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-delete-todosid"></a>

### DELETE /todos/{id}

- **Method:** `DELETE`
- **Path:** `/todos/{id}`
- **Operation ID:** `Todos_delete`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 204 There is no content to send for this request, but the headers may be useful.

##### 404 The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

## Schemas

<a id="scalar-schema-commonerrorbody"></a>

### Common.ErrorBody

**Type:** `object`

- **`error` (required)**: `string`
- **`details`**: array of [Common.ValidationIssue](#scalar-schema-commonvalidationissue)

<a id="scalar-example-5"></a>

**Generated example:**

```json
{
  "error": "",
  "details": [
    {
      "path": [
        ""
      ],
      "message": ""
    }
  ]
}
```

<a id="scalar-schema-commonidpayload"></a>

### Common.IdPayload

**Type:** `object`

- **`id` (required)**: `string`, format: `uuid`

<a id="scalar-example-6"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-commonpagemeta"></a>

### Common.PageMeta

**Type:** `object`

- **`limit` (required)**: `integer`, format: `int32`, minimum: `1`
- **`page` (required)**: `integer`, format: `int32`, minimum: `1`
- **`total` (required)**: `integer`, format: `int32`, minimum: `0`

<a id="scalar-example-7"></a>

**Generated example:**

```json
{
  "page": 1,
  "limit": 1,
  "total": 0
}
```

<a id="scalar-schema-commonuuid"></a>

### Common.Uuid

**Type:** `string`, format: `uuid`

<a id="scalar-schema-commonvalidationissue"></a>

### Common.ValidationIssue

**Type:** `object`

- **`message` (required)**: `string`
- **`path` (required)**: `array`

  **Items:**

  **Any of:**
  - `string`
  - `integer`, format: `int32`

<a id="scalar-example-8"></a>

**Generated example:**

```json
{
  "path": [
    ""
  ],
  "message": ""
}
```

<a id="scalar-schema-createtodorequest"></a>

### CreateTodoRequest

**Type:** `object`

- **`title` (required)**: `string`, minLength: `1`, maxLength: `120`
- **`completed`**: `boolean`, default: `false`
- **`description`**: `string`, default: `""`, maxLength: `500`
- **`priority`**: `string`, possible values: `"low", "medium", "high"`, default: `"medium"`

<a id="scalar-example-9"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "medium",
  "completed": false
}
```

<a id="scalar-schema-todo"></a>

### Todo

**Type:** `object`

- **`completed` (required)**: `boolean`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`description` (required)**: `string`, maxLength: `500`
- **`id` (required)**: `string`, format: `uuid`
- **`priority` (required)**: `string`, possible values: `"low", "medium", "high"`
- **`title` (required)**: `string`, minLength: `1`, maxLength: `120`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-10"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "",
  "description": "",
  "priority": "low",
  "completed": true,
  "createdAt": "2026-11-20T06:46:28.915Z",
  "updatedAt": "2026-11-20T06:46:28.916Z"
}
```

<a id="scalar-schema-todopriority"></a>

### TodoPriority

**Type:** `string`, possible values: `"low", "medium", "high"`

<a id="scalar-schema-updatetodorequest"></a>

### UpdateTodoRequest

**Type:** `object`

- **`completed`**: `boolean`
- **`description`**: `string`, maxLength: `500`
- **`priority`**: `string`, possible values: `"low", "medium", "high"`
- **`title`**: `string`, minLength: `1`, maxLength: `120`

<a id="scalar-example-11"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "low",
  "completed": true
}
```
