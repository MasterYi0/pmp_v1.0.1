import { getCourseVideoDetails } from "../actions/videos"
import { VideoPlayerClient } from "../clients/VideoPlayerClient"


interface ServerVideoViewProps {
  courseSlug: string
  userId: string
 
}

export async function ServerVideoView({ courseSlug, userId}: ServerVideoViewProps) {
  const { course, sections, progress, initialLesson } = await getCourseVideoDetails(courseSlug, userId)

  return (
    <VideoPlayerClient 
      initialLesson={initialLesson}
      sections={sections}
      initialProgress={progress}
      userId={userId}
     
    />
  )
}