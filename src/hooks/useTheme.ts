'use client'

import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Функции для работы с темой в куки
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
    setIsClient(true)
    const savedTheme = getThemeCookie()
    setIsDarkMode(savedTheme)
  }, [])

  const toggleTheme = (isDark?: boolean) => {
    const newTheme = isDark !== undefined ? isDark : !isDarkMode
    setIsDarkMode(newTheme)
    setThemeCookie(newTheme)
  }

  return {
    isDarkMode,
    isClient,
    toggleTheme,
    setDarkMode: (isDark: boolean) => toggleTheme(isDark),
    setLightMode: () => toggleTheme(false)
  }
}
