// import Link from 'next/link';
// import { getCurrentUserId } from '../actions/dashboard_actions';
// import {
//   getCourseSectionsWithQuizzes,
//   getQuizQuestions,
//   getUserAttemptsForCourse,
// } from './actions'
// import { QuizzesClient } from './client'
// import { getLocale } from 'next-intl/server';

// interface QuizzesServerProps {
//   courseSlug: string
//   quizId?: string
// }

// export async function QuizzesServer({ courseSlug, quizId }: QuizzesServerProps) {
//   const loc = await getLocale();
//   const userId = await getCurrentUserId();
//   const sections = await getCourseSectionsWithQuizzes(courseSlug)
//   const allQuizzes = sections.flatMap((s) => s.quizzes)

//   if (!allQuizzes.length) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400 text-xl">
       
//       <Link href="/dashboard">{loc === 'ar' ? 'لا يوجد محتوى متاح - العودة إلى لوحة التحكم' : 'No Content Available - Back to Dashboard'}</Link>
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