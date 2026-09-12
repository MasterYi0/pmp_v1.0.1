import { Course } from "@/utils/outher/courses";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";


interface CoursesSectionProps {
  courses: Course[];
}

export function Footer({ courses }: CoursesSectionProps) {
  const locale = useLocale() as 'ar' | 'en';

  return (
    <footer className="surface-navy mt-8 text-white">
      <div className="mx-auto grid w-full max-w-295 gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/banner.png" alt="PM Mindset" width={48} height={48} className="size-12 object-contain" loading="lazy" />
            <span className="text-lg font-extrabold">PM Mindset</span>
          </div>
          <p className="mt-4 text-sm leading-8 text-white/65">
            {locale === 'ar' ?
              "منصة تدريبية متخصصة في إعداد محترفي إدارة المشروعات للشهادات الدولية وبناء العقلية القيادية.":
              "A training platform specialised in preparing project professionals for global certifications and building a leadership mindset."
            }
          </p>
        </div>

        <div>
          <h3 className="text-base text-white">{locale === 'ar' ?"الدورات": "Courses"}</h3>
         <ul className="mt-4 grid gap-2.5 text-sm text-white/65">
  {courses.map((c) => {
    // التحقق مما إذا كان الكورس نشطاً
    const isActive = c.status === 'active';

    return (
      <li key={c.slug}>
        {isActive ? (
          // لو اكتف: يظهر كـ Link طبيعي قابل للضغط
          <Link href={`/courses/${c.slug}`} className="hover:text-white transition-colors">
            {c.title[locale]}
          </Link>
        ) : (
          // لو مش اكتف: يظهر كنص عادي وبشكل باهت شوية مثلاً من غير ما يدعم الضغط
          <span className="text-white/45 cursor-not-allowed select-none">
            {c.title[locale]} <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">({locale === 'ar' ? 'قريباً' : 'Soon'})</span>
          </span>
        )}
      </li>
    );
  })}
</ul>
        </div>

        <div>
          <h3 className="text-base text-white">{locale === 'ar' ?"روابط مهمة":"Important links"}</h3>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/65">
            <li><Link href="/privacy" className="hover:text-white">{locale === 'ar' ?"سياسة الخصوصية":"Privacy policy"}</Link></li>
            <li><Link href="/terms" className="hover:text-white">{locale === 'ar' ?"الشروط والأحكام": "Terms & conditions"}</Link></li>
            <li><a href="/#instructor" className="hover:text-white">{locale === 'ar' ?"عن المنصة":"About us"}</a></li>
            <li><a href="/#faq" className="hover:text-white">{locale === 'ar' ?"الأسئلة الشائعة": "FAQ"}</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base text-white">{locale === 'ar' ?"تواصل معنا": "Contact"}</h3>
          <ul className="mt-4 grid gap-3 text-sm text-white/65">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0" />
              <a href="mailto:info@pmmindset.com" dir="ltr" className="hover:text-white">info@pmmindset.com</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0" />
              <a href="tel:+201000000000" dir="ltr" className="hover:text-white">+20 100 000 0000</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0" />
              {locale === 'ar' ?"القاهرة، مصر — تدريب أونلاين": "Cairo, Egypt — online training"}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} PM Mindset. {locale === 'ar' ?"جميع الحقوق محفوظة.": "All rights reserved."}
      </div>
    </footer>
  );
}