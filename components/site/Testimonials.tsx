// import { Quote, Star } from "lucide-react";
// import { useLocale } from "next-intl";

// const testimonials = [
//   { name: "محمد الشريف", role: "PMP® Certified – Site Manager", text: "أفضل ما في البرنامج أنه لا يعتمد على الحفظ. تعلّمت كيف أفكر كمدير مشروع، وهذا ما ساعدني في الاختبار وفي عملي." },
//   { name: "سارة عبدالله", role: "Project Engineer", text: "المتابعة المستمرة وبنك الأسئلة كانا الفارق الحقيقي. اجتزت اختبار PMP® من أول محاولة بتقدير Above Target." },
//   { name: "أحمد يوسف", role: "PMO Specialist", text: "شرح منظم وواقعي، والمهندس عمرو يجيب على كل استفسار بالتفصيل. دورة PMOCP غيّرت طريقة عملي داخل المكتب." },
//   { name: "خالد المنصوري", role: "Planning Engineer", text: "دورة RMP كانت عملية جدًا. تدربنا على سجل مخاطر حقيقي وليس مجرد شرائح نظرية." },
//   { name: "منى إبراهيم", role: "Construction Manager", text: "الخطة الدراسية واضحة والمراجعات قبل الاختبار ممتازة. أنصح بها كل من يريد الشهادة والفهم معًا." },
//   { name: "عمر حسن", role: "Team Leader", text: "المجموعة الخاصة بالمتدربين مصدر دعم مستمر، حتى بعد انتهاء المحاضرات." },
// ];

// export function Testimonials() {
//   const locale = useLocale() as 'ar' | 'en';
//   const row = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

//   return (
//     <section id="testimonials" className="scroll-mt-24 overflow-hidden py-20">
//       <header className="mx-auto mb-12 max-w-3xl px-5 text-center">
//         <span className="inline-flex rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary">
//           {locale === 'ar' ?"آراء المتدربين": "Trainee reviews"}
//         </span>
//         <h2 className="mt-4 text-3xl text-navy sm:text-4xl">
//           {locale === 'ar' ?"قصص نجاح حقيقية من متدربينا": "Real success stories from our trainees"}
//         </h2>
//       </header>

//       <div className="group relative overflow-hidden select-none" dir="ltr">
//         <div className="flex w-max animate-marquee gap-5 px-5 group-hover:paused">
//           {row.map((item, i) => (
//             <figure
//               key={i}
//               className="flex w-85 shrink-0 flex-col rounded-[1.4rem] border border-border bg-card p-6 shadow-[0_12px_32px_rgba(7,26,56,.06)]"
//             >
//               <Quote className="size-7 text-primary/25" />
//               <blockquote className="mt-3 flex-1 text-[15px] leading-8 text-muted-foreground">
//                 {item.text}
//               </blockquote>
//               <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
//                 <div className="grid size-11 place-items-center rounded-full surface-navy text-sm font-extrabold text-white">
//                   {item.name.charAt(0)}
//                 </div>
//                 <figcaption className="flex-1">
//                   <strong className="block text-sm text-navy">{item.name}</strong>
//                   <span className="text-xs text-muted-foreground">{item.role}</span>
//                 </figcaption>
//                 <div className="flex gap-0.5">
//                   {Array.from({ length: 5 }).map((_, s) => (
//                     <Star key={s} className="size-3.5 fill-amber-400 text-amber-400" />
//                   ))}
//                 </div>
//               </div>
//             </figure>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { Quote, Star } from "lucide-react";
import { useLocale } from "next-intl";

const testimonials = [
  { name: "محمد الشريف", role: "PMP® Certified – Site Manager", text: "أفضل ما في البرنامج أنه لا يعتمد على الحفظ. تعلّمت كيف أفكر كمدير مشروع، وهذا ما ساعدني في الاختبار وفي عملي." },
  { name: "سارة عبدالله", role: "Project Engineer", text: "المتابعة المستمرة وبنك الأسئلة كانا الفارق الحقيقي. اجتزت اختبار PMP® من أول محاولة بتقدير Above Target." },
  { name: "أحمد يوسف", role: "PMO Specialist", text: "شرح منظم وواقعي، والمهندس عمرو يجيب على كل استفسار بالتفصيل. دورة PMOCP غيّرت طريقة عملي داخل المكتب." },
  { name: "خالد المنصوري", role: "Planning Engineer", text: "دورة RMP كانت عملية جدًا. تدربنا على سجل مخاطر حقيقي وليس مجرد شرائح نظرية." },
  { name: "منى إبراهيم", role: "Construction Manager", text: "الخطة الدراسية واضحة والمراجعات قبل الاختبار ممتازة. أنصح بها كل من يريد الشهادة والفهم معًا." },
  { name: "عمر حسن", role: "Team Leader", text: "المجموعة الخاصة بالمتدربين مصدر دعم مستمر، حتى بعد انتهاء المحاضرات." },
];

export function Testimonials() {
  const locale = useLocale() as 'ar' | 'en';
  const row = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="scroll-mt-24 overflow-hidden py-20">
      <header className="mx-auto mb-12 max-w-3xl px-5 text-center">
        <span className="inline-flex rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary dark:bg-primary/10">
          {locale === 'ar' ?"آراء المتدربين": "Trainee reviews"}
        </span>
        <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
          {locale === 'ar' ?"قصص نجاح حقيقية من متدربينا": "Real success stories from our trainees"}
        </h2>
      </header>

      <div className="group relative overflow-hidden select-none" dir="ltr">
        <div className="flex w-max animate-marquee gap-5 px-5 group-hover:paused">
          {row.map((item, i) => (
            <figure
              key={i}
              className="flex w-85 shrink-0 flex-col rounded-[1.4rem] border border-border bg-card p-6 shadow-[0_12px_32px_rgba(7,26,56,.06)] dark:shadow-none"
            >
              <Quote className="size-7 text-primary/25" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-8 text-muted-foreground">
                {item.text}
              </blockquote>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid size-11 place-items-center rounded-full surface-navy text-sm font-extrabold text-white">
                  {item.name.charAt(0)}
                </div>
                <figcaption className="flex-1">
                  <strong className="block text-sm text-foreground">{item.name}</strong>
                  <span className="text-xs text-muted-foreground">{item.role}</span>
                </figcaption>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}