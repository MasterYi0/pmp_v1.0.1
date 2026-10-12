import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/a/Navbar";
import { cookies } from "next/headers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
// 1. جلب بيانات المستخدم الحالي في السيرفر
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
 const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${locale === 'ar' ? cairo.variable : geistSans.variable} ${geistMono.variable} h-full antialiased ${theme === 'dark' ? 'dark' : ''} ` }
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
         {/* 2. تمرير الـ user للـ Navbar */}
          <Navbar user={user} />

        <main> <TooltipProvider>{children}</TooltipProvider></main>
        {/* <Navbar user={user} /> */}

        </NextIntlClientProvider>
      </body>
    </html>
  );
}