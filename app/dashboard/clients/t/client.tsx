// // 'use client'

// // import React, { useState } from 'react'
// // import { Button } from '@/components/ui/button'
// // import { 
// //   PanelLeftClose, 
// //   PanelLeftOpen, 
// //   History, 
// //   CheckCircle2, 
// //   XCircle, 
// //   ArrowRight, 
// //   Play, 
// //   HelpCircle,
// //   Sparkles
// // } from 'lucide-react'
// // import { useLocale } from 'next-intl'
// // import { QuizInterface, QuizReport } from '../QuizPlayerClient'

// // interface QuizOverviewProps {
// //   quiz: any
// //   sections: any[]
// //   questions: any[]
// //   activeAttempt: any
// //   attemptsHistory: any[]
// //   userId: string
// //   courseSlug: string
// // }

// // export function QuizOverview({ 
// //   quiz, 
// //   sections, 
// //   questions, 
// //   activeAttempt, 
// //   attemptsHistory, 
// //   userId, 
// //   courseSlug 
// // }: QuizOverviewProps) {
// //   const locale = useLocale() as 'ar' | 'en'
// //   const [sidebarOpen, setSidebarOpen] = useState(true)

// //   // حالات التنقل داخل صفحة الاختبار:
// //   // 'overview' = لوحة تفاصيل الاختبار + سجل المحاولات (وهي الواجهة الافتتاحية)
// //   // 'taking' = حل الأسئلة عبر QuizInterface
// //   // 'report' = عرض التقرير عبر QuizReport
// //   const [viewState, setViewState] = useState<'overview' | 'taking' | 'report'>('overview')
// //   const [selectedAttemptForReport, setSelectedAttemptForReport] = useState<any>(null)

// //   return (
// //     <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
// //       {/* 1. القائمة الجانبية (Sidebar) لعرض السكاشن والدروس والاختبارات */}
// //       {sidebarOpen && (
// //         <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col z-20 shadow-2xl transition-all duration-300">
// //           <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
// //             <div className="flex items-center gap-3 truncate">
// //               <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
// //                 <HelpCircle className="w-4 h-4" />
// //               </div>
// //               <span className="font-semibold text-sm truncate text-slate-200">
// //                 {locale === 'ar' ? 'محتوى الكورس والاختبارات' : 'Course Content & Quizzes'}
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
// //             {sections.map((section: any) => (
// //               <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40">
// //                 <div className="p-3.5 bg-slate-900/60 font-medium text-xs md:text-sm text-slate-300 border-b border-slate-800/50">
// //                   {locale === 'ar' ? section.title_ar || section.title : section.title_en || section.title}
// //                 </div>
                
// //                 {/* عرض اختبارات القسم */}
// //                 <div className="divide-y divide-slate-800/50 bg-slate-950/20">
// //                   {section.course_quiz?.map((q: any) => {
// //                     const isCurrent = q.id === quiz.id
// //                     return (
// //                       <div 
// //                         key={q.id}
// //                         onClick={() => {
// //                           // إذا ضغط على اختبار آخر، يمكنك إعادة توجيهه لصفحة الاختبار الجديد
// //                           window.location.href = `/courses/${courseSlug}/quizzes/${q.id}`
// //                         }}
// //                         className={`p-3 flex items-center justify-between cursor-pointer transition-all text-xs md:text-sm ${
// //                           isCurrent 
// //                             ? 'bg-amber-600/15 text-amber-300 font-medium border-s-4 border-amber-500' 
// //                             : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
// //                         }`}
// //                       >
// //                         <div className="flex items-center gap-2.5 truncate">
// //                           <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
// //                           <span className="truncate">{locale === 'ar' ? q.title?.ar || q.title : q.title?.en || q.title}</span>
// //                         </div>
// //                         <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
// //                           {locale === 'ar' ? 'اختبار' : 'Quiz'}
// //                         </span>
// //                       </div>
// //                     )
// //                   })}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </aside>
// //       )}

// //       {/* 2. منطقة العرض الرئيسية */}
// //       <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        
// //         {/* الأب بار (App Bar) */}
// //         <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-10 shadow-sm">
// //           <div className="flex items-center gap-4">
// //             <Button 
// //               variant="ghost" 
// //               size="icon" 
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="text-slate-300 hover:text-white hover:bg-slate-800"
// //             >
// //               {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
// //             </Button>
// //             <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
// //               {quiz ? (locale === 'ar' ? quiz.title?.ar || quiz.title : quiz.title?.en || quiz.title) : (locale === 'ar' ? 'ابدأ اختبارك الأول' : 'Start your first quiz')}
// //             </h1>
// //           </div>
// //         </header>

// //         {/* محتوى الشاشة الرئيسية بناءً على الحالة */}
// //         <main className="flex-1 bg-slate-950 flex flex-col items-center justify-start pt-6 md:pt-8 px-4 md:px-10 overflow-y-auto">
          
// //           {/* الحالة الأولى: لوحة تفاصيل الاختبار وسجل المحاولات */}
// //           {viewState === 'overview' && (
// //             <div className="w-full max-w-4xl flex flex-col gap-6 pb-16">
              
// //               {/* كارد ترحيبي وتفاصيل الاختبار */}
// //               <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md">
// //                 <div className="space-y-2">
// //                   <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
// //                     {locale === 'ar' ? 'اختبار تقييمي' : 'Assessment Quiz'}
// //                   </span>
// //                   <h2 className="text-xl md:text-2xl font-bold text-slate-100">
// //                     {locale === 'ar' ? quiz?.title?.ar || quiz?.title : quiz?.title?.en || quiz?.title}
// //                   </h2>
// //                   <p className="text-sm text-slate-400">
// //                     {locale === 'ar' 
// //                       ? 'اختبر معلوماتك، راقب أداءك، واستعرض سجل محاولاتك السابقة أدناه.' 
// //                       : 'Test your knowledge, monitor your performance, and view your previous attempt history below.'}
// //                   </p>
// //                 </div>

// //                 <Button 
// //                   onClick={() => setViewState('taking')}
// //                   className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-amber-900/30 shrink-0 flex items-center gap-2"
// //                 >
// //                   <Play className="w-4 h-4" />
// //                   {locale === 'ar' ? (activeAttempt ? 'استكمال الاختبار' : 'ابدأ الاختبار الآن') : (activeAttempt ? 'Resume Quiz' : 'Start Quiz Now')}
// //                 </Button>
// //               </div>

// //               {/* قسم سجل المحاولات (Attempt History Cards) */}
// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
// //                   <History className="w-4 h-4 text-amber-400" />
// //                   <span>{locale === 'ar' ? 'سجل المحاولات السابقة' : 'Previous Attempts History'}</span>
// //                 </div>

// //                 {attemptsHistory.length === 0 ? (
// //                   <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-8 text-center text-slate-400 text-xs md:text-sm">
// //                     {locale === 'ar' ? 'لا توجد محاولات سابقة لهذا الاختبار حتى الآن. ابدأ محاولتك الأولى!' : 'No previous attempts for this quiz yet. Start your first attempt!'}
// //                   </div>
// //                 ) : (
// //                   <div className="grid grid-cols-1 gap-3">
// //                     {attemptsHistory.map((attempt: any, idx: number) => {
// //                       const isPassed = attempt.is_passed
// //                       return (
// //                         <div key={attempt.id || idx} className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-all">
// //                           <div className="flex items-center gap-4">
// //                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
// //                               isPassed ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
// //                             }`}>
// //                               {attempt.score}%
// //                             </div>
// //                             <div>
// //                               <span className={`text-xs font-semibold flex items-center gap-1 ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
// //                                 {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
// //                                 {isPassed ? (locale === 'ar' ? 'اجتزت الاختبار' : 'Passed') : (locale === 'ar' ? 'لم تجتز الاختبار' : 'Failed')}
// //                               </span>
// //                               <p className="text-xs text-slate-400 font-mono mt-0.5">
// //                                 {attempt.created_at ? new Date(attempt.created_at).toLocaleString() : (locale === 'ar' ? 'محاولة حديثة' : 'Recent Attempt')}
// //                               </p>
// //                             </div>
// //                           </div>

// //                           <Button 
// //                             variant="outline" 
// //                             size="sm"
// //                             onClick={() => {
// //                               setSelectedAttemptForReport(attempt)
// //                               setViewState('report')
// //                             }}
// //                             className="border-slate-700 bg-slate-800/60 text-slate-200 text-xs hover:bg-slate-700"
// //                           >
// //                             {locale === 'ar' ? 'عرض التقرير' : 'View Report'}
// //                             <ArrowRight className="w-3.5 h-3.5 ms-1" />
// //                           </Button>
// //                         </div>
// //                       )
// //                     })}
// //                   </div>
// //                 )}
// //               </div>

// //             </div>
// //           )}

// //           {/* الحالة الثانية: حل الاختبار الفعلي عبر مكونك QuizInterface */}
// //           {viewState === 'taking' && (
// //             <QuizInterface 
// //               quiz={quiz}
// //               questions={questions}
// //               onSubmitAttempt={async (attemptData: any) => {
// //                 setSelectedAttemptForReport(attemptData)
// //                 setViewState('report')
// //               }}
// //               onBack={() => setViewState('overview')}
// //             />
// //           )}

// //           {/* الحالة الثالثة: عرض التقرير عبر مكونك QuizReport */}
// //           {viewState === 'report' && (
// //             <QuizReport 
// //               attempt={selectedAttemptForReport || activeAttempt || attemptsHistory[0]}
// //               quiz={quiz}
// //               questions={questions}
// //               onBack={() => setViewState('overview')}
// //             />
// //           )}

// //         </main>
// //       </div>

// //     </div>
// //   )
// // }

// 'use client'

// import { useState } from 'react'
// import { QuizInterface, QuizReport } from '../QuizPlayerClient'
// // 1. تعريف الـ Interfaces للـ Props
// interface QuizClientWrapperProps {
//   quiz: any
//   questions: any[]
//   initialAttempt: any
//   userId: string
// }
// export function QuizClientWrapper({ quiz, questions, initialAttempt, userId }: QuizClientWrapperProps) {
//   const [attempt, setAttempt] = useState(initialAttempt)
//   // إذا كانت المحاولة مغلقة مسبقاً (is_closed === true)، اعرض التقرير مباشرة
//   const [isFinished, setIsFinished] = useState(initialAttempt?.is_closed || false)
//   const [paused, setPaused] = useState(false)

//   // عند انهاء الاختبار بنجاح من QuizInterface
//   const handleFinishExam = (completedAttempt: any) => {
//     setAttempt(completedAttempt)
//     setIsFinished(true)
//   }

//   // عند الإيقاف المؤقت
//   const handlePauseExam = () => {
//     setPaused(true)
//   }

//   // العودة للاختبارات من التقرير
//   const handleBack = () => {
//     window.location.href = `/courses` // أو المسار المناسب لديك
//   }

//   if (paused) {
//     return (
//       <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-4 max-w-md w-full mt-20">
//         <h2 className="text-xl font-bold text-amber-400">الاختبار متوقف مؤقتاً</h2>
//         <p className="text-sm text-slate-400">تم حفظ تقدمك. يمكنك الاستكمال في أي وقت.</p>
//         <button 
//           onClick={() => setPaused(false)}
//           className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all"
//         >
//           استئناف الاختبار
//         </button>
//       </div>
//     )
//   }

//   if (isFinished) {
//     return (
//       <QuizReport 
//         attempt={attempt}
//         quiz={quiz}
//         questions={questions}
//         onBack={handleBack}
//       />
//     )
//   }

//   return (
//     <QuizInterface 
//       quiz={quiz}
//       questions={questions}
//       activeAttempt={attempt}
//       userId={userId}
//       onFinishExam={handleFinishExam}
//       onPauseExam={handlePauseExam}
//     />
//   )
// }



// import { useCallback, useEffect, useMemo, useRef } from 'react'
// import { useLocale } from 'next-intl'
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import {
//   BookOpen,
//   ChevronDown,
//   ChevronUp,
//   Clock,
//   Flag,
//   Globe,
//   Pause,
//   PanelLeftClose,
//   PanelLeftOpen,
//   Eye,
//   CheckCircle2,
//   XCircle,
// } from 'lucide-react'
// import {
//   getOrCreateActiveAttempt,
//   updateAttemptProgress,
//   submitAndCloseQuiz,
//   getAttemptReport,
//   type SectionRow,
//   type QuizRow,
//   type QuizQuestionRow,
//   type QuizAttemptRow,
//   type QuestionOption,
//   type DndOptions,
//   type QuizReportData,
//   getQuizQuestions,
// } from './actions'

// type Locale = 'ar' | 'en'
// type QuizState = 'empty' | 'intro' | 'active' | 'paused' | 'report'

// interface QuizzesClientProps {
//   sections: SectionRow[]
//   allQuizzes: QuizRow[]
//   initialQuiz: QuizRow | null
//   initialQuestions: QuizQuestionRow[]
//   initialAttempts: QuizAttemptRow[]
//   allUserAttempts: QuizAttemptRow[]
//   userId: string
//   courseSlug: string
// }

// const t = (locale: Locale, ar: string, en: string) => (locale === 'ar' ? ar : en)

// export function QuizzesClient({
//   sections,
//   allQuizzes,
//   initialQuiz,
//   initialQuestions,
//   initialAttempts,
//   allUserAttempts,
//   userId,
// }: QuizzesClientProps) {
//   const locale = useLocale() as Locale

//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
//     () => (initialQuiz ? { [initialQuiz.section_id ?? '']: true } : {})
//   )

//   const [currentQuiz, setCurrentQuiz] = useState<QuizRow | null>(initialQuiz)
//   const [questions, setQuestions] = useState<QuizQuestionRow[]>(initialQuestions)
//   const [attempts, setAttempts] = useState<QuizAttemptRow[]>(initialAttempts)
//   const [allAttempts, setAllAttempts] = useState<QuizAttemptRow[]>(allUserAttempts)
//   const [loadingQuiz, setLoadingQuiz] = useState(false)

//   const [quizState, setQuizState] = useState<QuizState>(initialQuiz ? 'intro' : 'empty')
//   const [currentAttempt, setCurrentAttempt] = useState<QuizAttemptRow | null>(null)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [answers, setAnswers] = useState<Record<number, any>>({})
//   const [flags, setFlags] = useState<Record<number, boolean>>({})
//   const [revealed, setRevealed] = useState<Record<number, boolean>>({})
//   const [showTranslation, setShowTranslation] = useState(false)
//   const [activeDndItem, setActiveDndItem] = useState<string | null>(null)

//   const [remainingSec, setRemainingSec] = useState((initialQuiz?.duration_min ?? 0) * 60)
//   const [timerActive, setTimerActive] = useState(false)
//   const [reportData, setReportData] = useState<QuizReportData | null>(null)
//   const [reportTab, setReportTab] = useState<'summary' | 'detailed'>('summary')

//   const answersRef = useRef(answers)
//   const flagsRef = useRef(flags)
//   const remainingRef = useRef(remainingSec)
//   const indexRef = useRef(currentIndex)
//   const attemptRef = useRef(currentAttempt)
//   const quizStateRef = useRef(quizState)
//   useEffect(() => void (answersRef.current = answers), [answers])
//   useEffect(() => void (flagsRef.current = flags), [flags])
//   useEffect(() => void (remainingRef.current = remainingSec), [remainingSec])
//   useEffect(() => void (indexRef.current = currentIndex), [currentIndex])
//   useEffect(() => void (attemptRef.current = currentAttempt), [currentAttempt])
//   useEffect(() => void (quizStateRef.current = quizState), [quizState])

//   const currentQ = questions[currentIndex]

//   // ---------------- Countdown timer ----------------
//   useEffect(() => {
//     if (quizState !== 'active' || !timerActive) return
//     if (remainingSec <= 0) {
//       handleFinishQuiz()
//       return
//     }
//     const id = setInterval(() => {
//       setRemainingSec((prev) => {
//         if (prev <= 1) {
//           clearInterval(id)
//           handleFinishQuiz()
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)
//     return () => clearInterval(id)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [quizState, timerActive])

//   // ---------------- Autosave on tab hide / unmount while active ----------------
//   useEffect(() => {
//     const save = () => {
//       const attempt = attemptRef.current
//       if (quizStateRef.current === 'active' && attempt) {
//         updateAttemptProgress(
//           attempt.id,
//           indexRef.current,
//           remainingRef.current,
//           answersRef.current,
//           flagsRef.current
//         ).catch(() => {})
//       }
//     }
//     const onVisibility = () => {
//       if (document.hidden) save()
//     }
//     document.addEventListener('visibilitychange', onVisibility)
//     window.addEventListener('beforeunload', save)
//     return () => {
//       document.removeEventListener('visibilitychange', onVisibility)
//       window.removeEventListener('beforeunload', save)
//       save()
//     }
//   }, [])

//   // ---------------- Sidebar helpers ----------------
//   const toggleSection = (id: string) =>
//     setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }))

//   const quizStatus = useCallback(
//     (quizId: number) => {
//       const forThisQuiz = allAttempts.filter((a) => a.quiz_id === quizId && a.is_closed)
//       if (forThisQuiz.some((a) => a.is_passed)) return 'passed'
//       if (forThisQuiz.length > 0) return 'attempted'
//       return 'none'
//     },
//     [allAttempts]
//   )

//   const statusDotClass = (status: string) => {
//     if (status === 'passed') return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
//     if (status === 'attempted') return 'bg-amber-400'
//     return 'bg-slate-700'
//   }

//   // ---------------- Selecting a quiz from the sidebar ----------------
//   const handleSelectQuiz = useCallback(
//     async (quiz: QuizRow) => {
//       if (quizState === 'active') {
//         await handlePauseQuiz()
//       }
//       setLoadingQuiz(true)
//       setCurrentQuiz(quiz)
//       setCurrentAttempt(null)
//       setCurrentIndex(0)
//       setAnswers({})
//       setFlags({})
//       setRevealed({})
//       setShowTranslation(false)
//       setRemainingSec(quiz.duration_min * 60)
//       setTimerActive(false)
//       setReportData(null)

//       try {
//         const qs = await getQuizQuestions(quiz.id)
//         setQuestions(qs)
//       } finally {
//         setLoadingQuiz(false)
//       }

//       setAttempts(allAttempts.filter((a) => a.quiz_id === quiz.id))
//       setQuizState('intro')
//     },
//     [allAttempts, quizState]
//   )

//   // ---------------- Start / resume ----------------
//   const handleStartQuiz = async () => {
//     if (!currentQuiz) return
//     const attempt = await getOrCreateActiveAttempt(userId, currentQuiz.id, currentQuiz.duration_min)
//     setCurrentAttempt(attempt)

//     const { __flags, ...savedAnswers } = (attempt.answer_state ?? {}) as Record<string, any>
//     setAnswers(savedAnswers ?? {})
//     setFlags(__flags ?? {})
//     setCurrentIndex(attempt.current_question_index ?? 0)
//     setRemainingSec(attempt.remaining_time_sec ?? currentQuiz.duration_min * 60)
//     setRevealed({})
//     setQuizState('active')
//     setTimerActive(true)
//   }

//   const handlePauseQuiz = async () => {
//     setTimerActive(false)
//     setQuizState('paused')
//     if (currentAttempt) {
//       await updateAttemptProgress(currentAttempt.id, currentIndex, remainingSec, answers, flags)
//     }
//   }

//   const handleResumeQuiz = () => {
//     setQuizState('active')
//     setTimerActive(true)
//   }

//   const handleFinishQuiz = async () => {
//     if (!currentAttempt || !currentQuiz) return
//     setTimerActive(false)
//     const usedSec = currentQuiz.duration_min * 60 - remainingRef.current
//     const timeUsedMin = Math.max(1, Math.round(usedSec / 60))

//     const result = await submitAndCloseQuiz(
//       currentAttempt.id,
//       currentQuiz.id,
//       userId,
//       answersRef.current,
//       flagsRef.current,
//       timeUsedMin
//     )

//     setReportData(result)
//     setReportTab('summary')
//     setAttempts((prev) => [result.attempt, ...prev])
//     setAllAttempts((prev) => [result.attempt, ...prev])
//     setQuizState('report')
//   }

//   const handleViewPastReport = async (attemptId: number) => {
//     const report = await getAttemptReport(attemptId)
//     setReportData(report)
//     setReportTab('summary')
//     setQuizState('report')
//   }

//   const handleBackToIntro = () => {
//     setReportData(null)
//     setQuizState('intro')
//   }

//   // ---------------- Answering ----------------
//   const selectSingle = (quesId: number, optionId: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => ({ ...prev, [quesId]: optionId }))
//   }

//   const toggleMultiple = (quesId: number, optionId: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => {
//       const current: string[] = Array.isArray(prev[quesId]) ? prev[quesId] : []
//       const next = current.includes(optionId)
//         ? current.filter((id) => id !== optionId)
//         : [...current, optionId]
//       return { ...prev, [quesId]: next }
//     })
//   }

//   const toggleDndLink = (quesId: number, list1Id: string, list2Id: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => {
//       const map: Record<string, string[]> = { ...(prev[quesId] ?? {}) }
//       const current = map[list1Id] ?? []
//       map[list1Id] = current.includes(list2Id)
//         ? current.filter((id) => id !== list2Id)
//         : [...current, list2Id]
//       return { ...prev, [quesId]: map }
//     })
//   }

//   const toggleFlag = (quesId: number) =>
//     setFlags((prev) => ({ ...prev, [quesId]: !prev[quesId] }))

//   const toggleReveal = (quesId: number) =>
//     setRevealed((prev) => ({ ...prev, [quesId]: !prev[quesId] }))

//   const goNext = () => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))
//   const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))

//   const progressPct = questions.length
//     ? Math.round(((currentIndex + 1) / questions.length) * 100)
//     : 0

//   const headerTitle = currentQuiz
//     ? t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)
//     : t(locale, 'اختر اختباراً', 'Choose a quiz')

//   const mmss = (sec: number) =>
//     `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-e border-slate-800/80 flex flex-col z-20 shadow-2xl">
//           <div className="p-5 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/50">
//             <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
//               <BookOpen className="w-4 h-4" />
//             </div>
//             <span className="font-semibold text-sm text-slate-200">
//               {t(locale, 'محتوى الاختبارات', 'Quiz contents')}
//             </span>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-3">
//             {sections.map((section) => {
//               const isExpanded = !!expandedSections[section.id]
//               const totalMin = section.quizzes.reduce((sum, q) => sum + q.duration_min, 0)

//               return (
//                 <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40">
//                   <button
//                     onClick={() => toggleSection(section.id)}
//                     className="w-full p-3.5 bg-slate-900/60 hover:bg-slate-800/60 flex justify-between items-center text-start text-xs md:text-sm text-slate-300 transition-colors"
//                   >
//                     <span className="truncate pe-2 font-medium">
//                       {t(locale, section.title_ar, section.title_en)}
//                     </span>
//                     <div className="flex items-center gap-2 shrink-0">
//                       <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
//                         {totalMin} {t(locale, 'د', 'min')}
//                       </span>
//                       {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                     </div>
//                   </button>

//                   {isExpanded && (
//                     <div className="divide-y divide-slate-800/50 bg-slate-950/20">
//                       {section.quizzes.map((quiz) => {
//                         const isSelected = currentQuiz?.id === quiz.id
//                         const status = quizStatus(quiz.id)
//                         return (
//                           <button
//                             key={quiz.id}
//                             onClick={() => handleSelectQuiz(quiz)}
//                             className={`w-full p-3.5 flex items-center justify-between text-xs md:text-sm text-start transition-colors ${
//                               isSelected
//                                 ? 'bg-indigo-600/15 text-indigo-300 font-medium border-s-4 border-indigo-500'
//                                 : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
//                             }`}
//                           >
//                             <span className="flex items-center gap-3 truncate">
//                               <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDotClass(status)}`} />
//                               <span className="truncate">{t(locale, quiz.title?.ar, quiz.title?.en)}</span>
//                             </span>
//                             <span className="text-[11px] text-slate-500 shrink-0 font-mono">
//                               {quiz.duration_min}{t(locale, 'د', 'm')}
//                             </span>
//                           </button>
//                         )
//                       })}
//                       {section.quizzes.length === 0 && (
//                         <p className="p-3.5 text-[11px] text-slate-600">
//                           {t(locale, 'لا توجد اختبارات في هذا القسم', 'No quizzes in this section')}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         </aside>
//       )}

//       {/* Main area */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
//         {/* App bar */}
//         <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
//           <div className="flex items-center gap-4 min-w-0">
//             <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
//             </Button>
//             <div className="min-w-0">
//               <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
//                 {headerTitle}
//               </h1>
//               {currentQuiz && (
//                 <span className="text-xs text-slate-400">
//                   {t(locale, 'المدة', 'Duration')}: {currentQuiz.duration_min}{t(locale, ' د', 'm')} ·{' '}
//                   {t(locale, 'نسبة النجاح', 'Passing score')}: {currentQuiz.passing_score}%
//                 </span>
//               )}
//             </div>
//           </div>

//           {quizState === 'active' && (
//             <div className="flex items-center gap-3 md:gap-4">
//               <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg font-mono text-indigo-400 text-sm">
//                 <Clock className="w-4 h-4" />
//                 <span>{mmss(remainingSec)}</span>
//               </div>
//               <Button size="sm" variant="outline" onClick={handlePauseQuiz} className="border-slate-700 text-slate-300">
//                 <Pause className="w-4 h-4 me-1" /> {t(locale, 'إيقاف مؤقت', 'Pause')}
//               </Button>
//               <Button size="sm" variant="destructive" onClick={handleFinishQuiz}>
//                 {t(locale, 'إنهاء الاختبار', 'End quiz')}
//               </Button>
//             </div>
//           )}
//         </header>

//         {quizState === 'active' && (
//           <div className="px-6 pt-3">
//             <Progress value={progressPct} className="h-1.5" />
//           </div>
//         )}

//         <main className="flex-1 overflow-y-auto flex flex-col items-center pt-6 md:pt-8 px-4 md:px-10 space-y-10">
//           <div className="w-full max-w-4xl space-y-6">
//             {quizState === 'empty' && (
//               <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
//                 {t(locale, 'اختر اختباراً من القائمة الجانبية للبدء', 'Choose a quiz from the sidebar to begin')}
//               </div>
//             )}

//             {loadingQuiz && (
//               <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
//                 {t(locale, 'جارِ التحميل...', 'Loading...')}
//               </div>
//             )}

//             {!loadingQuiz && quizState === 'intro' && currentQuiz && (
//               <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
//                 <div className="space-y-2">
//                   <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
//                     {t(locale, 'جاهز للاختبار', 'Ready to start')}
//                   </span>
//                   <h2 className="text-xl md:text-2xl font-bold text-slate-100">
//                     {t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)}
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-3 gap-3 text-center">
//                   <Stat label={t(locale, 'الأسئلة', 'Questions')} value={String(questions.length)} />
//                   <Stat label={t(locale, 'المدة', 'Duration')} value={`${currentQuiz.duration_min}${t(locale, ' د', 'm')}`} />
//                   <Stat label={t(locale, 'نسبة النجاح', 'Passing')} value={`${currentQuiz.passing_score}%`} />
//                 </div>

//                 {currentQuiz.instructions && (
//                   <div className="space-y-2 text-sm text-slate-300">
//                     <h4 className="font-semibold text-slate-200">{t(locale, 'التعليمات', 'Instructions')}</h4>
//                     <p className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-slate-400 whitespace-pre-line">
//                       {t(locale, currentQuiz.instructions.ar, currentQuiz.instructions.en)}
//                     </p>
//                   </div>
//                 )}

//                 <Button onClick={handleStartQuiz} className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-base font-medium">
//                   {t(locale, 'بدء الاختبار الآن', 'Start quiz')}
//                 </Button>
//               </div>
//             )}

//             {quizState === 'paused' && currentQuiz && (
//               <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
//                 <h3 className="text-xl font-bold text-slate-100">
//                   {t(locale, 'تم إيقاف الاختبار مؤقتاً', 'Quiz paused')}
//                 </h3>
//                 <p className="text-sm text-slate-400">
//                   {t(locale, 'يمكنك الاستئناف في أي وقت.', 'You can resume anytime.')}
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <Button onClick={handleBackToIntro} variant="outline" className="border-slate-700 text-slate-300">
//                     {t(locale, 'الرئيسية', 'Home')}
//                   </Button>
//                   <Button onClick={handleResumeQuiz} className="bg-indigo-600 hover:bg-indigo-500">
//                     {t(locale, 'استئناف', 'Resume')}
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {quizState === 'active' && currentQ && (
//               <QuestionCard
//                 locale={locale}
//                 index={currentIndex}
//                 total={questions.length}
//                 row={currentQ}
//                 answer={answers[currentQ.ques_id]}
//                 flagged={!!flags[currentQ.ques_id]}
//                 revealed={!!revealed[currentQ.ques_id]}
//                 showTranslation={showTranslation}
//                 activeDndItem={activeDndItem}
//                 onToggleTranslation={() => setShowTranslation((s) => !s)}
//                 onToggleFlag={() => toggleFlag(currentQ.ques_id)}
//                 onToggleReveal={() => toggleReveal(currentQ.ques_id)}
//                 onSelectSingle={(optId) => selectSingle(currentQ.ques_id, optId)}
//                 onToggleMultiple={(optId) => toggleMultiple(currentQ.ques_id, optId)}
//                 onSetActiveDndItem={setActiveDndItem}
//                 onToggleDndLink={(l1, l2) => toggleDndLink(currentQ.ques_id, l1, l2)}
//               />
//             )}

//             {quizState === 'active' && currentQ && (
//               <div className="flex justify-between pt-2">
//                 <Button disabled={currentIndex === 0} onClick={goPrev} variant="outline" className="border-slate-700 text-slate-300">
//                   {t(locale, 'السابق', 'Previous')}
//                 </Button>
//                 {currentIndex < questions.length - 1 ? (
//                   <Button onClick={goNext} className="bg-indigo-600 hover:bg-indigo-500">
//                     {t(locale, 'التالي', 'Next')}
//                   </Button>
//                 ) : (
//                   <Button onClick={handleFinishQuiz} className="bg-emerald-600 hover:bg-emerald-500">
//                     {t(locale, 'إنهاء الاختبار', 'End quiz')}
//                   </Button>
//                 )}
//               </div>
//             )}

//             {quizState === 'report' && reportData && currentQuiz && (
//               <ReportView
//                 locale={locale}
//                 data={reportData}
//                 quizTitle={t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)}
//                 tab={reportTab}
//                 onTabChange={setReportTab}
//                 onBack={handleBackToIntro}
//               />
//             )}
//           </div>

//           {/* History */}
//           {currentQuiz && quizState !== 'active' && (
//             <div className="w-full max-w-4xl pb-12 space-y-4 border-t border-slate-800/80 pt-8">
//               <h3 className="text-base font-semibold text-slate-200">
//                 {t(locale, 'سجل المحاولات السابقة', 'Attempt history')}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {attempts
//                   .filter((a) => a.is_closed)
//                   .map((attempt) => (
//                     <div
//                       key={attempt.id}
//                       className={`p-4 rounded-xl border flex items-center justify-between ${
//                         attempt.is_passed
//                           ? 'bg-emerald-950/20 border-emerald-900/50'
//                           : 'bg-rose-950/20 border-rose-900/50'
//                       }`}
//                     >
//                       <div className="space-y-1">
//                         <span className={`text-sm font-bold ${attempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
//                           {attempt.is_passed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')} ({attempt.score}%)
//                         </span>
//                         <span className="block text-xs text-slate-400 font-mono">
//                           {t(locale, 'الوقت المستغرق', 'Time used')}: {attempt.time_used_min}
//                           {t(locale, ' د', 'm')} · {new Date(attempt.created_at).toLocaleDateString(locale)}
//                         </span>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="border-slate-700 text-slate-200"
//                         onClick={() => handleViewPastReport(attempt.id)}
//                       >
//                         {t(locale, 'عرض التقرير', 'View report')}
//                       </Button>
//                     </div>
//                   ))}
//                 {attempts.filter((a) => a.is_closed).length === 0 && (
//                   <p className="text-xs text-slate-500 col-span-2">
//                     {t(locale, 'لا توجد محاولات مسجلة لهذا الاختبار حتى الآن.', 'No recorded attempts for this quiz yet.')}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }

// // =========================================================
// // Small pieces
// // =========================================================

// function Stat({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="bg-slate-950 border border-slate-900 rounded-xl py-3">
//       <div className="text-lg font-bold text-slate-100">{value}</div>
//       <div className="text-[11px] text-slate-500">{label}</div>
//     </div>
//   )
// }

// interface QuestionCardProps {
//   locale: Locale
//   index: number
//   total: number
//   row: QuizQuestionRow
//   answer: any
//   flagged: boolean
//   revealed: boolean
//   showTranslation: boolean
//   activeDndItem: string | null
//   onToggleTranslation: () => void
//   onToggleFlag: () => void
//   onToggleReveal: () => void
//   onSelectSingle: (optionId: string) => void
//   onToggleMultiple: (optionId: string) => void
//   onSetActiveDndItem: (id: string | null) => void
//   onToggleDndLink: (list1Id: string, list2Id: string) => void
// }

// function QuestionCard({
//   locale,
//   index,
//   total,
//   row,
//   answer,
//   flagged,
//   revealed,
//   showTranslation,
//   activeDndItem,
//   onToggleTranslation,
//   onToggleFlag,
//   onToggleReveal,
//   onSelectSingle,
//   onToggleMultiple,
//   onSetActiveDndItem,
//   onToggleDndLink,
// }: QuestionCardProps) {
//   const q = row.question

//   return (
//     <div className="w-full space-y-6">
//       <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
//         <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
//           {t(locale, 'السؤال', 'Question')} {index + 1} / {total}
//         </span>
//         <div className="flex items-center gap-1">
//           <Button size="sm" variant="ghost" onClick={onToggleTranslation} className="text-slate-400 hover:text-white">
//             <Globe className="w-4 h-4 me-1" /> {showTranslation ? t(locale, 'إخفاء الترجمة', 'Hide translation') : t(locale, 'عرض الترجمة', 'Show translation')}
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onToggleFlag} className={flagged ? 'text-amber-400' : 'text-slate-400 hover:text-white'}>
//             <Flag className="w-4 h-4" fill={flagged ? 'currentColor' : 'none'} />
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onToggleReveal} className="text-slate-400 hover:text-white">
//             <Eye className="w-4 h-4 me-1" /> {revealed ? t(locale, 'إخفاء الإجابة', 'Hide answer') : t(locale, 'عرض الإجابة', 'Show answer')}
//           </Button>
//         </div>
//       </div>

//       <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
//         <div>
//           <h3 className="text-lg font-semibold text-slate-100">{q.question.en}</h3>
//           {showTranslation && <p className="text-sm text-slate-500 mt-1">{q.question.ar}</p>}
//           {locale === 'ar' && !showTranslation && (
//             // Primary language is Arabic UI but English stem always shown per spec;
//             // Arabic reading fallback if English text missing.
//             <p className="sr-only">{q.question.ar}</p>
//           )}
//         </div>

//         {(q.type === 'single' || q.type === 'true_false') && (
//           <div className="space-y-3 pt-2">
//             {(q.options as QuestionOption[]).map((opt) => (
//               <OptionRow
//                 key={opt.id}
//                 option={opt}
//                 locale={locale}
//                 showTranslation={showTranslation}
//                 selected={answer === opt.id}
//                 revealed={revealed}
//                 onClick={() => onSelectSingle(opt.id)}
//               />
//             ))}
//           </div>
//         )}

//         {q.type === 'multiple' && (
//           <div className="space-y-3 pt-2">
//             {(q.options as QuestionOption[]).map((opt) => (
//               <OptionRow
//                 key={opt.id}
//                 option={opt}
//                 locale={locale}
//                 showTranslation={showTranslation}
//                 selected={Array.isArray(answer) && answer.includes(opt.id)}
//                 revealed={revealed}
//                 onClick={() => onToggleMultiple(opt.id)}
//               />
//             ))}
//           </div>
//         )}

//         {q.type === 'dnd' && (
//           <DndQuestion
//             options={q.options as DndOptions}
//             locale={locale}
//             showTranslation={showTranslation}
//             answer={answer ?? {}}
//             revealed={revealed}
//             activeItem={activeDndItem}
//             onSetActive={onSetActiveDndItem}
//             onToggleLink={onToggleDndLink}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// function OptionRow({
//   option,
//   locale,
//   showTranslation,
//   selected,
//   revealed,
//   onClick,
// }: {
//   option: QuestionOption
//   locale: Locale
//   showTranslation: boolean
//   selected: boolean
//   revealed: boolean
//   onClick: () => void
// }) {
//   let cls = 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
//   if (!revealed && selected) cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
//   if (revealed && option.is_correct) cls = 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
//   if (revealed && selected && !option.is_correct) cls = 'border-rose-600 bg-rose-950/30 text-rose-300'

//   return (
//     <button onClick={onClick} disabled={revealed} className={`w-full text-start p-4 rounded-xl border transition-colors ${cls}`}>
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <p>{option.text.en}</p>
//           {showTranslation && <p className="text-xs text-slate-500 mt-0.5">{option.text.ar}</p>}
//         </div>
//         {revealed && (option.is_correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : selected ? <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> : null)}
//       </div>
//       {revealed && (
//         <p className="text-xs mt-2 opacity-80">{t(locale, option.explanation.ar, option.explanation.en)}</p>
//       )}
//     </button>
//   )
// }

// function DndQuestion({
//   options,
//   locale,
//   showTranslation,
//   answer,
//   revealed,
//   activeItem,
//   onSetActive,
//   onToggleLink,
// }: {
//   options: DndOptions
//   locale: Locale
//   showTranslation: boolean
//   answer: Record<string, string[]>
//   revealed: boolean
//   activeItem: string | null
//   onSetActive: (id: string | null) => void
//   onToggleLink: (list1Id: string, list2Id: string) => void
// }) {
//   const isCorrectForItem = (list1Id: string) => {
//     const expected = (options.correct_map[list1Id] ?? []).slice().sort()
//     const given = (answer[list1Id] ?? []).slice().sort()
//     return JSON.stringify(expected) === JSON.stringify(given)
//   }

//   return (
//     <div className="space-y-3">
//       <p className="text-xs text-slate-500">
//         {t(
//           locale,
//           'اختر عنصراً من القائمة الأولى ثم اضغط على العناصر المطابقة له في القائمة الثانية.',
//           'Pick an item from list 1, then click its matches in list 2.'
//         )}
//       </p>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-slate-400">{t(locale, 'القائمة الأولى', 'List 1')}</p>
//           {options.list1.map((item) => {
//             const linked = answer[item.id] ?? []
//             const isActive = activeItem === item.id
//             let cls = 'border-slate-800 bg-slate-950/40 text-slate-300'
//             if (!revealed && isActive) cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
//             if (revealed) cls = isCorrectForItem(item.id) ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300' : 'border-rose-600 bg-rose-950/30 text-rose-300'

//             return (
//               <button
//                 key={item.id}
//                 disabled={revealed}
//                 onClick={() => onSetActive(item.id)}
//                 className={`w-full text-start p-3 rounded-lg border text-sm ${cls}`}
//               >
//                 <div>{item.text.en}</div>
//                 {showTranslation && <div className="text-[11px] text-slate-500">{item.text.ar}</div>}
//                 {linked.length > 0 && <div className="text-[10px] mt-1 opacity-70">{linked.length} {t(locale, 'مرتبط', 'linked')}</div>}
//               </button>
//             )
//           })}
//         </div>
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-slate-400">{t(locale, 'القائمة الثانية', 'List 2')}</p>
//           {options.list2.map((item) => {
//             const isLinkedToActive = activeItem ? (answer[activeItem] ?? []).includes(item.id) : false
//             let cls = 'border-slate-800 bg-slate-950/40 text-slate-300'
//             if (!revealed && isLinkedToActive) cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
//             return (
//               <button
//                 key={item.id}
//                 disabled={revealed || !activeItem}
//                 onClick={() => activeItem && onToggleLink(activeItem, item.id)}
//                 className={`w-full text-start p-3 rounded-lg border text-sm ${cls} ${!activeItem && !revealed ? 'opacity-50' : ''}`}
//               >
//                 <div>{item.text.en}</div>
//                 {showTranslation && <div className="text-[11px] text-slate-500">{item.text.ar}</div>}
//               </button>
//             )
//           })}
//         </div>
//       </div>
//       {revealed && options.explanation && (
//         <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-900">
//           {t(locale, options.explanation.ar, options.explanation.en)}
//         </p>
//       )}
//     </div>
//   )
// }

// function ReportView({
//   locale,
//   data,
//   quizTitle,
//   tab,
//   onTabChange,
//   onBack,
// }: {
//   locale: Locale
//   data: QuizReportData
//   quizTitle: string
//   tab: 'summary' | 'detailed'
//   onTabChange: (t: 'summary' | 'detailed') => void
//   onBack: () => void
// }) {
//   const wrong = data.total - data.correctCount

//   return (
//     <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-bold text-slate-100">{t(locale, 'تقرير الاختبار', 'Quiz report')}</h2>
//         <Button size="sm" variant="outline" onClick={onBack} className="border-slate-700 text-slate-300">
//           {t(locale, 'رجوع', 'Back')}
//         </Button>
//       </div>

//       <div className="grid grid-cols-3 gap-3 text-center">
//         <Stat label={t(locale, 'إجمالي الأسئلة', 'Total questions')} value={String(data.total)} />
//         <Stat label={t(locale, 'إجابات صحيحة', 'Correct')} value={String(data.correctCount)} />
//         <Stat label={t(locale, 'إجابات خاطئة', 'Wrong')} value={String(wrong)} />
//       </div>

//       <div
//         className={`text-center py-3 rounded-xl font-bold text-lg ${
//           data.isPassed ? 'bg-emerald-950/30 text-emerald-400' : 'bg-rose-950/30 text-rose-400'
//         }`}
//       >
//         {data.score}% — {data.isPassed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')}
//       </div>

//       <Tabs value={tab} onValueChange={(v) => onTabChange(v as 'summary' | 'detailed')}>
//         <TabsList>
//           <TabsTrigger value="summary">{t(locale, 'ملخص', 'Summary')}</TabsTrigger>
//           <TabsTrigger value="detailed">{t(locale, 'مراجعة تفصيلية', 'Detailed review')}</TabsTrigger>
//         </TabsList>

//         <TabsContent value="summary" className="pt-4">
//           <div className="overflow-hidden rounded-xl border border-slate-800">
//             <table className="w-full text-sm">
//               <thead className="bg-slate-900 text-slate-400">
//                 <tr>
//                   <th className="p-3 text-start">#</th>
//                   <th className="p-3 text-start">{t(locale, 'الاختبار', 'Quiz')}</th>
//                   <th className="p-3 text-start">{t(locale, 'النتيجة', 'Result')}</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-800">
//                 {data.questions.map((row, i) => {
//                   const res = data.results.find((r) => r.question_id === row.ques_id)
//                   return (
//                     <tr key={row.id} className="text-slate-300">
//                       <td className="p-3">{i + 1}</td>
//                       <td className="p-3 truncate max-w-xs">{quizTitle}</td>
//                       <td className="p-3">
//                         {res?.is_correct ? (
//                           <span className="inline-flex items-center gap-1 text-emerald-400">
//                             <CheckCircle2 className="w-4 h-4" /> {t(locale, 'صحيح', 'Correct')}
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1 text-rose-400">
//                             <XCircle className="w-4 h-4" /> {t(locale, 'خاطئ', 'Wrong')}
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </TabsContent>

//         <TabsContent value="detailed" className="pt-4 space-y-6">
//           {data.questions.map((row, i) => (
//             <ReviewQuestion key={row.id} index={i} locale={locale} row={row} userAnswer={data.attempt.answer_state?.[row.ques_id]} />
//           ))}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// function ReviewQuestion({
//   index,
//   locale,
//   row,
//   userAnswer,
// }: {
//   index: number
//   locale: Locale
//   row: QuizQuestionRow
//   userAnswer: any
// }) {
//   const q = row.question

//   return (
//     <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-3">
//       <p className="text-xs font-mono text-indigo-400">
//         {t(locale, 'السؤال', 'Question')} {index + 1}
//       </p>
//       <h4 className="font-semibold text-slate-100">{q.question.en}</h4>

//       {(q.type === 'single' || q.type === 'multiple' || q.type === 'true_false') && (
//         <div className="space-y-2 pt-1">
//           {(q.options as QuestionOption[]).map((opt) => {
//             const selected = q.type === 'multiple' ? Array.isArray(userAnswer) && userAnswer.includes(opt.id) : userAnswer === opt.id
//             let cls = 'border-slate-800 bg-slate-950/60 text-slate-400'
//             if (opt.is_correct) cls = 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
//             else if (selected) cls = 'border-rose-600 bg-rose-950/30 text-rose-300'
//             return (
//               <div key={opt.id} className={`p-3 rounded-lg border text-sm ${cls}`}>
//                 <div className="flex items-center justify-between">
//                   <span>{opt.text.en}</span>
//                   {opt.is_correct ? <CheckCircle2 className="w-4 h-4" /> : selected ? <XCircle className="w-4 h-4" /> : null}
//                 </div>
//                 <p className="text-xs mt-1 opacity-80">{t(locale, opt.explanation.ar, opt.explanation.en)}</p>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {q.type === 'dnd' && (
//         <DndQuestion
//           options={q.options as DndOptions}
//           locale={locale}
//           showTranslation
//           answer={userAnswer ?? {}}
//           revealed
//           activeItem={null}
//           onSetActive={() => {}}
//           onToggleLink={() => {}}
//         />
//       )}
//     </div>
//   )
// }
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////// صخخخخخخخخخخقنهىل //////////////////////////////////





// 'use client'

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import { useLocale } from 'next-intl'
// import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import {
//   BookOpen,
//   ChevronDown,
//   ChevronUp,
//   Clock,
//   Flag,
//   Globe,
//   Pause,
//   PanelLeftClose,
//   PanelLeftOpen,
//   Eye,
//   CheckCircle2,
//   XCircle,
// } from 'lucide-react'
// import {
//   getOrCreateActiveAttempt,
//   updateAttemptProgress,
//   submitAndCloseQuiz,
//   getAttemptReport,
//   type SectionRow,
//   type QuizRow,
//   type QuizQuestionRow,
//   type QuizAttemptRow,
//   type QuestionOption,
//   type DndOptions,
//   type QuizReportData,
// } from './actions'

// type Locale = 'ar' | 'en'
// type QuizState = 'empty' | 'intro' | 'active' | 'paused' | 'report'

// interface QuizzesClientProps {
//   sections: SectionRow[]
//   allQuizzes: QuizRow[]
//   initialQuiz: QuizRow | null
//   initialQuestions: QuizQuestionRow[]
//   initialAttempts: QuizAttemptRow[]
//   allUserAttempts: QuizAttemptRow[]
//   userId: string
//   courseSlug: string
// }

// const t = (locale: Locale, ar: string, en: string) => (locale === 'ar' ? ar : en)

// export function QuizzesClient({
//   sections,
//   allQuizzes,
//   initialQuiz,
//   initialQuestions,
//   initialAttempts,
//   allUserAttempts,
//   userId,
// }: QuizzesClientProps) {
//   const locale = useLocale() as Locale

//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
//     () => (initialQuiz ? { [initialQuiz.section_id ?? '']: true } : {})
//   )

//   const [currentQuiz, setCurrentQuiz] = useState<QuizRow | null>(initialQuiz)
//   const [questions, setQuestions] = useState<QuizQuestionRow[]>(initialQuestions)
//   const [attempts, setAttempts] = useState<QuizAttemptRow[]>(initialAttempts)
//   const [allAttempts, setAllAttempts] = useState<QuizAttemptRow[]>(allUserAttempts)
//   const [loadingQuiz, setLoadingQuiz] = useState(false)

//   const [quizState, setQuizState] = useState<QuizState>(initialQuiz ? 'intro' : 'empty')
//   const [currentAttempt, setCurrentAttempt] = useState<QuizAttemptRow | null>(null)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [answers, setAnswers] = useState<Record<number, any>>({})
//   const [flags, setFlags] = useState<Record<number, boolean>>({})
//   const [revealed, setRevealed] = useState<Record<number, boolean>>({})
//   const [showTranslation, setShowTranslation] = useState(false)
//   const [activeDndItem, setActiveDndItem] = useState<string | null>(null)

//   const [remainingSec, setRemainingSec] = useState((initialQuiz?.duration_min ?? 0) * 60)
//   const [timerActive, setTimerActive] = useState(false)
//   const [reportData, setReportData] = useState<QuizReportData | null>(null)
//   const [reportTab, setReportTab] = useState<'summary' | 'detailed'>('summary')

//   const answersRef = useRef(answers)
//   const flagsRef = useRef(flags)
//   const remainingRef = useRef(remainingSec)
//   const indexRef = useRef(currentIndex)
//   const attemptRef = useRef(currentAttempt)
//   const quizStateRef = useRef(quizState)
//   useEffect(() => void (answersRef.current = answers), [answers])
//   useEffect(() => void (flagsRef.current = flags), [flags])
//   useEffect(() => void (remainingRef.current = remainingSec), [remainingSec])
//   useEffect(() => void (indexRef.current = currentIndex), [currentIndex])
//   useEffect(() => void (attemptRef.current = currentAttempt), [currentAttempt])
//   useEffect(() => void (quizStateRef.current = quizState), [quizState])

//   const currentQ = questions[currentIndex]

//   // ---------------- Countdown timer ----------------
//   useEffect(() => {
//     if (quizState !== 'active' || !timerActive) return
//     if (remainingSec <= 0) {
//       handleFinishQuiz()
//       return
//     }
//     const id = setInterval(() => {
//       setRemainingSec((prev) => {
//         if (prev <= 1) {
//           clearInterval(id)
//           handleFinishQuiz()
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)
//     return () => clearInterval(id)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [quizState, timerActive])

//   // ---------------- Autosave on tab hide / unmount while active ----------------
//   useEffect(() => {
//     const save = () => {
//       const attempt = attemptRef.current
//       if (quizStateRef.current === 'active' && attempt) {
//         updateAttemptProgress(
//           attempt.id,
//           indexRef.current,
//           remainingRef.current,
//           answersRef.current,
//           flagsRef.current
//         ).catch(() => {})
//       }
//     }
//     const onVisibility = () => {
//       if (document.hidden) save()
//     }
//     document.addEventListener('visibilitychange', onVisibility)
//     window.addEventListener('beforeunload', save)
//     return () => {
//       document.removeEventListener('visibilitychange', onVisibility)
//       window.removeEventListener('beforeunload', save)
//       save()
//     }
//   }, [])

//   // ---------------- Sidebar helpers ----------------
//   const toggleSection = (id: string) =>
//     setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }))

//   const quizStatus = useCallback(
//     (quizId: number) => {
//       const forThisQuiz = allAttempts.filter((a) => a.quiz_id === quizId && a.is_closed)
//       if (forThisQuiz.some((a) => a.is_passed)) return 'passed'
//       if (forThisQuiz.length > 0) return 'attempted'
//       return 'none'
//     },
//     [allAttempts]
//   )

//   const statusDotClass = (status: string) => {
//     if (status === 'passed') return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
//     if (status === 'attempted') return 'bg-amber-400'
//     return 'bg-slate-700'
//   }

//   // ---------------- Selecting a quiz from the sidebar ----------------
//   const handleSelectQuiz = useCallback(
//     async (quiz: QuizRow) => {
//       if (quizState === 'active') {
//         await handlePauseQuiz()
//       }
//       setLoadingQuiz(true)
//       setCurrentQuiz(quiz)
//       setCurrentAttempt(null)
//       setCurrentIndex(0)
//       setAnswers({})
//       setFlags({})
//       setRevealed({})
//       setShowTranslation(false)
//       setRemainingSec(quiz.duration_min * 60)
//       setTimerActive(false)
//       setReportData(null)

//       try {
//         const { getQuizQuestions } = await import('./actions')
//         const qs = await getQuizQuestions(quiz.id)
//         setQuestions(qs)
//       } finally {
//         setLoadingQuiz(false)
//       }

//       setAttempts(allAttempts.filter((a) => a.quiz_id === quiz.id))
//       setQuizState('intro')
//     },
//     [allAttempts, quizState]
//   )

//   // ---------------- Start / resume ----------------
//   const handleStartQuiz = async () => {
//     if (!currentQuiz) return
//     const attempt = await getOrCreateActiveAttempt(userId, currentQuiz.id, currentQuiz.duration_min)
//     setCurrentAttempt(attempt)

//     const { __flags, ...savedAnswers } = (attempt.answer_state ?? {}) as Record<string, any>
//     setAnswers(savedAnswers ?? {})
//     setFlags(__flags ?? {})
//     setCurrentIndex(attempt.current_question_index ?? 0)
//     setRemainingSec(attempt.remaining_time_sec ?? currentQuiz.duration_min * 60)
//     setRevealed({})
//     setQuizState('active')
//     setTimerActive(true)
//   }

//   const handlePauseQuiz = async () => {
//     setTimerActive(false)
//     setQuizState('paused')
//     if (currentAttempt) {
//       await updateAttemptProgress(currentAttempt.id, currentIndex, remainingSec, answers, flags)
//     }
//   }

//   const handleResumeQuiz = () => {
//     setQuizState('active')
//     setTimerActive(true)
//   }

//   const handleFinishQuiz = async () => {
//     if (!currentAttempt || !currentQuiz) return
//     setTimerActive(false)
//     const usedSec = currentQuiz.duration_min * 60 - remainingRef.current
//     const timeUsedMin = Math.max(1, Math.round(usedSec / 60))

//     const result = await submitAndCloseQuiz(
//       currentAttempt.id,
//       currentQuiz.id,
//       userId,
//       answersRef.current,
//       flagsRef.current,
//       timeUsedMin
//     )

//     setReportData(result)
//     setReportTab('summary')
//     setAttempts((prev) => [result.attempt, ...prev])
//     setAllAttempts((prev) => [result.attempt, ...prev])
//     setQuizState('report')
//   }

//   const handleViewPastReport = async (attemptId: number) => {
//     const report = await getAttemptReport(attemptId)
//     setReportData(report)
//     setReportTab('summary')
//     setQuizState('report')
//   }

//   const handleBackToIntro = () => {
//     setReportData(null)
//     setQuizState('intro')
//   }

//   // ---------------- Answering ----------------
//   const selectSingle = (quesId: number, optionId: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => ({ ...prev, [quesId]: optionId }))
//   }

//   const toggleMultiple = (quesId: number, optionId: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => {
//       const current: string[] = Array.isArray(prev[quesId]) ? prev[quesId] : []
//       const next = current.includes(optionId)
//         ? current.filter((id) => id !== optionId)
//         : [...current, optionId]
//       return { ...prev, [quesId]: next }
//     })
//   }

//   const toggleDndLink = (quesId: number, list1Id: string, list2Id: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => {
//       const map: Record<string, string[]> = { ...(prev[quesId] ?? {}) }
//       const current = map[list1Id] ?? []
//       map[list1Id] = current.includes(list2Id)
//         ? current.filter((id) => id !== list2Id)
//         : [...current, list2Id]
//       return { ...prev, [quesId]: map }
//     })
//   }

//   const toggleFlag = (quesId: number) =>
//     setFlags((prev) => ({ ...prev, [quesId]: !prev[quesId] }))

//   const toggleReveal = (quesId: number) =>
//     setRevealed((prev) => ({ ...prev, [quesId]: !prev[quesId] }))

//   const goNext = () => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))
//   const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))

//   const progressPct = questions.length
//     ? Math.round(((currentIndex + 1) / questions.length) * 100)
//     : 0

//   const headerTitle = currentQuiz
//     ? t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)
//     : t(locale, 'اختر اختباراً', 'Choose a quiz')

//   const mmss = (sec: number) =>
//     `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-e border-slate-800/80 flex flex-col z-20 shadow-2xl">
//           <div className="p-5 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/50">
//             <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
//               <BookOpen className="w-4 h-4" />
//             </div>
//             <span className="font-semibold text-sm text-slate-200">
//               {t(locale, 'محتوى الاختبارات', 'Quiz contents')}
//             </span>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-3">
//             {sections.map((section) => {
//               const isExpanded = !!expandedSections[section.id]
//               const totalMin = section.quizzes.reduce((sum, q) => sum + q.duration_min, 0)

//               return (
//                 <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40">
//                   <button
//                     onClick={() => toggleSection(section.id)}
//                     className="w-full p-3.5 bg-slate-900/60 hover:bg-slate-800/60 flex justify-between items-center text-start text-xs md:text-sm text-slate-300 transition-colors"
//                   >
//                     <span className="truncate pe-2 font-medium">
//                       {t(locale, section.title_ar, section.title_en)}
//                     </span>
//                     <div className="flex items-center gap-2 shrink-0">
//                       <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
//                         {totalMin} {t(locale, 'د', 'min')}
//                       </span>
//                       {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                     </div>
//                   </button>

//                   {isExpanded && (
//                     <div className="divide-y divide-slate-800/50 bg-slate-950/20">
//                       {section.quizzes.map((quiz) => {
//                         const isSelected = currentQuiz?.id === quiz.id
//                         const status = quizStatus(quiz.id)
//                         return (
//                           <button
//                             key={quiz.id}
//                             onClick={() => handleSelectQuiz(quiz)}
//                             className={`w-full p-3.5 flex items-center justify-between text-xs md:text-sm text-start transition-colors ${
//                               isSelected
//                                 ? 'bg-indigo-600/15 text-indigo-300 font-medium border-s-4 border-indigo-500'
//                                 : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
//                             }`}
//                           >
//                             <span className="flex items-center gap-3 truncate">
//                               <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDotClass(status)}`} />
//                               <span className="truncate">{t(locale, quiz.title?.ar, quiz.title?.en)}</span>
//                             </span>
//                             <span className="text-[11px] text-slate-500 shrink-0 font-mono">
//                               {quiz.duration_min}{t(locale, 'د', 'm')}
//                             </span>
//                           </button>
//                         )
//                       })}
//                       {section.quizzes.length === 0 && (
//                         <p className="p-3.5 text-[11px] text-slate-600">
//                           {t(locale, 'لا توجد اختبارات في هذا القسم', 'No quizzes in this section')}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         </aside>
//       )}

//       {/* Main area */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
//         {/* App bar */}
//         <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
//           <div className="flex items-center gap-4 min-w-0">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-slate-300 hover:text-white hover:bg-slate-800"
//             >
//               {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
//             </Button>
//             <div className="min-w-0">
//               <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
//                 {headerTitle}
//               </h1>
//               {currentQuiz && (
//                 <span className="text-xs text-slate-400">
//                   {t(locale, 'المدة', 'Duration')}: {currentQuiz.duration_min}{t(locale, ' د', 'm')} ·{' '}
//                   {t(locale, 'نسبة النجاح', 'Passing score')}: {currentQuiz.passing_score}%
//                 </span>
//               )}
//             </div>
//           </div>

//           {quizState === 'active' && (
//             <div className="flex items-center gap-3 md:gap-4">
//               <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg font-mono text-indigo-400 text-sm">
//                 <Clock className="w-4 h-4" />
//                 <span>{mmss(remainingSec)}</span>
//               </div>
//               <Button size="sm" variant="outline" onClick={handlePauseQuiz} className="border-slate-700 text-slate-300">
//                 <Pause className="w-4 h-4 me-1" /> {t(locale, 'إيقاف مؤقت', 'Pause')}
//               </Button>
//               <Button size="sm" variant="destructive" onClick={handleFinishQuiz} className="text-white">
//                 {t(locale, 'إنهاء الاختبار', 'End quiz')}
//               </Button>
//             </div>
//           )}
//         </header>

//         {quizState === 'active' && (
//           <div className="px-6 pt-3">
//             <Progress value={progressPct} className="h-1.5 bg-slate-800" />
//           </div>
//         )}

//         <main className="flex-1 overflow-y-auto flex flex-col items-center pt-6 md:pt-8 px-4 md:px-10 space-y-10">
//           <div className="w-full max-w-4xl space-y-6">
//             {quizState === 'empty' && (
//               <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
//                 {t(locale, 'اختر اختباراً من القائمة الجانبية للبدء', 'Choose a quiz from the sidebar to begin')}
//               </div>
//             )}

//             {loadingQuiz && (
//               <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
//                 {t(locale, 'جارِ التحميل...', 'Loading...')}
//               </div>
//             )}

//             {!loadingQuiz && quizState === 'intro' && currentQuiz && (
//               <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
//                 <div className="space-y-2">
//                   <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
//                     {t(locale, 'جاهز للاختبار', 'Ready to start')}
//                   </span>
//                   <h2 className="text-xl md:text-2xl font-bold text-slate-100">
//                     {t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)}
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-3 gap-3 text-center">
//                   <Stat label={t(locale, 'الأسئلة', 'Questions')} value={String(questions.length)} />
//                   <Stat label={t(locale, 'المدة', 'Duration')} value={`${currentQuiz.duration_min}${t(locale, ' د', 'm')}`} />
//                   <Stat label={t(locale, 'نسبة النجاح', 'Passing')} value={`${currentQuiz.passing_score}%`} />
//                 </div>

//                 {currentQuiz.instructions && (
//                   <div className="space-y-2 text-sm text-slate-300">
//                     <h4 className="font-semibold text-slate-200">{t(locale, 'التعليمات', 'Instructions')}</h4>
//                     <p className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-slate-400 whitespace-pre-line">
//                       {t(locale, currentQuiz.instructions.ar, currentQuiz.instructions.en)}
//                     </p>
//                   </div>
//                 )}

//                 <Button onClick={handleStartQuiz} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-base font-medium">
//                   {t(locale, 'بدء الاختبار الآن', 'Start quiz')}
//                 </Button>
//               </div>
//             )}

//             {quizState === 'paused' && currentQuiz && (
//               <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
//                 <h3 className="text-xl font-bold text-slate-100">
//                   {t(locale, 'تم إيقاف الاختبار مؤقتاً', 'Quiz paused')}
//                 </h3>
//                 <p className="text-sm text-slate-400">
//                   {t(locale, 'يمكنك الاستئناف في أي وقت.', 'You can resume anytime.')}
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <Button onClick={handleBackToIntro} variant="outline" className="border-slate-700 text-slate-300">
//                     {t(locale, 'الرئيسية', 'Home')}
//                   </Button>
//                   <Button onClick={handleResumeQuiz} className="bg-indigo-600 hover:bg-indigo-500 text-white">
//                     {t(locale, 'استئناف', 'Resume')}
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {quizState === 'active' && currentQ && (
//               <QuestionCard
//                 locale={locale}
//                 index={currentIndex}
//                 total={questions.length}
//                 row={currentQ}
//                 answer={answers[currentQ.ques_id]}
//                 flagged={!!flags[currentQ.ques_id]}
//                 revealed={!!revealed[currentQ.ques_id]}
//                 showTranslation={showTranslation}
//                 activeDndItem={activeDndItem}
//                 onToggleTranslation={() => setShowTranslation((s) => !s)}
//                 onToggleFlag={() => toggleFlag(currentQ.ques_id)}
//                 onToggleReveal={() => toggleReveal(currentQ.ques_id)}
//                 onSelectSingle={(optId) => selectSingle(currentQ.ques_id, optId)}
//                 onToggleMultiple={(optId) => toggleMultiple(currentQ.ques_id, optId)}
//                 onSetActiveDndItem={setActiveDndItem}
//                 onToggleDndLink={(l1, l2) => toggleDndLink(currentQ.ques_id, l1, l2)}
//               />
//             )}

//             {quizState === 'active' && currentQ && (
//               <div className="flex justify-between pt-2">
//                 <Button disabled={currentIndex === 0} onClick={goPrev} variant="outline" className="border-slate-700 text-slate-300">
//                   {t(locale, 'السابق', 'Previous')}
//                 </Button>
//                 {currentIndex < questions.length - 1 ? (
//                   <Button onClick={goNext} className="bg-indigo-600 hover:bg-indigo-500 text-white">
//                     {t(locale, 'التالي', 'Next')}
//                   </Button>
//                 ) : (
//                   <Button onClick={handleFinishQuiz} className="bg-emerald-600 hover:bg-emerald-500 text-white">
//                     {t(locale, 'إنهاء الاختبار', 'End quiz')}
//                   </Button>
//                 )}
//               </div>
//             )}

//             {quizState === 'report' && reportData && currentQuiz && (
//               <ReportView
//                 locale={locale}
//                 data={reportData}
//                 quizTitle={t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)}
//                 tab={reportTab}
//                 onTabChange={setReportTab}
//                 onBack={handleBackToIntro}
//               />
//             )}
//           </div>

//           {/* History */}
//           {currentQuiz && quizState !== 'active' && (
//             <div className="w-full max-w-4xl pb-12 space-y-4 border-t border-slate-800/80 pt-8">
//               <h3 className="text-base font-semibold text-slate-200">
//                 {t(locale, 'سجل المحاولات السابقة', 'Attempt history')}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {attempts
//                   .filter((a) => a.is_closed)
//                   .map((attempt) => (
//                     <div
//                       key={attempt.id}
//                       className={`p-4 rounded-xl border flex items-center justify-between ${
//                         attempt.is_passed
//                           ? 'bg-emerald-950/20 border-emerald-900/50'
//                           : 'bg-rose-950/20 border-rose-900/50'
//                       }`}
//                     >
//                       <div className="space-y-1">
//                         <span className={`text-sm font-bold ${attempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
//                           {attempt.is_passed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')} ({attempt.score}%)
//                         </span>
//                         <span className="block text-xs text-slate-400 font-mono">
//                           {t(locale, 'الوقت المستغرق', 'Time used')}: {attempt.time_used_min}
//                           {t(locale, ' د', 'm')} · {new Date(attempt.created_at).toLocaleDateString(locale)}
//                         </span>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="border-slate-700 text-slate-200"
//                         onClick={() => handleViewPastReport(attempt.id)}
//                       >
//                         {t(locale, 'عرض التقرير', 'View report')}
//                       </Button>
//                     </div>
//                   ))}
//                 {attempts.filter((a) => a.is_closed).length === 0 && (
//                   <p className="text-xs text-slate-500 col-span-2">
//                     {t(locale, 'لا توجد محاولات مسجلة لهذا الاختبار حتى الآن.', 'No recorded attempts for this quiz yet.')}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   )
// }

// // =========================================================
// // Small pieces
// // =========================================================

// function Stat({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="bg-slate-950 border border-slate-900 rounded-xl py-3">
//       <div className="text-lg font-bold text-slate-100">{value}</div>
//       <div className="text-[11px] text-slate-500">{label}</div>
//     </div>
//   )
// }

// interface QuestionCardProps {
//   locale: Locale
//   index: number
//   total: number
//   row: QuizQuestionRow
//   answer: any
//   flagged: boolean
//   revealed: boolean
//   showTranslation: boolean
//   activeDndItem: string | null
//   onToggleTranslation: () => void
//   onToggleFlag: () => void
//   onToggleReveal: () => void
//   onSelectSingle: (optionId: string) => void
//   onToggleMultiple: (optionId: string) => void
//   onSetActiveDndItem: (id: string | null) => void
//   onToggleDndLink: (list1Id: string, list2Id: string) => void
// }

// function QuestionCard({
//   locale,
//   index,
//   total,
//   row,
//   answer,
//   flagged,
//   revealed,
//   showTranslation,
//   activeDndItem,
//   onToggleTranslation,
//   onToggleFlag,
//   onToggleReveal,
//   onSelectSingle,
//   onToggleMultiple,
//   onSetActiveDndItem,
//   onToggleDndLink,
// }: QuestionCardProps) {
//   const q = row.question

//   return (
//     <div className="w-full space-y-6">
//       <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
//         <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
//           {t(locale, 'السؤال', 'Question')} {index + 1} / {total}
//         </span>
//         <div className="flex items-center gap-1">
//           <Button size="sm" variant="ghost" onClick={onToggleTranslation} className="text-slate-400 hover:text-white">
//             <Globe className="w-4 h-4 me-1" /> {showTranslation ? t(locale, 'إخفاء الترجمة', 'Hide translation') : t(locale, 'عرض الترجمة', 'Show translation')}
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onToggleFlag} className={flagged ? 'text-amber-400' : 'text-slate-400 hover:text-white'}>
//             <Flag className="w-4 h-4" fill={flagged ? 'currentColor' : 'none'} />
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onToggleReveal} className="text-slate-400 hover:text-white">
//             <Eye className="w-4 h-4 me-1" /> {revealed ? t(locale, 'إخفاء الإجابة', 'Hide answer') : t(locale, 'عرض الإجابة', 'Show answer')}
//           </Button>
//         </div>
//       </div>

//       <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
//         <div>
//           <h3 className="text-lg font-semibold text-slate-100">{q.question.en}</h3>
//           {showTranslation && <p className="text-sm text-slate-500 mt-1">{q.question.ar}</p>}
//           {locale === 'ar' && !showTranslation && (
//             // Primary language is Arabic UI but English stem always shown per spec;
//             // Arabic reading fallback if English text missing.
//             <p className="sr-only">{q.question.ar}</p>
//           )}
//         </div>

//         {(q.type === 'single' || q.type === 'true_false') && (
//           <div className="space-y-3 pt-2">
//             {(q.options as QuestionOption[]).map((opt) => (
//               <OptionRow
//                 key={opt.id}
//                 option={opt}
//                 locale={locale}
//                 showTranslation={showTranslation}
//                 selected={answer === opt.id}
//                 revealed={revealed}
//                 onClick={() => onSelectSingle(opt.id)}
//               />
//             ))}
//           </div>
//         )}

//         {q.type === 'multiple' && (
//           <div className="space-y-3 pt-2">
//             {(q.options as QuestionOption[]).map((opt) => (
//               <OptionRow
//                 key={opt.id}
//                 option={opt}
//                 locale={locale}
//                 showTranslation={showTranslation}
//                 selected={Array.isArray(answer) && answer.includes(opt.id)}
//                 revealed={revealed}
//                 onClick={() => onToggleMultiple(opt.id)}
//               />
//             ))}
//           </div>
//         )}

//         {q.type === 'dnd' && (
//           <DndQuestion
//             options={q.options as DndOptions}
//             locale={locale}
//             showTranslation={showTranslation}
//             answer={answer ?? {}}
//             revealed={revealed}
//             activeItem={activeDndItem}
//             onSetActive={onSetActiveDndItem}
//             onToggleLink={onToggleDndLink}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// function OptionRow({
//   option,
//   locale,
//   showTranslation,
//   selected,
//   revealed,
//   onClick,
// }: {
//   option: QuestionOption
//   locale: Locale
//   showTranslation: boolean
//   selected: boolean
//   revealed: boolean
//   onClick: () => void
// }) {
//   let cls = 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
//   if (!revealed && selected) cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
//   if (revealed && option.is_correct) cls = 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
//   if (revealed && selected && !option.is_correct) cls = 'border-rose-600 bg-rose-950/30 text-rose-300'

//   return (
//     <button onClick={onClick} disabled={revealed} className={`w-full text-start p-4 rounded-xl border transition-colors ${cls}`}>
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <p>{option.text.en}</p>
//           {showTranslation && <p className="text-xs text-slate-500 mt-0.5">{option.text.ar}</p>}
//         </div>
//         {revealed && (option.is_correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : selected ? <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> : null)}
//       </div>
//       {revealed && (
//         <p className="text-xs mt-2 opacity-80">{t(locale, option.explanation.ar, option.explanation.en)}</p>
//       )}
//     </button>
//   )
// }

// function DndQuestion({
//   options,
//   locale,
//   showTranslation,
//   answer,
//   revealed,
//   activeItem,
//   onSetActive,
//   onToggleLink,
// }: {
//   options: DndOptions
//   locale: Locale
//   showTranslation: boolean
//   answer: Record<string, string[]>
//   revealed: boolean
//   activeItem: string | null
//   onSetActive: (id: string | null) => void
//   onToggleLink: (list1Id: string, list2Id: string) => void
// }) {
//   const isCorrectForItem = (list1Id: string) => {
//     const expected = (options.correct_map[list1Id] ?? []).slice().sort()
//     const given = (answer[list1Id] ?? []).slice().sort()
//     return JSON.stringify(expected) === JSON.stringify(given)
//   }

//   return (
//     <div className="space-y-3">
//       <p className="text-xs text-slate-500">
//         {t(
//           locale,
//           'اختر عنصراً من القائمة الأولى ثم اضغط على العناصر المطابقة له في القائمة الثانية.',
//           'Pick an item from list 1, then click its matches in list 2.'
//         )}
//       </p>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-slate-400">{t(locale, 'القائمة الأولى', 'List 1')}</p>
//           {options.list1.map((item) => {
//             const linked = answer[item.id] ?? []
//             const isActive = activeItem === item.id
//             let cls = 'border-slate-800 bg-slate-950/40 text-slate-300'
//             if (!revealed && isActive) cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
//             if (revealed) cls = isCorrectForItem(item.id) ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300' : 'border-rose-600 bg-rose-950/30 text-rose-300'

//             return (
//               <button
//                 key={item.id}
//                 disabled={revealed}
//                 onClick={() => onSetActive(item.id)}
//                 className={`w-full text-start p-3 rounded-lg border text-sm ${cls}`}
//               >
//                 <div>{item.text.en}</div>
//                 {showTranslation && <div className="text-[11px] text-slate-500">{item.text.ar}</div>}
//                 {linked.length > 0 && <div className="text-[10px] mt-1 opacity-70">{linked.length} {t(locale, 'مرتبط', 'linked')}</div>}
//               </button>
//             )
//           })}
//         </div>
//         <div className="space-y-2">
//           <p className="text-xs font-semibold text-slate-400">{t(locale, 'القائمة الثانية', 'List 2')}</p>
//           {options.list2.map((item) => {
//             const isLinkedToActive = activeItem ? (answer[activeItem] ?? []).includes(item.id) : false
//             let cls = 'border-slate-800 bg-slate-950/40 text-slate-300'
//             if (!revealed && isLinkedToActive) cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
//             return (
//               <button
//                 key={item.id}
//                 disabled={revealed || !activeItem}
//                 onClick={() => activeItem && onToggleLink(activeItem, item.id)}
//                 className={`w-full text-start p-3 rounded-lg border text-sm ${cls} ${!activeItem && !revealed ? 'opacity-50' : ''}`}
//               >
//                 <div>{item.text.en}</div>
//                 {showTranslation && <div className="text-[11px] text-slate-500">{item.text.ar}</div>}
//               </button>
//             )
//           })}
//         </div>
//       </div>
//       {revealed && options.explanation && (
//         <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-900">
//           {t(locale, options.explanation.ar, options.explanation.en)}
//         </p>
//       )}
//     </div>
//   )
// }

// function ReportView({
//   locale,
//   data,
//   quizTitle,
//   tab,
//   onTabChange,
//   onBack,
// }: {
//   locale: Locale
//   data: QuizReportData
//   quizTitle: string
//   tab: 'summary' | 'detailed'
//   onTabChange: (t: 'summary' | 'detailed') => void
//   onBack: () => void
// }) {
//   const wrong = data.total - data.correctCount

//   return (
//     <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-bold text-slate-100">{t(locale, 'تقرير الاختبار', 'Quiz report')}</h2>
//         <Button size="sm" variant="outline" onClick={onBack} className="border-slate-700 text-slate-300">
//           {t(locale, 'رجوع', 'Back')}
//         </Button>
//       </div>

//       <div className="grid grid-cols-3 gap-3 text-center">
//         <Stat label={t(locale, 'إجمالي الأسئلة', 'Total questions')} value={String(data.total)} />
//         <Stat label={t(locale, 'إجابات صحيحة', 'Correct')} value={String(data.correctCount)} />
//         <Stat label={t(locale, 'إجابات خاطئة', 'Wrong')} value={String(wrong)} />
//       </div>

//       <div
//         className={`text-center py-3 rounded-xl font-bold text-lg ${
//           data.isPassed ? 'bg-emerald-950/30 text-emerald-400' : 'bg-rose-950/30 text-rose-400'
//         }`}
//       >
//         {data.score}% — {data.isPassed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')}
//       </div>

//       <Tabs value={tab} onValueChange={(v) => onTabChange(v as 'summary' | 'detailed')}>
//         <TabsList className="bg-slate-900 border border-slate-800">
//           <TabsTrigger
//             value="summary"
//             className="text-slate-400 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-800"
//           >
//             {t(locale, 'ملخص', 'Summary')}
//           </TabsTrigger>
//           <TabsTrigger
//             value="detailed"
//             className="text-slate-400 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-800"
//           >
//             {t(locale, 'مراجعة تفصيلية', 'Detailed review')}
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="summary" className="pt-4">
//           <div className="overflow-hidden rounded-xl border border-slate-800">
//             <table className="w-full text-sm">
//               <thead className="bg-slate-900 text-slate-400">
//                 <tr>
//                   <th className="p-3 text-start">#</th>
//                   <th className="p-3 text-start">{t(locale, 'الاختبار', 'Quiz')}</th>
//                   <th className="p-3 text-start">{t(locale, 'النتيجة', 'Result')}</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-800">
//                 {data.questions.map((row, i) => {
//                   const res = data.results.find((r) => r.question_id === row.ques_id)
//                   return (
//                     <tr key={row.id} className="text-slate-300">
//                       <td className="p-3">{i + 1}</td>
//                       <td className="p-3 truncate max-w-xs">{quizTitle}</td>
//                       <td className="p-3">
//                         {res?.is_correct ? (
//                           <span className="inline-flex items-center gap-1 text-emerald-400">
//                             <CheckCircle2 className="w-4 h-4" /> {t(locale, 'صحيح', 'Correct')}
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1 text-rose-400">
//                             <XCircle className="w-4 h-4" /> {t(locale, 'خاطئ', 'Wrong')}
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </TabsContent>

//         <TabsContent value="detailed" className="pt-4 space-y-6">
//           {data.questions.map((row, i) => (
//             <ReviewQuestion key={row.id} index={i} locale={locale} row={row} userAnswer={data.attempt.answer_state?.[row.ques_id]} />
//           ))}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// function ReviewQuestion({
//   index,
//   locale,
//   row,
//   userAnswer,
// }: {
//   index: number
//   locale: Locale
//   row: QuizQuestionRow
//   userAnswer: any
// }) {
//   const q = row.question

//   return (
//     <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-3">
//       <p className="text-xs font-mono text-indigo-400">
//         {t(locale, 'السؤال', 'Question')} {index + 1}
//       </p>
//       <h4 className="font-semibold text-slate-100">{q.question.en}</h4>

//       {(q.type === 'single' || q.type === 'multiple' || q.type === 'true_false') && (
//         <div className="space-y-2 pt-1">
//           {(q.options as QuestionOption[]).map((opt) => {
//             const selected = q.type === 'multiple' ? Array.isArray(userAnswer) && userAnswer.includes(opt.id) : userAnswer === opt.id
//             let cls = 'border-slate-800 bg-slate-950/60 text-slate-400'
//             if (opt.is_correct) cls = 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
//             else if (selected) cls = 'border-rose-600 bg-rose-950/30 text-rose-300'
//             return (
//               <div key={opt.id} className={`p-3 rounded-lg border text-sm ${cls}`}>
//                 <div className="flex items-center justify-between">
//                   <span>{opt.text.en}</span>
//                   {opt.is_correct ? <CheckCircle2 className="w-4 h-4" /> : selected ? <XCircle className="w-4 h-4" /> : null}
//                 </div>
//                 <p className="text-xs mt-1 opacity-80">{t(locale, opt.explanation.ar, opt.explanation.en)}</p>
//               </div>
//             )
//           })}
//         </div>
//       )}

//       {q.type === 'dnd' && (
//         <DndQuestion
//           options={q.options as DndOptions}
//           locale={locale}
//           showTranslation
//           answer={userAnswer ?? {}}
//           revealed
//           activeItem={null}
//           onSetActive={() => {}}
//           onToggleLink={() => {}}
//         />
//       )}
//     </div>
//   )
// }



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////// صخخخخخخخخخخقنهىل //////////////////////////////////



'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flag,
  Globe,
  Pause,
  PanelLeftClose,
  PanelLeftOpen,
  Eye,
  CheckCircle2,
  XCircle,
  GripVertical,
  Search,
  ListFilter,
  Link2,
} from 'lucide-react'
import {
  getOrCreateActiveAttempt,
  updateAttemptProgress,
  submitAndCloseQuiz,
  getAttemptReport,
  type SectionRow,
  type QuizRow,
  type QuizQuestionRow,
  type QuizAttemptRow,
  type QuestionOption,
  type DndOptions,
  type QuizReportData,
  DndItem,
} from './actions'

type Locale = 'ar' | 'en'
type QuizState = 'empty' | 'intro' | 'active' | 'paused' | 'report'

interface QuizzesClientProps {
  sections: SectionRow[]
  allQuizzes: QuizRow[]
  initialQuiz: QuizRow | null
  initialQuestions: QuizQuestionRow[]
  initialAttempts: QuizAttemptRow[]
  allUserAttempts: QuizAttemptRow[]
  userId: string
  courseSlug: string
}

const t = (locale: Locale, ar: string, en: string) => (locale === 'ar' ? ar : en)

export function QuizzesClient({
  sections,
  allQuizzes,
  initialQuiz,
  initialQuestions,
  initialAttempts,
  allUserAttempts,
  userId,
}: QuizzesClientProps) {
  const locale = useLocale() as Locale

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    () => (initialQuiz ? { [initialQuiz.section_id ?? '']: true } : {})
  )

  const [currentQuiz, setCurrentQuiz] = useState<QuizRow | null>(initialQuiz)
  const [questions, setQuestions] = useState<QuizQuestionRow[]>(initialQuestions)
  const [attempts, setAttempts] = useState<QuizAttemptRow[]>(initialAttempts)
  const [allAttempts, setAllAttempts] = useState<QuizAttemptRow[]>(allUserAttempts)
  const [loadingQuiz, setLoadingQuiz] = useState(false)

  const [quizState, setQuizState] = useState<QuizState>(initialQuiz ? 'intro' : 'empty')
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttemptRow | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [flags, setFlags] = useState<Record<number, boolean>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [showTranslation, setShowTranslation] = useState(false)
  const [activeDndItem, setActiveDndItem] = useState<string | null>(null)

  const [remainingSec, setRemainingSec] = useState((initialQuiz?.duration_min ?? 0) * 60)
  const [timerActive, setTimerActive] = useState(false)
  const [reportData, setReportData] = useState<QuizReportData | null>(null)
  const [reportTab, setReportTab] = useState<'summary' | 'detailed'>('summary')

  const answersRef = useRef(answers)
  const flagsRef = useRef(flags)
  const remainingRef = useRef(remainingSec)
  const indexRef = useRef(currentIndex)
  const attemptRef = useRef(currentAttempt)
  const revealedRef = useRef(revealed)
  const quizStateRef = useRef(quizState)
  useEffect(() => void (answersRef.current = answers), [answers])
  useEffect(() => void (flagsRef.current = flags), [flags])
  useEffect(() => void (remainingRef.current = remainingSec), [remainingSec])
  useEffect(() => void (indexRef.current = currentIndex), [currentIndex])
  useEffect(() => void (attemptRef.current = currentAttempt), [currentAttempt])
  useEffect(() => void (revealedRef.current = revealed), [revealed])
  useEffect(() => void (quizStateRef.current = quizState), [quizState])

  const currentQ = questions[currentIndex]

  // ---------------- Countdown timer ----------------
  useEffect(() => {
    if (quizState !== 'active' || !timerActive) return
    if (remainingSec <= 0) {
      handleFinishQuiz()
      return
    }
    const id = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          handleFinishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizState, timerActive])

  // ---------------- Autosave on tab hide / unmount while active ----------------
  useEffect(() => {
    const save = () => {
      const attempt = attemptRef.current
      if (quizStateRef.current === 'active' && attempt) {
        updateAttemptProgress(
          attempt.id,
          indexRef.current,
          remainingRef.current,
          answersRef.current,
          flagsRef.current,
          revealedRef.current
        ).catch(() => {})
      }
    }
    const onVisibility = () => {
      if (document.hidden) save()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('beforeunload', save)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('beforeunload', save)
      save()
    }
  }, [])

  // ---------------- Sidebar helpers ----------------
  const toggleSection = (id: string) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }))

  const quizStatus = useCallback(
    (quizId: number) => {
      const forThisQuiz = allAttempts.filter((a) => a.quiz_id === quizId && a.is_closed)
      if (forThisQuiz.some((a) => a.is_passed)) return 'passed'
      if (forThisQuiz.length > 0) return 'attempted'
      return 'none'
    },
    [allAttempts]
  )

  const statusDotClass = (status: string) => {
    if (status === 'passed') return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
    if (status === 'attempted') return 'bg-amber-400'
    return 'bg-slate-700'
  }

  // ---------------- Selecting a quiz from the sidebar ----------------
  const handleSelectQuiz = useCallback(
    async (quiz: QuizRow) => {
      if (quizState === 'active') {
        await handlePauseQuiz()
      }
      setLoadingQuiz(true)
      setCurrentQuiz(quiz)
      setCurrentAttempt(null)
      setCurrentIndex(0)
      setAnswers({})
      setFlags({})
      setRevealed({})
      setShowTranslation(false)
      setRemainingSec(quiz.duration_min * 60)
      setTimerActive(false)
      setReportData(null)

      try {
        const { getQuizQuestions } = await import('./actions')
        const qs = await getQuizQuestions(quiz.id)
        setQuestions(qs)
      } finally {
        setLoadingQuiz(false)
      }

      setAttempts(allAttempts.filter((a) => a.quiz_id === quiz.id))
      setQuizState('intro')
    },
    [allAttempts, quizState]
  )

  // ---------------- Start / resume ----------------
  const handleStartQuiz = async () => {
    if (!currentQuiz) return
    const attempt = await getOrCreateActiveAttempt(userId, currentQuiz.id, currentQuiz.duration_min)
    setCurrentAttempt(attempt)

    const {
      __flags = {},
      __revealed = {},
      ...savedAnswers
    } = (attempt.answer_state ?? {}) as Record<string, any>
    setAnswers(savedAnswers ?? {})
    setFlags(__flags ?? {})
    setRevealed(__revealed ?? {})
    setCurrentIndex(attempt.current_question_index ?? 0)
    setRemainingSec(attempt.remaining_time_sec ?? currentQuiz.duration_min * 60)
    setRevealed({})
    setQuizState('active')
    setTimerActive(true)
  }

  const handlePauseQuiz = async () => {
    setTimerActive(false)
    setQuizState('paused')
    if (currentAttempt) {
      await updateAttemptProgress(
        currentAttempt.id,
        currentIndex,
        remainingSec,
        answers,
        flags,
        revealed
      )
    }
  }

  const handleResumeQuiz = () => {
    setQuizState('active')
    setTimerActive(true)
  }

  const handleFinishQuiz = async () => {
    if (!currentAttempt || !currentQuiz) return
    setTimerActive(false)
    const usedSec = currentQuiz.duration_min * 60 - remainingRef.current
    const timeUsedMin = Math.max(1, Math.round(usedSec / 60))

    const result = await submitAndCloseQuiz(
      currentAttempt.id,
      currentQuiz.id,
      userId,
      answersRef.current,
      flagsRef.current,
      timeUsedMin,
      revealedRef.current
    )

    setReportData(result)
    setReportTab('summary')
    setAttempts((prev) => [result.attempt, ...prev])
    setAllAttempts((prev) => [result.attempt, ...prev])
    setQuizState('report')
  }

  const handleViewPastReport = async (attemptId: number) => {
    const report = await getAttemptReport(attemptId)
    setReportData(report)
    setReportTab('summary')
    setQuizState('report')
  }

  const handleBackToIntro = () => {
    setReportData(null)
    setQuizState('intro')
  }

  // ---------------- Answering ----------------
  const selectSingle = (quesId: number, optionId: string) => {
    if (revealed[quesId]) return
    setAnswers((prev) => ({ ...prev, [quesId]: optionId }))
  }

  const toggleMultiple = (quesId: number, optionId: string) => {
    if (revealed[quesId]) return
    setAnswers((prev) => {
      const current: string[] = Array.isArray(prev[quesId]) ? prev[quesId] : []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [quesId]: next }
    })
  }

  const toggleDndLink = (quesId: number, list1Id: string, list2Id: string) => {
    if (revealed[quesId]) return
    setAnswers((prev) => {
      const map: Record<string, string[]> = { ...(prev[quesId] ?? {}) }
      const current = map[list1Id] ?? []
      map[list1Id] = current.includes(list2Id)
        ? current.filter((id) => id !== list2Id)
        : [...current, list2Id]
      return { ...prev, [quesId]: map }
    })
  }

  const toggleFlag = (quesId: number) =>
    setFlags((prev) => ({ ...prev, [quesId]: !prev[quesId] }))

  const toggleReveal = (quesId: number) => {
    const row = questions.find((q) => q.ques_id === quesId)
    if (!row) return

    setRevealed((prev) => {
      const nextRevealed = !prev[quesId]

      if (nextRevealed) {
        const q = row.question

        if (q.type === 'single' || q.type === 'true_false') {
          const correct = (q.options as QuestionOption[]).find((opt) => opt.is_correct)
          if (correct) {
            setAnswers((current) => ({ ...current, [quesId]: correct.id }))
          }
        } else if (q.type === 'multiple') {
          const correctIds = (q.options as QuestionOption[])
            .filter((opt) => opt.is_correct)
            .map((opt) => opt.id)
          setAnswers((current) => ({ ...current, [quesId]: correctIds }))
        } else if (q.type === 'dnd') {
          const dnd = q.options as DndOptions
          const solution = Object.fromEntries(
            Object.entries(dnd.correct_map).map(([leftId, rightIds]) => [
              leftId,
              [...rightIds],
            ])
          )
          setAnswers((current) => ({ ...current, [quesId]: solution }))
        }
      }

      return { ...prev, [quesId]: nextRevealed }
    })
  }

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))

  const progressPct = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0

  const headerTitle = currentQuiz
    ? t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)
    : t(locale, 'اختر اختباراً', 'Choose a quiz')

  const mmss = (sec: number) =>
    `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-e border-slate-800/80 flex flex-col z-20 shadow-2xl">
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/50">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm text-slate-200">
              {t(locale, 'محتوى الاختبارات', 'Quiz contents')}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {sections.map((section) => {
              const isExpanded = !!expandedSections[section.id]
              const totalMin = section.quizzes.reduce((sum, q) => sum + q.duration_min, 0)

              return (
                <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-3.5 bg-slate-900/60 hover:bg-slate-800/60 flex justify-between items-center text-start text-xs md:text-sm text-slate-300 transition-colors"
                  >
                    <span className="truncate pe-2 font-medium">
                      {t(locale, section.title_ar, section.title_en)}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
                        {totalMin} {t(locale, 'د', 'min')}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="divide-y divide-slate-800/50 bg-slate-950/20">
                      {section.quizzes.map((quiz) => {
                        const isSelected = currentQuiz?.id === quiz.id
                        const status = quizStatus(quiz.id)
                        return (
                          <button
                            key={quiz.id}
                            onClick={() => handleSelectQuiz(quiz)}
                            className={`w-full p-3.5 flex items-center justify-between text-xs md:text-sm text-start transition-colors ${
                              isSelected
                                ? 'bg-violet-600/15 text-violet-300 font-medium border-s-4 border-violet-500'
                                : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="flex items-center gap-3 truncate">
                              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDotClass(status)}`} />
                              <span className="truncate">{t(locale, quiz.title?.ar, quiz.title?.en)}</span>
                            </span>
                            <span className="text-[11px] text-slate-500 shrink-0 font-mono">
                              {quiz.duration_min}{t(locale, 'د', 'm')}
                            </span>
                          </button>
                        )
                      })}
                      {section.quizzes.length === 0 && (
                        <p className="p-3.5 text-[11px] text-slate-600">
                          {t(locale, 'لا توجد اختبارات في هذا القسم', 'No quizzes in this section')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* App bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </Button>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
                {headerTitle}
              </h1>
              {currentQuiz && (
                <span className="text-xs text-slate-400">
                  {t(locale, 'المدة', 'Duration')}: {currentQuiz.duration_min}{t(locale, ' د', 'm')} ·{' '}
                  {t(locale, 'نسبة النجاح', 'Passing score')}: {currentQuiz.passing_score}%
                </span>
              )}
            </div>
          </div>

          {quizState === 'active' && (
            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg font-mono text-violet-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{mmss(remainingSec)}</span>
              </div>
              <Button size="sm" variant="outline" onClick={handlePauseQuiz} className="border-slate-700 text-slate-300">
                <Pause className="w-4 h-4 me-1" /> {t(locale, 'إيقاف مؤقت', 'Pause')}
              </Button>
              <Button size="sm" variant="destructive" onClick={handleFinishQuiz} className="text-white">
                {t(locale, 'إنهاء الاختبار', 'End quiz')}
              </Button>
            </div>
          )}
        </header>

        {quizState === 'active' && (
          <div className="px-6 pt-3">
            <Progress value={progressPct} className="h-1.5 bg-slate-800" />
          </div>
        )}

        <main className="flex-1 overflow-y-auto flex flex-col items-center pt-6 md:pt-8 px-4 md:px-10 space-y-10">
          <div className="w-full max-w-4xl space-y-6">
            {quizState === 'empty' && (
              <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
                {t(locale, 'اختر اختباراً من القائمة الجانبية للبدء', 'Choose a quiz from the sidebar to begin')}
              </div>
            )}

            {loadingQuiz && (
              <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
                {t(locale, 'جارِ التحميل...', 'Loading...')}
              </div>
            )}

            {!loadingQuiz && quizState === 'intro' && currentQuiz && (
              <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold">
                    {t(locale, 'جاهز للاختبار', 'Ready to start')}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-100">
                    {t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)}
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <Stat label={t(locale, 'الأسئلة', 'Questions')} value={String(questions.length)} />
                  <Stat label={t(locale, 'المدة', 'Duration')} value={`${currentQuiz.duration_min}${t(locale, ' د', 'm')}`} />
                  <Stat label={t(locale, 'نسبة النجاح', 'Passing')} value={`${currentQuiz.passing_score}%`} />
                </div>

                {currentQuiz.instructions && (
                  <div className="space-y-2 text-sm text-slate-300">
                    <h4 className="font-semibold text-slate-200">{t(locale, 'التعليمات', 'Instructions')}</h4>
                    <p className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-slate-400 whitespace-pre-line">
                      {t(locale, currentQuiz.instructions.ar, currentQuiz.instructions.en)}
                    </p>
                  </div>
                )}

                <Button onClick={handleStartQuiz} className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl text-base font-medium">
                  {t(locale, 'بدء الاختبار الآن', 'Start quiz')}
                </Button>
              </div>
            )}

            {quizState === 'paused' && currentQuiz && (
              <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-xl font-bold text-slate-100">
                  {t(locale, 'تم إيقاف الاختبار مؤقتاً', 'Quiz paused')}
                </h3>
                <p className="text-sm text-slate-400">
                  {t(locale, 'يمكنك الاستئناف في أي وقت.', 'You can resume anytime.')}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleBackToIntro} variant="outline" className="border-slate-700 text-slate-300">
                    {t(locale, 'الرئيسية', 'Home')}
                  </Button>
                  <Button onClick={handleResumeQuiz} className="bg-violet-600 hover:bg-violet-500 text-white">
                    {t(locale, 'استئناف', 'Resume')}
                  </Button>
                </div>
              </div>
            )}

            {quizState === 'active' && currentQ && (
              <QuestionCard
                locale={locale}
                index={currentIndex}
                total={questions.length}
                row={currentQ}
                answer={answers[currentQ.ques_id]}
                flagged={!!flags[currentQ.ques_id]}
                revealed={!!revealed[currentQ.ques_id]}
                showTranslation={showTranslation}
                activeDndItem={activeDndItem}
                onToggleTranslation={() => setShowTranslation((s) => !s)}
                onToggleFlag={() => toggleFlag(currentQ.ques_id)}
                onToggleReveal={() => toggleReveal(currentQ.ques_id)}
                onSelectSingle={(optId) => selectSingle(currentQ.ques_id, optId)}
                onToggleMultiple={(optId) => toggleMultiple(currentQ.ques_id, optId)}
                onSetActiveDndItem={setActiveDndItem}
                onToggleDndLink={(l1, l2) => toggleDndLink(currentQ.ques_id, l1, l2)}
              />
            )}

            {quizState === 'active' && currentQ && (
              <div className="flex justify-between pt-2">
                <Button disabled={currentIndex === 0} onClick={goPrev} variant="outline" className="border-slate-700 text-slate-300">
                  {t(locale, 'السابق', 'Previous')}
                </Button>
                {currentIndex < questions.length - 1 ? (
                  <Button onClick={goNext} className="bg-violet-600 hover:bg-violet-500 text-white">
                    {t(locale, 'التالي', 'Next')}
                  </Button>
                ) : (
                  <Button onClick={handleFinishQuiz} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    {t(locale, 'إنهاء الاختبار', 'End quiz')}
                  </Button>
                )}
              </div>
            )}

            {quizState === 'report' && reportData && currentQuiz && (
              <ReportView
                locale={locale}
                data={reportData}
                quizTitle={t(locale, currentQuiz.title?.ar, currentQuiz.title?.en)}
                tab={reportTab}
                onTabChange={setReportTab}
                onBack={handleBackToIntro}
              />
            )}
          </div>

          {/* History */}
          {currentQuiz && quizState !== 'active' && (
            <div className="w-full max-w-4xl pb-12 space-y-4 border-t border-slate-800/80 pt-8">
              <h3 className="text-base font-semibold text-slate-200">
                {t(locale, 'سجل المحاولات السابقة', 'Attempt history')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attempts
                  .filter((a) => a.is_closed)
                  .map((attempt) => (
                    <div
                      key={attempt.id}
                      className={`p-4 rounded-xl border flex items-center justify-between ${
                        attempt.is_passed
                          ? 'bg-emerald-950/20 border-emerald-900/50'
                          : 'bg-rose-950/20 border-rose-900/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className={`text-sm font-bold ${attempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {attempt.is_passed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')} ({attempt.score}%)
                        </span>
                        <span className="block text-xs text-slate-400 font-mono">
                          {t(locale, 'الوقت المستغرق', 'Time used')}: {attempt.time_used_min}
                          {t(locale, ' د', 'm')} · {new Date(attempt.created_at).toLocaleDateString(locale)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-700 text-slate-200"
                        onClick={() => handleViewPastReport(attempt.id)}
                      >
                        {t(locale, 'عرض التقرير', 'View report')}
                      </Button>
                    </div>
                  ))}
                {attempts.filter((a) => a.is_closed).length === 0 && (
                  <p className="text-xs text-slate-500 col-span-2">
                    {t(locale, 'لا توجد محاولات مسجلة لهذا الاختبار حتى الآن.', 'No recorded attempts for this quiz yet.')}
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// =========================================================
// Small pieces
// =========================================================

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-950 border border-slate-900 rounded-xl py-3">
      <div className="text-lg font-bold text-slate-100">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  )
}

interface QuestionCardProps {
  locale: Locale
  index: number
  total: number
  row: QuizQuestionRow
  answer: any
  flagged: boolean
  revealed: boolean
  showTranslation: boolean
  activeDndItem: string | null
  onToggleTranslation: () => void
  onToggleFlag: () => void
  onToggleReveal: () => void
  onSelectSingle: (optionId: string) => void
  onToggleMultiple: (optionId: string) => void
  onSetActiveDndItem: (id: string | null) => void
  onToggleDndLink: (list1Id: string, list2Id: string) => void
}

function QuestionCard({
  locale,
  index,
  total,
  row,
  answer,
  flagged,
  revealed,
  showTranslation,
  activeDndItem,
  onToggleTranslation,
  onToggleFlag,
  onToggleReveal,
  onSelectSingle,
  onToggleMultiple,
  onSetActiveDndItem,
  onToggleDndLink,
}: QuestionCardProps) {
  const q = row.question

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <span className="text-xs font-mono bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full border border-violet-500/20">
          {t(locale, 'السؤال', 'Question')} {index + 1} / {total}
        </span>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={onToggleTranslation} className="text-slate-400 hover:text-white">
            <Globe className="w-4 h-4 me-1" /> {showTranslation ? t(locale, 'إخفاء الترجمة', 'Hide translation') : t(locale, 'عرض الترجمة', 'Show translation')}
          </Button>
          <Button size="sm" variant="ghost" onClick={onToggleFlag} className={flagged ? 'text-amber-400' : 'text-slate-400 hover:text-white'}>
            <Flag className="w-4 h-4" fill={flagged ? 'currentColor' : 'none'} />
          </Button>
          <Button size="sm" variant="ghost" onClick={onToggleReveal} className="text-slate-400 hover:text-white">
            <Eye className="w-4 h-4 me-1" /> {revealed ? t(locale, 'إخفاء الإجابة', 'Hide answer') : t(locale, 'عرض الإجابة', 'Show answer')}
          </Button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">
            {t(locale, q.question.ar, q.question.en)}
          </h3>
          {showTranslation && (
            <p className="text-sm text-slate-400 mt-2 border-s-2 border-cyan-400/40 ps-3">
              {t(locale, q.question.en, q.question.ar)}
            </p>
          )}
        </div>

        {(q.type === 'single' || q.type === 'true_false') && (
          <div className="space-y-3 pt-2">
            {(q.options as QuestionOption[]).map((opt) => (
              <OptionRow
                key={opt.id}
                option={opt}
                locale={locale}
                showTranslation={showTranslation}
                selected={answer === opt.id}
                revealed={revealed}
                onClick={() => onSelectSingle(opt.id)}
              />
            ))}
          </div>
        )}

        {q.type === 'multiple' && (
          <div className="space-y-3 pt-2">
            {(q.options as QuestionOption[]).map((opt) => (
              <OptionRow
                key={opt.id}
                option={opt}
                locale={locale}
                showTranslation={showTranslation}
                selected={Array.isArray(answer) && answer.includes(opt.id)}
                revealed={revealed}
                onClick={() => onToggleMultiple(opt.id)}
              />
            ))}
          </div>
        )}

        {q.type === 'dnd' && (
          <DndQuestion
            options={q.options as DndOptions}
            locale={locale}
            showTranslation={showTranslation}
            answer={answer ?? {}}
            revealed={revealed}
            activeItem={activeDndItem}
            onSetActive={onSetActiveDndItem}
            onToggleLink={onToggleDndLink}
          />
        )}
      </div>
    </div>
  )
}

function OptionRow({
  option,
  locale,
  showTranslation,
  selected,
  revealed,
  onClick,
}: {
  option: QuestionOption
  locale: Locale
  showTranslation: boolean
  selected: boolean
  revealed: boolean
  onClick: () => void
}) {
  let cls = 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
  if (!revealed && selected) cls = 'border-violet-500 bg-violet-500/10 text-violet-200'
  if (revealed && option.is_correct) cls = 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
  if (revealed && selected && !option.is_correct) cls = 'border-rose-600 bg-rose-950/30 text-rose-300'

  return (
    <button onClick={onClick} disabled={revealed} className={`w-full text-start p-4 rounded-xl border transition-colors ${cls}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p>{t(locale, option.text.ar, option.text.en)}</p>
          {showTranslation && (
            <p className="text-xs text-slate-400 mt-1">
              {t(locale, option.text.en, option.text.ar)}
            </p>
          )}
        </div>
        {revealed && (option.is_correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : selected ? <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> : null)}
      </div>
      {revealed && (
        <p className="text-xs mt-2 opacity-80">{t(locale, option.explanation.ar, option.explanation.en)}</p>
      )}
    </button>
  )
}

function DndQuestion({
  options,
  locale,
  showTranslation,
  answer,
  revealed,
  activeItem,
  onSetActive,
  onToggleLink,
}: {
  options: DndOptions
  locale: Locale
  showTranslation: boolean
  answer: Record<string, string[]>
  revealed: boolean
  activeItem: string | null
  onSetActive: (id: string | null) => void
  onToggleLink: (list1Id: string, list2Id: string) => void
}) {
  const [draggingItem, setDraggingItem] = useState<string | null>(null)

  const isLinked = (leftId: string, rightId: string) =>
    (answer[leftId] ?? []).includes(rightId)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-medium text-violet-300">
          <GripVertical className="h-4 w-4" />
          {t(locale, 'اسحب العنصر من القائمة الأولى وأسقطه على العنصر المطابق في القائمة الثانية.', 'Drag an item from the first list and drop it on its matching item in the second list.')}
        </div>
        <p className="mt-1 text-slate-500">
          {t(locale, 'يمكنك أيضاً الضغط على عنصر ثم الضغط على العنصر المطابق كطريقة بديلة.', 'You can also click an item and then click its match as an alternative.')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="px-1 text-xs font-semibold text-slate-400">
            {t(locale, 'العناصر', 'Items')}
          </p>

          {options.list1.map((item) => {
            const linked = answer[item.id] ?? []
            const isActive = activeItem === item.id
            const isDragging = draggingItem === item.id

            let cls = 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-violet-500/50'
            if (!revealed && isActive) {
              cls = 'border-violet-500 bg-violet-500/10 text-violet-200 shadow-lg shadow-violet-950/20'
            }

            if (revealed) {
              const expected = options.correct_map[item.id] ?? []
              const given = answer[item.id] ?? []
              const correct =
                JSON.stringify([...expected].sort()) === JSON.stringify([...given].sort())

              cls = correct
                ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                : 'border-rose-500/60 bg-rose-500/10 text-rose-200'
            }

            return (
              <div
                key={item.id}
                draggable={!revealed}
                onDragStart={() => {
                  setDraggingItem(item.id)
                  onSetActive(item.id)
                }}
                onDragEnd={() => setDraggingItem(null)}
                onClick={() => !revealed && onSetActive(item.id)}
                className={`flex cursor-grab items-center gap-3 rounded-xl border p-3 text-sm transition-all active:cursor-grabbing ${cls} ${
                  isDragging ? 'scale-[0.99] opacity-60' : ''
                }`}
              >
                <GripVertical className="h-4 w-4 shrink-0 text-slate-500" />
                <div className="min-w-0 flex-1">
                  <div>{t(locale, item.text.ar, item.text.en)}</div>
                  {showTranslation && (
                    <div className="mt-1 text-[11px] text-slate-500">
                      {t(locale, item.text.en, item.text.ar)}
                    </div>
                  )}
                </div>
                {linked.length > 0 && !revealed && (
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-300">
                    {linked.length}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="space-y-2">
          <p className="px-1 text-xs font-semibold text-slate-400">
            {t(locale, 'المطابقات', 'Matches')}
          </p>

          {options.list2.map((item) => {
            const linkedToActive = activeItem ? isLinked(activeItem, item.id) : false
            const linkedFrom = options.list1.find((left) => isLinked(left.id, item.id))

            let cls = 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-cyan-500/50'

            if (!revealed && linkedToActive) {
              cls = 'border-cyan-500 bg-cyan-500/10 text-cyan-200 shadow-lg shadow-cyan-950/20'
            }

            if (revealed) {
              const correctLeft = options.list1.find((left) =>
                (options.correct_map[left.id] ?? []).includes(item.id)
              )
              const userLeft = options.list1.find((left) => isLinked(left.id, item.id))

              cls =
                correctLeft?.id === userLeft?.id
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                  : userLeft
                    ? 'border-rose-500/60 bg-rose-500/10 text-rose-200'
                    : 'border-slate-700 bg-slate-900 text-slate-500'
            }

            return (
              <button
                key={item.id}
                type="button"
                disabled={revealed}
                onDragOver={(e) => {
                  if (!revealed && draggingItem) e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  if (draggingItem) {
                    onToggleLink(draggingItem, item.id)
                    setDraggingItem(null)
                  }
                }}
                onClick={() => {
                  if (!revealed && activeItem) onToggleLink(activeItem, item.id)
                }}
                className={`w-full rounded-xl border p-3 text-start text-sm transition-all ${cls} ${
                  !activeItem && !draggingItem && !revealed ? 'opacity-80' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div>{t(locale, item.text.ar, item.text.en)}</div>
                    {showTranslation && (
                      <div className="mt-1 text-[11px] text-slate-500">
                        {t(locale, item.text.en, item.text.ar)}
                      </div>
                    )}
                  </div>

                  {!revealed && linkedFrom && (
                    <Link2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {revealed && options.explanation && (
        <p className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-400">
          {t(locale, options.explanation.ar, options.explanation.en)}
        </p>
      )}
    </div>
  )
}

function ReportView({
  locale,
  data,
  quizTitle,
  tab,
  onTabChange,
  onBack,
}: {
  locale: Locale
  data: QuizReportData
  quizTitle: string
  tab: 'summary' | 'detailed'
  onTabChange: (t: 'summary' | 'detailed') => void
  onBack: () => void
}) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'wrong' | 'flagged' | 'skipped'>('all')
  const [search, setSearch] = useState('')

  const resultMap = useMemo(
    () => new Map(data.results.map((result) => [result.question_id, result])),
    [data.results]
  )

  const filteredQuestions = useMemo(() => {
    const term = search.trim().toLocaleLowerCase()

    return data.questions.filter((row) => {
      const result = resultMap.get(row.ques_id)
      if (!result) return false

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'correct' && result.is_correct) ||
        (statusFilter === 'wrong' && result.is_answered && !result.is_correct) ||
        (statusFilter === 'flagged' && result.is_flagged) ||
        (statusFilter === 'skipped' && !result.is_answered)

      const questionText = `${row.question.question.ar} ${row.question.question.en}`.toLocaleLowerCase()
      return matchesStatus && (!term || questionText.includes(term))
    })
  }, [data.questions, resultMap, search, statusFilter])

  const wrong = data.results.filter((result) => result.is_answered && !result.is_correct).length
  const skipped = data.results.filter((result) => !result.is_answered).length
  const flagged = data.results.filter((result) => result.is_flagged).length

  const statusLabel = (status: string) => {
    switch (status) {
      case 'correct':
        return t(locale, 'صحيح', 'Correct')
      case 'wrong':
        return t(locale, 'خاطئ', 'Wrong')
      case 'flagged':
        return t(locale, 'عليه فلاج', 'Flagged')
      default:
        return t(locale, 'متروك', 'Skipped')
    }
  }

  const statusClass = (status: string) => {
    switch (status) {
      case 'correct':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      case 'wrong':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-300'
      case 'flagged':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
      default:
        return 'border-slate-700 bg-slate-900 text-slate-400'
    }
  }

  return (
    <div className="w-full space-y-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-2xl md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            {t(locale, 'مراجعة المحاولة', 'Attempt review')}
          </p>
          <h2 className="text-xl font-bold text-slate-100">
            {t(locale, 'تقرير الاختبار', 'Quiz report')}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{quizTitle}</p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={onBack}
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          {t(locale, 'رجوع', 'Back')}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label={t(locale, 'إجمالي الأسئلة', 'Total')} value={String(data.total)} />
        <Stat label={t(locale, 'صحيح', 'Correct')} value={String(data.correctCount)} />
        <Stat label={t(locale, 'خاطئ', 'Wrong')} value={String(wrong)} />
        <Stat label={t(locale, 'متروك', 'Skipped')} value={String(skipped)} />
        <Stat label={t(locale, 'عليه فلاج', 'Flagged')} value={String(flagged)} />
      </div>

      <div
        className={`rounded-2xl border py-4 text-center font-bold ${
          data.isPassed
            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
            : 'border-rose-500/20 bg-rose-500/10 text-rose-300'
        }`}
      >
        <span className="text-2xl">{data.score}%</span>
        <span className="mx-2 text-slate-500">—</span>
        {data.isPassed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')}
      </div>

      <Tabs value={tab} onValueChange={(v) => onTabChange(v as 'summary' | 'detailed')}>
        <TabsList className="w-full justify-start border border-slate-800 bg-slate-950/70">
          <TabsTrigger
            value="summary"
            className="text-slate-400 data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-200"
          >
            {t(locale, 'ملخص', 'Summary')}
          </TabsTrigger>
          <TabsTrigger
            value="detailed"
            className="text-slate-400 data-[state=active]:bg-violet-500/10 data-[state=active]:text-violet-200"
          >
            {t(locale, 'مراجعة تفصيلية', 'Detailed review')}
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(locale, 'ابحث داخل الأسئلة...', 'Search questions...')}
              className="h-10 w-full rounded-xl border border-slate-800 bg-slate-950/70 pe-3 ps-10 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-violet-500/50"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <ListFilter className="h-4 w-4 shrink-0 text-slate-500" />
            {([
              ['all', t(locale, 'الكل', 'All')],
              ['correct', t(locale, 'صحيح', 'Correct')],
              ['wrong', t(locale, 'خاطئ', 'Wrong')],
              ['flagged', t(locale, 'فلاج', 'Flagged')],
              ['skipped', t(locale, 'متروك', 'Skipped')],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  statusFilter === value
                    ? 'border-violet-500/40 bg-violet-500/10 text-violet-200'
                    : 'border-slate-800 bg-slate-950/50 text-slate-500 hover:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <TabsContent value="summary" className="pt-4">
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-950 text-slate-500">
                <tr>
                  <th className="p-3 text-start">#</th>
                  <th className="p-3 text-start">{t(locale, 'السؤال', 'Question')}</th>
                  <th className="p-3 text-start">{t(locale, 'الحالة', 'Status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredQuestions.map((row) => {
                  const result = resultMap.get(row.ques_id)!
                  const originalIndex = data.questions.findIndex((q) => q.ques_id === row.ques_id)

                  return (
                    <tr key={row.id} className="text-slate-300">
                      <td className="p-3 align-top text-slate-500">{originalIndex + 1}</td>
                      <td className="p-3">
                        <div className="max-w-2xl truncate">
                          {t(locale, row.question.question.ar, row.question.question.en)}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs ${statusClass(result.status)}`}>
                          {statusLabel(result.status)}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filteredQuestions.length === 0 && (
              <p className="p-8 text-center text-sm text-slate-500">
                {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-5 pt-4">
          {filteredQuestions.map((row) => {
            const originalIndex = data.questions.findIndex((q) => q.ques_id === row.ques_id)
            const result = resultMap.get(row.ques_id)!

            return (
              <ReviewQuestion
                key={row.id}
                index={originalIndex}
                locale={locale}
                row={row}
                result={result}
                userAnswer={data.attempt.answer_state?.[row.ques_id]}
              />
            )
          })}

          {filteredQuestions.length === 0 && (
            <p className="rounded-xl border border-slate-800 bg-slate-950/50 p-8 text-center text-sm text-slate-500">
              {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReviewQuestion({
  index,
  locale,
  row,
  result,
  userAnswer,
}: {
  index: number
  locale: Locale
  row: QuizQuestionRow
  result: import('./actions').GradeResult
  userAnswer: any
}) {
  const q = row.question
  const isSkipped = !result.is_answered

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 shadow-lg md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-mono text-violet-400">
          {t(locale, 'السؤال', 'Question')} {index + 1}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {result.is_flagged && (
            <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
              <Flag className="h-3.5 w-3.5" fill="currentColor" />
              {t(locale, 'عليه فلاج', 'Flagged')}
            </span>
          )}

          <span
            className={`rounded-lg border px-2.5 py-1 text-xs ${
              result.is_correct
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : isSkipped
                  ? 'border-slate-700 bg-slate-900 text-slate-400'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
            }`}
          >
            {result.is_correct
              ? t(locale, 'صحيح', 'Correct')
              : isSkipped
                ? t(locale, 'متروك', 'Skipped')
                : t(locale, 'خاطئ', 'Wrong')}
          </span>
        </div>
      </div>

      <h4 className="text-base font-semibold leading-7 text-slate-100">
        {t(locale, q.question.ar, q.question.en)}
      </h4>
      <p className="mt-1 text-xs text-slate-500">
        {t(locale, q.question.en, q.question.ar)}
      </p>

      {(q.type === 'single' || q.type === 'multiple' || q.type === 'true_false') && (
        <div className="mt-5 space-y-2.5">
          {(q.options as QuestionOption[]).map((opt) => {
            const selected =
              q.type === 'multiple'
                ? Array.isArray(userAnswer) && userAnswer.includes(opt.id)
                : userAnswer === opt.id

            let cls = 'border-slate-800 bg-slate-900/40 text-slate-400'

            if (opt.is_correct) {
              cls = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
            } else if (selected) {
              cls = 'border-violet-500/60 bg-violet-500/10 text-violet-100'
            }

            if (selected && !opt.is_correct) {
              cls = 'border-rose-500/60 bg-rose-500/10 text-rose-200'
            }

            return (
              <div key={opt.id} className={`rounded-xl border p-3.5 text-sm ${cls}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">
                      {t(locale, opt.text.ar, opt.text.en)}
                    </div>
                    {selected && (
                      <div className="mt-1 text-[11px] font-semibold text-violet-300">
                        {t(locale, 'إجابتك', 'Your answer')}
                      </div>
                    )}
                    {opt.is_correct && (
                      <div className="mt-1 text-[11px] font-semibold text-emerald-300">
                        {t(locale, 'الإجابة الصحيحة', 'Correct answer')}
                      </div>
                    )}
                  </div>

                  {opt.is_correct ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : selected ? (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  ) : null}
                </div>

                <p className="mt-2 text-xs leading-5 opacity-80">
                  {t(locale, opt.explanation.ar, opt.explanation.en)}
                </p>
              </div>
            )
          })}

          {isSkipped && (
            <p className="rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-500">
              {t(locale, 'لم يتم اختيار إجابة لهذا السؤال.', 'No answer was selected for this question.')}
            </p>
          )}
        </div>
      )}

      {q.type === 'dnd' && (
        <DndReview
          options={q.options as DndOptions}
          locale={locale}
          userAnswer={userAnswer ?? {}}
        />
      )}
    </div>
  )
}

function DndReview({
  options,
  locale,
  userAnswer,
}: {
  options: DndOptions
  locale: Locale
  userAnswer: Record<string, string[]>
}) {
  const findItem = (id: string) => options.list2.find((item) => item.id === id)

  return (
    <div className="mt-5 space-y-3">
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs text-cyan-200">
        {t(locale, 'هذه هي إجابتك مقارنة بالمطابقة الصحيحة.', 'Your submitted matching compared with the correct matching.')}
      </div>

      {options.list1.map((left) => {
        const userIds = Array.isArray(userAnswer[left.id]) ? userAnswer[left.id] : []
        const correctIds = options.correct_map[left.id] ?? []
        const userItems = userIds.map(findItem).filter(Boolean) as DndItem[]
        const correctItems = correctIds.map(findItem).filter(Boolean) as DndItem[]

        const userCorrect =
          JSON.stringify([...userIds].sort()) === JSON.stringify([...correctIds].sort())

        return (
          <div key={left.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="text-[11px] font-semibold text-slate-500">
                  {t(locale, 'العنصر', 'Item')}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  {t(locale, left.text.ar, left.text.en)}
                </p>
              </div>

              <div className="space-y-2">
                <div className={`rounded-lg border p-2.5 ${
                  userCorrect
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : userItems.length
                      ? 'border-rose-500/40 bg-rose-500/10'
                      : 'border-slate-800 bg-slate-950/50'
                }`}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t(locale, 'إجابتك', 'Your answer')}
                  </p>
                  {userItems.length ? (
                    userItems.map((item) => (
                      <p key={item.id} className="mt-1 text-sm text-slate-200">
                        {t(locale, item.text.ar, item.text.en)}
                      </p>
                    ))
                  ) : (
                    <p className="mt-1 text-xs text-slate-600">
                      {t(locale, 'لم تختر مطابقة', 'No match selected')}
                    </p>
                  )}
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500/70">
                    {t(locale, 'المطابقة الصحيحة', 'Correct match')}
                  </p>
                  {correctItems.map((item) => (
                    <p key={item.id} className="mt-1 text-sm text-emerald-200">
                      {t(locale, item.text.ar, item.text.en)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {options.explanation && (
        <p className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs leading-5 text-slate-400">
          {t(locale, options.explanation.ar, options.explanation.en)}
        </p>
      )}
    </div>
  )
}




