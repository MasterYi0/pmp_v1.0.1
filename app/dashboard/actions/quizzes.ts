'use server'

import { createClient } from '@/utils/supabase/server'

export async function getQuizWithQuestions(quizId: string) {
  const supabase = await createClient()

  // جلب تفاصيل الاختبار
  const { data: quiz, error: quizError } = await supabase
    .from('course_quizzes')
    .select('*')
    .eq('id', quizId)
    .single()

  if (quizError) throw new Error(quizError.message)

  // جلب الأسئلة المرتبطة بالبنك عبر جدول الربط
  const { data: relations, error: relError } = await supabase
    .from('quiz_questions')
    .select(`
      question_id,
      question_bank (*)
    `)
    .eq('quiz_id', quizId)
    .order('order_index', { ascending: true })

  if (relError) throw new Error(relError.message)

  const questions = relations.map(r => r.question_bank)

  return { quiz, questions }
}

export async function handleQuizAttempt(userId: string, quizId: string, actionType: 'start' | 'pause' | 'submit', answersState?: any) {
  const supabase = await createClient()

  if (actionType === 'start') {
    // إنشاء محاولة جديدة أو جلب النشطة/المعلقة
    const { data: existing } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .in('status', ['active', 'paused'])
      .maybeSingle()

    if (existing) {
      // تحديث الحالة إلى active لو كانت معلقة
      await supabase.from('quiz_attempts').update({ status: 'active' }).eq('id', existing.id)
      return existing
    }

    const { data: newAttempt, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        status: 'active',
        answers_state: {}
      })
      .select()
      .single()

    if (error) throw new Error(error.message)
    return newAttempt
  }

  if (actionType === 'pause') {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .update({
        status: 'paused',
        answers_state: answersState
      })
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .eq('status', 'active')
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  if (actionType === 'submit') {
    // حساب النتيجة وتصحيح الإجابات
    // (يتم مقارنة answersState مع الإجابات الصحيحة في question_bank)
    // سنبسطها بفرض حساب النسبة المئوية هنا:
    const { data: quiz } = await supabase.from('course_quizzes').select('passing_score').eq('id', quizId).single()
    
    // افتراض أننا حسبنا النسبة المئوية ونفترضها مثلاً 80% للتوضيح:
    const calculatedScore = answersState?.score || 0 
    const isPassed = calculatedScore >= (quiz?.passing_score || 60)

    const { data, error } = await supabase
      .from('quiz_attempts')
      .update({
        status: 'completed',
        score: calculatedScore,
        is_passed: isPassed,
        completed_at: new Date().toISOString(),
        answers_state: answersState
      })
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }
}




export async function getCourseQuizzesData(courseSlug: string, userId: string) {
  const supabase = await createClient()

  // جلب تفاصيل الدورة
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseSlug)
    .single()

  if (courseError) throw new Error(courseError.message)

  // جلب أقسام الدورة واختباراتها المرتبطة بها
  // (نفرض أن جدول course_quiz يحتوي على section_id أو مرتبط مباشرة بالدورة)
  const { data: sections, error: sectionsError } = await supabase
    .from('course_sections')
    .select(`
      id,
      title_ar,
      title_en,
      order_index,
      course_quiz (
        id,
        title,
        duration_min,
        passing_score
      )
    `)
    .eq('course_slug', courseSlug)
    .order('order_index', { ascending: true })

  if (sectionsError) throw new Error(sectionsError.message)

  // جلب أسئلة وخيارات كل اختبار (أو سنقوم بجلبها عند اختيار الاختبار لتكون أسرع)
  // جلب محاولات المستخدم السابقة لمعرفة الاختبارات التي اجتازها
  const { data: attempts } = await supabase
    .from('quiz_attempt')
    .select('quiz_id, score, is_passed')
    .eq('user_id', userId)
    .eq('is_passed', true)

  const passedQuizzesMap = new Map()
  attempts?.forEach(att => passedQuizzesMap.set(att.quiz_id, true))

  // اختيار أول اختبار افتراضياً إذا وجد
  let firstQuiz = null
  for (const sec of sections || []) {
    if (sec.course_quiz && sec.course_quiz.length > 0) {
      firstQuiz = sec.course_quiz[0]
      break
    }
  }

  let initialQuestions: { id: string; question_text: string; options: string[]; correct_answer?: string }[] = []
  
  if (firstQuiz) {
   initialQuestions = await fetchQuizQuestionsHelper(supabase, firstQuiz.id)
  }

  return {
    course,
    sections: sections || [],
    initialQuiz: firstQuiz,
    initialQuestions,
    passedQuizzesMap: Array.from(passedQuizzesMap.entries())
  }
}
async function fetchQuizQuestionsHelper(supabase: any, quizId: string) {
  const { data: relations, error } = await supabase
    .from('quiz_questions')
    .select(`
      ques_id,
      order,
      questions_bank (
        id,
        question,
        options,
        type
      )
    `)
    .eq('quiz_id', quizId)
    .order('order', { ascending: true })

  if (error || !relations) return []

  // تنسيق الأسئلة لتسهيل عرضها في الكلاينت
  return relations.map((rel: any) => ({
    id: rel.questions_bank?.id,
    question: rel.questions_bank?.question, // JSONB { ar, en }
    options: rel.questions_bank?.options,   // JSONB أو مصفوفة الخيارات
    type: rel.questions_bank?.type          // single, multiple, drag_drop
  })).filter((q: any) => q.id)
}
// 2. جلب أسئلة اختبار معين عند التبديل بين الاختبارات من القائمة الجانبية
export async function getQuizQuestionsAction(quizId: string) {
  const supabase = await createClient()
 return await fetchQuizQuestionsHelper(supabase, quizId)
}

// 3. تسليم الاختبار وتصحيحه وحفظ النتيجة
// export async function submitQuizAttemptAction(userId: string, quizId: string, userAnswers: Record<string, string>, passingScore: number) {
//   const supabase = await createClient()

//   // جلب الأسئلة والإجابات الصحيحة من قاعدة البيانات
//   const { data: questions, error } = await supabase
//     .from('quiz_questions')
//     .select('id, correct_answer')
//     .eq('quiz_id', quizId)

//   if (error) throw new Error(error.message)
//   if (!questions || questions.length === 0) throw new Error('لا توجد أسئلة لهذا الاختبار')

//   let correctCount = 0
//   const totalQuestions = questions.length

//   questions.forEach(q => {
//     if (userAnswers[q.id] === q.correct_answer) {
//       correctCount++
//     }
//   })

//   const score = Math.round((correctCount / totalQuestions) * 100)
//   const isPassed = score >= passingScore

//   // حفظ المحاولة في جدول quiz_attempt
//   const { data: attemptData, error: attemptError } = await supabase
//     .from('quiz_attempt')
//     .insert({
//       user_id: userId,
//       quiz_id: quizId,
//       score,
//       is_passed: isPassed,
//       is_closed: true,
//       created_at: new Date().toISOString()
//     })
//     .select()
//     .single()

//   if (attemptError) throw new Error(attemptError.message)

//   return {
//     score,
//     isPassed,
//     correctCount,
//     totalQuestions
//   }
// }

// 3. تسليم الاختبار وتصحيحه
// export async function submitQuizAttemptAction(userId: string, quizId: string, userAnswers: Record<string, any>, passingScore: number) {
//   const supabase = await createClient()

//   // جلب أسئلة الاختبار مع الإجابات الصحيحة من questions_bank عبر quiz_questions
//   const { data: relations, error } = await supabase
//     .from('quiz_questions')
//     .select(`
//       questions_bank (
//         id,
//         options,
//         type
//       )
//     `)
//     .eq('quiz_id', quizId)

//   if (error || !relations || relations.length === 0) throw new Error('لا توجد أسئلة لهذا الاختبار')

//   let correctCount = 0
//   const totalQuestions = relations.length

//   relations.forEach((rel: any) => {
//     const q = rel.questions_bank
//     if (!q) return

//     const userAns = userAnswers[q.id]
//     // افترضنا أن options في بنك الأسئلة تخزن الحقل الذي يحدد الإجابة الصحيحة (مثلاً is_correct: true أو correct_answer)
//     // هنا سنقوم بمقارنة إجابة المستخدم مع الإجابة الصحيحة المخزنة في options
//     const correctOptions = Array.isArray(q.options) 
//       ? q.options.filter((opt: any) => opt.is_correct || opt.correct).map((opt: any) => opt.text || opt.value || opt)
//       : []

//     if (q.type === 'single') {
//       if (userAns && correctOptions.includes(userAns)) {
//         correctCount++
//       }
//     } else if (q.type === 'multiple') {
//       // للمتعدد، نقارن المجموعات
//       // ...
//     }
//   })

//   const score = Math.round((correctCount / totalQuestions) * 100)
//   const isPassed = score >= passingScore

//   // حفظ المحاولة
//   const { error: attemptError } = await supabase
//     .from('quiz_attempt')
//     .insert({
//       user_id: userId,
//       quiz_id: quizId,
//       score,
//       is_passed: isPassed,
//       is_closed: true,
//       created_at: new Date().toISOString()
//     })

//   if (attemptError) throw new Error(attemptError.message)

//   return {
//     score,
//     isPassed,
//     correctCount,
//     totalQuestions
//   }
// }


export async function submitQuizAttemptAction(
  userId: string, 
  quizId: string, 
  userAnswers: Record<string, any>, 
  passingScore: number
) {
  const supabase = await createClient()

  // 1. جلب أسئلة الاختبار مع نوعها وخياراتها من بنك الأسئلة عبر جدول الربط
  const { data: relations, error } = await supabase
    .from('quiz_questions')
    .select(`
      questions_bank (
        id,
        options,
        type
      )
    `)
    .eq('quiz_id', quizId)

  if (error || !relations || relations.length === 0) {
    console.error('لا توجد أسئلة لهذا الاختبار أو حدث خطأ في الجلب')
    throw new Error('لا توجد أسئلة لهذا الاختبار')
  }

  let correctCount = 0
  const totalQuestions = relations.length

  // 2. تصحيح إجابة كل سؤال حسب نوعه
  relations.forEach((rel: any) => {
    const q = rel.questions_bank
    if (!q) return

    const userAns = userAnswers[q.id] // إجابة المستخدم لهذا السؤال

    // أ. نوع الاختيار الفردي (Single Choice)
    if (q.type === 'single') {
      if (Array.isArray(q.options)) {
        const correctOption = q.options.find((opt: any) => opt.is_correct === true)
        // التحقق مما إذا كانت إجابة المستخدم تطابق الـ id أو النص العربي للخيار الصحيح
        if (correctOption && (userAns === correctOption.id || userAns === correctOption.text?.ar)) {
          correctCount++
        }
      }
    } 
    
    // ب. نوع الاختيار المتعدد (Multiple Choice - أكثر من إجابة صحيحة)
    else if (q.type === 'multiple') {
      if (Array.isArray(q.options) && Array.isArray(userAns)) {
        // استخراج معرفات كافة الخيارات الصحيحة
        const correctIds = q.options
          .filter((opt: any) => opt.is_correct === true)
          .map((opt: any) => opt.id)

        // التأكد من أن إجابات المستخدم تطابق الخيارات الصحيحة تماماً (نفس العدد ونفس العناصر)
        const isExactMatch = 
          userAns.length === correctIds.length && 
          userAns.every((id: string) => correctIds.includes(id))

        if (isExactMatch) {
          correctCount++
        }
      }
    } 
    
    // ج. نوع السحب والإفلات أو المطابقة (Drag & Drop / Matching)
    else if (q.type === 'drag_drop') {
      // الـ options هنا عبارة عن كائن يحتوي على pairs (الأزواج ومكانها الصحيح target_id)
      const pairs = q.options?.pairs || []
      
      // إجابة المستخدم المتوقعة عبارة عن كائن يربط كل عنصر بمكانه: { item_1: 'target_b', item_2: 'target_a' }
      if (userAns && typeof userAns === 'object' && pairs.length > 0) {
        let allPairsCorrect = true

        pairs.forEach((pair: any) => {
          if (userAns[pair.id] !== pair.target_id) {
            allPairsCorrect = false
          }
        })

        if (allPairsCorrect) {
          correctCount++
        }
      }
    }
  })

  // 3. حساب النسبة المئوية للدرجة
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0
  const isPassed = score >= passingScore

  // 4. حفظ المحاولة في جدول quiz_attempt
  const { error: attemptError } = await supabase
    .from('quiz_attempt')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      score,
      is_passed: isPassed,
      is_closed: true,
      created_at: new Date().toISOString()
    })

  if (attemptError) throw new Error(attemptError.message)

  return {
    score,
    isPassed,
    correctCount,
    totalQuestions
  }
}


// 1. بدء محاولة جديدة أو استرجاع المحاولة النشطة إن وجدت
export async function getOrCreateActiveAttempt(userId: string, quizId: string, totalDurationMin: number) {
  const supabase = await createClient()

  // البحث عن محاولة نشطة غير مغلقة
  const { data: existingAttempt, error: fetchError } = await supabase
    .from('quiz_attempt')
    .select('*')
    .eq('user_id', userId)
    .eq('quiz_id', quizId)
    .eq('is_closed', false)
    .single()

  if (existingAttempt) {
    return existingAttempt
  }

  // إذا لم توجد، أنشئ محاولة جديدة
  const initialRemainingSec = totalDurationMin * 60
  const { data: newAttempt, error: insertError } = await supabase
    .from('quiz_attempt')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      is_closed: false,
      current_question_index: 0,
      remaining_time_sec: initialRemainingSec,
      answer_state: {},
      time_used_min: 0
    })
    .select()
    .single()

  if (insertError) throw new Error(insertError.message)
  return newAttempt
}

// 2. تحديث التقدم الحالي (تخزين مؤقت للإجابات، الوقت، ورقم السؤال عند التنقل أو الإيقاف المؤقت)
export async function updateAttemptProgress(
  attemptId: string, 
  currentIndex: number, 
  remainingSec: number, 
  answerState: Record<string, any>
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('quiz_attempt')
    .update({
      current_question_index: currentIndex,
      remaining_time_sec: remainingSec,
      answer_state: answerState,
    })
    .eq('id', attemptId)

  if (error) throw new Error(error.message)
  return { success: true }
}

// 3. إنهاء الاختبار وحساب النتيجة النهائية وتخزين التقرير
export async function submitAndCloseQuiz(
  attemptId: string,
  quizId: string,
  userId: string,
  finalAnswers: Record<string, any>,
  totalTimeUsedMin: number
) {
  const supabase = await createClient()

  // 1. جلب أسئلة الاختبار مع الإجابات الصحيحة من بنك الأسئلة
  const { data: quizQuestions, error: qError } = await supabase
    .from('quiz_questions')
    .select(`
      order_index,
      questions_bank (
        id,
        type,
        options,
        question
      )
    `)
    .eq('quiz_id', quizId)
    .order('order_index', { ascending: true })

  if (qError || !quizQuestions) throw new Error('Failed to fetch quiz questions for scoring')

  // 2. جلب شروط النجاح للاختبار (نسبة النجاح المطلوبة)
  const { data: quizMeta, error: metaError } = await supabase
    .from('course_quiz')
    .select('passing_score')
    .eq('id', quizId)
    .single()

  if (metaError || !quizMeta) throw new Error('Failed to fetch quiz metadata')

  let correctCount = 0
  const totalQuestions = quizQuestions.length
  const evaluatedAnswersState: Record<string, any> = {}

  // 3. تصحيح الأسئلة تلقائياً
  quizQuestions.forEach((item: any) => {
    const q = item.questions_bank
    const userAns = finalAnswers[q.id] // إجابة المستخدم لهذا السؤال
    let isCorrect = false

    if (q.type === 'single_choice' || q.type === 'true_false') {
      // اختيار من متعدد أو صح وخطأ (إجابة واحدة صحيحة)
      const correctOption = q.options.find((opt: any) => opt.is_correct)
      if (userAns !== undefined && correctOption && String(userAns) === String(correctOption.id)) {
        isCorrect = true
      }
    } else if (q.type === 'multiple_choice') {
      // اختيار متعدد (أكثر من إجابة صحيحة)
      const correctIds = q.options.filter((opt: any) => opt.is_correct).map((opt: any) => String(opt.id)).sort()
      const userIds = Array.isArray(userAns) ? userAns.map((id: any) => String(id)).sort() : []
      if (
        userIds.length === correctIds.length &&
        userIds.every((val, idx) => val === correctIds[idx])
      ) {
        isCorrect = true
      }
    } else if (q.type === 'drag_and_drop') {
      // مطابقة / سحب وإفلات (Pairs)
      // options هنا قد تتضمن مطابقة أزواج صحيحة، نقارن ما أرسله المستخدم
      const correctPairs = q.options.pairs || q.options // حسب هيكلتكم
      // مطابقة بسيطة للأزواج
      let allPairsMatch = true
      if (userAns && typeof userAns === 'object') {
        for (const key of Object.keys(correctPairs)) {
          if (String(userAns[key]) !== String(correctPairs[key])) {
            allPairsMatch = false
            break
          }
        }
      } else {
        allPairsMatch = false
      }
      isCorrect = allPairsMatch
    }

    if (isCorrect) correctCount++

    evaluatedAnswersState[q.id] = {
      userAnswer: userAns,
      isCorrect: isCorrect,
    }
  })

  // 4. حساب النسبة المئوية
  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0
  const isPassed = scorePercentage >= quizMeta.passing_score

  // 5. تحديث المحاولة وإغلاقها
  const { data: updatedAttempt, error: updateError } = await supabase
    .from('quiz_attempt')
    .update({
      score: scorePercentage,
      is_passed: isPassed,
      time_used_min: totalTimeUsedMin,
      answer_state: evaluatedAnswersState,
      is_closed: true,
      current_question_index: 0,
      remaining_time_sec: 0
    })
    .eq('id', attemptId)
    .select()
    .single()

  if (updateError) throw new Error(updateError.message)
  
  // revalidatePath(`/courses`)
  return updatedAttempt
}




// 1. جلب المحاولات السابقة للاختبار
export async function getQuizAttempts(userId: string, quizId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('quiz_attempt') // اسم جدول المحاولات في قاعدة البيانات
    .select('*')
    .eq('user_id', userId)
    .eq('quiz_id', quizId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching quiz attempts:', error)
    return []
  }
  return data || []
}

// 2. حفظ محاولة اختبار جديدة
export async function saveQuizAttempt(userId: string, quizId: string, score: number, isPassed: boolean, answerState: any) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('quiz_attempt')
    .insert([
      {
        user_id: userId,
        quiz_id: quizId,
        score,
        is_passed: isPassed,
        answer_state: answerState,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error saving quiz attempt:', error)
    throw new Error('Failed to save attempt')
  }
  return data
}



// get all course quizzes by course id

// get user attempts by quiz ids

// 

