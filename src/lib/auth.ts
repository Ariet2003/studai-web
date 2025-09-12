import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import type { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        twoFactorCode: { label: '2FA Code', type: 'text' },
        verified: { label: 'Verified', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        // Если это верифицированный вход (после подтверждения кода)
        if (credentials.verified === 'true') {
          // Проверяем что email подтвержден
          if (!user.emailVerified) {
            return null
          }
          
          return {
            id: user.id,
            email: user.email,
            name: (user as any).name || `${(user as any).firstName || ''} ${(user as any).lastName || ''}`.trim() || null,
            image: user.image,
          }
        }

        // Обычный вход с паролем
        if (!credentials?.password) {
          return null
        }

        // Проверяем, есть ли пароль у пользователя (если нет, значит зарегистрирован через Google)
        if (!user.password) {
          throw new Error('GOOGLE_USER')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Проверка двухфакторной аутентификации
        if (user.twoFactorEnabled) {
          if (!credentials.twoFactorCode) {
            throw new Error('REQUIRE_2FA')
          }

          const speakeasy = require('speakeasy')
          const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: credentials.twoFactorCode,
            window: 1
          })

          if (!verified) {
            throw new Error('INVALID_2FA_CODE')
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: (user as any).name || `${(user as any).firstName || ''} ${(user as any).lastName || ''}`.trim() || null,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        // Передаем флаг связывания аккаунтов
        if ((user as any).accountLinked) {
          token.accountLinked = true
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        // Передаем флаг связывания аккаунтов в сессию
        if (token.accountLinked) {
          (session as any).accountLinked = true
        }
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Проверяем, существует ли пользователь с таким email
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (existingUser) {
            // Если пользователь существует и у него есть пароль (обычная регистрация)
            if (existingUser.password) {
              // Проверяем, есть ли уже Google аккаунт
              const existingAccount = await prisma.account.findFirst({
                where: {
                  userId: existingUser.id,
                  provider: 'google'
                }
              })

              // Если Google аккаунта нет, создаем связь
              if (!existingAccount) {
                await prisma.account.create({
                  data: {
                    userId: existingUser.id,
                    type: 'oauth',
                    provider: 'google',
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  }
                })
                
                // Добавляем флаг в токен, что аккаунты были связаны
                // Это будет использовано для показа уведомления
                console.log('Google account linked to existing user:', existingUser.email)
                
                // Устанавливаем флаг в токене для показа уведомления
                // Это будет обработано в JWT callback
                ;(user as any).accountLinked = true
              }
            }
            // Если у пользователя нет пароля, значит он уже был создан через Google
            // В этом случае просто продолжаем вход
          }
          // Если пользователя нет, PrismaAdapter создаст его автоматически
        } catch (error) {
          console.error('Error in Google signIn callback:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
