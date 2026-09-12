export type Lesson = { ar: string; en: string; duration: string; preview?: boolean };
export type Section = { ar: string; en: string; lessons: Lesson[] };

export type Course = {
  slug: string;
  code: string;
  status: "active" | "upcoming";
  accent: "purple" | "bronze" | "royal";
  badge: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  short: { ar: string; en: string };
  intro: { ar: string; en: string };
  hours: number;
  students: number;
  rating: number;
  reviewsCount: number;
  features: { ar: string; en: string }[];
  learn: { ar: string; en: string }[];
  audience: { ar: string; en: string }[];
  details: { label: { ar: string; en: string }; value: { ar: string; en: string } }[];
  perks: { ar: string; en: string }[];
  sections: Section[];
  liveSessions: { date: { ar: string; en: string }; time: { ar: string; en: string }; topic: { ar: string; en: string } }[];
  reviews: { name: string; role: string; rating: number; text: { ar: string; en: string } }[];
};

// const commonReviews = (cert: string) => [
//   {
//     name: "محمد الشريف",
//     role: cert + " Certified",
//     rating: 5,
//     text: {
//       ar: "أسلوب شرح واضح جدًا وربط ممتاز بين المنهج والتطبيق العملي. اجتزت الاختبار من أول محاولة.",
//       en: "Very clear explanation style and excellent linkage between theory and practical application. Passed the exam on the first attempt.",
//     },
//   },
//   {
//     name: "سارة عبدالله",
//     role: "Project Engineer",
//     rating: 5,
//     text: {
//       ar: "المتابعة المستمرة وبنك الأسئلة كانا الفارق الحقيقي في استعدادي للاختبار.",
//       en: "Continuous follow-up and the question bank were the real difference in my exam preparation.",
//     },
//   },
//   {
//     name: "أحمد يوسف",
//     role: "PMO Specialist",
//     rating: 4,
//     text: {
//       ar: "محتوى منظم وخطة مراجعة عملية. المحاضرات المباشرة مفيدة جدًا للنقاش وحل الأسئلة.",
//       en: "Organized content and practical review plan. Live sessions are very helpful for discussion and solving questions.",
//     },
//   },
// ];

// export const courses: Course[] = [
//   {
//     slug: "pmp",
//     code: "PMP® EXAM PREPARATION",
//     accent: "purple",
//     status: "active",
//     badge: "/badge-pmp.jpg",
//     title: { ar: "دورة التحضير لاختبار PMP®", en: "PMP® Exam Preparation Course" },
//     subtitle: { ar: "محترف إدارة المشروعات", en: "Project Management Professional" },
//     short: {
//       ar: "تعلّم منهجية إدارة المشروعات، وافهم أسلوب الاختبار، وتدرّب على تحليل المواقف واتخاذ القرار الصحيح بثقة.",
//       en: "Master project management methodology, understand the exam mindset, and practice real decision-making with confidence.",
//     },
//     intro: {
//       ar: "برنامج تدريبي احترافي يساعدك على فهم منهجية إدارة المشروعات والاستعداد لاختبار PMP® من خلال شرح مبسّط، تطبيقات عملية، وأسئلة تحاكي أسلوب الاختبار. تعتمد الدورة على الفهم والتحليل واتخاذ القرار، وليس على الحفظ فقط.",
//       en: "A professional program that prepares you for the PMP® exam through simplified explanation, practical application and exam-style questions — built on understanding and decision-making, not memorisation.",
//     },
//     hours: 35,
//     students: 640,
//     rating: 4.9,
//     reviewsCount: 128,
//     features: [
//       { ar: "35 ساعة تدريبية مباشرة وتفاعلية", en: "35 live interactive training hours" },
//       { ar: "شرح Predictive وAgile وHybrid", en: "Predictive, Agile & Hybrid coverage" },
//       { ar: "بنك أسئلة واختبارات تجريبية", en: "Question bank & mock exams" },
//       { ar: "خطة مراجعة حتى موعد الاختبار", en: "Review plan until your exam date" },
//     ],
//     learn: [
//       { ar: "فهم مبادئ ومفاهيم إدارة المشروعات بصورة واضحة ومنهجية.", en: "Understand project management principles and concepts clearly and systematically." },
//       { ar: "التعامل مع أسئلة اختبار PMP® وتحليل المواقف بطريقة صحيحة.", en: "Handle PMP® exam questions and analyze scenarios correctly." },
//       { ar: "إدارة فرق العمل وأصحاب المصلحة والتواصل داخل المشروع.", en: "Manage teams, stakeholders, and project communication." },
//       { ar: "التعامل مع المخاطر والتغييرات والمشكلات واتخاذ القرارات المناسبة.", en: "Handle risks, changes, issues, and make proper decisions." },
//       { ar: "فهم أساليب العمل Predictive وAgile وHybrid.", en: "Understand Predictive, Agile, and Hybrid working approaches." },
//       { ar: "تطبيق عقلية مدير المشروع على مواقف عملية واقعية.", en: "Apply the project manager mindset to realistic practical situations." },
//       { ar: "وضع خطة واضحة للمذاكرة والمراجعة والاستعداد للاختبار.", en: "Develop a clear plan for studying, reviewing, and exam prep." },
//     ],
//     audience: [
//       { ar: "تعمل داخل مكتب إدارة مشروعات أو تطمح إلى دخول مجال الـPMO.", en: "Working in or aspiring to join a PMO." },
//       { ar: "مدير PMO، عضو فريق PMO، مدير مشروع أو منسق مشروعات.", en: "PMO manager, PMO team member, project manager, or coordinator." },
//       { ar: "تعمل في التخطيط أو الحوكمة أو إدارة المحافظ والبرامج.", en: "Working in planning, governance, or portfolio/program management." },
//       { ar: "مسؤول عن تأسيس مكتب إدارة مشروعات جديد أو تطوير PMO قائم.", en: "Responsible for establishing or developing a PMO." },
//       { ar: "تستعد لاختبار PMI-PMOCP™ وتحتاج إلى خطة واضحة للدراسة والمراجعة.", en: "Preparing for PMI-PMOCP™ exam with clear study plan." },
//     ],
//     details: [
//       { label: { ar: "نظام التدريب", en: "Training System" }, value: { ar: "أونلاين مباشر وتفاعلي", en: "Live & Interactive Online" } },
//       { label: { ar: "لغة الشرح", en: "Language" }, value: { ar: "العربية مع مصطلحات الـPMO الإنجليزية", en: "Arabic with English PMO terminology" } },
//       { label: { ar: "المحاضرات", en: "Lectures" }, value: { ar: "لقاءات مباشرة للشرح والمناقشة", en: "Live sessions for explanation" } },
//       { label: { ar: "التطبيق العملي", en: "Practical App" }, value: { ar: "حالات واقعية على تصميم وتشغيل الـPMO", en: "Real cases on PMO design and operation" } },
//       { label: { ar: "الاختبارات", en: "Tests" }, value: { ar: "أسئلة قصيرة واختبارات تجريبية", en: "Short questions and mock exams" } },
//       { label: { ar: "المتابعة", en: "Follow-up" }, value: { ar: "مستمرة حتى مرحلة الاستعداد للاختبار", en: "Continuous until exam readiness" } },
//     ],
//     perks: [
//       { ar: "مجموعة خاصة بالمتدربين للمتابعة والإجابة عن الاستفسارات.", en: "Dedicated trainees group for inquiries." },
//       { ar: "شهادة إتمام تدريب بعد استكمال متطلبات البرنامج.", en: "Certificate of completion." },
//       { ar: "تطبيقات عملية على تصميم نموذج PMO مناسب للمؤسسة.", en: "Practical applications on PMO design." },
//       { ar: "تدريب على تحديد الخدمات والحوكمة ومؤشرات الأداء.", en: "Training on services, governance, and KPIs." },
//       { ar: "شرح كيفية قياس قيمة الـPMO وعرض أثره على الإدارة العليا.", en: "How to measure PMO value and present it to management." },
//       { ar: "التركيز على بناء عقلية استراتيجية، وليس مجرد إدارة التقارير.", en: "Focus on strategic mindset, not just report management." },
//     ],
//     sections: [
//       {
//         ar: "مقدمة البرنامج وأساسيات إدارة المشروعات",
//         en: "Program intro & PM fundamentals",
//         lessons: [
//           { ar: "التعريف بالبرنامج وخطة الدراسة", en: "Program overview & study plan", duration: "45:00", preview: true },
//           { ar: "مفاهيم المشروع والبرنامج والمحفظة", en: "Project, program & portfolio", duration: "55:00" },
//           { ar: "بيئة المشروع وهياكل المؤسسات", en: "Project environment & structures", duration: "50:00" },
//         ],
//       },
//       {
//         ar: "مجال الأشخاص (People Domain)",
//         en: "People Domain",
//         lessons: [
//           { ar: "بناء الفريق وإدارة الأداء", en: "Team building & performance", duration: "1:10:00" },
//           { ar: "القيادة والتحفيز وحل النزاعات", en: "Leadership, motivation & conflict", duration: "1:05:00" },
//           { ar: "إشراك أصحاب المصلحة والتواصل", en: "Stakeholder engagement", duration: "58:00" },
//         ],
//       },
//       {
//         ar: "مجال العمليات (Process Domain)",
//         en: "Process Domain",
//         lessons: [
//           { ar: "النطاق والجدول الزمني", en: "Scope & schedule", duration: "1:20:00" },
//           { ar: "التكلفة والموارد والمشتريات", en: "Cost, resources & procurement", duration: "1:15:00" },
//           { ar: "الجودة والمخاطر وإدارة التغيير", en: "Quality, risk & change control", duration: "1:12:00" },
//           { ar: "المنهجيات Agile وHybrid", en: "Agile & Hybrid approaches", duration: "1:30:00" },
//         ],
//       },
//       {
//         ar: "بيئة العمل والمراجعة النهائية",
//         en: "Business environment & final review",
//         lessons: [
//           { ar: "الامتثال والقيمة المؤسسية", en: "Compliance & business value", duration: "48:00" },
//           { ar: "استراتيجيات حل أسئلة الاختبار", en: "Exam question strategies", duration: "1:00:00" },
//           { ar: "اختبار تجريبي شامل ومناقشة", en: "Full mock exam & debrief", duration: "2:00:00" },
//         ],
//       },
//     ],
//     liveSessions: [
//       { date: { ar: "الاثنين 14 سبتمبر", en: "Monday, Sep 14" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "دور الـPMO وقيمته المؤسسية", en: "PMO Role & Institutional Value" } },
//       { date: { ar: "الخميس 17 سبتمبر", en: "Thursday, Sep 17" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "العناصر الاستراتيجية", en: "Strategic Elements" } },
//       { date: { ar: "الاثنين 21 سبتمبر", en: "Monday, Sep 21" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "تصميم وهيكلة الـPMO", en: "PMO Design & Structure" } },
//       { date: { ar: "الخميس 24 سبتمبر", en: "Thursday, Sep 24" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "مؤشرات الأداء وقياس القيمة", en: "KPIs & Value Measurement" } },
//     ],
//     reviews: commonReviews("PMP®"),
//   },
//   {
//     slug: "rmp",
//     code: "PMI-RMP® EXAM PREPARATION",
//     accent: "bronze",
//     status: "upcoming",
//     badge: "/badge-rmp.jpg",
//     title: { ar: "دورة التحضير لاختبار PMI-RMP®", en: "PMI-RMP® Exam Preparation Course" },
//     subtitle: { ar: "محترف إدارة مخاطر المشروعات", en: "Risk Management Professional" },
//     short: {
//       ar: "تعلّم كيفية تحديد المخاطر وتحليلها وتطوير الاستجابات المناسبة، قبل أن تتحول حالات عدم اليقين إلى مشكلات.",
//       en: "Learn to identify, analyse and respond to risks before uncertainty turns into real project problems.",
//     },
//     intro: {
//       ar: "برنامج تدريبي احترافي يساعدك على فهم منهجية إدارة المخاطر والاستعداد لاختبار PMI-RMP® من خلال شرح مبسّط وتطبيقات عملية وأسئلة تحاكي الاختبار، مع التركيز على دورة حياة المخاطر واتخاذ القرار.",
//       en: "A professional program covering the full risk lifecycle, preparing you for the PMI-RMP® exam with practical cases and exam-style questions.",
//     },
//     hours: 24,
//     students: 310,
//     rating: 4.8,
//     reviewsCount: 74,
//     features: [
//       { ar: "تحديد المخاطر والفرص وتحليلها", en: "Identify & analyse risks and opportunities" },
//       { ar: "تطبيقات عملية على سجل المخاطر", en: "Hands-on risk register practice" },
//       { ar: "استراتيجيات الاستجابة والمراقبة", en: "Response & monitoring strategies" },
//       { ar: "أسئلة واختبارات تحاكي الامتحان", en: "Exam-simulation question bank" },
//     ],
//     learn: [
//       { ar: "فهم مبادئ ومفاهيم إدارة المخاطر بصورة واضحة ومنهجية.", en: "Understand risk management principles and concepts clearly." },
//       { ar: "تحديد المخاطر والفرص التي قد تؤثر في أهداف المشروع.", en: "Identify risks and opportunities affecting project objectives." },
//       { ar: "تحليل المخاطر باستخدام الأساليب النوعية والكمية.", en: "Analyze risks using qualitative and quantitative methods." },
//       { ar: "إعداد سجل المخاطر وتطوير خطط الاستجابة المناسبة.", en: "Prepare risk register and develop response plans." },
//       { ar: "متابعة المخاطر وقياس فاعلية الاستجابات طوال دورة حياة المشروع.", en: "Monitor risks and measure response effectiveness throughout the project." },
//       { ar: "إشراك أصحاب المصلحة وبناء ثقافة واعية بالمخاطر.", en: "Engage stakeholders and build risk-aware culture." },
//       { ar: "تحليل أسئلة اختبار PMI-RMP® واختيار الإجابة الأنسب.", en: "Analyze PMI-RMP® exam questions and select best answers." },
//     ],
//     audience: [
//       { ar: "تعمل في إدارة المشروعات أو إدارة المخاطر.", en: "Working in project management or risk management." },
//       { ar: "مدير مشروع، مدير مخاطر، مهندس تخطيط، متخصص PMO أو عضو فريق مشروع.", en: "Project manager, risk manager, planning engineer, PMO specialist, or team member." },
//       { ar: "مسؤول عن إعداد سجلات المخاطر أو متابعة خطط الاستجابة.", en: "Responsible for risk registers or monitoring response plans." },
//       { ar: "تستعد لاختبار PMI-RMP® وتحتاج إلى خطة تدريب ومراجعة واضحة.", en: "Preparing for PMI-RMP® exam needing a clear training plan." },
//       { ar: "تسعى إلى بناء مسار مهني متخصص في إدارة مخاطر المشروعات.", en: "Seeking a specialized career path in project risk management." },
//     ],
//     details: [
//       { label: { ar: "نظام التدريب", en: "Training System" }, value: { ar: "أونلاين مباشر وتفاعلي", en: "Live & Interactive Online" } },
//       { label: { ar: "لغة الشرح", en: "Language" }, value: { ar: "العربية مع المصطلحات الإنجليزية", en: "Arabic with English terminology" } },
//       { label: { ar: "المحاضرات", en: "Lectures" }, value: { ar: "لقاءات مباشرة للشرح والمناقشة", en: "Live sessions for explanation & discussion" } },
//       { label: { ar: "التطبيق العملي", en: "Practical App" }, value: { ar: "حالات واقعية وتمارين على المخاطر", en: "Real cases and risk exercises" } },
//       { label: { ar: "الاختبارات", en: "Tests" }, value: { ar: "أسئلة قصيرة واختبارات تجريبية", en: "Short questions and mock exams" } },
//       { label: { ar: "المتابعة", en: "Follow-up" }, value: { ar: "مستمرة حتى مرحلة الاستعداد للاختبار", en: "Continuous until exam readiness" } },
//     ],
//     perks: [
//       { ar: "مجموعة خاصة بالمتدربين للمتابعة والإجابة عن الاستفسارات.", en: "Dedicated trainees group for inquiries." },
//       { ar: "شهادة إتمام تدريب بعد استكمال متطلبات البرنامج.", en: "Certificate of completion." },
//       { ar: "تدريب عملي على إعداد سجل المخاطر وخطط الاستجابة.", en: "Practical training on risk register and responses." },
//       { ar: "مساعدة في فهم خطوات التقديم وحجز اختبار PMI-RMP®.", en: "Assistance with PMI-RMP® application steps." },
//       { ar: "بنك أسئلة باللغة العربية والإنجليزية.", en: "Question bank in Arabic and English." },
//       { ar: "التركيز على بناء عقلية استباقية لإدارة عدم اليقين بثقة.", en: "Focus on proactive mindset to manage uncertainty." },
//     ],
//     sections: [
//       {
//         ar: "أساسيات إدارة المخاطر",
//         en: "Risk management foundations",
//         lessons: [
//           { ar: "مفاهيم المخاطر وعدم اليقين", en: "Risk & uncertainty concepts", duration: "50:00", preview: true },
//           { ar: "استراتيجية المخاطر وتقبّل المخاطرة", en: "Risk strategy & appetite", duration: "45:00" },
//         ],
//       },
//       {
//         ar: "التخطيط وتحديد المخاطر",
//         en: "Planning & risk identification",
//         lessons: [
//           { ar: "إعداد خطة إدارة المخاطر", en: "Risk management plan", duration: "55:00" },
//           { ar: "أساليب تحديد المخاطر", en: "Identification techniques", duration: "1:05:00" },
//           { ar: "بناء سجل المخاطر", en: "Building the risk register", duration: "58:00" },
//         ],
//       },
//       {
//         ar: "التحليل النوعي والكمي",
//         en: "Qualitative & quantitative analysis",
//         lessons: [
//           { ar: "التحليل النوعي ومصفوفة الاحتمال والأثر", en: "Qualitative analysis & P-I matrix", duration: "1:00:00" },
//           { ar: "التحليل الكمي ومحاكاة مونت كارلو", en: "Quantitative analysis & Monte Carlo", duration: "1:15:00" },
//         ],
//       },
//       {
//         ar: "الاستجابة والمراقبة والمراجعة",
//         en: "Response, monitoring & review",
//         lessons: [
//           { ar: "استراتيجيات الاستجابة للتهديدات والفرص", en: "Threat & opportunity responses", duration: "1:05:00" },
//           { ar: "مراقبة المخاطر وقياس الفاعلية", en: "Monitoring & effectiveness", duration: "50:00" },
//           { ar: "مراجعة شاملة واختبار تجريبي", en: "Final review & mock exam", duration: "1:45:00" },
//         ],
//       },
//     ],
//     liveSessions: [
//       { date: { ar: "الأحد 13 سبتمبر", en: "Sunday, Sep 13" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "أساسيات إدارة المخاطر", en: "Risk Management Fundamentals" } },
//       { date: { ar: "الأربعاء 16 سبتمبر", en: "Wednesday, Sep 16" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "تحديد المخاطر وسجل المخاطر", en: "Risk Identification & Register" } },
//       { date: { ar: "الأحد 20 سبتمبر", en: "Sunday, Sep 20" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "التحليل النوعي والكمي", en: "Qualitative & Quantitative Analysis" } },
//       { date: { ar: "الأربعاء 23 سبتمبر", en: "Wednesday, Sep 23" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "خطط الاستجابة والمراقبة", en: "Response Plans & Monitoring" } },
//     ],
//     reviews: commonReviews("PMI-RMP®"),
//   },
//   {
//     slug: "pmocp",
//     code: "PMI-PMOCP™ EXAM PREPARATION",
//     accent: "royal",
//     status: "upcoming",
//     badge: "/badge-pmocp.jpg",
//     title: { ar: "دورة التحضير لاختبار PMI-PMOCP™", en: "PMI-PMOCP™ Exam Preparation Course" },
//     subtitle: { ar: "محترف مكاتب إدارة المشروعات", en: "PMO Certified Professional" },
//     short: {
//       ar: "تعلّم كيفية تأسيس مكتب إدارة المشروعات وتصميمه وتشغيله وقياس أدائه، وربطه باستراتيجية المؤسسة.",
//       en: "Learn to design, run and mature a PMO that delivers real organisational value — not just templates and reports.",
//     },
//     intro: {
//       ar: "برنامج تدريبي احترافي يساعدك على فهم كيفية تأسيس مكاتب إدارة المشروعات وتطويرها وقيادتها، والاستعداد لاختبار PMI-PMOCP™ من خلال شرح منهجي وتطبيقات عملية وأسئلة تحاكي أسلوب الاختبار.",
//       en: "A professional program on establishing, developing and leading PMOs, preparing you for the PMI-PMOCP™ exam with structured content and practical cases.",
//     },
//     hours: 28,
//     students: 190,
//     rating: 4.9,
//     reviewsCount: 46,
//     features: [
//       { ar: "تصميم نموذج PMO مناسب للمؤسسة", en: "Design the right PMO model" },
//       { ar: "الحوكمة والخدمات ومؤشرات الأداء", en: "Governance, services & KPIs" },
//       { ar: "قياس قيمة الـPMO وعرضها للإدارة", en: "Measure & present PMO value" },
//       { ar: "أسئلة واختبارات تحاكي الامتحان", en: "Exam-simulation question bank" },
//     ],
//     learn: [
//       { ar: "فهم أدوار وأنواع مكاتب إدارة المشروعات المختلفة.", en: "Understand PMO roles and types." },
//       { ar: "تقييم احتياجات المؤسسة وتحديد نموذج الـPMO المناسب لها.", en: "Assess organization needs and determine suitable PMO model." },
//       { ar: "ربط أهداف مكتب إدارة المشروعات بالاستراتيجية المؤسسية.", en: "Align PMO objectives with organizational strategy." },
//       { ar: "تصميم الهيكل التنظيمي والحوكمة والصلاحيات والمسؤوليات.", en: "Design organizational structure, governance, and responsibilities." },
//       { ar: "إنشاء مؤشرات الأداء وقياس القيمة التي يقدمها المكتب.", en: "Create KPIs and measure PMO value." },
//       { ar: "إدارة محفظة المبادرات والمشروعات بما يدعم أهداف المؤسسة.", en: "Manage portfolio of initiatives supporting organization goals." },
//       { ar: "تطوير مستوى النضج المؤسسي وتحسين الممارسات باستمرار.", en: "Develop organizational maturity and continuous improvement." },
//     ],
//     audience: [
//       { ar: "تعمل داخل مكتب إدارة مشروعات أو تطمح إلى دخول مجال الـPMO.", en: "Working in or aspiring to join a PMO." },
//       { ar: "مدير PMO، عضو فريق PMO، مدير مشروع أو منسق مشروعات.", en: "PMO manager, PMO team member, project manager, or coordinator." },
//       { ar: "تعمل في التخطيط أو الحوكمة أو إدارة المحافظ والبرامج.", en: "Working in planning, governance, or portfolio/program management." },
//       { ar: "مسؤول عن تأسيس مكتب إدارة مشروعات جديد أو تطوير PMO قائم.", en: "Responsible for establishing or developing a PMO." },
//       { ar: "تستعد لاختبار PMI-PMOCP™ وتحتاج إلى خطة واضحة للدراسة والمراجعة.", en: "Preparing for PMI-PMOCP™ exam with clear study plan." },
//     ],
//     details: [
//       { label: { ar: "نظام التدريب", en: "Training System" }, value: { ar: "أونلاين مباشر وتفاعلي", en: "Live & Interactive Online" } },
//       { label: { ar: "لغة الشرح", en: "Language" }, value: { ar: "العربية مع مصطلحات الـPMO الإنجليزية", en: "Arabic with English PMO terminology" } },
//       { label: { ar: "المحاضرات", en: "Lectures" }, value: { ar: "لقاءات مباشرة للشرح والمناقشة", en: "Live sessions for explanation" } },
//       { label: { ar: "التطبيق العملي", en: "Practical App" }, value: { ar: "حالات واقعية على تصميم وتشغيل الـPMO", en: "Real cases on PMO design and operation" } },
//       { label: { ar: "الاختبارات", en: "Tests" }, value: { ar: "أسئلة قصيرة واختبارات تجريبية", en: "Short questions and mock exams" } },
//       { label: { ar: "المتابعة", en: "Follow-up" }, value: { ar: "مستمرة حتى مرحلة الاستعداد للاختبار", en: "Continuous until exam readiness" } },
//     ],
//     perks: [
//       { ar: "مجموعة خاصة بالمتدربين للمتابعة والإجابة عن الاستفسارات.", en: "Dedicated trainees group for inquiries." },
//       { ar: "شهادة إتمام تدريب بعد استكمال متطلبات البرنامج.", en: "Certificate of completion." },
//       { ar: "تطبيقات عملية على تصميم نموذج PMO مناسب للمؤسسة.", en: "Practical applications on PMO design." },
//       { ar: "تدريب على تحديد الخدمات والحوكمة ومؤشرات الأداء.", en: "Training on services, governance, and KPIs." },
//       { ar: "شرح كيفية قياس قيمة الـPMO وعرض أثره على الإدارة العليا.", en: "How to measure PMO value and present it to management." },
//       { ar: "التركيز على بناء عقلية استراتيجية، وليس مجرد إدارة التقارير.", en: "Focus on strategic mindset, not just report management." },
//     ],
//     sections: [
//       {
//         ar: "التطوير التنظيمي والمواءمة",
//         en: "Organisational development & alignment",
//         lessons: [
//           { ar: "دور الـPMO وأنواعه", en: "PMO roles & types", duration: "55:00", preview: true },
//           { ar: "تقييم احتياجات المؤسسة", en: "Assessing organisational needs", duration: "50:00" },
//         ],
//       },
//       {
//         ar: "العناصر الاستراتيجية للـPMO",
//         en: "Strategic PMO elements",
//         lessons: [
//           { ar: "الرؤية والرسالة ونطاق العمل", en: "Vision, mission & scope", duration: "48:00" },
//           { ar: "ربط الـPMO بالاستراتيجية المؤسسية", en: "Linking PMO to strategy", duration: "1:00:00" },
//         ],
//       },
//       {
//         ar: "تصميم وهيكلة وتشغيل الـPMO",
//         en: "PMO design & operations",
//         lessons: [
//           { ar: "الهيكل التنظيمي والحوكمة", en: "Structure & governance", duration: "1:05:00" },
//           { ar: "تحديد الخدمات وترتيب الأولويات", en: "Services & prioritisation", duration: "58:00" },
//           { ar: "مؤشرات الأداء وقياس القيمة", en: "KPIs & value measurement", duration: "1:10:00" },
//         ],
//       },
//       {
//         ar: "تطوير الفاعلية وقيادة الأشخاص",
//         en: "Effectiveness & people leadership",
//         lessons: [
//           { ar: "النضج المؤسسي والتحسين المستمر", en: "Maturity & continuous improvement", duration: "55:00" },
//           { ar: "أصحاب المصلحة وبناء التأييد", en: "Stakeholders & buy-in", duration: "50:00" },
//           { ar: "مراجعة نهائية واختبار تجريبي", en: "Final review & mock exam", duration: "1:40:00" },
//         ],
//       },
//     ],
//     liveSessions: [
//       { date: { ar: "الاثنين 14 سبتمبر", en: "Monday, Sep 14" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "دور الـPMO وقيمته المؤسسية", en: "PMO Role & Institutional Value" } },
//       { date: { ar: "الخميس 17 سبتمبر", en: "Thursday, Sep 17" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "العناصر الاستراتيجية", en: "Strategic Elements" } },
//       { date: { ar: "الاثنين 21 سبتمبر", en: "Monday, Sep 21" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "تصميم وهيكلة الـPMO", en: "PMO Design & Structure" } },
//       { date: { ar: "الخميس 24 سبتمبر", en: "Thursday, Sep 24" }, time: { ar: "8:00 م - 10:00 م", en: "8:00 PM - 10:00 PM" }, topic: { ar: "مؤشرات الأداء وقياس القيمة", en: "KPIs & Value Measurement" } },
//     ],
//     reviews: commonReviews("PMI-PMOCP™"),
//   },
// ];

// export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const WHATSAPP_URL =
  "https://wa.me/966562023009?text=" +
  encodeURIComponent("مرحبًا، أرغب في التسجيل في احدى دورات PM Mindset");

export const accentVar: Record<Course["accent"], string> = {
  purple: "var(--purple)",
  bronze: "var(--bronze)",
  royal: "var(--royal)",
};