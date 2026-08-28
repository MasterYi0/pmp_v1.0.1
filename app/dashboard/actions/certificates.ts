'use server'

import { createClient } from '@/utils/supabase/server'

export async function getCourseAttachments(courseSlug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_attachments')
    .select('*')
    .eq('course_slug', courseSlug)
    .order('order_index', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function getUserCertificates(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_enrollments')
    .select(`
      *,
      courses (*)
    `)
    .eq('user_id', userId)
    .eq('is_completed', true)

  if (error) throw new Error(error.message)
  return data
}


export async function getCertificateData(courseSlug: string, userId: string) {
  const supabase = await createClient()

  // 1. جلب بيانات الدورة
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseSlug)
    .single()

  if (courseError) throw new Error(courseError.message)

  // 2. التحقق هل أصدر الشهادة مسبقاً؟
  const { data: certificate } = await supabase
    .from('user_certificates')
    .select('*')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  // 3. حساب نسبة إنجاز الفيديوهات والاختبارات للتأكد من استحقاق الشهادة
  // (نفس المنطق الذي بنيناه سابقاً في الداشبورد)
  const { data: sections } = await supabase
    .from('course_sections')
    .select('id, course_lessons(id)')
    .eq('course_slug', courseSlug)
const lessonIds: string[] = []
  sections?.forEach(s => {
    s.course_lessons?.forEach((l: any) => lessonIds.push(l.id))
  })
  const totalLessons = lessonIds.length
let completedLessons = 0
  if (totalLessons > 0) {
    const { data: watched } = await supabase
      .from('user_video_progress')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('is_complete', true) // التأكد من اسم العمود الصحيح
      .in('lesson_id', lessonIds)

    completedLessons = watched?.length || 0
  }

  const videoProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // الاختبارات
  const { data: quizzes } = await supabase
    .from('course_quiz')
    .select('id')
    .eq('course_slug', courseSlug)

const quizIds = quizzes?.map(q => q.id) || []
  const totalQuizzes = quizIds.length
// 6. جلب محاولات الاختبارات الناجحة الخاصة بهذه الاختبارات فقط
  let passedQuizzesCount = 0
  if (totalQuizzes > 0) {
    const { data: attempts } = await supabase
      .from('quiz_attempt') // أو quiz_attempts حسب جدولك
      .select('quiz_id')
      .eq('user_id', userId)
      .eq('is_passed', true)
      .in('quiz_id', quizIds)

    // حساب الاختبارات الفريدة التي نجح فيها المستخدم
    const passedSet = new Set(attempts?.map(a => a.quiz_id))
    passedQuizzesCount = passedSet.size
  }

  const quizProgress = totalQuizzes > 0 ? Math.round((passedQuizzesCount / totalQuizzes) * 100) : 0 // إذا لم تكن هناك اختبارات تعتبر مكتملة افتراضياً
  // const quizProgress = totalQuizzes > 0 ? Math.round((totalQuizzes / totalQuizzes) * 100) : 0
// console.log("video process",videoProgress,"quiz process",quizProgress,"completedLessons",completedLessons,"ateempts", certificate,totalLessons, totalQuizzes, passedQuizzesCount)
  return {
    course,
    certificate,
    progress: {
      videoProgress,
      quizProgress,
      isEligible: videoProgress === 100 && quizProgress === 100
    }
  }
}

export async function issueCertificateAction(userId: string, courseSlug: string, recipientName: string) {
  const supabase = await createClient()

  // التأكد من عدم إصدارها مسبقاً
  const { data: existing } = await supabase
    .from('user_certificates')
    .select('id')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)
    .maybeSingle()

  if (existing) {
    throw new Error('تم اصدار الشهادة مسبقاً لهذه الدورة')
  }

  const { data, error } = await supabase
    .from('user_certificates')
    .insert({
      user_id: userId,
      course_slug: courseSlug,
      recipient_name: recipientName,
      issued_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}