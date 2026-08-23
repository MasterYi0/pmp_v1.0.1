import { Course } from "@/utils/outher/courses";
import { createClient } from "@/utils/supabase/server";

 

export async function getCourses(): Promise<Course[]> {
    const supabase = await createClient();

  const { data: coursesData, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  // يمكننا جلب التفاصيل الكاملة أو إرجاع البيانات بشكل مبسط إذا لزم الأمر
  // لكن لجلب الدورة كاملوة مع أقسامها نستخدم دالة getCourse بالأسفل
  return coursesData as unknown as Course[];
}

/**
 * جلب دورة معينة بالـ slug مع دمج الأقسام، الدروس، جلسات البث، والتقييمات
 */
export async function getCourse(slug: string): Promise<Course | null> {
    const supabase = await createClient();

  // 1. جلب بيانات الدورة الأساسية
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (courseError || !course) {
    console.error('Error fetching course:', courseError);
    return null;
  }

  // 2. جلب الأقسام والدروس الخاصة بالدورة
  const { data: sectionsData, error: sectionsError } = await supabase
    .from('course_sections')
    .select(`
      *,
      course_lessons (*)
    `)
    .eq('course_slug', slug)
    .order('order_index', { ascending: true });

  if (sectionsError) {
    console.error('Error fetching sections:', sectionsError);
  }

  // إعادة صياغة شكل الأقسام لتتوافق تماماً مع الـ Type (Section)
  const sections = (sectionsData || []).map((sec: any) => ({
    ar: sec.title_ar,
    en: sec.title_en,
    lessons: (sec.course_lessons || []).map((les: any) => ({
      ar: les.title_ar,
      en: les.title_en,
      duration: les.duration,
      preview: les.preview,
    })),
  }));

  // 3. جلب جلسات البث المباشر
  const { data: liveSessions } = await supabase
    .from('course_live_sessions')
    .select('date, time, topic')
    .eq('course_slug', slug);

  // 4. جلب التقييمات
  const { data: reviews } = await supabase
    .from('course_reviews')
    .select('name, role, rating, text')
    .eq('course_slug', slug);

  // تجميع كل البيانات في الكائن النهائي المماثل للـ Type Course
  const fullCourse: Course = {
    ...course,
    sections: sections || [],
    liveSessions: liveSessions || [],
    reviews: reviews || [],
  };

  return fullCourse;
}