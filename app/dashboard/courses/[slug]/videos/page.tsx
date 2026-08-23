import { getCurrentUserId } from "@/app/dashboard/actions/dashboard_actions";
import { ServerVideoView } from "@/app/dashboard/servers/ServerVideoView";

export default async function CourseVideosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } =await params
  const userId = await getCurrentUserId();// استبدل بـ ID المستخدم الحالي

  return (
    <main className="w-full h-screen">
      <ServerVideoView courseSlug={slug} userId={userId} />
    </main>
  )
}