'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import { useTheme } from '@/hooks/useTheme'
import { useToastContext } from '@/contexts/ToastContext'
import { useValidation } from '@/hooks/useValidation'

export function SignUpForm() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const router = useRouter()
  const { isDarkMode } = useTheme()
  const { data: session, status } = useSession()
  const toast = useToastContext()
  const formRef = useValidation(language)
  
  // Обновляем переводы при изменении языка
  const translations = getTranslation(language)

  // Редирект авторизованных пользователей в дашборд
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [session, status, router])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.fillRequiredFields)
      return false
    }

    if (formData.password.length < 6) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.passwordTooShort)
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.passwordsNotMatch)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          language: language
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(translations.auth.toast.titles.success, translations.auth.toast.info.codeSent)
        setTimeout(() => {
          router.push(`/auth/verify-code?email=${encodeURIComponent(formData.email)}`)
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

  const handleGoogleSignUp = async () => {
    try {
      const result = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false 
      })
      
      if (result?.ok) {
        toast.success(translations.auth.toast.titles.success, translations.auth.toast.success.welcome)
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 800)
      } else if (result?.error) {
        toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.registrationFailed)
      }
    } catch (error) {
      toast.error(translations.auth.toast.titles.error, translations.auth.toast.error.serverError)
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
        <h1 className={`text-[24px] font-semibold mb-8 text-center tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          {translations.auth.signUp.title}
        </h1>


        <form ref={formRef} onSubmit={handleSubmit}>
          {/* ФИО */}
          <div className="mb-6">
            <div className="relative flex items-center">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={translations.auth.signUp.namePlaceholder}
                className={`w-full h-12 px-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-500 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <svg className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors duration-200 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <div className="relative flex items-center">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={translations.auth.signUp.emailPlaceholder}
                className={`w-full h-12 px-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-500 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <svg className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors duration-200 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Пароль */}
          <div className="mb-6">
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={translations.auth.signUp.passwordPlaceholder}
                className={`w-full h-12 px-12 pr-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-500 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <svg className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors duration-200 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 flex items-center p-1 transition-all duration-200 hover:scale-110 active:scale-90 ${
                  isDarkMode ? 'text-[#78819d] hover:text-blue-400' : 'text-slate-500 hover:text-blue-500'
                }`}
              >
                {showPassword ? (
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
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder={translations.auth.signUp.confirmPasswordPlaceholder}
                className={`w-full h-12 px-12 pr-12 text-sm border rounded-xl transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] ${
                  isDarkMode 
                    ? 'border-[#2d3748] bg-[#101831] text-white placeholder-[#78819d] hover:border-[#4a5568] focus:border-blue-500 focus:bg-[#0f172a]' 
                    : 'border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-500 hover:border-slate-300 focus:border-blue-500 focus:bg-white'
                }`}
                required
              />
              <svg className={`absolute left-4 w-5 h-5 pointer-events-none transition-colors duration-200 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-4 flex items-center p-1 transition-all duration-200 hover:scale-110 active:scale-90 ${
                  isDarkMode ? 'text-[#78819d] hover:text-blue-400' : 'text-slate-500 hover:text-blue-500'
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
            disabled={loading}
            className="relative w-full h-12 mt-4 bg-blue-500 text-white border-none rounded-xl text-sm font-medium cursor-pointer overflow-hidden transition-all duration-200 hover:bg-blue-600 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.25),0_2px_4px_rgba(59,130,246,0.15)] active:translate-y-0 active:shadow-none group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full"></div>
            {loading ? translations.auth.loading : translations.auth.signUp.signUpButton}
          </button>
        </form>

        <div className={`my-6 flex items-center ${
          isDarkMode ? '' : ''
        }`}>
          <div className={`flex-1 border-t ${
            isDarkMode ? 'border-[#2d3748]' : 'border-slate-200'
          }`}></div>
          <span className={`px-4 text-xs ${
            isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
          }`}>{translations.auth.or}</span>
          <div className={`flex-1 border-t ${
            isDarkMode ? 'border-[#2d3748]' : 'border-slate-200'
          }`}></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="cursor-pointer text-black flex gap-2 items-center bg-white px-4 py-3 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200 w-full justify-center"
        >
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
            <path
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              fill="#FFC107"
            ></path>
            <path
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              fill="#FF3D00"
            ></path>
            <path
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              fill="#4CAF50"
            ></path>
            <path
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              fill="#1976D2"
            ></path>
          </svg>
              {translations.auth.signUp.withGoogle}
        </button>

        <div className={`mt-6 text-center text-xs ${
          isDarkMode ? 'text-[#78819d]' : 'text-slate-500'
        }`}>
          {translations.auth.signUp.hasAccount}{' '}
          <Link href="/auth/signin" className="text-blue-500 hover:text-blue-600 font-medium">
            {translations.auth.signUp.signIn}
          </Link>
        </div>
      </div>
    </div>
  )
}