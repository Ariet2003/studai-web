'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import { useTheme } from '@/hooks/useTheme'
import { useToastContext } from '@/contexts/ToastContext'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language } = useLanguage()
  const t = getTranslation(language)
  const { isDarkMode, toggleTheme } = useTheme()
  const toast = useToastContext()
  
  // Обновляем переводы при изменении языка
  const translations = getTranslation(language)

  useEffect(() => {
    if (status === 'loading') return // Еще загружается
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  // Проверяем флаг связывания аккаунтов
  useEffect(() => {
    if (session && (session as any).accountLinked) {
      toast.info(translations.auth.toast.titles.info, translations.auth.toast.success.accountLinked)
      // Очищаем флаг после показа уведомления
      delete (session as any).accountLinked
    }
  }, [session, toast])

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#050c26]' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
    }`}>
      {/* Навигационная панель */}
      <nav className={`border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#181f38] border-[#2d3748]' 
          : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <div className="flex items-center">
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                StudAI
              </h1>
            </div>

            {/* Кнопки управления */}
            <div className="flex items-center space-x-4">
              {/* Переключатель темы */}
              <button
                onClick={() => toggleTheme()}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-[#78819d] hover:text-white hover:bg-[#2d3748]' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" />
                    <path d="M11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3Z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.708 5.16673C12.836 4.91868 12.8254 4.62187 12.6801 4.38356C12.5348 4.14525 12.2758 3.99989 11.9967 4C7.57994 4.00179 4 7.58282 4 12C4 16.4183 7.58172 20 12 20C15.0997 20 17.7862 18.237 19.114 15.6627C19.2419 15.4147 19.2313 15.118 19.0861 14.8797C18.9409 14.6414 18.682 14.496 18.403 14.496L18.4 14.496C14.8654 14.496 12 11.6306 12 8.096C12 7.03876 12.2557 6.04358 12.708 5.16673Z" />
                  </svg>
                )}
              </button>

              {/* Кнопка выхода */}
              <button
                onClick={handleSignOut}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`rounded-2xl p-8 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-[#181f38] border border-[#2d3748]' 
            : 'bg-white border border-slate-200'
        }`}>
          {/* Приветствие */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Добро пожаловать, {session.user?.name || 'пользователь'}!
            </h1>
            <p className={`text-lg mt-2 transition-colors duration-300 ${
              isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
            }`}>
              Это ваш личный кабинет StudAI
            </p>
          </div>

          {/* Информация о пользователе */}
          <div className={`p-6 rounded-xl transition-colors duration-300 ${
            isDarkMode ? 'bg-[#101831]' : 'bg-slate-50'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Информация о профиле
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
                }`}>
                  Имя
                </p>
                <p className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {session.user?.name || 'Не указано'}
                </p>
              </div>
              <div>
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
                }`}>
                  Email
                </p>
                <p className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Функции (заглушки) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#101831]' : 'bg-slate-50'
            }`}>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Мои проекты
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
              }`}>
                Управляйте вашими проектами
              </p>
            </div>

            <div className={`p-6 rounded-xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#101831]' : 'bg-slate-50'
            }`}>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Настройки
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
              }`}>
                Персонализируйте ваш опыт
              </p>
            </div>

            <div className={`p-6 rounded-xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#101831]' : 'bg-slate-50'
            }`}>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Помощь
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-[#78819d]' : 'text-slate-600'
              }`}>
                Получите поддержку
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
