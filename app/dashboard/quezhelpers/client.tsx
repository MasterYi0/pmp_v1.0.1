'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Eye,
  Flag,
  Globe,
  GripVertical,
  Link2,
  ListFilter,
  PanelLeftClose,
  PanelLeftOpen,
  Pause,
  Play,
  Search,
  X,
  XCircle,
  ZoomIn,
} from 'lucide-react'
import {
  getOrCreateActiveAttempt,
  updateAttemptProgress,
  submitAndCloseQuiz,
  getAttemptReport,
  getQuizQuestions,
  getUserQuizAttempts,
  type SectionRow,
  type QuizRow,
  type QuizQuestionRow,
  type QuizAttemptRow,
  type QuestionBankRow,
  type QuestionOption,
  type DndOptions,
  type GroupedGroup,
  type QuizReportData,
  type GradeResult,
  type LocalizedText,
  type LocalizedImage,
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

// ---------------------------------------------------------------------
// Language rules for this screen:
//  - interface chrome (buttons, labels, tabs...) -> follows the app locale
//  - quiz content from the DB (titles, questions, answers, explanations,
//    images) -> ALSO follows the app locale
//  - the "show translation" button reveals the OPPOSITE language
//    (Arabic app -> English text, English app -> Arabic text)
// ---------------------------------------------------------------------
const t = (locale: Locale, ar: string, en: string) => (locale === 'ar' ? ar : en)
const otherLocale = (l: Locale): Locale => (l === 'ar' ? 'en' : 'ar')
const dirOf = (l: Locale) => (l === 'ar' ? 'rtl' : 'ltr')

/** Text in the app language (falls back to the other language if empty). */
const pick = (v: LocalizedText | null | undefined, l: Locale) =>
  v?.[l] || v?.[otherLocale(l)] || ''

/** Text in the OPPOSITE language — '' when there is nothing different to show. */
const altOf = (v: LocalizedText | null | undefined, l: Locale) => {
  const main = v?.[l]
  const alt = v?.[otherLocale(l)]
  return main && alt && alt !== main ? alt : ''
}

const pickImage = (img: LocalizedImage | null | undefined, l: Locale) =>
  img?.[l] ?? img?.[otherLocale(l)] ?? null

const altImage = (img: LocalizedImage | null | undefined, l: Locale) => {
  const main = img?.[l]
  const alt = img?.[otherLocale(l)]
  return main && alt && alt !== main ? alt : null
}

const mmss = (sec: number) =>
  `${Math.floor(sec / 60)}:${String(Math.max(0, sec % 60)).padStart(2, '0')}`

/** Number of questions that actually have an answer inside a saved answer_state. */
function countAnswered(answerState: Record<string, any> | null | undefined): number {
  return Object.entries(answerState ?? {}).filter(([key, value]) => {
    if (key.startsWith('__')) return false
    if (typeof value === 'string') return value.length > 0
    if (Array.isArray(value)) return value.length > 0
    if (value && typeof value === 'object') {
      return Object.values(value).some((v) => Array.isArray(v) && v.length > 0)
    }
    return false
  }).length
}

// ---------------------------------------------------------------------
// Theme tokens. Every color pair is written out in full (light + dark:)
// so Tailwind can see the class names. The root layout toggles the `dark`
// class on <html>, which is what the `dark:` variant follows.
// ---------------------------------------------------------------------
const ui = {
  page: 'bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100',
  card: 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900',
  soft: 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50',
  line: 'border-slate-200 dark:border-slate-800',
  title: 'text-slate-800 dark:text-slate-100',
  text: 'text-slate-700 dark:text-slate-200',
  body: 'text-slate-600 dark:text-slate-300',
  muted: 'text-slate-500 dark:text-slate-400',
  faint: 'text-slate-400 dark:text-slate-500',
  accent: 'text-violet-600 dark:text-violet-400',
  outlineBtn:
    'border-slate-300 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
  ghostBtn:
    'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
  primaryBtn: 'bg-violet-600 text-white hover:bg-violet-500',
  chipViolet:
    'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300',
  chipEmerald:
    'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  chipRose:
    'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
  chipAmber:
    'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
  chipSky:
    'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300',
  chipCyan:
    'border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300',
  chipSlate:
    'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
  // Option frames (frame-only coloring, the fill never changes so long text stays readable)
  optionBase:
    'border-slate-200 bg-white text-slate-700 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-500/60',
  optionSelected: 'border-violet-500 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
  optionCorrect: 'border-emerald-500 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
  optionWrong: 'border-rose-500 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100',
}

export function QuizzesClient({
  sections,
  initialQuiz,
  initialQuestions,
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
  const [allAttempts, setAllAttempts] = useState<QuizAttemptRow[]>(allUserAttempts)
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [starting, setStarting] = useState(false)

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
  const quizRef = useRef(currentQuiz)
  const allAttemptsRef = useRef(allAttempts)
  const submittingRef = useRef(false)
  useEffect(() => void (answersRef.current = answers), [answers])
  useEffect(() => void (flagsRef.current = flags), [flags])
  useEffect(() => void (remainingRef.current = remainingSec), [remainingSec])
  useEffect(() => void (indexRef.current = currentIndex), [currentIndex])
  useEffect(() => void (attemptRef.current = currentAttempt), [currentAttempt])
  useEffect(() => void (revealedRef.current = revealed), [revealed])
  useEffect(() => void (quizStateRef.current = quizState), [quizState])
  useEffect(() => void (quizRef.current = currentQuiz), [currentQuiz])

  const currentQ = questions[currentIndex]

  // Attempts of the quiz currently open (derived — no second copy to keep in sync).
  const attempts = useMemo(
    () => (currentQuiz ? allAttempts.filter((a) => a.quiz_id === currentQuiz.id) : []),
    [allAttempts, currentQuiz]
  )

  // A saved, not-closed attempt => this quiz was started before => show "Resume", not "Start".
  const openAttempt = useMemo(() => attempts.find((a) => !a.is_closed) ?? null, [attempts])

  // ---------------- Attempt list helpers (ref-backed, so they're never stale) ----------------
  const updateAllAttempts = (fn: (prev: QuizAttemptRow[]) => QuizAttemptRow[]) => {
    const next = fn(allAttemptsRef.current)
    allAttemptsRef.current = next
    setAllAttempts(next)
  }

  const upsertAttempt = (attempt: QuizAttemptRow) =>
    updateAllAttempts((prev) =>
      prev.some((a) => a.id === attempt.id)
        ? prev.map((a) => (a.id === attempt.id ? attempt : a))
        : [attempt, ...prev]
    )

  const patchAttempt = (id: number, patch: Partial<QuizAttemptRow>) =>
    updateAllAttempts((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)))

  const replaceQuizAttempts = (quizId: number, fresh: QuizAttemptRow[]) =>
    updateAllAttempts((prev) =>
      [...prev.filter((a) => a.quiz_id !== quizId), ...fresh].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    )

  /** Everything that must be saved for the running attempt (reads refs only). */
  const buildSnapshot = () => ({
    current_question_index: indexRef.current,
    remaining_time_sec: remainingRef.current,
    answer_state: {
      ...answersRef.current,
      __flags: flagsRef.current,
      __revealed: revealedRef.current,
    } as Record<string, any>,
  })

  // Make sure the intro screen of the quiz opened from the URL has fresh attempt
  // data (so Resume/Start is right even if the page came from the router cache).
  useEffect(() => {
    if (!initialQuiz) return
    let cancelled = false
    getUserQuizAttempts(userId, initialQuiz.id)
      .then((fresh) => {
        if (!cancelled) replaceQuizAttempts(initialQuiz.id, fresh)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // ---------------- Autosave ----------------
  // 1) Debounced save while answering, so closing the tab abruptly loses nothing.
  useEffect(() => {
    if (quizState !== 'active' || !currentAttempt) return
    const id = setTimeout(() => {
      const snap = buildSnapshot()
      updateAttemptProgress(
        currentAttempt.id,
        snap.current_question_index,
        snap.remaining_time_sec,
        answersRef.current,
        flagsRef.current,
        revealedRef.current
      ).catch(() => {})
    }, 1500)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, flags, revealed, currentIndex, quizState, currentAttempt])

  // 2) If the quiz is running and the user switches tab / app / minimizes the
  //    window / leaves the page, persist progress AND flip the UI into the
  //    "paused" state, so coming back always lands on Resume instead of
  //    silently continuing (or restarting) in the background.
  useEffect(() => {
    const persist = () => {
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
      if (!document.hidden) return
      if (quizStateRef.current === 'active') {
        const attempt = attemptRef.current
        setTimerActive(false)
        setQuizState('paused')
        if (attempt) patchAttempt(attempt.id, buildSnapshot())
        persist()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', persist)
    window.addEventListener('beforeunload', persist)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', persist)
      window.removeEventListener('beforeunload', persist)
      persist()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---------------- Sidebar helpers ----------------
  const toggleSection = (id: string) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }))

  type QuizStatus = 'inprogress' | 'passed' | 'attempted' | 'none'
  const quizStatus = (quizId: number): QuizStatus => {
    const list = allAttempts.filter((a) => a.quiz_id === quizId)
    if (list.some((a) => !a.is_closed)) return 'inprogress'
    const closed = list.filter((a) => a.is_closed)
    if (closed.some((a) => a.is_passed)) return 'passed'
    if (closed.length > 0) return 'attempted'
    return 'none'
  }

  const statusDotClass = (status: QuizStatus) => {
    if (status === 'inprogress') return 'bg-sky-500'
    if (status === 'passed') return 'bg-emerald-500'
    if (status === 'attempted') return 'bg-amber-500'
    return 'bg-slate-300 dark:bg-slate-600'
  }

  // ---------------- Selecting a quiz from the sidebar ----------------
  const handleSelectQuiz = async (quiz: QuizRow) => {
    if (quizStateRef.current === 'active') {
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
    setQuizState('intro')

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false)
    }

    try {
      // Questions + FRESH attempts for this quiz, so the intro screen knows
      // whether to say "Start" (nothing open) or "Resume" (a paused attempt exists).
      const [qs, fresh] = await Promise.all([
        getQuizQuestions(quiz.id),
        getUserQuizAttempts(userId, quiz.id).catch(() => null),
      ])
      setQuestions(qs)
      if (fresh) replaceQuizAttempts(quiz.id, fresh)
    } finally {
      setLoadingQuiz(false)
    }
  }

  // ---------------- Start / resume ----------------
  // getOrCreateActiveAttempt returns the saved open attempt when there is one
  // (=> resume with its answers, flags, position and remaining time),
  // and creates a brand-new attempt otherwise.
  const handleStartQuiz = async () => {
    if (!currentQuiz || starting) return
    setStarting(true)
    try {
      const attempt = await getOrCreateActiveAttempt(userId, currentQuiz.id, currentQuiz.duration_min)
      upsertAttempt(attempt)
      setCurrentAttempt(attempt)

      const entries = Object.entries((attempt.answer_state ?? {}) as Record<string, any>)
      const savedAnswers = Object.fromEntries(entries.filter(([k]) => !k.startsWith('__')))
      const savedState = (attempt.answer_state ?? {}) as Record<string, any>

      setAnswers(savedAnswers as Record<number, any>)
      setFlags((savedState.__flags ?? {}) as Record<number, boolean>)
      setRevealed((savedState.__revealed ?? {}) as Record<number, boolean>)
      setCurrentIndex(attempt.current_question_index ?? 0)
      setRemainingSec(attempt.remaining_time_sec ?? currentQuiz.duration_min * 60)
      setShowTranslation(false)
      setQuizState('active')
      setTimerActive(true)
    } finally {
      setStarting(false)
    }
  }

  const handlePauseQuiz = async () => {
    setTimerActive(false)
    setQuizState('paused')
    const attempt = attemptRef.current
    if (attempt) {
      const snap = buildSnapshot()
      patchAttempt(attempt.id, snap)
      await updateAttemptProgress(
        attempt.id,
        snap.current_question_index,
        snap.remaining_time_sec,
        answersRef.current,
        flagsRef.current,
        revealedRef.current
      ).catch(() => {})
    }
  }

  const handleResumeQuiz = () => {
    setQuizState('active')
    setTimerActive(true)
  }

  const handleFinishQuiz = async () => {
    const attempt = attemptRef.current
    const quiz = quizRef.current
    if (!attempt || !quiz || submittingRef.current) return
    submittingRef.current = true
    setTimerActive(false)

    try {
      const usedSec = quiz.duration_min * 60 - remainingRef.current
      const timeUsedMin = Math.max(1, Math.round(usedSec / 60))

      const result = await submitAndCloseQuiz(
        attempt.id,
        quiz.id,
        userId,
        answersRef.current,
        flagsRef.current,
        timeUsedMin,
        revealedRef.current
      )

      setReportData(result)
      setReportTab('summary')
      setShowTranslation(false)
      upsertAttempt(result.attempt)
      setQuizState('report')
    } finally {
      submittingRef.current = false
    }
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

  // grouped_choice: every list accepts one or more picks.
  const toggleGrouped = (quesId: number, groupId: string, optionId: string) => {
    if (revealed[quesId]) return
    setAnswers((prev) => {
      const map: Record<string, string[]> = { ...(prev[quesId] ?? {}) }
      const current = Array.isArray(map[groupId]) ? map[groupId] : []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]

      if (next.length) map[groupId] = next
      else delete map[groupId]
      return { ...prev, [quesId]: map }
    })
  }

  // Single-placement DnD: linking a source item to a NEW target replaces any
  // previous placement (it "moves"). Linking it to the target it is already
  // under unlinks it, sending it back to the source column.
  const toggleDndLink = (quesId: number, list1Id: string, list2Id: string) => {
    if (revealed[quesId]) return
    setAnswers((prev) => {
      const map: Record<string, string[]> = { ...(prev[quesId] ?? {}) }
      const alreadyHere = (map[list1Id] ?? []).includes(list2Id)

      if (alreadyHere) {
        const nextMap = { ...map }
        delete nextMap[list1Id]
        return { ...prev, [quesId]: nextMap }
      }

      return { ...prev, [quesId]: { ...map, [list1Id]: [list2Id] } }
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
            Object.entries(dnd.correct_map).map(([leftId, rightIds]) => [leftId, [...rightIds]])
          )
          setAnswers((current) => ({ ...current, [quesId]: solution }))
        } else if (q.type === 'grouped') {
          const solution: Record<string, string[]> = {}
          for (const group of q.options as GroupedGroup[]) {
            const ids = group.options.filter((o) => o.is_correct).map((o) => o.id)
            if (ids.length) solution[group.id] = ids
          }
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

  const quizTitle = currentQuiz ? pick(currentQuiz.title, locale) : ''
  const headerTitle = currentQuiz ? quizTitle : t(locale, 'اختر اختباراً', 'Choose a quiz')

  const resumeInfo = openAttempt
    ? {
        answered: countAnswered(openAttempt.answer_state),
        remaining: openAttempt.remaining_time_sec ?? (currentQuiz?.duration_min ?? 0) * 60,
        index: (openAttempt.current_question_index ?? 0) + 1,
      }
    : null

  return (
    <div className={`flex h-screen overflow-hidden ${ui.page}`} dir={dirOf(locale)}>
      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-slate-900/30 md:hidden dark:bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 inset-s-0 z-40 flex w-72 max-w-[85vw] flex-col overflow-hidden border-e border-slate-200 bg-white shadow-2xl md:static md:z-20 md:w-80 md:max-w-none md:shadow-none lg:w-96 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className={`text-sm font-semibold ${ui.text}`}>
                {t(locale, 'محتوى الاختبارات', 'Quiz contents')}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {sections.map((section) => {
                const isExpanded = !!expandedSections[section.id]
                const totalMin = section.quizzes.reduce((sum, q) => sum + q.duration_min, 0)
                const sectionTitle = locale === 'ar'
                  ? section.title_ar || section.title_en
                  : section.title_en || section.title_ar

                return (
                  <div key={section.id} className={`overflow-hidden rounded-xl border ${ui.card}`}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`flex w-full items-center justify-between gap-2 p-3.5 text-start text-xs transition-colors hover:bg-slate-50 md:text-sm dark:hover:bg-slate-800/60 ${ui.body}`}
                    >
                      <span className="truncate pe-2 font-medium">{sectionTitle}</span>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {totalMin} {t(locale, 'د', 'min')}
                        </span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-slate-100 bg-slate-50/40 dark:divide-slate-800 dark:bg-slate-950/30">
                        {section.quizzes.map((quiz) => {
                          const isSelected = currentQuiz?.id === quiz.id
                          const status = quizStatus(quiz.id)
                          return (
                            <button
                              key={quiz.id}
                              onClick={() => handleSelectQuiz(quiz)}
                              className={`flex w-full items-center justify-between gap-2 p-3.5 text-start text-xs transition-colors md:text-sm ${
                                isSelected
                                  ? 'border-s-4 border-violet-500 bg-violet-50 font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300'
                                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDotClass(status)}`} />
                                <span className="truncate">{pick(quiz.title, locale)}</span>
                              </span>
                              <span className="flex shrink-0 items-center gap-2">
                                {status === 'inprogress' && (
                                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${ui.chipSky}`}>
                                    {t(locale, 'استئناف', 'Resume')}
                                  </span>
                                )}
                                <span className={`font-mono text-[11px] ${ui.faint}`}>
                                  {quiz.duration_min}{t(locale, 'د', 'm')}
                                </span>
                              </span>
                            </button>
                          )
                        })}
                        {section.quizzes.length === 0 && (
                          <p className={`p-3.5 text-[11px] ${ui.faint}`}>
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
        </>
      )}

      {/* Main area */}
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        {/* App bar */}
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md md:h-16 md:flex-nowrap md:px-6 md:py-0 dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={ui.ghostBtn}
            >
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5 rtl:rotate-180" /> : <PanelLeftOpen className="h-5 w-5 rtl:rotate-180" />}
            </Button>
            <div className="min-w-0">
              <h1 className={`max-w-[50vw] truncate text-sm font-semibold md:max-w-md md:text-base ${ui.title}`}>
                {headerTitle}
              </h1>
              {currentQuiz && (
                <span className={`text-xs ${ui.faint}`}>
                  {t(locale, 'المدة', 'Duration')}: {currentQuiz.duration_min}{t(locale, ' د', 'm')} ·{' '}
                  {t(locale, 'نسبة النجاح', 'Passing score')}: {currentQuiz.passing_score}%
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {quizState === 'active' && (
              <>
                <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm text-violet-600 dark:bg-slate-800 dark:text-violet-300">
                  <Clock className="h-4 w-4" />
                  <span dir="ltr">{mmss(remainingSec)}</span>
                </div>
                <Button size="sm" variant="outline" onClick={handlePauseQuiz} className={ui.outlineBtn}>
                  <Pause className="me-1 h-4 w-4" /> {t(locale, 'إيقاف مؤقت', 'Pause')}
                </Button>
                <Button
                  size="sm"
                  onClick={handleFinishQuiz}
                  className="bg-red-600 font-medium text-white shadow-sm transition-colors hover:bg-red-700"
                >
                  {t(locale, 'إنهاء الاختبار', 'End quiz')}
                </Button>
              </>
            )}

            {/* Back to dashboard */}
            <a
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="hidden sm:inline">{t(locale, 'الرئيسية', 'Dashboard')}</span>
            </a>
          </div>
        </header>

        {quizState === 'active' && (
          <div className="px-4 pt-3 md:px-6">
            <Progress value={progressPct} className="h-1.5 bg-slate-200 dark:bg-slate-800" />
          </div>
        )}

        <main className="flex flex-1 flex-col items-center space-y-10 overflow-y-auto px-3 pt-6 md:px-10 md:pt-8">
          <div className="w-full max-w-4xl space-y-6">
            {quizState === 'empty' && (
              <div className={`w-full rounded-2xl border p-10 text-center ${ui.card} ${ui.faint}`}>
                {t(locale, 'اختر اختباراً من القائمة الجانبية للبدء', 'Choose a quiz from the sidebar to begin')}
              </div>
            )}

            {loadingQuiz && (
              <div className={`w-full rounded-2xl border p-10 text-center ${ui.card} ${ui.faint}`}>
                {t(locale, 'جارِ التحميل...', 'Loading...')}
              </div>
            )}

            {!loadingQuiz && quizState === 'intro' && currentQuiz && (
              <div className={`w-full space-y-6 rounded-2xl border p-6 shadow-sm md:p-8 ${ui.card}`}>
                <div className="space-y-2">
                  <span className={`text-xs font-semibold uppercase tracking-widest ${ui.accent}`}>
                    {openAttempt
                      ? t(locale, 'اختبار قيد التنفيذ', 'Quiz in progress')
                      : t(locale, 'جاهز للاختبار', 'Ready to start')}
                  </span>
                  <h2 className={`wrap-break-word text-xl font-bold md:text-2xl ${ui.title}`}>
                    {quizTitle}
                  </h2>
                </div>

                {openAttempt && resumeInfo && (
                  <div className={`space-y-1 rounded-xl border p-4 ${ui.chipSky}`}>
                    <p className="text-sm font-semibold">
                      {t(locale, 'لديك محاولة متوقفة مؤقتاً لهذا الاختبار', 'You have a paused attempt for this quiz')}
                    </p>
                    <p className="text-xs opacity-90">
                      {t(locale, 'تمت الإجابة على', 'Answered')}{' '}
                      <span dir="ltr">{resumeInfo.answered} / {questions.length}</span> ·{' '}
                      {t(locale, 'الوقت المتبقي', 'Time left')}:{' '}
                      <span dir="ltr">{mmss(resumeInfo.remaining)}</span> ·{' '}
                      {t(locale, 'السؤال', 'Question')} {resumeInfo.index}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 text-center">
                  <Stat label={t(locale, 'الأسئلة', 'Questions')} value={String(questions.length)} />
                  <Stat label={t(locale, 'المدة', 'Duration')} value={`${currentQuiz.duration_min}${t(locale, ' د', 'm')}`} />
                  <Stat label={t(locale, 'نسبة النجاح', 'Passing')} value={`${currentQuiz.passing_score}%`} />
                </div>

                {currentQuiz.instructions && pick(currentQuiz.instructions, locale) && (
                  <div className={`space-y-2 text-sm ${ui.body}`}>
                    <h4 className={`font-semibold ${ui.text}`}>{t(locale, 'التعليمات', 'Instructions')}</h4>
                    <p className={`whitespace-pre-line wrap-break-word rounded-xl border p-4 ${ui.soft} ${ui.muted}`}>
                      {pick(currentQuiz.instructions, locale)}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleStartQuiz}
                  disabled={starting}
                  className={`w-full rounded-xl py-3 text-base font-medium ${ui.primaryBtn}`}
                >
                  {openAttempt ? (
                    <>
                      <Play className="me-2 h-4 w-4 rtl:rotate-180" />
                      {t(locale, 'استئناف الاختبار', 'Resume quiz')}
                    </>
                  ) : (
                    t(locale, 'بدء الاختبار الآن', 'Start quiz')
                  )}
                </Button>
              </div>
            )}

            {quizState === 'paused' && currentQuiz && (
              <div className={`w-full space-y-6 rounded-2xl border p-8 text-center ${ui.card}`}>
                <h3 className={`text-xl font-bold ${ui.title}`}>
                  {t(locale, 'تم إيقاف الاختبار مؤقتاً', 'Quiz paused')}
                </h3>
                <p className={`text-sm ${ui.muted}`}>
                  {t(locale, 'يمكنك الاستئناف في أي وقت.', 'You can resume anytime.')}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={handleBackToIntro} variant="outline" className={ui.outlineBtn}>
                    {t(locale, 'الرئيسية', 'Home')}
                  </Button>
                  <Button onClick={handleResumeQuiz} className={ui.primaryBtn}>
                    {t(locale, 'استئناف', 'Resume')}
                  </Button>
                </div>
              </div>
            )}

            {quizState === 'active' && currentQ && (
              <QuestionCard
                key={currentQ.ques_id}
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
                onToggleGrouped={(groupId, optId) => toggleGrouped(currentQ.ques_id, groupId, optId)}
                onSetActiveDndItem={setActiveDndItem}
                onToggleDndLink={(l1, l2) => toggleDndLink(currentQ.ques_id, l1, l2)}
              />
            )}

            {quizState === 'active' && currentQ && revealed[currentQ.ques_id] && (
              <ExplanationPanel
                variant="live"
                locale={locale}
                showTranslation={showTranslation}
                items={collectExplanations(currentQ.question, locale, answers[currentQ.ques_id], false)}
              />
            )}

            {quizState === 'active' && currentQ && (
              <div className="flex justify-between pt-2">
                <Button disabled={currentIndex === 0} onClick={goPrev} variant="outline" className={ui.outlineBtn}>
                  <ChevronLeft className="me-1 h-4 w-4 rtl:rotate-180" />
                  {t(locale, 'السابق', 'Previous')}
                </Button>
                {currentIndex < questions.length - 1 ? (
                  <Button onClick={goNext} className={ui.primaryBtn}>
                    {t(locale, 'التالي', 'Next')}
                    <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" />
                  </Button>
                ) : (
                  <Button onClick={handleFinishQuiz} className="bg-emerald-600 text-white hover:bg-emerald-500">
                    {t(locale, 'إنهاء الاختبار', 'End quiz')}
                  </Button>
                )}
              </div>
            )}

            {quizState === 'report' && reportData && currentQuiz && (
              <ReportView
                locale={locale}
                data={reportData}
                quizTitle={quizTitle}
                tab={reportTab}
                onTabChange={setReportTab}
                onBack={handleBackToIntro}
              />
            )}
          </div>

          {/* History */}
          {currentQuiz && quizState !== 'active' && (
            <div className={`w-full max-w-4xl space-y-4 border-t pb-12 pt-8 ${ui.line}`}>
              <h3 className={`text-base font-semibold ${ui.text}`}>
                {t(locale, 'سجل المحاولات السابقة', 'Attempt history')}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {attempts
                  .filter((a) => a.is_closed)
                  .map((attempt) => (
                    <div
                      key={attempt.id}
                      className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                        attempt.is_passed ? ui.chipEmerald : ui.chipRose
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-sm font-bold">
                          {attempt.is_passed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')} ({attempt.score}%)
                        </span>
                        <span className={`block font-mono text-xs ${ui.muted}`}>
                          {t(locale, 'الوقت المستغرق', 'Time used')}: {attempt.time_used_min}
                          {t(locale, ' د', 'm')} · {new Date(attempt.created_at).toLocaleDateString(locale)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className={ui.outlineBtn}
                        onClick={() => handleViewPastReport(attempt.id)}
                      >
                        {t(locale, 'عرض التقرير', 'View report')}
                      </Button>
                    </div>
                  ))}
                {attempts.filter((a) => a.is_closed).length === 0 && (
                  <p className={`col-span-full text-xs ${ui.faint}`}>
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
    <div className={`rounded-xl border py-3 ${ui.soft}`}>
      <div className={`text-lg font-bold ${ui.title}`}>{value}</div>
      <div className={`text-[11px] ${ui.muted}`}>{label}</div>
    </div>
  )
}

/** The text in the OPPOSITE language, shown only when "show translation" is on. */
function AltText({
  text,
  locale,
  show,
  className = '',
}: {
  text: LocalizedText | null | undefined
  locale: Locale
  show: boolean
  className?: string
}) {
  if (!show) return null
  const alt = altOf(text, locale)
  if (!alt) return null
  return (
    <span
      dir={dirOf(otherLocale(locale))}
      className={`mt-1 block whitespace-pre-line break-words text-xs ${ui.muted} ${className}`}
    >
      {alt}
    </span>
  )
}

function QuestionImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (failed) return null

  return (
    <>
      {/* The image keeps a white backdrop in dark mode too: diagrams are usually drawn for white. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="mx-auto max-h-80 w-auto max-w-full object-contain"
        />
        <span className="absolute end-2 top-2 rounded-md bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute end-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full rounded-lg bg-white object-contain p-2"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

/** Image (if the question has one) → question text, in the app language. Translation underneath on demand. */
function QuestionPrompt({
  question,
  locale,
  showTranslation,
}: {
  question: QuestionBankRow
  locale: Locale
  showTranslation: boolean
}) {
  const img = pickImage(question.image_url, locale)
  const alt = altImage(question.image_url, locale)
  const altText = altOf(question.question, locale)
  const text = pick(question.question, locale)

  return (
    <div className="space-y-4">
      {img && <QuestionImage key={img} src={img} alt={text} />}

      <h3 className={`whitespace-pre-line break-words text-lg font-semibold leading-8 ${ui.title}`}>
        {text}
      </h3>

      {showTranslation && (altText || alt) && (
        <div
          dir={dirOf(otherLocale(locale))}
          className="space-y-3 border-s-2 border-cyan-300 ps-3 dark:border-cyan-500/50"
        >
          {alt && <QuestionImage key={alt} src={alt} alt={altText} />}
          {altText && (
            <p className={`whitespace-pre-line break-words text-sm leading-7 ${ui.muted}`}>{altText}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------- Explanations ----------------
interface ExplanationItem {
  key: string
  tone: 'correct' | 'wrong' | 'neutral'
  label?: string
  text: LocalizedText
}

const hasText = (v?: LocalizedText | null): v is LocalizedText => !!v && !!(v.ar || v.en)

function selectedIdsOf(q: QuestionBankRow, answer: any): string[] {
  if (q.type === 'multiple') return Array.isArray(answer) ? answer : []
  return typeof answer === 'string' && answer ? [answer] : []
}

/**
 * What to explain under a question:
 *  - choice questions: the correct option(s)' explanation (+ the wrong picks' own explanation in review)
 *  - dnd: the general explanation
 *  - grouped: the feedback of every list
 */
function collectExplanations(
  q: QuestionBankRow,
  locale: Locale,
  answer: any,
  includeWrongSelected: boolean
): ExplanationItem[] {
  if (q.type === 'dnd') {
    const dnd = q.options as DndOptions
    return hasText(dnd.explanation) ? [{ key: 'dnd', tone: 'neutral', text: dnd.explanation }] : []
  }

  if (q.type === 'grouped') {
    return (q.options as GroupedGroup[])
      .map((g, i) => ({ g, i }))
      .filter(({ g }) => hasText(g.feedback))
      .map(({ g, i }) => ({
        key: g.id,
        tone: 'neutral' as const,
        label: `${i + 1}. ${pick(g.title, locale)}`,
        text: g.feedback,
      }))
  }

  const opts = q.options as QuestionOption[]
  const selected = selectedIdsOf(q, answer)

  const items: ExplanationItem[] = opts
    .filter((o) => o.is_correct && hasText(o.explanation))
    .map((o) => ({ key: o.id, tone: 'correct' as const, text: o.explanation }))

  if (includeWrongSelected) {
    opts
      .filter((o) => selected.includes(o.id) && !o.is_correct && hasText(o.explanation))
      .forEach((o) => items.push({ key: `w_${o.id}`, tone: 'wrong', text: o.explanation }))
  }

  return items
}

/** Explanations live below the whole answer area — never inline under an option, since they can run long. */
function ExplanationPanel({
  variant,
  locale,
  showTranslation,
  items,
}: {
  variant: 'live' | 'review'
  locale: Locale
  showTranslation: boolean
  items: ExplanationItem[]
}) {
  if (items.length === 0) return null

  const live = variant === 'live'
  const containerCls = live
    ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10'
    : ui.soft

  return (
    <div className={`w-full rounded-2xl border p-5 ${containerCls}`}>
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-wide ${
          live ? 'text-emerald-700 dark:text-emerald-300' : ui.muted
        }`}
      >
        {live
          ? t(locale, 'توضيح الإجابة الصحيحة', 'Correct answer explanation')
          : t(locale, 'التوضيح', 'Explanation')}
      </p>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="text-sm leading-6">
            {item.label && (
              <p className={`mb-0.5 break-words text-xs font-semibold ${ui.body}`}>{item.label}</p>
            )}
            <p className={`whitespace-pre-line break-words ${ui.text}`}>
              {!live && item.tone === 'correct' && (
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {t(locale, 'سبب الصحة: ', 'Why correct: ')}
                </span>
              )}
              {!live && item.tone === 'wrong' && (
                <span className="font-semibold text-rose-700 dark:text-rose-300">
                  {t(locale, 'سبب الخطأ: ', 'Why wrong: ')}
                </span>
              )}
              {pick(item.text, locale)}
            </p>
            <AltText text={item.text} locale={locale} show={showTranslation} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------- Question card (live quiz) ----------------
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
  onToggleGrouped: (groupId: string, optionId: string) => void
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
  onToggleGrouped,
  onSetActiveDndItem,
  onToggleDndLink,
}: QuestionCardProps) {
  const q = row.question

  return (
    <div className="w-full space-y-6">
      <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${ui.card}`}>
        <span className={`rounded-full border px-3 py-1 font-mono text-xs ${ui.chipViolet}`}>
          {t(locale, 'السؤال', 'Question')} {index + 1} / {total}
        </span>
        <div className="flex items-center gap-1">
          <TranslationButton locale={locale} active={showTranslation} onClick={onToggleTranslation} />
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleFlag}
            className={flagged ? 'text-amber-600 dark:text-amber-400' : ui.ghostBtn}
          >
            <Flag className="h-4 w-4" fill={flagged ? 'currentColor' : 'none'} />
          </Button>
          <Button size="sm" variant="ghost" onClick={onToggleReveal} className={ui.ghostBtn}>
            <Eye className="me-1 h-4 w-4" />{' '}
            {revealed ? t(locale, 'إخفاء الإجابة', 'Hide answer') : t(locale, 'عرض الإجابة', 'Show answer')}
          </Button>
        </div>
      </div>

      <div className={`space-y-4 rounded-2xl border p-6 shadow-sm ${ui.card}`}>
        <QuestionPrompt question={q} locale={locale} showTranslation={showTranslation} />

        {(q.type === 'single' || q.type === 'true_false') && (
          <div className="space-y-3 pt-2">
            {(q.options as QuestionOption[]).map((opt) => (
              <OptionRow
                key={opt.id}
                locale={locale}
                option={opt}
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
                locale={locale}
                option={opt}
                showTranslation={showTranslation}
                selected={Array.isArray(answer) && answer.includes(opt.id)}
                revealed={revealed}
                onClick={() => onToggleMultiple(opt.id)}
              />
            ))}
          </div>
        )}

        {q.type === 'grouped' && (
          <GroupedQuestion
            locale={locale}
            groups={q.options as GroupedGroup[]}
            answer={answer ?? {}}
            showTranslation={showTranslation}
            revealed={revealed}
            onToggle={onToggleGrouped}
          />
        )}

        {q.type === 'dnd' && (
          <DndQuestion
            locale={locale}
            options={q.options as DndOptions}
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

function TranslationButton({
  locale,
  active,
  onClick,
}: {
  locale: Locale
  active: boolean
  onClick: () => void
}) {
  return (
    <Button size="sm" variant="ghost" onClick={onClick} className={ui.ghostBtn}>
      <Globe className="me-1 h-4 w-4" />{' '}
      {active ? t(locale, 'إخفاء الترجمة', 'Hide translation') : t(locale, 'عرض الترجمة', 'Show translation')}
    </Button>
  )
}

// ---------------- Single / multiple choice ----------------
function OptionRow({
  locale,
  option,
  showTranslation,
  selected,
  revealed,
  showTags = false,
  onClick,
}: {
  locale: Locale
  option: QuestionOption
  showTranslation: boolean
  selected: boolean
  revealed: boolean
  /** Review mode: label "Your answer" / "Correct answer" under the text. */
  showTags?: boolean
  onClick?: () => void
}) {
  // Only the FRAME is colored — never the whole box — so long option text
  // stays easy to read. The correct-answer checkmark is enlarged.
  let cls = ui.optionBase
  if (!revealed && selected) cls = ui.optionSelected
  if (revealed && option.is_correct) cls = ui.optionCorrect
  if (revealed && selected && !option.is_correct) cls = ui.optionWrong

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={revealed}
      className={`w-full rounded-xl border-2 p-4 text-start text-sm transition-colors ${cls}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="whitespace-pre-line break-words">{pick(option.text, locale)}</p>
          <AltText text={option.text} locale={locale} show={showTranslation} />
          {showTags && (selected || option.is_correct) && (
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold">
              {selected && <span className="text-violet-600 dark:text-violet-400">{t(locale, 'إجابتك', 'Your answer')}</span>}
              {option.is_correct && (
                <span className="text-emerald-600 dark:text-emerald-400">{t(locale, 'الإجابة الصحيحة', 'Correct answer')}</span>
              )}
            </div>
          )}
        </div>
        {revealed && option.is_correct && (
          <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-500" strokeWidth={2.25} />
        )}
        {revealed && selected && !option.is_correct && <XCircle className="h-6 w-6 shrink-0 text-rose-500" />}
      </div>
    </button>
  )
}

// ---------------- grouped_choice ----------------
/**
 * A passage (the question) + several lists. From EACH list the student picks
 * one or more answers. Used both while taking the quiz and in the review
 * (where `revealed` is true and nothing is clickable).
 */
function GroupedQuestion({
  locale,
  groups,
  answer,
  showTranslation,
  revealed,
  showTags = false,
  onToggle,
}: {
  locale: Locale
  groups: GroupedGroup[]
  answer: Record<string, string[]>
  showTranslation: boolean
  revealed: boolean
  showTags?: boolean
  onToggle?: (groupId: string, optionId: string) => void
}) {
  return (
    <div className="space-y-4 pt-2">
      {!revealed && (
        <p className={`text-xs ${ui.muted}`}>
          {t(locale, 'اختر إجابة واحدة أو أكثر من كل قائمة.', 'Choose one or more answers from each list.')}
        </p>
      )}

      {groups.map((group, gi) => {
        const selectedIds = Array.isArray(answer[group.id]) ? answer[group.id] : []
        const correctIds = group.options.filter((o) => o.is_correct).map((o) => o.id)
        const groupCorrect =
          correctIds.length === selectedIds.length && correctIds.every((id) => selectedIds.includes(id))
        const groupSkipped = selectedIds.length === 0

        return (
          <section key={group.id} className={`rounded-xl border p-4 ${ui.soft}`}>
            <div className="mb-3 flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                {gi + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`whitespace-pre-line break-words text-sm font-semibold leading-6 ${ui.title}`}>
                  {pick(group.title, locale)}
                </p>
                <AltText text={group.title} locale={locale} show={showTranslation} />
              </div>
              {revealed && (
                <span
                  className={`shrink-0 rounded-lg border px-2 py-0.5 text-[11px] font-medium ${
                    groupCorrect ? ui.chipEmerald : groupSkipped ? ui.chipSlate : ui.chipRose
                  }`}
                >
                  {groupCorrect
                    ? t(locale, 'صحيح', 'Correct')
                    : groupSkipped
                      ? t(locale, 'متروك', 'Skipped')
                      : t(locale, 'خاطئ', 'Wrong')}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {group.options.map((opt) => (
                <GroupOptionRow
                  key={opt.id}
                  locale={locale}
                  option={opt}
                  showTranslation={showTranslation}
                  selected={selectedIds.includes(opt.id)}
                  revealed={revealed}
                  showTags={showTags}
                  onClick={() => onToggle?.(group.id, opt.id)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function GroupOptionRow({
  locale,
  option,
  showTranslation,
  selected,
  revealed,
  showTags,
  onClick,
}: {
  locale: Locale
  option: GroupedGroup['options'][number]
  showTranslation: boolean
  selected: boolean
  revealed: boolean
  showTags: boolean
  onClick: () => void
}) {
  let frame = ui.optionBase
  if (!revealed && selected) frame = ui.optionSelected
  if (revealed && option.is_correct) frame = ui.optionCorrect
  if (revealed && selected && !option.is_correct) frame = ui.optionWrong

  let box = 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'
  if (selected) {
    box = 'border-violet-600 bg-violet-600 text-white'
    if (revealed) {
      box = option.is_correct
        ? 'border-emerald-500 bg-emerald-500 text-white'
        : 'border-rose-500 bg-rose-500 text-white'
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      disabled={revealed}
      className={`flex w-full items-start gap-3 rounded-lg border-2 p-3 text-start text-sm transition-colors ${frame}`}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${box}`}>
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block whitespace-pre-line break-words">{pick(option.text, locale)}</span>
        <AltText text={option.text} locale={locale} show={showTranslation} />
        {showTags && (selected || option.is_correct) && (
          <span className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold">
            {selected && <span className="text-violet-600 dark:text-violet-400">{t(locale, 'إجابتك', 'Your answer')}</span>}
            {option.is_correct && (
              <span className="text-emerald-600 dark:text-emerald-400">{t(locale, 'الإجابة الصحيحة', 'Correct answer')}</span>
            )}
          </span>
        )}
      </span>

      {revealed && option.is_correct && (
        <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" strokeWidth={2.25} />
      )}
      {revealed && selected && !option.is_correct && <XCircle className="h-6 w-6 shrink-0 text-rose-500" />}
    </button>
  )
}

// ---------------- Drag & drop (live) ----------------
function DndQuestion({
  locale,
  options,
  showTranslation,
  answer,
  revealed,
  activeItem,
  onSetActive,
  onToggleLink,
}: {
  locale: Locale
  options: DndOptions
  showTranslation: boolean
  answer: Record<string, string[]>
  revealed: boolean
  activeItem: string | null
  onSetActive: (id: string | null) => void
  onToggleLink: (list1Id: string, list2Id: string) => void
}) {
  const [draggingItem, setDraggingItem] = useState<string | null>(null)

  const placedTarget = (leftId: string) => answer[leftId]?.[0] ?? null
  const unplaced = options.list1.filter((item) => !placedTarget(item.id))

  const isCorrectPlacement = (leftId: string) => {
    const expected = (options.correct_map[leftId] ?? []).slice().sort()
    const given = (answer[leftId] ?? []).slice().sort()
    return expected.length > 0 && JSON.stringify(expected) === JSON.stringify(given)
  }

  const sourceChipClass = (id: string) => {
    if (activeItem === id) return ui.optionSelected
    return 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500/60'
  }

  const nestedChipClass = (id: string) => {
    if (revealed) return isCorrectPlacement(id) ? ui.optionCorrect : ui.optionWrong
    return 'border-slate-300 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200'
  }

  return (
    <div className="space-y-4">
      <div className={`rounded-xl border p-3 text-xs ${ui.chipViolet}`}>
        <div className="flex items-center gap-2 font-medium">
          <GripVertical className="h-4 w-4" />
          {t(
            locale,
            'اسحب عنصراً وأسقطه على العنصر المطابق له. اضغط عليه مرة أخرى ليعود لمكانه.',
            'Drag an item and drop it on its match. Click it again to send it back.'
          )}
        </div>
        <p className={`mt-1 ${ui.muted}`}>
          {t(
            locale,
            'يمكنك أيضاً الضغط على عنصر ثم الضغط على المطابقة كطريقة بديلة.',
            'You can also tap an item, then tap its match as an alternative to dragging.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Source column — this renders FIRST in the DOM, so with the page's
            dir attribute it naturally sits on the right in Arabic and on the
            left in English. */}
        <div className="space-y-2">
          <p className={`px-1 text-xs font-semibold ${ui.muted}`}>{t(locale, 'العناصر', 'Items')}</p>
          <div className="min-h-[3rem] space-y-2 rounded-xl border border-dashed border-slate-200 p-2 dark:border-slate-700">
            {unplaced.map((item) => {
              const isDragging = draggingItem === item.id
              return (
                <div
                  key={item.id}
                  draggable={!revealed}
                  onDragStart={() => {
                    setDraggingItem(item.id)
                    onSetActive(item.id)
                  }}
                  onDragEnd={() => setDraggingItem(null)}
                  onClick={() => !revealed && onSetActive(activeItem === item.id ? null : item.id)}
                  className={`flex cursor-grab items-center gap-3 rounded-lg border-2 p-3 text-sm transition-all active:cursor-grabbing ${sourceChipClass(item.id)} ${
                    isDragging ? 'opacity-50' : ''
                  }`}
                >
                  <GripVertical className={`h-4 w-4 shrink-0 ${ui.faint}`} />
                  <div className="min-w-0 flex-1">
                    <div className="break-words">{pick(item.text, locale)}</div>
                    <AltText text={item.text} locale={locale} show={showTranslation} className="text-[11px]" />
                  </div>
                </div>
              )
            })}
            {unplaced.length === 0 && (
              <p className={`p-2 text-center text-xs ${ui.faint}`}>
                {t(locale, 'تم وضع جميع العناصر', 'All items placed')}
              </p>
            )}
          </div>
        </div>

        {/* Target column */}
        <div className="space-y-2">
          <p className={`px-1 text-xs font-semibold ${ui.muted}`}>{t(locale, 'المطابقات', 'Matches')}</p>

          {options.list2.map((target) => {
            const children = options.list1.filter((li) => placedTarget(li.id) === target.id)
            return (
              <div
                key={target.id}
                onDragOver={(e) => {
                  if (!revealed && draggingItem) e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  if (draggingItem) {
                    onToggleLink(draggingItem, target.id)
                    setDraggingItem(null)
                  }
                }}
                onClick={() => {
                  if (!revealed && activeItem) {
                    onToggleLink(activeItem, target.id)
                    onSetActive(null)
                  }
                }}
                className={`rounded-xl border p-3 ${ui.soft}`}
              >
                <div className={`flex items-center gap-2 text-sm font-medium ${ui.text}`}>
                  <Link2 className="h-4 w-4 shrink-0 text-cyan-500" />
                  <div className="min-w-0">
                    <div className="break-words">{pick(target.text, locale)}</div>
                    <AltText text={target.text} locale={locale} show={showTranslation} className="text-[11px]" />
                  </div>
                </div>

                <div className="ms-6 mt-2 space-y-1.5">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      disabled={revealed}
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleLink(child.id, target.id)
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg border-2 px-2.5 py-1.5 text-start text-xs transition-colors ${nestedChipClass(child.id)}`}
                    >
                      <span className="min-w-0 break-words">{pick(child.text, locale)}</span>
                      {!revealed && <X className={`h-3.5 w-3.5 shrink-0 ${ui.faint}`} />}
                      {revealed &&
                        (isCorrectPlacement(child.id) ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                        ) : (
                          <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
                        ))}
                    </button>
                  ))}
                  {children.length === 0 && (
                    <p className="text-[11px] text-slate-300 dark:text-slate-600">{t(locale, 'أفلت هنا', 'Drop here')}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// =========================================================
// Report / review
// =========================================================

type StatusFilter = 'all' | 'correct' | 'wrong' | 'flagged' | 'skipped'

const outcomeOf = (r: GradeResult): 'correct' | 'wrong' | 'skipped' =>
  r.is_correct ? 'correct' : r.is_answered ? 'wrong' : 'skipped'

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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [search, setSearch] = useState('')
  const [showTranslation, setShowTranslation] = useState(false)

  const resultMap = useMemo(
    () => new Map(data.results.map((result) => [result.question_id, result])),
    [data.results]
  )

  // Question number inside the quiz (1-based), independent of any filter.
  const numberOf = useMemo(
    () => new Map(data.questions.map((row, i) => [row.ques_id, i + 1])),
    [data.questions]
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

      // search in both languages
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
        return t(locale, 'محدد', 'Flagged')
      default:
        return t(locale, 'متروك', 'Skipped')
    }
  }

  const statusClass = (status: string) => {
    switch (status) {
      case 'correct':
        return ui.chipEmerald
      case 'wrong':
        return ui.chipRose
      case 'flagged':
        return ui.chipAmber
      default:
        return ui.chipSlate
    }
  }

  const tabTrigger =
    'text-slate-500 dark:text-slate-400 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 dark:data-[state=active]:bg-violet-500/20 dark:data-[state=active]:text-violet-300'

  return (
    <div className={`w-full space-y-6 rounded-3xl border p-4 shadow-sm sm:p-6 md:p-8 ${ui.card}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className={`mb-1 text-xs font-semibold uppercase tracking-[0.2em] ${ui.accent}`}>
            {t(locale, 'مراجعة المحاولة', 'Attempt review')}
          </p>
          <h2 className={`text-xl font-bold ${ui.title}`}>{t(locale, 'تقرير الاختبار', 'Quiz report')}</h2>
          <p className={`mt-1 wrap-break-word text-sm ${ui.muted}`}>{quizTitle}</p>
        </div>

        <Button size="sm" variant="outline" onClick={onBack} className={`w-fit ${ui.outlineBtn}`}>
          {t(locale, 'رجوع', 'Back')}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 *:flex *:flex-col *:items-center *:justify-center *:text-center">
        <Stat label={t(locale, 'إجمالي الأسئلة', 'Total')} value={String(data.total)} />
        <Stat label={t(locale, 'صحيح', 'Correct')} value={String(data.correctCount)} />
        <Stat label={t(locale, 'خاطئ', 'Wrong')} value={String(wrong)} />
        <Stat label={t(locale, 'متروك', 'Skipped')} value={String(skipped)} />
        <Stat label={t(locale, 'عليه علامة', 'Flagged')} value={String(flagged)} />
      </div>

      <div
        className={`rounded-2xl border py-4 text-center font-bold ${
          data.isPassed ? ui.chipEmerald : ui.chipRose
        }`}
      >
        <span className="text-2xl">{data.score}%</span>
        <span className={`mx-2 ${ui.faint}`}>—</span>
        {data.isPassed ? t(locale, 'ناجح', 'Passed') : t(locale, 'راسب', 'Failed')}
      </div>

      <Tabs value={tab} onValueChange={(v) => onTabChange(v as 'summary' | 'detailed')}>
        <TabsList className="w-full justify-start border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
          <TabsTrigger value="summary" className={tabTrigger}>
            {t(locale, 'ملخص', 'Summary')}
          </TabsTrigger>
          <TabsTrigger value="detailed" className={tabTrigger}>
            {t(locale, 'مراجعة تفصيلية', 'Detailed review')}
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className={`absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 ${ui.faint}`} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(locale, 'ابحث داخل الأسئلة...', 'Search questions...')}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pe-3 ps-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-violet-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <ListFilter className={`h-4 w-4 shrink-0 ${ui.faint}`} />
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
                    ? ui.chipViolet
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <TabsContent value="summary" className="pt-4">
          {/* Desktop / tablet: table */}
          <div className={`hidden overflow-hidden rounded-2xl border sm:block ${ui.line}`}>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="p-3 text-start">#</th>
                  <th className="p-3 text-start">{t(locale, 'السؤال', 'Question')}</th>
                  <th className="p-3 text-start">{t(locale, 'الحالة', 'Status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredQuestions.map((row) => {
                  const result = resultMap.get(row.ques_id)!

                  return (
                    <tr key={row.id} className={`align-top ${ui.text}`}>
                      <td className={`p-3 ${ui.faint}`}>{numberOf.get(row.ques_id)}</td>
                      <td className="p-3">
                        <div className="max-w-2xl whitespace-pre-line break-words">
                          {pick(row.question.question, locale)}
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
              <p className={`p-8 text-center text-sm ${ui.faint}`}>
                {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
              </p>
            )}
          </div>

          {/* Mobile: stacked cards instead of a squeezed table */}
          <div className="space-y-2.5 sm:hidden">
            {filteredQuestions.map((row) => {
              const result = resultMap.get(row.ques_id)!

              return (
                <div key={row.id} className={`rounded-xl border p-3.5 ${ui.card}`}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className={`font-mono text-xs ${ui.faint}`}>#{numberOf.get(row.ques_id)}</span>
                    <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs ${statusClass(result.status)}`}>
                      {statusLabel(result.status)}
                    </span>
                  </div>
                  <p className={`whitespace-pre-line break-words text-sm ${ui.text}`}>
                    {pick(row.question.question, locale)}
                  </p>
                </div>
              )
            })}
            {filteredQuestions.length === 0 && (
              <p className={`rounded-xl border p-8 text-center text-sm ${ui.card} ${ui.faint}`}>
                {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="pt-4">
          {/* key: jump back to the first question whenever the filter/search changes */}
          <DetailedReview
            key={`${statusFilter}|${search}`}
            locale={locale}
            data={data}
            rows={filteredQuestions}
            resultMap={resultMap}
            numberOf={numberOf}
            showTranslation={showTranslation}
            onToggleTranslation={() => setShowTranslation((s) => !s)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/**
 * Detailed review: ONE question at a time with Previous / Next — the same way
 * the questions were shown during the quiz — but read-only, with the user's
 * answers (right or wrong) and the correct answers marked, images included.
 */
function DetailedReview({
  locale,
  data,
  rows,
  resultMap,
  numberOf,
  showTranslation,
  onToggleTranslation,
}: {
  locale: Locale
  data: QuizReportData
  rows: QuizQuestionRow[]
  resultMap: Map<number, GradeResult>
  numberOf: Map<number, number>
  showTranslation: boolean
  onToggleTranslation: () => void
}) {
  const [idx, setIdx] = useState(0)

  if (rows.length === 0) {
    return (
      <p className={`rounded-xl border p-8 text-center text-sm ${ui.card} ${ui.faint}`}>
        {t(locale, 'لا توجد أسئلة مطابقة للبحث أو الفلتر.', 'No questions match the current search or filter.')}
      </p>
    )
  }

  const safeIdx = Math.min(idx, rows.length - 1)
  const row = rows[safeIdx]
  const result = resultMap.get(row.ques_id)!
  const userAnswer = data.attempt.answer_state?.[row.ques_id]
  const outcome = outcomeOf(result)
  const q = row.question

  const outcomeChip =
    outcome === 'correct' ? ui.chipEmerald : outcome === 'wrong' ? ui.chipRose : ui.chipSlate
  const outcomeLabel =
    outcome === 'correct'
      ? t(locale, 'صحيح', 'Correct')
      : outcome === 'wrong'
        ? t(locale, 'خاطئ', 'Wrong')
        : t(locale, 'متروك', 'Skipped')

  return (
    <div className="space-y-5">
      {/* Question navigator */}
      <div className="flex flex-wrap gap-1.5">
        {rows.map((r, i) => {
          const res = resultMap.get(r.ques_id)!
          const o = outcomeOf(res)
          const tone =
            o === 'correct'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300'
              : o === 'wrong'
                ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300'
                : 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`${t(locale, 'السؤال', 'Question')} ${numberOf.get(r.ques_id)}`}
              className={`relative flex h-8 min-w-8 items-center justify-center rounded-lg border px-1.5 font-mono text-xs transition ${tone} ${
                i === safeIdx ? 'ring-2 ring-violet-500 ring-offset-1 ring-offset-white dark:ring-offset-slate-900' : ''
              }`}
            >
              {numberOf.get(r.ques_id)}
              {res.is_flagged && (
                <Flag className="absolute -end-1 -top-1 h-3 w-3 text-amber-500" fill="currentColor" />
              )}
            </button>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${ui.card}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 font-mono text-xs ${ui.chipViolet}`}>
            {t(locale, 'السؤال', 'Question')} {numberOf.get(row.ques_id)} / {data.total}
          </span>
          <span className={`rounded-lg border px-2.5 py-1 text-xs ${outcomeChip}`}>{outcomeLabel}</span>
          {result.is_flagged && (
            <span className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs ${ui.chipAmber}`}>
              <Flag className="h-3.5 w-3.5" fill="currentColor" />
              {t(locale, 'عليه فلاج', 'Flagged')}
            </span>
          )}
        </div>
        <TranslationButton locale={locale} active={showTranslation} onClick={onToggleTranslation} />
      </div>

      {/* The question, exactly as it looked during the quiz */}
      <div className={`space-y-4 rounded-2xl border p-6 shadow-sm ${ui.card}`}>
        <QuestionPrompt question={q} locale={locale} showTranslation={showTranslation} />

        {(q.type === 'single' || q.type === 'true_false' || q.type === 'multiple') && (
          <div className="space-y-3 pt-2">
            {(q.options as QuestionOption[]).map((opt) => (
              <OptionRow
                key={opt.id}
                locale={locale}
                option={opt}
                showTranslation={showTranslation}
                selected={selectedIdsOf(q, userAnswer).includes(opt.id)}
                revealed
                showTags
              />
            ))}
            {outcome === 'skipped' && (
              <p className={`rounded-xl border p-3 text-xs ${ui.chipSlate}`}>
                {t(locale, 'لم يتم اختيار إجابة لهذا السؤال.', 'No answer was selected for this question.')}
              </p>
            )}
          </div>
        )}

        {q.type === 'grouped' && (
          <GroupedQuestion
            locale={locale}
            groups={q.options as GroupedGroup[]}
            answer={(userAnswer ?? {}) as Record<string, string[]>}
            showTranslation={showTranslation}
            revealed
            showTags
          />
        )}

        {q.type === 'dnd' && (
          <DndReview
            locale={locale}
            options={q.options as DndOptions}
            userAnswer={(userAnswer ?? {}) as Record<string, string[]>}
            showTranslation={showTranslation}
          />
        )}
      </div>

      <ExplanationPanel
        variant="review"
        locale={locale}
        showTranslation={showTranslation}
        items={collectExplanations(q, locale, userAnswer, true)}
      />

      <div className="flex justify-between pt-2">
        <Button
          disabled={safeIdx === 0}
          onClick={() => setIdx(safeIdx - 1)}
          variant="outline"
          className={ui.outlineBtn}
        >
          <ChevronLeft className="me-1 h-4 w-4 rtl:rotate-180" />
          {t(locale, 'السابق', 'Previous')}
        </Button>
        <span className={`self-center font-mono text-xs ${ui.faint}`}>
          {safeIdx + 1} / {rows.length}
        </span>
        <Button
          disabled={safeIdx === rows.length - 1}
          onClick={() => setIdx(safeIdx + 1)}
          className={ui.primaryBtn}
        >
          {t(locale, 'التالي', 'Next')}
          <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>
    </div>
  )
}

function DndReview({
  locale,
  options,
  userAnswer,
  showTranslation,
}: {
  locale: Locale
  options: DndOptions
  userAnswer: Record<string, string[]>
  showTranslation: boolean
}) {
  const placedTarget = (leftId: string) => userAnswer[leftId]?.[0] ?? null
  const isCorrectPlacement = (leftId: string) => {
    const expected = (options.correct_map[leftId] ?? []).slice().sort()
    const given = (userAnswer[leftId] ?? []).slice().sort()
    return expected.length > 0 && JSON.stringify(expected) === JSON.stringify(given)
  }
  const unplaced = options.list1.filter((item) => !placedTarget(item.id))
  const correctTargetOf = (leftId: string) =>
    options.list2.find((l) => (options.correct_map[leftId] ?? [])[0] === l.id)

  return (
    <div className="space-y-3 pt-2">
      <div className={`rounded-xl border p-3 text-xs ${ui.chipCyan}`}>
        {t(locale, 'هذه هي إجابتك مقارنة بالمطابقة الصحيحة.', 'Your submitted matching compared with the correct matching.')}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className={`px-1 text-xs font-semibold ${ui.muted}`}>{t(locale, 'غير مطابق', 'Not matched')}</p>
          {unplaced.map((item) => {
            const correct = correctTargetOf(item.id)
            return (
              <div key={item.id} className={`rounded-lg border-2 p-3 text-sm ${ui.optionWrong}`}>
                <span className="break-words">{pick(item.text, locale)}</span>
                <AltText text={item.text} locale={locale} show={showTranslation} className="text-[11px]" />
                <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                  {t(locale, 'المطابقة الصحيحة', 'Correct match')}: {correct ? pick(correct.text, locale) : '—'}
                </p>
              </div>
            )
          })}
          {unplaced.length === 0 && (
            <p className={`text-xs ${ui.faint}`}>{t(locale, 'تمت مطابقة كل العناصر.', 'All items were matched.')}</p>
          )}
        </div>

        <div className="space-y-2">
          <p className={`px-1 text-xs font-semibold ${ui.muted}`}>{t(locale, 'المطابقات', 'Matches')}</p>
          {options.list2.map((target) => {
            const children = options.list1.filter((li) => placedTarget(li.id) === target.id)
            return (
              <div key={target.id} className={`rounded-xl border p-3 ${ui.soft}`}>
                <div className={`flex items-center gap-2 text-sm font-medium ${ui.text}`}>
                  <Link2 className="h-4 w-4 shrink-0 text-cyan-500" />
                  <div className="min-w-0">
                    <span className="break-words">{pick(target.text, locale)}</span>
                    <AltText text={target.text} locale={locale} show={showTranslation} className="text-[11px]" />
                  </div>
                </div>
                <div className="ms-6 mt-2 space-y-1.5">
                  {children.map((child) => {
                    const ok = isCorrectPlacement(child.id)
                    const correct = correctTargetOf(child.id)
                    return (
                      <div
                        key={child.id}
                        className={`rounded-lg border-2 px-2.5 py-1.5 text-xs ${ok ? ui.optionCorrect : ui.optionWrong}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="break-words">{pick(child.text, locale)}</span>
                            <AltText text={child.text} locale={locale} show={showTranslation} className="text-[11px]" />
                          </div>
                          {ok ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                          ) : (
                            <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
                          )}
                        </div>
                        {!ok && (
                          <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
                            {t(locale, 'المطابقة الصحيحة', 'Correct match')}: {correct ? pick(correct.text, locale) : '—'}
                          </p>
                        )}
                      </div>
                    )
                  })}
                  {children.length === 0 && (
                    <p className="text-[11px] text-slate-300 dark:text-slate-600">
                      {t(locale, 'لا يوجد شيء هنا', 'Nothing placed here')}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
