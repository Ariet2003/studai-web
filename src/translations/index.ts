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
    createAccount: 'Создать аккаунт'
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
    createAccount: 'Аккаунт түзүү'
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
    createAccount: 'Create Account'
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
