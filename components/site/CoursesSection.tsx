'use client';
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { accentVar, WHATSAPP_URL, Course } from "@/utils/outher/courses";

interface CoursesSectionProps {
  courses: Course[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  const locale = useLocale() as 'ar' | 'en';

  return (
    <section id="courses" className="mx-auto w-full max-w-295 scroll-mt-24 px-5 py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary">
          {locale === 'ar' ? "برامج PM Mindset الاحترافية" : "PM Mindset professional programs"}
        </span>
        <h2 className="mt-4 text-3xl text-navy sm:text-4xl">
          {locale === 'ar' ? "اختر الشهادة المناسبة لمسيرتك المهنية" : "Choose the certification that fits your career"}
        </h2>
        <p className="mt-4 text-lg leading-9 text-muted-foreground">
          {locale === 'ar' ?
            "برامج تدريبية مباشرة تجمع بين متطلبات الاختبار والتطبيق العملي، لتساعدك على الحصول على الشهادة وبناء عقلية احترافية في إدارة المشروعات." :
            "Live programs combining exam requirements with practical application — earn the certificate and build a professional project mindset."
          }
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.slug}
            style={{ ["--accent" as string]: accentVar[course.accent] || accentVar.purple }}
            className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-[0_14px_38px_rgba(7,26,56,.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(7,26,56,.13)]"
          >
            <div
              className="relative grid h-60 place-items-center overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(145deg, color-mix(in oklch, var(--accent) 88%, var(--navy)), color-mix(in oklch, var(--accent) 45%, var(--navy)))",
              }}
            >
              <div className="absolute size-72 rounded-full border border-white/15" />
              <div className="absolute size-52 rounded-full border-18 border-white/6" />
              <img
                src={course.badge}
                alt={course.title.en}
                loading="lazy"
                width={172}
                height={172}
                className="relative z-10 size-44 rounded-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <span
                dir="ltr"
                className="w-max rounded-full px-3 py-1.5 text-xs font-extrabold tracking-wide"
                style={{
                  color: "var(--accent)",
                  backgroundColor: "color-mix(in oklch, var(--accent) 10%, white)",
                }}
              >
                {course.code}
              </span>

              <h3 className="mt-4 text-xl leading-relaxed text-navy">{course.title[locale]}</h3>
              <p className="mt-1 text-sm font-extrabold" style={{ color: "var(--accent)" }}>
                {course.subtitle[locale]}
              </p>
              <p className="mt-3 min-h-20 text-[15px] leading-8 text-muted-foreground">
                {course.short[locale]}
              </p>

              <ul className="mt-5 grid gap-3">
                {course.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-foreground/80">
                    <span
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md"
                      style={{
                        color: "var(--accent)",
                        backgroundColor: "color-mix(in oklch, var(--accent) 12%, white)",
                      }}
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {f[locale]}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <div
                  className="grid size-11 place-items-center rounded-full text-sm font-extrabold text-white"
                  style={{ backgroundImage: "linear-gradient(145deg, var(--navy), var(--accent))" }}
                >
                  AE
                </div>
                <div className="flex-1">
                  <strong className="block text-sm text-navy">Eng. Amr Elturky</strong>
                  <span className="text-xs text-muted-foreground">PM Mindset Instructor</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-extrabold text-navy">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {course.rating}
                </span>
              </div>

              {/* أزرار الإجراءات مع التحقق من حالة الكورس */}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {course.status === "upcoming" ? (
                  <Button
                    disabled
                    className="h-12 rounded-xl font-extrabold col-span-2 cursor-not-allowed opacity-75 bg-muted text-muted-foreground"
                  >
                    {locale === 'ar' ? "قريباً" : "Coming Soon"}
                  </Button>
                ) : (
                  <>
                    <Button
                      className="h-12 rounded-xl font-extrabold text-white hover:opacity-90"
                      style={{ backgroundColor: "var(--accent)" }}
                      onClick={() => window.open(WHATSAPP_URL, "_blank")}
                    >
                      {locale === 'ar' ? "سجّل الآن" : "Enroll now"}
                    </Button>

                    <Button
                      variant="outline"
                      className="h-12 rounded-xl font-extrabold hover:bg-secondary/80"
                      style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
                      onClick={() => window.location.href = `/courses/${course.slug}`}
                    >
                      {locale === 'ar' ? "عرض التفاصيل" : "View details"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* <div className="surface-navy mt-10 flex flex-col items-start justify-between gap-6 rounded-[1.5rem] p-8 text-white sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl text-white">
            {locale === 'ar' ? "لست متأكدًا من الدورة المناسبة؟" : "Not sure which course fits?"}
          </h3>
          <p className="mt-1.5 leading-8 text-white/75">
            {locale === 'ar' ?
              "تواصل معنا وسنساعدك على اختيار البرنامج المناسب لهدفك المهني وخبرتك الحالية." :
              "Talk to us and we'll help you pick the right program for your goals and experience."
            }
          </p>
        </div>
        <Button size="lg" variant="secondary" className="h-12 rounded-xl px-6 font-extrabold" onClick={() => window.open(WHATSAPP_URL, "_blank")}>
          {locale === 'ar' ? "تحدّث مع مستشار" : "Talk to an advisor"}
        </Button>
      </div> */}
    </section>
  );
}