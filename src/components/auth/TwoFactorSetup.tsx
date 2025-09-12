'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import { Button } from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'

interface TwoFactorSetupProps {
  onComplete?: () => void
}

export function TwoFactorSetup({ onComplete }: TwoFactorSetupProps) {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const { data: session } = useSession()
  
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')
  const [secret, setSecret] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSetup = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setQrCodeDataUrl(data.qrCodeDataUrl)
        setSecret(data.secret)
        setStep('verify')
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError(t.auth.messages.serverError)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: verificationCode
        })
      })

      const data = await response.json()

      if (response.ok) {
        setBackupCodes(data.backupCodes)
        setStep('complete')
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError(t.auth.messages.serverError)
    } finally {
      setLoading(false)
    }
  }

  const downloadBackupCodes = () => {
    const text = backupCodes.join('\n')
    const element = document.createElement('a')
    const file = new Blob([text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'studai-backup-codes.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!session) {
    return null
  }

  return (
    <GlassCard className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {step === 'setup' && t.auth.twoFactor.setupTitle}
          {step === 'verify' && t.auth.twoFactor.enterCode}
          {step === 'complete' && t.auth.twoFactor.backupCodes}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {step === 'setup' && t.auth.twoFactor.setupSubtitle}
          {step === 'verify' && t.auth.twoFactor.enterCode}
          {step === 'complete' && t.auth.twoFactor.backupCodesSubtitle}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {step === 'setup' && (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t.auth.twoFactor.subtitle}
          </p>
          <Button
            onClick={handleSetup}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? t.auth.loading : t.auth.twoFactor.enableButton}
          </Button>
        </div>
      )}

      {step === 'verify' && (
        <div>
          {qrCodeDataUrl && (
            <div className="text-center mb-6">
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <Image
                  src={qrCodeDataUrl}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t.auth.twoFactor.scanQR}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs font-mono break-all">{secret}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.auth.twoFactor.enterCode}
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-2xl tracking-widest"
                placeholder={t.auth.twoFactor.enterCodePlaceholder}
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? t.auth.loading : t.auth.continue}
            </Button>
          </form>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-green-600 dark:text-green-400 font-medium mb-6">
            {t.auth.messages.twoFactorEnabled}
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              {t.auth.twoFactor.backupCodes}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              {backupCodes.map((code, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded border">
                  {code}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={downloadBackupCodes}
              variant="outline"
              className="w-full"
            >
              {t.auth.twoFactor.downloadBackupCodes}
            </Button>

            <Button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {t.auth.continue}
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  )
}
