import Link from 'next/link'
import { getCurrentUserId } from '../actions/dashboard_actions'
import {
  getCourseSectionsWithQuizzes,
  getQuizQuestions,
  getUserAttemptsForCourse,
} from './actions'
import { QuizzesClient } from './client'
import { getLocale } from 'next-intl/server'

interface QuizzesServerProps {
  courseSlug: string
  quizId?: string
}

export async function QuizzesServer({ courseSlug, quizId }: QuizzesServerProps) {
  const loc = await getLocale()
  const userId = await getCurrentUserId()

  // Sections come back already ordered (order_index), and the quizzes inside
  // each section are ordered by course_quiz.order — so this flat list keeps
  // the exact same order the sidebar shows.
  const sections = await getCourseSectionsWithQuizzes(courseSlug)
  const allQuizzes = sections.flatMap((s) => s.quizzes)

  if (!allQuizzes.length) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 px-4 text-center text-xl text-slate-500 dark:bg-slate-950 dark:text-slate-400">
        <Link
          href="/dashboard"
          className="underline-offset-4 transition-colors hover:text-violet-600 hover:underline dark:hover:text-violet-400"
        >
          {loc === 'ar'
            ? 'لا يوجد محتوى متاح - العودة إلى لوحة التحكم'
            : 'No Content Available - Back to Dashboard'}
        </Link>
      </div>
    )
  }

  const initialQuiz = (quizId && allQuizzes.find((q) => String(q.id) === quizId)) || null

  // Includes OPEN attempts (is_closed = false) — the client uses them to decide
  // between "Start" (no open attempt) and "Resume" (paused attempt exists).
  const allUserAttempts = await getUserAttemptsForCourse(userId, courseSlug)

  const initialQuestions = initialQuiz ? await getQuizQuestions(initialQuiz.id) : []
  const initialAttempts = initialQuiz
    ? allUserAttempts.filter((a) => a.quiz_id === initialQuiz.id)
    : []

  return (
    <QuizzesClient
      sections={sections}
      allQuizzes={allQuizzes}
      initialQuiz={initialQuiz}
      initialQuestions={initialQuestions}
      initialAttempts={initialAttempts}
      allUserAttempts={allUserAttempts}
      userId={userId}
      courseSlug={courseSlug}
    />
  )
}
