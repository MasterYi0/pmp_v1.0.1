// 'use client'

// import React from 'react'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// import { Progress } from '@/components/ui/progress'
// import {  buttonVariants } from '@/components/ui/button'
// import Link from 'next/link'
// import { useLocale } from 'next-intl'

// interface CourseCardProps {
//   course: any
//   progressVideo?: number
//   progressQuiz?: number
//   isEnrolled?: boolean
// }

// export function CourseDashboardCard({ course, progressVideo = 0, progressQuiz = 0, isEnrolled = true}: CourseCardProps) {
//   const locale = useLocale() as 'ar' | 'en';
//   const title = course.title?.[locale] || course.title?.ar || ''
//   const shortDesc = course.short?.[locale] || course.short?.ar || ''

//   return (

//     <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all">
//   {/* تم إزالة النص المكرر وتعديل الـ layout لتكون الصورة في المنتصف بشكل نظيف */}
//   <div className="h-44 bg-slate-100 relative flex items-center  justify-center p-4">
//     <img
//       src={course.badge}
//       alt={typeof course.title === 'string' ? course.title : (course.title?.en || "Course Badge")}
//       className="w-30 h-30 rounded-full object-contain shrink-0 bg-white p-1 shadow-sm"
//     />
 

//   </div>
  
//   <CardHeader>
//     <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
//   </CardHeader>
  
//   <CardContent className="space-y-4">
//     {isEnrolled ? (
//       <>
//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span>تقدم الفيديوهات</span>
//             <span>{progressVideo}%</span>
//           </div>
//           <Progress value={progressVideo} className="h-2" />

//           <div className="flex justify-between">
//             <span>تقدم الاختبارات</span>
//             <span>{progressQuiz}%</span>
//           </div>
//           <Progress value={progressQuiz} className="h-2 bg-slate-100" />
//         </div>

//         <div className="grid grid-cols-3 gap-2 pt-2">
//           <Link
//             href={`/dashboard/courses/${course.slug}/videos`}
//             className={buttonVariants({ variant: "outline", size: "sm" })}
//           >
//             الفيديوهات
//           </Link>

//           <Link
//             href={`/dashboard/courses/${course.slug}/quizzes`}
//             className={buttonVariants({ variant: "outline", size: "sm" })}
//           >
//             الاختبارات
//           </Link>

//           <Link
//             href={`/dashboard/courses/${course.slug}/attachments`}
//             className={buttonVariants({ variant: "outline", size: "sm" })}
//           >
//             المرفقات
//           </Link>
//         </div>
//       </>
//     ) : (
//       <>
//         <p className="text-sm text-slate-600 line-clamp-2">{shortDesc}</p>
//         <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
//           <span>الساعات: {course.hours} ساعة</span>
//         </div>
//         <Link 
//           href={`/courses/${course.slug}`} 
//           className={`w-full ${buttonVariants({ variant: "outline", size: "sm" })}`}
//         >
//           عرض التفاصيل
//         </Link>
//       </>
//     )}
//   </CardContent>
// </Card>
// //     <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all">
// //       <div className="h-40 bg-slate-200 relative flex items-center justify-center text-slate-500 font-bold">
// //         {/* مكان صورة الكورس */}
// //  <img
// //                                 src={course.badge}
// //                                 alt={course.title.en}
// //                                 width={50}
// //                                 height={50}
// //                                 className="mx-auto size-52 rounded-full object-contain drop-shadow-2xl"
// //                             />
// //         <span>{title}</span>

// //       </div>
// //       <CardHeader>
// //         <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
// //       </CardHeader>
// //       <CardContent className="space-y-4">
// //         {isEnrolled ? (
// //           <>
// //             <div className="space-y-2 text-sm">
// //               <div className="flex justify-between">
// //                 <span> تقدم الفيديوهات </span>
// //                 <span>{progressVideo}%</span>
// //               </div>
// //               <Progress value={progressVideo} className="h-2" />

// //               <div className="flex justify-between">
// //                 <span>تقدم الاختبارات</span>
// //                 <span>{progressQuiz}%</span>
// //               </div>
// //               <Progress value={progressQuiz} className="h-2 bg-slate-100" />
// //             </div>

// //             <div className="grid grid-cols-3 gap-2 pt-2">
// //               <Link
// //                 href={`/dashboard/courses/${course.slug}/videos`}
// //                 className={buttonVariants({ variant: "outline", size: "sm" })}
// //               >
// //                 الفيديوهات
// //               </Link>

// //               <Link
// //                 href={`/dashboard/courses/${course.slug}/quizzes`}
// //                 className={buttonVariants({ variant: "outline", size: "sm" })}
// //               >
// //                 الاختبارات
// //               </Link>

// //               <Link
// //                 href={`/dashboard/courses/${course.slug}/attachments`}
// //                 className={buttonVariants({ variant: "outline", size: "sm" })}
// //               >
// //                 المرفقات
// //               </Link>
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             <p className="text-sm text-slate-600 line-clamp-2">{shortDesc}</p>
// //             <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
// //               <span>الساعات: {course.hours} ساعة</span>
// //             </div>
// //               <Link href={`/courses/${course.slug}`} className={buttonVariants({ variant: "outline", size: "sm" })} >عرض التفاصيل</Link>
// //           </>
// //         )}
// //       </CardContent>
// //     </Card>
//   )
// }
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Check, Star } from 'lucide-react'
import { WHATSAPP_URL } from '@/utils/outher/courses'

interface CourseCardProps {
  course: any
  progressVideo?: number
  progressQuiz?: number
  isEnrolled?: boolean
  hasCertificate?: boolean
}

// خريطة الألوان الاحترافية
const accentVar: Record<string, string> = {
  purple: "#8b5cf6",
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  default: "#3b82f6"
}


export function CourseDashboardCard({ 
  course, 
  progressVideo = 0, 
  progressQuiz = 0, 
  isEnrolled = true,
  // hasCertificate = false 
}: CourseCardProps) {
  const locale = useLocale() as 'ar' | 'en';
  const title = course.title?.[locale] || course.title?.ar || ''
  const shortDesc = course.short?.[locale] || course.short?.ar || ''
  const subtitle = course.subtitle?.[locale] || course.subtitle?.ar || ''
  const accentColor = accentVar[course.accent] || accentVar.default
const hasCertificate = progressVideo === 100 && progressQuiz === 100;
  // 1. كارد الدورات المشترك فيها (أفقي مع التدرج اللوني والدوائر والتقدم)
  if (isEnrolled) {
    return (
      <article
        style={{ ["--accent" as string]: accentColor }}
        className="rounded-2xl border border-border bg-card text-card-foreground shadow-[0_14px_38px_rgba(7,26,56,.07)] hover:shadow-md transition-all flex flex-col overflow-hidden sm:flex-row"
      >
        {/* قسم الصورة مع التدرج والدوائر الجمالية */}
        <div
          className="relative flex items-center justify-center p-6 h-40 w-full sm:h-auto sm:w-52 sm:shrink-0 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(145deg, color-mix(in oklch, var(--accent) 88%, #0f172a), color-mix(in oklch, var(--accent) 45%, #0f172a))",
          }}
        >
          <div className="absolute size-60 rounded-full border border-white/15" />
          <div className="absolute size-40 rounded-full border-12 border-white/6" />
          <img
            src={course.badge || course.image}
            alt={typeof title === 'string' ? title : "Course Badge"}
            loading="lazy"
            className="relative z-10 size-35 sm:size-40 object-contain drop-shadow-2xl bg-white/10 p-2 rounded-full backdrop-blur-sm"
          />
        </div>
        
        {/* محتوى الكارد المشترك */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-base text-foreground">
                {title} {course.code && `(${course.code})`}
              </h3>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full shrink-0 ${
                hasCertificate ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {hasCertificate ? (locale === 'ar' ? "مكتمل" : "Certified") : (locale === 'ar' ? "قيد التقدم" : "In Progress")}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{locale === 'ar' ? "تقدم الفيديوهات" : "Videos Progress"}</span>
                  <span>{progressVideo}%</span>
                </div>
                <Progress value={progressVideo} className="h-2" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{locale === 'ar' ? "تقدم الاختبارات" : "Quizzes Progress"}</span>
                  <span>{progressQuiz}%</span>
                </div>
                <Progress value={progressQuiz} className="h-2 bg-slate-100" />
              </div>
            </div>
          </div>

          {/* الأزرار السفلية المقسمة */}
          <div className="mt-6 flex items-center divide-x divide-x-reverse divide-border border-t border-border pt-4">
            <Link
              href={`/dashboard/courses/${course.slug}/videos`}
              className="flex-1 px-2 text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {locale === 'ar' ? "الفيديوهات" : "Videos"}
            </Link>
            <Link
              href={`/dashboard/courses/${course.slug}/quizzes`}
              className="flex-1 px-2 text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {locale === 'ar' ? "الاختبارات" : "Quizzes"}
            </Link>
            <Link
              href={`/dashboard/courses/${course.slug}/attachments`}
              className="flex-1 px-2 text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {locale === 'ar' ? "المرفقات" : "Files"}
            </Link>
            {hasCertificate ? (
              <Link
                href={`/dashboard/courses/${course.slug}/certificates`}
                className="flex-1 px-2 text-center text-xs font-semibold text-amber-600 hover:underline"
              >
                {locale === 'ar' ? "الشهادة" : "Certificate"}
              </Link>
            ) : (
              <span className="flex-1 cursor-not-allowed px-2 text-center text-xs font-medium text-muted-foreground/40">
                {locale === 'ar' ? "الشهادة" : "Certificate"}
              </span>
            )}
          </div>
        </div>
      </article>
    )
  }

  // 2. كارد الدورات غير المشترك فيها (التصميم الرأسي الكامل الخاص بك)
  return (
    <article
      style={{ ["--accent" as string]: accentColor }}
      className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-[0_14px_38px_rgba(7,26,56,.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(7,26,56,.13)]"
    >
      <div
        className="relative grid h-60 place-items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(145deg, color-mix(in oklch, var(--accent) 88%, #0f172a), color-mix(in oklch, var(--accent) 45%, #0f172a))",
        }}
      >
        <div className="absolute size-72 rounded-full border border-white/15" />
        <div className="absolute size-52 rounded-full border-18 border-white/6" />
        <img
          src={course.badge || course.image}
          alt={typeof title === 'string' ? title : "Course Badge"}
          loading="lazy"
          width={172}
          height={172}
          className="relative z-10 size-44 rounded-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 bg-white/10 p-2 backdrop-blur-sm"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {course.code && (
          <span
            dir="ltr"
            className="w-max rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide"
            style={{
              color: "var(--accent)",
              backgroundColor: "color-mix(in oklch, var(--accent) 10%, white)",
            }}
          >
            {course.code}
          </span>
        )}

        <h3 className="mt-4 text-xl leading-relaxed font-bold text-foreground">{title}</h3>
        
        {subtitle && (
          <p className="mt-1 text-sm font-extrabold" style={{ color: "var(--accent)" }}>
            {subtitle}
          </p>
        )}
        
        <p className="mt-3 min-h-16 text-[15px] leading-relaxed text-muted-foreground line-clamp-2">
          {shortDesc}
        </p>

        {/* {course.features && course.features.length > 0 && (
          <ul className="mt-5 grid gap-3">
            {course.features.map((f: any, i: number) => {
              const featureText = typeof f === 'string' ? f : (f[locale] || f.ar || '')
              return (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-foreground/80">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md"
                    style={{
                      color: "var(--accent)",
                      backgroundColor: "color-mix(in oklch, var(--accent) 12%, white)",
                    }}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {featureText}
                </li>
              )
            })}
          </ul>
        )} */}

        <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <div
            className="grid size-11 place-items-center rounded-full text-sm font-extrabold text-white shrink-0"
            style={{ backgroundImage: "linear-gradient(145deg, #0f172a, var(--accent))" }}
          >
            AE
          </div>
          <div className="flex-1">
            <strong className="block text-sm text-foreground">Eng. Amr Elturky</strong>
            <span className="text-xs text-muted-foreground">PM Mindset Instructor</span>
          </div>
          {course.rating && (
            <span className="flex items-center gap-1 text-sm font-extrabold text-foreground">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {course.rating}
            </span>
          )}
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {course.status === "upcoming" ? (
            <Button
              disabled
              className="h-12 rounded-xl font-extrabold col-span-2 cursor-not-allowed opacity-75 bg-muted text-muted-foreground"
            >
              {locale === 'ar' ? "قريباً" : "Coming Soon"}
            </Button>
          ) : (
            <>
              <Button
                className="h-12 rounded-xl font-extrabold text-white hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: "var(--accent)" }}
                onClick={() => window.open(WHATSAPP_URL, "_blank")}
              >
                {locale === 'ar' ? "سجّل الآن" : "Enroll now"}
              </Button>

              <Link 
                href={`/courses/${course.slug}`}
                className="h-12 rounded-xl font-extrabold flex items-center justify-center border transition-colors hover:bg-secondary/80"
                style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
              >
                {locale === 'ar' ? "عرض التفاصيل" : "View details"}
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  )
}