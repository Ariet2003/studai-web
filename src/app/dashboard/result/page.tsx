'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  RefreshCw,
  FileText,
  BookOpen,
  GraduationCap,
  Clock,
  Check
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import LanguageSelector from '@/components/LanguageSelector'

interface GeneratedPlan {
  title: string
  plan: string[]
  metadata: {
    workType: string
    workLanguage: string
    topic: string
    subject: string
    pageCount: string
    requirements?: string
    includeTitlePage: boolean
    titlePageInfo?: {
      university: string
      studentName: string
      group: string
      teacherName: string
    }
    generatedAt: string
  }
}

export default function ResultPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language, isClient } = useLanguage()
  const t = getTranslation(language)
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [typedItems, setTypedItems] = useState<string[]>([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [currentItemText, setCurrentItemText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Функции для работы с темой
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

  const workTypeIcons = {
    essay: <BookOpen className="w-5 h-5" />,
    coursework: <GraduationCap className="w-5 h-5" />,
    srs: <FileText className="w-5 h-5" />,
    report: <Clock className="w-5 h-5" />
  }

  const workTypeNames = {
    essay: 'Реферат',
    coursework: 'Курсовая работа',
    srs: 'СРС',
    report: 'Доклад'
  }

  useEffect(() => {
    if (isClient) {
      const savedTheme = getThemeCookie()
      setIsDarkMode(savedTheme)
      
      // Загружаем готовый план и запускаем эффект печатания
      const savedPlan = localStorage.getItem('studai-generated-plan')
      if (savedPlan) {
        try {
          const planData = JSON.parse(savedPlan)
          setGeneratedPlan(planData)
          
          // Запускаем эффект печатания
          setTimeout(() => {
            startTypingEffect(planData)
          }, 500)
        } catch (error) {
          console.error('Error parsing plan data:', error)
          router.push('/dashboard/create')
        }
      } else {
        router.push('/dashboard/create')
      }

      // Добавляем обработчик для кнопки "назад" в браузере
      const handlePopState = () => {
        localStorage.removeItem('studai-generated-plan')
      }
      window.addEventListener('popstate', handlePopState)

      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [isClient, router])


  const startTypingEffect = (planData: GeneratedPlan) => {
    setIsTypingComplete(false)
    
    const planItems = planData.plan
    let itemIndex = 0
    let charIndex = 0
    let animationId: NodeJS.Timeout
    
    // Инициализируем массив с пустыми строками
    const initialItems = new Array(planItems.length).fill('')
    setTypedItems(initialItems)
    setCurrentItemIndex(0)
    
    const typeNextChar = () => {
      if (itemIndex >= planItems.length) {
        setIsTypingComplete(true)
        return
      }
      
      const currentItem = planItems[itemIndex]
      
      if (charIndex < currentItem.length) {
        // Печатаем следующий символ, обновляя элемент в массиве
        charIndex++
        const partialText = currentItem.slice(0, charIndex)
        
        setTypedItems(prev => {
          const newItems = [...prev]
          newItems[itemIndex] = partialText
          return newItems
        })
        
        // Скорость печатания
        const delay = currentItem[charIndex - 1] === ' ' ? 10 : 15
        animationId = setTimeout(typeNextChar, delay)
      } else {
        // Завершили текущий элемент, переходим к следующему
        itemIndex++
        setCurrentItemIndex(itemIndex)
        charIndex = 0
        
        // Небольшая пауза только для плавности (50ms)
        animationId = setTimeout(typeNextChar, 50)
      }
    }
    
    // Начинаем печатание с задержкой
    animationId = setTimeout(typeNextChar, 500)
    
    // Очистка при размонтировании
    return () => {
      if (animationId) {
        clearTimeout(animationId)
      }
    }
  }

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  const handleBack = () => {
    // Очищаем план из localStorage и возвращаемся на форму создания
    localStorage.removeItem('studai-generated-plan')
    router.push('/dashboard/create')
  }

  const handleRegenerate = async () => {
    // Перенаправляем на страницу создания для новой генерации
    localStorage.removeItem('studai-generated-plan')
    router.push('/dashboard/create')
  }

  const handleCreateWork = () => {
    // Здесь будет логика создания полной работы
    alert('Функция создания полной работы будет реализована позже')
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
              onClick={handleBack}
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
          
          {/* Work Information Block */}
          {generatedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-6 mb-6 backdrop-blur-xl border ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/60'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                  <FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {generatedPlan.title}
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                    {generatedPlan.metadata ? `${workTypeNames[generatedPlan.metadata.workType as keyof typeof workTypeNames]} • ${generatedPlan.metadata.subject}` : 'План работы'}
                  </p>
                </div>
              </div>
              
              {generatedPlan.metadata && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>Тип:</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {workTypeNames[generatedPlan.metadata.workType as keyof typeof workTypeNames]}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>Язык:</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {generatedPlan.metadata.workLanguage}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>Страниц:</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {generatedPlan.metadata.pageCount}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>Предмет:</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {generatedPlan.metadata.subject}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Plan Content - всегда показываем */}
          {generatedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 mb-6 backdrop-blur-xl border ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/60'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {!isTypingComplete ? (
                  <>
                    <div className={`w-3 h-3 rounded-full bg-green-500 animate-pulse`}></div>
                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      ИИ генерирует план...
                    </h2>
                  </>
                ) : (
                  <>
                    <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      План работы
                    </h2>
                  </>
                )}
              </div>
                
                <div className="space-y-2">
                  {typedItems.map((item, index) => {
                    // Показываем только непустые элементы
                    if (!item) return null
                    
                    const isChapter = item.startsWith('Глава') || item.startsWith('Введение') || item.startsWith('Заключение') || item.startsWith('Список литературы')
                    const isCurrentItem = index === currentItemIndex && !isTypingComplete
                    
                    return (
                      <div
                        key={`item-${index}`}
                        className={`p-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-[#0f172a]/40' 
                            : 'bg-slate-50/50'
                        } ${
                          isChapter
                            ? `text-lg font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
                            : `ml-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`
                        }`}
                      >
                        {item}
                        {isCurrentItem && (
                          <span className="animate-pulse ml-1 text-blue-500 font-mono">|</span>
                        )}
                      </div>
                    )
                  })}
                </div>
            </motion.div>
          )}

          {/* Action Buttons - показываем только кнопки после завершения */}
          {generatedPlan && isTypingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isRegenerating
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : isDarkMode
                        ? 'bg-[#2d3748] text-white hover:bg-[#4a5568]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  whileHover={isRegenerating ? {} : { scale: 1.02 }}
                  whileTap={isRegenerating ? {} : { scale: 0.98 }}
                >
                  <RefreshCw className={`w-5 h-5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  {isRegenerating ? 'Перегенерация...' : 'Перегенерировать'}
                </motion.button>

                <motion.button
                  onClick={handleCreateWork}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5" />
                  Создать работу
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

    </div>
  )
}
