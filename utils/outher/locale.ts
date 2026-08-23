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

