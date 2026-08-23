import { createClient } from "@/utils/supabase/server";
import { getCourses } from "./actions";
import { Hero } from "@/components/site/Hero";
import { CertMarquee } from "@/components/site/CertMarquee";
import { CoursesSection } from "@/components/site/CoursesSection";
import { Faq } from "@/components/site/Faq";
import { Instructor } from "@/components/site/Instructor";
import { Journey } from "@/components/site/Journey";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";



export default async function Page() {
  // const t = await getTranslations("HomePage");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
const courses = await getCourses();
  return (
     <div className="min-h-screen">
      <main>
        <Hero user={user} />
        <CertMarquee />
        <CoursesSection courses={courses}/>
        <Journey />
        <Instructor />
        <Testimonials />
        <Faq />
      </main>
      <Footer courses={courses} />
    </div>
  );
}







// <div className="min-h-screen bg-white text-slate-900">
//       {/* HERO SECTION */}
//       <section className="py-16 sm:py-24 lg:py-28 border-b border-slate-100">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
//           <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
//             {/* 1. النصوص والـ CTA */}
//             <div className="flex flex-col items-start text-start space-y-6">
              
        
//               {/* العنوان الرئيسي */}
//               <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15]">
//                 {t("hero.title")}
//               </h1>

//       {/* Badge بسيطة ورقيقة */}
//               <div className="inline-flex items-center gap-2   px-3.5 py-1 text-s font-semibold ">
//                 {t("hero.subtitle")}
//               </div>

//               {/* الوصف */}
//               <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
//                 {t("hero.description")}
//               </p>

//               {/* الأزرار */}
//               <div className="pt-2 flex flex-wrap items-center gap-3 w-full sm:w-auto">
//                 {/* <button className="w-full sm:w-auto rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800">
//                  {t("hero.startNow")}
//                 </button> */}
//                 <LoginButton title={t("hero.startNow")} />
               
//               </div>

//             </div>

//             {/* 2. البانر */}
//             <div className="flex justify-center items-center">
              
//                 <img
//                   src="/banner.png"
//                   alt="Hero Banner"
//                   className="w-full h-auto max-w-full object-contain mx-auto rounded-lg"
//                 />
              
//             </div>

//           </div>
//         </div>
//       </section>

     

//     </div>