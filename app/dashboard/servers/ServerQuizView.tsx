import { getCourseQuizzesData } from "../actions/quizzes"
import { QuizPlayerClient } from "../clients/QuizPlayerClient"

interface ServerQuizViewProps {
  courseSlug: string
  userId: string
  locale: string
}

export async function ServerQuizView({ courseSlug, userId, locale }: ServerQuizViewProps) {
  const { course, sections, initialQuiz, initialQuestions, passedQuizzesMap } = await getCourseQuizzesData(courseSlug, userId)

  return (
    <QuizPlayerClient 
      course={course}
      sections={sections}
      initialQuiz={initialQuiz}
      initialQuestions={initialQuestions}
      initialPassedMap={passedQuizzesMap}
      userId={userId}
      locale={locale}
    />
  )
}