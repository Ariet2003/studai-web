'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  BookOpen,
  GraduationCap,
  FileText,
  Clock,
  Globe,
  User,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import LanguageSelector from '@/components/LanguageSelector'

interface FormData {
  workType: string
  workLanguage: string
  topic: string
  subject: string
  pageCount: string
  requirements: string
  includeTitlePage: boolean
  university: string
  studentName: string
  group: string
  teacherName: string
}

const workTypeIcons = {
  essay: <BookOpen className="w-5 h-5" />,
  coursework: <GraduationCap className="w-5 h-5" />,
  srs: <FileText className="w-5 h-5" />,
  report: <Clock className="w-5 h-5" />
}

export default function CreateWorkPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language, isClient } = useLanguage()
  const t = getTranslation(language)
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    workType: searchParams?.get('type') || 'essay',
    workLanguage: 'russian',
    topic: '',
    subject: '',
    pageCount: 'pages10_20',
    requirements: '',
    includeTitlePage: false,
    university: '',
    studentName: '',
    group: '',
    teacherName: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Функции для работы с темой (такие же как в дашборде)
  const getThemeCookie = (): boolean => {
    if (typeof window !== 'undefined') {
      const nameEQ = "studai-theme="
      const ca = document.cookie.split(';')
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length) === 'dark'
        }
      }
    }
    return false
  }

  const setThemeCookie = (isDark: boolean) => {
    if (typeof window !== 'undefined') {
      const expires = new Date()
      expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000))
      document.cookie = `studai-theme=${isDark ? 'dark' : 'light'};expires=${expires.toUTCString()};path=/`
    }
  }

  useEffect(() => {
    if (isClient) {
      const savedTheme = getThemeCookie()
      setIsDarkMode(savedTheme)
    }
  }, [isClient])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-[#050c26]' : 'bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-white' : 'text-slate-600'}>Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Theme toggle component
  const ThemeToggle = () => (
    <div className="switchWrapper--1eo4">
      <div 
        className={`pointer icon--2r1-plus -mr-4 ${isDarkMode ? 'isActive--ihJ-' : ''}`}
        onClick={() => {
          setIsDarkMode(true)
          setThemeCookie(true)
        }}
      >
        <div className="wrapper wrapper__svg-is-inherit" style={{width:'24px',height:'24px'}} data-v-411017c9="">
          <svg data-v-411017c9="" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path data-v-411017c9="" d="M12.708 5.16673C12.836 4.91868 12.8254 4.62187 12.6801 4.38356C12.5348 4.14525 12.2758 3.99989 11.9967 4C7.57994 4.00179 4 7.58282 4 12C4 16.4183 7.58172 20 12 20C15.0997 20 17.7862 18.237 19.114 15.6627C19.2419 15.4147 19.2313 15.118 19.0861 14.8797C18.9409 14.6414 18.682 14.496 18.403 14.496L18.4 14.496C14.8654 14.496 12 11.6306 12 8.096C12 7.03876 12.2557 6.04358 12.708 5.16673Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      <div 
        className={`pointer icon--2r1-plus ${!isDarkMode ? 'isActive--ihJ-' : ''}`}
        onClick={() => {
          setIsDarkMode(false)
          setThemeCookie(false)
        }}
      >
        <div className="wrapper wrapper__svg-is-inherit" style={{width:'24px',height:'24px'}} data-v-411017c9="">
          <svg data-v-411017c9="" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path data-v-411017c9="" d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M5.636 7.05086C6.02653 7.44138 6.65969 7.44138 7.05022 7.05086C7.44074 6.66033 7.44074 6.02717 7.05022 5.63664L6.34311 4.92954C5.95259 4.53901 5.31942 4.53901 4.9289 4.92954C4.53837 5.32006 4.53837 5.95323 4.9289 6.34375L5.636 7.05086Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M19.0711 4.92976C18.6806 4.53924 18.0474 4.53924 17.6569 4.92976L16.9498 5.63687C16.5593 6.02739 16.5593 6.66056 16.9498 7.05108C17.3403 7.44161 17.9735 7.44161 18.364 7.05108L19.0711 6.34398C19.4616 5.95345 19.4616 5.32029 19.0711 4.92976Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M7.05037 16.9493C6.65984 16.5588 6.02668 16.5588 5.63615 16.9493L4.92905 17.6564C4.53852 18.0469 4.53852 18.6801 4.92905 19.0706C5.31957 19.4611 5.95274 19.4611 6.34326 19.0706L7.05037 18.3635C7.44089 17.973 7.44089 17.3398 7.05037 16.9493Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M19.071 19.0704C18.6804 19.4609 18.0473 19.4609 17.6568 19.0704L16.9496 18.3633C16.5591 17.9728 16.5591 17.3396 16.9496 16.9491C17.3402 16.5585 17.9733 16.5585 18.3639 16.9491L19.071 17.6562C19.4615 18.0467 19.4615 18.6799 19.071 19.0704Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M12 19C11.4477 19 11 19.4477 11 20V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V20C13 19.4477 12.5523 19 12 19Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H21Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M5 12C5 11.4477 4.55228 11 4 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H4C4.55228 13 5 12.5523 5 12Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </div>
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.topic.trim()) {
      newErrors.topic = t.workGenerator.validation.topicRequired
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.workGenerator.validation.subjectRequired
    }

    if (formData.includeTitlePage) {
      if (!formData.university.trim()) {
        newErrors.university = t.workGenerator.validation.universityRequired
      }
      if (!formData.studentName.trim()) {
        newErrors.studentName = t.workGenerator.validation.studentNameRequired
      }
      if (!formData.group.trim()) {
        newErrors.group = t.workGenerator.validation.groupRequired
      }
      if (!formData.teacherName.trim()) {
        newErrors.teacherName = t.workGenerator.validation.teacherNameRequired
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Здесь будет логика отправки данных на сервер
    try {
      // Симуляция запроса
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // После успешной генерации перенаправляем на результат
      router.push('/dashboard/result')
    } catch (error) {
      console.error('Error generating work plan:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#050c26]' 
        : 'bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100'
    }`}>
      
      {/* Header */}
      <header className={`fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 backdrop-blur-xl border z-50 rounded-2xl md:rounded-3xl shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#181f38]/80 border-[#181f38]/40' 
          : 'bg-white/80 border-white/40'
      }`}>
        <motion.div 
          className="px-3 md:px-8 py-3 md:py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#2d3748] text-[#78819d] hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <motion.div 
              className="flex items-center space-x-2 md:space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={isDarkMode ? "/studai-logo-white.svg" : "/studai-logo.svg"} 
                alt="StudAI Logo" 
                className="w-8 h-8 md:w-10 md:h-10 relative -top-0.75"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const nextElement = target.nextElementSibling as HTMLElement;
                  if (nextElement) nextElement.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center hidden">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className={`hidden sm:block text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>StudAI</span>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSelector isDarkMode={isDarkMode} />
            <ThemeToggle />
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="pt-22 md:pt-36 p-2 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Page Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className={`text-2xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t.workGenerator.title}
            </motion.h1>
            <motion.p 
              className={`text-md md:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'} font-light`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.workGenerator.subtitle}
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className={`rounded-2xl p-6 md:p-8 backdrop-blur-xl border ${
              isDarkMode 
                ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                : 'bg-white/60 border-white/60'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Work Type */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.workGenerator.form.workType}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(t.dashboard.workTypes).map(([key, workType]) => (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => updateFormData('workType', key)}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                        formData.workType === key
                          ? isDarkMode
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                          : isDarkMode
                            ? 'bg-[#2d3748]/50 text-[#78819d] hover:text-white hover:bg-[#2d3748] border border-[#2d3748]/30'
                            : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0">
                        {workTypeIcons[key as keyof typeof workTypeIcons]}
                      </div>
                      <span className="text-sm font-medium">{workType.title}</span>
                      {formData.workType === key && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Work Language and Page Count - parallel on mobile */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {/* Work Language */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t.workGenerator.form.workLanguage}
                  </label>
                  <select
                    value={formData.workLanguage}
                    onChange={(e) => updateFormData('workLanguage', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                      isDarkMode 
                        ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                        : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="russian">{t.workGenerator.form.workLanguageOptions.russian}</option>
                    <option value="kyrgyz">{t.workGenerator.form.workLanguageOptions.kyrgyz}</option>
                    <option value="english">{t.workGenerator.form.workLanguageOptions.english}</option>
                  </select>
                </div>

                {/* Page Count */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t.workGenerator.form.pageCount}
                  </label>
                  <select
                    value={formData.pageCount}
                    onChange={(e) => updateFormData('pageCount', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                      isDarkMode 
                        ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                        : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="pages5_10">{t.workGenerator.form.pageCountOptions.pages5_10}</option>
                    <option value="pages10_20">{t.workGenerator.form.pageCountOptions.pages10_20}</option>
                    <option value="pages20_30">{t.workGenerator.form.pageCountOptions.pages20_30}</option>
                    <option value="pages30_40">{t.workGenerator.form.pageCountOptions.pages30_40}</option>
                  </select>
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.workGenerator.form.topic} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => updateFormData('topic', e.target.value)}
                  placeholder={t.workGenerator.form.topicPlaceholder}
                  className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                    errors.topic
                      ? 'border-red-500 focus:border-red-500'
                      : isDarkMode 
                        ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                        : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.topic && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.topic}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.workGenerator.form.subject} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => updateFormData('subject', e.target.value)}
                  placeholder={t.workGenerator.form.subjectPlaceholder}
                  className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : isDarkMode 
                        ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                        : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.workGenerator.form.requirements}
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => updateFormData('requirements', e.target.value)}
                  placeholder={t.workGenerator.form.requirementsPlaceholder}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                    isDarkMode 
                      ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                      : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none`}
                />
              </div>

              {/* Title Page Toggle */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => updateFormData('includeTitlePage', !formData.includeTitlePage)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      formData.includeTitlePage 
                        ? 'bg-blue-600' 
                        : isDarkMode ? 'bg-[#2d3748]' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        formData.includeTitlePage ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t.workGenerator.form.titlePage}
                  </label>
                </div>

                {/* Title Page Fields */}
                <AnimatePresence>
                  {formData.includeTitlePage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                    >
                      {/* University */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {t.workGenerator.form.titlePageFields.university} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.university}
                          onChange={(e) => updateFormData('university', e.target.value)}
                          placeholder={t.workGenerator.form.titlePageFields.universityPlaceholder}
                          className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                            errors.university
                              ? 'border-red-500 focus:border-red-500'
                              : isDarkMode 
                                ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        {errors.university && (
                          <p className="mt-1 text-sm text-red-500">{errors.university}</p>
                        )}
                      </div>

                      {/* Student Name */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {t.workGenerator.form.titlePageFields.studentName} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.studentName}
                          onChange={(e) => updateFormData('studentName', e.target.value)}
                          placeholder={t.workGenerator.form.titlePageFields.studentNamePlaceholder}
                          className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                            errors.studentName
                              ? 'border-red-500 focus:border-red-500'
                              : isDarkMode 
                                ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        {errors.studentName && (
                          <p className="mt-1 text-sm text-red-500">{errors.studentName}</p>
                        )}
                      </div>

                      {/* Group */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {t.workGenerator.form.titlePageFields.group} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.group}
                          onChange={(e) => updateFormData('group', e.target.value)}
                          placeholder={t.workGenerator.form.titlePageFields.groupPlaceholder}
                          className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                            errors.group
                              ? 'border-red-500 focus:border-red-500'
                              : isDarkMode 
                                ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        {errors.group && (
                          <p className="mt-1 text-sm text-red-500">{errors.group}</p>
                        )}
                      </div>

                      {/* Teacher Name */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {t.workGenerator.form.titlePageFields.teacherName} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.teacherName}
                          onChange={(e) => updateFormData('teacherName', e.target.value)}
                          placeholder={t.workGenerator.form.titlePageFields.teacherNamePlaceholder}
                          className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border ${
                            errors.teacherName
                              ? 'border-red-500 focus:border-red-500'
                              : isDarkMode 
                                ? 'bg-[#2d3748] border-[#2d3748] text-white focus:border-blue-500' 
                                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                        {errors.teacherName && (
                          <p className="mt-1 text-sm text-red-500">{errors.teacherName}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                } min-w-[200px]`}
                whileHover={isSubmitting ? {} : { scale: 1.02 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Обработка...
                  </div>
                ) : (
                  t.workGenerator.form.generateButton
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </main>
    </div>
  )
}
