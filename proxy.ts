import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/sumiddleware' // تأكد من المسار الصح للملف اللي فات

export async function proxy(request: NextRequest) {
  // هنا بنشغل الكود اللي بيحدث الـ Session بتاع سوبابيز تلقائياً مع كل طلب
  return await createClient(request)
}

// الـ Matcher ده بيحدد لـ Next.js إيه الصفحات اللي الميدلوير يشتغل عليها
export const config = {
  matcher: [
    /*
     * هيشتغل على كل المسارات ما عدا:
     * - _next/static (الملفات الاستاتيكية)
     * - _next/image (الصور المحسنة)
     * - favicon.ico (أيقونة الموقع)
     * - الملفات اللي بتنتهي بامتدادات صور زي .svg, .png, .jpg, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}