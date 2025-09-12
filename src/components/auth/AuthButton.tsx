'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import Link from 'next/link'

export function AuthButton() {
  const { data: session } = useSession()
  const { language } = useLanguage()
  const t = getTranslation(language)

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/profile"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          {t.auth.profile.title}
        </Link>
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant="outline"
          size="sm"
        >
          {t.auth.profile.signOut}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link 
        href="/auth/signin"
        className="text-gray-700 hover:text-blue-600 transition-colors"
      >
        {t.nav.login}
      </Link>
      <Link href="/auth/signup">
        <Button size="sm">
          {t.nav.createAccount}
        </Button>
      </Link>
    </div>
  )
}
