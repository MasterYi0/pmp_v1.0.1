'use server'

import { createClient } from '@/utils/supabase/server'

// السكاشن والدروس التابعة للدورة
export async function getCourseVideoContent(courseSlug: string, userId: string) {
  const supabase = await createClient()

  // جلب الأقسام والدروس التابعة للدورة
  const { data: sections, error } = await supabase
    .from('course_sections')
    .select(`
      *,
      course_lessons (*)
    `)
    .eq('course_slug', courseSlug)
    .order('order_index', { ascending: true })

  if (error) throw new Error(error.message)

  // جلب التقدم الخاص بالمستخدم لهذه الدروس
  const { data: progress } = await supabase
    .from('user_video_progress')
    .select('*')
    .eq('user_id', userId)

  return { sections, progress: progress || [] }
}
// تحديث التقدم الخاص بالمستخدم
export async function toggleLessonCompletion(userId: string, lessonId: string, isCompleted: boolean) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('user_video_progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      is_complete: isCompleted,
      last_seen: new Date().toISOString()
    }, { onConflict: 'user_id,lesson_id' })
    .select()

  if (error) throw new Error(error.message)
  return data[0]
}

export async function getLastWatchedLesson(userId: string, courseSlug: string) {
  const supabase = await createClient()

  // البحث عن آخر درس تفاعل معه المستخدم في هذه الدورة
  const { data, error } = await supabase
    .from('user_video_progress')
    .select(`
      *,
      course_lessons!inner (
        id,
        title_ar,
        title_en,
        duration,
        section_id,
        course_sections!inner (
          course_slug
        )
      )
    `)
    .eq('user_id', userId)
    .eq('course_lessons.course_sections.course_slug', courseSlug)
    .order('last_seen', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) return null
  return data?.course_lessons || null
}

export async function getCourseVideoDetails(courseSlug: string, userId: string) {
  const supabase = await createClient()

  // 1. جلب بيانات الدورة
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseSlug)
   .maybeSingle()

  if (courseError) throw new Error(courseError.message)
  if (!course) throw new Error('الدورة غير موجودة')
  // if (!course) throw new Error(courseSlug.toString())
  // 2. جلب الأقسام والدروس المرتبطة بالدورة مرتبة
  const { data: sections, error: sectionsError } = await supabase
    .from('course_sections')
    .select(`
      *,
      course_lessons (*)
    `)
    .eq('course_slug', courseSlug)
    .order('order_index', { ascending: true })

  if (sectionsError) throw new Error(sectionsError.message)

  // 3. جلب التقدم الخاص بالمستخدم لهذه الدورة
  const { data: progress, error: progressError } = await supabase
    .from('user_video_progress')
    .select('*')
    .eq('user_id', userId)

  if (progressError) throw new Error(progressError.message)

  // 4. تحديد الدرس الافتراضي (آخر درس تفاعل معه، أو الدرس الأول في القسم الأول)
  // const watchedMap = new Map(progress?.map(p => [p.lesson_id, p]) || [])
  
  let targetLesson = null

  // البحث عن آخر درس شاهدة المستخدم وتفاعل معه
  const { data: lastWatched } = await supabase
    .from('user_video_progress')
    .select(`
      *,
      course_lessons!inner (
        *,
        course_sections!inner (course_slug)
      )
    `)
    .eq('user_id', userId)
    .eq('course_lessons.course_sections.course_slug', courseSlug)
    .order('last_seen', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (lastWatched && lastWatched.course_lessons) {
    targetLesson = lastWatched.course_lessons
  } else if (sections && sections.length > 0 && sections[0].course_lessons && sections[0].course_lessons.length > 0) {
    // إذا لم يكن هناك سجل سابق، خذ أول درس في أول قسم
    targetLesson = sections[0].course_lessons[0]
  }

  return {
    course,
    sections,
    progress: progress || [],
    initialLesson: targetLesson
  }
}