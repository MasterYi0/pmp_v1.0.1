import { QuizzesServer } from '@/app/dashboard/quezhelpers/server'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ quiz?: string }>
}

export default async function QuizzesPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { quiz } = await searchParams

  return (
    <Suspense fallback={<QuizzesLoading />}>
      <QuizzesServer courseSlug={slug} quizId={quiz} />
    </Suspense>
  )
}

function QuizzesLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
    </div>
  )
}
