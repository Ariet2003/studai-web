import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    // Валидация данных
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email и код обязательны' },
        { status: 400 }
      )
    }

    // Поиск кода верификации
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

    // Находим пользователя для получения данных
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 400 }
      )
    }

    // Обновляем пользователя - подтверждаем email
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date()
      }
    })

    // Отмечаем код как использованный
    await (prisma as any).verificationCode.update({
      where: { id: verificationCode.id },
      data: { verified: true }
    })

    return NextResponse.json({
      message: 'Email успешно подтвержден!',
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
