'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import { Button } from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import { TwoFactorSetup } from './TwoFactorSetup'

export function ProfileForm() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const { data: session } = useSession()
  const router = useRouter()
  
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const handleEnable2FA = () => {
    setShowTwoFactorSetup(true)
  }

  if (!session) {
    return null
  }

  if (showTwoFactorSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <TwoFactorSetup onComplete={() => setShowTwoFactorSetup(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.auth.profile.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Управляйте настройками вашего аккаунта
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Личная информация */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t.auth.profile.personalInfo}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.auth.profile.firstName}
                </label>
                <input
                  type="text"
                  value={session.user?.name?.split(' ')[0] || ''}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.auth.profile.email}
                </label>
                <input
                  type="email"
                  value={session.user?.email || ''}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled
                />
              </div>

              {session.user?.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Фото профиля
                  </label>
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
            </div>
          </GlassCard>

          {/* Безопасность */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t.auth.profile.security}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {t.auth.profile.twoFactorAuth}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Добавьте дополнительный уровень безопасности к вашему аккаунту
                </p>
                <Button
                  onClick={handleEnable2FA}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {t.auth.profile.enable2FA}
                </Button>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {t.auth.profile.changePassword}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Обновите ваш пароль регулярно для безопасности
                </p>
                <Button variant="outline">
                  {t.auth.profile.changePassword}
                </Button>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                >
                  {t.auth.profile.signOut}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
