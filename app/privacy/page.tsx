import { PrivacyClientLayout } from "./clientcomponent";
import { PrivacyHeader } from "./servercomponents";
import { LegalSection } from "../terms/servercomponents";
import { getLocale } from "next-intl/server";


export default async function PrivacyPage() {
   const locale = await getLocale() as 'ar' | 'en';


  const toc = [
    { id: "information-we-collect", label: locale === "ar" ? "1. البيانات التي نجمعها" : "1. Information We Collect" },
    { id: "how-we-use-data", label: locale === "ar" ? "2. كيفية استخدام البيانات" : "2. How We Use Your Data" },
    { id: "data-security", label: locale === "ar" ? "3. أمان وحفظ البيانات" : "3. Data Security & Storage" },
    { id: "cookies", label: locale === "ar" ? "4. ملفات الكوكيز والتتبع" : "4. Cookies & Tracking" },
    { id: "your-rights", label: locale === "ar" ? "5. حقوقك وحمايتها" : "5. Your Rights & Data Control" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={locale === "ar" ? "rtl" : "ltr"}>
      <PrivacyHeader
        title={locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        description={
          locale === "ar"
            ? "نحن نأخذ خصوصية متعلمينا بجدية. تشرح هذه السياسة البيانات التي نجمعها وكيفية التحكم بها."
            : "We take the privacy of our learners seriously. This policy explains what data we collect, why we collect it, and the controls you have over it."
        }
       lastUpdated={locale === "ar" ? "29 أغسطس 2026" : "August 29, 2026"}
        locale={locale}
      />

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <PrivacyClientLayout
          toc={toc}
          locale={locale}
          summary={
            <p>
              {locale === "ar"
                ? "نحن نجمع الحد الأدنى من البيانات اللازمة لتقديم الدورات وتتبع شهاداتك وضمان أمان حسابك."
                : "We collect the minimum data needed to deliver your courses, track your certification progress, and keep your account secure."}
            </p>
          }
        >
          <LegalSection
            id="information-we-collect"
            title={locale === "ar" ? "1. البيانات التي نجمعها" : "1. Information We Collect"}
          >
            <p>
              {locale === "ar"
                ? "لتشغيل المنصة وتوثيق إنجازاتك، نجمع البيانات الأساسية مثل الاسم والبريد الإلكتروني وتفاصيل التقدم."
                : "To operate the platform and certify your achievements, we collect basic details, account data, and video progress."}
            </p>
          </LegalSection>

          <LegalSection
            id="how-we-use-data"
            title={locale === "ar" ? "2. كيفية استخدام البيانات" : "2. How We Use Your Data"}
          >
            <p>
              {locale === "ar"
                ? "تُستخدم معلوماتك حصرياً لتشغيل وتحسين تجربة التعليم، ولن يتم بيع بياناتك لأي طرف ثالث."
                : "Your information is used strictly to operate and improve the learning experience. We do not sell your data."}
            </p>
          </LegalSection>

          <LegalSection
            id="data-security"
            title={locale === "ar" ? "3. أمان وحفظ البيانات" : "3. Data Security & Storage"}
          >
            <p>
              {locale === "ar"
                ? "تعمل المنصة على بنية تحتية آمنة مع تشفير كافة البيانات أثناء النقل والحفظ."
                : "Our platform runs on enterprise-grade infrastructure with encrypted data in transit and at rest."}
            </p>
          </LegalSection>

          <LegalSection
            id="cookies"
            title={locale === "ar" ? "4. ملفات الكوكيز والتتبع" : "4. Cookies & Tracking"}
          >
            <p>
              {locale === "ar"
                ? "نستخدم حزمة محدودة جداً من الجلسات وملفات تعريف الارتباط لإبقاء تسجيل دخولك وتفضيلاتك قائمة."
                : "We use a minimal set of cookies and browser storage for session management and preference storage."}
            </p>
          </LegalSection>

          <LegalSection
            id="your-rights"
            title={locale === "ar" ? "5. حقوقك وحمايتها" : "5. Your Rights & Data Control"}
          >
            <p>
              {locale === "ar"
                ? "يمكنك طلب تصدير كافة بياناتك أو حذفها في أي وقت عن طريق التواصل معنا."
                : "You remain in control of your personal data and may request export or deletion at any time."}
            </p>
          </LegalSection>
        </PrivacyClientLayout>
      </main>
    </div>
  );
}