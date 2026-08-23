'use client'

import React, { use, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Award, CheckCircle2, Lock, Printer, Download, AlertCircle } from 'lucide-react'
import { issueCertificateAction } from '../actions/certificates'
import { CertificateTemplate } from '@/components/a/CertificateTemplate'
import { useLocale } from 'next-intl'

interface CertificateClientProps {
  course: any
  initialCertificate: any
  progress: { videoProgress: number; quizProgress: number; isEligible: boolean }
  userId: string
}

export function CertificateClient({ course, initialCertificate, progress, userId}: CertificateClientProps) {
  const [certificate, setCertificate] = useState(initialCertificate)
  const [isDialogOpen, setIsDialogOpen] = useState(!initialCertificate)
  const [recipientName, setRecipientName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const locale = useLocale() as 'ar' | 'en';
  const courseTitle = course.title?.[locale] || course.title?.ar || 'الدورة التدريبية'

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipientName.trim()) {
      setErrorMsg('يرجى إدخال الاسم باللغة الإنجليزية')
      return
    }

    setLoading(true)
    setErrorMsg('')
    try {
      const newCert = await issueCertificateAction(userId, course.slug, recipientName.trim())
      setCertificate(newCert)
      setIsDialogOpen(false)
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ أثناء إصدار الشهادة')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* إذا كانت الشهادة مصدرة مسبقاً، اعرضها مباشرة مع أزرار التحكم */}
      {certificate ? (
        <div className="space-y-6 text-center">
          <div className="flex justify-center gap-4">
            <Button onClick={handlePrint} className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
              <Printer className="w-4 h-4" />
              طباعة / تصدير PDF
            </Button>
          </div>

          <div className="scale-90 md:scale-100 origin-top shadow-2xl rounded-2xl overflow-hidden border border-slate-800 inline-block">
            <CertificateTemplate 
              recipientName={certificate.recipient_name}
              courseTitle={courseTitle}
              issuedDate={certificate.issued_at}
            />
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">الشهادة مغلقة حالياً</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            يجب إكمال جميع فيديوهات واختبارات الدورة بنسبة 100% لتتمكن من إصدار شهادتك الرسمية.
          </p>
          <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="border-black text-black">
            عرض حالة التقدم وإصدار الشهادة
          </Button>
        </div>
      )}

      {/* دايلوج إصدار الشهادة والشروط */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              إصدار شهادة إتمام الدورة
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {courseTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* شريط نسب التقدم */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">نسبة مشاهدة الفيديوهات:</span>
                <span className={`font-bold ${progress.videoProgress === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {progress.videoProgress}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">نسبة اجتياز الاختبارات:</span>
                <span className={`font-bold ${progress.quizProgress === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {progress.quizProgress}%
                </span>
              </div>
            </div>

            {progress.isEligible ? (
              <form onSubmit={handleIssueCertificate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">اسمك باللغة الإنجليزية (كما سيظهر على الشهادة):</label>
                  <Input 
                    placeholder="e.g. Mohamed Ahmed Ali" 
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-white text-center font-semibold"
                    dir="ltr"
                    required
                  />
                  <p className="text-xs text-amber-400/90 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    تنبيه: سيتم حفظ الاسم وإصدار الشهادة لمرة واحدة فقط ولن يمكنك تعديل الاسم لاحقاً.
                  </p>
                </div>

                {errorMsg && <p className="text-sm text-red-400 text-center">{errorMsg}</p>}

                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold">
                  {loading ? 'جاري إصدار الشهادة...' : 'تأكيد وإصدار الشهادة الآن 🎓'}
                </Button>
              </form>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-center space-y-2">
                <p className="text-sm text-amber-300 font-medium">لم تستوفِ شروط الإصدار بعد!</p>
                <p className="text-xs text-slate-400">يجب إكمال الفيديوهات واجتياز الاختبارات بنسبة 100% لفتح خانة إصدار الشهادة.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}