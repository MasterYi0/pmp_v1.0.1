import { getLocale } from "next-intl/server";
import { TermsClientLayout } from "./clientcomponent";
import { TermsHeader, LegalSection } from "./servercomponents";


export default async function TermsPage() {
  const locale = await getLocale() as 'ar' | 'en';

  const toc = [
    { id: "acceptance", label: locale === "ar" ? "1. القبول بالشروط" : "1. Acceptance of Terms" },
    { id: "intellectual-property", label: locale === "ar" ? "2. حقوق الملكية الفكرية" : "2. Intellectual Property" },
    { id: "accounts-security", label: locale === "ar" ? "3. حسابات المستخدمين والأمان" : "3. User Accounts & Security" },
    { id: "certification-disclaimer", label: locale === "ar" ? "4. إخلاء مسؤولية الشهادات" : "4. Certification Disclaimer" },
    { id: "payments-refunds", label: locale === "ar" ? "5. المدفوعات والاسترداد" : "5. Payments & Refunds" },
    { id: "liability", label: locale === "ar" ? "6. حدود المسؤولية" : "6. Limitation of Liability" },
  ];

  return (
    <div className="min-h-screen bg-background" dir={locale === "ar" ? "rtl" : "ltr"}>
      <TermsHeader
        title={locale === "ar" ? "الشروط والأحكام" : "Terms and Conditions"}
        description={
          locale === "ar"
            ? "تشكل هذه الشروط الاتفاقية بينك وبين الأكاديمية لوصولك إلى دوراتنا واختباراتنا."
            : "These terms form the agreement between you and ApexCert Academy governing access to our courses, exams, and certification programs."
        }
       lastUpdated={locale === "ar" ? "29 أغسطس 2026" : "August 29, 2026"}
        locale={locale}
      />

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <TermsClientLayout
          toc={toc}
          locale={locale}
          summary={
            <p>
              {locale === "ar"
                ? "بإنشاء حساب فإنك توافق على هذه الشروط. جميع محتويات الدورة هي ملكيتنا الفكرية المحمية، والحسابات شخصية وغير قابلة للنقل."
                : "By creating an account you agree to these terms. All course content is our protected intellectual property, accounts are personal and non-transferable."}
            </p>
          }
        >
          <LegalSection
            id="acceptance"
            title={locale === "ar" ? "1. القبول بالشروط" : "1. Acceptance of Terms"}
          >
            <p>
              {locale === "ar"
                ? "من خلال تسجيل حساب أو استخدام المنصة، فإنك تدخل في اتفاقية ملزمة قانوناً معنا وتؤكد قراءتك وفهمك لهذه الشروط."
                : "By registering an account, accessing, or using ApexCert Academy ('the Platform'), you enter into a legally binding agreement with us."}
            </p>
          </LegalSection>

          <LegalSection
            id="intellectual-property"
            title={locale === "ar" ? "2. حقوق الملكية الفكرية" : "2. Intellectual Property Rights"}
          >
            <p>
              {locale === "ar"
                ? "جميع المحتويات الموجودة على المنصة — بما في ذلك مقاطع الفيديو والاختبارات — هي ملكية حصرية للأكاديمية."
                : "All content on the Platform — including course videos, proprietary exam questions, and study materials — is exclusive property."}
            </p>
          </LegalSection>

          <LegalSection
            id="accounts-security"
            title={locale === "ar" ? "3. حسابات المستخدمين والأمان" : "3. User Accounts & Security"}
          >
            <ul className="list-disc space-y-2 pl-6 pr-6">
              <li>
                <strong className="font-semibold text-foreground">
                  {locale === "ar" ? "الحسابات الفردية" : "Individual accounts"}
                </strong>{" "}
                — {locale === "ar" ? "كل حساب مخصص لفرد واحد فقط ويمنع مشاركته." : "each account is issued to a single named individual."}
              </li>
            </ul>
          </LegalSection>

          <LegalSection
            id="certification-disclaimer"
            title={locale === "ar" ? "4. إخلاء مسؤولية الشهادات" : "4. Professional Certification Disclaimer"}
          >
            <p>
              {locale === "ar"
                ? "يتم منح الشهادات بناءً على الجهد الأكاديمي واجتياز الاختبارات المقررة بنجاح فقط."
                : "Certification is awarded solely on demonstrated academic effort and successful completion of the required examinations."}
            </p>
          </LegalSection>

          <LegalSection
            id="payments-refunds"
            title={locale === "ar" ? "5. الاشتراكات والمدفوعات وساسة الاسترداد" : "5. Subscriptions, Payments & Refund Policy"}
          >
            <p>
              {locale === "ar"
                ? "يمكنك إرجاع المبلغ خلال 14 يوماً من الشراء بشرط عدم استهلاك أكثر من 20% من الدورة ولم يتم بدء أي اختبار."
                : "Full refunds are available within 14 days of purchase provided less than 20% of the course content has been consumed."}
            </p>
          </LegalSection>

          <LegalSection
            id="liability"
            title={locale === "ar" ? "6. حدود المسؤولية" : "6. Limitation of Liability"}
          >
            <p>
              {locale === "ar"
                ? "يتم تقديم المنصة 'كما هي' وبحسب التوفر."
                : "The Platform is provided on an 'as is' and 'as available' basis."}
            </p>
          </LegalSection>
        </TermsClientLayout>
      </main>
    </div>
  );
}