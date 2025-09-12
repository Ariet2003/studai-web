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

export default function ResetPasswordPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDarkMode } = useTheme()
  const toast = useToastContext()
  const formRef = useValidation(language)
  
  // Обновляем переводы при изменении языка
  const translations = getTranslation(language)
  
  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    } else {
      // Если нет email, перенаправляем на страницу входа
      router.push('/auth/signin')
    }
  }, [searchParams, router])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setFormData({ ...formData, code: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация полей
    if (!formData.code || formData.code.length !== 6) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.fillRequiredFields)
      return
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.fillRequiredFields)
      return
    }

    if (formData.newPassword.length < 6) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.passwordTooShort)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.passwordsNotMatch)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          code: formData.code,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
          language: language
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(translations.auth.toast.titles.success, translations.auth.toast.success.passwordChanged)
        
        // Автоматический вход с новым паролем
        const result = await signIn('credentials', {
          email,
          password: formData.newPassword,
          redirect: false
        })

        if (result?.ok) {
          // Небольшая задержка для показа уведомления
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        } else {
          toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.loginFailed)
          // Перенаправляем на страницу входа
          setTimeout(() => {
            router.push('/auth/signin?message=password-reset')
          }, 2000)
        }
      } else {
        toast.error(translations.auth.toast.titles.error, data.error || translations.auth.toast.error.resetFailed)
      }
    } catch (error) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.serverError)
    } finally {
      setLoading(false)
    }
  }

  const resendCode = async () => {
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
            {translations.auth.resetPassword.title}
          </h1>
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
          }`}>
            {translations.auth.resetPassword.subtitle} <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Код подтверждения */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 text-center transition-colors duration-300 ${
              isDarkMode ? 'text-[#78819d]' : 'text-slate-700'
            }`}>
              {translations.auth.resetPassword.code}
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={handleCodeChange}
              placeholder={translations.auth.resetPassword.codePlaceholder}
              className={`w-full h-16 px-4 text-center text-2xl font-mono border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] tracking-widest ${
                isDarkMode 
                  ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                  : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
              }`}
              maxLength={6}
              required
            />
          </div>

          {/* Новый пароль */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-[#78819d]' : 'text-slate-700'
            }`}>
              {translations.auth.resetPassword.newPassword}
            </label>
            <div className="relative flex items-center">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder={translations.auth.resetPassword.newPasswordPlaceholder}
                className={`w-full h-12 px-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <div className="absolute left-4 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`absolute right-4 text-slate-400 hover:text-slate-600 transition-colors duration-200 ${
                  isDarkMode ? 'hover:text-white' : ''
                }`}
              >
                {showNewPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Подтверждение пароля */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-[#78819d]' : 'text-slate-700'
            }`}>
              {translations.auth.resetPassword.confirmPassword}
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder={translations.auth.resetPassword.confirmPasswordPlaceholder}
                className={`w-full h-12 px-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <div className="absolute left-4 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-4 text-slate-400 hover:text-slate-600 transition-colors duration-200 ${
                  isDarkMode ? 'hover:text-white' : ''
                }`}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || formData.code.length !== 6 || !formData.newPassword || !formData.confirmPassword}
            className="relative w-full h-12 mt-4 bg-blue-500 text-white border-none rounded-xl text-sm font-medium cursor-pointer overflow-hidden transition-all duration-200 hover:bg-blue-600 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.25),0_2px_4px_rgba(59,130,246,0.15)] active:translate-y-0 active:shadow-none group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></div>
            {loading ? translations.auth.loading : translations.auth.resetPassword.resetButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
          }`}>
            {translations.auth.resetPassword.resendText}{' '}
            <button
              onClick={resendCode}
              disabled={loading}
              className="text-blue-500 hover:text-blue-600 font-medium disabled:opacity-50"
            >
              {translations.auth.resetPassword.resendCode}
            </button>
          </p>
        </div>

        <div className={`mt-4 text-center text-xs ${
          isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
        }`}>
          <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600 hover:underline">
            {translations.auth.resetPassword.backToSignIn}
          </Link>
        </div>
      </div>
    </div>
  )
}
