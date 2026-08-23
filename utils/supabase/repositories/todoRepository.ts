// import { createClient } from "@/utils/supabase/server";
// import { CreateTodoDTO, TodoReadDTO } from "../models/todos";

// export const todoRepository = {
//   // 1. جلب المهام وتحويلها لشكل الـ DTO
//   async getTodoCards(): Promise<TodoReadDTO[]> {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//       .from("todo")
//       .select("id, title, created_at") // نختار فقط الحقول التي يتوقعها الـ DTO لتقليل استهلاك الشبكة
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Repository Error [getTodoCards]:", error.message);
//       throw new Error(error.message);
//     }

//     // عمل Mapping للبيانات القادمة لضمان مطابقتها للـ DTO
//     return (data as TodoReadDTO[]) ?? [];
//   },

//   // 2. إضافة مهمة جديدة باستخدام DTO الإدخال
//   async createTodo(dto: CreateTodoDTO): Promise<TodoReadDTO> {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//       .from("todo")
//       .insert([dto]) // الـ DTO هنا مطابق تماماً لما يحتاجه الـ CLI للإدخال
//       .select()
//       .single(); // جلب الكائن المضاف بمفرده وليس داخل مصفوفة

//     if (error) {
//       console.error("Repository Error [createTodo]:", error.message);
//       throw new Error(error.message);
//     }

//     return data as TodoReadDTO;
//   },
// // 3. تعديل مهمة
//   async updateTodo(id: string, dto: TodoUpdate): Promise<TodoReadDTO> {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//       .from("todo")
//       .update(dto)
//       .eq("id", id)
//       .select("id, title, created_at")
//       .single();

//     if (error) throw new Error(error.message);
//     return data as TodoReadDTO;
//   },

//   // 4. حذف مهمة
//   async deleteTodo(id: string): Promise<void> {
//     const supabase = await createClient();

//     const { error } = await supabase
//       .from("todo")
//       .delete()
//       .eq("id", id);

//     if (error) throw new Error(error.message);
//   }

// };