'use client'

import React from 'react'
import Image from 'next/image'

interface CertificateTemplateProps {
  recipientName: string
  courseTitle: string
  issuedDate: string
}

export function CertificateTemplate({ recipientName, courseTitle, issuedDate }: CertificateTemplateProps) {
  return (
    <div id="certificate-print-area" className="w-[1122px] h-[794px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative p-12 flex flex-col justify-between shadow-2xl overflow-hidden select-none" dir="ltr">
      
      {/* خلفية وخطوط جمالية متدرجة (أزرق، سماوي، برتقالي، بنفسجي) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* الإطار الخارجي الملكي */}
      <div className="absolute inset-6 border-2 border-amber-500/40 rounded-xl pointer-events-none flex items-center justify-center">
        <div className="absolute inset-2 border border-cyan-500/20 rounded-lg" />
      </div>

      {/* الهيدر: اللوجو واسم المنصة */}
      <div className="relative z-10 flex justify-between items-center px-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 flex items-center justify-center">
            <Image src="/logo.png" alt="PM Mindset Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
            PM MINDSET
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-widest">Certificate of Completion</p>
          <p className="text-sm font-semibold text-cyan-400">ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
      </div>

      {/* محتوى الشهادة في المنتصف */}
      <div className="relative z-10 text-center space-y-6 my-auto px-12">
        <p className="text-lg text-slate-300 font-medium tracking-wide">This is proudly presented to</p>
        
        <h1 className="text-5xl font-extrabold tracking-wide text-white border-b-2 border-orange-500/50 pb-4 inline-block px-12 min-w-[500px]">
          {recipientName || 'Student Name'}
        </h1>

        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          For successfully completing the professional training course and passing all required assessments and practical projects for
        </p>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          {courseTitle}
        </h2>
      </div>

      {/* الفوتر: التاريخ والتواقيع */}
      <div className="relative z-10 flex justify-between items-end px-8 pb-4">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider">Date of Issuance</p>
          <p className="text-sm font-bold text-slate-200 mt-1">{new Date(issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="text-center space-y-1">
          <div className="font-serif italic text-xl text-amber-400">PM Mindset Academy</div>
          <div className="w-48 h-0.5 bg-slate-600 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">Authorized Signature</p>
        </div>
      </div>

    </div>
  )
}