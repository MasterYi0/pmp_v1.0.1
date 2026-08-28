// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { PanelLeftClose, PanelLeftOpen, CheckCircle2, XCircle, Clock, Award, ArrowRight } from 'lucide-react'
// import { getQuizQuestionsAction, submitQuizAttemptAction } from '../actions/quizzes'

// interface QuizPlayerClientProps {
//   course: any
//   sections: any[]
//   initialQuiz: any
//   initialQuestions: any[]
//   initialPassedMap: [string, boolean][]
//   userId: string
//   locale: string
// }

// export function QuizPlayerClient({ 
//   course, 
//   sections, 
//   initialQuiz, 
//   initialQuestions, 
//   initialPassedMap, 
//   userId, 
//   locale 
// }: QuizPlayerClientProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [currentQuiz, setCurrentQuiz] = useState(initialQuiz)
//   const [questions, setQuestions] = useState(initialQuestions)
//   const [passedMap, setPassedMap] = useState<Map<string, boolean>>(new Map(initialPassedMap))
  
//   // حالات الاختبار
//   const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
//   const [submitting, setSubmitting] = useState(false)
//   const [result, setResult] = useState<any>(null)
  
//   // التايمر التنازلي (بالدقائق)
//   const [timeLeft, setTimeLeft] = useState<number>(initialQuiz ? initialQuiz.duration_minutes * 60 : 600)

//   // عداد الوقت
//   useEffect(() => {
//     if (!currentQuiz || result) return
//     setTimeLeft(currentQuiz.duration_minutes * 60)

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer)
//           handleSubmitQuiz() // إرسال تلقائي عند انتهاء الوقت
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [currentQuiz?.id, result])

//   // اختيار اختبار من القائمة الجانبية
//   const handleSelectQuiz = async (quiz: any) => {
//     setCurrentQuiz(quiz)
//     setResult(null)
//     setUserAnswers({})
//     const fetchedQuestions = await getQuizQuestionsAction(quiz.id)
//     setQuestions(fetchedQuestions)
//   }

//   const handleOptionSelect = (questionId: string, option: string) => {
//     if (result) return // منع التعديل بعد ظهور النتيجة
//     setUserAnswers(prev => ({ ...prev, [questionId]: option }))
//   }

//   const handleSubmitQuiz = async () => {
//     if (!currentQuiz || submitting) return
//     setSubmitting(true)
//     try {
//       const res = await submitQuizAttemptAction(userId, currentQuiz.id, userAnswers, currentQuiz.passing_score)
//       setResult(res)
//       if (res.isPassed) {
//         setPassedMap(prev => new Map(prev).set(currentQuiz.id, true))
//       }
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   }

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
//       {/* 1. القائمة الجانبية (Sidebar) */}
//       {sidebarOpen && (
//         <aside className="w-80 bg-white border-e flex flex-col z-20 shadow-sm">
//           <div className="p-4 border-b font-bold text-slate-800 flex items-center justify-between">
//             <span>اختبارات الدورة</span>
//             <span className="text-xs text-slate-500">{course.title?.[locale] || course.title?.ar}</span>
//           </div>

//           <div className="flex-1 overflow-y-auto p-3 space-y-4">
//             {sections.map(section => (
//               <div key={section.id} className="space-y-1">
//                 <p className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider">
//                   {locale === 'ar' ? section.title_ar : section.title_en}
//                 </p>
//                 {section.course_quiz?.map((quiz: any) => {
//                   const isSelected = currentQuiz?.id === quiz.id
//                   const isPassed = passedMap.get(quiz.id)

//                   return (
//                     <button
//                       key={quiz.id}
//                       onClick={() => handleSelectQuiz(quiz)}
//                       className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-all ${
//                         isSelected ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-slate-100 text-slate-700'
//                       }`}
//                     >
//                       <span className="truncate">{locale === 'ar' ? quiz.title_ar : quiz.title_en}</span>
//                       {isPassed && <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />}
//                     </button>
//                   )
//                 })}
//               </div>
//             ))}
//           </div>
//         </aside>
//       )}

//       {/* 2. منطقة العرض الرئيسية */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
        
//         {/* الأب بار (App Bar) */}
//         <header className="h-16 bg-white border-b px-6 flex items-center justify-between z-10 shadow-sm">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
//             </Button>
//             <h1 className="font-bold text-lg truncate max-w-md">
//               {currentQuiz ? (locale === 'ar' ? currentQuiz.title_ar : currentQuiz.title_en) : 'اختر اختباراً'}
//             </h1>
//           </div>

//           {currentQuiz && !result && (
//             <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md border border-amber-200 font-mono font-bold">
//               <Clock className="w-4 h-4" />
//               <span>{formatTime(timeLeft)}</span>
//             </div>
//           )}
//         </header>

//         {/* محتوى الاختبار / أو شاشة النتيجة */}
//         <main className="flex-1 bg-slate-900 flex items-center justify-center p-6 overflow-y-auto">
//           {currentQuiz ? (
//             <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 my-auto text-slate-900">
              
//               {result ? (
//                 /* شاشة النتيجة الفورية */
//                 <div className="text-center space-y-6 py-8">
//                   <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${result.isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
//                     {result.isPassed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold">{result.isPassed ? 'تهانينا! لقد اجتزت الاختبار بنجاح 🎉' : 'للأسف لم تتخطَ الاختبار ❌'}</h2>
//                     <p className="text-slate-500 mt-1">درجتك النهائية هي: <span className="font-bold text-slate-800">{result.score}%</span> (درجة النجاح المطلوبة: {currentQuiz.passing_score}%)</p>
//                   </div>
//                   <Button onClick={() => { setResult(null); setUserAnswers({}); }} variant="outline">
//                     إعادة المحاولة
//                   </Button>
//                 </div>
//               ) : (
//                 /* شاشة الأسئلة */
//                 <div className="space-y-8">
//                   <div className="border-b pb-4">
//                     <h2 className="text-xl font-bold">{locale === 'ar' ? currentQuiz.title_ar : currentQuiz.title_en}</h2>
//                     <p className="text-sm text-slate-500 mt-1">أجب عن جميع الأسئلة ثم اضغط على زر التسليم في النهاية.</p>
//                   </div>

//                   <div className="space-y-6 max-h-[50vh] overflow-y-auto pe-2">
//                     {questions.map((q, idx) => (
//                       <div key={q.id} className="space-y-3 bg-slate-50 p-4 rounded-xl border">
//                         <p className="font-semibold text-slate-800">{idx + 1}. {q.question_text}</p>
//                         <div className="grid grid-cols-1 gap-2">
//                           {q.options?.map((opt: string, optIdx: number) => (
//                             <label 
//                               key={optIdx} 
//                               className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
//                                 userAnswers[q.id] === opt ? 'bg-primary/10 border-primary font-medium' : 'bg-white hover:bg-slate-100 border-slate-200'
//                               }`}
//                             >
//                               <input 
//                                 type="radio" 
//                                 name={`question-${q.id}`} 
//                                 checked={userAnswers[q.id] === opt}
//                                 onChange={() => handleOptionSelect(q.id, opt)}
//                                 className="accent-primary"
//                               />
//                               <span>{opt}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-4 border-t flex justify-end">
//                     <Button onClick={handleSubmitQuiz} disabled={submitting} className="px-8 font-bold">
//                       {submitting ? 'جاري إرسال الإجابات...' : 'تسليم الاختبار وإظهار النتيجة'}
//                     </Button>
//                   </div>
//                 </div>
//               )}

//             </div>
//           ) : (
//             <div className="text-white text-lg">لا يوجد اختبار محدد للعرض</div>
//           )}
//         </main>

//       </div>

//     </div>
//   )
// }


'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Award, 
  Play, 
  CheckCircle2, 
  XCircle, 
  History,
  FileText,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Flag,
  Languages,
  Globe
} from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { getOrCreateActiveAttempt, submitAndCloseQuiz, updateAttemptProgress } from '../actions/quizzes'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface QuizOverviewProps {
  quiz: any
  sections: any[]
  questions: any[]
  activeAttempt: any
  attemptsHistory: any[]
  userId: string
  courseSlug: string
}
interface QuizOverviewPropsx {
  quiz: any
  attempts: any[] // سجل المحاولات السابقة
  onStartQuiz: () => void
  onViewReport: (attempt: any) => void
}

export function QuizOverviewDashboard({ quiz, attempts = [], onStartQuiz, onViewReport }: QuizOverviewPropsx) {
  const locale = useLocale() as 'ar' | 'en'

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6 pb-16">
      
      {/* كارد ترحيبي وتفاصيل الاختبار الأساسية */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            {locale === 'ar' ? 'اختبار تقييمي' : 'Assessment Quiz'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100">
            {locale === 'ar' ? quiz?.title?.ar : quiz?.title?.en}
          </h2>
          <p className="text-sm text-slate-400">
            {locale === 'ar' 
              ? 'اختبر معلوماتك، راقب أداءك، واستعرض سجل محاولاتك السابقة أدناه.' 
              : 'Test your knowledge, monitor your performance, and view your previous attempt history below.'}
          </p>
        </div>

        <Button 
          onClick={onStartQuiz}
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-amber-900/30 shrink-0 flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {locale === 'ar' ? 'ابدأ الاختبار الآن' : 'Start Quiz Now'}
        </Button>
      </div>

      {/* قسم سجل المحاولات (Attempt History Cards) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
          <History className="w-4 h-4 text-amber-400" />
          <span>{locale === 'ar' ? 'سجل المحاولات السابقة' : 'Previous Attempts History'}</span>
        </div>

        {attempts.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-8 text-center text-slate-400 text-xs md:text-sm">
            {locale === 'ar' ? 'لا توجد محاولات سابقة لهذا الاختبار حتى الآن. ابدأ محاولتك الأولى!' : 'No previous attempts for this quiz yet. Start your first attempt!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {attempts.map((attempt: any, idx: number) => {
              const isPassed = attempt.is_passed
              return (
                <div key={attempt.id || idx} className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isPassed ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    }`}>
                      {attempt.score}%
                    </div>
                    <div>
                      <span className={`text-xs font-semibold flex items-center gap-1 ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {isPassed ? (locale === 'ar' ? 'اجتزت الاختبار' : 'Passed') : (locale === 'ar' ? 'لم تجتز الاختبار' : 'Failed')}
                      </span>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {attempt.created_at ? new Date(attempt.created_at).toLocaleString() : (locale === 'ar' ? 'محاولة حديثة' : 'Recent Attempt')}
                      </p>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewReport(attempt)}
                    className="border-slate-700 bg-slate-800/60 text-slate-200 text-xs hover:bg-slate-700"
                  >
                    {locale === 'ar' ? 'عرض التقرير' : 'View Report'}
                    <ArrowRight className="w-3.5 h-3.5 ms-1" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
export function QuizOverview({ 
  quiz, 
  sections, 
  questions, 
  activeAttempt, 
  attemptsHistory, 
  userId, 
  courseSlug 
}: QuizOverviewProps) {
  const locale = useLocale() as 'ar' | 'en'
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [quiz.section_id]: true
  })

  // حالة عرض واجهة الامتحان الفعلية أو تقرير لمراجعة محاولة سابقة
  const [inExam, setInExam] = useState(false)
  const [viewingReportAttempt, setViewingReportAttempt] = useState<any>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const quizTitle = locale === 'ar' ? quiz.title?.ar : quiz.title?.en

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
                {locale === 'ar' ? 'أقسام الدورة والاختبارات' : 'Course Sections & Quizzes'}
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
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>
                  
                  {isExpanded && section.course_quiz && section.course_quiz.length > 0 && (
                    <div className="divide-y divide-slate-800/50 bg-slate-950/20">
                      {section.course_quiz.map((qItem: any) => {
                        const isSelectedQuiz = qItem.id === quiz.id
                        const qTitle = locale === 'ar' ? qItem.title?.ar : qItem.title?.en
                        return (
                          <div 
                            key={qItem.id}
                            onClick={() => {
                              router.push(`/courses/${courseSlug}/quizzes/${qItem.id}`)
                            }}
                            className={`p-3.5 flex items-center justify-between cursor-pointer transition-all text-xs md:text-sm ${
                              isSelectedQuiz 
                                ? 'bg-indigo-600/15 text-indigo-300 font-medium border-l-4 border-indigo-500' 
                                : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 truncate">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                              <span className="truncate">{qTitle}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 shrink-0 font-mono">{qItem.duration_min}m</span>
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
              {quizTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {inExam && (
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-mono animate-pulse">
                {locale === 'ar' ? 'الاختبار جاري...' : 'Exam in progress...'}
              </span>
            )}
          </div>
        </header>

        {/* محتوى الشاشة (إما شاشة تعليمات الاختبار الرئيسية، أو واجهة الاختبار، أو تقرير المحاولة) */}
        <main className="flex-1 bg-slate-950 flex flex-col items-center justify-start pt-6 md:pt-8 px-4 md:px-10 overflow-y-auto">
          
          {viewingReportAttempt ? (
            <QuizReport 
              attempt={viewingReportAttempt}
              quiz={quiz}
              questions={questions}
              onBack={() => setViewingReportAttempt(null)}
            />
          ) : inExam ? (
            <QuizInterface 
              quiz={quiz}
              questions={questions}
              activeAttempt={activeAttempt}
              userId={userId}
              onFinishExam={(finishedAttempt) => {
                setInExam(false)
                setViewingReportAttempt(finishedAttempt)
              }}
              onPauseExam={() => setInExam(false)}
            />
          ) : (
            <div className="w-full max-w-4xl flex flex-col gap-8 pb-12">
              
              {/* كارد تفاصيل ومعلومات الاختبار الرئيسية */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-800/80 pb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      {locale === 'ar' ? 'تقييم معرفي' : 'Knowledge Assessment'}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-3">
                      {quizTitle}
                    </h2>
                  </div>
                  <Button 
                    onClick={() => setInExam(true)}
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    {locale === 'ar' ? (activeAttempt?.current_question_index > 0 ? 'استئناف الاختبار' : 'بدء الاختبار') : (activeAttempt?.current_question_index > 0 ? 'Resume Exam' : 'Start Exam')}
                  </Button>
                </div>

                {/* إحصائيات سريعة */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{locale === 'ar' ? 'عدد الأسئلة' : 'Total Questions'}</p>
                      <p className="text-base font-bold text-slate-200">{questions.length}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{locale === 'ar' ? 'المدة الزمنية' : 'Duration'}</p>
                      <p className="text-base font-bold text-slate-200">{quiz.duration_min} {locale === 'ar' ? 'دقائق' : 'Mins'}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{locale === 'ar' ? 'نسبة النجاح' : 'Passing Score'}</p>
                      <p className="text-base font-bold text-slate-200">{quiz.passing_score}%</p>
                    </div>
                  </div>
                </div>

                {/* التعليمات (Instructions) */}
                {quiz.instructions && (
                  <div className="space-y-3 bg-slate-950/30 p-5 rounded-xl border border-slate-800/50">
                    <h3 className="text-sm font-semibold text-indigo-300">
                      {locale === 'ar' ? 'تعليمات الاختبار:' : 'Exam Instructions:'}
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-slate-300">
                      {Array.isArray(quiz.instructions[locale] || quiz.instructions.ar) ? (
                        (quiz.instructions[locale] || quiz.instructions.ar).map((inst: string, idx: number) => (
                          <li key={idx}>{inst}</li>
                        ))
                      ) : (
                        <li>{quiz.instructions[locale] || quiz.instructions.ar || 'لا توجد تعليمات خاصة.'}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* قسم سجل المحاولات السابقة (History Cards) أسفل الصفحة */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-200 font-semibold text-base">
                  <History className="w-5 h-5 text-indigo-400" />
                  <span>{locale === 'ar' ? 'سجل محاولاتك السابقة' : 'Previous Attempts History'}</span>
                </div>

                {attemptsHistory.length === 0 ? (
                  <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-8 text-center text-slate-400 text-sm">
                    {locale === 'ar' ? 'ليس لديك محاولات سابقة منتهية لهذا الاختبار بعد.' : 'No previous completed attempts yet.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attemptsHistory.map((att: any, index: number) => {
                      const isPassed = att.is_passed
                      return (
                        <div 
                          key={att.id}
                          className={`border rounded-xl p-5 flex items-center justify-between bg-slate-900/40 backdrop-blur-sm transition-all shadow-md ${
                            isPassed ? 'border-emerald-500/30 hover:border-emerald-500/60' : 'border-rose-500/30 hover:border-rose-500/60'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${isPassed ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                              <span className="font-bold text-sm text-slate-200">
                                {locale === 'ar' ? `المحاولة رقم #${attemptsHistory.length - index}` : `Attempt #${attemptsHistory.length - index}`}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded font-bold ${isPassed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                {isPassed ? (locale === 'ar' ? 'ناجح' : 'Passed') : (locale === 'ar' ? 'راسب' : 'Failed')}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                              <span>⏱️ {Math.round(att.time_used_min || 0)} {locale === 'ar' ? 'دقيقة' : 'mins'}</span>
                              <span>📅 {new Date(att.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <span className={`text-lg font-bold font-mono ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {att.score}%
                            </span>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => setViewingReportAttempt(att)}
                              className="border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-xs text-slate-200"
                            >
                              {locale === 'ar' ? 'عرض التقرير' : 'View Report'}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  )
}


interface QuizInterfaceProps {
  quiz: any
  questions: any[]
  activeAttempt: any
  userId: string
  onFinishExam: (attempt: any) => void
  onPauseExam: () => void
}

export function QuizInterface({ 
  quiz, 
  questions, 
  activeAttempt, 
  userId, 
  onFinishExam, 
  onPauseExam 
}: QuizInterfaceProps) {
  const locale = useLocale() as 'ar' | 'en'
  
  const [currentIndex, setCurrentIndex] = useState(activeAttempt?.current_question_index || 0)
  const [answers, setAnswers] = useState<Record<string, any>>(activeAttempt?.answer_state || {})
  const [showTranslation, setShowTranslation] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // التايمر بالثواني
  const totalSecondsAllowed = quiz.duration_min * 60
  const [remainingTime, setRemainingTime] = useState<number>(
    activeAttempt?.remaining_time_sec !== undefined ? activeAttempt.remaining_time_sec : totalSecondsAllowed
  )
  const [startTime] = useState<number>(Date.now())

  // تشغيل التايمر التنازلي
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinishExamAuto() // انتهاء الوقت تلقائياً
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // حفظ تلقائي دوري كل 10 ثواني أو عند التنقل
  const saveProgressToDb = async (newIdx: number, newTime: number, newAnswers: Record<string, any>) => {
    if (!activeAttempt?.id) return
    try {
      await updateAttemptProgress(activeAttempt.id, newIdx, newTime, newAnswers)
    } catch (err) {
      console.error('Failed to auto-save progress', err)
    }
  }

  const handleFinishExamAuto = async () => {
    await handleSubmitExamFinal()
  }

  const handleSubmitExamFinal = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    const timeUsedMinutes = (totalSecondsAllowed - remainingTime) / 60

    try {
      const result = await submitAndCloseQuiz(
        activeAttempt.id,
        quiz.id,
        userId,
        answers,
        Math.max(timeUsedMinutes, 0.1)
      )
      onFinishExam(result)
    } catch (err) {
      console.error('Error submitting exam', err)
      setIsSubmitting(false)
    }
  }

  const currentQ = questions[currentIndex]
  if (!currentQ) {
    return <div className="text-white p-6">No questions found for this quiz.</div>
  }

  const questionText = locale === 'ar' ? currentQ.question?.ar : currentQ.question?.en
  const questionTranslation = locale === 'ar' ? currentQ.question?.en : currentQ.question?.ar

  // شريط التقدم النسبة المئوية
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100)

  // تنسيق الوقت المتبقي (mm:ss)
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (val: any) => {
    const newAnswers = { ...answers, [currentQ.id]: val }
    setAnswers(newAnswers)
    saveProgressToDb(currentIndex, remainingTime, newAnswers)
  }

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }))
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      saveProgressToDb(nextIdx, remainingTime, answers)
    } else {
      handleSubmitExamFinal()
    }
  }

  const handlePrev = () => {
    setShowExplanation(false)
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1
      setCurrentIndex(prevIdx)
      saveProgressToDb(prevIdx, remainingTime, answers)
    }
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6 pb-16">
      
      {/* هيدر الاختبار العلوي: تايمر + شريط التقدم + أزرار إيقاف وإنهاء */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl text-indigo-400 font-mono text-base font-bold shadow-inner">
              <Clock className="w-5 h-5" />
              <span>{formatTime(remainingTime)}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {locale === 'ar' ? `السؤال ${currentIndex + 1} من ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                saveProgressToDb(currentIndex, remainingTime, answers)
                onPauseExam()
              }}
              className="border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs md:text-sm"
            >
              <Pause className="w-4 h-4 me-1.5" />
              {locale === 'ar' ? 'إيقاف مؤقت' : 'Pause'}
            </Button>

            <Button 
              variant="destructive"
              onClick={handleSubmitExamFinal}
              disabled={isSubmitting}
              className="bg-rose-600/80 hover:bg-rose-600 text-white text-xs md:text-sm"
            >
              {locale === 'ar' ? 'إنهاء الاختبار' : 'Finish Exam'}
            </Button>
          </div>
        </div>

        {/* شريط التقدم */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/60">
          <div 
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* منطقة عرض السؤال الحالي */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6 relative">
        
        {/* أداة الترجمة وعلامة السؤال (Flag) */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
            className={`text-xs gap-1.5 ${showTranslation ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
          >
            <Languages className="w-4 h-4" />
            {locale === 'ar' ? 'عرض الترجمة' : 'Toggle Translation'}
          </Button>

          <Button 
            variant="ghost"
            size="sm"
            onClick={handleToggleFlag}
            className={`text-xs gap-1.5 ${flaggedQuestions[currentIndex] ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
          >
            <Flag className={`w-4 h-4 ${flaggedQuestions[currentIndex] ? 'fill-current' : ''}`} />
            {locale === 'ar' ? 'تحديد كفلج' : 'Flag Question'}
          </Button>
        </div>

        {/* نص السؤال */}
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-bold text-slate-100 leading-relaxed">
            {questionText}
          </h2>
          {showTranslation && questionTranslation && (
            <p className="text-xs md:text-sm text-indigo-400/90 italic bg-indigo-950/20 p-3 rounded-lg border border-indigo-900/30">
              {questionTranslation}
            </p>
          )}
        </div>

        {/* خيارات الإجابة حسب نوع السؤال */}
        <div className="space-y-3 pt-2">
          
          {/* 1. نوع الاختيار المفرد (Single / True-False) */}
          {currentQ.type === 'single' && (
            <RadioGroup 
              value={answers[currentQ.id] || ''} 
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQ.options?.map((opt: any) => {
                const optText = locale === 'ar' ? opt.text?.ar : opt.text?.en
                const optHint = locale === 'ar' ? opt.hint?.ar : opt.hint?.en
                const isSelected = answers[currentQ.id] === opt.id

                return (
                  <div key={opt.id} className="space-y-1">
                    <div className={`flex items-center space-x-3 space-x-reverse p-4 rounded-xl border transition-all ${
                      isSelected ? 'bg-indigo-600/15 border-indigo-500/60 text-slate-100' : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/40 text-slate-300'
                    }`}>
                      <RadioGroupItem value={opt.id} id={opt.id} className="border-slate-600 text-indigo-600" />
                      <Label htmlFor={opt.id} className="flex-1 cursor-pointer text-sm font-medium">
                        {optText}
                      </Label>
                    </div>

                    {/* عرض تعليق الخيار عند تفعيل زر عرض الإجابة */}
                    {showExplanation && (
                      <div className={`p-3 rounded-lg text-xs mt-1 border ${
                        opt.is_correct ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                      }`}>
                        <span className="font-bold">{opt.is_correct ? '✅ صحيح: ' : '❌ خطأ: '}</span>
                        {optHint || (locale === 'ar' ? 'لا يوجد تعليق متاح.' : 'No comment available.')}
                      </div>
                    )}
                  </div>
                )
              })}
            </RadioGroup>
          )}

          {/* 2. نوع الاختيار المتعدد (Multiple Choice) */}
          {currentQ.type === 'multiple' && (
            <div className="space-y-3">
              {currentQ.options?.map((opt: any) => {
                const optText = locale === 'ar' ? opt.text?.ar : opt.text?.en
                const optHint = locale === 'ar' ? opt.hint?.ar : opt.hint?.en
                const currentSelectedArray = Array.isArray(answers[currentQ.id]) ? answers[currentQ.id] : []
                const isChecked = currentSelectedArray.includes(opt.id)

                return (
                  <div key={opt.id} className="space-y-1">
                    <div 
                      onClick={() => {
                        let updated = [...currentSelectedArray]
                        if (isChecked) {
                          updated = updated.filter(id => id !== opt.id)
                        } else {
                          updated.push(opt.id)
                        }
                        handleAnswerSelect(updated)
                      }}
                      className={`flex items-center space-x-3 space-x-reverse p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked ? 'bg-indigo-600/15 border-indigo-500/60 text-slate-100' : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/40 text-slate-300'
                      }`}
                    >
                      <Checkbox checked={isChecked} className="border-slate-600 data-[state=checked]:bg-indigo-600" />
                      <span className="flex-1 text-sm font-medium">{optText}</span>
                    </div>

                    {showExplanation && (
                      <div className={`p-3 rounded-lg text-xs mt-1 border ${
                        opt.is_correct ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                      }`}>
                        <span className="font-bold">{opt.is_correct ? '✅ صحيح: ' : '❌ خطأ: '}</span>
                        {optHint}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* 3. نوع السحب والإفلات أو المطابقة (Drag & Drop Pairs) */}
          {currentQ.type === 'drag_drop' && (
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-indigo-400 font-medium">
                {locale === 'ar' ? 'قم بمطابقة العناصر من القائمة الأولى مع ما يناسبها من القائمة الثانية:' : 'Match items from list 1 with list 2:'}
              </p>
              
              {/* محاكاة واجهة مبسطة للمطابقة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options?.items1?.map((item1: any) => {
                  const userPairs = answers[currentQ.id] || {}
                  const selectedMatch = userPairs[item1.id] || ''

                  return (
                    <div key={item1.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-slate-200 block">{locale === 'ar' ? item1.ar : item1.en}</span>
                      <select 
                        value={selectedMatch}
                        onChange={(e) => {
                          const updatedPairs = { ...userPairs, [item1.id]: e.target.value }
                          handleAnswerSelect(updatedPairs)
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">{locale === 'ar' ? '-- اختر المطابقة المناسبة --' : '-- Select match --'}</option>
                        {currentQ.options?.items2?.map((item2: any) => (
                          <option key={item2.id} value={item2.id}>
                            {locale === 'ar' ? item2.ar : item2.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                })}
              </div>

              {showExplanation && (
                <div className="p-3 rounded-lg text-xs bg-slate-900 border border-slate-700 text-slate-300 space-y-1">
                  <span className="font-bold text-indigo-300">💡 تعليق الإجابة الصحيحة:</span>
                  <p>{locale === 'ar' ? currentQ.options?.explanation?.ar : currentQ.options?.explanation?.en}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* زر عرض الحل الفوري */}
        <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="border-indigo-500/40 text-indigo-300 bg-indigo-950/20 hover:bg-indigo-900/30 text-xs"
          >
            {showExplanation ? (locale === 'ar' ? 'إخفاء الحل والتعليق' : 'Hide Solution') : (locale === 'ar' ? 'عرض الحل والتعليقات' : 'Show Solution & Comments')}
          </Button>

          <div className="flex items-center gap-3">
            {currentIndex > 0 && (
              <Button 
                variant="outline"
                onClick={handlePrev}
                className="border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs"
              >
                <ChevronRight className="w-4 h-4 me-1" />
                {locale === 'ar' ? 'السابق' : 'Previous'}
              </Button>
            )}

            <Button 
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-6"
            >
              {currentIndex === questions.length - 1 ? (locale === 'ar' ? 'إنهاء وحفظ' : 'Finish & Submit') : (locale === 'ar' ? 'التالي' : 'Next')}
              <ChevronLeft className="w-4 h-4 ms-1" />
            </Button>
          </div>
        </div>

      </div>

    </div>
  )
}

interface QuizReportProps {
  attempt: any
  quiz: any
  questions: any[]
  onBack: () => void
}

export function QuizReport({ attempt, quiz, questions, onBack }: QuizReportProps) {
  const locale = useLocale() as 'ar' | 'en'
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary')

  const answerState = attempt?.answer_state || {}
  const totalQuestions = questions.length
  
  let correctCount = 0
  let wrongCount = 0

  questions.forEach((q: any) => {
    const state = answerState[q.id]
    if (state && state.isCorrect) {
      correctCount++
    } else {
      wrongCount++
    }
  })

  const isPassed = attempt.is_passed

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6 pb-16">
      
      {/* شريط العنوان وزر العودة */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
            {locale === 'ar' ? 'تقرير نتيجة الاختبار' : 'Exam Result Report'}
          </span>
          <h2 className="text-xl font-bold text-slate-100">
            {locale === 'ar' ? quiz.title?.ar : quiz.title?.en}
          </h2>
        </div>

        <Button 
          variant="outline"
          onClick={onBack}
          className="border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs"
        >
          <ArrowRight className="w-4 h-4 me-1.5" />
          {locale === 'ar' ? 'العودة للاختبارات' : 'Back to Quizzes'}
        </Button>
      </div>

      {/* التابات (Tabs) */}
      <div className="flex border-b border-slate-800 gap-6">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'summary' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {locale === 'ar' ? 'ملخص النتيجة والجدول' : 'Summary & Table'}
        </button>

        <button 
          onClick={() => setActiveTab('review')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'review' 
              ? 'border-indigo-500 text-indigo-400' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {locale === 'ar' ? 'مراجعة الأسئلة والحلول' : 'Questions & Solutions Review'}
        </button>
      </div>

      {/* محتوى التاب الأول: ملخص وإحصائيات وجدول النتائج */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          
          {/* كارد النتيجة الكبرى */}
          <div className={`border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/40 backdrop-blur-md ${
            isPassed ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-rose-500/30 bg-rose-950/10'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl ${
                isPassed ? 'bg-emerald-600 shadow-emerald-900/50' : 'bg-rose-600 shadow-rose-900/50'
              }`}>
                {attempt.score}%
              </div>
              <div className="space-y-1">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {isPassed ? (locale === 'ar' ? 'اجتزت الاختبار بنجاح 🎉' : 'Passed Successfully 🎉') : (locale === 'ar' ? 'لم تتاز الاختبار ❌' : 'Failed ❌')}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  {isPassed ? (locale === 'ar' ? 'أداء ممتاز، واصل التقدم!' : 'Great performance!') : (locale === 'ar' ? 'حاول مرة أخرى لتحسين مستواك' : 'Try again to improve')}
                </h3>
              </div>
            </div>

            <div className="flex gap-4 text-xs font-mono text-slate-300">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-slate-400">{locale === 'ar' ? 'الإجمالي' : 'Total'}</p>
                <p className="text-base font-bold text-slate-100">{totalQuestions}</p>
              </div>
              <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 text-center">
                <p className="text-emerald-400">{locale === 'ar' ? 'صح' : 'Correct'}</p>
                <p className="text-base font-bold text-emerald-300">{correctCount}</p>
              </div>
              <div className="bg-rose-950/30 p-3 rounded-xl border border-rose-500/30 text-center">
                <p className="text-rose-400">{locale === 'ar' ? 'خطأ' : 'Wrong'}</p>
                <p className="text-base font-bold text-rose-300">{wrongCount}</p>
              </div>
            </div>
          </div>

          {/* جدول تفاصيل الأسئلة */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-300">
              {locale === 'ar' ? 'جدول تفاصيل إجابات الأسئلة' : 'Questions Answer Details Table'}
            </div>
            
            <div className="divide-y divide-slate-800/60">
              {questions.map((q: any, idx: number) => {
                const state = answerState[q.id]
                const isCorrect = state?.isCorrect || false
                const qText = locale === 'ar' ? q.question?.ar : q.question?.en

                return (
                  <div key={q.id} className="p-4 flex items-center justify-between text-xs md:text-sm hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-3 truncate pe-4">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs text-slate-400 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate text-slate-200">{qText}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {isCorrect ? (locale === 'ar' ? 'صحيح' : 'Correct') : (locale === 'ar' ? 'خطأ' : 'Incorrect')}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      )}

      {/* محتوى التاب الثاني: مراجعة كاملة للأسئلة مع الحلول والتعليقات الملونة */}
      {activeTab === 'review' && (
        <div className="space-y-6">
          {questions.map((q: any, idx: number) => {
            const state = answerState[q.id]
            const isCorrect = state?.isCorrect || false
            const qText = locale === 'ar' ? q.question?.ar : q.question?.en

            return (
              <div key={q.id} className={`bg-slate-900/60 border rounded-2xl p-6 shadow-lg space-y-4 ${
                isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
              }`}>
                
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    {locale === 'ar' ? `السؤال رقم ${idx + 1}` : `Question #${idx + 1}`}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
                    isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {isCorrect ? (locale === 'ar' ? 'حُل بشكل صحيح' : 'Solved Correctly') : (locale === 'ar' ? 'حُل بشكل خاطئ' : 'Solved Incorrectly')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">
                  {qText}
                </h3>

                {/* استعراض الخيارات مع التعليقات بالأحمر والأخضر */}
                <div className="space-y-2 pt-2">
                  {q.type === 'single' && q.options?.map((opt: any) => {
                    const optText = locale === 'ar' ? opt.text?.ar : opt.text?.en
                    const optHint = locale === 'ar' ? opt.hint?.ar : opt.hint?.en
                    const isUserChoice = state?.userAnswer === opt.id

                    return (
                      <div key={opt.id} className={`p-3.5 rounded-xl border space-y-1 ${
                        opt.is_correct 
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                          : isUserChoice 
                            ? 'bg-rose-950/20 border-rose-500/40 text-rose-200' 
                            : 'bg-slate-950/40 border-slate-800 text-slate-400'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs md:text-sm font-medium">
                            {isUserChoice && '👉 '} {optText}
                          </span>
                          <span className="text-xs font-bold">
                            {opt.is_correct ? (locale === 'ar' ? 'الإجابة الصحيحة ✅' : 'Correct Answer') : isUserChoice ? (locale === 'ar' ? 'اختيارك ❌' : 'Your Choice') : ''}
                          </span>
                        </div>
                        {optHint && (
                          <p className="text-xs pt-1 opacity-90 border-t border-slate-800/60 mt-1">
                            {optHint}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}



interface QuizzesClientProps {
  sections: any[]
  allQuizzes: any[]
  initialQuiz: any
  initialQuestions: any[]
  initialAttempts: any[]
  allUserAttempts: any[]
  userId: string
  courseSlug: string
}

export function QuizzesClient({
  sections,
  initialQuiz,
  initialQuestions,
  initialAttempts,
  allUserAttempts,
  userId
}: QuizzesClientProps) {
  const locale = useLocale() as 'ar' | 'en'
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [initialQuiz?.section_id]: true
  })

  const [currentQuiz, setCurrentQuiz] = useState(initialQuiz)
  const [questions, setQuestions] = useState(initialQuestions)
  const [quizAttempts, setQuizAttempts] = useState(initialAttempts)

  // حالات سير العمل للاختبار الحالي
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'paused' | 'report'>('intro')
  const [currentAttempt, setCurrentAttempt] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({})
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const [showTranslation, setShowTranslation] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  
  const [remainingSec, setRemainingSec] = useState(currentQuiz.duration_min * 60)
  const [timerActive, setTimerActive] = useState(false)
  const [lastReportData, setLastReportData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'summary' | 'detailed'>('summary')

  // التايمر التنازلي
  useEffect(() => {
    let interval: any = null
    if (quizState === 'active' && timerActive && remainingSec > 0) {
      interval = setInterval(() => {
        setRemainingSec(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleFinishQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [quizState, timerActive, remainingSec])

  // عند تغيير الاختبار من القائمة الجانبية
  const handleSelectQuiz = (quiz: any) => {
    setCurrentQuiz(quiz)
    setQuizState('intro')
    setTimerActive(false)
    setRemainingSec(quiz.duration_min * 60)
    setCurrentIndex(0)
    setUserAnswers({})
    // تحديث الهيستوري الخاص بهذا الاختبار من المجموع الكلي للمحاولات
    const filtered = allUserAttempts.filter(att => att.quiz_id === quiz.id)
    setQuizAttempts(filtered)
  }

  // بدء الاختبار أو استئنافه
  const handleStartQuiz = async () => {
    try {
      const attempt = await getOrCreateActiveAttempt(userId, currentQuiz.id, currentQuiz.duration_min)
      setCurrentAttempt(attempt)
      
      if (attempt.answer_state && Object.keys(attempt.answer_state).length > 0) {
        setCurrentIndex(attempt.current_question_index || 0)
        setRemainingSec(attempt.remaining_time_sec || currentQuiz.duration_min * 60)
      }

      setQuizState('active')
      setTimerActive(true)
    } catch (error) {
      console.error('Failed to start quiz', error)
    }
  }

  const handlePauseQuiz = async () => {
    setTimerActive(false)
    setQuizState('paused')
    if (currentAttempt) {
      await updateAttemptProgress(currentAttempt.id, currentIndex, remainingSec, userAnswers)
    }
  }

  const handleFinishQuiz = async () => {
    if (!currentAttempt) return
    setTimerActive(false)
    const totalTimeUsed = Math.round(((currentQuiz.duration_min * 60) - remainingSec) / 60)
    
    try {
      const result = await submitAndCloseQuiz(
        currentAttempt.id,
        currentQuiz.id,
        userId,
        userAnswers,
        totalTimeUsed > 0 ? totalTimeUsed : 1
      )
      setLastReportData(result)
      setQuizState('report')
    } catch (error) {
      console.error('Failed to finish quiz', error)
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const currentQ = questions[currentIndex]

  // تحديد حالة إفادة كل اختبار في السايدبار (أخضر لو نجح في أي محاولة، رمادي لو لا)
  const getQuizStatusColor = (quizId: string) => {
    const attempts = allUserAttempts.filter(att => att.quiz_id === quizId && att.is_closed)
    const passed = attempts.some(att => att.is_passed)
    if (passed) return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
    if (attempts.length > 0) return 'bg-amber-400' // حاول ولم ينجح بعد
    return 'bg-slate-700' // لم يبدأ
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      
      {/* 1. القائمة الجانبية (Sidebar) لجدول المحتويات */}
      {sidebarOpen && (
        <aside className="w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col z-20 shadow-2xl transition-all">
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
              const quizzesCount = section.course_quiz?.length || 0

              return (
                <div key={section.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/40">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-3.5 bg-slate-900/60 hover:bg-slate-800/60 flex justify-between items-center text-start font-medium text-xs md:text-sm text-slate-300 transition-colors"
                  >
                    <span className="truncate pe-2">{locale === 'ar' ? section.title_ar : section.title_en}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                        {quizzesCount} {locale === 'ar' ? 'اختبارات' : 'Quizzes'}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="divide-y divide-slate-800/50 bg-slate-950/20">
                      {section.course_quiz?.map((quiz: any) => {
                        const isSelected = currentQuiz?.id === quiz.id
                        const titleText = locale === 'ar' ? quiz.title?.ar : quiz.title?.en
                        const dotColor = getQuizStatusColor(quiz.id)

                        return (
                          <div 
                            key={quiz.id}
                            onClick={() => handleSelectQuiz(quiz)}
                            className={`p-3.5 flex items-center justify-between cursor-pointer transition-all text-xs md:text-sm ${
                              isSelected 
                                ? 'bg-indigo-600/15 text-indigo-300 font-medium border-l-4 border-indigo-500' 
                                : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 truncate">
                              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                              <span className="truncate">{titleText}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 shrink-0 font-mono">{quiz.duration_min}د</span>
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
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="font-semibold text-sm md:text-base truncate max-w-md text-slate-200">
                {currentQuiz?.title ? (locale === 'ar' ? currentQuiz.title.ar : currentQuiz.title.en) : 'اختبار'}
              </h1>
              <span className="text-xs text-slate-400">
                المدة: {currentQuiz.duration_min} دقيقة | نسبة النجاح: {currentQuiz.passing_score}%
              </span>
            </div>
          </div>

          {quizState === 'active' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg font-mono text-indigo-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(remainingSec / 60)}:{String(remainingSec % 60).padStart(2, '0')}</span>
              </div>
              <Button size="sm" variant="outline" onClick={handlePauseQuiz} className="border-slate-700 text-slate-300">
                <Pause className="w-4 h-4 me-1" /> إيقاف مؤقت
              </Button>
              <Button size="sm" variant="destructive" onClick={handleFinishQuiz}>
                إنهاء الاختبار
              </Button>
            </div>
          )}
        </header>

        {/* محتوى الشاشة الرئيسي (قلب الاختبار + الهيستوري السفلي) */}
        <main className="flex-1 bg-slate-950 flex flex-col items-center justify-start pt-6 md:pt-8 px-4 md:px-10 overflow-y-auto space-y-10">
          
          {/* قلب الاختبار */}
          <div className="w-full max-w-4xl space-y-6">
            
            {/* الحالة 1: شاشة البداية والتعليمات */}
            {quizState === 'intro' && (
              <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">جاهز للاختبار</span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-100">
                    {locale === 'ar' ? currentQuiz?.title?.ar : currentQuiz?.title?.en}
                  </h2>
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  <h4 className="font-semibold text-slate-200">التعليمات:</h4>
                  <p className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-slate-400">
                    {locale === 'ar' ? currentQuiz?.instructions?.ar : currentQuiz?.instructions?.en || 'لا توجد تعليمات خاصة.'}
                  </p>
                </div>

                <Button onClick={handleStartQuiz} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-base font-medium shadow-lg">
                  بدء الاختبار الآن
                </Button>
              </div>
            )}

            {/* الحالة 2: شاشة الإيقاف المؤقت */}
            {quizState === 'paused' && (
              <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
                <h3 className="text-xl font-bold text-slate-100">تم إيقاف الاختبار مؤقتاً</h3>
                <p className="text-sm text-slate-400">يمكنك الاستئناف في أي وقت.</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setQuizState('intro')} variant="outline" className="border-slate-700 text-slate-300">
                    الرئيسية
                  </Button>
                  <Button onClick={() => { setQuizState('active'); setTimerActive(true); }} className="bg-indigo-600 hover:bg-indigo-500">
                    استئناف
                  </Button>
                </div>
              </div>
            )}

            {/* الحالة 3: شاشة أسئلة الاختبار التفاعلية */}
            {quizState === 'active' && currentQ && (
              <div className="w-full space-y-6">
                <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
                    السؤال {currentIndex + 1} من {questions.length}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => setShowTranslation(!showTranslation)} className="text-slate-400 hover:text-white">
                    <Globe className="w-4 h-4 me-1" /> {showTranslation ? 'إخفاء الترجمة' : 'عرض الترجمة'}
                  </Button>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {locale === 'ar' ? currentQ.question?.ar : currentQ.question?.en}
                  </h3>
                  
                  <div className="space-y-3 pt-4">
                    {Array.isArray(currentQ.options) && currentQ.options.map((opt: any) => (
                      <div key={opt.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300">
                        {locale === 'ar' ? opt.text?.ar : opt.text?.en}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev - 1)} variant="outline">السابق</Button>
                  {currentIndex < questions.length - 1 ? (
                    <Button onClick={() => setCurrentIndex(prev => prev + 1)} className="bg-indigo-600">التالي</Button>
                  ) : (
                    <Button onClick={handleFinishQuiz} className="bg-emerald-600">إنهاء الاختبار</Button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* قسم الهيستوري السفلي (كاردات المحاولات السابقة لهذا الاختبار) */}
          <div className="w-full max-w-4xl pb-12 space-y-4 border-t border-slate-800/80 pt-8">
            <h3 className="text-base font-semibold text-slate-200">سجل المحاولات السابقة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizAttempts.map((attempt: any) => (
                <div key={attempt.id} className={`p-4 rounded-xl border flex items-center justify-between ${attempt.is_passed ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-rose-950/20 border-rose-900/50'}`}>
                  <div className="space-y-1">
                    <span className={`text-sm font-bold ${attempt.is_passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {attempt.is_passed ? 'ناجح' : 'راسب'} ({attempt.score}%)
                    </span>
                    <span className="block text-xs text-slate-400 font-mono">
                      الوقت المستغرق: {attempt.time_used_min} دقيقة | {new Date(attempt.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-200">
                    عرض التقرير
                  </Button>
                </div>
              ))}
              {quizAttempts.length === 0 && (
                <p className="text-xs text-slate-500 col-span-2">لا توجد محاولات مسجلة لهذا الاختبار حتى الآن.</p>
              )}
            </div>
          </div>

        </main>
      </div>

    </div>
  )
}









