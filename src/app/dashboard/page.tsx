'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  History, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  User,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Clock,
  ArrowRight,
  Award
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import LanguageSelector from '@/components/LanguageSelector'

interface SidebarItem {
  id: string
  icon: React.ReactNode
  key: 'dashboard' | 'myWorks' | 'newWork' | 'history' | 'settings' | 'support'
  href?: string
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, key: 'dashboard' },
  { id: 'myWorks', icon: <FileText className="w-5 h-5" />, key: 'myWorks' },
  { id: 'newWork', icon: <Plus className="w-5 h-5" />, key: 'newWork' },
  { id: 'history', icon: <History className="w-5 h-5" />, key: 'history' },
  { id: 'settings', icon: <Settings className="w-5 h-5" />, key: 'settings' },
  { id: 'support', icon: <HelpCircle className="w-5 h-5" />, key: 'support' }
]

const workTypes = [
  {
    id: 'essay',
    icon: <BookOpen className="w-8 h-8" />
  },
  {
    id: 'coursework', 
    icon: <GraduationCap className="w-8 h-8" />
  },
  {
    id: 'srs',
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'report',
    icon: <Clock className="w-8 h-8" />
  }
]

// Моковые данные для последних работ
const mockRecentWorks = [
  {
    id: 1,
    title: 'История России в XIX веке',
    type: 'Реферат',
    date: '2025-01-10',
    status: 'completed',
    pages: 15
  },
  {
    id: 2,
    title: 'Анализ рынка IT-услуг',
    type: 'Курсовая работа',
    date: '2025-01-08',
    status: 'completed',
    pages: 32
  },
  {
    id: 3,
    title: 'Квантовая механика',
    type: 'СРС',
    date: '2025-01-05',
    status: 'completed',
    pages: 8
  }
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language, isClient } = useLanguage()
  const t = getTranslation(language)
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // Функции для работы с темой в куки (точно такие же как на главной странице)
  const setThemeCookie = (isDark: boolean) => {
    if (typeof window !== 'undefined') {
      const expires = new Date()
      expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)) // 365 дней
      document.cookie = `studai-theme=${isDark ? 'dark' : 'light'};expires=${expires.toUTCString()};path=/`
    }
  }

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

  // Загружаем тему из куки при инициализации
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

  // Закрытие профильного меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
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
        isDarkMode ? 'bg-[#050c26]' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
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

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  // Theme toggle component - показывает только одну иконку
  const ThemeToggle = () => (
    <motion.button
      onClick={() => {
        setIsDarkMode(!isDarkMode)
        setThemeCookie(!isDarkMode)
      }}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#181f38]/60 hover:bg-[#181f38]/80 text-[#78819d] hover:text-white border border-[#181f38]/40'
          : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/40'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="wrapper wrapper__svg-is-inherit" style={{width:'20px',height:'20px'}}>
        {isDarkMode ? (
          // Показываем иконку солнца когда темная тема активна (для переключения на светлую)
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="currentColor"></path>
            <path d="M11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3Z" fill="currentColor"></path>
            <path d="M5.636 7.05086C6.02653 7.44138 6.65969 7.44138 7.05022 7.05086C7.44074 6.66033 7.44074 6.02717 7.05022 5.63664L6.34311 4.92954C5.95259 4.53901 5.31942 4.53901 4.9289 4.92954C4.53837 5.32006 4.53837 5.95323 4.9289 6.34375L5.636 7.05086Z" fill="currentColor"></path>
            <path d="M19.0711 4.92976C18.6806 4.53924 18.0474 4.53924 17.6569 4.92976L16.9498 5.63687C16.5593 6.02739 16.5593 6.66056 16.9498 7.05108C17.3403 7.44161 17.9735 7.44161 18.364 7.05108L19.0711 6.34398C19.4616 5.95345 19.4616 5.32029 19.0711 4.92976Z" fill="currentColor"></path>
            <path d="M7.05037 16.9493C6.65984 16.5588 6.02668 16.5588 5.63615 16.9493L4.92905 17.6564C4.53852 18.0469 4.53852 18.6801 4.92905 19.0706C5.31957 19.4611 5.95274 19.4611 6.34326 19.0706L7.05037 18.3635C7.44089 17.973 7.44089 17.3398 7.05037 16.9493Z" fill="currentColor"></path>
            <path d="M19.071 19.0704C18.6804 19.4609 18.0473 19.4609 17.6568 19.0704L16.9496 18.3633C16.5591 17.9728 16.5591 17.3396 16.9496 16.9491C17.3402 16.5585 17.9733 16.5585 18.3639 16.9491L19.071 17.6562C19.4615 18.0467 19.4615 18.6799 19.071 19.0704Z" fill="currentColor"></path>
            <path d="M12 19C11.4477 19 11 19.4477 11 20V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V20C13 19.4477 12.5523 19 12 19Z" fill="currentColor"></path>
            <path d="M21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H21Z" fill="currentColor"></path>
            <path d="M5 12C5 11.4477 4.55228 11 4 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H4C4.55228 13 5 12.5523 5 12Z" fill="currentColor"></path>
          </svg>
        ) : (
          // Показываем иконку луны когда светлая тема активна (для переключения на темную)
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path d="M12.708 5.16673C12.836 4.91868 12.8254 4.62187 12.6801 4.38356C12.5348 4.14525 12.2758 3.99989 11.9967 4C7.57994 4.00179 4 7.58282 4 12C4 16.4183 7.58172 20 12 20C15.0997 20 17.7862 18.237 19.114 15.6627C19.2419 15.4147 19.2313 15.118 19.0861 14.8797C18.9409 14.6414 18.682 14.496 18.403 14.496L18.4 14.496C14.8654 14.496 12 11.6306 12 8.096C12 7.03876 12.2557 6.04358 12.708 5.16673Z" fill="currentColor"></path>
          </svg>
        )}
      </div>
    </motion.button>
  )

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#050c26]' 
        : 'bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100'
    }`}>
      
      {/* Header - точно такой же как на главной странице */}
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
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#2d3748] text-[#78819d] hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Menu className="w-5 h-5" />
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
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
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
            
            <div className="relative" ref={profileRef}>
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#181f38]/60 hover:bg-[#181f38]/80 text-[#78819d] hover:text-white border border-[#181f38]/40'
                    : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span className="text-sm font-medium hidden sm:block">
                  {session.user?.name?.split(' ')[0] || 'Пользователь'}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 right-0 z-50 min-w-[200px] rounded-xl shadow-lg border backdrop-blur-xl ${
                      isDarkMode
                        ? 'bg-[#181f38]/90 border-[#181f38]/40'
                        : 'bg-white/90 border-white/40'
                    }`}
                  >
                    <div className="py-2">
                      <div className={`px-4 py-2 border-b ${
                        isDarkMode ? 'border-[#2d3748]' : 'border-slate-200'
                      }`}>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {session.user?.name || 'Пользователь'}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-[#78819d]' : 'text-slate-500'}`}>
                          {session.user?.email}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => router.push('/profile')}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-[#78819d] hover:text-white hover:bg-[#181f38]/60'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {t.dashboard.header.settings}
                      </button>
                      
                      <button
                        onClick={handleSignOut}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                            : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                        }`}
                      >
                        {t.dashboard.header.signOut}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Sidebar - фиксированный и в стиле хедера */}
      <aside className={`hidden lg:flex lg:flex-col fixed left-4 top-20 md:top-26 bottom-4 w-64 backdrop-blur-xl border rounded-2xl md:rounded-3xl shadow-lg z-40 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#181f38]/80 border-[#181f38]/40' 
          : 'bg-white/80 border-white/40'
      }`}>
        <div className="p-4 md:p-6">
          <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Навигация
          </h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? isDarkMode
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : isDarkMode
                      ? 'text-[#78819d] hover:text-white hover:bg-[#181f38]/60'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ x: 2 }}
              >
                {item.icon}
                <span className="font-medium">{t.dashboard.sidebar[item.key]}</span>
                {activeTab === item.id && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Мобильный sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`lg:hidden fixed left-2 top-2 bottom-2 w-64 z-50 backdrop-blur-xl border rounded-2xl shadow-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[#181f38]/95 border-[#181f38]/40' 
                  : 'bg-white/95 border-white/40'
              }`}
            >
              <div className="flex items-center justify-between p-4 border-b border-inherit">
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Меню
                </span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className={`p-2 rounded-lg ${
                    isDarkMode 
                      ? 'hover:bg-[#2d3748] text-[#78819d]' 
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id)
                        setIsSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 ${
                        activeTab === item.id
                          ? isDarkMode
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'bg-blue-50 text-blue-600'
                          : isDarkMode
                            ? 'text-[#78819d] hover:text-white hover:bg-[#181f38]/60'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      whileHover={{ x: 2 }}
                    >
                      {item.icon}
                      <span className="font-medium">{t.dashboard.sidebar[item.key]}</span>
                      {activeTab === item.id && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Основной контент */}
      <main className="lg:ml-72 pt-22 md:pt-36 p-2 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Что будем генерировать сегодня */}
          <motion.div 
            className="mb-4 md:mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.h1 
              className={`text-3xl lg:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t.dashboard.main.todayGenerate}
            </motion.h1>
            <motion.p 
              className={`text-md lg:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'} font-light`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t.dashboard.main.todayGenerateSubtitle}
            </motion.p>
          </motion.div>

          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >

            {/* Карточки типов работ - минималистичные, без градиентов */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-6">
              {workTypes.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/dashboard/create?type=${work.id}`)}
                  className={`group relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 backdrop-blur-xl border ${
                    isDarkMode 
                      ? 'bg-[#181f38]/60 hover:bg-[#181f38]/80 border-[#181f38]/40 hover:border-[#2d3748]' 
                      : 'bg-white/60 hover:bg-white/80 border-white/60 hover:border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-xl mb-4 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-[#2d3748] text-white group-hover:bg-blue-600/20 group-hover:text-blue-400' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                      {work.icon}
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {t.dashboard.workTypes[work.id as keyof typeof t.dashboard.workTypes].title}
                    </h3>
                    
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                      {t.dashboard.workTypes[work.id as keyof typeof t.dashboard.workTypes].description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-[#2d3748] text-[#78819d] group-hover:bg-blue-600/20 group-hover:text-blue-400' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}>
                        {t.dashboard.workTypes[work.id as keyof typeof t.dashboard.workTypes].time}
                      </span>
                      <ArrowRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-all duration-300 ${
                        isDarkMode 
                          ? 'text-[#78819d] group-hover:text-white' 
                          : 'text-slate-400 group-hover:text-blue-600'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Последние работы */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className={`rounded-2xl p-6 lg:p-8 backdrop-blur-xl border ${
              isDarkMode 
                ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                : 'bg-white/60 border-white/60'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.dashboard.main.lastWorks}
              </h2>
              <button className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10' 
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
              }`}>
                {t.dashboard.main.viewAll}
              </button>
            </div>

            {mockRecentWorks.length === 0 ? (
              <div className="text-center py-12">
                <div className={`inline-flex p-4 rounded-full mb-4 ${
                  isDarkMode ? 'bg-[#2d3748]' : 'bg-slate-100'
                }`}>
                  <FileText className={`w-8 h-8 ${isDarkMode ? 'text-[#78819d]' : 'text-slate-400'}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.dashboard.main.noWorks}
                </h3>
                <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                  {t.dashboard.main.noWorksDescription}
                </p>
                <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  <Plus className="w-4 h-4" />
                  {t.dashboard.main.createFirst}
                </button>
              </div>
            ) : (
              <>
                {/* Десктопный вид - список */}
                <div className="hidden md:block space-y-4">
                  {mockRecentWorks.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-300 border ${
                        isDarkMode 
                          ? 'hover:bg-[#2d3748]/30 border-[#2d3748]/30 hover:border-[#2d3748]' 
                          : 'hover:bg-slate-50 border-slate-200/50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-[#2d3748]' : 'bg-slate-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {work.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                              {work.type}
                            </span>
                            <span className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                              {work.pages} стр.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                          {new Date(work.date).toLocaleDateString('ru-RU')}
                        </div>
                        <div className="mt-1">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                            work.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            <Award className="w-3 h-3" />
                            Завершено
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Мобильный вид - карточки */}
                <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockRecentWorks.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      className={`p-4 rounded-xl transition-colors duration-300 border ${
                        isDarkMode 
                          ? 'hover:bg-[#2d3748]/30 border-[#2d3748]/30 hover:border-[#2d3748]' 
                          : 'hover:bg-slate-50 border-slate-200/50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-[#2d3748]' : 'bg-slate-100'
                        }`}>
                          <FileText className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                          work.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          <Award className="w-3 h-3" />
                          Завершено
                        </span>
                      </div>
                      
                      <h4 className={`font-semibold mb-2 text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {work.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                            {work.type}
                          </span>
                          <span className={`${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                            {work.pages} стр.
                          </span>
                        </div>
                        <span className={`${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                          {new Date(work.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}