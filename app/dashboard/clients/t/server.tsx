import {
  getCourseSectionsWithQuizzes,
  getQuizQuestions,
  getUserAttemptsForCourse,
} from './actions'
import { QuizzesClient } from './client'
import { getCurrentUserId } from '../../actions/dashboard_actions'

interface QuizzesServerProps {
  courseSlug: string
  quizId?: string
}

// export async function QuizzesServer({ courseSlug, quizId }: QuizzesServerProps) {
 
//   const userId = await getCurrentUserId();
//   const sections = await getCourseSectionsWithQuizzes(courseSlug)
//   const allQuizzes = sections.flatMap((s) => s.quizzes)

//   if (!allQuizzes.length) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400 text-sm">
//         لا توجد اختبارات متاحة لهذه الدورة بعد.
//       </div>
//     )
//   }

//   const initialQuiz = (quizId && allQuizzes.find((q) => String(q.id) === quizId)) || null

//   const allUserAttempts = await getUserAttemptsForCourse(userId, courseSlug)

//   const initialQuestions = initialQuiz ? await getQuizQuestions(initialQuiz.id) : []
//   const initialAttempts = initialQuiz
//     ? allUserAttempts.filter((a) => a.quiz_id === initialQuiz.id)
//     : []

//   return (
//     <QuizzesClient
//       sections={sections}
//       allQuizzes={allQuizzes}
//       initialQuiz={initialQuiz}
//       initialQuestions={initialQuestions}
//       initialAttempts={initialAttempts}
//       allUserAttempts={allUserAttempts}
//       userId={userId}
//       courseSlug={courseSlug}
//     />
//   )
// }
