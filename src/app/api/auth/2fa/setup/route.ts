import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { send2FASetupEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Пользователь не авторизован' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json(
        { error: 'Двухфакторная аутентификация уже включена' },
        { status: 400 }
      )
    }

    // Генерация секретного ключа
    const secret = speakeasy.generateSecret({
      name: user.email,
      issuer: 'StudAI',
    })

    // Генерация QR-кода
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url!)

    // Сохранение временного секрета
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: secret.base32,
        type: '2fa_setup',
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
        userId: user.id
      }
    })

    // Отправка QR-кода на email
    await send2FASetupEmail(user.email, qrCodeDataUrl, secret.base32)

    return NextResponse.json({
      message: 'QR-код отправлен на ваш email',
      qrCodeDataUrl,
      secret: secret.base32
    })

  } catch (error) {
    console.error('2FA setup error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Пользователь не авторизован' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Код не предоставлен' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // Поиск временного секрета
    const setupToken = await prisma.verificationToken.findFirst({
      where: {
        userId: user.id,
        type: '2fa_setup',
        expires: { gt: new Date() }
      }
    })

    if (!setupToken) {
      return NextResponse.json(
        { error: 'Токен настройки не найден или истек' },
        { status: 400 }
      )
    }

    // Проверка кода
    const verified = speakeasy.totp.verify({
      secret: setupToken.token,
      encoding: 'base32',
      token: token,
      window: 1
    })

    if (!verified) {
      return NextResponse.json(
        { error: 'Неверный код' },
        { status: 400 }
      )
    }

    // Генерация кодов восстановления
    const backupCodes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    )

    // Включение 2FA
    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: setupToken.token,
        backupCodes: JSON.stringify(backupCodes)
      }
    })

    // Удаление временного токена
    await prisma.verificationToken.delete({
      where: { id: setupToken.id }
    })

    return NextResponse.json({
      message: 'Двухфакторная аутентификация успешно включена',
      backupCodes
    })

  } catch (error) {
    console.error('2FA enable error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
