import { Course } from "@/utils/outher/courses";
import { createClient } from "@/utils/supabase/server";

// جلب جميع الكورسات مع تفاصيلها
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();
  
  // استخدام Supabase Joins لجلب البيانات المرتبطة
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      sections:course_sections (
        id,
        title_ar,
        title_en,
        order_index,
        lessons:course_lessons (
          id,
          title_ar,
          title_en,
          duration,
          preview,
          order_index
        )
      ),
      liveSessions:course_live_sessions (*),
      reviews:course_reviews (*)
    `)
    .order('order_index', { referencedTable: 'course_sections', ascending: true })
    .order('order_index', { referencedTable: 'course_sections.course_lessons', ascending: true });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  // إعادة صياغة البيانات لتتطابق مع هيكل الـ TypeScript الخاص بك (إذا لزم الأمر)
  return data.map(formatCourseData) as Course[];
}

// جلب كورس واحد بناءً على الـ slug مع كل العلاقات
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      sections:course_sections (
        id,
        title_ar,
        title_en,
        order_index,
        lessons:course_lessons (
          id,
          title_ar,
          title_en,
          duration,
          preview,
          order_index
        )
      ),
      liveSessions:course_live_sessions (*),
      reviews:course_reviews (*)
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    return null;
  }

  return formatCourseData(data) as Course;
}

// دالة مساعدة لتنسيق هيكل البيانات ليتوافق مع الواجهة (Localization structure)
function formatCourseData(course: any) {
  return {
    ...course,
    // تحويل الأقسام والدروس لتتوافق مع طريقة عرضها في المكون (`section[locale]` و `lesson[locale]`)
    sections: course.sections?.map((section: any) => ({
      ar: section.title_ar,
      en: section.title_en,
      lessons: section.lessons?.map((lesson: any) => ({
        ar: lesson.title_ar,
        en: lesson.title_en,
        duration: lesson.duration,
        preview: lesson.preview,
      })) || [],
    })) || [],
  };
}