'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'ru' | 'ky' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  isClient: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Функции для работы с cookies
const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof window !== 'undefined') {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }
}

const getCookie = (name: string): string | null => {
  if (typeof window !== 'undefined') {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('ru')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Устанавливаем флаг клиентской стороны
    setIsClient(true)
    
    // Загружаем сохраненный язык из cookies при инициализации
    const savedLanguage = getCookie('studai-language') as Language
    if (savedLanguage && ['ru', 'ky', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    setCookie('studai-language', newLanguage)
  }

  const value = {
    language,
    setLanguage,
    isClient
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
