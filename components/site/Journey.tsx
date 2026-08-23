// import { useLocale } from "next-intl";

// const steps = [
//   {
//     ar: { title: "سجّل في الدورة", body: "اختر البرنامج المناسب لهدفك المهني، وأكمل إجراءات التسجيل لتبدأ رحلتك التعليمية معنا بخطة واضحة ومنظمة." },
//     en: { title: "Register for the course", body: "Pick the program that matches your career goal and complete registration to start with a clear, structured plan." },
//   },
//   {
//     ar: { title: "احضر وتعلّم", body: "شارك في المحاضرات وتعلّم المفاهيم الأساسية ومتطلبات الاختبار من خلال شرح عملي يجمع بين المعرفة الأكاديمية والخبرة الواقعية." },
//     en: { title: "Attend and learn", body: "Join the live sessions and learn core concepts and exam requirements through practical, experience-driven teaching." },
//   },
//   {
//     ar: { title: "تدرّب وطبّق", body: "حل الأسئلة والاختبارات القصيرة، وطبّق ما تعلّمته على مواقف عملية تساعدك على فهم منهجية التفكير الصحيحة في الامتحان والعمل." },
//     en: { title: "Practice and apply", body: "Solve quizzes and apply what you learn to real scenarios that build the right thinking for the exam and the job." },
//   },
//   {
//     ar: { title: "راجع واستعد للاختبار", body: "اتبع خطة المراجعة، وحدد نقاط القوة والجوانب التي تحتاج إلى تحسين، وتدرّب على الاختبارات التجريبية حتى تصل إلى مستوى الجاهزية المطلوب." },
//     en: { title: "Review and get ready", body: "Follow the review plan, spot strengths and gaps, and run mock exams until you reach the required readiness level." },
//   },
//   {
//     ar: { title: "احجز الاختبار واجتز الشهادة", body: "أكمل متطلبات التقديم، وحدد موعد الاختبار، وادخل الامتحان بثقة لتحصل على شهادتك المهنية وتبدأ مرحلة جديدة في مسيرتك." },
//     en: { title: "Book the exam and get certified", body: "Complete the application requirements, schedule your exam, and sit it with confidence to earn your professional certification." },
//   },
// ];

// export function Journey() {
//   const locale = useLocale() as 'ar' | 'en';
//   return (
//     <section id="journey" className="surface-navy relative scroll-mt-24 overflow-hidden py-20 text-white">
//       <div className="pointer-events-none absolute -top-32 inset-s-1/2 size-130 -translate-x-1/2 rounded-full bg-white/4" />
//       <div className="relative mx-auto w-full max-w-295 px-5">
//         <header className="mx-auto mb-14 max-w-3xl text-center">
//           <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-white/85">
//             {locale === 'ar' ?"خطوات واضحة" :"A clear path"}
//           </span>
//           <h2 className="mt-4 text-3xl text-white sm:text-4xl">
//             {locale === 'ar' ?"رحلتك معنا من التسجيل إلى الحصول على الشهادة": "Your journey from registration to certification"}
//           </h2>
//         </header>

//         <ol className="grid gap-5">
//           {steps.map((step, i) => (
//             <li
//               key={i}
//               className="group grid gap-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/9 sm:grid-cols-[auto_1fr] sm:items-start sm:p-7"
//             >
//               <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-2xl font-extrabold text-white ring-1 ring-white/20 transition-transform group-hover:scale-105">
//                 {String(i + 1).padStart(2, "0")}
//               </span>
//               <div>
//                 <h3 className="text-xl text-white">{step[locale].title}</h3>
//                 <p className="mt-2 max-w-3xl leading-9 text-white/70">{step[locale].body}</p>
//               </div>
//             </li>
//           ))}
//         </ol>

//         <p className="mt-10 rounded-2xl border border-white/15 bg-white/6 p-6 text-center text-lg font-extrabold leading-9 text-white/90">
//           {locale === 'ar' ?
//             "من التسجيل إلى الشهادة… نرافقك بخطة واضحة، تدريب عملي، ومتابعة مستمرة.":
//             "From registration to certification — a clear plan, practical training and continuous follow-up."
//           }
//         </p>
//       </div>
//     </section>
//   );
// }


// import { useLocale } from "next-intl";

// const steps = [
//   {
//     ar: { title: "سجّل في الدورة", body: "اختر البرنامج المناسب لهدفك المهني، وأكمل إجراءات التسجيل لتبدأ رحلتك التعليمية معنا بخطة واضحة ومنظمة." },
//     en: { title: "Register for the course", body: "Pick the program that matches your career goal and complete registration to start with a clear, structured plan." },
//   },
//   {
//     ar: { title: "احضر وتعلّم", body: "شارك في المحاضرات وتعلّم المفاهيم الأساسية ومتطلبات الاختبار من خلال شرح عملي يجمع بين المعرفة الأكاديمية والخبرة الواقعية." },
//     en: { title: "Attend and learn", body: "Join the live sessions and learn core concepts and exam requirements through practical, experience-driven teaching." },
//   },
//   {
//     ar: { title: "تدرّب وطبّق", body: "حل الأسئلة والاختبارات القصيرة، وطبّق ما تعلّمته على مواقف عملية تساعدك على فهم منهجية التفكير الصحيحة في الامتحان والعمل." },
//     en: { title: "Practice and apply", body: "Solve quizzes and apply what you learn to real scenarios that build the right thinking for the exam and the job." },
//   },
//   {
//     ar: { title: "راجع واستعد للاختبار", body: "اتبع خطة المراجعة، وحدد نقاط القوة والجوانب التي تحتاج إلى تحسين، وتدرّب على الاختبارات التجريبية حتى تصل إلى مستوى الجاهزية المطلوب." },
//     en: { title: "Review and get ready", body: "Follow the review plan, spot strengths and gaps, and run mock exams until you reach the required readiness level." },
//   },
//   {
//     ar: { title: "احجز الاختبار واجتز الشهادة", body: "أكمل متطلبات التقديم، وحدد موعد الاختبار، وادخل الامتحان بثقة لتحصل على شهادتك المهنية وتبدأ مرحلة جديدة في مسيرتك." },
//     en: { title: "Book the exam and get certified", body: "Complete the application requirements, schedule your exam, and sit it with confidence to earn your professional certification." },
//   },
// ];

// export function Journey() {
//   const locale = useLocale() as 'ar' | 'en';
  
//   return (
//     <section id="journey" className="surface-navy relative scroll-mt-24 overflow-hidden py-24 text-white">
//       {/* Background Glow Elements */}
//       <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-blue-600/10 via-indigo-500/10 to-transparent blur-3xl" />

//       <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <header className="mx-auto mb-16 max-w-3xl text-center">
//           <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-blue-300 ring-1 ring-white/15 backdrop-blur-md">
//             <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
//             {locale === 'ar' ? "خطوات واضحة نحو نجاحك" : "A clear path to your success"}
//           </div>
//           <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
//             {locale === 'ar' ? "رحلتك معنا من التسجيل إلى الشهادة" : "Your journey from registration to certification"}
//           </h2>
//         </header>

//         {/* Steps Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {steps.map((step, i) => (
//             <div
//               key={i}
//               className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 ${
//                 i === steps.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
//               }`}
//             >
//               {/* Subtle top light reflection */}
//               <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//               <div className="flex items-center justify-between mb-6">
//                 {/* Step Number with Gradient */}
//                 <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/15 to-white/5 text-xl font-black text-white shadow-inner ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 group-hover:border-blue-400/50">
//                   {String(i + 1).padStart(2, "0")}
//                 </span>
                
//                 {/* Small indicator icon/badge */}
//                 <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
//                   {locale === 'ar' ? `المرحلة ${i + 1}` : `Phase ${i + 1}`}
//                 </span>
//               </div>

//               <div>
//                 <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
//                   {step[locale].title}
//                 </h3>
//                 <p className="mt-3 text-sm leading-relaxed text-white/70">
//                   {step[locale].body}
//                 </p>
//               </div>

//               {/* Bottom decorative corner glow */}
//               <div className="absolute -bottom-10 -right-10 size-32 rounded-full bg-blue-500/5 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15" />
//             </div>
//           ))}
//         </div>

//         {/* Footer Banner */}
//         <div className="mt-12 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-white/[0.08] p-8 text-center backdrop-blur-xl shadow-2xl">
//           <p className="text-base font-medium leading-relaxed text-white/90 sm:text-lg">
//             {locale === 'ar' ?
//               "✨ من التسجيل إلى الشهادة… نرافقك بخطة واضحة، تدريب عملي، ومتابعة مستمرة." :
//               "✨ From registration to certification — a clear plan, practical training and continuous follow-up."
//             }
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }


// import { useLocale } from "next-intl";

// const steps = [
//   {
//     ar: { title: "سجّل في الدورة", body: "اختر البرنامج المناسب لهدفك المهني، وأكمل إجراءات التسجيل لتبدأ رحلتك التعليمية معنا بخطة واضحة ومنظمة." },
//     en: { title: "Register for the course", body: "Pick the program that matches your career goal and complete registration to start with a clear, structured plan." },
//   },
//   {
//     ar: { title: "احضر وتعلّم", body: "شارك في المحاضرات وتعلّم المفاهيم الأساسية ومتطلبات الاختبار من خلال شرح عملي يجمع بين المعرفة الأكاديمية والخبرة الواقعية." },
//     en: { title: "Attend and learn", body: "Join the live sessions and learn core concepts and exam requirements through practical, experience-driven teaching." },
//   },
//   {
//     ar: { title: "تدرّب وطبّق", body: "حل الأسئلة والاختبارات القصيرة، وطبّق ما تعلّمته على مواقف عملية تساعدك على فهم منهجية التفكير الصحيحة في الامتحان والعمل." },
//     en: { title: "Practice and apply", body: "Solve quizzes and apply what you learn to real scenarios that build the right thinking for the exam and the job." },
//   },
//   {
//     ar: { title: "راجع واستعد للاختبار", body: "اتبع خطة المراجعة، وحدد نقاط القوة والجوانب التي تحتاج إلى تحسين، وتدرّب على الاختبارات التجريبية حتى تصل إلى مستوى الجاهزية المطلوب." },
//     en: { title: "Review and get ready", body: "Follow the review plan, spot strengths and gaps, and run mock exams until you reach the required readiness level." },
//   },
//   {
//     ar: { title: "احجز الاختبار واجتز الشهادة", body: "أكمل متطلبات التقديم، وحدد موعد الاختبار، وادخل الامتحان بثقة لتحصل على شهادتك المهنية وتبدأ مرحلة جديدة في مسيرتك." },
//     en: { title: "Book the exam and get certified", body: "Complete the application requirements, schedule your exam, and sit it with confidence to earn your professional certification." },
//   },
// ];

// export function Journey() {
//   const locale = useLocale() as 'ar' | 'en';

//   return (
//     <section id="journey" className="surface-navy relative scroll-mt-24 overflow-hidden py-24 text-white">
//       {/* Background Decorative Glow */}
//       <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />

//       <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
        
//         {/* Header */}
//         <header className="mx-auto mb-20 max-w-2xl text-center">
//           <span className="inline-block mb-3 text-xs font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
//             {locale === 'ar' ? "خريطة طريق احترافية" : "Professional Roadmap"}
//           </span>
//           <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
//             {locale === 'ar' ? "رحلتك معنا من التسجيل إلى الشهادة" : "Your journey from registration to certification"}
//           </h2>
//         </header>

//         {/* Timeline Container */}
//         <div className="relative">
          
//           {/* Vertical Connecting Line */}
//           <div className="absolute top-8 bottom-8 start-7 md:start-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-indigo-500/40 to-white/10 hidden sm:block" />

//           <div className="space-y-12">
//             {steps.map((step, i) => {
//               const isEven = i % 2 === 0;
//               return (
//                 <div 
//                   key={i} 
//                   className={`relative flex flex-col sm:flex-row items-start ${
//                     isEven ? "sm:flex-row-reverse" : ""
//                   } group`}
//                 >
                  
//                   {/* Content Card Side */}
//                   <div className="w-full sm:w-[calc(50%-3rem)] ps-16 sm:ps-0">
//                     <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-white/[0.07] group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                      
//                       {/* Top subtle shine */}
//                       <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
//                       <span className="inline-block text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
//                         {locale === 'ar' ? `المرحلة 0${i + 1}` : `Phase 0${i + 1}`}
//                       </span>
                      
//                       <h3 className="text-xl font-bold text-white mb-2">
//                         {step[locale].title}
//                       </h3>
                      
//                       <p className="text-sm leading-relaxed text-white/70">
//                         {step[locale].body}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Center Node / Icon Marker */}
//                   <div className="absolute start-0 sm:start-1/2 sm:-translate-x-1/2 top-0 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold shadow-lg shadow-blue-600/30 ring-4 ring-[#0b1329] transition-transform duration-300 group-hover:scale-110">
//                     {String(i + 1).padStart(2, "0")}
//                   </div>

//                   {/* Empty Spacer for the opposite side on desktop */}
//                   <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-md">
//             <span className="size-2.5 rounded-full bg-emerald-400 animate-ping" />
//             <p className="text-sm font-semibold text-white/90">
//               {locale === 'ar' ?
//                 "من التسجيل إلى الشهادة… نرافقك بخطة واضحة، تدريب عملي، ومتابعة مستمرة." :
//                 "From registration to certification — a clear plan, practical training and continuous follow-up."
//               }
//             </p>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }





// import { useLocale } from "next-intl";

// const steps = [
//   {
//     ar: { title: "سجّل في الدورة", body: "اختر البرنامج المناسب لهدفك المهني، وأكمل إجراءات التسجيل لتبدأ رحلتك التعليمية معنا." },
//     en: { title: "Register for the course", body: "Pick the program that matches your career goal and complete registration to start your journey." },
//   },
//   {
//     ar: { title: "احضر وتعلّم", body: "شارك في المحاضرات وتعلّم المفاهيم الأساسية ومتطلبات الاختبار بشرح عملي واقعي." },
//     en: { title: "Attend and learn", body: "Join live sessions and learn core concepts through practical, experience-driven teaching." },
//   },
//   {
//     ar: { title: "تدرّب وطبّق", body: "حل الأسئلة والاختبارات، وطبّق ما تعلّمته على مواقف عملية تبني تفكيرك الصحيح." },
//     en: { title: "Practice and apply", body: "Solve quizzes and apply what you learn to real scenarios that build the right mindset." },
//   },
//   {
//     ar: { title: "راجع واستعد", body: "اتبع خطة المراجعة، وحدد نقاط القوة، وتدرّب على الاختبارات التجريبية للجاهزية." },
//     en: { title: "Review and get ready", body: "Follow the review plan, spot gaps, and run mock exams until you reach full readiness." },
//   },
//   {
//     ar: { title: "اجتز الشهادة", body: "أكمل متطلبات التقديم، وحدد موعد الاختبار، وادخل بثقة لتحصل على شهادتك المهنية." },
//     en: { title: "Get certified", body: "Complete requirements, schedule your exam, and sit it with confidence to earn your certificate." },
//   },
// ];

// export function Journey() {
//   const locale = useLocale() as 'ar' | 'en';

//   return (
//     <section id="journey" className="surface-navy relative scroll-mt-24 overflow-hidden py-28 text-white">
//       {/* Background 3D Depth Glows */}
//       <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[900px] rounded-full bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-cyan-500/15 blur-[140px]" />

//       <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <header className="mx-auto mb-20 max-w-3xl text-center">
//           <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-blue-400 ring-1 ring-blue-500/20 backdrop-blur-md">
//             <span className="size-2 rounded-full bg-blue-400 animate-ping" />
//             {locale === 'ar' ? "مسار تفاعلي متكامل" : "Interactive Path"}
//           </div>
//           <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
//             {locale === 'ar' ? "رحلتك معنا خطوة بخطوة" : "Your journey step by step"}
//           </h2>
//         </header>

//         {/* 3D Track Container */}
//         <div className="relative">
          
//           {/* Glowing Path Line (Desktop) */}
//           <div className="hidden lg:block absolute top-[45px] left-12 right-12 h-1 bg-white/10 rounded-full overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 animate-pulse opacity-75" />
//           </div>

//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 relative z-10">
//             {steps.map((step, i) => (
//               <div 
//                 key={i}
//                 className="group relative flex flex-col items-center text-center"
//               >
//                 {/* 3D Node Marker */}
//                 <div className="relative mb-6 flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] p-1 border border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-400 group-hover:shadow-blue-500/30 group-hover:bg-blue-600/20">
                  
//                   {/* Inner Glowing Core */}
//                   <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-blue-600/40 to-indigo-700/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-sm" />
                  
//                   <span className="relative z-10 text-2xl font-black text-white group-hover:scale-110 transition-transform duration-300">
//                     {String(i + 1).padStart(2, "0")}
//                   </span>
//                 </div>

//                 {/* Card Content */}
//                 <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-500/40 group-hover:bg-white/[0.07] group-hover:shadow-xl">
//                   <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
//                     {step[locale].title}
//                   </h3>
//                   <p className="text-xs sm:text-sm leading-relaxed text-white/70">
//                     {step[locale].body}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer Banner */}
//         <div className="mt-16 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-white/[0.08] p-6 text-center backdrop-blur-xl shadow-2xl">
//           <p className="text-sm sm:text-base font-semibold leading-relaxed text-white/90">
//             {locale === 'ar' ?
//               " من التسجيل إلى الشهادة… نرافقك بخطة واضحة، تدريب عملي، ومتابعة مستمرة." :
//               " From registration to certification — a clear plan, practical training and continuous follow-up."
//             }
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }




import { useLocale } from "next-intl";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    ar: { title: "سجّل في الدورة", body: "اختر البرنامج المناسب لهدفك المهني، وأكمل إجراءات التسجيل لتبدأ رحلتك معنا." },
    en: { title: "Register for the course", body: "Pick the program that matches your career goal and complete registration to start." },
  },
  {
    ar: { title: "احضر وتعلّم", body: "شارك في المحاضرات وتعلّم المفاهيم الأساسية ومتطلبات الاختبار بشرح عملي واقعي." },
    en: { title: "Attend and learn", body: "Join live sessions and learn core concepts through practical, experience-driven teaching." },
  },
  {
    ar: { title: "تدرّب وطبّق", body: "حل الأسئلة والاختبارات، وطبّق ما تعلّمته على مواقف عملية تبني تفكيرك الصحيح." },
    en: { title: "Practice and apply", body: "Solve quizzes and apply what you learn to real scenarios that build the right mindset." },
  },
  {
    ar: { title: "راجع واستعد", body: "اتبع خطة المراجعة، وحدد نقاط القوة، وتدرّب على الاختبارات التجريبية للجاهزية." },
    en: { title: "Review and get ready", body: "Follow the review plan, spot gaps, and run mock exams until you reach full readiness." },
  },
  {
    ar: { title: "اجتز الشهادة", body: "أكمل متطلبات التقديم، وحدد موعد الاختبار، وادخل بثقة لتحصل على شهادتك المهنية." },
    en: { title: "Get certified", body: "Complete requirements, schedule your exam, and sit it with confidence to earn your certificate." },
  },
];

export function Journey() {
  const locale = useLocale() as 'ar' | 'en';
  const isRtl = locale === 'ar';

  return (
    <section id="journey" className="surface-navy relative scroll-mt-24 overflow-hidden py-32 text-white">
      
      {/* 🔮 هالات إضاءة خلفية دائرية فاخرة (Backdrop Ambient Lighting) */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-125 w-125 rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-125 w-125 rounded-full bg-purple-600/20 blur-[150px]" />
      
      {/* شبكة خلفية هندسية مضافة بخفة */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header - العناوين */}
        <header className="mx-auto mb-24 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-xs font-black tracking-widest text-blue-300 uppercase shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-xl">
            <span className="size-2 rounded-full bg-blue-400 animate-ping" />
            {isRtl ? "خريطة الطريق للشهادة" : "Interactive Roadmap"}
          </span>
          
          <h2 className="mt-6 text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-slate-400 sm:text-5xl leading-tight">
            {isRtl ? "رحلتك نحو النجاح بخطوات مدروسة" : "Your Step-by-Step Path to Success"}
          </h2>
        </header>

        {/* 🚀 3D Container & Glowing Beam Track */}
        <div className="relative">
          
          {/* خط المسار المشع بالليزر (للشاشات الكبيرة) */}
          <div className="hidden lg:block absolute top-13 left-[8%] right-[8%] h-0.75 bg-slate-800 rounded-full z-0 overflow-hidden">
            {/* الشعاع المضيء المتحرك */}
            <div className="h-full w-full bg-linear-to-r from-transparent via-blue-500 to-cyan-400 animate-[pulse_3s_ease-in-out_infinite]" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 relative z-10">
            {steps.map((step, i) => (
              <div 
                key={i}
                className="group relative flex flex-col items-center text-center perspective-1000"
              >
                {/* 1. النود الهندسية ثلاثية الأبعاد (3D Glass Node Marker) */}
                <div className="relative mb-8 flex size-24 items-center justify-center rounded-2xl bg-linear-to-b from-white/15 to-white/5 p-px shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-3">
                  
                  {/* الحدود المضيئة عند الهوفر */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-400 via-indigo-500 to-cyan-400 opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  
                  <div className="relative flex size-full items-center justify-center rounded-2xl bg-[#091429]/90 backdrop-blur-2xl transition-colors duration-500 group-hover:bg-[#0d1d3a]">
                    
                    {/* رقم الخطوة بتأثير 3D Gradient */}
                    <span className="text-3xl font-black bg-linear-to-br from-white via-blue-100 to-blue-400 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">
                      0{i + 1}
                    </span>

                    {/* أيقونة إنجاز صغيرة في الزاوية */}
                    <div className="absolute -bottom-2 -inset-e-2 grid size-7 place-items-center rounded-full bg-blue-600 text-white shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                      <CheckCircle2 className="size-4" />
                    </div>
                  </div>
                </div>

                {/* 2. بطاقة المحتوى الفاخرة ذات الظلال والعمق (3D Tilt Card Effect) */}
                <div className="relative w-full flex-1 rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.07] to-white/2 p-6 backdrop-blur-xl transition-all duration-500 group-hover:border-blue-400/40 group-hover:bg-linear-to-b group-hover:from-white/12 group-hover:to-white/4 group-hover:shadow-[0_20px_50px_rgba(8,112,184,0.2)]">
                  
                  {/* خط التوهج العلوي للكارد */}
                  <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {step[locale].title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300/80 font-medium">
                    {step[locale].body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 البانر السفلي بتنسيق كبسولة مستقبلية */}
        <div className="mt-20 relative overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-r from-blue-950/40 via-indigo-950/30 to-blue-950/40 p-8 text-center backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 h-32 w-32 bg-blue-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 h-32 w-32 bg-indigo-500/20 blur-2xl" />
          
          <p className="relative z-10 flex items-center justify-center gap-3 text-base sm:text-lg font-bold text-slate-100">
            <span>
              {isRtl ?
                "من أول يوم تسجيل وحتى استلام الشهادة… نرافقك بخطة واضحة وتطبيق عملي ومتابعة شخصية." :
                "From initial sign-up to earned certification — guided by clear strategy and active mentorship."
              }
            </span>
            {isRtl ? (
              <ArrowLeft className="hidden sm:inline-block size-5 text-blue-400 animate-pulse" />
            ) : (
              <ArrowRight className="hidden sm:inline-block size-5 text-blue-400 animate-pulse" />
            )}
          </p>
        </div>

      </div>
    </section>
  );
}