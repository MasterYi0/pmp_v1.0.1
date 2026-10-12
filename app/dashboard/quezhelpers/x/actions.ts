
// 'use server'

// import { createClient } from '@/utils/supabase/server'
// import { revalidatePath } from 'next/cache'

// // =========================================================
// // Public (canonical) types — this is the shape the client always sees,
// // regardless of how a given row was actually stored in Postgres.
// // =========================================================

// export type Locale = 'ar' | 'en'

// export interface LocalizedText {
//   ar: string
//   en: string
// }

// export type QuestionType = 'single' | 'multiple' | 'true_false' | 'dnd'

// export interface QuestionOption {
//   id: string
//   text: LocalizedText
//   is_correct: boolean
//   explanation: LocalizedText
// }

// export interface DndItem {
//   id: string
//   text: LocalizedText
// }

// export interface DndOptions {
//   list1: DndItem[]
//   list2: DndItem[]
//   correct_map: Record<string, string[]>
//   explanation?: LocalizedText
// }

// export interface QuestionBankRow {
//   id: number
//   course_slug: string | null
//   section_id: string | null
//   type: QuestionType
//   question: LocalizedText
//   options: QuestionOption[] | DndOptions
// }

// export interface QuizRow {
//   id: number
//   course_slug: string | null
//   section_id: string | null
//   title: LocalizedText
//   duration_min: number
//   passing_score: number
//   instructions: LocalizedText | null
//   order: number
// }

// export interface SectionRow {
//   id: string
//   course_slug: string
//   title_ar: string
//   title_en: string
//   order_index: number
//   is_video: boolean
//   quizzes: QuizRow[]
// }

// export interface QuizQuestionRow {
//   id: number
//   quiz_id: number
//   ques_id: number
//   order: number
//   question: QuestionBankRow
// }

// export interface QuizAttemptRow {
//   id: number
//   user_id: string
//   quiz_id: number
//   score: number | null
//   is_passed: boolean
//   time_used_min: number | null
//   answer_state: Record<string, any>
//   is_closed: boolean
//   created_at: string
//   current_question_index: number
//   remaining_time_sec: number | null
// }

// export type QuestionStatus = 'correct' | 'wrong' | 'flagged' | 'skipped'

// export interface GradeResult {
//   question_id: number
//   is_correct: boolean
//   is_answered: boolean
//   is_flagged: boolean
//   is_revealed: boolean
//   status: QuestionStatus
// }

// export interface QuizReportData {
//   attempt: QuizAttemptRow
//   questions: QuizQuestionRow[]
//   results: GradeResult[]
//   correctCount: number
//   total: number
//   score: number
//   isPassed: boolean
// }

// // =========================================================
// // Normalization layer
// // -----------------------------------------------------------
// // The seed data in `questions_bank` was generated with:
// //   - type values: 'true_false' | 'single_choice' | 'multiple_choice' | 'drag_and_drop'
// //   - option feedback under the key `feedback`, not `explanation`
// //   - drag_and_drop options as a flat array of { left_item, right_match } pairs
// //     (no ids, no many-to-many mapping)
// //
// // Everything downstream (UI + grading) works against the canonical shapes
// // above, so all of that gets normalized once, right after reading from the
// // DB. This is the ONLY place that needs to change if the data shape changes.
// // =========================================================

// const TYPE_MAP: Record<string, QuestionType> = {
//   true_false: 'true_false',
//   single_choice: 'single',
//   single: 'single',
//   multiple_choice: 'multiple',
//   multiple: 'multiple',
//   drag_and_drop: 'dnd',
//   dnd: 'dnd',
// }

// const EMPTY_TEXT: LocalizedText = { ar: '', en: '' }

// function safeText(v: any): LocalizedText {
//   if (!v) return EMPTY_TEXT
//   return { ar: v.ar ?? '', en: v.en ?? '' }
// }

// function normalizeChoiceOptions(raw: any[]): QuestionOption[] {
//   return (raw ?? []).map((opt, i) => ({
//     id: opt.id ?? String(i),
//     text: safeText(opt.text),
//     is_correct: !!opt.is_correct,
//     // seed data stores this under `feedback`; canonical field is `explanation`
//     explanation: safeText(opt.explanation ?? opt.feedback),
//   }))
// }

// /**
//  * Deterministic (non-random, stable across reloads) reordering so a
//  * left-to-right list of pairs doesn't just line up positionally.
//  */
// function stableShuffle<T>(arr: T[]): T[] {
//   const n = arr.length
//   if (n < 2) return arr.slice()
//   const step = Math.max(1, Math.floor(n / 2) + 1)
//   const out: T[] = []
//   let idx = 0
//   const used = new Set<number>()
//   for (let k = 0; k < n; k++) {
//     while (used.has(idx)) idx = (idx + 1) % n
//     out.push(arr[idx])
//     used.add(idx)
//     idx = (idx + step) % n
//   }
//   return out
// }

// function normalizeDndOptions(raw: any): DndOptions {
//   // Already canonical (has list1/list2/correct_map)
//   if (raw && !Array.isArray(raw) && raw.list1 && raw.list2 && raw.correct_map) {
//     return {
//       list1: raw.list1.map((it: any, i: number) => ({ id: it.id ?? `L1_${i}`, text: safeText(it.text) })),
//       list2: raw.list2.map((it: any, i: number) => ({ id: it.id ?? `L2_${i}`, text: safeText(it.text) })),
//       correct_map: raw.correct_map,
//       explanation: raw.explanation ? safeText(raw.explanation) : undefined,
//     }
//   }

//   // Seed-data shape: array of { left_item, right_match } pairs, no ids.
//   const pairs: any[] = Array.isArray(raw) ? raw : []
//   const list1: DndItem[] = pairs.map((p, i) => ({ id: `L1_${i}`, text: safeText(p.left_item) }))
//   const list2Ordered: DndItem[] = pairs.map((p, i) => ({ id: `L2_${i}`, text: safeText(p.right_match) }))
//   const correct_map: Record<string, string[]> = {}
//   pairs.forEach((_, i) => {
//     correct_map[`L1_${i}`] = [`L2_${i}`]
//   })

//   return {
//     list1,
//     list2: stableShuffle(list2Ordered),
//     correct_map,
//   }
// }

// function normalizeQuestion(raw: any): QuestionBankRow {
//   const type = TYPE_MAP[raw.type] ?? 'single'
//   const options =
//     type === 'dnd' ? normalizeDndOptions(raw.options) : normalizeChoiceOptions(raw.options)

//   return {
//     id: raw.id,
//     course_slug: raw.course_slug,
//     section_id: raw.section_id,
//     type,
//     question: safeText(raw.question),
//     options,
//   }
// }

// function normalizeQuizQuestionRow(raw: any): QuizQuestionRow {
//   return {
//     id: raw.id,
//     quiz_id: raw.quiz_id,
//     ques_id: raw.ques_id,
//     order: raw.order,
//     question: normalizeQuestion(raw.question),
//   }
// }

// // =========================================================
// // Reads (used mainly by the server component)
// // =========================================================

// export async function getCourseSectionsWithQuizzes(
//   courseSlug: string
// ): Promise<SectionRow[]> {
//   const supabase = await createClient()

//   const { data: sections, error: sErr } = await supabase
//     .from('course_sections')
//     .select('*')
//     .eq('course_slug', courseSlug)
//     .eq('is_video', false)
//     .order('order_index', { ascending: true })

//   if (sErr) throw sErr
//   if (!sections?.length) return []

//   const { data: quizzes, error: qErr } = await supabase
//     .from('course_quiz')
//     .select('*')
//     .eq('course_slug', courseSlug)
//     .order('order', { ascending: true })

//   if (qErr) throw qErr

//   return sections.map((s) => ({
//     ...s,
//     quizzes: (quizzes ?? []).filter((q) => q.section_id === s.id),
//   }))
// }

// /** Single source of truth for reading + normalizing a quiz's questions. */
// async function fetchQuizQuestionsNormalized(quizId: number): Promise<QuizQuestionRow[]> {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .from('quiz_questions')
//     .select('id, quiz_id, ques_id, order, question:questions_bank(*)')
//     .eq('quiz_id', quizId)
//     .order('order', { ascending: true })

//   if (error) throw error
//   return ((data ?? []) as any[]).map(normalizeQuizQuestionRow)
// }

// export async function getQuizQuestions(quizId: number): Promise<QuizQuestionRow[]> {
//   return fetchQuizQuestionsNormalized(quizId)
// }

// export async function getUserAttemptsForCourse(
//   userId: string,
//   courseSlug: string
// ): Promise<QuizAttemptRow[]> {
//   const supabase = await createClient()

//   const { data: quizzes } = await supabase
//     .from('course_quiz')
//     .select('id')
//     .eq('course_slug', courseSlug)

//   const quizIds = (quizzes ?? []).map((q) => q.id)
//   if (!quizIds.length) return []

//   const { data, error } = await supabase
//     .from('quiz_attempt')
//     .select('*')
//     .eq('user_id', userId)
//     .in('quiz_id', quizIds)
//     .order('created_at', { ascending: false })

//   if (error) throw error
//   return data ?? []
// }

// // =========================================================
// // Grading (pure, shared by submit + report — works on normalized data)
// // =========================================================

// function hasAnswer(question: QuestionBankRow, userAnswer: any): boolean {
//   if (userAnswer === undefined || userAnswer === null) return false

//   if (question.type === 'single' || question.type === 'true_false') {
//     return typeof userAnswer === 'string' && userAnswer.length > 0
//   }

//   if (question.type === 'multiple') {
//     return Array.isArray(userAnswer) && userAnswer.length > 0
//   }

//   if (question.type === 'dnd') {
//     if (!userAnswer || typeof userAnswer !== 'object' || Array.isArray(userAnswer)) return false
//     return Object.values(userAnswer).some((value) => Array.isArray(value) && value.length > 0)
//   }

//   return false
// }

// function gradeQuestion(question: QuestionBankRow, userAnswer: any): boolean {
//   if (!hasAnswer(question, userAnswer)) return false

//   if (question.type === 'single' || question.type === 'true_false') {
//     const opts = question.options as QuestionOption[]
//     const correct = opts.find((o) => o.is_correct)
//     return correct?.id === userAnswer
//   }

//   if (question.type === 'multiple') {
//     const opts = question.options as QuestionOption[]
//     const correctIds = opts
//       .filter((o) => o.is_correct)
//       .map((o) => o.id)
//       .sort()
//     const givenIds = (Array.isArray(userAnswer) ? userAnswer : []).slice().sort()
//     return JSON.stringify(correctIds) === JSON.stringify(givenIds)
//   }

//   if (question.type === 'dnd') {
//     const dnd = question.options as DndOptions
//     const map = (userAnswer ?? {}) as Record<string, string[]>

//     // The seed data is normalized from:
//     // [{ left_item, right_match }, ...]
//     // into:
//     // { list1: [{id: L1_0}, ...], list2: [{id: L2_0}, ...],
//     //   correct_map: { L1_0: ['L2_0'], ... } }
//     // Therefore grading compares the IDs, not the displayed order/text.
//     for (const item of dnd.list1) {
//       const expected = (dnd.correct_map[item.id] ?? []).slice().sort()
//       const given = (Array.isArray(map[item.id]) ? map[item.id] : []).slice().sort()
//       if (JSON.stringify(expected) !== JSON.stringify(given)) return false
//     }

//     return true
//   }

//   return false
// }

// function getQuestionStatus(
//   isCorrect: boolean,
//   isAnswered: boolean,
//   isFlagged: boolean
// ): QuestionStatus {
//   if (isFlagged) return 'flagged'
//   if (!isAnswered) return 'skipped'
//   return isCorrect ? 'correct' : 'wrong'
// }

// function buildResults(
//   rows: QuizQuestionRow[],
//   answerState: Record<string, any>
// ): GradeResult[] {
//   const flags = (answerState.__flags ?? {}) as Record<string, boolean>
//   const revealed = (answerState.__revealed ?? {}) as Record<string, boolean>

//   return rows.map((row) => {
//     const key = String(row.ques_id)
//     const userAnswer = answerState[key] ?? answerState[row.ques_id]
//     const isAnswered = hasAnswer(row.question, userAnswer)
//     const isCorrect = gradeQuestion(row.question, userAnswer)
//     const isFlagged = !!flags[key]
//     const isRevealed = !!revealed[key]

//     return {
//       question_id: row.ques_id,
//       is_correct: isCorrect,
//       is_answered: isAnswered,
//       is_flagged: isFlagged,
//       is_revealed: isRevealed,
//       status: getQuestionStatus(isCorrect, isAnswered, isFlagged),
//     }
//   })
// }

// async function buildReport(
//   attempt: QuizAttemptRow,
//   answerStateForGrading: Record<string, any>
// ): Promise<Omit<QuizReportData, 'attempt'>> {
//   const rows = await fetchQuizQuestionsNormalized(attempt.quiz_id)
//   const results = buildResults(rows, answerStateForGrading)

//   const correctCount = results.filter((r) => r.is_correct).length
//   const total = rows.length
//   const score = total ? Math.round((correctCount / total) * 100) : 0

//   return {
//     questions: rows,
//     results,
//     correctCount,
//     total,
//     score,
//     isPassed: attempt.is_passed,
//   }
// }

// // =========================================================
// // Attempt lifecycle (called from the client)
// // =========================================================

// /** Returns the active (not-closed) attempt if one exists, otherwise creates one. */
// export async function getOrCreateActiveAttempt(
//   userId: string,
//   quizId: number,
//   durationMin: number
// ): Promise<QuizAttemptRow> {
//   const supabase = await createClient()

//   const { data: existing, error: findErr } = await supabase
//     .from('quiz_attempt')
//     .select('*')
//     .eq('user_id', userId)
//     .eq('quiz_id', quizId)
//     .eq('is_closed', false)
//     .order('created_at', { ascending: false })
//     .limit(1)
//     .maybeSingle()

//   if (findErr) throw findErr
//   if (existing) return existing as QuizAttemptRow

//   const { data: created, error: createErr } = await supabase
//     .from('quiz_attempt')
//     .insert({
//       user_id: userId,
//       quiz_id: quizId,
//       answer_state: {},
//       is_closed: false,
//       is_passed: false,
//       current_question_index: 0,
//       remaining_time_sec: durationMin * 60,
//     })
//     .select('*')
//     .single()

//   if (createErr) throw createErr
//   return created as QuizAttemptRow
// }

// /** Saves progress (answers + flags + position + remaining time) without closing the attempt. */
// export async function updateAttemptProgress(
//   attemptId: number,
//   currentQuestionIndex: number,
//   remainingTimeSec: number,
//   answers: Record<string, any>,
//   flags: Record<string, boolean>,
//   revealed: Record<string, boolean> = {}
// ) {
//   const supabase = await createClient()

//   const { error } = await supabase
//     .from('quiz_attempt')
//     .update({
//       current_question_index: currentQuestionIndex,
//       remaining_time_sec: remainingTimeSec,
//       // flags are namespaced under __flags so grading (which reads answer_state[ques_id])
//       // never confuses them with an actual answer.
//       answer_state: {
//         ...answers,
//         __flags: flags,
//         __revealed: revealed,
//       },
//     })
//     .eq('id', attemptId)

//   if (error) throw error
//   return { ok: true }
// }

// export async function submitAndCloseQuiz(
//   attemptId: number,
//   quizId: number,
//   userId: string,
//   answers: Record<string, any>,
//   flags: Record<string, boolean>,
//   timeUsedMin: number,
//   revealed: Record<string, boolean> = {}
// ): Promise<QuizReportData> {
//   const supabase = await createClient()

//   const { data: quiz, error: quizErr } = await supabase
//     .from('course_quiz')
//     .select('*')
//     .eq('id', quizId)
//     .single()
//   if (quizErr) throw quizErr

//   const rows = await fetchQuizQuestionsNormalized(quizId)

//   const finalAnswerState = {
//     ...answers,
//     __flags: flags,
//     __revealed: revealed,
//   }

//   const results = buildResults(rows, finalAnswerState)

//   const correctCount = results.filter((r) => r.is_correct).length
//   const total = rows.length || 1
//   const score = Math.round((correctCount / total) * 100)
//   const isPassed = score >= (quiz.passing_score ?? 0)

//   const { data: closedAttempt, error: updateErr } = await supabase
//     .from('quiz_attempt')
//     .update({
//       score,
//       is_passed: isPassed,
//       time_used_min: timeUsedMin,
//       is_closed: true,
//       answer_state: finalAnswerState,
//     })
//     .eq('id', attemptId)
//     .eq('user_id', userId)
//     .select('*')
//     .single()

//   if (updateErr) throw updateErr

//   revalidatePath('/', 'layout')

//   return {
//     attempt: closedAttempt as QuizAttemptRow,
//     questions: rows,
//     results,
//     correctCount,
//     total: rows.length,
//     score,
//     isPassed,
//   }
// }

// /** Rebuilds the report for an already-closed attempt (used by "history -> view report"). */
// export async function getAttemptReport(attemptId: number): Promise<QuizReportData> {
//   const supabase = await createClient()

//   const { data: attempt, error } = await supabase
//     .from('quiz_attempt')
//     .select('*')
//     .eq('id', attemptId)
//     .single()
//   if (error) throw error

//   const rest = await buildReport(attempt as QuizAttemptRow, attempt.answer_state ?? {})

//   return { attempt: attempt as QuizAttemptRow, ...rest }
// }
