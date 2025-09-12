import nodemailer from 'nodemailer'
import { getTranslation } from '@/translations'
import { Language } from '@/contexts/LanguageContext'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendVerificationCode(email: string, code: string, type: 'registration' | 'password_reset' = 'registration', language: Language = 'ru') {
  const isPasswordReset = type === 'password_reset'
  const t = getTranslation(language)
  const emailContent = isPasswordReset ? t.auth.email.passwordReset : t.auth.email.registration
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: emailContent.subject,
    html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
        <h1 style="color: #1E1E2F; font-size: 28px; margin-bottom: 16px;">${emailContent.title}</h1>
        <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 32px;">
            ${emailContent.message}
        </p>

        <div style="display: inline-block; padding: 20px 40px; border: 2px dashed #4F46E5; border-radius: 12px; background-color: #F4F4FF; margin-bottom: 32px;">
            <span style="color: #4F46E5; font-size: 36px; font-weight: bold; letter-spacing: 6px; font-family: 'Courier New', monospace;">${code}</span>
        </div>

        <p style="color: #777777; font-size: 14px; margin-bottom: 8px;">
            ${emailContent.codeValid}
        </p>
        <p style="color: #AAAAAA; font-size: 12px;">
            ${emailContent.ignoreMessage}
        </p>
        </div>

    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function send2FASetupEmail(email: string, qrCodeDataUrl: string, secret: string, language: Language = 'ru') {
  const t = getTranslation(language)
  const emailContent = t.auth.email.twoFactor
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: emailContent.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${emailContent.title}</h2>
        <p>${emailContent.scanMessage}</p>
        <img src="${qrCodeDataUrl}" alt="QR Code" style="margin: 20px 0;" />
        <p>${emailContent.manualMessage}</p>
        <p style="background-color: #f5f5f5; padding: 10px; font-family: monospace; word-break: break-all;">${secret}</p>
        <p style="color: #666; font-size: 14px;">${emailContent.saveMessage}</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
