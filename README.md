# Math Insight

Monorepo ứng dụng **Math Insight** xây dựng theo kiến trúc **Contract-First API** sử dụng `pnpm` workspace.

## Công nghệ chính

- **API Contract (`packages/openapi`)**: TypeSpec, OpenAPI 3.1, Scalar (`@scalar/openapi-to-markdown`)
- **Frontend (`packages/web`)**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4
- **UI & Form**: shadcn/ui (`base-nova` trên `@base-ui/react`), Lucide Icons, React Hook Form, Zod v4
- **Data Fetching & Mock**: TanStack React Query v5, Orval (codegen hooks + Zod schemas + MSW handlers), MSW v3

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
│       ├── server/           # Tầng BFF phía server (services, repositories, utils)
│       └── types/            # Zod schemas dùng chung và schemas sinh bởi Orval
├── docs/openapi/             # File OpenAPI JSON & Markdown sinh tự động từ TypeSpec
└── math-insight.code-workspace # Cấu hình workspace, extension và tasks cho VS Code
```

## Yêu cầu môi trường

- **Node.js** `>= 22` (khuyến nghị Node 26 LTS)
- **pnpm** `12.21.0` (có thể bật tự động qua Corepack)

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

- **Extensions khuyến nghị**: Prettier, ESLint, TypeSpec.
- **Tasks dựng sẵn** (`Ctrl+Shift+P` → `Tasks: Run Task`): `Web: Dev`, `Web: Dev (Mock)`, `API: Sync All (TypeSpec -> Orval)`, `Workspace: Typecheck`, `Workspace: Lint`, `Workspace: Format`, `Workspace: Build`.
