import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TwoFactorSetup } from '@/components/auth/TwoFactorSetup'

export default async function TwoFactorSetupPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <TwoFactorSetup onComplete={() => redirect('/profile')} />
    </div>
  )
}
