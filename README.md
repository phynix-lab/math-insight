# Math Insight

Monorepo sử dụng pnpm workspace. Ứng dụng frontend (Next.js + shadcn/ui) nằm ở `packages/web`.

## Commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

## Adding shadcn components

```bash
pnpm --dir packages/web dlx shadcn@latest add button
```

This will place the ui components in `packages/web/components`.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
