import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Публичные маршруты
        const publicPaths = [
          '/',
          '/auth/signin',
          '/auth/signup',
          '/auth/verify-email',
          '/auth/verify-code',
          '/auth/forgot-password',
          '/auth/reset-password',
          '/privacy',
          '/terms'
        ]
        
        // Проверяем, является ли путь публичным
        if (publicPaths.some(path => pathname.startsWith(path))) {
          return true
        }
        
        // API маршруты аутентификации должны быть доступны
        if (pathname.startsWith('/api/auth/')) {
          return true
        }
        
        // Защищенные маршруты требуют токен
        if (pathname.startsWith('/profile') || 
            pathname.startsWith('/dashboard') ||
            pathname.startsWith('/auth/2fa')) {
          return !!token
        }
        
        return true
      }
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)'
  ]
}
