import { BadgeCheck } from "lucide-react";
import instructor from "@/assets/instructor.jpg";
import { useLocale } from "next-intl";

export function Instructor() {
  const locale = useLocale() as 'ar' | 'en';
  return (
    <section id="instructor" className="mx-auto w-full max-w-295 scroll-mt-24 px-5 py-20">
      <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card p-6 shadow-[0_18px_50px_rgba(7,26,56,.08)] sm:p-10 lg:grid-cols-[380px_1fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.7rem] surface-navy rtl:-translate-x-4" />
          <img
            src="/instructor.jpeg"
            alt={locale === 'ar' ?"م. عمرو التركي - مدرب PM Mindset":"Eng. Amr Elturky - PM Mindset instructor"}
            loading="lazy"
            width={912}
            height={1104}
            className="relative rounded-[1.7rem] object-cover"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary">
            <BadgeCheck className="size-4" />
            {locale === 'ar' ?"المدرب": "Your instructor"}
          </span>
          <h2 className="mt-4 text-3xl text-navy sm:text-4xl">
            {locale === 'ar' ?"م. عمرو التركي": "Eng. Amr Elturky"}
          </h2>
          <p dir="ltr" className="mt-2 text-base font-extrabold text-primary rtl:text-end">
            PMP® | PMI-RMP® | PMI-PMOCP®
          </p>
          <p dir="ltr" className="mt-1 text-sm text-muted-foreground rtl:text-end">
            Project Management Consultant | PMI Authorized Training Partner Instructor
          </p>

          <p className="mt-5 leading-9 text-muted-foreground">
            {locale === 'ar' ?
              "يمتلك خبرة مهنية تتجاوز 13 عامًا في إدارة المشروعات والمشروعات الإنشائية، من خلال العمل في بيئات متنوعة ومن جانبي المقاول والاستشاري.":
              "Over 13 years of professional experience in project and construction management, working across diverse environments on both the contractor and consultant sides."
            }
          </p>
          <p className="mt-3 leading-9 text-muted-foreground">
            {locale === 'ar' ?
              "يقدّم برامج تدريبية احترافية تجمع بين متطلبات الاختبارات الدولية والتطبيق العملي، بهدف مساعدة المتدربين على اجتياز الشهادات المهنية، وفي الوقت نفسه بناء عقلية إدارية وقيادية تمكّنهم من تحليل المواقف، واتخاذ القرارات المناسبة، وقيادة المشروعات بثقة وكفاءة في بيئة العمل الواقعية.":
              "He delivers professional programs that combine international exam requirements with practical application — helping trainees pass their certifications while building the managerial and leadership mindset to analyse situations, make sound decisions and lead projects with confidence."
            }
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              { v: "13+", l: locale === 'ar' ?"سنوات خبرة": "Years experience" },
              { v: "1000+", l: locale === 'ar' ?"متدرب": "Trainees trained" },
              { v: "ATP", l: locale === 'ar' ?"مدرب معتمد من PMI": "PMI authorised instructor" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-secondary/60 p-4 text-center">
                <div className="text-2xl font-extrabold text-navy">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}