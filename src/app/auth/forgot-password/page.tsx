'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import { useTheme } from '@/hooks/useTheme'
import { useToastContext } from '@/contexts/ToastContext'
import { useValidation } from '@/hooks/useValidation'

export default function ForgotPasswordPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const router = useRouter()
  const { isDarkMode } = useTheme()
  const toast = useToastContext()
  const formRef = useValidation(language)
  
  // Обновляем переводы при изменении языка
  const translations = getTranslation(language)
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.fillRequiredFields)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          language: language
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(translations.auth.toast.titles.success, translations.auth.toast.info.codeSent)
        setTimeout(() => {
          router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`)
        }, 1000)
      } else {
        if (data.googleUser) {
          toast.warning(translations.auth.toast.warning.googleSignIn, data.error)
        } else {
          toast.error(translations.auth.toast.titles.error, data.error || translations.auth.toast.error.serverError)
        }
      }
    } catch (error) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.serverError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#050c26]' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
    }`}>
      <div className={`relative w-[400px] p-8 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.05)] border font-sans transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#181f38] border-[#2d3748]' 
          : 'bg-white border-slate-200/10'
      }`}>
        <div className="text-center mb-8">
          <h1 className={`text-[24px] font-semibold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            {translations.auth.forgotPassword.title}
          </h1>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
          }`}>
            {translations.auth.forgotPassword.subtitle}
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-[#78819d]' : 'text-slate-700'
            }`}>
              {translations.auth.forgotPassword.email}
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={translations.auth.forgotPassword.emailPlaceholder}
                className={`w-full h-12 px-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <div className="absolute left-4 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="relative w-full h-12 mt-4 bg-blue-500 text-white border-none rounded-xl text-sm font-medium cursor-pointer overflow-hidden transition-all duration-200 hover:bg-blue-600 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.25),0_2px_4px_rgba(59,130,246,0.15)] active:translate-y-0 active:shadow-none group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></div>
            {loading ? translations.auth.loading : translations.auth.forgotPassword.sendCodeButton}
          </button>
        </form>

        <div className={`mt-6 text-center text-xs ${
          isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
        }`}>
          <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600 hover:underline">
            {translations.auth.forgotPassword.backToSignIn}
          </Link>
        </div>
      </div>
    </div>
  )
}
