import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getTranslation } from '@/translations'
import { Language } from '@/contexts/LanguageContext'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code, newPassword, confirmPassword, language = 'ru' } = body

    // Валидация данных
    if (!email || !code || !newPassword || !confirmPassword) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.fillRequiredFields },
        { status: 400 }
      )
    }

    // Проверка совпадения паролей
    if (newPassword !== confirmPassword) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.passwordsNotMatch },
        { status: 400 }
      )
    }

    // Проверка длины пароля
    if (newPassword.length < 6) {
      const t = getTranslation(language as Language)
      return NextResponse.json(
        { error: t.auth.toast.error.passwordTooShort },
        { status: 400 }
      )
    }

    // Поиск кода восстановления
    const verificationCode = await (prisma as any).verificationCode.findFirst({
      where: {
        email,
        code,
        verified: false,
        expires: {
          gte: new Date()
        }
      }
    })

    if (!verificationCode) {
      return NextResponse.json(
        { error: 'Неверный или истекший код' },
        { status: 400 }
      )
    }

    // Проверяем существование пользователя
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // Хеширование нового пароля
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Обновляем пароль пользователя
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword
      }
    })

    // Отмечаем код как использованный
    await (prisma as any).verificationCode.update({
      where: { id: verificationCode.id },
      data: { verified: true }
    })

    return NextResponse.json({
      message: 'Пароль успешно изменен!',
      success: true
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
