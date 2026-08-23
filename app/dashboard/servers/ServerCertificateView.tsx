import { getCertificateData } from "../actions/certificates"
import { CertificateClient } from "../clients/CertificateClient"

interface ServerCertificateViewProps {
  courseSlug: string
  userId: string
  
}

export async function ServerCertificateView({ courseSlug, userId}: ServerCertificateViewProps) {
  const { course, certificate, progress } = await getCertificateData(courseSlug, userId)

  return (
    <CertificateClient 
      course={course}
      initialCertificate={certificate}
      progress={progress}
      userId={userId}
    
    />
  )
}