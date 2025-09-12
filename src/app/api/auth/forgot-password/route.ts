import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationCode } from '@/lib/email'
import { getTranslation } from '@/translations'
import { Language } from '@/contexts/LanguageContext'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, language = 'ru' } = body

    // Валидация данных
    if (!email) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.fillRequiredFields },
        { status: 400 }
      )
    }

    // Проверяем существование пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (!existingUser) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.userNotFound },
        { status: 404 }
      )
    }

    // Проверяем, что у пользователя есть пароль (не Google пользователь)
    if (!existingUser.password) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.warning.googleUserWarning, googleUser: true },
        { status: 400 }
      )
    }

    // Генерация 6-значного кода
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Удаляем старые коды для этого email
    await (prisma as any).verificationCode.deleteMany({
      where: { email }
    })

    // Создание кода восстановления пароля
    await (prisma as any).verificationCode.create({
      data: {
        email,
        code: resetCode,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
      }
    })

    // Отправка email с кодом
    await sendVerificationCode(email, resetCode, 'password_reset', language)

    return NextResponse.json({
      message: 'Код восстановления пароля отправлен на ваш email!',
      email: email
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
