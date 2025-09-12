import { Language } from '@/contexts/LanguageContext'

export interface Translations {
  // Header
  nav: {
    services: string
    howItWorks: string
    benefits: string
    reviews: string
    faq: string
    login: string
    createAccount: string
    start: string
  }
  
  // Authentication
  auth: {
    // General
    or: string
    back: string
    continue: string
    loading: string
    
    // Sign In
    signIn: {
      title: string
      subtitle: string
      email: string
      password: string
      signInButton: string
      forgotPassword: string
      noAccount: string
      signUp: string
      withGoogle: string
      twoFactorCode: string
      twoFactorTitle: string
      twoFactorSubtitle: string
      backupCode: string
      useBackupCode: string
      useAuthenticator: string
      verifyButton: string
      // Placeholders
      emailPlaceholder: string
      passwordPlaceholder: string
    }
    
    // Sign Up
    signUp: {
      title: string
      subtitle: string
      firstName: string
      lastName: string
      middleName: string
      email: string
      password: string
      confirmPassword: string
      signUpButton: string
      hasAccount: string
      signIn: string
      withGoogle: string
      termsAgreement: string
      privacyPolicy: string
      terms: string
      // Placeholders
      namePlaceholder: string
      emailPlaceholder: string
      passwordPlaceholder: string
      confirmPasswordPlaceholder: string
    }
    
    // Forgot Password
    forgotPassword: {
      title: string
      subtitle: string
      email: string
      sendCodeButton: string
      backToSignIn: string
      // Placeholders
      emailPlaceholder: string
    }
    
    // Reset Password
    resetPassword: {
      title: string
      subtitle: string
      code: string
      newPassword: string
      confirmPassword: string
      resetButton: string
      resendText: string
      resendCode: string
      backToSignIn: string
      // Placeholders
      codePlaceholder: string
      newPasswordPlaceholder: string
      confirmPasswordPlaceholder: string
    }
    
    // Two Factor Authentication
    twoFactor: {
      title: string
      subtitle: string
      setupTitle: string
      setupSubtitle: string
      scanQR: string
      enterCode: string
      enterCodePlaceholder: string
      enableButton: string
      disableButton: string
      backupCodes: string
      backupCodesSubtitle: string
      saveBackupCodes: string
      downloadBackupCodes: string
    }
    
    // Messages
    messages: {
      // Success
      registrationSuccess: string
      emailVerified: string
      twoFactorEnabled: string
      twoFactorDisabled: string
      passwordReset: string
      
      // Errors
      invalidCredentials: string
      userNotFound: string
      emailAlreadyExists: string
      passwordTooShort: string
      passwordsDoNotMatch: string
      invalidEmail: string
      twoFactorRequired: string
      invalid2FACode: string
      emailNotVerified: string
      accountNotFound: string
      tokenExpired: string
      invalidToken: string
      serverError: string
      
      // Email verification
      checkEmail: string
      emailSent: string
      verificationEmailSent: string
    }
    
    // Toast Messages
    toast: {
      // Titles
      titles: {
        success: string
        error: string
        warning: string
        info: string
      }
      // Success messages
      success: {
        registration: string
        login: string
        passwordReset: string
        emailSent: string
        codeVerified: string
        passwordChanged: string
        accountLinked: string
        welcome: string
      }
      // Error messages
      error: {
        fillAllFields: string
        invalidEmail: string
        passwordTooShort: string
        passwordsNotMatch: string
        invalidCode: string
        expiredCode: string
        userNotFound: string
        googleUser: string
        serverError: string
        registrationFailed: string
        loginFailed: string
        resetFailed: string
        codeNotReceived: string
        invalidCredentials: string
        invalid2FACode: string
        invalidEmailOrPassword: string
        googleUserMessage: string
        fillRequiredFields: string
        enter2FACode: string
        userExists: string
        // Browser validation messages
        fillThisField: string
        enterValidEmail: string
        passwordTooShortBrowser: string
        passwordsMustMatch: string
      }
      // Warning messages
      warning: {
        googleSignIn: string
        accountExists: string
        googleUserWarning: string
      }
      // Info messages
      info: {
        twoFactorRequired: string
        codeSent: string
        checkEmail: string
        twoFactorTitle: string
        twoFactorMessage: string
      }
    }
    
    // Email verification
    verifyEmail: {
      title: string
      subtitle: string
      success: string
      expired: string
      invalid: string
      resend: string
    }
    
    // Verify Code Page
    verifyCode: {
      title: string
      subtitle: string
      codeLabel: string
      codePlaceholder: string
      verifyButton: string
      resendText: string
      resendButton: string
      backToSignIn: string
    }
    
    // Email Messages
    email: {
      registration: {
        subject: string
        title: string
        message: string
        codeValid: string
        ignoreMessage: string
      }
      passwordReset: {
        subject: string
        title: string
        message: string
        codeValid: string
        ignoreMessage: string
      }
      twoFactor: {
        subject: string
        title: string
        scanMessage: string
        manualMessage: string
        saveMessage: string
      }
    }
    
    // Profile
    profile: {
      title: string
      personalInfo: string
      security: string
      firstName: string
      lastName: string
      middleName: string
      email: string
      changePassword: string
      currentPassword: string
      newPassword: string
      confirmNewPassword: string
      twoFactorAuth: string
      enable2FA: string
      disable2FA: string
      save: string
      signOut: string
    }
  }
  
  // Hero section
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    createWork: string
    pricing: string
    examples: {
      essay: {
        title: string
        topic: string
        price: string
        time: string
      }
      coursework: {
        title: string
        topic: string
        price: string
        time: string
      }
      srs: {
        title: string
        topic: string
        price: string
        time: string
      }
      report: {
        title: string
        topic: string
        price: string
        time: string
      }
    }
  }
  
  // Services section
  services: {
    title: string
    subtitle: string
    essay: {
      title: string
      description: string
      from: string
      pages: string
      time: string
    }
    coursework: {
      title: string
      description: string
      from: string
      pages: string
      time: string
    }
    srs: {
      title: string
      description: string
      from: string
      pages: string
      time: string
    }
    presentation: {
      title: string
      description: string
      from: string
      pages: string
      time: string
    }
  }
  
  // How it works section
  howItWorks: {
    title: string
    subtitle: string
    step1: {
      title: string
      description: string
    }
    step2: {
      title: string
      description: string
    }
    step3: {
      title: string
      description: string
    }
  }
  
  // Benefits section
  benefits: {
    title: string
    subtitle: string
    speed: {
      title: string
      subtitle: string
    }
    quality: {
      title: string
      subtitle: string
    }
    uniqueness: {
      title: string
      subtitle: string
    }
    support: {
      title: string
      subtitle: string
    }
    pricing: {
      title: string
      subtitle: string
    }
  }
  
  // Testimonials section
  testimonials: {
    title: string
    subtitle: string
    universities: string[]
    reviews: {
      r1: {
        name: string
        university: string
        review: string
      }
      r2: {
        name: string
        university: string
        review: string
      }
      r3: {
        name: string
        university: string
        review: string
      }
      r4: {
        name: string
        university: string
        review: string
      }
      r5: {
        name: string
        university: string
        review: string
      }
      r6: {
        name: string
        university: string
        review: string
      }
    }
  }
  
  // FAQ section
  faq: {
    title: string
    subtitle: string
    questions: {
      q1: {
        question: string
        answer: string
      }
      q2: {
        question: string
        answer: string
      }
      q3: {
        question: string
        answer: string
      }
      q4: {
        question: string
        answer: string
      }
      q5: {
        question: string
        answer: string
      }
      q6: {
        question: string
        answer: string
      }
      q7: {
        question: string
        answer: string
      }
      q8: {
        question: string
        answer: string
      }
    }
  }
  
  // Ready section
  ready: {
    title: string
    subtitle: string
    createOrder: string
  }
  
  // Footer
  footer: {
    description: string
    services: string
    company: string
    contact: string
    servicesLinks: {
      essays: string
      coursework: string
      srs: string
      presentations: string
      reports: string
    }
    companyLinks: {
      about: string
      reviews: string
      guarantees: string
      faq: string
      support: string
    }
    copyright: string
    privacy: string
    terms: string
  }
}

const russianTranslations: Translations = {
  nav: {
    services: 'Услуги',
    howItWorks: 'Как работает',
    benefits: 'Преимущества',
    reviews: 'Отзывы',
    faq: 'FAQ',
    login: 'Войти',
    createAccount: 'Создать аккаунт',
    start: 'Начать'
  },
  auth: {
    or: 'или',
    back: 'Назад',
    continue: 'Продолжить',
    loading: 'Загрузка...',
    
    signIn: {
      title: 'Вход в аккаунт',
      subtitle: 'Добро пожаловать обратно! Введите ваши данные для входа.',
      email: 'Email адрес',
      password: 'Пароль',
      signInButton: 'Войти',
      forgotPassword: 'Забыли пароль?',
      noAccount: 'Нет аккаунта?',
      signUp: 'Зарегистрироваться',
      withGoogle: 'Войти через Google',
      twoFactorCode: 'Код двухфакторной аутентификации',
      twoFactorTitle: 'Двухфакторная аутентификация',
      twoFactorSubtitle: 'Введите код из вашего приложения аутентификатора',
      backupCode: 'Резервный код',
      useBackupCode: 'Использовать резервный код',
      useAuthenticator: 'Использовать аутентификатор',
      verifyButton: 'Подтвердить',
      // Placeholders
      emailPlaceholder: 'example@mail.com',
      passwordPlaceholder: 'Введите пароль'
    },
    
    signUp: {
      title: 'Создание аккаунта',
      subtitle: 'Создайте аккаунт, чтобы начать пользоваться StudAI',
      firstName: 'Имя',
      lastName: 'Фамилия',
      middleName: 'Отчество (необязательно)',
      email: 'Email адрес',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signUpButton: 'Зарегистрироваться',
      hasAccount: 'Уже есть аккаунт?',
      signIn: 'Войти',
      withGoogle: 'Зарегистрироваться через Google',
      termsAgreement: 'Я согласен с',
      privacyPolicy: 'Политикой конфиденциальности',
      terms: 'Условиями использования',
      // Placeholders
      namePlaceholder: 'Введите ваше полное имя',
      emailPlaceholder: 'example@mail.com',
      passwordPlaceholder: 'Минимум 6 символов',
      confirmPasswordPlaceholder: 'Повторите пароль'
    },
    
    // Forgot Password
    forgotPassword: {
      title: 'Забыли пароль?',
      subtitle: 'Введите ваш email и мы отправим код для восстановления пароля',
      email: 'Email адрес',
      sendCodeButton: 'Отправить код',
      backToSignIn: '← Вернуться к входу',
      // Placeholders
      emailPlaceholder: 'example@mail.com'
    },
    
    // Reset Password
    resetPassword: {
      title: 'Сброс пароля',
      subtitle: 'Мы отправили код на',
      code: 'Введите код подтверждения',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердите пароль',
      resetButton: 'Сбросить пароль',
      resendText: 'Не получили код?',
      resendCode: 'Отправить повторно',
      backToSignIn: '← Вернуться к входу',
      // Placeholders
      codePlaceholder: '000000',
      newPasswordPlaceholder: 'Минимум 6 символов',
      confirmPasswordPlaceholder: 'Повторите пароль'
    },
    
    twoFactor: {
      title: 'Двухфакторная аутентификация',
      subtitle: 'Защитите ваш аккаунт дополнительным уровнем безопасности',
      setupTitle: 'Настройка двухфакторной аутентификации',
      setupSubtitle: 'Отсканируйте QR-код с помощью приложения Google Authenticator',
      scanQR: 'Отсканируйте QR-код',
      enterCode: 'Введите код для подтверждения',
      enterCodePlaceholder: 'Введите 6-значный код',
      enableButton: 'Включить 2FA',
      disableButton: 'Отключить 2FA',
      backupCodes: 'Резервные коды',
      backupCodesSubtitle: 'Сохраните эти коды в безопасном месте',
      saveBackupCodes: 'Сохранить коды',
      downloadBackupCodes: 'Скачать коды'
    },
    
    messages: {
      registrationSuccess: 'Регистрация прошла успешно! Проверьте email для подтверждения.',
      emailVerified: 'Email успешно подтвержден!',
      twoFactorEnabled: 'Двухфакторная аутентификация включена',
      twoFactorDisabled: 'Двухфакторная аутентификация отключена',
      passwordReset: 'Пароль успешно сброшен',
      
      invalidCredentials: 'Неверный email или пароль',
      userNotFound: 'Пользователь не найден',
      emailAlreadyExists: 'Пользователь с таким email уже существует',
      passwordTooShort: 'Пароль должен содержать минимум 6 символов',
      passwordsDoNotMatch: 'Пароли не совпадают',
      invalidEmail: 'Неверный формат email',
      twoFactorRequired: 'Требуется код двухфакторной аутентификации',
      invalid2FACode: 'Неверный код двухфакторной аутентификации',
      emailNotVerified: 'Email не подтвержден',
      accountNotFound: 'Аккаунт не найден',
      tokenExpired: 'Токен истек',
      invalidToken: 'Недействительный токен',
      serverError: 'Внутренняя ошибка сервера',
      
      checkEmail: 'Проверьте ваш email',
      emailSent: 'Email отправлен',
      verificationEmailSent: 'Email с подтверждением отправлен'
    },
    
    // Toast Messages
    toast: {
      // Titles
      titles: {
        success: 'Успешно!',
        error: 'Ошибка',
        warning: 'Предупреждение',
        info: 'Информация'
      },
      // Success messages
      success: {
        registration: 'Регистрация успешна!',
        login: 'Вход выполнен!',
        passwordReset: 'Пароль сброшен!',
        emailSent: 'Email отправлен!',
        codeVerified: 'Код подтвержден!',
        passwordChanged: 'Пароль изменен!',
        accountLinked: 'Аккаунт связан!',
        welcome: 'Добро пожаловать!'
      },
      // Error messages
      error: {
        fillAllFields: 'Заполните все обязательные поля',
        invalidEmail: 'Неверный формат email',
        passwordTooShort: 'Пароль должен содержать минимум 6 символов',
        passwordsNotMatch: 'Пароли не совпадают',
        invalidCode: 'Неверный код',
        expiredCode: 'Код истек',
        userNotFound: 'Пользователь не найден',
        googleUser: 'Этот аккаунт зарегистрирован через Google',
        serverError: 'Внутренняя ошибка сервера',
        registrationFailed: 'Ошибка регистрации',
        loginFailed: 'Ошибка входа',
        resetFailed: 'Ошибка сброса пароля',
        codeNotReceived: 'Код не получен',
        invalidCredentials: 'Неверные данные для входа',
        invalid2FACode: 'Неверный код двухфакторной аутентификации',
        invalidEmailOrPassword: 'Неверный email или пароль',
        googleUserMessage: 'Этот аккаунт зарегистрирован через Google. Используйте кнопку "Войти через Google"',
        fillRequiredFields: 'Заполните все обязательные поля',
        enter2FACode: 'Введите код двухфакторной аутентификации',
        userExists: 'Пользователь с таким email уже существует',
        // Browser validation messages
        fillThisField: 'Заполните это поле',
        enterValidEmail: 'Введите корректный email адрес',
        passwordTooShortBrowser: 'Пароль должен содержать минимум 6 символов',
        passwordsMustMatch: 'Пароли должны совпадать'
      },
      // Warning messages
      warning: {
        googleSignIn: 'Вход через Google',
        accountExists: 'Аккаунт уже существует',
        googleUserWarning: 'Этот email уже зарегистрирован через Google. Используйте кнопку "Войти через Google"'
      },
      // Info messages
      info: {
        twoFactorRequired: 'Двухфакторная аутентификация',
        codeSent: 'Код подтверждения отправлен на ваш email!',
        checkEmail: 'Проверьте ваш email',
        twoFactorTitle: 'Двухфакторная аутентификация',
        twoFactorMessage: 'Введите код из вашего приложения-аутентификатора'
      }
    },
    
    verifyEmail: {
      title: 'Подтверждение email',
      subtitle: 'Мы отправили ссылку для подтверждения на ваш email',
      success: 'Email успешно подтвержден!',
      expired: 'Ссылка истекла',
      invalid: 'Недействительная ссылка',
      resend: 'Отправить повторно'
    },
    
    // Verify Code Page
    verifyCode: {
      title: 'Подтвердите ваш email',
      subtitle: 'Мы отправили 6-значный код на',
      codeLabel: 'Введите код подтверждения',
      codePlaceholder: '000000',
      verifyButton: 'Подтвердить',
      resendText: 'Не получили код?',
      resendButton: 'Отправить повторно',
      backToSignIn: '← Вернуться к входу'
    },
    
    // Email Messages
    email: {
      registration: {
        subject: 'Код подтверждения регистрации - StudAI',
        title: 'Добро пожаловать в StudAI!',
        message: 'Спасибо за регистрацию. Для завершения процесса введите код подтверждения ниже:',
        codeValid: 'Код действителен в течение 10 минут.',
        ignoreMessage: 'Если вы не регистрировались на StudAI, просто проигнорируйте это письмо.'
      },
      passwordReset: {
        subject: 'Код восстановления пароля - StudAI',
        title: 'Восстановление пароля',
        message: 'Для восстановления пароля введите код подтверждения ниже:',
        codeValid: 'Код действителен в течение 10 минут.',
        ignoreMessage: 'Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.'
      },
      twoFactor: {
        subject: 'Настройка двухфакторной аутентификации - StudAI',
        title: 'Настройка двухфакторной аутентификации',
        scanMessage: 'Отсканируйте QR-код с помощью приложения Google Authenticator или Authy:',
        manualMessage: 'Или введите этот секретный ключ вручную:',
        saveMessage: 'Сохраните этот код в надежном месте - он понадобится для восстановления доступа.'
      }
    },
    
    profile: {
      title: 'Профиль',
      personalInfo: 'Личная информация',
      security: 'Безопасность',
      firstName: 'Имя',
      lastName: 'Фамилия',
      middleName: 'Отчество',
      email: 'Email',
      changePassword: 'Изменить пароль',
      currentPassword: 'Текущий пароль',
      newPassword: 'Новый пароль',
      confirmNewPassword: 'Подтвердите новый пароль',
      twoFactorAuth: 'Двухфакторная аутентификация',
      enable2FA: 'Включить 2FA',
      disable2FA: 'Отключить 2FA',
      save: 'Сохранить',
      signOut: 'Выйти'
    }
  },
  hero: {
    badge: 'Лучший ИИ-помощник',
    title: 'StudAI — создавайте студенческие работы с помощью ИИ всего',
    titleHighlight: 'за 3 минуты',
    subtitle: 'Рефераты, курсовые работы, СРС и доклады высочайшего качества. Просто введите тему, количество страниц, тип работы и ваша работа будет готова за считанные минуты.',
    createWork: 'Заказать работу',
    pricing: 'Стоимость',
    examples: {
      essay: {
        title: 'Реферат по истории',
        topic: '"Великая Отечественная война"',
        price: '700 сом',
        time: '3.2 мин'
      },
      coursework: {
        title: 'Курсовая работа',
        topic: '"Анализ рынка IT-услуг"',
        price: '1800 сом',
        time: '2.1 мин'
      },
      srs: {
        title: 'СРС по физике',
        topic: '"Квантовая механика"',
        price: '450 сом',
        time: '2.7 мин'
      },
      report: {
        title: 'Доклад',
        topic: '"Экология и природа"',
        price: '550 сом',
        time: '2.4 мин'
      }
    }
  },
  services: {
    title: 'Наши услуги',
    subtitle: 'Профессиональная помощь студентам во всех видах академических работ',
    essay: {
      title: 'Рефераты',
      description: 'Качественные рефераты по любым предметам с уникальностью 90%+',
      from: 'От 300 сом',
      pages: '10-40 стр.',
      time: '3 мин'
    },
    coursework: {
      title: 'Курсовые работы',
      description: 'Серьезные исследовательские работы с глубоким анализом темы',
      from: 'От 1000 сом',
      pages: '30-50 стр.',
      time: '3 мин'
    },
    srs: {
      title: 'СРС',
      description: 'Самостоятельные работы студентов любой сложности',
      from: 'От 300 сом',
      pages: '10-40 стр.',
      time: '3 мин'
    },
    presentation: {
      title: 'Доклады',
      description: 'Доклады для выступлений на семинарах',
      from: 'От 400 сом',
      pages: '10-40 стр.',
      time: '3 мин'
    }
  },
  howItWorks: {
    title: 'Как это работает',
    subtitle: 'Получите потрясающие студенческие работы всего за 3 простых шага',
    step1: {
      title: 'Введите требования',
      description: 'Опишите тему работы, укажите количество страниц, тип работы и особые требования. Наш ИИ проанализирует ваш запрос и создаст план работы.'
    },
    step2: {
      title: 'Подтвердите план',
      description: 'Подтвердите план работы и оплатите заказ. Наш сервис сделает работу за 3 минуты.'
    },
    step3: {
      title: 'Скачайте работу',
      description: 'Получите готовую работу высочайшего качества в формате Word с гарантией уникальности. Наслаждайтесь отличными оценками и свободным временем!'
    }
  },
  benefits: {
    title: 'Почему выбирают нас',
    subtitle: 'Преимущества, которые делают нас лучшими',
    speed: {
      title: 'Скорость',
      subtitle: 'За 3 минуты'
    },
    quality: {
      title: 'Качество',
      subtitle: '100% гарантия'
    },
    uniqueness: {
      title: 'Уникальность',
      subtitle: '90%+'
    },
    support: {
      title: 'Поддержка',
      subtitle: '24/7'
    },
    pricing: {
      title: 'Доступные цены',
      subtitle: 'Без переплат'
    }
  },
  testimonials: {
    title: 'Студенты любят то, что мы делаем',
    subtitle: 'Воспользуйтесь подлинными отзывами и укрепите доверие с помощью отзывов, которые имеют значение.',
    universities: [
      'КНУ им. Ж. Баласагына',
      'КГТУ им. И. Раззакова', 
      'АУЦА',
      'КЭУ им. М. Рыскулбекова',
      'МУК',
      'КГУ им. И. Арабаева',
      'КРСУ',
      'КГМА им. И.К. Ахунбаева',
      'КГУСТА им. Н. Исанова',
      'КГПУ им. И. Арабаева'
    ],
    reviews: {
      r1: {
        name: 'Айтурган Асанова',
        university: 'КНУ им. Ж. Баласагына',
        review: 'Мы очень довольны StudAI и онлайн-поддержкой, которую они предоставляют. Очень быстрое и легкое общение.'
      },
      r2: {
        name: 'Даниил Османов',
        university: 'КГТУ им. И. Раззакова',
        review: 'Мы хотели платформу, которая предоставляла бы нам необходимые функции по справедливой цене.'
      },
      r3: {
        name: 'Гүлнара Токтосунова',
        university: 'АУЦА',
        review: 'Мы используем почти все виджеты StudAI. Они отлично подходят для демонстрации наших работ.'
      },
      r4: {
        name: 'Бекжан Исаков',
        university: 'КЭУ им. М. Рыскулбекова',
        review: 'Команда StudAI потрясающая. Вы можете очень легко связаться и они быстро помогут с вашей проблемой!'
      },
      r5: {
        name: 'Нурайым Токтогулова',
        university: 'МУК',
        review: 'Легко использовать и полезная команда, когда что-то становится слишком техническим для понимания!'
      },
      r6: {
        name: 'Алтынбек Мамбетов',
        university: 'КГУ им. И. Арабаева',
        review: 'Полная платформа для обработки всего, что связано с отзывами. Все задокументировано о том, как реализовать.'
      }
    }
  },
  faq: {
    title: 'Ваши вопросы — наши ответы',
    subtitle: 'Узнайте всё о StudAI: от возможностей до гарантий качества',
    questions: {
      q1: {
        question: 'Как быстро готовятся работы в StudAI?',
        answer: 'Наш ИИ создает качественные работы всего за 3 минуты! Просто введите тему, укажите требования и получите готовую работу в формате Word с гарантией уникальности 90%+.'
      },
      q2: {
        question: 'Какова стоимость услуг StudAI?',
        answer: 'Цены зависят от типа работы и количества страниц. Актуальную цену можно узнать на странице с ценами. Мы предлагаем доступные цены без скрытых комиссий.'
      },
      q3: {
        question: 'Гарантируете ли вы уникальность работ?',
        answer: 'Да! Мы гарантируем уникальность текста 90%+ для всех работ. Наш ИИ создает оригинальный контент, который проходит проверку на плагиат.'
      },
      q4: {
        question: 'Какие типы работ может выполнить StudAI?',
        answer: 'StudAI специализируется на создании рефератов, курсовых работ, СРС (самостоятельных работ студентов) и докладов. Мы работаем с любыми дисциплинами и темами на русском, кыргызском и английском языках.'
      },
      q5: {
        question: 'Можно ли внести изменения в готовую работу?',
        answer: 'Нет, пока что мы не предоставляем возможности для внесения изменений в готовую работу. Но вы можете проверить и изменить текст на свое усмотрение.'
      },
      q6: {
        question: 'Безопасно ли использовать StudAI?',
        answer: 'Абсолютно! Мы обеспечиваем полную конфиденциальность ваших данных. Все ваши работы и личная информация защищены современными методами шифрования. Мы не передаем информацию третьим лицам.'
      },
      q7: {
        question: 'Как происходит оплата?',
        answer: 'После подтверждение плана работы, вам будет доступно кнопки банков (Мбанк, Обанк, Демирбанк) для оплаты. При нажатии на одну из кнопок, вы будете перенаправлены на приложение банка с поставленными счетами и стоимости работы. Вы должны оплатить и отправить чек через сайт. Менеджеры проверят чек за 5 минут и подтвердят заказ. И ваша работа будет готова за 3 минуты.'
      },
      q8: {
        question: 'Может ли StudAI допустить ошибку в работе?',
        answer: 'Да, так как мы используем ИИ, он может допустить ошибку в работе, но только на 5-7%. Мы работаем над тем, чтобы этот процент был минимальным и постепенно уменьшался. Но рекомендуем вам проверять работу на уникальность и качество перед сдачей.'
      }
    }
  },
  ready: {
    title: 'Готовы заказать свою работу?',
    subtitle: 'StudAI поможет вам создать качественную работу за считанные минуты. Рефераты, курсовые, СРС и доклады с гарантией уникальности 90%+.',
    createOrder: 'Сделать заказ'
  },
  footer: {
    description: 'Современный сервис для создания студенческих работ с помощью искусственного интеллекта. Качественные рефераты, курсовые, СРС и доклады за 3 минуты.',
    services: 'Услуги',
    company: 'Компания',
    contact: 'Контакты',
    servicesLinks: {
      essays: 'Рефераты',
      coursework: 'Курсовые работы',
      srs: 'СРС',
      reports: 'Доклады',
      presentations: 'Презентации'
    },
    companyLinks: {
      about: 'О нас',
      reviews: 'Отзывы',
      guarantees: 'Гарантии',
      faq: 'FAQ',
      support: 'Поддержка'
    },
    copyright: '© 2025 StudAI. Все права защищены.',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования'
  }
}

const kyrgyzTranslations: Translations = {
  nav: {
    services: 'Кызматтар',
    howItWorks: 'Кантип иштейт',
    benefits: 'Артыкчылыктар',
    reviews: 'Пикирлер',
    faq: 'Көп берилүүчү суроолор',
    login: 'Кирүү',
    createAccount: 'Аккаунт түзүү',
    start: 'Баштоо'
  },
  auth: {
    or: 'же',
    back: 'Артка',
    continue: 'Улантуу',
    loading: 'Жүктөлүүдө...',
    
    signIn: {
      title: 'Аккаунтка кирүү',
      subtitle: 'Кайра кош келдиңиз! Кирүү үчүн маалыматтарыңызды киргизиңиз.',
      email: 'Email дареги',
      password: 'Сыр сөз',
      signInButton: 'Кирүү',
      forgotPassword: 'Сыр сөздү унуттуңузбу?',
      noAccount: 'Аккаунт жокпу?',
      signUp: 'Катталуу',
      withGoogle: 'Google аркылуу кирүү',
      twoFactorCode: 'Эки факторлук аутентификациянын коду',
      twoFactorTitle: 'Эки факторлук аутентификация',
      twoFactorSubtitle: 'Аутентификатор тиркемеңизден кодду киргизиңиз',
      backupCode: 'Камдык код',
      useBackupCode: 'Камдык кодду колдонуу',
      useAuthenticator: 'Аутентификаторду колдонуу',
      verifyButton: 'Ырастоо',
      // Placeholders
      emailPlaceholder: 'example@mail.com',
      passwordPlaceholder: 'Сыр сөздү киргизиңиз'
    },
    
    signUp: {
      title: 'Аккаунт түзүү',
      subtitle: 'StudAI колдонууну баштоо үчүн аккаунт түзүңүз',
      firstName: 'Аты',
      lastName: 'Фамилиясы',
      middleName: 'Атасынын аты (милдеттүү эмес)',
      email: 'Email дареги',
      password: 'Сыр сөз',
      confirmPassword: 'Сыр сөздү ырастаңыз',
      signUpButton: 'Катталуу',
      hasAccount: 'Аккаунт барбы?',
      signIn: 'Кирүү',
      withGoogle: 'Google аркылуу катталуу',
      termsAgreement: 'Мен макулмун',
      privacyPolicy: 'Купуялуулук саясаты',
      terms: 'Колдонуу шарттары',
      // Placeholders
      namePlaceholder: 'Толук атыңызды киргизиңиз',
      emailPlaceholder: 'example@mail.com',
      passwordPlaceholder: 'Минимум 6 символ',
      confirmPasswordPlaceholder: 'Сыр сөздү кайталаңыз'
    },
    
    // Forgot Password
    forgotPassword: {
      title: 'Сыр сөздү унутуп калдыңызбы?',
      subtitle: 'Email дарегиңизди киргизиңиз, биз сизге сыр сөздү калыбына келтирүү үчүн код жөнөтөбүз',
      email: 'Email дареги',
      sendCodeButton: 'Кодду жөнөтүү',
      backToSignIn: '← Кирүүгө баракчасына кайтуу',
      // Placeholders
      emailPlaceholder: 'example@mail.com'
    },
    
    // Reset Password
    resetPassword: {
      title: 'Сыр сөздү калыбына келтирүү',
      subtitle: 'Биз кодду жөнөттүк',
      code: 'Ырастоо кодун киргизиңиз',
      newPassword: 'Жаңы сыр сөз',
      confirmPassword: 'Сыр сөздү ырастаңыз',
      resetButton: 'Сыр сөздү калыбына келтирүү',
      resendText: 'Код барган жокпу?',
      resendCode: 'Кайра жөнөтүү',
      backToSignIn: '← Кирүүгө баракчасына кайтуу',
      // Placeholders
      codePlaceholder: '000000',
      newPasswordPlaceholder: 'Минимум 6 символ',
      confirmPasswordPlaceholder: 'Сыр сөздү кайталаңыз'
    },
    
    twoFactor: {
      title: 'Эки факторлук аутентификация',
      subtitle: 'Аккаунтуңузду кошумча коопсуздук деңгээли менен коргоңуз',
      setupTitle: 'Эки факторлук аутентификацияны жөндөө',
      setupSubtitle: 'Google Authenticator тиркемеси менен QR-кодду скандаңыз',
      scanQR: 'QR-кодду скандаңыз',
      enterCode: 'Ырастоо үчүн кодду киргизиңиз',
      enterCodePlaceholder: '6 сандуу кодду киргизиңиз',
      enableButton: '2FA күйгүзүү',
      disableButton: '2FA өчүрүү',
      backupCodes: 'Камдык коддору',
      backupCodesSubtitle: 'Бул коддорду коопсуз жерде сактаңыз',
      saveBackupCodes: 'Коддорду сактоо',
      downloadBackupCodes: 'Коддорду жүктөп алуу'
    },
    
    messages: {
      registrationSuccess: 'Катталуу ийгиликтүү! Ырастоо үчүн email текшериңиз.',
      emailVerified: 'Email ийгиликтүү ырасталды!',
      twoFactorEnabled: 'Эки факторлук аутентификация күйгүзүлдү',
      twoFactorDisabled: 'Эки факторлук аутентификация өчүрүлдү',
      passwordReset: 'Сыр сөз ийгиликтүү калыбына келтирилди',
      
      invalidCredentials: 'Туура эмес email же сыр сөз',
      userNotFound: 'Колдонуучу табылган жок',
      emailAlreadyExists: 'Мындай email менен колдонуучу мурдатан бар',
      passwordTooShort: 'Сыр сөз кеминде 6 белгиден турушу керек',
      passwordsDoNotMatch: 'Сыр сөздөр дал келбейт',
      invalidEmail: 'Email форматы туура эмес',
      twoFactorRequired: 'Эки факторлук аутентификациянын коду талап кылынат',
      invalid2FACode: 'Эки факторлук аутентификациянын коду туура эмес',
      emailNotVerified: 'Email ырасталган эмес',
      accountNotFound: 'Аккаунт табылган жок',
      tokenExpired: 'Токен мөөнөтү бүттү',
      invalidToken: 'Жараксыз токен',
      serverError: 'Сервердин ички катасы',
      
      checkEmail: 'Email адресиңизди текшериңиз',
      emailSent: 'Email жөнөтүлдү',
      verificationEmailSent: 'Ырастоо email жөнөтүлдү'
    },
    
    // Toast Messages
    toast: {
      // Titles
      titles: {
        success: 'Ийгиликтүү!',
        error: 'Ката',
        warning: 'Эскертүү',
        info: 'Маалымат'
      },
      // Success messages
      success: {
        registration: 'Катталуу ийгиликтүү!',
        login: 'Кирүү ийгиликтүү!',
        passwordReset: 'Сыр сөз калыбына келтирилди!',
        emailSent: 'Email жөнөтүлдү!',
        codeVerified: 'Код ырасталды!',
        passwordChanged: 'Сыр сөз өзгөртүлдү!',
        accountLinked: 'Аккаунт байланыштырылды!',
        welcome: 'Кош келдиңиз!'
      },
      // Error messages
      error: {
        fillAllFields: 'Бардык милдеттүү талааларды толтуруңуз',
        invalidEmail: 'Туура эмес email форматы',
        passwordTooShort: 'Сыр сөз кеминде 6 белгиден турушу керек',
        passwordsNotMatch: 'Сыр сөздөр дал келбейт',
        invalidCode: 'Туура эмес код',
        expiredCode: 'Код мөөнөтү өттү',
        userNotFound: 'Колдонуучу табылган жок',
        googleUser: 'Бул аккаунт Google аркылуу катталган',
        serverError: 'Сервердин ички катасы',
        registrationFailed: 'Катталуу катасы',
        loginFailed: 'Кирүү катасы',
        resetFailed: 'Сыр сөздү калыбына келтирүү катасы',
        codeNotReceived: 'Код алынбады',
        invalidCredentials: 'Кирүү маалыматтары туура эмес',
        invalid2FACode: 'Эки факторлук аутентификациянын коду туура эмес',
        invalidEmailOrPassword: 'Туура эмес email же сыр сөз',
        googleUserMessage: 'Бул аккаунт Google аркылуу катталган. "Google аркылуу кирүү" баскычын колдонуңуз',
        fillRequiredFields: 'Бардык милдеттүү талааларды толтуруңуз',
        enter2FACode: 'Эки факторлук аутентификациянын кодун киргизиңиз',
        userExists: 'Бул email менен колдонуучу мурунтан эле бар',
        // Browser validation messages
        fillThisField: 'Бул талааны толтуруңуз',
        enterValidEmail: 'Туура email дарегин киргизиңиз',
        passwordTooShortBrowser: 'Сыр сөз кеминде 6 белгиден турушу керек',
        passwordsMustMatch: 'Сыр сөздөр дал келиши керек'
      },
      // Warning messages
      warning: {
        googleSignIn: 'Google аркылуу кирүү',
        accountExists: 'Аккаунт мурунтан бар',
        googleUserWarning: 'Бул email мурунтан Google аркылуу катталган. "Google аркылуу кирүү" баскычын колдонуңуз'
      },
      // Info messages
      info: {
        twoFactorRequired: 'Эки факторлук аутентификация',
        codeSent: 'Ырастоо коду email дарегиңизге жөнөтүлдү!',
        checkEmail: 'Email дарегиңизди текшериңиз',
        twoFactorTitle: 'Эки факторлук аутентификация',
        twoFactorMessage: 'Аутентификатор тиркемеңизден кодду киргизиңиз'
      }
    },
    
    verifyEmail: {
      title: 'Email ырастоо',
      subtitle: 'Биз сиздин email дарегиңизге ырастоо шилтемесин жөнөттүк',
      success: 'Email ийгиликтүү ырасталды!',
      expired: 'Шилтеменин мөөнөтү бүттү',
      invalid: 'Жараксыз шилтеме',
      resend: 'Кайра жөнөтүү'
    },
    
    // Verify Code Page
    verifyCode: {
      title: 'Email дарегиңизди ырастаңыз',
      subtitle: 'Биз 6 белгилик кодду жөнөттүк',
      codeLabel: 'Ырастоо кодун киргизиңиз',
      codePlaceholder: '000000',
      verifyButton: 'Ырастоо',
      resendText: 'Код барган жокпу?',
      resendButton: 'Кайра жөнөтүү',
      backToSignIn: '← Кирүүгө баракчасына кайтуу'
    },
    
    // Email Messages
    email: {
      registration: {
        subject: 'Катталууну ырастоо коду - StudAI',
        title: 'StudAI-га кош келдиңиз!',
        message: 'Катталганыңыз үчүн рахмат. Процессти аяктоо үчүн төмөнкү ырастоо кодун киргизиңиз:',
        codeValid: 'Код 10 мүнөт жарактуу.',
        ignoreMessage: 'Эгер сиз StudAI-га катталбасаңыз, бул катты өткөрүп койсоңуз болот.'
      },
      passwordReset: {
        subject: 'Сыр сөздү калыбына келтирүү коду - StudAI',
        title: 'Сыр сөздү калыбына келтирүү',
        message: 'Сыр сөздү калыбына келтирүү үчүн төмөнкү ырастоо кодун киргизиңиз:',
        codeValid: 'Код 10 мүнөт жарактуу.',
        ignoreMessage: 'Эгер сиз сыр сөздү калыбына келтирүүнү сурабасаңыз, бул катты өткөрүп койсоңуз болот.'
      },
      twoFactor: {
        subject: 'Эки факторлук аутентификацияны жөндөө - StudAI',
        title: 'Эки факторлук аутентификацияны жөндөө',
        scanMessage: 'Google Authenticator же Authy тиркемеси менен QR-кодду скандаңыз:',
        manualMessage: 'Же бул сыр сөздү кол менен киргизиңиз:',
        saveMessage: 'Бул кодду ишенимдүү жерде сактаңыз - ал кирүүнү калыбына келтирүү үчүн керек болот.'
      }
    },
    
    profile: {
      title: 'Профиль',
      personalInfo: 'Жеке маалымат',
      security: 'Коопсуздук',
      firstName: 'Аты',
      lastName: 'Фамилиясы',
      middleName: 'Атасынын аты',
      email: 'Email',
      changePassword: 'Сыр сөздү өзгөртүү',
      currentPassword: 'Учурдагы сыр сөз',
      newPassword: 'Жаңы сыр сөз',
      confirmNewPassword: 'Жаңы сыр сөздү ырастаңыз',
      twoFactorAuth: 'Эки факторлук аутентификация',
      enable2FA: '2FA күйгүзүү',
      disable2FA: '2FA өчүрүү',
      save: 'Сактоо',
      signOut: 'Чыгуу'
    }
  },
  hero: {
    badge: 'Эң мыкты ИИ жардамчы',
    title: 'StudAI — ИИнин жардамы менен студенттик жумуштарды',
    titleHighlight: 'бар болгону 3 мүнөттө түзүү',
    subtitle: 'Реферат, курстук иштер, СӨЖ жана доклад өтө жогорку сапатта. Темасын, бет санын, иштин түрүн жазыңыз, андан соң ишиңиз бир нече мүнөттө даяр болот.',
    createWork: 'Буйрутма берүү',
    pricing: 'Баасы',
    examples: {
      essay: {
        title: 'Тарых боюнча реферат',
        topic: '"Улуу Ата Мекендик согуш"',
        price: '700 сом',
        time: '3.2 мүнөт'
      },
      coursework: {
        title: 'Курстук жумуш',
        topic: '"IT кызматтар рыногун анализдөө"',
        price: '1800 сом',
        time: '2.1 мүнөт'
      },
      srs: {
        title: 'Физика боюнча СИЖ',
        topic: '"Кванттык механика"',
        price: '450 сом',
        time: '2.7 мүнөт'
      },
      report: {
        title: 'Доклад',
        topic: '"Экология жана жаратылыш"',
        price: '550 сом',
        time: '2.4 мүнөт'
      }
    }
  },
  services: {
    title: 'Биздин кызматтар',
    subtitle: 'Студенттерге академиялык иштердин бардык түрлөрүндө сапаттуу жардам',
    essay: {
      title: 'Рефераттар',
      description: 'Бардык предметтер боюнча 90%+ уникалдуулук менен сапаттуу рефераттар',
      from: '500 с. өйдө',
      pages: '10-40 бет',
      time: '3 мүн.'
    },
    coursework: {
      title: 'Курстук иштер',
      description: 'Теманы терең анализдөө менен олуттуу изилдөө жумуштары',
      from: '1000 с. өйдө',
      pages: '30-50 бет',
      time: '3 мүн.'
    },
    srs: {
      title: 'СӨЖ',
      description: 'Бардык деңгээлдеги студенттердин өз алдынча жумуштары',
      from: '300 с. өйдө',
      pages: '10-40 бет',
      time: '3 мүн.'
    },
    presentation: {
      title: 'Докладдар',
      description: 'Семинарларда сүйлөө үчүн докладдар',
      from: '400 с. өйдө',
      pages: '10-40 бет',
      time: '3 мүн.'
    }
  },
  howItWorks: {
    title: 'Кантип иштейт',
    subtitle: 'Бар болгону 3 жөнөкөй кадам менен сапаттуу студенттик жумуш алыңыз',
    step1: {
      title: 'Талаптарыңызды киргизиңиз',
      description: 'Иштин темасын, бет санын, түрүн жана атайын талаптарды көрсөтүңүз. Биздин ИИ сиздин суроонузду анализдеп, иштин планын түзөт.'
    },
    step2: {
      title: 'Планыңызды ырастаңыз',
      description: 'Жумуш планын ырастап, буйрутманы төлөңүз. Биздин кызмат жумушту 3 мүнөттө жасайт.'
    },
    step3: {
      title: 'Жумушту жүктөп алыңыз',
      description: 'Word форматында уникалдуулук кепилдиги менен өтө жогорку сапаттагы даяр жумушту алыңыз. Мыкты баалардан жана бош убактыдан ырахат алыңыз!'
    }
  },
  benefits: {
    title: 'Эмне үчүн бизди тандашат',
    subtitle: 'Бизди эң мыкты кылып турган артыкчылыктар',
    speed: {
      title: 'Ылдамдык',
      subtitle: '3 мүнөттө'
    },
    quality: {
      title: 'Сапат',
      subtitle: '100% кепилдик'
    },
    uniqueness: {
      title: 'Уникалдуулук',
      subtitle: '90%+'
    },
    support: {
      title: 'Колдоо',
      subtitle: '24/7'
    },
    pricing: {
      title: 'Жеткиликтүү баа',
      subtitle: 'Кошумча төлөмсүз'
    }
  },
  testimonials: {
    title: 'Студенттер биздин ишибизди жакшы көрүшөт',
    subtitle: 'Чыныгы, мааниге ээ пикирлер аркылуу ишенимди бекемдеңиз.',
    universities: [
      'Ж. Баласагын атындагы КУУ',
      'И. Раззаков атындагы КМТУ', 
      'АУЦА',
      'М. Рыскулбеков атындагы КЭУ',
      'МУК',
      'И. Арабаев атындагы КМУ',
      'КРСУ',
      'И.К. Ахунбаев атындагы КГМА',
      'Н. Исанов атындагы КГУСТА',
      'И. Арабаев атындагы КМПУ'
    ],
    reviews: {
      r1: {
        name: 'Айтурган Асанова',
        university: 'Ж. Баласагын атындагы КУУ',
        review: 'Биз StudAI жана алар берген онлайн колдоодон абдан канааттанабыз. Өтө тез жана жеңил байланыш.'
      },
      r2: {
        name: 'Даниил Османов',
        university: 'И. Раззаков атындагы КМТУ',
        review: 'Биз адилетүү баада керектүү функцияларды берген платформаны каалачубуз.'
      },
      r3: {
        name: 'Гүлнара Токтосунова',
        university: 'АУЦА',
        review: 'Биз StudAI нын дээрлик бардык виджеттерин колдонобуз. Алар биздин жумуштарды көрсөтүү үчүн сонун.'
      },
      r4: {
        name: 'Бекжан Исаков',
        university: 'М. Рыскулбеков атындагы КЭУ',
        review: 'StudAI командасы укмуштуу. Сиз оңой эле байланыша аласыз жана алар тез арада көйгөйүңүзгө жардам беришет!'
      },
      r5: {
        name: 'Нурайым Токтогулова',
        university: 'МУК',
        review: 'Колдонуу оңой жана бир нерсе түшүнүү үчүн өтө техникалык болуп калганда пайдалуу команда!'
      },
      r6: {
        name: 'Алтынбек Мамбетов',
        university: 'И. Арабаев атындагы КМУ',
        review: 'Пикирлер менен байланышкан нерселердин баарын иштетүү үчүн толук платформа. Кантип ишке ашырууну баары документтештирилген.'
      }
    }
  },
  faq: {
    title: 'Сиздин суроолорңуз — биздин жоопторубуз',
    subtitle: 'StudAI жөнүндө баарын билиңиз: мүмкүнчүлүктөрдөн баштап сапат кепилдигине чейин',
    questions: {
      q1: {
        question: 'StudAI де жумуштар канчалык тез даярдалат?',
        answer: 'Биздин ИИ сапаттуу жумуштарды бар болгону 3 мүнөттө түзөт! Темасын жазыңыз, талаптарды көрсөтүңүз жана 90%+ уникалдуулук кепилдиги менен Word форматында даяр жумушту алыңыз.'
      },
      q2: {
        question: 'StudAI кызматтарынын баасы канча?',
        answer: 'Баалар жумуштун түрүнө жана бет санына жараша болот. Актуалдуу бааны баалар барагынан билсе болот. Биз жашыруун комиссиясыз жеткиликтүү бааларды сунуштайбыз.'
      },
      q3: {
        question: 'Жумуштардын уникалдуулугуна кепилдик бересизби?',
        answer: 'Ооба! Биз бардык жумуштар үчүн 90%+ текст уникалдуулугуна кепилдик беребиз. Биздин ИИ плагиатка текшерүүдөн өткөн оригиналдуу мазмунду түзөт.'
      },
      q4: {
        question: 'StudAI кандай жумуш түрлөрүн аткара алат?',
        answer: 'StudAI реферат, курстук жумуш, СӨЖ (студенттердин өз алдынча жумуштары) жана докладдарды түзүүгө адистешкен. Биз орус, кыргыз жана англис тилдеринде кандай дисциплина жана тема болбосун иштейбиз.'
      },
      q5: {
        question: 'Даяр ишке өзгөртүү киргизсе болобу?',
        answer: 'Жок, азырынча биз даяр ишке өзгөртүү киргизүү мүмкүнчүлүгүн бербейбиз. Бирок сиз текстти өзүңүздүн каалооңузга ылайык текшерип, өзгөртө аласыз.'
      },
      q6: {
        question: 'StudAI колдонуу коопсузбу?',
        answer: 'Толугу менен! Биз сиздин маалыматтарыңыздын толук купуялуулугун камсыз кылабыз. Сиздин бардык жумуштарыңыз жана жеке маалыматыңыз заманбап шифрлөө ыкмалары менен корголгон. Биз маалыматты үчүнчү жактарга бербейбиз.'
      },
      q7: {
        question: 'Төлөм кантип жүргүзүлөт?',
        answer: 'Иштин планын ырастагандан кийин, сизге төлөм үчүн банк баскычтары (Мбанк, Обанк, Демирбанк) жеткиликтүү болот. Баскычтардын биринин басканда, сиз банк тиркемесине эсеп жана жумуштун наркы менен багытталасыз. Сиз төлөп, сайт аркылуу чекти жөнөтүшүңүз керек. Менеджерлер чекти 5 мүнөттө текшерип, заказды ырастайт. Жана сиздин жумушуңуз 3 мүнөттө даяр болот.'
      },
      q8: {
        question: 'StudAI иште ката кетиреби?',
        answer: 'Ооба, биз ИИ колдонгондуктан, ал иште ката кетирип алышы мүмкүн, бирок бар болгону 5-7% гана. Биз бул пайызды минималдуу болушу жана акырындык менен азайышы үчүн иштеп жатабыз. Бирок сизге иште тапшыруудан мурун уникалдуулукка жана сапатка текшерүүнү сунуштайбыз.'
      }
    }
  },
  ready: {
    title: 'Ишиңизди буйрутма кылууга даярсызбы?',
    subtitle: 'StudAI сизге бир нече мүнөттө сапаттуу ишти түзүүгө жардам берет. 90%+ уникалдуулук кепилдиги менен реферат, курстук, СӨЖ жана докладдар.',
    createOrder: 'Буйрутма кылуу'
  },
  footer: {
    description: 'Жасалма интеллект жардамы менен студенттик жумуштарды түзүү үчүн заманбап кызмат. 3 мүнөттө сапаттуу реферат, курстук, СӨЖ жана докладдар.',
    services: 'Кызматтар',
    company: 'Компания',
    contact: 'Байланыштар',
    servicesLinks: {
      essays: 'Рефераттар',
      coursework: 'Курстук жумуштар',
      srs: 'СӨЖ',
      reports: 'Докладдар',
      presentations: 'Презентациялар'
    },
    companyLinks: {
      about: 'Биз жөнүндө',
      reviews: 'Пикирлер',
      guarantees: 'Кепилдиктер',
      faq: 'Көп берилүүчү суроолор',
      support: 'Колдоо'
    },
    copyright: '© 2025 StudAI. Бардык укуктар корголгон.',
    privacy: 'Купуялуулук саясаты',
    terms: 'Колдонуу шарттары'
  }
}

const englishTranslations: Translations = {
  nav: {
    services: 'Services',
    howItWorks: 'How it Works',
    benefits: 'Benefits',
    reviews: 'Reviews',
    faq: 'FAQ',
    login: 'Login',
    createAccount: 'Create Account',
    start: 'Start'
  },
  auth: {
    or: 'or',
    back: 'Back',
    continue: 'Continue',
    loading: 'Loading...',
    
    signIn: {
      title: 'Sign In',
      subtitle: 'Welcome back! Enter your details to sign in.',
      email: 'Email address',
      password: 'Password',
      signInButton: 'Sign In',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      withGoogle: 'Sign in with Google',
      twoFactorCode: 'Two-factor authentication code',
      twoFactorTitle: 'Two-Factor Authentication',
      twoFactorSubtitle: 'Enter the code from your authenticator app',
      backupCode: 'Backup code',
      useBackupCode: 'Use backup code',
      useAuthenticator: 'Use authenticator',
      verifyButton: 'Verify',
      // Placeholders
      emailPlaceholder: 'example@mail.com',
      passwordPlaceholder: 'Enter your password'
    },
    
    signUp: {
      title: 'Create Account',
      subtitle: 'Create an account to start using StudAI',
      firstName: 'First Name',
      lastName: 'Last Name',
      middleName: 'Middle Name (optional)',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      signUpButton: 'Sign Up',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
      withGoogle: 'Sign up with Google',
      termsAgreement: 'I agree to the',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Service',
      // Placeholders
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'example@mail.com',
      passwordPlaceholder: 'Minimum 6 characters',
      confirmPasswordPlaceholder: 'Repeat password'
    },
    
    // Forgot Password
    forgotPassword: {
      title: 'Forgot Password?',
      subtitle: 'Enter your email and we will send a code to reset your password',
      email: 'Email address',
      sendCodeButton: 'Send Code',
      backToSignIn: '← Back to Sign In',
      // Placeholders
      emailPlaceholder: 'example@mail.com'
    },
    
    // Reset Password
    resetPassword: {
      title: 'Reset Password',
      subtitle: 'We sent a code to',
      code: 'Enter verification code',
      newPassword: 'New password',
      confirmPassword: 'Confirm password',
      resetButton: 'Reset Password',
      resendText: 'Didn\'t receive the code?',
      resendCode: 'Resend',
      backToSignIn: '← Back to Sign In',
      // Placeholders
      codePlaceholder: '000000',
      newPasswordPlaceholder: 'Minimum 6 characters',
      confirmPasswordPlaceholder: 'Repeat password'
    },
    
    twoFactor: {
      title: 'Two-Factor Authentication',
      subtitle: 'Protect your account with an additional layer of security',
      setupTitle: 'Set up Two-Factor Authentication',
      setupSubtitle: 'Scan the QR code with Google Authenticator app',
      scanQR: 'Scan QR code',
      enterCode: 'Enter code to confirm',
      enterCodePlaceholder: 'Enter 6-digit code',
      enableButton: 'Enable 2FA',
      disableButton: 'Disable 2FA',
      backupCodes: 'Backup codes',
      backupCodesSubtitle: 'Save these codes in a secure place',
      saveBackupCodes: 'Save codes',
      downloadBackupCodes: 'Download codes'
    },
    
    messages: {
      registrationSuccess: 'Registration successful! Check your email to verify your account.',
      emailVerified: 'Email successfully verified!',
      twoFactorEnabled: 'Two-factor authentication enabled',
      twoFactorDisabled: 'Two-factor authentication disabled',
      passwordReset: 'Password successfully reset',
      
      invalidCredentials: 'Invalid email or password',
      userNotFound: 'User not found',
      emailAlreadyExists: 'User with this email already exists',
      passwordTooShort: 'Password must be at least 6 characters',
      passwordsDoNotMatch: 'Passwords do not match',
      invalidEmail: 'Invalid email format',
      twoFactorRequired: 'Two-factor authentication code required',
      invalid2FACode: 'Invalid two-factor authentication code',
      emailNotVerified: 'Email not verified',
      accountNotFound: 'Account not found',
      tokenExpired: 'Token expired',
      invalidToken: 'Invalid token',
      serverError: 'Internal server error',
      
      checkEmail: 'Check your email',
      emailSent: 'Email sent',
      verificationEmailSent: 'Verification email sent'
    },
    
    // Toast Messages
    toast: {
      // Titles
      titles: {
        success: 'Success!',
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
      },
      // Success messages
      success: {
        registration: 'Registration successful!',
        login: 'Login successful!',
        passwordReset: 'Password reset!',
        emailSent: 'Email sent!',
        codeVerified: 'Code verified!',
        passwordChanged: 'Password changed!',
        accountLinked: 'Account linked!',
        welcome: 'Welcome!'
      },
      // Error messages
      error: {
        fillAllFields: 'Fill all required fields',
        invalidEmail: 'Invalid email format',
        passwordTooShort: 'Password must be at least 6 characters',
        passwordsNotMatch: 'Passwords do not match',
        invalidCode: 'Invalid code',
        expiredCode: 'Code expired',
        userNotFound: 'User not found',
        googleUser: 'This account is registered via Google',
        serverError: 'Internal server error',
        registrationFailed: 'Registration failed',
        loginFailed: 'Login failed',
        resetFailed: 'Password reset failed',
        codeNotReceived: 'Code not received',
        invalidCredentials: 'Invalid login credentials',
        invalid2FACode: 'Invalid two-factor authentication code',
        invalidEmailOrPassword: 'Invalid email or password',
        googleUserMessage: 'This account is registered via Google. Use the "Sign in with Google" button',
        fillRequiredFields: 'Fill all required fields',
        enter2FACode: 'Enter two-factor authentication code',
        userExists: 'User with this email already exists',
        // Browser validation messages
        fillThisField: 'Please fill out this field',
        enterValidEmail: 'Please enter a valid email address',
        passwordTooShortBrowser: 'Password must be at least 6 characters',
        passwordsMustMatch: 'Passwords must match'
      },
      // Warning messages
      warning: {
        googleSignIn: 'Sign in with Google',
        accountExists: 'Account already exists',
        googleUserWarning: 'This email is already registered via Google. Use the "Sign in with Google" button'
      },
      // Info messages
      info: {
        twoFactorRequired: 'Two-factor authentication',
        codeSent: 'Verification code sent to your email!',
        checkEmail: 'Check your email',
        twoFactorTitle: 'Two-factor authentication',
        twoFactorMessage: 'Enter the code from your authenticator app'
      }
    },
    
    verifyEmail: {
      title: 'Verify Email',
      subtitle: 'We sent a verification link to your email',
      success: 'Email successfully verified!',
      expired: 'Link expired',
      invalid: 'Invalid link',
      resend: 'Resend'
    },
    
    // Verify Code Page
    verifyCode: {
      title: 'Verify your email',
      subtitle: 'We sent a 6-digit code to',
      codeLabel: 'Enter verification code',
      codePlaceholder: '000000',
      verifyButton: 'Verify',
      resendText: 'Didn\'t receive the code?',
      resendButton: 'Resend',
      backToSignIn: '← Back to Sign In'
    },
    
    // Email Messages
    email: {
      registration: {
        subject: 'Registration verification code - StudAI',
        title: 'Welcome to StudAI!',
        message: 'Thank you for registering. To complete the process, enter the verification code below:',
        codeValid: 'The code is valid for 10 minutes.',
        ignoreMessage: 'If you did not register on StudAI, simply ignore this email.'
      },
      passwordReset: {
        subject: 'Password reset code - StudAI',
        title: 'Password Reset',
        message: 'To reset your password, enter the verification code below:',
        codeValid: 'The code is valid for 10 minutes.',
        ignoreMessage: 'If you did not request a password reset, simply ignore this email.'
      },
      twoFactor: {
        subject: 'Two-factor authentication setup - StudAI',
        title: 'Two-Factor Authentication Setup',
        scanMessage: 'Scan the QR code with Google Authenticator or Authy app:',
        manualMessage: 'Or enter this secret key manually:',
        saveMessage: 'Save this code in a secure place - it will be needed to restore access.'
      }
    },
    
    profile: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      security: 'Security',
      firstName: 'First Name',
      lastName: 'Last Name',
      middleName: 'Middle Name',
      email: 'Email',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      twoFactorAuth: 'Two-Factor Authentication',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      save: 'Save',
      signOut: 'Sign Out'
    }
  },
  hero: {
    badge: 'Best AI Assistant',
    title: 'StudAI — Your Artificial Intelligence Tool to Produce Student Papers in Just',
    titleHighlight: '3 minutes',
    subtitle: 'High-quality essays, coursework, independent work and reports. Simply enter the topic, number of pages, type of work and your paper will be ready in minutes.',
    createWork: 'Create Work',
    pricing: 'Pricing',
    examples: {
      essay: {
        title: 'History Essay',
        topic: '"The Great War of 1914-1918"',
        price: '$10',
        time: '3.2 min'
      },
      coursework: {
        title: 'Coursework',
        topic: '"IT Market Analysis"',
        price: '$25',
        time: '2.1 min'
      },
      srs: {
        title: 'Physics Report',
        topic: '"Quantum Mechanics"',
        price: '$6',
        time: '2.7 min'
      },
      report: {
        title: 'Report',
        topic: '"Ecology and Nature"',
        price: '$8',
        time: '2.4 min'
      }
    }
  },
  services: {
    title: 'Our Services',
    subtitle: 'Professional assistance to students in all types of academic work',
    essay: {
      title: 'Essays',
      description: 'Quality essays on any subject with 90%+ uniqueness',
      from: 'From $7',
      pages: '10-20 pages',
      time: '3 min'
    },
    coursework: {
      title: 'Coursework',
      description: 'Serious research papers with in-depth topic analysis',
      from: 'From $20',
      pages: '30-50 pages',
      time: '3 min'
    },
    srs: {
      title: 'Independent Work',
      description: 'Student independent work of any complexity',
      from: 'From $4',
      pages: '5-15 pages',
      time: '3 min'
    },
    presentation: {
      title: 'Reports',
      description: 'Presentations and reports for seminar presentations',
      from: 'From $5',
      pages: '5-10 pages',
      time: '3 min'
    }
  },
  howItWorks: {
    title: 'How it Works',
    subtitle: 'Get amazing student papers in just 3 simple steps',
    step1: {
      title: 'Enter Requirements',
      description: 'Describe the work topic, specify the number of pages, type of work and special requirements. Our AI will analyze your request and create a work plan.'
    },
    step2: {
      title: 'Confirm Plan',
      description: 'Confirm the work plan and pay for the order. Our service will complete the work in 3 minutes.'
    },
    step3: {
      title: 'Download Work',
      description: 'Get high-quality finished work in Word format with uniqueness guarantee. Enjoy excellent grades and free time!'
    }
  },
  benefits: {
    title: 'Why Choose Us',
    subtitle: 'Advantages that make us the best',
    speed: {
      title: 'Speed',
      subtitle: 'In 3 minutes'
    },
    quality: {
      title: 'Quality',
      subtitle: '100% guarantee'
    },
    uniqueness: {
      title: 'Uniqueness',
      subtitle: '90%+'
    },
    support: {
      title: 'Support',
      subtitle: '24/7'
    },
    pricing: {
      title: 'Affordable Prices',
      subtitle: 'No overpayments'
    }
  },
  testimonials: {
    title: 'Students love what we do',
    subtitle: 'Use genuine reviews and build trust with reviews that matter.',
    universities: [
      'Kyrgyz National University',
      'Kyrgyz Technical University', 
      'AUCA',
      'Kyrgyz Economic University',
      'International University of Kyrgyzstan',
      'Kyrgyz State University',
      'KRSU',
      'Kyrgyz State Medical Academy',
      'KGUSTA',
      'Kyrgyz State Pedagogical University'
    ],
    reviews: {
      r1: {
        name: 'Aiturgan Asanova',
        university: 'Kyrgyz National University',
        review: 'We are very satisfied with StudAI and the online support they provide. Very fast and easy communication.'
      },
      r2: {
        name: 'Daniil Osmanov',
        university: 'Kyrgyz Technical University',
        review: 'We wanted a platform that would provide us with the necessary features at a fair price.'
      },
      r3: {
        name: 'Gulnara Toktosunova',
        university: 'AUCA',
        review: 'We use almost all StudAI widgets. They are great for showcasing our work.'
      },
      r4: {
        name: 'Bekzhan Isakov',
        university: 'Kyrgyz Economic University',
        review: 'The StudAI team is amazing. You can easily contact them and they quickly help with your problem!'
      },
      r5: {
        name: 'Nuraiyim Toktogulova',
        university: 'International University of Kyrgyzstan',
        review: 'Easy to use and helpful team when something becomes too technical to understand!'
      },
      r6: {
        name: 'Altynbek Mambetov',
        university: 'Kyrgyz State University',
        review: 'Complete platform for handling everything related to reviews. Everything is documented on how to implement.'
      }
    }
  },
  faq: {
    title: 'Your Questions — Our Answers',
    subtitle: 'Learn everything about StudAI: from capabilities to quality guarantees',
    questions: {
      q1: {
        question: 'How quickly are works prepared in StudAI?',
        answer: 'Our AI creates quality works in just 3 minutes! Simply enter the topic, specify requirements and get ready work in Word format with 90%+ uniqueness guarantee.'
      },
      q2: {
        question: 'What is the cost of StudAI services?',
        answer: 'Prices depend on the type of work and number of pages. Current prices can be found on the pricing page. We offer affordable prices without hidden fees.'
      },
      q3: {
        question: 'Do you guarantee the uniqueness of works?',
        answer: 'Yes! We guarantee 90%+ text uniqueness for all works. Our AI creates original content that passes plagiarism checks.'
      },
      q4: {
        question: 'What types of work can StudAI perform?',
        answer: 'StudAI specializes in creating essays, coursework, independent student work and reports. We work with any disciplines and topics in Russian, Kyrgyz and English languages.'
      },
      q5: {
        question: 'Can changes be made to finished work?',
        answer: 'No, for now we do not provide the ability to make changes to finished work. But you can check and modify the text at your discretion.'
      },
      q6: {
        question: 'Is it safe to use StudAI?',
        answer: 'Absolutely! We ensure complete confidentiality of your data. All your works and personal information are protected by modern encryption methods. We do not share information with third parties.'
      },
      q7: {
        question: 'How is payment made?',
        answer: 'After confirming the work plan, bank buttons (Mbank, Obank, Demirbank) will be available for payment. When clicking on one of the buttons, you will be redirected to the bank application with set accounts and work cost. You must pay and send the receipt through the site. Managers will check the receipt in 5 minutes and confirm the order. And your work will be ready in 3 minutes.'
      },
      q8: {
        question: 'Can StudAI make mistakes in work?',
        answer: 'Yes, since we use AI, it can make mistakes in work, but only 5-7%. We are working to make this percentage minimal and gradually decrease. But we recommend checking the work for uniqueness and quality before submission.'
      }
    }
  },
  ready: {
    title: 'Ready to order your work?',
    subtitle: 'StudAI will help you create quality work in minutes. Essays, coursework, independent work and reports with 90%+ uniqueness guarantee.',
    createOrder: 'Place Order'
  },
  footer: {
    description: 'Modern service for creating student works with artificial intelligence. Quality essays, coursework, independent work and reports in 3 minutes.',
    services: 'Services',
    company: 'Company',
    contact: 'Contact',
    servicesLinks: {
      essays: 'Essays',
      coursework: 'Coursework',
      srs: 'Independent Work',
      reports: 'Reports',
      presentations: 'Presentations'
    },
    companyLinks: {
      about: 'About Us',
      reviews: 'Reviews',
      guarantees: 'Guarantees',
      faq: 'FAQ',
      support: 'Support'
    },
    copyright: '© 2025 StudAI. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use'
  }
}

export const translations: Record<Language, Translations> = {
  ru: russianTranslations,
  ky: kyrgyzTranslations,
  en: englishTranslations
}

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.ru
}
