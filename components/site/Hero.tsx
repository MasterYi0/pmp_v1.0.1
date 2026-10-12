
// 'use client';
// import { ArrowLeft, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useLocale } from "next-intl";
// import { User } from "@supabase/supabase-js";

// export function Hero({ user }: { user: User | null }) {
//   const locale = useLocale() as 'ar' | 'en';

//   return (
//     <section className="relative overflow-hidden">
//       <div className="pointer-events-none absolute inset-x-0 -top-40 h-105 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_62%)]" />
//       <div className="relative mx-auto grid w-full max-w-295 items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.15fr_.85fr] lg:pb-24 lg:pt-20">
//         <div className="text-center lg:text-start">
//           <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary">
//             <Sparkles className="size-4" />
//             {locale === 'ar' ? "منصة PM Mindset التدريبية" : "PM Mindset Training Platform"}
//           </span>

//           <h1 className="mt-5 text-4xl leading-tight text-navy sm:text-5xl lg:text-[3.4rem]">
//             {locale === 'ar' ? "ابدأ رحلتك نحو شهادة " : "Start your journey to "}
//             <span className="text-primary">PMP</span>
//             <br />
//             {locale === 'ar' ? "وابنِ عقلية القائد" : "and build the leader's mindset"}
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-muted-foreground lg:mx-0">
//             {locale === 'ar' ?
//               "تدريب عملي متكامل يجمع بين متطلبات الاختبار والممارسات الواقعية، لإعدادك ليس فقط للحصول على الشهادة، بل لامتلاك المعرفة والمهارات والعقلية اللازمة لإدارة المشروعات، واتخاذ القرارات، وقيادة الفرق باحتراف." :
//               "Integrated practical training that blends exam requirements with real-world practice — so you gain not just the certificate, but the knowledge, skills and mindset to manage projects, make decisions and lead teams professionally."
//             }
//           </p>

//           <p className="mt-4 text-base font-extrabold text-navy">
//             {locale === 'ar' ?
//               "الشهادة هي البداية… والعقلية الاحترافية هي ما يصنع مسيرتك." :
//               "The certificate is the beginning — the professional mindset makes your career."
//             }
//             <br />
//             <span className="text-muted-foreground">
//               {locale === 'ar' ?
//                 "تعلّم لتنجح في الاختبار… وتطوّر لتقود في الواقع." :
//                 "Learn to pass the exam — grow to lead in reality."
//               }
//             </span>
//           </p>

//           {/* أزرار الهيرو المعدلة بدون asChild */}
//           {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
//             <Button 
//               size="lg" 
//               className="h-13 rounded-2xl px-7 text-base font-extrabold shadow-lg shadow-primary/25 gap-2"
//               onClick={() => {
//                 const element = document.getElementById("courses");
//                 element?.scrollIntoView({ behavior: "smooth" });
//               }}
//             >
//               {locale === 'ar' ? "ابدأ الآن" : "Get started"}
//               <ArrowLeft className="size-5 rtl:rotate-0 ltr:rotate-180" />
//             </Button>
            
//             <Button 
//               size="lg" 
//               variant="outline" 
//               className="h-13 rounded-2xl px-7 text-base font-extrabold"
//               onClick={() => {
//                 const element = document.getElementById("journey");
//                 element?.scrollIntoView({ behavior: "smooth" });
//               }}
//             >
//               {locale === 'ar' ? "تعرّف على الرحلة" : "See the journey"}
//             </Button>
//           </div> */}

//          {!user ? (
//                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
//             <Button 
//               size="lg" 
//               className="h-13 rounded-2xl px-7 text-base font-extrabold shadow-lg shadow-primary/25 gap-2"
//               onClick={() => {
//                 const element = document.getElementById("courses");
//                 element?.scrollIntoView({ behavior: "smooth" });
//               }}
//             >
//               {locale === 'ar' ? "ابدأ الآن" : "Get started"}
//               <ArrowLeft className="size-5 rtl:rotate-0 ltr:rotate-180" />
//             </Button>
            
//             <Button 
//               size="lg" 
//               variant="outline" 
//               className="h-13 rounded-2xl px-7 text-base font-extrabold"
//               onClick={() => {
//                 const element = document.getElementById("journey");
//                 element?.scrollIntoView({ behavior: "smooth" });
//               }}
//             >
//               {locale === 'ar' ? "تعرّف على الرحلة" : "See the journey"}
//             </Button>
//           </div> 
//                   ):(<div></div>)
//                 }
        

//           <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
//             {[
//               { v: "13+", l: locale === 'ar' ? "سنة خبرة عملية" : "Years of experience" },
//               { v: "1000+", l: locale === 'ar' ? "متدرب" : "Trainees" },
//               { v: "3", l: locale === 'ar' ? "شهادات دولية" : "Global certifications" },
//             ].map((s) => (
//               <div key={s.l}>
//                 <div className="text-3xl font-extrabold text-navy">{s.v}</div>
//                 <div className="text-sm text-muted-foreground">{s.l}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="relative mx-auto w-full max-w-md">
//           <div className="absolute inset-0 -rotate-6 rounded-[2.5rem] surface-navy opacity-90" />
//           <div className="relative rounded-[2.5rem] border border-border bg-card p-10 text-center shadow-2xl shadow-navy/10">
//             <img
//               src="/banner.png"
//               alt="PM Mindset logo"
//               className="mx-auto size-90 object-contain"
//               width={276}
//               height={276}
//             />
//             {/* <h2 className="mt-4 text-2xl text-navy">PM Mindset</h2>
//             <p className="mt-2 text-sm font-bold text-primary">
//               PMP® · PMI-RMP® · PMI-PMOCP™
//             </p>
//             <p className="mt-3 text-sm leading-8 text-muted-foreground">
//               {locale === 'ar' ?
//                 "برامج تحضير احترافية أونلاين مباشرة، بإشراف مدرب معتمد من PMI." :
//                 "Live online preparation programs led by a PMI authorised instructor."}
//             </p> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
/////////////////////////// old code worked
// 'use client';
// import { ArrowLeft, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useLocale } from "next-intl";
// import { User } from "@supabase/supabase-js";

// export function Hero({ user }: { user: User | null }) {
//   const locale = useLocale() as 'ar' | 'en';

//   return (
//     <section className="relative overflow-hidden">
//       <div className="pointer-events-none absolute inset-x-0 -top-40 h-105 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_62%)]" />
//       <div className="relative mx-auto grid w-full max-w-295 items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.15fr_.85fr] lg:pb-24 lg:pt-20">
//         <div className="text-center lg:text-start">
//           <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary">
//             <Sparkles className="size-4" />
//             {locale === 'ar' ? "منصة PM Mindset التدريبية" : "PM Mindset Training Platform"}
//           </span>

//           <h1 className="mt-5 text-4xl leading-tight text-navy sm:text-5xl lg:text-[3.4rem]">
//             {locale === 'ar' ? "ابدأ رحلتك نحو شهادة " : "Start your journey to "}
//             <span className="text-primary">PMP®</span>
//             <br />
//             {locale === 'ar' ? "وابنِ عقلية القائد" : "and build the leader's mindset"}
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-muted-foreground lg:mx-0">
//             {locale === 'ar' ?
//               "تدريب عملي متكامل يجمع بين متطلبات الاختبار والممارسات الواقعية، لإعدادك ليس فقط للحصول على الشهادة، بل لامتلاك المعرفة والمهارات والعقلية اللازمة لإدارة المشروعات، واتخاذ القرارات، وقيادة الفرق باحتراف." :
//               "Integrated practical training that blends exam requirements with real-world practice — so you gain not just the certificate, but the knowledge, skills and mindset to manage projects, make decisions and lead teams professionally."
//             }
//           </p>

//           <p className="mt-4 text-base font-extrabold text-navy">
//             {locale === 'ar' ?
//               "الشهادة هي البداية… والعقلية الاحترافية هي ما يصنع مسيرتك." :
//               "The certificate is the beginning — the professional mindset makes your career."
//             }
//             <br />
//             <span className="text-muted-foreground">
//               {locale === 'ar' ?
//                 "تعلّم لتنجح في الاختبار… وتطوّر لتقود في الواقع." :
//                 "Learn to pass the exam — grow to lead in reality."
//               }
//             </span>
//           </p>

//           {!user ? (
//             <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
//               <Button 
//                 size="lg" 
//                 className="h-13 rounded-2xl px-7 text-base font-extrabold shadow-lg shadow-primary/25 gap-2"
//                 onClick={() => {
//                   const element = document.getElementById("courses");
//                   element?.scrollIntoView({ behavior: "smooth" });
//                 }}
//               >
//                 {locale === 'ar' ? "ابدأ الآن" : "Get started"}
//                 <ArrowLeft className="size-5 rtl:rotate-0 ltr:rotate-180" />
//               </Button>
              
//               <Button 
//                 size="lg" 
//                 variant="outline" 
//                 className="h-13 rounded-2xl px-7 text-base font-extrabold"
//                 onClick={() => {
//                   const element = document.getElementById("journey");
//                   element?.scrollIntoView({ behavior: "smooth" });
//                 }}
//               >
//                 {locale === 'ar' ? "تعرّف على الرحلة" : "See the journey"}
//               </Button>
//             </div> 
//           ) : (
//             <div></div>
//           )}

//           <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
//             {[
//               { v: "13+", l: locale === 'ar' ? "سنة خبرة عملية" : "Years of experience" },
//               { v: "1000+", l: locale === 'ar' ? "متدرب" : "Trainees" },
//               { v: "3", l: locale === 'ar' ? "شهادات دولية" : "Global certifications" },
//             ].map((s) => (
//               <div key={s.l}>
//                 <div className="text-3xl font-extrabold text-navy">{s.v}</div>
//                 <div className="text-sm text-muted-foreground">{s.l}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* تم إزالة المربعات والخلفيات وعرض البانر بحجم أكبر */}
//         <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
//           <img
//             src="/banner.png"
//             alt="PM Mindset logo"
//             className="w-full max-w-[450px] object-contain drop-shadow-xl"
//             width={450}
//             height={450}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

////////////////////////// old code //////////////////////////
/////////////////// new code //////////////////////////////
'use client';
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { User } from "@supabase/supabase-js";

export function Hero({ user }: { user: User | null }) {
  const locale = useLocale() as 'ar' | 'en';
  // const currentTheme = 
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-105 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand)_18%,transparent),transparent_62%)]" />
      <div className="relative mx-auto grid w-full max-w-295 items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.15fr_.85fr] lg:pb-24 lg:pt-20">
        <div className="text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-extrabold text-primary dark:bg-primary/10">
            <Sparkles className="size-4" />
            {locale === 'ar' ? "منصة PM Mindset التدريبية" : "PM Mindset Training Platform"}
          </span>

          <h1 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            {locale === 'ar' ? "ابدأ رحلتك نحو شهادة " : "Start your journey to "}
            <span className="text-primary">PMP®</span>
            <br />
            {locale === 'ar' ? "وابنِ عقلية القائد" : "and build the leader's mindset"}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-loose text-muted-foreground lg:mx-0">
            {locale === 'ar' ?
              "تدريب عملي متكامل يجمع بين متطلبات الاختبار والممارسات الواقعية، لإعدادك ليس فقط للحصول على الشهادة، بل لامتلاك المعرفة والمهارات والعقلية اللازمة لإدارة المشروعات، واتخاذ القرارات، وقيادة الفرق باحتراف." :
              "Integrated practical training that blends exam requirements with real-world practice — so you gain not just the certificate, but the knowledge, skills and mindset to manage projects, make decisions and lead teams professionally."
            }
          </p>

          <p className="mt-4 text-base font-extrabold text-foreground">
            {locale === 'ar' ?
              "الشهادة هي البداية… والعقلية الاحترافية هي ما يصنع مسيرتك." :
              "The certificate is the beginning — the professional mindset makes your career."
            }
            <br />
            <span className="text-muted-foreground">
              {locale === 'ar' ?
                "تعلّم لتنجح في الاختبار… وتطوّر لتقود في الواقع." :
                "Learn to pass the exam — grow to lead in reality."
              }
            </span>
          </p>

          {!user ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button 
                size="lg" 
                className="h-13 rounded-2xl px-7 text-base font-extrabold shadow-lg shadow-primary/25 gap-2 text-primary-foreground"
                onClick={() => {
                  const element = document.getElementById("courses");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {locale === 'ar' ? "ابدأ الآن" : "Get started"}
                <ArrowLeft className="size-5 rtl:rotate-0 ltr:rotate-180" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="h-13 rounded-2xl px-7 text-base font-extrabold"
                onClick={() => {
                  const element = document.getElementById("journey");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {locale === 'ar' ? "تعرّف على الرحلة" : "See the journey"}
              </Button>
            </div> 
          ) : (
            <div></div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
            {[
              { v: "13+", l: locale === 'ar' ? "سنة خبرة عملية" : "Years of experience" },
              { v: "1000+", l: locale === 'ar' ? "متدرب" : "Trainees" },
              { v: "3", l: locale === 'ar' ? "شهادات دولية" : "Global certifications" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-extrabold text-foreground">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
  {/* {locale === 'ar' ? (
            
          ): (
           
          )} */}
        {/* <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
        
          <img
            src="/banner.png"
            alt="PM Mindset logo"
            className="w-full max-w-112.5 object-contain drop-shadow-xl"
            width={450}
            height={450}
          />
        </div> */}
<div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
  {/* صورة الوضع الفاتح (تختفي في الدارك) */}
  <img
    src="/banner.png"
    alt="PM Mindset logo"
    className="w-full max-w-112.5 object-contain drop-shadow-xl dark:hidden"
    width={450}
    height={450}
  />
  
  {/* صورة الوضع المظلم (تظهر فقط في الدارك) */}
  <img
    src="/bannerL.png"
    alt="PM Mindset logo"
    className="hidden w-full max-w-112.5 object-contain drop-shadow-xl dark:block"
    width={450}
    height={450}
  />
</div>

      </div>
    </section>
  );
}