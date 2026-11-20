import { SuspenseWrapper } from "@/components/SuspenseWrapper"
import { AddTodo } from "@/features/todos/AddTodo/AddTodo"
import { TodoList } from "@/features/todos/TodoList/TodoList"

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-8 px-5 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Todo manager
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Danh sách công việc
        </h1>
        <p className="text-sm text-muted-foreground">
          Tạo, cập nhật trạng thái và xóa công việc qua API Todos được generate.
        </p>
      </header>

      <AddTodo />

      <section aria-labelledby="todos-heading">
        <SuspenseWrapper
          fallback={
            <p className="text-sm text-muted-foreground">
              Đang tải công việc...
            </p>
          }
        >
          <TodoList />
        </SuspenseWrapper>
      </section>
    </main>
  )
}
