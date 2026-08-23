import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CourseView } from "@/components/courses/course-view";
import { Footer } from "@/components/site/Footer";
import { getCourseBySlug, getCourses } from "./actions";

type PageProps = {
  params: Promise<{
    locale: 'ar' | 'en';
    slug: string;
  }>;
};

// توليد الـ SEO والميتا داتا ديناميكياً من قاعدة البيانات
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | PM Mindset",
    };
  }

  const title = `${course.title[locale]} | PM Mindset`;
  const description = course.short[locale];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { locale, slug } = await params;
  
  // جلب الكورس من قاعدة البيانات بشكل غير متزامن
  const course = await getCourseBySlug(slug);
  const courses = await getCourses();

  if (!course) {
    notFound();
  }

  const isEnrolled = false; // يمكنك ربطها بقاعدة بيانات المستخدمين لاحقاً

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <CourseView course={course} isenrolled={isEnrolled} />
      </div>
      <Footer courses={courses} />
    </div>
  );
}