# Система аутентификации StudAI

## Что реализовано

### ✅ Основные функции
- **Регистрация через форму** - с полным именем, email и паролем
- **Вход через форму** - с проверкой credentials
- **Google OAuth** - автоматическая регистрация и вход
- **Двухфакторная аутентификация (2FA)** - для обычной регистрации
- **Верификация email** - обязательная для новых пользователей
- **Сессии с куки** - автоматический вход при повторном посещении
- **Middleware защита** - для защищенных маршрутов

### 🗄️ База данных
- **Prisma** с PostgreSQL
- **Схема пользователей** с поддержкой OAuth и 2FA
- **Миграции** уже выполнены
- **Настроено для БД**: studai на localhost:5432

### 🎨 UI/UX
- **Адаптивный дизайн** - работает на всех устройствах
- **Поддержка тем** - светлая и темная тема
- **Мультиязычность** - русский, кыргызский, английский
- **Интеграция с существующим дизайном** - использует ваши компоненты

## Настройка

### 1. Переменные окружения
Создайте файл `.env.local` в корне проекта:

```env
# NextAuth.js
NEXTAUTH_SECRET=your-super-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (получите в Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (для отправки уведомлений)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# PostgreSQL Database (настроено для вашей БД)
DATABASE_URL="postgresql://postgres:12345@localhost:5432/studai"
```

### 2. Google OAuth настройка
1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Перейдите в "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Выберите "Web application"
6. Добавьте authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (для разработки)
   - `https://yourdomain.com/api/auth/callback/google` (для продакшена)

### 3. Email настройка (Gmail)
1. Включите двухфакторную аутентификацию в Gmail
2. Создайте App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Выберите "Mail" и "Other (Custom name)"
   - Используйте сгенерированный пароль как `EMAIL_PASSWORD`

### 4. База данных
Убедитесь, что PostgreSQL запущен и база данных `studai` создана:
```sql
CREATE DATABASE studai;
```

### 5. Запуск
```bash
npm install
npm run dev
```

База данных будет автоматически синхронизирована при первом запуске.

## Маршруты

### Публичные страницы
- `/` - главная страница (обновлена с аутентификацией)
- `/auth/signin` - вход
- `/auth/signup` - регистрация
- `/auth/verify-email` - верификация email

### Защищенные страницы
- `/profile` - профиль пользователя с настройками 2FA
- `/auth/2fa/setup` - настройка двухфакторной аутентификации

### API эндпоинты
- `/api/auth/[...nextauth]` - NextAuth.js обработчик
- `/api/auth/register` - регистрация пользователя
- `/api/auth/verify-email` - верификация email
- `/api/auth/2fa/setup` - настройка 2FA
- `/api/auth/2fa/disable` - отключение 2FA

## Особенности реализации

### 🔐 Безопасность
- Пароли хешируются с bcryptjs
- JWT токены для сессий
- CSRF защита встроена в NextAuth.js
- Коды восстановления для 2FA

### 📱 2FA процесс
1. Пользователь включает 2FA в профиле
2. QR-код отправляется на email
3. Пользователь сканирует код в Google Authenticator/Authy
4. Подтверждает настройку вводом кода
5. Получает резервные коды для восстановления

### 🌍 Мультиязычность
Все тексты переведены на 3 языка:
- Русский (по умолчанию)
- Кыргызский
- Английский

### 🎨 UI компоненты
- `SignInForm` - форма входа с поддержкой 2FA
- `SignUpForm` - форма регистрации
- `TwoFactorSetup` - настройка 2FA
- `ProfileForm` - управление аккаунтом
- `AuthButton` - кнопка аутентификации для хедера

## Дальнейшие улучшения

### Рекомендуемые доработки
1. **Сброс пароля** - добавить функцию "Забыли пароль?"
2. **Социальные сети** - добавить Facebook, Apple ID
3. **Role-based access** - система ролей пользователей
4. **Аудит логи** - отслеживание входов/выходов
5. **Rate limiting** - защита от брутфорса
6. **Email шаблоны** - красивые HTML письма

### Для продакшена
1. Замените SQLite на PostgreSQL/MySQL
2. Настройте Redis для сессий
3. Добавьте мониторинг ошибок (Sentry)
4. Настройте HTTPS
5. Добавьте backup стратегию для БД

## Использование

### В компонентах
```tsx
import { useSession } from 'next-auth/react'

function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <p>Загрузка...</p>
  
  if (session) {
    return <p>Добро пожаловать, {session.user.name}!</p>
  }
  
  return <p>Вы не авторизованы</p>
}
```

### Защита страниц
```tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }
  
  return <div>Защищенный контент</div>
}
```

Система полностью готова к использованию! 🚀
