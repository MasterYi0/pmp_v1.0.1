// 'use client';

// import Link from "next/link";
// import LanguageSwitcher from "@/components/a/LanguageSwitcher"; 
// import { UserMenu } from "./UserMenu";
// import { User } from "@supabase/supabase-js";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown, Menu } from "lucide-react";
// import { buttonVariants } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useTranslations } from "next-intl"; // تم حذف getTranslations(server)

// // 1. إزالة async من هنا لأن المكون Client Component
// export function Navbar({ user }: { user: User | null }) {
//   const t = useTranslations("NavBar");

//   return (
//     <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2.5">
//           <img src="/logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
//           <span className="text-base font-bold text-slate-900 tracking-tight">
//             {t("brand_name")}
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center gap-1 md:flex">

//           <DropdownMenu>
//             <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", className: "gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100" })}>
//               {t("courses")}
//               <ChevronDown className="h-4 w-4 text-slate-400" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-52 border border-slate-200 bg-white p-1 text-slate-700 shadow-lg">
//               <DropdownMenuItem className="p-0 hover:bg-slate-50 focus:bg-slate-50 rounded-md">
//                 <Link href="/courses/pmp-certification" className="w-full px-3 py-2 text-sm text-slate-700 font-medium">
//                   {t("pmpCert")}
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem disabled className="flex items-center justify-between px-3 py-2 opacity-50">
//                 <span className="text-sm">{t("pmpAgile")}</span>
//                 <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 border border-slate-200">
//                   {t("soon")}
//                 </span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Link href="/about" className={buttonVariants({ variant: "ghost", className: "text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100" })}>
//             {t("about")}
//           </Link>

//           <Link href="/contact" className={buttonVariants({ variant: "ghost", className: "text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100" })}>
//             {t("contact")}
//           </Link>
//         </nav>

//         {/* User / Auth Area (Desktop) */}
//         <div className="hidden items-center gap-3 md:flex">
//           <LanguageSwitcher />
//           {user ? (
//             <UserMenu user={user} />
//           ) : (
//             <Link 
//               href="/auth/login" 
//               className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
//             >
//              {t("login")}
//             </Link>
//           )}
//         </div>

//         {/* Mobile View */}
//         <div className="flex items-center gap-2 md:hidden">
//           <LanguageSwitcher />
//           {user && <UserMenu user={user} />}

//           <Sheet>
//             <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "text-slate-700" })}>
//               <Menu className="h-5 w-5" />
//             </SheetTrigger>
//             <SheetContent side="right" className="w-72 bg-white border-l border-slate-200 p-6">
//               <div className="mt-6 flex flex-col gap-1">
//                 <Link href="/courses/pmp-certification" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
//                   {t("pmpCert")}
//                 </Link>
//                 <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-400">
//                   <span>{t("pmpAgile")}</span>
//                   <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 border">
//                     {t("soon")}
//                   </span>
//                 </div>
//                 <Link href="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
//                   {t("about")}
//                 </Link>
//                 <Link href="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
//                   {t("contact")}
//                 </Link>

//                 {!user && (
//                   <div className="mt-4 pt-4 border-t border-slate-100">
//                     <Link 
//                       href="/auth/login" 
//                       className="block w-full text-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
//                     >
//                        {t("login")}
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>

//       </div>
//     </header>
//   );
// }


/////////////////////// Old Code working

// 'use client';

// import Link from "next/link";
// import LanguageSwitcher from "@/components/a/LanguageSwitcher";
// import { UserMenu } from "./UserMenu";
// import { User } from "@supabase/supabase-js";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import ThemeSwitcher from "./themeswitcher";

// function GoogleIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
//       <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
//       <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
//       <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1z" />
//       <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
//     </svg>
//   );
// }

// export function Navbar({ user }: { user: User | null }) {
//   const t = useTranslations("appBar");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navItems = [
//     { href: "/#courses", label: t("courses") },
//     { href: "/#journey", label: t("journey") },
//     { href: "/#instructor", label: t("instructor") },
//     { href: "/#faq", label: t("faq") },
//   ];

//   return (
//     <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
//       <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* الشعار */}
//         {/* <Link href="/" className="flex items-center gap-2.5">
//           <img src="/logo.png" alt="PM Mindset" className="size-11 object-contain" width={44} height={44} />
//           <span className="hidden text-lg font-extrabold leading-tight text-navy sm:block">
//             PM Mindset
//           </span>
//         </Link> */}
//         {user ? (
//           <Link href="/dashboard" className="flex items-center gap-2.5">
//             <img src="/logo.png" alt="PM Mindset" className="size-11 object-contain" width={44} height={44} />
//             <span className="hidden text-lg font-extrabold leading-tight text-navy sm:block">
//               PM Mindset
//             </span>
//           </Link>
//         ) : (
//           <Link href="/" className="flex items-center gap-2.5">
//             <img src="/logo.png" alt="PM Mindset" className="size-11 object-contain" width={44} height={44} />
//             <span className="hidden text-lg font-extrabold leading-tight text-navy sm:block">
//               PM Mindset
//             </span>
//           </Link>
//         )}
//         {/* الروابط (سطح المكتب) */}

//         {!!!user && (
//           <nav className="mx-auto hidden items-center gap-1 md:flex">

//             {navItems.map((item) => (

//               <a
//                 key={item.href}
//                 href={item.href}
//                 className="rounded-full px-3.5 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-navy"
//               >
//                 {item.label}
//               </a>
//             ))}

//           </nav>
//         )}

//         {/* أزرار اليمين */}
//         <div className="flex items-center gap-2">
//           <LanguageSwitcher />
//           <ThemeSwitcher />
//           {user ? (
//             <UserMenu user={user} />
//           ) : (
//             <Button
//               size="sm"
//               className="hidden gap-2 rounded-xl font-bold sm:inline-flex"
//               variant="outline"
//               onClick={() => window.location.href = "/auth/login"}
//             >
//               <GoogleIcon />
//               {t("login")}
//             </Button>
//           )}

//           {/* قائمة الموبايل بدون مشاكل الـ asChild */}
//           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//             <SheetTrigger className="rounded-lg p-2 text-navy md:hidden" aria-label="Toggle Menu">
//               <Menu className="size-5" />
//             </SheetTrigger>

//             <SheetContent side="right" className="w-72 bg-card border-l border-border p-6">
//               <div className="mt-6 flex flex-col gap-2">
//                 {navItems.map((item) => (
//                   <a
//                     key={item.href}
//                     href={item.href}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block rounded-lg px-3 py-2.5 text-sm font-bold text-navy hover:bg-secondary"
//                   >
//                     {item.label}
//                   </a>
//                 ))}

//                 {!user && (
//                   <div className="mt-4 pt-4 border-t border-border">
//                     <Button
//                       className="w-full gap-2 rounded-xl font-bold"
//                       variant="outline"
//                       onClick={() => {
//                         setMobileMenuOpen(false);
//                         window.location.href = "/auth/login";
//                       }}
//                     >
//                       <GoogleIcon />
//                       {t("login")}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>

//       </div>
//     </header>
//   );
// }

//////////// Old Code ended

/////// New Code started
'use client';

import Link from "next/link";
import LanguageSwitcher from "@/components/a/LanguageSwitcher";
import { UserMenu } from "./UserMenu";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ThemeSwitcher from "./themeswitcher";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
    </svg>
  );
}

export function Navbar({ user }: { user: User | null }) {
  const t = useTranslations("appBar");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/#courses", label: t("courses") },
    { href: "/#journey", label: t("journey") },
    { href: "/#instructor", label: t("instructor") },
    { href: "/#faq", label: t("faq") },
  ];

  return (
    // أضفنا هنا خلفية بيضاء ثابتة وحدود فاتحة بغض النظر عن الثيم
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* الشعار */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="PM Mindset" className="size-11 object-contain" width={44} height={44} />
          <span className="hidden text-lg font-extrabold leading-tight text-gray-900 sm:block">
            PM Mindset
          </span>
        </Link>

        {/* الروابط (سطح المكتب) */}
        {!user && (
          <nav className="mx-auto hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* أزرار اليمين */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button
              size="sm"
              className="hidden gap-2 rounded-xl font-bold bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 sm:inline-flex"
              variant="outline"
              onClick={() => window.location.href = "/auth/login"}
            >
              <GoogleIcon />
              {t("login")}
            </Button>
          )}

          {/* قائمة الموبايل */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger className="rounded-lg p-2 text-gray-900 md:hidden" aria-label="Toggle Menu">
              <Menu className="size-5" />
            </SheetTrigger>

            {/* قائمة الموبايل الجانبية مثبتة على ألوان اللایت */}
            <SheetContent side="right" className="w-72 bg-white border-l border-gray-200 p-6 text-gray-900">
              <div className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                ))}

                {!user && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      className="w-full gap-2 rounded-xl font-bold bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = "/auth/login";
                      }}
                    >
                      <GoogleIcon />
                      {t("login")}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}