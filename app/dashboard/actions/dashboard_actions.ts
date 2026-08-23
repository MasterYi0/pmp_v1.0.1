'use server'

import { createClient } from '@/utils/supabase/server' // أو الطريقة المعتمدة لديك لربط سوبابيز بالسيرفر

export async function getDashboardData(userId: string) {
  const supabase = await createClient()



  // 1. جلب الاشتراكات والدورات النشطة
  const { data: enrollments, error: enrollError } = await supabase
    .from('user_enrollment')
    .select(`
     *,
      courses (
        *,
        course_sections (
          id,
          course_lessons (id)
        ),
        course_quiz (
          id,
          passing_score
        )
      )
    `)
    .eq('user_id', userId)

  if (enrollError) throw new Error(enrollError.message)
// 2. جلب إجمالي الفيديوهات المكتملة لهذا المستخدم
  const { data: watchedLessons } = await supabase
    .from('user_video_progress')
    .select('lesson_id, is_complete')
    .eq('user_id', userId)
    .eq('is_complete', true)

    const watchedSet = new Set(watchedLessons?.filter(w => w.is_complete).map(w => w.lesson_id) || [])
  // 2. إحصائيات الشهادات
  const certificatesCount = enrollments.filter(e => e.is_complete).length
  const activeCoursesCount = enrollments.length

  // 3. إحصائيات الاختبارات (أعلى نتيجة لكل اختبار دخلها المستخدم)
  const { data: attempts, error: attemptsError } = await supabase
    .from('quiz_attempt')
    .select('quiz_id, score, is_passed, is_closed')
    .eq('user_id', userId)
    .eq('is_closed', true)

  if (attemptsError) throw new Error(attemptsError.message)

  // تصفية للحصول على أعلى نتيجة لكل اختبار منفرد
  const bestAttemptsMap = new Map()
  attempts?.forEach(att => {
    const currentBest = bestAttemptsMap.get(att.quiz_id)
    if (!currentBest || att.score > currentBest.score) {
      bestAttemptsMap.set(att.quiz_id, att)
    }
  })



// 4. معالجة الدورات وحساب نسب التقدم المزدوج لكل دورة
  const processedEnrollments = enrollments.map(enrollment => {
    const course = enrollment.courses
    
    // أ. حساب إجمالي دروس الدورة والدروس المكتملة
    let totalLessons = 0
    let completedLessons = 0

    course.course_sections?.forEach((section: any) => {
      section.course_lessons?.forEach((lesson: any) => {
        totalLessons++
        if (watchedSet.has(lesson.id)) {
          completedLessons++
        }
      })
    })

    const progressVideo = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    // ب. حساب إجمالي اختبارات الدورة والاختبارات التي نجح فيها
    const totalQuizzes = course.course_quizzes?.length || 0
    let passedQuizzes = 0

    course.course_quizzes?.forEach((quiz: any) => {
      const bestAttempt = bestAttemptsMap.get(quiz.id)
      if (bestAttempt && bestAttempt.is_passed) {
        passedQuizzes++
      }
    })

    const progressQuiz = totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 100

    return {
      ...enrollment,
      progressVideo,
      progressQuiz
    }
  })







  
  let passedQuizzes = 0
  let failedQuizzes = 0
  bestAttemptsMap.forEach(att => {
    if (att.is_passed) passedQuizzes++
    else failedQuizzes++
  })

  // الاختبارات المعلقة أو التي لم تكتمل بعد
  const { count: pendingQuizzesCount } = await supabase
    .from('quiz_attempts')
    .select('*', { count: 'exact', head: true })
       .eq('user_id', userId)
       .eq('is_closed', false)

  // 4. جلب الكورسات التي لسه لم يترك فيها المستخدم (قسم المزيد)
  const enrolledSlugs = enrollments.map(e => e.course_slug)
  let otherCoursesQuery = supabase.from('courses').select('*')
  if (enrolledSlugs.length > 0) {
    otherCoursesQuery = otherCoursesQuery.not('slug', 'in', `(${enrolledSlugs.join(',')})`)
  }
  const { data: otherCourses } = await otherCoursesQuery

  return {
    stats: {
      activeCoursesCount,
      certificatesCount,
      quizAnalytics: {
        totalTaken: bestAttemptsMap.size,
        passed: passedQuizzes,
        failed: failedQuizzes,
        pending: pendingQuizzesCount || 0
      }
    },
    enrolledCourses: processedEnrollments,
    moreCourses: otherCourses || []
  }
}

export async function getCurrentUserId() {
  const supabase = await createClient()

  // جلب المستخدم الحالي بشكل آمن
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("Unauthorized: User is not logged in")
  }

  return user.id
}
