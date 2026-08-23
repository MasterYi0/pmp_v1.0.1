// components/courses/course-view.tsx
'use client';
import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Clock,
    PlayCircle,
    Star,
    Target,
    Users,
    Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { accentVar, WHATSAPP_URL, type Course } from "@/utils/outher/courses";
import { Stars } from "./course-stars";
import { useLocale } from "next-intl";

export function CourseView({ course ,isenrolled}: { course: Course; isenrolled:boolean}) {
    const accent = accentVar[course.accent];
    const totalLessons = course.sections.reduce((n, s) => n + s.lessons.length, 0);
    const locale = useLocale() as 'ar' | 'en';

  
    return (
        <div className="min-h-screen" style={{ ["--accent" as string]: accent }}>
            <section className="surface-navy relative overflow-hidden text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 85% 10%, color-mix(in oklch, var(--accent) 55%, transparent), transparent 45%)",
                    }}
                />
                <div className="relative mx-auto w-full max-w-295 px-5 py-12 lg:py-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
                        <ArrowLeft className="size-4 ltr:rotate-180" />
                        {locale === 'ar' ? "العودة للرئيسية" : "Back to home"}
                    </Link>

                    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
                        <div>
                            <span dir="ltr" className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-white/85">
                                {course.code}
                            </span>
                            <h1 className="mt-4 text-3xl leading-snug text-white sm:text-4xl">{course.title[locale]}</h1>
                            <p className="mt-2 text-lg font-extrabold text-white/80">{course.subtitle[locale]}</p>
                            <p className="mt-4 max-w-2xl leading-9 text-white/70">{course.intro[locale]}</p>

                            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <Clock className="size-4" />
                                    {course.hours} {locale === 'ar' ? "ساعة تدريبية" : "training hours"}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <BookOpen className="size-4" />
                                    {totalLessons} {locale === 'ar' ? "درسًا" : "lessons"}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <Users className="size-4" />
                                    {course.students}+ {locale === 'ar' ? "متدرب" : "trainees"}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                                    <Stars value={course.rating} />
                                    {course.rating}
                                    <span className="font-normal text-white/60">
                                        ({course.reviewsCount} {locale === 'ar' ? "تقييم" : "reviews"})
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {isenrolled?(
                                    <Button
                                    size="lg"
                                    className="h-13 rounded-2xl px-8 text-base font-extrabold text-white hover:opacity-90"
                                    style={{ backgroundColor: "var(--accent)" }}
                                    onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
                                >
                                    {locale === 'ar' ? " عرض الدورة" : "Start the course"}
                                </Button>
                                ):(
                                    <Button
                                    size="lg"
                                    className="h-13 rounded-2xl px-8 text-base font-extrabold text-white hover:opacity-90"
                                    style={{ backgroundColor: "var(--accent)" }}
                                    onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
                                >
                                    {locale === 'ar' ? "سجّل الآن" : "Enroll now"}
                                </Button>
                            )}
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-13 rounded-2xl border-white/30 bg-transparent px-6 text-base font-extrabold text-white hover:bg-white/10 hover:text-white"
                                    onClick={() => {
                                        document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    {locale === 'ar' ? "استعرض المحتوى" : "Browse the content"}
                                </Button>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-xs rounded-[1.8rem] border border-white/15 bg-white/[0.07] p-8 backdrop-blur-sm">
                            <img
                                src={course.badge}
                                alt={course.title.en}
                                width={220}
                                height={220}
                                className="mx-auto size-52 rounded-full object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main id="content" className="mx-auto w-full max-w-295 px-5 py-12">
                <Tabs defaultValue="about">
                    <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-2xl bg-secondary p-1.5">
                        {[
                            { v: "about", icon: Target, label: locale === 'ar' ? "عن الدورة" : "About" },
                            { v: "content", icon: BookOpen, label: locale === 'ar' ? "المحتويات" : "Content" },
                            { v: "reviews", icon: Star, label: locale === 'ar' ? "التقييمات" : "Reviews" },
                            { v: "live", icon: Video, label: locale === 'ar' ? "البث المباشر" : "Live sessions" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.v}
                                value={tab.v}
                                className="gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold data-[state=active]:bg-card data-[state=active]:text-navy data-[state=active]:shadow-sm"
                            >
                                <tab.icon className="size-4" />
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="about" className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
                        <div className="grid gap-6">
                            <Card title={locale === 'ar' ? "ماذا ستتعلّم؟" : "What you'll learn"}>
                                <ul className="grid gap-3 sm:grid-cols-2">
                                    {course.learn.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-[15px] leading-8 text-muted-foreground">
                                            <CheckCircle2 className="mt-1.5 size-4 shrink-0" style={{ color: "var(--accent)" }} />
                                            {item[locale]}
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            <Card title={locale === 'ar' ? "لمن تناسب هذه الدورة؟" : "Who is it for?"}>
                                <ul className="grid gap-3">
                                    {course.audience.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-[15px] leading-8 text-muted-foreground">
                                            <span className="mt-3 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                                            {item[locale]}
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            <Card title={locale === 'ar' ? "مميزات الدورة (المخرجات)" : "Course outcomes"}>
                                <ul className="grid gap-3 sm:grid-cols-2">
                                    {course.perks.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-[15px] leading-8 text-muted-foreground">
                                            <CheckCircle2 className="mt-1.5 size-4 shrink-0" style={{ color: "var(--accent)" }} />
                                            {item[locale]}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        <aside className="h-max rounded-[1.4rem] border border-border bg-card p-6 shadow-[0_12px_32px_rgba(7,26,56,.06)]">
                            <h3 className="text-lg text-navy">{locale === 'ar' ? "تفاصيل الدورة" : "Course details"}</h3>
                            <dl className="mt-4 grid gap-3.5">
                                {course.details.map((d) => (
                                    <div key={d.label[locale]} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0">
                                        <dt className="text-sm font-bold text-navy">{d.label[locale]}</dt>
                                        <dd className="text-end text-sm text-muted-foreground">{d.value[locale]}</dd>
                                    </div>
                                ))}
                            </dl>
                            <Button
                                className="mt-5 h-12 w-full rounded-xl font-extrabold text-white hover:opacity-90"
                                style={{ backgroundColor: "var(--accent)" }}
                                onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
                            >
                                {locale === 'ar' ?"سجّل الآن": "Enroll now"}
                            </Button>
                        </aside>
                    </TabsContent>

                    <TabsContent value="content" className="mt-8">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-2xl text-navy">{locale === 'ar' ?"محتويات الدورة": "Course content"}</h2>
                            <p className="text-sm text-muted-foreground">
                                {course.sections.length} {locale === 'ar' ?"أقسام": "sections"} · {totalLessons} {locale === 'ar' ?"درسًا": "lessons"} ·{" "}
                                {course.hours} {locale === 'ar' ?"ساعة": "hours"}
                            </p>
                        </div>

               <Accordion className="grid gap-3">
  {course.sections.map((section, i) => (
    <AccordionItem
      key={i}
      value={"s-" + i}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <AccordionTrigger className="px-5 py-4 text-start hover:no-underline">
        <span className="flex flex-1 items-center gap-3">
          <span
            className="grid size-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold"
            style={{
              color: "var(--accent)",
              backgroundColor: "color-mix(in oklch, var(--accent) 12%, white)",
            }}
          >
            {i + 1}
          </span>
          <span className="flex-1 text-base font-extrabold text-navy">{section[locale]}</span>
          <span className="me-2 text-xs font-normal text-muted-foreground">
            {section.lessons.length} {locale === 'ar' ? "دروس" : "lessons"}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="border-t border-border bg-secondary/40 p-0">
        <ul>
          {section.lessons.map((lesson, li) => (
            <li
              key={li}
              className="flex items-center gap-3 border-b border-border/70 px-5 py-3.5 last:border-0"
            >
              <PlayCircle className="size-4 shrink-0" style={{ color: "var(--accent)" }} />
              <span className="flex-1 text-sm text-foreground/85">{lesson[locale]}</span>
              {lesson.preview && (
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-extrabold"
                  style={{
                    color: "var(--accent)",
                    backgroundColor: "color-mix(in oklch, var(--accent) 12%, white)",
                  }}
                >
                  {locale === 'ar' ? "معاينة مجانية" : "Free preview"}
                </span>
              )}
              <span dir="ltr" className="text-xs text-muted-foreground">{lesson.duration}</span>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
                        <div className="h-max rounded-[1.4rem] border border-border bg-card p-7 text-center shadow-[0_12px_32px_rgba(7,26,56,.06)]">
                            <div className="text-5xl font-extrabold text-navy">{course.rating}</div>
                            <Stars value={course.rating} className="mt-3 justify-center" />
                            <p className="mt-2 text-sm text-muted-foreground">
                                {locale === 'ar' ?"بناءً على": "Based on"} {course.reviewsCount} {locale === 'ar' ?"تقييمًا": "reviews"}
                            </p>
                            <div className="mt-5 grid gap-2.5">
                                {[
                                    { s: 5, p: 86 },
                                    { s: 4, p: 11 },
                                    { s: 3, p: 2 },
                                    { s: 2, p: 1 },
                                    { s: 1, p: 0 },
                                ].map((row) => (
                                    <div key={row.s} className="flex items-center gap-3">
                                        <span className="w-10 text-xs text-muted-foreground">{row.s} ★</span>
                                        <Progress value={row.p} className="h-2 flex-1" />
                                        <span className="w-9 text-end text-xs text-muted-foreground">{row.p}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {course.reviews.map((review, i) => (
                                <figure key={i} className="rounded-[1.4rem] border border-border bg-card p-6 shadow-[0_10px_28px_rgba(7,26,56,.05)]">
                                    <div className="flex items-center gap-3">
                                        <div className="grid size-11 place-items-center rounded-full surface-navy text-sm font-extrabold text-white">
                                            {review.name.charAt(0)}
                                        </div>
                                        <figcaption className="flex-1">
                                            <strong className="block text-sm text-navy">{review.name}</strong>
                                            <span className="text-xs text-muted-foreground">{review.role}</span>
                                        </figcaption>
                                        <Stars value={review.rating} />
                                    </div>
                                    <blockquote className="mt-4 text-[15px] leading-8 text-muted-foreground">{review.text["ar"]}</blockquote>
                                </figure>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="live" className="mt-8">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-2xl text-navy">{locale === 'ar' ?"جدول البث المباشر": "Live session schedule"}</h2>
                            <p className="text-sm text-muted-foreground">
                                {locale === 'ar' ?"جميع المواعيد بتوقيت القاهرة": "All times in Cairo time"}
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-[1.4rem] border border-border bg-card">
                            {course.liveSessions.map((session, i) => (
                                <div
                                    key={i}
                                    className="flex flex-wrap items-center gap-4 border-b border-border px-5 py-4 last:border-0 hover:bg-secondary/50"
                                >
                                    <span
                                        className="grid size-11 shrink-0 place-items-center rounded-xl"
                                        style={{
                                            color: "var(--accent)",
                                            backgroundColor: "color-mix(in oklch, var(--accent) 12%, white)",
                                        }}
                                    >
                                        <CalendarDays className="size-5" />
                                    </span>
                                    <div className="min-w-40 flex-1">
                                        <strong className="block text-sm text-navy">{session.topic[locale]}</strong>
                                        <span className="text-xs text-muted-foreground">{session.date[locale]}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{session.time[locale]}</span>
                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold text-emerald-600">
                                        {locale === 'ar' ?"قادمة": "Upcoming"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-5 rounded-2xl border border-border bg-secondary/50 p-5 text-sm leading-8 text-muted-foreground">
                            {locale === 'ar' ?
                                "تُعقد المحاضرات أونلاين مباشرة وتفاعلية، ويتم إرسال رابط الجلسة للمتدربين المسجلين قبل الموعد.":
                                "Sessions are live and interactive; the meeting link is sent to registered trainees before each session."
                            }
                        </p>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-[1.4rem] border border-border bg-card p-7 shadow-[0_12px_32px_rgba(7,26,56,.06)]">
            <h2 className="mb-5 text-xl text-navy">{title}</h2>
            {children}
        </section>
    );
}