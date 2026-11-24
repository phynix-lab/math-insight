# Math Insight

Monorepo ứng dụng **Math Insight** xây dựng theo kiến trúc **Contract-First API** sử dụng `pnpm` workspace.

## Công nghệ chính

- **API Contract (`packages/openapi`)**: TypeSpec, OpenAPI 3.1, Scalar (`@scalar/openapi-to-markdown`)
- **Frontend (`packages/web`)**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4
- **UI & Form**: shadcn/ui (`base-nova` trên `@base-ui/react`), Lucide Icons, React Hook Form, Zod v4
- **Data Fetching & Mock**: TanStack React Query v5, Orval (codegen hooks + Zod schemas + MSW handlers), MSW v3
- **Database & ORM**: PostgreSQL (`citext`), Prisma 7 (`@prisma/adapter-pg`, `pg`)

## Cấu trúc thư mục

```text
math-insight/
├── packages/
│   ├── openapi/              # Nguồn định nghĩa API bằng TypeSpec (.tsp)
│   └── web/                  # Ứng dụng Next.js App Router
│       ├── app/              # Pages, layouts và Next.js Route Handlers
│       ├── components/       # UI primitives (shadcn), form fields, providers, SuspenseWrapper
│       ├── features/         # UI nghiệp vụ chia theo domain
│       ├── lib/api/          # customFetch và React Query hooks/MSW sinh bởi Orval
│       ├── mocks/            # Cấu hình MSW browser worker & handlers
│       ├── prisma/           # Prisma schema (schema.prisma) và lịch sử SQL migrations
│       ├── server/           # Tầng BFF phía server (db/prisma.ts, services, repositories, utils)
│       └── types/            # Zod schemas dùng chung và schemas sinh bởi Orval
├── docs/openapi/             # File OpenAPI JSON & Markdown sinh tự động từ TypeSpec
└── math-insight.code-workspace # Cấu hình workspace, extension và tasks cho VS Code
```

## Yêu cầu môi trường

- **Node.js** `>= 22` (khuyến nghị Node 26 LTS)
- **pnpm** `12.21.0` (có thể bật tự động qua Corepack)
- **PostgreSQL** `>= 15` hỗ trợ extension `citext` (khi chạy migrate hoặc tắt mock API)

```bash
corepack enable
```

## Cài đặt source

1. Clone repository:

```bash
git clone https://github.com/phynix-lab/math-insight.git
cd math-insight
```

2. Cài đặt dependencies cho toàn bộ workspace:

```bash
pnpm install
```

## Cách chạy dự án

### Chạy môi trường phát triển (Dev)

```bash
pnpm dev
```

Ứng dụng chạy tại `http://localhost:3000`.

- **Chế độ Mock API (MSW)**: Mặc định `packages/web/.env.development` bật sẵn `ENABLE_MOCK=true`, mọi request `/api/*` sẽ được MSW trả về dữ liệu mẫu sinh từ `@opExample` trong TypeSpec.
- **Tắt Mock API** (gọi backend / Next.js Route Handler thật):

```bash
ENABLE_MOCK=false pnpm dev
```

### Build và chạy production

```bash
pnpm build
pnpm start
```

### Đồng bộ API Contract (TypeSpec → OpenAPI → Orval)

Khi thêm hoặc chỉnh sửa endpoint/model trong `packages/openapi/`, chạy tuần tự 2 lệnh sau để biên dịch OpenAPI và sinh lại hooks, Zod schemas, MSW mocks cho web:

```bash
pnpm --filter @math-insight/openapi build
pnpm --filter @math-insight/web generate:api
```

> Lưu ý: Không chỉnh sửa thủ công các file trong `docs/openapi/`, `packages/web/lib/api/generated/` và `packages/web/types/generated/`.

## Database & Migration (Prisma)

Prisma được cấu hình trực tiếp trong `packages/web` với 3 môi trường tách biệt (`development`, `staging`, `production`) thông qua biến `APP_ENV` tại `packages/web/prisma.config.ts`.

### 1. Cấu hình biến môi trường (`DATABASE_URL`)

Tạo file env cục bộ từ các file mẫu (file `.env*` thật đã được gitignore, không commit):

```bash
cp packages/web/.env.development.example packages/web/.env.development.local
# Tùy chọn nếu cần chạy migration/Studio tới staging hoặc prod từ máy cá nhân:
cp packages/web/.env.staging.example packages/web/.env.staging.local
cp packages/web/.env.production.example packages/web/.env.production.local
```

Điền `DATABASE_URL` và thông tin tài khoản quản trị vào từng file:

```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>?schema=public"
ADMIN_EMAIL="admin@mathinsight.edu.vn"
ADMIN_PASSWORD="<MAT_KHAU_ADMIN_TOI_THIEU_8_KY_TU>"
```

Thứ tự ưu tiên nạp biến môi trường của Prisma CLI (`packages/web/prisma.config.ts`):

- Biến `DATABASE_URL` đã có sẵn trong môi trường (CI/CD, server deploy, shell) **luôn ưu tiên cao nhất**.
- `APP_ENV=development` (mặc định): đọc `.env.development.local` → `.env.development` → `.env.local` → `.env`.
- `APP_ENV=staging`: chỉ đọc `.env.staging.local` → `.env.staging`.
- `APP_ENV=production`: chỉ đọc `.env.production.local` → `.env.production`.

> `staging` và `production` cố tình không đọc `.env` / `.env.local` để tránh chạy nhầm migration vào DB dev.

### 2. Chuẩn bị PostgreSQL local (môi trường Dev)

Nếu dùng PostgreSQL cài trực tiếp trên Linux (mặc định user `postgres` chưa đặt mật khẩu), tạo mật khẩu và database dev trước khi migrate:

```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '<MAT_KHAU>';"
sudo -u postgres createdb math_insight_dev
```

Cập nhật `<MAT_KHAU>` tương ứng vào `packages/web/.env.development.local` (nếu mật khẩu có ký tự đặc biệt như `@`, `#`, `:`, `/`, `?`, `%`, cần URL-encode, ví dụ `@` → `%40`).

### 3. Các lệnh Migration & Prisma Studio

| Lệnh | Mục đích |
| --- | --- |
| `pnpm db:migrate:dev` | Áp dụng (hoặc tạo mới) migration cho DB **dev** (`APP_ENV=development`) |
| `pnpm db:migrate:staging` | Áp dụng các migration đã có lên **staging** bằng `prisma migrate deploy` |
| `pnpm db:migrate:prod` | Áp dụng các migration đã có lên **production** bằng `prisma migrate deploy` |
| `pnpm db:seed:dev` | Tạo/cập nhật tài khoản admin trên **dev** (đọc `ADMIN_PASSWORD` từ env; tương tự `db:seed:staging`, `db:seed:prod`) |
| `pnpm db:seed:demo` | Nạp admin + tài khoản mẫu (`teacher`, `student`, `inactive.teacher`) và dữ liệu demo vào **dev** (chặn chạy trên `production`) |
| `pnpm db:generate` | Sinh lại Prisma Client vào `packages/web/server/db/generated/` (tự chạy sau `pnpm install`) |
| `pnpm --filter @math-insight/web db:validate` | Kiểm tra cú pháp `packages/web/prisma/schema.prisma` |
| `pnpm --filter @math-insight/web db:studio:dev` | Mở Prisma Studio kết nối DB dev (tương tự `db:studio:staging`, `db:studio:prod`) |

> Chỉ dùng `prisma migrate deploy` (`db:migrate:staging` / `db:migrate:prod`) trên staging và production; không chạy `migrate dev` hay `migrate reset` trên môi trường chia sẻ.

### 4. Quy trình thay đổi schema

1. Sửa `packages/web/prisma/schema.prisma`.
2. Tạo và chạy migration ở dev:
   ```bash
   pnpm --filter @math-insight/web exec prisma migrate dev --name <ten_migration>
   ```
   Nếu cần SQL đặc thù PostgreSQL (như `VIEW`, `SEQUENCE`, trigger, partial index mà Prisma không tự sinh): thêm cờ `--create-only`, chỉnh sửa file `migration.sql` sinh ra trong `packages/web/prisma/migrations/`, sau đó chạy `pnpm db:migrate:dev`.
3. Commit cả `packages/web/prisma/schema.prisma` và thư mục `packages/web/prisma/migrations/` (không commit `packages/web/server/db/generated/`).

### 5. Lỗi thường gặp khi migrate

- **`P1000: Authentication failed`**: `DATABASE_URL` vẫn là giá trị mẫu, sai user/password, hoặc mật khẩu chứa ký tự đặc biệt chưa URL-encode. Kiểm tra file `.env.<env>.local` / `.env.<env>` đang được ưu tiên nạp.
- **Lỗi quyền `CREATE EXTENSION citext`**: User DB cần quyền tạo extension, hoặc nhờ admin chạy trước `CREATE EXTENSION IF NOT EXISTS "citext";` trên database đích.

### Các lệnh kiểm tra chất lượng

| Lệnh | Mô tả |
| --- | --- |
| `pnpm typecheck` | Kiểm tra kiểu TypeScript (`packages/web`) và TypeSpec (`packages/openapi`) |
| `pnpm lint` | Kiểm tra quy tắc mã nguồn bằng ESLint |
| `pnpm format` | Tự động định dạng file `.ts`/`.tsx` bằng Prettier |
| `pnpm --filter @math-insight/openapi format` | Định dạng các file TypeSpec (`.tsp`) |
| `pnpm build` | Build toàn bộ package trong monorepo |

## Thêm component shadcn/ui

```bash
pnpm --dir packages/web dlx shadcn@latest add button
```

Component mới sẽ được tạo trong `packages/web/components/ui/` và import qua alias:

```tsx
import { Button } from "@/components/ui/button"
```

## Sử dụng với VS Code

Mở file `math-insight.code-workspace` trong VS Code để nhận sẵn:

- **Extensions khuyến nghị**: Prettier, ESLint, TypeSpec, Prisma.
- **Tasks dựng sẵn** (`Ctrl+Shift+P` → `Tasks: Run Task`): `Web: Dev`, `Web: Dev (Mock)`, `API: Sync All (TypeSpec -> Orval)`, `DB: Generate Client`, `DB: Validate Schema`, `DB: Migrate (Dev)`, `DB: Migrate Deploy (Staging)`, `DB: Migrate Deploy (Prod)`, `DB: Seed Admin (Dev/Staging/Prod)`, `DB: Seed Demo Data (Dev)`, `DB: Studio (Dev/Staging/Prod)`, `Workspace: Typecheck`, `Workspace: Lint`, `Workspace: Format`, `Workspace: Build`.
