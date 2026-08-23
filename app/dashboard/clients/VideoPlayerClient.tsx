// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
// import { PanelLeftClose, PanelLeftOpen, Play, CheckCircle2 } from 'lucide-react'
// import { toggleLessonCompletion } from '../actions/videos'
// import { useLocale } from 'next-intl'

// interface VideoPlayerClientProps {
//   initialLesson: any
//   sections: any[]
//   initialProgress: any[]
//   userId: string
// }

// export function VideoPlayerClient({ initialLesson, sections, initialProgress, userId }: VideoPlayerClientProps) {
//   const [currentLesson, setCurrentLesson] = useState(initialLesson)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [progressMap, setProgressMap] = useState<Map<string, boolean>>(
//     new Map(initialProgress.map(p => [p.lesson_id, p.is_complete]))
//   )
//   const locale = useLocale() as 'ar' | 'en';
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
//     [initialLesson?.section_id]: true
//   })
// const [isPlaying, setIsPlaying] = useState(false)
//   const isCurrentCompleted = currentLesson ? progressMap.get(currentLesson.id) || false : false

//   const handleToggleComplete = async (checked: boolean) => {
//     if (!currentLesson) return
//     try {
//       await toggleLessonCompletion(userId, currentLesson.id, checked)
//       setProgressMap(prev => new Map(prev).set(currentLesson.id, checked))
//     } catch (error) {
//       console.error('Failed to update progress', error)
//     }
//   }
// useEffect(() => {
//     setIsPlaying(false)
//   }, [currentLesson?.id])

//   const toggleSection = (sectionId: string) => {
//     setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
//   }

//   const selectLesson = (lesson: any) => {
//     setCurrentLesson(lesson)
//     // تحديث وقت المشاهدة الأخير تلقائياً عند النقر
//     toggleLessonCompletion(userId, lesson.id, progressMap.get(lesson.id) || false)
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50">
      
//       {/* 1. القائمة الجانبية (Sidebar) لجدول المحتويات */}
//       {sidebarOpen && (
//         <aside className="w-80 bg-white border-e flex flex-col z-20 shadow-sm">
//           <div className="p-4 border-b font-bold text-lg bg-slate-100 truncate">
//             {/* {sections[0]?.course_slug || 'محتوى الدورة'} */}
//             {locale === 'ar' ? sections[0]?.title_ar : sections[0]?.title_en}
//           </div>
//           <div className="flex-1 overflow-y-auto p-4 space-y-3">
//             {sections.map(section => {
//               const isExpanded = expandedSections[section.id]
//               return (
//                 <div key={section.id} className="border rounded-lg overflow-hidden bg-white">
//                   <button 
//                     onClick={() => toggleSection(section.id)}
//                     className="w-full p-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center text-start font-semibold text-sm"
//                   >
//                     <span className="truncate">{locale === 'ar' ? section.title_ar : section.title_en}</span>
//                     <span className="text-xs text-muted-foreground">{section.course_lessons?.length || 0} دروس</span>
//                   </button>
                  
//                   {isExpanded && (
//                     <div className="divide-y">
//                       {section.course_lessons?.map((lesson: any) => {
//                         const isCompleted = progressMap.get(lesson.id) || false
//                         const isSelected = currentLesson?.id === lesson.id

//                         return (
//                           <div 
//                             key={lesson.id}
//                             onClick={() => selectLesson(lesson)}
//                             className={`p-3 flex items-center justify-between cursor-pointer transition-colors text-sm ${isSelected ? 'bg-primary/10 font-medium' : 'hover:bg-slate-50'}`}
//                           >
//                             <div className="flex items-center gap-2 truncate">
//                               <span className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-300'}`} />
//                               <span className="truncate">{locale === 'ar' ? lesson.title_ar : lesson.title_en}</span>
//                             </div>
//                             <span className="text-xs text-muted-foreground">{lesson.duration}</span>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         </aside>
//       )}

//       {/* 2. منطقة العرض الرئيسية (App Bar + مشغل الفيديو) */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
        
//         {/* الأب بار (App Bar) */}
//         <header className="h-16 bg-white border-b px-6 flex items-center justify-between z-10 shadow-sm">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
//             </Button>
//             <h1 className="font-bold text-lg truncate max-w-md">
//               {currentLesson ? (locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en) : (locale === 'ar' ? 'اختر درساً' : 'Select a lesson')}
//             </h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md">
//               <Checkbox 
//                 id="completed" 
//                 checked={isCurrentCompleted} 
//                 onCheckedChange={(val) => handleToggleComplete(val === true)} 
//               />
//               <label htmlFor="completed" className="text-sm font-medium cursor-pointer"> {locale === 'ar' ? 'مكتمل' : 'Completed'} </label>
//             </div>
//           </div>
//         </header>

//        {/* مشغل الفيديو */}
//        <main className="flex-1 bg-slate-900 flex items-center justify-center p-6 overflow-y-auto">
//           {currentLesson ? (
//             <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center text-white">
              
//               {isPlaying ? (
//                 /* مشغل يوتيوب الحقيقي يظهر بعد الضغط على زر التشغيل */
//                 <iframe
//                   src={getYouTubeEmbedUrl(currentLesson.videolink || "https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
//                   title={locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
//                   className="w-full h-full border-0 absolute inset-0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               ) : (
//                 /* الانترو الترحيبي (Placeholder) */
//                 <div className="text-center space-y-4 p-6">
//                   <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-primary/30 transition-all" onClick={() => setIsPlaying(true)}>
//                     <Play className="w-10 h-10 text-primary ms-1" />
//                   </div>
//                   <div>
//                     <p className="text-xl font-bold">{locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}</p>
//                     <p className="text-sm text-slate-400 mt-1">{locale === 'ar' ? 'المدة':'Duration'}  : {currentLesson.duration}</p>
//                   </div>
//                   <Button onClick={() => setIsPlaying(true)} variant="default" className="mt-2">
//                     {locale === 'ar' ? 'تشغيل': 'Play'}
//                   </Button>
//                 </div>
//               )}

//             </div>
//           ) : (
//             <div className="text-white text-lg">{locale === 'ar' ?'لا يوجد محتوي لعرضه':'No content' }</div>
//           )}
//         </main>

//       </div>

//     </div>
//   )
// }

// function getYouTubeEmbedUrl(url: string) {
//   if (!url) return ''
  
//   // استخراج معرّف الفيديو من روابط يوتيوب المختلفة (watch?v= أو youtu.be/)
//   let videoId = ''
//   if (url.includes('youtu.be/')) {
//     videoId = url.split('youtu.be/')[1]?.split('?')[0]
//   } else if (url.includes('watch?v=')) {
//     videoId = url.split('watch?v=')[1]?.split('&')[0]
//   } else {
//     videoId = url // إذا كان معرّفاً مباشراً
//   }

//   return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`
// }

// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
// import { 
//   PanelLeftClose, 
//   PanelLeftOpen, 
//   Play, 
//   CheckCircle2, 
//   Clock, 
//   BookOpen, 
//   ChevronDown, 
//   ChevronUp,
//   Sparkles
// } from 'lucide-react'
// import { toggleLessonCompletion } from '../actions/videos'
// import { useLocale } from 'next-intl'

// interface VideoPlayerClientProps {
//   initialLesson: any
//   sections: any[]
//   initialProgress: any[]
//   userId: string
// }

// export function VideoPlayerClient({ initialLesson, sections, initialProgress, userId }: VideoPlayerClientProps) {
//   const [currentLesson, setCurrentLesson] = useState(initialLesson)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [progressMap, setProgressMap] = useState<Map<string, boolean>>(
//     new Map(initialProgress.map(p => [p.lesson_id, p.is_complete]))
//   )
//   const locale = useLocale() as 'ar' | 'en';
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
//     [initialLesson?.section_id]: true
//   })
//   const [isPlaying, setIsPlaying] = useState(false)
//   const isCurrentCompleted = currentLesson ? progressMap.get(currentLesson.id) || false : false

//   const handleToggleComplete = async (checked: boolean) => {
//     if (!currentLesson) return
//     try {
//       await toggleLessonCompletion(userId, currentLesson.id, checked)
//       setProgressMap(prev => new Map(prev).set(currentLesson.id, checked))
//     } catch (error) {
//       console.error('Failed to update progress', error)
//     }
//   }

//   useEffect(() => {
//     setIsPlaying(false)
//   }, [currentLesson?.id])

//   const toggleSection = (sectionId: string) => {
//     setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
//   }

//   const selectLesson = (lesson: any) => {
//     setCurrentLesson(lesson)
//     // تحديث وقت المشاهدة الأخير تلقائياً عند النقر
//     toggleLessonCompletion(userId, lesson.id, progressMap.get(lesson.id) || false)
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
//       {/* 1. القائمة الجانبية (Sidebar) لجدول المحتويات */}
//       {sidebarOpen && (
//         <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 flex flex-col z-20 shadow-2xl transition-all duration-300">
//           {/* رأس القائمة */}
//           <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
//             <div className="flex items-center gap-3 truncate">
//               <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
//                 <BookOpen className="w-4 h-4" />
//               </div>
//               <span className="font-semibold text-sm truncate text-slate-200">
//                 {locale === 'ar' ? sections[0]?.title_ar : sections[0]?.title_en}
//               </span>
//             </div>
//           </div>

//           {/* محتوى السكاشن والدروس */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
//             {sections.map(section => {
//               const isExpanded = expandedSections[section.id]
//               return (
//                 <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40 transition-all">
//                   <button 
//                     onClick={() => toggleSection(section.id)}
//                     className="w-full p-3.5 bg-slate-900/60 hover:bg-slate-800/60 flex justify-between items-center text-start font-medium text-xs md:text-sm text-slate-300 transition-colors"
//                   >
//                     <span className="truncate pe-2">{locale === 'ar' ? section.title_ar : section.title_en}</span>
//                     <div className="flex items-center gap-2 shrink-0">
//                       <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
//                         {section.course_lessons?.length || 0} {locale === 'ar' ? 'دروس' : 'lessons'}
//                       </span>
//                       {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
//                     </div>
//                   </button>
                  
//                   {isExpanded && (
//                     <div className="divide-y divide-slate-800/50 bg-slate-950/20">
//                       {section.course_lessons?.map((lesson: any) => {
//                         const isCompleted = progressMap.get(lesson.id) || false
//                         const isSelected = currentLesson?.id === lesson.id

//                         return (
//                           <div 
//                             key={lesson.id}
//                             onClick={() => selectLesson(lesson)}
//                             className={`p-3.5 flex items-center justify-between cursor-pointer transition-all text-xs md:text-sm ${
//                               isSelected 
//                                 ? 'bg-indigo-600/15 text-indigo-300 font-medium border-l-4 border-indigo-500' 
//                                 : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
//                             }`}
//                           >
//                             <div className="flex items-center gap-3 truncate">
//                               <span className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
//                                 isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-700'
//                               }`} />
//                               <span className="truncate">{locale === 'ar' ? lesson.title_ar : lesson.title_en}</span>
//                             </div>
//                             <span className="text-[11px] text-slate-500 shrink-0 font-mono">{lesson.duration}</span>
//                           </div>
//                         )
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         </aside>
//       )}

//       {/* 2. منطقة العرض الرئيسية (App Bar + مشغل الفيديو) */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        
//         {/* الأب بار (App Bar) */}
//         <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between z-10 shadow-sm">
//           <div className="flex items-center gap-4">
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-slate-300 hover:text-white hover:bg-slate-800"
//             >
//               {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
//             </Button>
//             <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
//               {currentLesson ? (locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en) : (locale === 'ar' ? 'اختر درساً' : 'Select a lesson')}
//             </h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg shadow-inner">
//               <Checkbox 
//                 id="completed" 
//                 checked={isCurrentCompleted} 
//                 onCheckedChange={(val) => handleToggleComplete(val === true)} 
//                 className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
//               />
//               <label htmlFor="completed" className="text-xs md:text-sm font-medium cursor-pointer text-slate-300 select-none">
//                 {locale === 'ar' ? 'مكتمل' : 'Completed'}
//               </label>
//             </div>
//           </div>
//         </header>

//         {/* مشغل الفيديو */}
//         <main className="flex-1 bg-linear-to-b from-slate-950 to-slate-900 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
//           {currentLesson ? (
//             <div className="w-full max-w-5xl aspect-video bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center text-white">
              
//               {isPlaying ? (
//                 <iframe
//                   src={getYouTubeEmbedUrl(currentLesson.videolink || "https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
//                   title={locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
//                   className="w-full h-full border-0 absolute inset-0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               ) : (
//                 <div className="text-center space-y-6 p-8 relative z-10">
//                   <div className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10 rounded-full" />
                  
//                   <div 
//                     className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:bg-indigo-600/20 hover:scale-105 transition-all duration-300 shadow-xl group" 
//                     onClick={() => setIsPlaying(true)}
//                   >
//                     <Play className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 ms-1 group-hover:text-indigo-300 transition-colors" />
//                   </div>
                  
//                   <div className="space-y-2 max-w-lg mx-auto">
//                     <h2 className="text-lg md:text-2xl font-bold text-slate-100 leading-tight">
//                       {locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
//                     </h2>
//                     <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-400">
//                       <Clock className="w-4 h-4 text-indigo-400" />
//                       <span>{locale === 'ar' ? 'المدة' : 'Duration'} : {currentLesson.duration}</span>
//                     </div>
//                   </div>

//                   <Button 
//                     onClick={() => setIsPlaying(true)} 
//                     variant="default" 
//                     className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
//                   >
//                     {locale === 'ar' ? 'بدء تشغيل الدرس' : 'Start Lesson'}
//                   </Button>
//                 </div>
//               )}

//             </div>
//           ) : (
//             <div className="text-slate-400 text-base md:text-lg flex flex-col items-center gap-3">
//               <Sparkles className="w-8 h-8 text-slate-600" />
//               <span>{locale === 'ar' ? 'لا يوجد محتوى لعرضه حالياً' : 'No content available'}</span>
//             </div>
//           )}
//         </main>

//       </div>

//     </div>
//   )
// }

// function getYouTubeEmbedUrl(url: string) {
//   if (!url) return ''
  
//   let videoId = ''
//   if (url.includes('youtu.be/')) {
//     videoId = url.split('youtu.be/')[1]?.split('?')[0]
//   } else if (url.includes('watch?v=')) {
//     videoId = url.split('watch?v=')[1]?.split('&')[0]
//   } else {
//     videoId = url 
//   }

//   return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`
// }

'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Film
} from 'lucide-react'
import { toggleLessonCompletion } from '../actions/videos'
import { useLocale } from 'next-intl'

interface VideoPlayerClientProps {
  initialLesson: any
  sections: any[]
  initialProgress: any[]
  userId: string
}

export function VideoPlayerClient({ initialLesson, sections, initialProgress, userId }: VideoPlayerClientProps) {
  const [currentLesson, setCurrentLesson] = useState(initialLesson)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [progressMap, setProgressMap] = useState<Map<string, boolean>>(
    new Map(initialProgress.map(p => [p.lesson_id, p.is_complete]))
  )
  const locale = useLocale() as 'ar' | 'en';
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [initialLesson?.section_id]: true
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const isCurrentCompleted = currentLesson ? progressMap.get(currentLesson.id) || false : false

  const handleToggleComplete = async (checked: boolean) => {
    if (!currentLesson) return
    try {
      await toggleLessonCompletion(userId, currentLesson.id, checked)
      setProgressMap(prev => new Map(prev).set(currentLesson.id, checked))
    } catch (error) {
      console.error('Failed to update progress', error)
    }
  }

  useEffect(() => {
    setIsPlaying(false)
  }, [currentLesson?.id])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const selectLesson = (lesson: any) => {
    setCurrentLesson(lesson)
    toggleLessonCompletion(userId, lesson.id, progressMap.get(lesson.id) || false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* 1. القائمة الجانبية (Sidebar) */}
      {sidebarOpen && (
        <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col z-20 shadow-2xl transition-all duration-300">
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-3 truncate">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm truncate text-slate-200">
                {locale === 'ar' ? sections[0]?.title_ar : sections[0]?.title_en}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {sections.map(section => {
              const isExpanded = expandedSections[section.id]
              return (
                <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40 transition-all">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-3.5 bg-slate-900/60 hover:bg-slate-800/60 flex justify-between items-center text-start font-medium text-xs md:text-sm text-slate-300 transition-colors"
                  >
                    <span className="truncate pe-2">{locale === 'ar' ? section.title_ar : section.title_en}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                        {section.course_lessons?.length || 0} {locale === 'ar' ? 'دروس' : 'lessons'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="divide-y divide-slate-800/50 bg-slate-950/20">
                      {section.course_lessons?.map((lesson: any) => {
                        const isCompleted = progressMap.get(lesson.id) || false
                        const isSelected = currentLesson?.id === lesson.id

                        return (
                          <div 
                            key={lesson.id}
                            onClick={() => selectLesson(lesson)}
                            className={`p-3.5 flex items-center justify-between cursor-pointer transition-all text-xs md:text-sm ${
                              isSelected 
                                ? 'bg-indigo-600/15 text-indigo-300 font-medium border-l-4 border-indigo-500' 
                                : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 truncate">
                              <span className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
                                isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-700'
                              }`} />
                              <span className="truncate">{locale === 'ar' ? lesson.title_ar : lesson.title_en}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 shrink-0 font-mono">{lesson.duration}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
      )}

      {/* 2. منطقة العرض الرئيسية */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        
        {/* الأب بار (App Bar) */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </Button>
            <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
              {currentLesson ? (locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en) : (locale === 'ar' ? 'اختر درساً' : 'Select a lesson')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg shadow-inner">
              <Checkbox 
                id="completed" 
                checked={isCurrentCompleted} 
                onCheckedChange={(val) => handleToggleComplete(val === true)} 
                className="border-slate-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <label htmlFor="completed" className="text-xs md:text-sm font-medium cursor-pointer text-slate-300 select-none">
                {locale === 'ar' ? 'مكتمل' : 'Completed'}
              </label>
            </div>
          </div>
        </header>

        {/* مشغل الفيديو - تم تعديل المحاذاة هنا ليكون مرفوعاً للأعلى (justify-start مع pt-6) */}
        <main className="flex-1 bg-slate-950 flex flex-col items-center justify-start pt-6 md:pt-8 px-4 md:px-10 overflow-y-auto">
          {currentLesson ? (
            <div className="w-full max-w-5xl flex flex-col gap-4">
              
              {/* حاوية المشغل */}
              <div className="w-full aspect-video bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center text-white ring-1 ring-slate-800">
                
                {isPlaying ? (
                  <iframe
                    src={getYouTubeEmbedUrl(currentLesson.videolink || "https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                    title={locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
                    className="w-full h-full border-0 absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950">
                    
                    <div className="absolute w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div 
                      className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600/20 border border-indigo-500/40 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-indigo-600/30 hover:scale-105 transition-all duration-300 shadow-2xl shadow-indigo-950 group z-10 mb-5" 
                      onClick={() => setIsPlaying(true)}
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 ms-1 group-hover:text-indigo-200 transition-colors" />
                    </div>
                    
                    <div className="space-y-1.5 max-w-lg mx-auto z-10">
                      <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
                        {locale === 'ar' ? 'جاهز للمشاهدة' : 'Ready to watch'}
                      </span>
                      <h2 className="text-base md:text-xl font-bold text-slate-100 line-clamp-1">
                        {locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
                      </h2>
                    </div>
                  </div>
                )}
              </div>

              {/* شريط معلومات الدرس السفلي */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900/40 border border-slate-800/80 px-6 py-4 rounded-xl gap-4 mb-6">
                <div className="space-y-1">
                  <h3 className="text-sm md:text-base font-semibold text-slate-200">
                    {locale === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {currentLesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-indigo-400" />
                      {locale === 'ar' ? 'محتوى فيديو عالي الجودة' : 'HD Video Content'}
                    </span>
                  </div>
                </div>

                {!isPlaying && (
                  <Button 
                    onClick={() => setIsPlaying(true)} 
                    variant="default" 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-medium px-5 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all shrink-0"
                  >
                    {locale === 'ar' ? 'تشغيل الدرس الآن' : 'Play Lesson'}
                  </Button>
                )}
              </div>

            </div>
          ) : (
            <div className="text-slate-400 text-base md:text-lg flex flex-col items-center gap-3 mt-20">
              <Sparkles className="w-8 h-8 text-slate-600" />
              <span>{locale === 'ar' ? 'لا يوجد محتوى لعرضه حالياً' : 'No content available'}</span>
            </div>
          )}
        </main>

      </div>

    </div>
  )
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return ''
  
  let videoId = ''
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0]
  } else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1]?.split('&')[0]
  } else {
    videoId = url 
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`
}