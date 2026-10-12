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
//   GripVertical,
//   Search,
//   ListFilter,
//   Link2,
//   X,
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
//   type QuestionType,
//   type DndOptions,
//   type QuizReportData,
//   type GradeResult,
//   type LocalizedText,
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

// // ---------------------------------------------------------------------
// // Two kinds of text in this screen:
// //  - interface chrome (buttons, labels, tabs...) -> follows the app locale
// //  - quiz content pulled from the DB (question/answer/explanation/title)
// //    -> ALWAYS shown in English; the "show translation" button (which only
// //       exists on the live question screen) is the only way to see Arabic.
// // ---------------------------------------------------------------------
// const t = (locale: Locale, ar: string, en: string) => (locale === 'ar' ? ar : en)
// const en = (v?: LocalizedText | null) => v?.en ?? ''

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
//   const revealedRef = useRef(revealed)
//   const quizStateRef = useRef(quizState)
//   useEffect(() => void (answersRef.current = answers), [answers])
//   useEffect(() => void (flagsRef.current = flags), [flags])
//   useEffect(() => void (remainingRef.current = remainingSec), [remainingSec])
//   useEffect(() => void (indexRef.current = currentIndex), [currentIndex])
//   useEffect(() => void (attemptRef.current = currentAttempt), [currentAttempt])
//   useEffect(() => void (revealedRef.current = revealed), [revealed])
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

//   // ---------------- Autosave + auto-pause on tab hide ----------------
//   // If the quiz is running and the user switches tab / app / minimizes the
//   // window, we persist progress AND flip the UI into the "paused" state, so
//   // coming back always lands on the Resume screen instead of silently
//   // continuing (or restarting) in the background.
//   useEffect(() => {
//     const persist = () => {
//       const attempt = attemptRef.current
//       if (quizStateRef.current === 'active' && attempt) {
//         updateAttemptProgress(
//           attempt.id,
//           indexRef.current,
//           remainingRef.current,
//           answersRef.current,
//           flagsRef.current,
//           revealedRef.current
//         ).catch(() => {})
//       }
//     }

//     const onVisibility = () => {
//       if (!document.hidden) return
//       if (quizStateRef.current === 'active') {
//         setTimerActive(false)
//         setQuizState('paused')
//         persist()
//       }
//     }

//     document.addEventListener('visibilitychange', onVisibility)
//     window.addEventListener('beforeunload', persist)
//     return () => {
//       document.removeEventListener('visibilitychange', onVisibility)
//       window.removeEventListener('beforeunload', persist)
//       persist()
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
//     if (status === 'passed') return 'bg-emerald-500'
//     if (status === 'attempted') return 'bg-amber-500'
//     return 'bg-slate-300'
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

//       if (typeof window !== 'undefined' && window.innerWidth < 768) {
//         setSidebarOpen(false)
//       }
//     },
//     [allAttempts, quizState]
//   )

//   // ---------------- Start / resume ----------------
//   const handleStartQuiz = async () => {
//     if (!currentQuiz) return
//     const attempt = await getOrCreateActiveAttempt(userId, currentQuiz.id, currentQuiz.duration_min)
//     setCurrentAttempt(attempt)

//     const {
//       __flags = {},
//       __revealed = {},
//       ...savedAnswers
//     } = (attempt.answer_state ?? {}) as Record<string, any>
//     setAnswers(savedAnswers ?? {})
//     setFlags(__flags ?? {})
//     setRevealed(__revealed ?? {})
//     setCurrentIndex(attempt.current_question_index ?? 0)
//     setRemainingSec(attempt.remaining_time_sec ?? currentQuiz.duration_min * 60)
//     setQuizState('active')
//     setTimerActive(true)
//   }

//   const handlePauseQuiz = async () => {
//     setTimerActive(false)
//     setQuizState('paused')
//     if (currentAttempt) {
//       await updateAttemptProgress(
//         currentAttempt.id,
//         currentIndex,
//         remainingSec,
//         answers,
//         flags,
//         revealed
//       )
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
//       timeUsedMin,
//       revealedRef.current
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

//   // Single-placement DnD: linking a source item to a NEW target replaces any
//   // previous placement (it "moves"). Linking it to the target it is already
//   // under unlinks it, sending it back to the source column.
//   const toggleDndLink = (quesId: number, list1Id: string, list2Id: string) => {
//     if (revealed[quesId]) return
//     setAnswers((prev) => {
//       const map: Record<string, string[]> = { ...(prev[quesId] ?? {}) }
//       const alreadyHere = (map[list1Id] ?? []).includes(list2Id)

//       if (alreadyHere) {
//         const nextMap = { ...map }
//         delete nextMap[list1Id]
//         return { ...prev, [quesId]: nextMap }
//       }

//       return { ...prev, [quesId]: { ...map, [list1Id]: [list2Id] } }
//     })
//   }

//   const toggleFlag = (quesId: number) =>
//     setFlags((prev) => ({ ...prev, [quesId]: !prev[quesId] }))

//   const toggleReveal = (quesId: number) => {
//     const row = questions.find((q) => q.ques_id === quesId)
//     if (!row) return

//     setRevealed((prev) => {
//       const nextRevealed = !prev[quesId]

//       if (nextRevealed) {
//         const q = row.question

//         if (q.type === 'single' || q.type === 'true_false') {
//           const correct = (q.options as QuestionOption[]).find((opt) => opt.is_correct)
//           if (correct) {
//             setAnswers((current) => ({ ...current, [quesId]: correct.id }))
//           }
//         } else if (q.type === 'multiple') {
//           const correctIds = (q.options as QuestionOption[])
//             .filter((opt) => opt.is_correct)
//             .map((opt) => opt.id)
//           setAnswers((current) => ({ ...current, [quesId]: correctIds }))
//         } else if (q.type === 'dnd') {
//           const dnd = q.options as DndOptions
//           const solution = Object.fromEntries(
//             Object.entries(dnd.correct_map).map(([leftId, rightIds]) => [
//               leftId,
//               [...rightIds],
//             ])
//           )
//           setAnswers((current) => ({ ...current, [quesId]: solution }))
//         }
//       }

//       return { ...prev, [quesId]: nextRevealed }
//     })
//   }

//   const goNext = () => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))
//   const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))

//   const progressPct = questions.length
//     ? Math.round(((currentIndex + 1) / questions.length) * 100)
//     : 0

//   const headerTitle = currentQuiz ? en(currentQuiz.title) : t(locale, 'اختر اختباراً', 'Choose a quiz')

//   const mmss = (sec: number) =>
//     `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <aside className="fixed inset-y-0 inset-s-0 z-40 flex w-72 max-w-[85vw] flex-col overflow-hidden border-e border-slate-200 bg-white shadow-2xl md:static md:z-20 md:w-80 md:max-w-none md:shadow-none lg:w-96">
//             <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/70 p-5">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600">
//                 <BookOpen className="h-4 w-4" />
//               </div>
//               <span className="text-sm font-semibold text-slate-700">
//                 {t(locale, 'محتوى الاختبارات', 'Quiz contents')}
//               </span>
//             </div>

//             <div className="flex-1 space-y-3 overflow-y-auto p-4">
//               {sections.map((section) => {
//                 const isExpanded = !!expandedSections[section.id]
//                 const totalMin = section.quizzes.reduce((sum, q) => sum + q.duration_min, 0)

//                 return (
//                   <div key={section.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
//                     <button
//                       onClick={() => toggleSection(section.id)}
//                       className="flex w-full items-center justify-between gap-2 p-3.5 text-start text-xs text-slate-600 transition-colors hover:bg-slate-50 md:text-sm"
//                     >
//                       <span className="truncate pe-2 font-medium">{section.title_en}</span>
//                       <div className="flex shrink-0 items-center gap-2">
//                         <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500">
//                           {totalMin} {t(locale, 'د', 'min')}
//                         </span>
//                         {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                       </div>
//                     </button>

//                     {isExpanded && (
//                       <div className="divide-y divide-slate-100 bg-slate-50/40">
//                         {section.quizzes.map((quiz) => {
//                           const isSelected = currentQuiz?.id === quiz.id
//                           const status = quizStatus(quiz.id)
//                           return (
//                             <button
//                               key={quiz.id}
//                               onClick={() => handleSelectQuiz(quiz)}
//                               className={`flex w-full items-center justify-between p-3.5 text-start text-xs transition-colors md:text-sm ${
//                                 isSelected
//                                   ? 'border-s-4 border-violet-500 bg-violet-50 font-medium text-violet-700'
//                                   : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
//                               }`}
//                             >
//                               <span className="flex min-w-0 items-center gap-3 truncate">
//                                 <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDotClass(status)}`} />
//                                 <span dir="ltr" className="truncate">{en(quiz.title)}</span>
//                               </span>
//                               <span className="shrink-0 font-mono text-[11px] text-slate-400">
//                                 {quiz.duration_min}{t(locale, 'د', 'm')}
//                               </span>
//                             </button>
//                           )
//                         })}
//                         {section.quizzes.length === 0 && (
//                           <p className="p-3.5 text-[11px] text-slate-400">
//                             {t(locale, 'لا توجد اختبارات في هذا القسم', 'No quizzes in this section')}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </aside>
//         </>
//       )}

//       {/* Main area */}
//       <div className="flex h-full flex-1 flex-col overflow-hidden">
//         {/* App bar */}
//         {/* <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md md:h-16 md:flex-nowrap md:px-6 md:py-0">
//           <div className="flex min-w-0 items-center gap-3 md:gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-slate-500 hover:bg-slate-100 hover:text-slate-800"
//             >
//               {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
//             </Button>
//             <div className="min-w-0">
//               <h1 dir="ltr" className="max-w-[50vw] truncate text-sm font-semibold text-slate-800 md:max-w-md md:text-base">
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
//             <div className="flex flex-wrap items-center gap-2 md:gap-4">
//               <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm text-violet-600">
//                 <Clock className="h-4 w-4" />
//                 <span>{mmss(remainingSec)}</span>
//               </div>
//               <Button size="sm" variant="outline" onClick={handlePauseQuiz} className="border-slate-300 text-slate-600">
//                 <Pause className="me-1 h-4 w-4" /> {t(locale, 'إيقاف مؤقت', 'Pause')}
//               </Button>
//               <Button size="sm" variant="destructive" onClick={handleFinishQuiz} className="text-white">
//                 {t(locale, 'إنهاء الاختبار', 'End quiz')}
//               </Button>
//             </div>
//           )}
          
//         </header> */}
// <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md md:h-16 md:flex-nowrap md:px-6 md:py-0">
//   <div className="flex min-w-0 items-center gap-3 md:gap-4">
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => setSidebarOpen(!sidebarOpen)}
//       className="text-slate-500 hover:bg-slate-100 hover:text-slate-800"
//     >
//       {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
//     </Button>
//     <div className="min-w-0">
//       <h1 dir="ltr" className="max-w-[50vw] truncate text-sm font-semibold text-slate-800 md:max-w-md md:text-base">
//         {headerTitle}
//       </h1>
//       {currentQuiz && (
//         <span className="text-xs text-slate-400">
//           {t(locale, 'المدة', 'Duration')}: {currentQuiz.duration_min}{t(locale, ' د', 'm')} ·{' '}
//           {t(locale, 'نسبة النجاح', 'Passing score')}: {currentQuiz.passing_score}%
//         </span>
//       )}
//     </div>
//   </div>

//   <div className="flex flex-wrap items-center gap-2 md:gap-4">
//     {quizState === 'active' && (
//       <>
//         <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm text-violet-600">
//           <Clock className="h-4 w-4" />
//           <span>{mmss(remainingSec)}</span>
//         </div>
//         <Button size="sm" variant="outline" onClick={handlePauseQuiz} className="border-slate-300 text-slate-600">
//           <Pause className="me-1 h-4 w-4" /> {t(locale, 'إيقاف مؤقت', 'Pause')}
//         </Button>
//         {/* <Button size="sm" variant="destructive" onClick={handleFinishQuiz} className="text-white">
//           {t(locale, 'إنهاء الاختبار', 'End quiz')}
//         </Button> */}
      
//       <Button 
//   size="sm" 
//   onClick={handleFinishQuiz} 
//   className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm transition-colors"
// >
//   {t(locale, 'إنهاء الاختبار', 'End quiz')}
// </Button>
//       </>
//     )}

//     {/* زر العودة للداشبورد */}
//     <a
//       href="/dashboard"
//       className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900"
//     >
//       <span className="hidden sm:inline">
//         {t(locale, 'الرئيسية', 'Dashboard')}
//       </span>
//     </a>
//   </div>
// </header>
//         {quizState === 'active' && (
//           <div className="px-4 pt-3 md:px-6">
//             <Progress value={progressPct} className="h-1.5 bg-slate-200" />
//           </div>
//         )}

//         <main className="flex flex-1 flex-col items-center space-y-10 overflow-y-auto px-3 pt-6 md:px-10 md:pt-8">
//           <div className="w-full max-w-4xl space-y-6">
//             {quizState === 'empty' && (
//               <div className="w-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-400">
//                 {t(locale, 'اختر اختباراً من القائمة الجانبية للبدء', 'Choose a quiz from the sidebar to begin')}
//               </div>
//             )}

//             {loadingQuiz && (
//               <div className="w-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-400">
//                 {t(locale, 'جارِ التحميل...', 'Loading...')}
//               </div>
//             )}

//             {!loadingQuiz && quizState === 'intro' && currentQuiz && (
//               <div className="w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
//                 <div className="space-y-2">
//                   <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
//                     {t(locale, 'جاهز للاختبار', 'Ready to start')}
//                   </span>
//                   <h2 dir="ltr" className="wrap-break-word text-xl font-bold text-slate-800 md:text-2xl">
//                     {en(currentQuiz.title)}
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-3 gap-3 text-center">
//                   <Stat label={t(locale, 'الأسئلة', 'Questions')} value={String(questions.length)} />
//                   <Stat label={t(locale, 'المدة', 'Duration')} value={`${currentQuiz.duration_min}${t(locale, ' د', 'm')}`} />
//                   <Stat label={t(locale, 'نسبة النجاح', 'Passing')} value={`${currentQuiz.passing_score}%`} />
//                 </div>

//                 {currentQuiz.instructions && (
//                   <div className="space-y-2 text-sm text-slate-600">
//                     <h4 className="font-semibold text-slate-700">{t(locale, 'التعليمات', 'Instructions')}</h4>
//                     <p dir="ltr" className="whitespace-pre-line wrap-break-word rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-500">
//                       {en(currentQuiz.instructions)}
//                     </p>
//                   </div>
//                 )}

//                 <Button onClick={handleStartQuiz} className="w-full rounded-xl bg-violet-600 py-3 text-base font-medium text-white hover:bg-violet-500">
//                   {t(locale, 'بدء الاختبار الآن', 'Start quiz')}
//                 </Button>
//               </div>
//             )}

//             {quizState === 'paused' && currentQuiz && (
//               <div className="w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
//                 <h3 className="text-xl font-bold text-slate-800">
//                   {t(locale, 'تم إيقاف الاختبار مؤقتاً', 'Quiz paused')}
//                 </h3>
//                 <p className="text-sm text-slate-500">
//                   {t(locale, 'يمكنك الاستئناف في أي وقت.', 'You can resume anytime.')}
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-3">
//                   <Button onClick={handleBackToIntro} variant="outline" className="border-slate-300 text-slate-600">
//                     {t(locale, 'الرئيسية', 'Home')}
//                   </Button>
//                   <Button onClick={handleResumeQuiz} className="bg-violet-600 text-white hover:bg-violet-500">
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
//               <AnswerExplanationPanel locale={locale} row={currentQ} revealed={!!revealed[currentQ.ques_id]} />
//             )}

//             {quizState === 'active' && currentQ && (
//               <div className="flex justify-between pt-2">
//                 <Button disabled={currentIndex === 0} onClick={goPrev} variant="outline" className="border-slate-300 text-slate-600">
//                   {t(locale, 'السابق', 'Previous')}
//                 </Button>
//                 {currentIndex < questions.length - 1 ? (
//                   <Button onClick={goNext} className="bg-violet-600 text-white hover:bg-violet-500">
//                     {t(locale, 'التالي', 'Next')}
//                   </Button>
//                 ) : (
//                   <Button onClick={handleFinishQuiz} className="bg-emerald-600 text-white hover:bg-emerald-500">
//                     {t(locale, 'إنهاء الاختبار', 'End quiz')}
//                   </Button>
//                 )}
//               </div>
//             )}

//             {quizState === 'report' && reportData && currentQuiz && (
//               <ReportView
//                 locale={locale}
//                 data={reportData}
//                 quizTitle={en(currentQuiz.title)}
//                 tab={reportTab}
//                 onTabChange={setReportTab}
//                 onBack={handleBackToIntro}
//               />
//             )}
//           </div>

//           {/* History */}
//           {currentQuiz && quizState !== 'active' && (
//             <div className="w-full max-w-4xl space-y-4 border-t border-slate-200 pb-12 pt-8">
//               <h3 className="text-base font-semibold text-slate-700">
//                 {t(locale, 'سجل المحاولات السابقة', 'Attempt history')}
//               </h3>
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 {attempts
//                   .filter((a) => a.is_closed)
//                   .map((attempt) => (
//                     <div
//                       key={attempt.id}
//                       className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
//                         attempt.is_passed
//                           ? 'border-emerald-200 bg-emerald-50'
//                           : 'border-rose-200 bg-rose-50'
//                       }`}
//                     >
//                       <div className="space-y-1">
//                         <span className={`text-sm font-bold ${attempt.is_passed ? 'text-emerald-700' : 'text-rose-700'}`}>
//                           {attempt.is_passed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')} ({attempt.score}%)
//                         </span>
//                         <span className="block font-mono text-xs text-slate-500">
//                           {t(locale, 'الوقت المستغرق', 'Time used')}: {attempt.time_used_min}
//                           {t(locale, ' د', 'm')} · {new Date(attempt.created_at).toLocaleDateString(locale)}
//                         </span>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="border-slate-300 text-slate-600"
//                         onClick={() => handleViewPastReport(attempt.id)}
//                       >
//                         {t(locale, 'عرض التقرير', 'View report')}
//                       </Button>
//                     </div>
//                   ))}
//                 {attempts.filter((a) => a.is_closed).length === 0 && (
//                   <p className="col-span-full text-xs text-slate-400">
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
//     <div className="rounded-xl border border-slate-200 bg-slate-50 py-3">
//       <div className="text-lg font-bold text-slate-800">{value}</div>
//       <div className="text-[11px] text-slate-500">{label}</div>
//     </div>
//   )
// }

// /** The explanation of the correct answer(s), shown below the whole
//  * question-answering area — never inline under an individual option, since
//  * question/answer/explanation text can run very long. */
// function AnswerExplanationPanel({
//   locale,
//   row,
//   revealed,
// }: {
//   locale: Locale
//   row: QuizQuestionRow
//   revealed: boolean
// }) {
//   if (!revealed) return null
//   const q = row.question

//   let texts: LocalizedText[] = []
//   if (q.type === 'dnd') {
//     const dnd = q.options as DndOptions
//     if (dnd.explanation && (dnd.explanation.en || dnd.explanation.ar)) texts = [dnd.explanation]
//   } else {
//     texts = (q.options as QuestionOption[])
//       .filter((o) => o.is_correct)
//       .map((o) => o.explanation)
//       .filter((e) => e && (e.en || e.ar))
//   }

//   if (texts.length === 0) return null

//   return (
//     <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
//       <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
//         {t(locale, 'توضيح الإجابة الصحيحة', 'Correct answer explanation')}
//       </p>
//       <div className="space-y-2">
//         {texts.map((text, i) => (
//           <p key={i} dir="ltr" className="break-words text-sm leading-6 text-slate-700">
//             {text.en}
//           </p>
//         ))}
//       </div>
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
//       <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
//         <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 font-mono text-xs text-violet-700">
//           {t(locale, 'السؤال', 'Question')} {index + 1} / {total}
//         </span>
//         <div className="flex items-center gap-1">
//           <Button size="sm" variant="ghost" onClick={onToggleTranslation} className="text-slate-500 hover:bg-slate-100 hover:text-slate-800">
//             <Globe className="me-1 h-4 w-4" /> {showTranslation ? t(locale, 'إخفاء الترجمة', 'Hide translation') : t(locale, 'عرض الترجمة', 'Show translation')}
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onToggleFlag} className={flagged ? 'text-amber-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}>
//             <Flag className="h-4 w-4" fill={flagged ? 'currentColor' : 'none'} />
//           </Button>
//           <Button size="sm" variant="ghost" onClick={onToggleReveal} className="text-slate-500 hover:bg-slate-100 hover:text-slate-800">
//             <Eye className="me-1 h-4 w-4" /> {revealed ? t(locale, 'إخفاء الإجابة', 'Hide answer') : t(locale, 'عرض الإجابة', 'Show answer')}
//           </Button>
//         </div>
//       </div>

//       <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//         <div>
//           <h3 dir="ltr" className="break-words text-lg font-semibold text-slate-800">
//             {q.question.en}
//           </h3>
//           {showTranslation && (
//             <p className="mt-2 border-s-2 border-cyan-300 ps-3 text-sm text-slate-500">
//               {q.question.ar}
//             </p>
//           )}
//         </div>

//         {(q.type === 'single' || q.type === 'true_false') && (
//           <div className="space-y-3 pt-2">
//             {(q.options as QuestionOption[]).map((opt) => (
//               <OptionRow
//                 key={opt.id}
//                 option={opt}
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
//             locale={locale}
//             options={q.options as DndOptions}
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
//   showTranslation,
//   selected,
//   revealed,
//   onClick,
// }: {
//   option: QuestionOption
//   showTranslation: boolean
//   selected: boolean
//   revealed: boolean
//   onClick: () => void
// }) {
//   // Only the FRAME is colored — never the whole box — so long option text
//   // stays easy to read. The correct-answer checkmark is enlarged.
//   let cls = 'border-slate-200 bg-white text-slate-700 hover:border-violet-300'
//   if (!revealed && selected) cls = 'border-violet-500 bg-white text-slate-800'
//   if (revealed && option.is_correct) cls = 'border-emerald-500 bg-white text-slate-800'
//   if (revealed && selected && !option.is_correct) cls = 'border-rose-500 bg-white text-slate-800'

//   return (
//     <button
//       onClick={onClick}
//       disabled={revealed}
//       className={`w-full rounded-xl border-2 p-4 text-start text-sm transition-colors ${cls}`}
//     >
//       <div className="flex items-center justify-between gap-3">
//         <p dir="ltr" className="min-w-0 break-words">{option.text.en}</p>
//         {revealed && option.is_correct && (
//           <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-500" strokeWidth={2.25} />
//         )}
//         {revealed && selected && !option.is_correct && (
//           <XCircle className="h-6 w-6 shrink-0 text-rose-500" />
//         )}
//       </div>
//       {showTranslation && (
//         <p className="mt-1 text-xs text-slate-400">{option.text.ar}</p>
//       )}
//     </button>
//   )
// }

// function DndQuestion({
//   locale,
//   options,
//   showTranslation,
//   answer,
//   revealed,
//   activeItem,
//   onSetActive,
//   onToggleLink,
// }: {
//   locale: Locale
//   options: DndOptions
//   showTranslation: boolean
//   answer: Record<string, string[]>
//   revealed: boolean
//   activeItem: string | null
//   onSetActive: (id: string | null) => void
//   onToggleLink: (list1Id: string, list2Id: string) => void
// }) {
//   const [draggingItem, setDraggingItem] = useState<string | null>(null)

//   const placedTarget = (leftId: string) => answer[leftId]?.[0] ?? null
//   const unplaced = options.list1.filter((item) => !placedTarget(item.id))

//   const isCorrectPlacement = (leftId: string) => {
//     const expected = (options.correct_map[leftId] ?? []).slice().sort()
//     const given = (answer[leftId] ?? []).slice().sort()
//     return expected.length > 0 && JSON.stringify(expected) === JSON.stringify(given)
//   }

//   const sourceChipClass = (id: string) => {
//     if (activeItem === id) return 'border-violet-500 bg-white text-slate-800'
//     return 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
//   }

//   const nestedChipClass = (id: string) => {
//     if (revealed) {
//       return isCorrectPlacement(id)
//         ? 'border-emerald-500 bg-white text-slate-800'
//         : 'border-rose-500 bg-white text-slate-800'
//     }
//     return 'border-slate-300 bg-white text-slate-700'
//   }

//   return (
//     <div className="space-y-4">
//       <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 text-xs text-slate-600">
//         <div className="flex items-center gap-2 font-medium text-violet-700">
//           <GripVertical className="h-4 w-4" />
//           {t(
//             locale,
//             'اسحب عنصراً وأسقطه على العنصر المطابق له. اضغط عليه مرة أخرى ليعود لمكانه.',
//             'Drag an item and drop it on its match. Click it again to send it back.'
//           )}
//         </div>
//         <p className="mt-1 text-slate-500">
//           {t(
//             locale,
//             'يمكنك أيضاً الضغط على عنصر ثم الضغط على المطابقة كطريقة بديلة.',
//             'You can also tap an item, then tap its match as an alternative to dragging.'
//           )}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         {/* Source column — this renders FIRST in the DOM, so with the page's
//             dir attribute it naturally sits on the right in Arabic and on the
//             left in English. */}
//         <div className="space-y-2">
//           <p className="px-1 text-xs font-semibold text-slate-500">
//             {t(locale, 'العناصر', 'Items')}
//           </p>
//           <div className="min-h-[3rem] space-y-2 rounded-xl border border-dashed border-slate-200 p-2">
//             {unplaced.map((item) => {
//               const isDragging = draggingItem === item.id
//               return (
//                 <div
//                   key={item.id}
//                   draggable={!revealed}
//                   onDragStart={() => {
//                     setDraggingItem(item.id)
//                     onSetActive(item.id)
//                   }}
//                   onDragEnd={() => setDraggingItem(null)}
//                   onClick={() => !revealed && onSetActive(activeItem === item.id ? null : item.id)}
//                   className={`flex cursor-grab items-center gap-3 rounded-lg border-2 p-3 text-sm transition-all active:cursor-grabbing ${sourceChipClass(item.id)} ${
//                     isDragging ? 'opacity-50' : ''
//                   }`}
//                 >
//                   <GripVertical className="h-4 w-4 shrink-0 text-slate-400" />
//                   <div className="min-w-0 flex-1">
//                     <div dir="ltr" className="break-words">{item.text.en}</div>
//                     {showTranslation && (
//                       <div className="mt-1 text-[11px] text-slate-400">{item.text.ar}</div>
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//             {unplaced.length === 0 && (
//               <p className="p-2 text-center text-xs text-slate-400">
//                 {t(locale, 'تم وضع جميع العناصر', 'All items placed')}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Target column */}
//         <div className="space-y-2">
//           <p className="px-1 text-xs font-semibold text-slate-500">
//             {t(locale, 'المطابقات', 'Matches')}
//           </p>

//           {options.list2.map((target) => {
//             const children = options.list1.filter((li) => placedTarget(li.id) === target.id)
//             return (
//               <div
//                 key={target.id}
//                 onDragOver={(e) => {
//                   if (!revealed && draggingItem) e.preventDefault()
//                 }}
//                 onDrop={(e) => {
//                   e.preventDefault()
//                   if (draggingItem) {
//                     onToggleLink(draggingItem, target.id)
//                     setDraggingItem(null)
//                   }
//                 }}
//                 onClick={() => {
//                   if (!revealed && activeItem) {
//                     onToggleLink(activeItem, target.id)
//                     onSetActive(null)
//                   }
//                 }}
//                 className="rounded-xl border border-slate-200 bg-slate-50 p-3"
//               >
//                 <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
//                   <Link2 className="h-4 w-4 shrink-0 text-cyan-500" />
//                   <div className="min-w-0">
//                     <div dir="ltr" className="break-words">{target.text.en}</div>
//                     {showTranslation && (
//                       <div className="mt-0.5 text-[11px] text-slate-400">{target.text.ar}</div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="ms-6 mt-2 space-y-1.5">
//                   {children.map((child) => (
//                     <button
//                       key={child.id}
//                       type="button"
//                       disabled={revealed}
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         onToggleLink(child.id, target.id)
//                       }}
//                       className={`flex w-full items-center justify-between gap-2 rounded-lg border-2 px-2.5 py-1.5 text-start text-xs transition-colors ${nestedChipClass(child.id)}`}
//                     >
//                       <span dir="ltr" className="min-w-0 break-words">{child.text.en}</span>
//                       {!revealed && <X className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
//                       {revealed &&
//                         (isCorrectPlacement(child.id) ? (
//                           <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
//                         ) : (
//                           <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
//                         ))}
//                     </button>
//                   ))}
//                   {children.length === 0 && (
//                     <p className="text-[11px] text-slate-300">{t(locale, 'أفلت هنا', 'Drop here')}</p>
//                   )}
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
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
//   const [statusFilter, setStatusFilter] = useState<'all' | 'correct' | 'wrong' | 'flagged' | 'skipped'>('all')
//   const [search, setSearch] = useState('')

//   const resultMap = useMemo(
//     () => new Map(data.results.map((result) => [result.question_id, result])),
//     [data.results]
//   )

//   const filteredQuestions = useMemo(() => {
//     const term = search.trim().toLocaleLowerCase()

//     return data.questions.filter((row) => {
//       const result = resultMap.get(row.ques_id)
//       if (!result) return false

//       const matchesStatus =
//         statusFilter === 'all' ||
//         (statusFilter === 'correct' && result.is_correct) ||
//         (statusFilter === 'wrong' && result.is_answered && !result.is_correct) ||
//         (statusFilter === 'flagged' && result.is_flagged) ||
//         (statusFilter === 'skipped' && !result.is_answered)

//       const questionText = row.question.question.en.toLocaleLowerCase()
//       return matchesStatus && (!term || questionText.includes(term))
//     })
//   }, [data.questions, resultMap, search, statusFilter])

//   const wrong = data.results.filter((result) => result.is_answered && !result.is_correct).length
//   const skipped = data.results.filter((result) => !result.is_answered).length
//   const flagged = data.results.filter((result) => result.is_flagged).length

//   const statusLabel = (status: string) => {
//     switch (status) {
//       case 'correct':
//         return t(locale, 'صحيح', 'Correct')
//       case 'wrong':
//         return t(locale, 'خاطئ', 'Wrong')
//       case 'flagged':
//         return t(locale, 'محدد', 'Flagged')
//       default:
//         return t(locale, 'متروك', 'Skipped')
//     }
//   }

//   const statusClass = (status: string) => {
//     switch (status) {
//       case 'correct':
//         return 'border-emerald-300 bg-emerald-50 text-emerald-700'
//       case 'wrong':
//         return 'border-rose-300 bg-rose-50 text-rose-700'
//       case 'flagged':
//         return 'border-amber-300 bg-amber-50 text-amber-700'
//       default:
//         return 'border-slate-200 bg-slate-50 text-slate-500'
//     }
//   }

//   return (
//     <div className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div className="min-w-0">
//           <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
//             {t(locale, 'مراجعة المحاولة', 'Attempt review')}
//           </p>
//           <h2 className="text-xl font-bold text-slate-800">
//             {t(locale, 'تقرير الاختبار', 'Quiz report')}
//           </h2>
//           <p dir="ltr" className="mt-1 wrap-break-word text-sm text-slate-500">{quizTitle}</p>
//         </div>

//         <Button
//           size="sm"
//           variant="outline"
//           onClick={onBack}
//           className="w-fit border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
//         >
//           {t(locale, 'رجوع', 'Back')}
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 *:flex *:flex-col *:items-center *:justify-center *:text-center">
//         <Stat label={t(locale, 'إجمالي الأسئلة', 'Total')} value={String(data.total)} />
//         <Stat label={t(locale, 'صحيح', 'Correct')} value={String(data.correctCount)} />
//         <Stat label={t(locale, 'خاطئ', 'Wrong')} value={String(wrong)} />
//         <Stat label={t(locale, 'متروك', 'Skipped')} value={String(skipped)} />
//         <Stat label={t(locale, 'عليه علامة', 'Flagged')} value={String(flagged)} />
//       </div>

//       <div
//         className={`rounded-2xl border py-4 text-center font-bold ${
//           data.isPassed
//             ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
//             : 'border-rose-200 bg-rose-50 text-rose-700'
//         }`}
//       >
//         <span className="text-2xl">{data.score}%</span>
//         <span className="mx-2 text-slate-400">—</span>
//         {data.isPassed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')}
//       </div>

//       <Tabs value={tab} onValueChange={(v) => onTabChange(v as 'summary' | 'detailed')}>
//         <TabsList className="w-full justify-start border border-slate-200 bg-slate-100">
//           <TabsTrigger
//             value="summary"
//             className="text-slate-500 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
//           >
//             {t(locale, 'ملخص', 'Summary')}
//           </TabsTrigger>
//           <TabsTrigger
//             value="detailed"
//             className="text-slate-500 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
//           >
//             {t(locale, 'مراجعة تفصيلية', 'Detailed review')}
//           </TabsTrigger>
//         </TabsList>

//         <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
//           <div className="relative">
//             <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder={t(locale, 'ابحث داخل الأسئلة...', 'Search questions...')}
//               className="h-10 w-full rounded-xl border border-slate-200 bg-white pe-3 ps-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-violet-400"
//             />
//           </div>

//           <div className="flex items-center gap-2 overflow-x-auto">
//             <ListFilter className="h-4 w-4 shrink-0 text-slate-400" />
//             {([
//               ['all', t(locale, 'الكل', 'All')],
//               ['correct', t(locale, 'صحيح', 'Correct')],
//               ['wrong', t(locale, 'خاطئ', 'Wrong')],
//               ['flagged', t(locale, 'فلاج', 'Flagged')],
//               ['skipped', t(locale, 'متروك', 'Skipped')],
//             ] as const).map(([value, label]) => (
//               <button
//                 key={value}
//                 type="button"
//                 onClick={() => setStatusFilter(value)}
//                 className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-medium transition ${
//                   statusFilter === value
//                     ? 'border-violet-300 bg-violet-50 text-violet-700'
//                     : 'border-slate-200 bg-white text-slate-500 hover:text-slate-700'
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <TabsContent value="summary" className="pt-4">
//           {/* Desktop / tablet: table */}
//           <div className="hidden overflow-hidden rounded-2xl border border-slate-200 sm:block">
//             <table className="w-full text-sm">
//               <thead className="bg-slate-50 text-slate-500">
//                 <tr>
//                   <th className="p-3 text-start">#</th>
//                   <th className="p-3 text-start">{t(locale, 'السؤال', 'Question')}</th>
//                   <th className="p-3 text-start">{t(locale, 'الحالة', 'Status')}</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {filteredQuestions.map((row) => {
//                   const result = resultMap.get(row.ques_id)!
//                   const originalIndex = data.questions.findIndex((q) => q.ques_id === row.ques_id)

//                   return (
//                     <tr key={row.id} className="align-top text-slate-700">
//                       <td className="p-3 text-slate-400">{originalIndex + 1}</td>
//                       <td className="p-3">
//                         <div dir="ltr" className="max-w-2xl break-words">
//                           {row.question.question.en}
//                         </div>
//                       </td>
//                       <td className="p-3">
//                         <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs ${statusClass(result.status)}`}>
//                           {statusLabel(result.status)}
//                         </span>
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </table>

//             {filteredQuestions.length === 0 && (
//               <p className="p-8 text-center text-sm text-slate-400">
//                 {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
//               </p>
//             )}
//           </div>

//           {/* Mobile: stacked cards instead of a squeezed table */}
//           <div className="space-y-2.5 sm:hidden">
//             {filteredQuestions.map((row) => {
//               const result = resultMap.get(row.ques_id)!
//               const originalIndex = data.questions.findIndex((q) => q.ques_id === row.ques_id)

//               return (
//                 <div key={row.id} className="rounded-xl border border-slate-200 bg-white p-3.5">
//                   <div className="mb-2 flex items-center justify-between gap-2">
//                     <span className="font-mono text-xs text-slate-400">#{originalIndex + 1}</span>
//                     <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs ${statusClass(result.status)}`}>
//                       {statusLabel(result.status)}
//                     </span>
//                   </div>
//                   <p dir="ltr" className="break-words text-sm text-slate-700">{row.question.question.en}</p>
//                 </div>
//               )
//             })}
//             {filteredQuestions.length === 0 && (
//               <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
//                 {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
//               </p>
//             )}
//           </div>
//         </TabsContent>

//         <TabsContent value="detailed" className="space-y-5 pt-4">
//           {filteredQuestions.map((row) => {
//             const originalIndex = data.questions.findIndex((q) => q.ques_id === row.ques_id)
//             const result = resultMap.get(row.ques_id)!

//             return (
//               <ReviewQuestion
//                 key={row.id}
//                 index={originalIndex}
//                 locale={locale}
//                 row={row}
//                 result={result}
//                 userAnswer={data.attempt.answer_state?.[row.ques_id]}
//               />
//             )
//           })}

//           {filteredQuestions.length === 0 && (
//             <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
//               {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
//             </p>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// function ReviewQuestion({
//   index,
//   locale,
//   row,
//   result,
//   userAnswer,
// }: {
//   index: number
//   locale: Locale
//   row: QuizQuestionRow
//   result: GradeResult
//   userAnswer: any
// }) {
//   const q = row.question
//   const isSkipped = !result.is_answered

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
//       <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//         <p className="font-mono text-xs text-violet-600">
//           {t(locale, 'السؤال', 'Question')} {index + 1}
//         </p>

//         <div className="flex flex-wrap items-center gap-2">
//           {result.is_flagged && (
//             <span className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs text-amber-700">
//               <Flag className="h-3.5 w-3.5" fill="currentColor" />
//               {t(locale, 'عليه فلاج', 'Flagged')}
//             </span>
//           )}

//           <span
//             className={`rounded-lg border px-2.5 py-1 text-xs ${
//               result.is_correct
//                 ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
//                 : isSkipped
//                   ? 'border-slate-200 bg-slate-50 text-slate-500'
//                   : 'border-rose-300 bg-rose-50 text-rose-700'
//             }`}
//           >
//             {result.is_correct
//               ? t(locale, 'صحيح', 'Correct')
//               : isSkipped
//                 ? t(locale, 'متروك', 'Skipped')
//                 : t(locale, 'خاطئ', 'Wrong')}
//           </span>
//         </div>
//       </div>

//       <h4 dir="ltr" className="break-words text-base font-semibold leading-7 text-slate-800">
//         {q.question.en}
//       </h4>

//       {(q.type === 'single' || q.type === 'multiple' || q.type === 'true_false') && (
//         <ChoiceReview
//           locale={locale}
//           options={q.options as QuestionOption[]}
//           type={q.type}
//           userAnswer={userAnswer}
//           isSkipped={isSkipped}
//         />
//       )}

//       {q.type === 'dnd' && (
//         <DndReview locale={locale} options={q.options as DndOptions} userAnswer={userAnswer ?? {}} />
//       )}
//     </div>
//   )
// }

// function ChoiceReview({
//   locale,
//   options,
//   type,
//   userAnswer,
//   isSkipped,
// }: {
//   locale: Locale
//   options: QuestionOption[]
//   type: QuestionType
//   userAnswer: any
//   isSkipped: boolean
// }) {
//   const selectedIds: string[] =
//     type === 'multiple'
//       ? Array.isArray(userAnswer)
//         ? userAnswer
//         : []
//       : typeof userAnswer === 'string' && userAnswer
//         ? [userAnswer]
//         : []

//   const correctOptions = options.filter((o) => o.is_correct)
//   const wrongSelected = options.filter((o) => selectedIds.includes(o.id) && !o.is_correct)
//   // Correct answer's explanation is always shown; if the user picked wrong,
//   // that wrong answer's own explanation is shown too.
//   const explanationOptions = [...correctOptions, ...wrongSelected]

//   return (
//     <>
//       <div className="mt-5 space-y-2.5">
//         {options.map((opt) => {
//           const selected = selectedIds.includes(opt.id)
//           // Frame-only coloring — never fill the whole box.
//           let cls = 'border-slate-200 bg-white text-slate-600'
//           if (opt.is_correct) cls = 'border-emerald-500 bg-white text-slate-800'
//           else if (selected) cls = 'border-rose-500 bg-white text-slate-800'

//           return (
//             <div key={opt.id} className={`rounded-xl border-2 p-3.5 text-sm ${cls}`}>
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <p dir="ltr" className="break-words font-medium">{opt.text.en}</p>
//                   <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold">
//                     {selected && <span className="text-violet-600">{t(locale, 'إجابتك', 'Your answer')}</span>}
//                     {opt.is_correct && <span className="text-emerald-600">{t(locale, 'الإجابة الصحيحة', 'Correct answer')}</span>}
//                   </div>
//                 </div>

//                 {opt.is_correct ? (
//                   <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-500" />
//                 ) : selected ? (
//                   <XCircle className="h-6 w-6 shrink-0 text-rose-500" />
//                 ) : null}
//               </div>
//             </div>
//           )
//         })}

//         {isSkipped && (
//           <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
//             {t(locale, 'لم يتم اختيار إجابة لهذا السؤال.', 'No answer was selected for this question.')}
//           </p>
//         )}
//       </div>

//       {explanationOptions.length > 0 && (
//         <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
//           {explanationOptions.map((opt) => (
//             <p
//               key={opt.id}
//               dir="ltr"
//               className={`break-words text-xs leading-5 ${opt.is_correct ? 'text-emerald-700' : 'text-rose-700'}`}
//             >
//               <span className="font-semibold">
//                 {opt.is_correct ? t(locale, 'سبب الصحة: ', 'Why correct: ') : t(locale, 'سبب الخطأ: ', 'Why wrong: ')}
//               </span>
//               {opt.explanation.en}
//             </p>
//           ))}
//         </div>
//       )}
//     </>
//   )
// }

// function DndReview({
//   locale,
//   options,
//   userAnswer,
// }: {
//   locale: Locale
//   options: DndOptions
//   userAnswer: Record<string, string[]>
// }) {
//   const placedTarget = (leftId: string) => userAnswer[leftId]?.[0] ?? null
//   const isCorrectPlacement = (leftId: string) => {
//     const expected = (options.correct_map[leftId] ?? []).slice().sort()
//     const given = (userAnswer[leftId] ?? []).slice().sort()
//     return expected.length > 0 && JSON.stringify(expected) === JSON.stringify(given)
//   }
//   const unplaced = options.list1.filter((item) => !placedTarget(item.id))
//   const correctTargetOf = (leftId: string) =>
//     options.list2.find((l) => (options.correct_map[leftId] ?? [])[0] === l.id)

//   return (
//     <div className="mt-5 space-y-3">
//       <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-xs text-cyan-800">
//         {t(locale, 'هذه هي إجابتك مقارنة بالمطابقة الصحيحة.', 'Your submitted matching compared with the correct matching.')}
//       </div>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         <div className="space-y-2">
//           <p className="px-1 text-xs font-semibold text-slate-500">
//             {t(locale, 'غير مطابق', 'Not matched')}
//           </p>
//           {unplaced.map((item) => (
//             <div key={item.id} className="rounded-lg border-2 border-rose-500 bg-white p-3 text-sm text-slate-700">
//               <span dir="ltr" className="break-words">{item.text.en}</span>
//               <p dir="ltr" className="mt-1 text-[11px] text-rose-600">
//                 {t(locale, 'المطابقة الصحيحة', 'Correct match')}: {correctTargetOf(item.id)?.text.en ?? '—'}
//               </p>
//             </div>
//           ))}
//           {unplaced.length === 0 && (
//             <p className="text-xs text-slate-400">{t(locale, 'تمت مطابقة كل العناصر.', 'All items were matched.')}</p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <p className="px-1 text-xs font-semibold text-slate-500">
//             {t(locale, 'المطابقات', 'Matches')}
//           </p>
//           {options.list2.map((target) => {
//             const children = options.list1.filter((li) => placedTarget(li.id) === target.id)
//             return (
//               <div key={target.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
//                 <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
//                   <Link2 className="h-4 w-4 shrink-0 text-cyan-500" />
//                   <span dir="ltr" className="break-words">{target.text.en}</span>
//                 </div>
//                 <div className="ms-6 mt-2 space-y-1.5">
//                   {children.map((child) => (
//                     <div
//                       key={child.id}
//                       className={`flex items-center justify-between gap-2 rounded-lg border-2 px-2.5 py-1.5 text-xs text-slate-700 ${
//                         isCorrectPlacement(child.id) ? 'border-emerald-500' : 'border-rose-500'
//                       }`}
//                     >
//                       <span dir="ltr" className="min-w-0 break-words">{child.text.en}</span>
//                       {isCorrectPlacement(child.id) ? (
//                         <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
//                       ) : (
//                         <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
//                       )}
//                     </div>
//                   ))}
//                   {children.length === 0 && (
//                     <p className="text-[11px] text-slate-300">{t(locale, 'لا يوجد شيء هنا', 'Nothing placed here')}</p>
//                   )}
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {options.explanation && (options.explanation.en || options.explanation.ar) && (
//         <p dir="ltr" className="break-words rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600">
//           {options.explanation.en}
//         </p>
//       )}
//     </div>
//   )
// }
