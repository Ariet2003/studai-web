import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Токен не найден' },
        { status: 400 }
      )
    }

    // Поиск токена в базе данных
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 400 }
      )
    }

    // Проверка срока действия токена
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      })
      return NextResponse.json(
        { error: 'Токен истек' },
        { status: 400 }
      )
    }

    // Обновление статуса верификации пользователя
    await prisma.user.update({
      where: { id: verificationToken.userId! },
      data: { emailVerified: new Date() }
    })

    // Удаление использованного токена
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    })

    return NextResponse.json(
      { message: 'Email успешно подтвержден!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
