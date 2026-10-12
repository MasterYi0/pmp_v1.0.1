'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

// interface AttachmentsClientProps {
//   course: any
//   attachments: any[]

// }

// export function AttachmentsClient({ course, attachments}: AttachmentsClientProps) {
//     const locale = useLocale() as 'ar' | 'en';
//     const courseTitle = course.title?.[locale] || course.title?.ar || 'الدورة التدريبية'

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
//       <div className="max-w-6xl mx-auto space-y-8">
        
//         {/* رأس الصفحة مع زر العودة للداشبورد أو الكورس */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border">
//           <div>
//             {/* <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
//               <Link href="/dashboard" className="hover:underline">     
//                {locale === 'ar' ? "لوحة التحكم" : "Dashboard"}
//               </Link>
//               <span>/</span>
//               <span>
//  {locale === 'ar' ? "مرفقات وكتب دبلومة" : "Attachments"}
//               </span>
//             </div> */}
//             <h1 className="text-2xl font-bold text-slate-900">   {locale === 'ar' ? "مرفقات وكتب دبلومة" : "Attachments and Books of Diploma"} : </h1>
//              <h1 className="text-2xl font-bold text-slate-900">  {courseTitle} </h1>
//           </div>
//          <Link 
//   href="/dashboard" 
//   className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 transition-colors"
// >
//   <ArrowRight className="w-4 h-4" />


//    {locale === 'ar' ? "العودة للوحة التحكم" : "Back to Dashboard"}
// </Link>
//         </div>

//         {/* شبكة عرض كاردات الكتب والمرفقات */}
// {attachments.length === 0 ? (
//   <div className="bg-white rounded-2xl p-12 text-center border shadow-sm">
//     <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
//     <h3 className="text-lg font-bold text-slate-700">لا توجد مرفقات متاحة حالياً</h3>
//     <p className="text-sm text-slate-500 mt-1">سيقوم الأدمن بإضافة الكتب والملفات قريباً.</p>
//   </div>
// ) : (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {attachments.map((item) => {
//       const title = item.title?.[locale] || item.title?.ar || 'ملف PDF'
//       const desc = item.desc?.[locale] || item.desc?.ar || 'ملف PDF'
      
//       // الحصول على رابط الصورة من حقل badge (مع وضع صورة افتراضية في حال لم تكن موجودة)
//       const badgeImage = item.padge || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMiX8VXaVW5ZMV9s07m9ojcU_2RtJKq5s7gOWEG0Ebkw&s=10'

//       return (
//         <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between bg-white border">
//           {/* تم استبدال الأيقونة الثابتة بعرض صورة من حقل badge */}
//           <div className="h-40 bg-slate-100 flex items-center justify-center relative border-b overflow-hidden">
//             <img 
//               src={badgeImage} 
//               alt={title}
//               className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
//             />
//           </div>
          
//           <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
//             <div>
//               <h3 className="font-bold text-base text-slate-800 line-clamp-2" title={title}>
//                 {title}
//               </h3>
//               <p className="text-xs text-slate-500 mt-1">{desc}</p>
//             </div>

//             <a 
//               href={item.file_url} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               {locale === 'ar' ? "تحميل الملف" : "Download File"}
//             </a>
//           </CardContent>
//         </Card>
//       )
//     })}
//   </div>
// )}

//       </div>
//     </div>
//   )
// }

interface AttachmentsClientProps {
  course: any
  attachments: any[]
}

export function AttachmentsClient({ course, attachments}: AttachmentsClientProps) {
    const locale = useLocale() as 'ar' | 'en';
    const courseTitle = course.title?.[locale] || course.title?.ar || 'الدورة التدريبية'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* رأس الصفحة مع زر العودة للداشبورد أو الكورس */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link href="/dashboard" className="hover:underline">    
               {locale === 'ar' ? "لوحة التحكم" : "Dashboard"}
              </Link>
              <span>/</span>
              <span>
 {locale === 'ar' ? "مرفقات وكتب دبلومة" : "Attachments"}
              </span>
            </div> */}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">   {locale === 'ar' ? "مرفقات وكتب دبلومة" : "Attachments and Books of Diploma"} : </h1>
             <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">  {courseTitle} </h1>
          </div>
         <Link 
  href="/dashboard" 
  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input dark:border-slate-700 bg-background dark:bg-slate-800 hover:bg-accent dark:hover:bg-slate-700 hover:text-accent-foreground dark:text-slate-200 h-10 px-4 py-2 transition-colors"
>
  <ArrowRight className="w-4 h-4" />


   {locale === 'ar' ? "العودة للوحة التحكم" : "Back to Dashboard"}
</Link>
        </div>

        {/* شبكة عرض كاردات الكتب والمرفقات */}
{attachments.length === 0 ? (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
    <FileText className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">لا توجد مرفقات متاحة حالياً</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">سيقوم الأدمن بإضافة الكتب والملفات قريباً.</p>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {attachments.map((item) => {
      const title = item.title?.[locale] || item.title?.ar || 'ملف PDF'
      const desc = item.desc?.[locale] || item.desc?.ar || 'ملف PDF'
      
      // الحصول على رابط الصورة من حقل badge (مع وضع صورة افتراضية في حال لم تكن موجودة)
      const badgeImage = item.padge || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMiX8VXaVW5ZMV9s07m9ojcU_2RtJKq5s7gOWEG0Ebkw&s=10'

      return (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {/* تم استبدال الأيقونة الثابتة بعرض صورة من حقل badge */}
          <div className="h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative border-b border-slate-200 dark:border-slate-800 overflow-hidden">
            <img 
              src={badgeImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          
          <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-2" title={title}>
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
            </div>

            <a 
              href={item.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 transition-colors"
            >
              <Download className="w-4 h-4" />
              {locale === 'ar' ? "تحميل الملف" : "Download File"}
            </a>
          </CardContent>
        </Card>
      )
    })}
  </div>
)}

      </div>
    </div>
  )
}