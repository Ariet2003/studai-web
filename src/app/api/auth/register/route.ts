import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendVerificationCode } from '@/lib/email'
import { getTranslation } from '@/translations'
import { Language } from '@/contexts/LanguageContext'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, resend, language = 'ru' } = body

    // Для повторной отправки кода нужен только email
    if (resend) {
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
        return NextResponse.json(
          { error: 'Пользователь не найден' },
          { status: 400 }
        )
      }

      // Генерация нового кода
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Удаляем старые коды для этого email
      await (prisma as any).verificationCode.deleteMany({
        where: { email }
      })

      // Создание нового кода верификации
      await (prisma as any).verificationCode.create({
        data: {
          email,
          code: verificationCode,
          expires: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
        }
      })

      // Отправка email с кодом
      await sendVerificationCode(email, verificationCode, 'registration', language)

      return NextResponse.json({
        message: 'Новый код подтверждения отправлен на ваш email!',
        resent: true
      })
    }

    // Валидация данных для полной регистрации
    if (!email || !password || !name) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.fillRequiredFields },
        { status: 400 }
      )
    }

    // Проверка длины пароля
    if (password.length < 6) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.passwordTooShort },
        { status: 400 }
      )
    }

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      const t = getTranslation(language as Language)
      
      // Проверяем, зарегистрирован ли пользователь через Google
      if (!existingUser.password) {
        return NextResponse.json(
          { error: t.auth.toast.warning.googleUserWarning, googleUser: true },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: t.auth.toast.error.userExists },
        { status: 400 }
      )
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 12)

    // Создание пользователя (пока не подтвержден)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerified: null, // Будет установлено после подтверждения кода
      }
    })

    // Генерация 6-значного кода
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Удаляем старые коды для этого email
    await (prisma as any).verificationCode.deleteMany({
      where: { email }
    })

    // Создание кода верификации
    await (prisma as any).verificationCode.create({
      data: {
        email,
        code: verificationCode,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
      }
    })

    // Отправка email с кодом
    await sendVerificationCode(email, verificationCode, 'registration', language)

    return NextResponse.json({
      message: 'Код подтверждения отправлен на ваш email!',
      email: email // Нужно для перенаправления на страницу ввода кода
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}