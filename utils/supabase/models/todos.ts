import { Database } from "./todo";

// استخراج الأنواع الأساسية من ملف الـ CLI تلقائياً
export type TodoRow = Database['public']['Tables']['todo']['Row'];
export type TodoInsert = Database['public']['Tables']['todo']['Insert'];
export type TodoUpdate = Database['public']['Tables']['todo']['Update'];

/**
 * 1. DTO الخاص بواجهة العرض (List/Card)
 * نأخذ فقط الحقول التي تهم المستخدم لقراءتها
 */
export interface TodoReadDTO {
  id: TodoRow['id'];
  title: TodoRow['title'];
  created_at: TodoRow['created_at']; // تأكد من اسم الحقل في جدولك (سواء status أو is_completed)
}

/**
 * 2. DTO الخاص ببيانات الإدخال (Form)
 * نعتمد على الـ Insert المولد من الـ CLI لأنه يعرف الحقول الإلزامية والاختيارية في قاعدة البيانات
 */
export type CreateTodoDTO = TodoInsert;