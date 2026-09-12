// import { getCourseQuizzesData } from "../actions/quizzes"
// import { QuizPlayerClient } from "../clients/QuizPlayerClient"

// interface ServerQuizViewProps {
//   courseSlug: string
//   userId: string
//   locale: string
// }

// export async function ServerQuizView({ courseSlug, userId, locale }: ServerQuizViewProps) {
//   const { course, sections, initialQuiz, initialQuestions, passedQuizzesMap } = await getCourseQuizzesData(courseSlug, userId)

//   return (
//     <QuizPlayerClient 
//       course={course}
//       sections={sections}
//       initialQuiz={initialQuiz}
//       initialQuestions={initialQuestions}
//       initialPassedMap={passedQuizzesMap}
//       userId={userId}
//       locale={locale}
//     />
//   )
// }

// import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation'
// import { QuizzesClient } from '../clients/QuizPlayerClient'

// interface QuizzesServerProps {
//   courseSlug: string
//   userId: string
//   requestedQuizId?: string // إذا كان المستخدم ضغط على اختبار معين من الـ URL
// }

// export async function QuizzesServer({ courseSlug, userId, requestedQuizId }: QuizzesServerProps) {
//   const supabase = await createClient()

//   // 1. جلب أقسام الدورة مع الاختبارات التابعة لها
//   const { data: sections, error: sectionsError } = await supabase
//     .from('course_sections')
//     .select(`
//       id,
//       course_slug,
//       title_ar,
//       title_en,
//       order_index,
//       course_quiz (
//         id,
//         title,
//         duration_min,
//         passing_score,
//         instructions,
//         order
//       )
//     `)
//     .eq('course_slug', courseSlug)
//     .order('order_index', { ascending: true })

//   if (sectionsError || !sections || sections.length === 0) {
//     return <div className="p-8 text-white">لا توجد أقسام أو اختبارات لهذه الدورة.</div>
//   }

//   // تجميع كل الاختبارات في مصفوفة مسطحة لتسهيل البحث واختيار الافتراضي
//   const allQuizzes: any[] = []
//   sections.forEach(sec => {
//     if (sec.course_quiz) {
//       sec.course_quiz.forEach((q: any) => {
//         allQuizzes.push({ ...q, section_id: sec.id })
//       })
//     }
//   })

//   if (allQuizzes.length === 0) {
//     return <div className="p-8 text-white">لا توجد اختبارات مضافة لهذه الدورة بعد.</div>
//   }

//   // 2. جلب جميع محاولات المستخدم لهذه الدورة لمعرفة حالة كل اختبار (أخضر/رمادي) والهيستوري
//   const quizIds = allQuizzes.map(q => q.id)
//   const { data: userAttempts } = await supabase
//     .from('quiz_attempt')
//     .select('*')
//     .eq('user_id', userId)
//     .in('quiz_id', quizIds)
//     .order('created_at', { ascending: false })

//   // 3. تحديد الاختبار الحالي (Active Quiz)
//   // إذا طلب المستخدم اختبار معين نختاره، وإلا نبحث عن آخر محاولة نشطة أو آخر اختبار تم التفاعل معه، وإلا فأول اختبار.
//   let activeQuiz = allQuizzes[0]
//   if (requestedQuizId) {
//     const found = allQuizzes.find(q => q.id === requestedQuizId)
//     if (found) activeQuiz = found
//   } else if (userAttempts && userAttempts.length > 0) {
//     // ابحث عن اختبار له محاولة غير مغلقة (is_closed = false) أو آخر محاولة
//     const lastAttempt = userAttempts[0]
//     const found = allQuizzes.find(q => q.id === lastAttempt.quiz_id)
//     if (found) activeQuiz = found
//   }

//   // 4. جلب أسئلة بنك الأسئلة للاختبار النشط حالياً
//   const { data: quizQuestions } = await supabase
//     .from('quiz_questions')
//     .select(`
//       order,
//       questions_bank (
//         id,
//         type,
//         question,
//         options
//       )
//     `)
//     .eq('quiz_id', activeQuiz.id)
//     .order('order', { ascending: true })

//   const formattedQuestions = quizQuestions?.map((item: any) => ({
//     order: item.order,
//     ...item.questions_bank
//   })) || []

//   // تصفية محاولات الاختبار النشط الحالي فقط لعرضها في الهيستوري تحت الاختبار
//   const currentQuizAttempts = userAttempts?.filter(att => att.quiz_id === activeQuiz.id) || []

//   return (
//     <QuizzesClient
//       sections={sections}
//       allQuizzes={allQuizzes}
//       initialQuiz={activeQuiz}
//       initialQuestions={formattedQuestions}
//       initialAttempts={currentQuizAttempts}
//       allUserAttempts={userAttempts || []}
//       userId={userId}
//       courseSlug={courseSlug}
//     />
//   )
// }