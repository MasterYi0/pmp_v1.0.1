'use server';

import { cookies } from 'next/headers';

export async function setUserLocale(locale: string) {
  const cookieStore = await cookies();
  
  // حفظ اللغة في الكوكي لمدة سنة مثلاً
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 172800,
    sameSite: 'lax',
  });
}

//// TO DO //// 
// CREATE A FUNCTION TO TOGLE THE THEME :- LIGHT OR DARK
export async function toggleTheme(theme: string) {
  const cookieStore = await cookies();
  // حفظ  في الكوكي لمدة سنة مثلاً
  cookieStore.set('theme', theme, {
    path: '/',
    maxAge: 172800,
    sameSite: 'lax',
  });
}

export async function setTheme(theme: string) {
  const cookieStore = await cookies();
  
  // حفظ الثيم في الكوكي (مثلاً لمدة سنة)
  cookieStore.set('theme', theme, {
    path: '/',
    maxAge: 31536000, // 365 يوم تقريباً
    sameSite: 'lax',
  });
}