'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import { useTheme } from '@/hooks/useTheme'
import { signIn } from 'next-auth/react'
import { useToastContext } from '@/contexts/ToastContext'
import { useValidation } from '@/hooks/useValidation'

export default function VerifyCodePage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDarkMode } = useTheme()
  const toast = useToastContext()
  const formRef = useValidation(language)
  
  // Обновляем переводы при изменении языка
  const translations = getTranslation(language)
  
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    } else {
      // Если нет email, перенаправляем на регистрацию
      router.push('/auth/signup')
    }
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || code.length !== 6) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.fillRequiredFields)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(translations.auth.toast.titles.success, translations.auth.toast.success.codeVerified)
        
        // Автоматический вход с email пользователя
        const result = await signIn('credentials', {
          email,
          verified: 'true', // Флаг что пользователь уже верифицирован
          redirect: false
        })

        if (result?.ok) {
          // Небольшая задержка для показа уведомления
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        } else {
          toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.loginFailed)
          // Перенаправляем на страницу входа с сообщением
          setTimeout(() => {
            router.push('/auth/signin?message=account-verified')
          }, 2000)
        }
      } else {
        toast.error(translations.auth.toast.titles.error, data.error || translations.auth.toast.error.invalidCode)
      }
    } catch (error) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.serverError)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(value)
  }

  const resendCode = async () => {
    setLoading(true)
    try {
      // Повторная отправка кода через API регистрации
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          resend: true,
          language: language
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(translations.auth.toast.titles.success, translations.auth.toast.info.codeSent)
      } else {
        toast.error(translations.auth.toast.titles.error, data.error || translations.auth.toast.error.serverError)
      }
    } catch (error) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.serverError)
    } finally {
      setLoading(false)
    }
  }

  if (!email) {
    return null // Показываем пустую страницу пока идет перенаправление
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
            {translations.auth.verifyCode.title}
          </h1>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
          }`}>
            {translations.auth.verifyCode.subtitle} <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>


        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 text-center transition-colors duration-300 ${
              isDarkMode ? 'text-[#78819d]' : 'text-slate-700'
            }`}>
              {translations.auth.verifyCode.codeLabel}
            </label>
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder={translations.auth.verifyCode.codePlaceholder}
              className={`w-full h-16 px-4 text-center text-2xl font-mono border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] tracking-widest ${
                isDarkMode 
                  ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                  : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
              }`}
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="relative w-full h-12 mt-4 bg-blue-500 text-white border-none rounded-xl text-sm font-medium cursor-pointer overflow-hidden transition-all duration-200 hover:bg-blue-600 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.25),0_2px_4px_rgba(59,130,246,0.15)] active:translate-y-0 active:shadow-none group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></div>
            {loading ? translations.auth.loading : translations.auth.verifyCode.verifyButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
          }`}>
            {translations.auth.verifyCode.resendText}{' '}
            <button
              onClick={resendCode}
              disabled={loading}
              className="text-blue-500 hover:text-blue-600 font-medium disabled:opacity-50"
            >
              {translations.auth.verifyCode.resendButton}
            </button>
          </p>
        </div>

        <div className={`mt-4 text-center text-xs ${
          isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
        }`}>
          <Link href="/auth/signup" className="text-blue-500 hover:text-blue-600 hover:underline">
            {translations.auth.verifyCode.backToSignIn}
          </Link>
        </div>
      </div>
    </div>
  )
}
