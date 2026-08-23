'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PanelLeftClose, PanelLeftOpen, CheckCircle2, XCircle, Clock, Award, ArrowRight } from 'lucide-react'
import { getQuizQuestionsAction, submitQuizAttemptAction } from '../actions/quizzes'

interface QuizPlayerClientProps {
  course: any
  sections: any[]
  initialQuiz: any
  initialQuestions: any[]
  initialPassedMap: [string, boolean][]
  userId: string
  locale: string
}

export function QuizPlayerClient({ 
  course, 
  sections, 
  initialQuiz, 
  initialQuestions, 
  initialPassedMap, 
  userId, 
  locale 
}: QuizPlayerClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentQuiz, setCurrentQuiz] = useState(initialQuiz)
  const [questions, setQuestions] = useState(initialQuestions)
  const [passedMap, setPassedMap] = useState<Map<string, boolean>>(new Map(initialPassedMap))
  
  // حالات الاختبار
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  
  // التايمر التنازلي (بالدقائق)
  const [timeLeft, setTimeLeft] = useState<number>(initialQuiz ? initialQuiz.duration_minutes * 60 : 600)

  // عداد الوقت
  useEffect(() => {
    if (!currentQuiz || result) return
    setTimeLeft(currentQuiz.duration_minutes * 60)

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz() // إرسال تلقائي عند انتهاء الوقت
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuiz?.id, result])

  // اختيار اختبار من القائمة الجانبية
  const handleSelectQuiz = async (quiz: any) => {
    setCurrentQuiz(quiz)
    setResult(null)
    setUserAnswers({})
    const fetchedQuestions = await getQuizQuestionsAction(quiz.id)
    setQuestions(fetchedQuestions)
  }

  const handleOptionSelect = (questionId: string, option: string) => {
    if (result) return // منع التعديل بعد ظهور النتيجة
    setUserAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const handleSubmitQuiz = async () => {
    if (!currentQuiz || submitting) return
    setSubmitting(true)
    try {
      const res = await submitQuizAttemptAction(userId, currentQuiz.id, userAnswers, currentQuiz.passing_score)
      setResult(res)
      if (res.isPassed) {
        setPassedMap(prev => new Map(prev).set(currentQuiz.id, true))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 1. القائمة الجانبية (Sidebar) */}
      {sidebarOpen && (
        <aside className="w-80 bg-white border-e flex flex-col z-20 shadow-sm">
          <div className="p-4 border-b font-bold text-slate-800 flex items-center justify-between">
            <span>اختبارات الدورة</span>
            <span className="text-xs text-slate-500">{course.title?.[locale] || course.title?.ar}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {sections.map(section => (
              <div key={section.id} className="space-y-1">
                <p className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider">
                  {locale === 'ar' ? section.title_ar : section.title_en}
                </p>
                {section.course_quiz?.map((quiz: any) => {
                  const isSelected = currentQuiz?.id === quiz.id
                  const isPassed = passedMap.get(quiz.id)

                  return (
                    <button
                      key={quiz.id}
                      onClick={() => handleSelectQuiz(quiz)}
                      className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-all ${
                        isSelected ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{locale === 'ar' ? quiz.title_ar : quiz.title_en}</span>
                      {isPassed && <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* 2. منطقة العرض الرئيسية */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* الأب بار (App Bar) */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </Button>
            <h1 className="font-bold text-lg truncate max-w-md">
              {currentQuiz ? (locale === 'ar' ? currentQuiz.title_ar : currentQuiz.title_en) : 'اختر اختباراً'}
            </h1>
          </div>

          {currentQuiz && !result && (
            <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md border border-amber-200 font-mono font-bold">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </header>

        {/* محتوى الاختبار / أو شاشة النتيجة */}
        <main className="flex-1 bg-slate-900 flex items-center justify-center p-6 overflow-y-auto">
          {currentQuiz ? (
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 my-auto text-slate-900">
              
              {result ? (
                /* شاشة النتيجة الفورية */
                <div className="text-center space-y-6 py-8">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${result.isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {result.isPassed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{result.isPassed ? 'تهانينا! لقد اجتزت الاختبار بنجاح 🎉' : 'للأسف لم تتخطَ الاختبار ❌'}</h2>
                    <p className="text-slate-500 mt-1">درجتك النهائية هي: <span className="font-bold text-slate-800">{result.score}%</span> (درجة النجاح المطلوبة: {currentQuiz.passing_score}%)</p>
                  </div>
                  <Button onClick={() => { setResult(null); setUserAnswers({}); }} variant="outline">
                    إعادة المحاولة
                  </Button>
                </div>
              ) : (
                /* شاشة الأسئلة */
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold">{locale === 'ar' ? currentQuiz.title_ar : currentQuiz.title_en}</h2>
                    <p className="text-sm text-slate-500 mt-1">أجب عن جميع الأسئلة ثم اضغط على زر التسليم في النهاية.</p>
                  </div>

                  <div className="space-y-6 max-h-[50vh] overflow-y-auto pe-2">
                    {questions.map((q, idx) => (
                      <div key={q.id} className="space-y-3 bg-slate-50 p-4 rounded-xl border">
                        <p className="font-semibold text-slate-800">{idx + 1}. {q.question_text}</p>
                        <div className="grid grid-cols-1 gap-2">
                          {q.options?.map((opt: string, optIdx: number) => (
                            <label 
                              key={optIdx} 
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                userAnswers[q.id] === opt ? 'bg-primary/10 border-primary font-medium' : 'bg-white hover:bg-slate-100 border-slate-200'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name={`question-${q.id}`} 
                                checked={userAnswers[q.id] === opt}
                                onChange={() => handleOptionSelect(q.id, opt)}
                                className="accent-primary"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t flex justify-end">
                    <Button onClick={handleSubmitQuiz} disabled={submitting} className="px-8 font-bold">
                      {submitting ? 'جاري إرسال الإجابات...' : 'تسليم الاختبار وإظهار النتيجة'}
                    </Button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-white text-lg">لا يوجد اختبار محدد للعرض</div>
          )}
        </main>

      </div>

    </div>
  )
}