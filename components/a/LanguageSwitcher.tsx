// 'use client';

// import { setUserLocale } from '@/utils/outher/locale';
// import { useLocale } from 'next-intl';
// import { useRouter } from 'next/navigation';
// import { useTransition } from 'react';
// import { Globe, Loader2 } from 'lucide-react'; // استيراد الأيقونات

// export default function LanguageSwitcher() {
//   const currentLocale = useLocale();
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const toggleLanguage = () => {
//     const nextLocale = currentLocale === 'en' ? 'ar' : 'en';
    
//     startTransition(async () => {
//       await setUserLocale(nextLocale);
//       router.refresh(); 
//     });
//   };

//   return (
//     <button
//       onClick={toggleLanguage}
//       disabled={isPending}
//       title={currentLocale === 'en' ? 'التحويل للعربية' : 'Switch to English'}
//       className="flex items-center justify-center p-2.5 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
//     >
//       {isPending ? (
//         <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-300" />
//       ) : (
//         <div className="flex items-center gap-1.5">
//           <Globe className="w-5 h-5 text-gray-700 dark:text-gray-200" />
//           <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
//             {currentLocale === 'en' ? 'AR' : 'EN'}
//           </span>
//         </div>
//       )}
//     </button>
//   );
// }

'use client';

import { setUserLocale } from '@/utils/outher/locale';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Globe, Loader2 } from 'lucide-react'; // استيراد الأيقونات

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'en' ? 'ar' : 'en';
    
    startTransition(async () => {
      await setUserLocale(nextLocale);
      router.refresh(); 
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      title={currentLocale === 'en' ? 'التحويل للعربية' : 'Switch to English'}
      // تم إزالة كلاسات الـ dark وتثبيت ألوان الوضع الفاتح فقط
      className="flex items-center justify-center p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
      ) : (
        <div className="flex items-center gap-1.5">
          <Globe className="w-5 h-5 text-gray-700" />
          <span className="text-xs font-semibold uppercase text-gray-600">
            {currentLocale === 'en' ? 'AR' : 'EN'}
          </span>
        </div>
      )}
    </button>
  );
}