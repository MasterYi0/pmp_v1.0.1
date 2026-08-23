import { getCourseAttachmentsData } from "../actions/attachments"
import { AttachmentsClient } from "../clients/AttachmentsClient"

interface ServerAttachmentsViewProps {
  courseSlug: string
 
}

export async function ServerAttachmentsView({ courseSlug}: ServerAttachmentsViewProps) {
  const { course, attachments } = await getCourseAttachmentsData(courseSlug)

  return (
    <AttachmentsClient 
      course={course}
      attachments={attachments}
     
    />
  )
}