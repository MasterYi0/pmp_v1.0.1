import { ServerQuizView } from "@/app/dashboard/servers/ServerQuizView";

export default async function CourseQuizzesPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const resolvedParams = await params
  const { locale, slug } = resolvedParams
  const userId = "current-user-uuid-from-session" // استبدل بـ ID المستخدم الحالي

  return (
    <main className="w-full h-screen">
      <ServerQuizView courseSlug={slug} userId={userId} locale={locale} />
    </main>
  )
}