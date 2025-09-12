'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import GlassCard from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

export default function VerifyEmailPage() {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage(t.auth.verifyEmail.invalid)
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.error)
        }
      } catch (error) {
        setStatus('error')
        setMessage(t.auth.messages.serverError)
      }
    }

    verifyEmail()
  }, [token, t])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md text-center">
        <div className="mb-8">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          )}
          
          {status === 'success' && (
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {status === 'error' && (
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t.auth.verifyEmail.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>

          {status === 'success' && (
            <Link href="/auth/signin">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {t.auth.signIn.signInButton}
              </Button>
            </Link>
          )}

          {status === 'error' && (
            <Link href="/auth/signup">
              <Button variant="outline">
                {t.auth.signUp.signUpButton}
              </Button>
            </Link>
          )}
        </div>
      </GlassCard>
    </div>
  )
}
