
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { getDashboardData } from '../actions/dashboard_actions'
import { CourseDashboardCard } from '../clients/cards'
import { getLocale } from 'next-intl/server'

interface DashboardViewProps {
  userId: string
}

export async function ServerDashboardContent({ userId }: DashboardViewProps) {
  const locale = await getLocale() as 'ar' | 'en';
  const data = await getDashboardData(userId)
  const { stats, enrolledCourses, moreCourses } = data

  return (
    <div className="space-y-8 p-6" >
      
      {/* 1. الكاردات العلوية للإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground"> {locale === 'ar' ? "الدورات النشطة" : "Active Courses"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeCoursesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">{locale === 'ar' ? "الشهادات الحاصل عليها" : "Earned Certificates"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{stats.certificatesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/5 border-blue-500/20 cursor-pointer hover:shadow-md transition-all">
          <Link href="/dashboard/analytics">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{locale === 'ar' ? "تحليلات الاختبارات" : "Quiz Analytics"} </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold">{locale === 'ar' ? `إجمالي: ${stats.quizAnalytics.totalTaken}` : `Total: ${stats.quizAnalytics.totalTaken}`}</div>
               <div className="text-xs text-muted-foreground">
                  {locale === 'ar' 
                    ? `نجاح: ${stats.quizAnalytics.passed} | رسوب: ${stats.quizAnalytics.failed}` 
                    : `Passed: ${stats.quizAnalytics.passed} | Failed: ${stats.quizAnalytics.failed}`}
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* 2. قسم الكورسات الحالية */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          {locale === 'ar' ? "دوراتك الحالية" : "Your Current Courses"}
        </h2>
        {enrolledCourses.length === 0 ? (
          <p className="text-muted-foreground">
            {locale === 'ar' ? "لست مشتركاً في أي دورة حالياً." : "You are not enrolled in any course currently."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          
            {enrolledCourses.map((item: any) => (
              <CourseDashboardCard 
                key={item.id} 
                course={item.courses} 
                progressVideo={item.progressVideo} // يمكن ربطها بحساب نسبة حقيقية لاحقاً
                progressQuiz={item.progressQuiz} 
              //  locale={locale} 
              isEnrolled={true}
              hasCertificate={item.is_complete}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. قسم المزيد (الكورسات غير المشترك فيها) */}
      <div className="space-y-4 pt-6 border-t">
        <h2 className="text-xl font-bold">{locale === 'ar' ? "استكشف دورات جديدة" : "Explore New Courses"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreCourses.map((course: any) => (
            <CourseDashboardCard 
              key={course.slug} 
              course={course} 
              isEnrolled={false} 
             // locale={locale} 
            />
          ))}
        </div>
      </div>

    </div>
  )
}