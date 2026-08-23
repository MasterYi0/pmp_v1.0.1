'use server'

import { createClient } from '@/utils/supabase/server'

export async function getCourseAttachmentsData(courseSlug: string) {
  const supabase = await createClient()

  // 1. جلب تفاصيل الدورة (للعنوان مثلاً)
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('slug, title')
    .eq('slug', courseSlug)
    .maybeSingle()

  if (courseError) throw new Error(courseError.message)
  if (!course) throw new Error('الدورة غير موجودة')

  // 2. جلب المرفقات المرتبطة بهذه الدورة
  const { data: attachments, error: attachError } = await supabase
    .from('course_attachment')
    .select('*')
    .eq('course_slug', courseSlug)
    .order('order', { ascending: true })

  if (attachError) throw new Error(attachError.message)

  return {
    course,
    attachments: attachments || []
  }
}
