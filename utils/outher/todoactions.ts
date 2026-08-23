// "use server";

// import { revalidatePath } from "next/cache";
// import { todoRepository } from "../supabase/repositories/todoRepository";
// import { CreateTodoDTO, TodoUpdate } from "../supabase/models/todos";

// export async function createTodoAction(dto: CreateTodoDTO) {
//   await todoRepository.createTodo(dto);
//   revalidatePath("/todos"); // لتحديث البيانات في الصفحة فوراً
// }

// export async function updateTodoAction(id: string, dto: TodoUpdate) {
//   await todoRepository.updateTodo(id, dto);
//   revalidatePath("/todos");
// }

// export async function deleteTodoAction(id: string) {
//   await todoRepository.deleteTodo(id);
//   revalidatePath("/todos");
// }