import { getCurrentUserId } from "@/app/dashboard/actions/dashboard_actions";
import { ServerCertificateView } from "@/app/dashboard/servers/ServerCertificateView";

export default async function CourseCertificatePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const userId = await getCurrentUserId(); // استبدل بـ ID المستخدم الحالي

  return (
    <main className="w-full min-h-screen">
      <ServerCertificateView courseSlug={slug} userId={userId} />
    </main>
  )
}