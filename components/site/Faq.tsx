// 'use client';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import { useLocale } from "next-intl";

// const faqs = [
//   {
//     ar: { q: "هل أحتاج إلى خبرة سابقة للالتحاق بالدورة؟", a: "لا يشترط امتلاك شهادة سابقة أو دراسة أكاديمية في إدارة المشروعات للانضمام إلى الدورة. أما التقديم للاختبار الدولي فيخضع لمتطلبات الأهلية المعتمدة من PMI®، ونساعدك على فهمها أثناء البرنامج." },
//     en: { q: "Do I need prior experience to join?", a: "No prior certificate or academic background is required to join the course. Applying for the international exam follows PMI® eligibility requirements, which we explain during the program." },
//   },
//   {
//     ar: { q: "ما هي لغة الشرح؟", a: "الشرح باللغة العربية مع استخدام المصطلحات الإنجليزية الخاصة بالاختبار، والمادة العلمية متوفرة بالعربية والإنجليزية." },
//     en: { q: "What is the language of instruction?", a: "Sessions are delivered in Arabic with the official English exam terminology, and materials are provided in both languages." },
//   },
//   {
//     ar: { q: "هل المحاضرات مباشرة أم مسجلة؟", a: "المحاضرات أونلاين مباشرة وتفاعلية تشمل الشرح والمناقشة وحل الأسئلة، مع إمكانية الرجوع إلى المواد والملفات التدريبية." },
//     en: { q: "Are the sessions live or recorded?", a: "Sessions are live and interactive, including explanation, discussion and Q&A, with training materials available for review." },
//   },
//   {
//     ar: { q: "هل أحصل على شهادة بعد الدورة؟", a: "نعم، تحصل على شهادة إتمام تدريب بعد استكمال متطلبات البرنامج، وهي تدعم ساعات التعليم المطلوبة للتقديم على الاختبار." },
//     en: { q: "Will I get a certificate?", a: "Yes — a training completion certificate is issued after you complete the program requirements, supporting the contact hours needed for the exam application." },
//   },
//   {
//     ar: { q: "كيف تتم المتابعة بعد انتهاء المحاضرات؟", a: "هناك مجموعة خاصة بالمتدربين للمتابعة والإجابة عن الاستفسارات، بالإضافة إلى خطة مراجعة واختبارات تجريبية حتى موعد الاختبار." },
//     en: { q: "How is follow-up handled after the sessions?", a: "A private trainee group handles questions and follow-up, alongside a review plan and mock exams until your exam date." },
//   },
//   {
//     ar: { q: "كيف أسجّل في الدورة؟", a: "اضغط على زر التسجيل في بطاقة الدورة أو تواصل معنا عبر واتساب، وسيتم إرسال تفاصيل المواعيد وخطوات التسجيل والدفع." },
//     en: { q: "How do I register?", a: "Click enroll on the course card or contact us on WhatsApp, and we'll send the schedule plus registration and payment steps." },
//   },
// ];

// export function Faq() {
//   const locale = useLocale() as 'ar' | 'en';

//   return (
//     <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-24 px-5 py-20" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
//       <header className="mb-10 text-center">
//         <span className="inline-flex rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary">
//           {locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
//         </span>
//         <h2 className="mt-4 text-3xl text-navy sm:text-4xl">
//           {locale === 'ar' ? 'إجابات على أكثر ما يسأل عنه المتدربون' : 'Answers to what trainees ask most'}
//         </h2>
//       </header>

//       {/* تم إضافة as any لتجاوز خطأ الـ TypeScript في خصائص الـ Accordion */}
//       {/* @ts-ignore */}
//       <Accordion type="single"  className="grid gap-3">
//         {faqs.map((item, i) => (
//           <AccordionItem
//             key={i}
//             value={"item-" + i}
//             className="rounded-2xl border border-border bg-card px-5 shadow-[0_8px_24px_rgba(7,26,56,.05)]"
//           >
//             <AccordionTrigger className="py-5 text-start text-base font-extrabold text-navy hover:no-underline">
//               {item[locale].q}
//             </AccordionTrigger>
//             <AccordionContent className="pb-5 text-[15px] leading-8 text-muted-foreground">
//               {item[locale].a}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </section>
//   );
// }


'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useLocale } from "next-intl";

const faqs = [
  {
    ar: { q: "هل أحتاج إلى خبرة سابقة للالتحاق بالدورة؟", a: "لا يشترط امتلاك شهادة سابقة أو دراسة أكاديمية في إدارة المشروعات للانضمام إلى الدورة. أما التقديم للاختبار الدولي فيخضع لمتطلبات الأهلية المعتمدة من PMI®، ونساعدك على فهمها أثناء البرنامج." },
    en: { q: "Do I need prior experience to join?", a: "No prior certificate or academic background is required to join the course. Applying for the international exam follows PMI® eligibility requirements, which we explain during the program." },
  },
  {
    ar: { q: "ما هي لغة الشرح؟", a: "الشرح باللغة العربية مع استخدام المصطلحات الإنجليزية الخاصة بالاختبار، والمادة العلمية متوفرة بالعربية والإنجليزية." },
    en: { q: "What is the language of instruction?", a: "Sessions are delivered in Arabic with the official English exam terminology, and materials are provided in both languages." },
  },
  {
    ar: { q: "هل المحاضرات مباشرة أم مسجلة؟", a: "المحاضرات أونلاين مباشرة وتفاعلية تشمل الشرح والمناقشة وحل الأسئلة، مع إمكانية الرجوع إلى المواد والملفات التدريبية." },
    en: { q: "Are the sessions live or recorded?", a: "Sessions are live and interactive, including explanation, discussion and Q&A, with training materials available for review." },
  },
  {
    ar: { q: "هل أحصل على شهادة بعد الدورة؟", a: "نعم، تحصل على شهادة إتمام تدريب بعد استكمال متطلبات البرنامج، وهي تدعم ساعات التعليم المطلوبة للتقديم على الاختبار." },
    en: { q: "Will I get a certificate?", a: "Yes — a training completion certificate is issued after you complete the program requirements, supporting the contact hours needed for the exam application." },
  },
  {
    ar: { q: "كيف تتم المتابعة بعد انتهاء المحاضرات؟", a: "هناك مجموعة خاصة بالمتدربين للمتابعة والإجابة عن الاستفسارات، بالإضافة إلى خطة مراجعة واختبارات تجريبية حتى موعد الاختبار." },
    en: { q: "How is follow-up handled after the sessions?", a: "A private trainee group handles questions and follow-up, alongside a review plan and mock exams until your exam date." },
  },
  {
    ar: { q: "كيف أسجّل في الدورة؟", a: "اضغط على زر التسجيل في بطاقة الدورة أو تواصل معنا عبر واتساب، وسيتم إرسال تفاصيل المواعيد وخطوات التسجيل والدفع." },
    en: { q: "How do I register?", a: "Click enroll on the course card or contact us on WhatsApp, and we'll send the schedule plus registration and payment steps." },
  },
];

export function Faq() {
  const locale = useLocale() as 'ar' | 'en';

  return (
    <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-24 px-5 py-20" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className="mb-10 text-center">
        <span className="inline-flex rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary dark:bg-primary/10">
          {locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
        </span>
        <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
          {locale === 'ar' ? 'إجابات على أكثر ما يسأل عنه المتدربون' : 'Answers to what trainees ask most'}
        </h2>
      </header>

      {/* @ts-ignore */}
      <Accordion type="single" className="grid gap-3">
        {faqs.map((item, i) => (
          <AccordionItem
            key={i}
            value={"item-" + i}
            className="rounded-2xl border border-border bg-card px-5 shadow-[0_8px_24px_rgba(7,26,56,.05)] dark:shadow-none"
          >
            <AccordionTrigger className="py-5 text-start text-base font-extrabold text-foreground hover:no-underline">
              {item[locale].q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[15px] leading-8 text-muted-foreground">
              {item[locale].a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}