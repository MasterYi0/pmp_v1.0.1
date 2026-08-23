import { ServerAttachmentsView } from "@/app/dashboard/servers/ServerAttachmentsView";

export default async function CourseAttachmentsPage({ 
  params 
}: { 
  params: Promise<{slug: string }> 
}) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  return (
    <main className="w-full min-h-screen">
      <ServerAttachmentsView courseSlug={slug} />
    </main>
  )
}