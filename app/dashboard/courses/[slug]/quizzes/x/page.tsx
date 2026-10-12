// import { ServerQuizView } from "@/app/dashboard/servers/ServerQuizView";

// export default async function CourseQuizzesPage({ 
//   params 
// }: { 
//   params: Promise<{ locale: string; slug: string }> 
// }) {
//   const resolvedParams = await params
//   const { locale, slug } = resolvedParams
//   const userId = "current-user-uuid-from-session" // استبدل بـ ID المستخدم الحالي

//   return (
//     <main className="w-full h-screen">
//       <ServerQuizView courseSlug={slug} userId={userId} locale={locale} />
//     </main>
//   )
// }


// interface PageProps {
//   params: Promise<{
//     slug: string
//     quizId: string
//   }>
// }

// export default async function QuizPage({ params }: PageProps) {
// const resolvedParams = await params
//   const { slug, quizId } = resolvedParams

//   // هنا يتم جلب الـ userId الحقيقي للمستخدم مسجل الدخول عبر Supabase Auth
//   // سنقوم بوضع مثال افتراضي أو تمريره حسب نظام المصادقة لديكم
//   const userId =await getCurrentUserId()

//   return (
//     <QuizContainer 
//       quizId={quizId}
//       userId={userId}
//       courseSlug={slug}
//     />
//   )
// }


// interface PageProps {
//   params: Promise<{
//     slug: string
//   }>
//   searchParams: Promise<{
//     quizId?: string
//   }>
// }

// export default async function QuizzesMainPage({ params, searchParams }: PageProps) {
//   const { slug } = await params
//   const { quizId } = await searchParams

//   const userId = await getCurrentUserId()
//   return (
//     <QuizzesServer 
//       courseSlug={slug}
//       userId={userId}
//       requestedQuizId={quizId}
//     />
//   )
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { QuizzesServer } from '@/app/dashboard/clients/t/server'
// import { Suspense } from 'react'

// interface PageProps {
//   params: Promise<{ slug: string }>
//   searchParams: Promise<{ quiz?: string }>
// }

// export default async function QuizzesPage({ params, searchParams }: PageProps) {
//   const { slug } = await params
//   const { quiz } = await searchParams

//   return (
//     <Suspense fallback={<QuizzesLoading />}>
//       <QuizzesServer courseSlug={slug} quizId={quiz} />
//     </Suspense>
//   )
// }

// function QuizzesLoading() {
//   return (
//     <div className="flex h-screen items-center justify-center bg-slate-950">
//       <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//     </div>
//   )
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import { QuizzesServer } from '@/app/dashboard/quezhelpers/server'
// import { Suspense } from 'react'

// interface PageProps {
//   params: Promise<{ slug: string }>
//   searchParams: Promise<{ quiz?: string }>
// }

// export default async function QuizzesPage({ params, searchParams }: PageProps) {
//   const { slug } = await params
//   const { quiz } = await searchParams

//   return (
//     <Suspense fallback={<QuizzesLoading />}>
//       <QuizzesServer courseSlug={slug} quizId={quiz} />
//     </Suspense>
//   )
// }

// function QuizzesLoading() {
//   return (
//     <div className="flex h-screen items-center justify-center bg-slate-950">
//       <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//     </div>
//   )
// }
