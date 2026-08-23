
// const items = [
//   "PMP®",
//   "PMI-RMP®",
//   "PMI-PMOCP™",
//   "CAPM®",
//   "PMI-ACP®",
//   "PMI-SP®",
//   "PMI-PBA®",
//   "PgMP®",
//   "PfMP®",
//   "Agile & Hybrid",
// ];

// export function CertMarquee() {
//   // تكرار العناصر 4 مرات لضمان عدم انتهاء الشريط أبدًا أثناء الحركة
//   const extendedItems = [...items, ...items, ...items, ...items];

//   return (
//     <div className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-4 w-full ">
//       <div className="flex w-max animate-marquee gap-12 px-5 whitespace-nowrap" dir="ltr">
//         {extendedItems.map((item, i) => (
//           <span
//             key={i}
//             className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90"
//           >
//             <span className="size-1.5 rounded-full bg-white/40" />
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }



const items = [
  "PMP®",
  "PMI-RMP®",
  "PMI-PMOCP™",
  "CAPM®",
  "PMI-ACP®",
  "PMI-SP®",
  "PMI-PBA®",
  "PgMP®",
  "PfMP®",
  "Agile & Hybrid",
];

// export function CertMarquee() {
//   return (
//     <div className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-5 w-full">
//       {/* تدرج جانبي لإخفاء حواف الشريط بشكل فخم */}
//       {/* <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-[var(--navy)] to-transparent" />
//       <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-[var(--navy)] to-transparent" /> */}

//       {/* حاوية الشريط مع تثبيت الاتجاه لمانع أي تداخل */}
//       <div className="flex w-max overflow-hidden select-none" dir="ltr">
//         <div className="flex shrink-0 animate-marquee items-center gap-12 px-6 whitespace-nowrap">
//           {items.map((item, i) => (
//             <span
//               key={`1-${i}`}
//               className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-blue-400"
//             >
//               <span className="size-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400" />
//               {item}
//             </span>
//           ))}
//         </div>
        
//         {/* النسخة المكررة المتطابقة تماماً لتغطية الفراغ */}
//         <div className="flex shrink-0 animate-marquee items-center gap-12 px-6 whitespace-nowrap" aria-hidden="true">
//           {items.map((item, i) => (
//             <span
//               key={`2-${i}`}
//               className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-blue-400"
//             >
//               <span className="size-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400" />
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export function CertMarquee() {
  return (
    <div
      dir="ltr"
      className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-5 w-full"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-navy to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap select-none">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-blue-400"
          >
            <span className="size-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// export function CertMarquee() {
//   return (
//     <div className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-5 w-full">
//       <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-[var(--navy)] to-transparent" />
//       <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-[var(--navy)] to-transparent" />

//       {/* div واحد بيحتوي النسختين ويتحرك هو بس */}
//       <div
//         dir="ltr"
//         style={{ direction: "ltr" }} // يفرض LTR بغض النظر عن أي RTL rule جاي من فوق
//         className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap select-none"
//       >
//         {[...items, ...items, ...items, ...items].map((item, i) => (
//           <span
//             key={i}
//             className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-blue-400"
//           >
//             <span className="size-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400" />
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }


















// const items = [
//   "PMP®",
//   "PMI-RMP®",
//   "PMI-PMOCP™",
//   "CAPM®",
//   "PMI-ACP®",
//   "PMI-SP®",
//   "PMI-PBA®",
//   "PgMP®",
//   "PfMP®",
//   "Agile & Hybrid",
// ];

// export function CertMarquee() {
//   // بنكتفي بنسختين متطابقتين تماماً عشان الـ -50% تكون دقيقة 100% بدون أي فواصل
//   const extendedItems = [...items, ...items, ...items, ...items];

//   return (
//     <div className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-5 w-full">
//       {/* تدرج جانبي لإخفاء حواف الشريط بشكل فخم
//       <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-[var(--navy)] to-transparent" />
//       <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-[var(--navy)] to-transparent" /> */}

//       {/* استخدام flex وعزل الحاوية بـ dir="ltr" لضمان ثبات الحسابات */}
//       <div className="flex w-max" dir="ltr">
//         <div className="flex shrink-0 animate-marquee gap-12 px-6 whitespace-nowrap">
//           {extendedItems.map((item, i) => (
//             <span
//               key={`1-${i}`}
//               className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-blue-400"
//             >
//               <span className="size-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400" />
//               {item}
//             </span>
//           ))}
//         </div>
//         <div className="flex shrink-0 animate-marquee gap-12 px-6 whitespace-nowrap" aria-hidden="true">
//           {extendedItems.map((item, i) => (
//             <span
//               key={`2-${i}`}
//               className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-blue-400"
//             >
//               <span className="size-2 rounded-full bg-blue-400/60 shadow-sm shadow-blue-400" />
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




//////////////////////////////////////////////////////////

// const items = [
//   "PMP®",
//   "PMI-RMP®",
//   "PMI-PMOCP™",
//   "CAPM®",
//   "PMI-ACP®",
//   "PMI-SP®",
//   "PMI-PBA®",
//   "PgMP®",
//   "PfMP®",
//   "Agile & Hybrid",
// ];

// export function CertMarquee() {
//   // تكرار العناصر 4 مرات لضمان وجود محتوى كافٍ طوال فترة الحركة
//   const extendedItems = [...items, ...items, ...items, ...items];

//   return (
//     <div className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-4 w-full">
//       {/* dir="ltr" ضرورية لثبات ترتيب النصوص الإنجليزية، بينما الـ CSS سيتحكم باتجاه السحب */}
//       <div className="animate-marquee gap-10 px-5 whitespace-nowrap" dir="rtl">
//         {extendedItems.map((item, i) => (
//           <span
//             key={i}
//             className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90"
//           >
//             <span className="size-1.5 rounded-full bg-white/40" />
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

















//////////////////////////////////////////////////////////////////////

// const items = [
//   "PMP®",
//   "PMI-RMP®",
//   "PMI-PMOCP™",
//   "CAPM®",
//   "PMI-ACP®",
//   "PMI-SP®",
//   "PMI-PBA®",
//   "PgMP®",
//   "PfMP®",
//   "Agile & Hybrid",
// ];

// export function CertMarquee() {
//   const extendedItems = [...items, ...items, ...items, ...items];

//   return (
//     <div className="surface-navy relative overflow-hidden border-y border-navy-2/40 py-4 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
//       <style>{`
//         @keyframes endlessScroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-75%); }
//         }
//         .marquee-track {
//           display: flex;
//           width: max-content;
//           animation: endlessScroll 30s linear infinite;
//         }
//         .marquee-track:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
      
//       <div className="marquee-track flex gap-10 px-5 whitespace-nowrap" dir="ltr">
//         {extendedItems.map((item, i) => (
//           <span
//             key={i}
//             className="inline-flex shrink-0 items-center gap-3 text-lg font-extrabold tracking-wide text-white/90"
//           >
//             <span className="size-1.5 rounded-full bg-white/40" />
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }