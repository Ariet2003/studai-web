'use client'

import { 
  BookOpen, 
  Clock, 
  FileText, 
  GraduationCap, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Users,
  Shield,
  Zap,
  Award,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Brain,
  Rocket,
  Heart,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Данные отзывов с кыргызскими именами
const testimonials = [
  {
    id: 1,
    name: "Айтурган Асанова",
    university: "КНУ им. Ж. Баласагына",
    review: "Мы очень довольны StudAI и онлайн-поддержкой, которую они предоставляют. Очень быстрое и легкое общение.",
    avatar: "https://ui-avatars.com/api/?name=A+A&background=4F46E5&color=fff&size=64"
  },
  {
    id: 2,
    name: "Даниил Османов",
    university: "КГТУ им. И. Раззакова",
    review: "Мы хотели платформу, которая предоставляла бы нам необходимые функции по справедливой цене.",
    avatar: "https://ui-avatars.com/api/?name=D+O&background=059669&color=fff&size=64"
  },
  {
    id: 3,
    name: "Гүлнара Токтосунова",
    university: "АУЦА",
    review: "Мы используем почти все виджеты StudAI. Они отлично подходят для демонстрации наших работ.",
    avatar: "https://ui-avatars.com/api/?name=G+T&background=DC2626&color=fff&size=64"
  },
  {
    id: 4,
    name: "Бекжан Исаков",
    university: "КЭУ им. М. Рыскулбекова",
    review: "Команда StudAI потрясающая. Вы можете очень легко связаться и они быстро помогут с вашей проблемой!",
    avatar: "https://ui-avatars.com/api/?name=B+I&background=7C3AED&color=fff&size=64"
  },
  {
    id: 5,
    name: "Нурайым Токтогулова",
    university: "МУК",
    review: "Легко использовать и полезная команда, когда что-то становится слишком техническим для понимания!",
    avatar: "https://ui-avatars.com/api/?name=N+T&background=EA580C&color=fff&size=64"
  },
  {
    id: 6,
    name: "Алтынбек Мамбетов",
    university: "КГУ им. И. Арабаева",
    review: "Полная платформа для обработки всего, что связано с отзывами. Все задокументировано о том, как реализовать.",
    avatar: "https://ui-avatars.com/api/?name=A+M&background=0891B2&color=fff&size=64"
  }
];

// Список университетов для бегущей строки
const universities = [
  "КНУ им. Ж. Баласагына",
  "КГТУ им. И. Раззакова", 
  "АУЦА",
  "КЭУ им. М. Рыскулбекова",
  "МУК",
  "КГУ им. И. Арабаева",
  "КРСУ",
  "КГМА им. И.К. Ахунбаева",
  "КГУСТА им. Н. Исанова",
  "КГПУ им. И. Арабаева"
];

// Компонент бегущей строки университетов
function UniversityTicker() {
  return (
    <div className="relative mb-6 h-12 overflow-hidden">
      {/* Градиенты для плавного исчезновения по краям */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
      
      {/* Бегущая строка */}
      <div className="flex items-center h-full">
        <motion.div
          className="flex items-center space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -80 * universities.length, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {universities.map((university, index) => (
            <div
              key={index}
              className="text-base font-bold text-gray-500 px-4"
            >
              {university}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Компонент анимированных отзывов
function TestimonialAnimatedContainer() {
  const [activeCards, setActiveCards] = useState([
    { container: 0, showFirst: true },
    { container: 1, showFirst: true },
    { container: 2, showFirst: true },
    { container: 3, showFirst: true }
  ]);

  useEffect(() => {
    let currentContainer = 0;
    
    const interval = setInterval(() => {
      setActiveCards(prev => {
        const newState = [...prev];
        newState[currentContainer] = {
          ...newState[currentContainer],
          showFirst: !newState[currentContainer].showFirst
        };
        return newState;
      });
      
      currentContainer = (currentContainer + 1) % 4;
    }, 3000); // Каждые 3 секунды
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Бегущая строка с университетами */}
      <UniversityTicker />

      {/* Карточки отзывов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Array.from({ length: 4 }, (_, containerIndex) => (
          <TestimonialContainer
            key={containerIndex}
            containerIndex={containerIndex}
            showFirst={activeCards[containerIndex].showFirst}
          />
        ))}
      </div>
    </div>
  );
}

// Компонент контейнера с отзывами (как в оригинале)
function TestimonialContainer({ 
  containerIndex, 
  showFirst
}: {
  containerIndex: number;
  showFirst: boolean;
}) {
  // Определяем индексы отзывов для каждого контейнера
  const getTestimonialIndices = (containerIndex: number) => {
    const baseIndex = containerIndex * 2;
    return {
      first: baseIndex % testimonials.length,
      second: (baseIndex + 1) % testimonials.length
    };
  };

  const { first, second } = getTestimonialIndices(containerIndex);

  return (
    <motion.div
      className="relative h-80"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: containerIndex * 0.2 }}
    >
      {/* Первая карточка */}
      <div
        className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40"
        style={{
          transition: 'opacity 1500ms cubic-bezier(1, 0, 0.615, 0.995), transform 1500ms cubic-bezier(1, 0, 0.615, 0.995)',
          opacity: showFirst ? 1 : 0,
          transform: showFirst ? 'translateY(0px)' : 'translateY(110%)'
        }}
      >
        <TestimonialCard testimonial={testimonials[first]} />
      </div>

      {/* Вторая карточка */}
      <div
        className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40"
        style={{
          transition: 'opacity 1500ms cubic-bezier(1, 0, 0.615, 0.995), transform 1500ms cubic-bezier(1, 0, 0.615, 0.995)',
          opacity: showFirst ? 0 : 1,
          transform: showFirst ? 'translateY(110%)' : 'translateY(0px)'
        }}
      >
        <TestimonialCard testimonial={testimonials[second]} />
      </div>
    </motion.div>
  );
}

// Компонент карточки отзыва
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="space-y-4">
      {/* Звезды */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      {/* Текст отзыва */}
      <p className="text-gray-700 text-sm leading-relaxed">
        "{testimonial.review}"
      </p>
      
      {/* Информация о клиенте */}
      <div className="flex items-center space-x-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-gray-600 text-xs">{testimonial.university}</p>
        </div>
      </div>
    </div>
  );
}

// FAQ данные
const faqData = [
  {
    id: 1,
    question: "Как быстро готовятся работы в StudAI?",
    answer: "Наш ИИ создает качественные работы всего за 3 минуты! Просто введите тему, укажите требования и получите готовую работу в формате Word с гарантией уникальности 90%+."
  },
  {
    id: 2,
    question: "Какова стоимость услуг StudAI?",
    answer: "Цены зависят от типа работы и количества страниц. Актуальную цену можно узнать на странице с ценами. Мы предлагаем доступные цены без скрытых комиссий."
  },
  {
    id: 3,
    question: "Гарантируете ли вы уникальность работ?",
    answer: "Да! Мы гарантируем уникальность текста 90%+ для всех работ. Наш ИИ создает оригинальный контент, который проходит проверку на плагиат."
  },
  {
    id: 4,
    question: "Какие типы работ может выполнить StudAI?",
    answer: "StudAI специализируется на создании рефератов, курсовых работ, СРС (самостоятельных работ студентов) и докладов. Мы работаем с любыми дисциплинами и темами на русском, кыргызском и английском языках."
  },
  {
    id: 5,
    question: "Можно ли внести изменения в готовую работу?",
    answer: "Нет, пока что мы не предоставляем возможности для внесения изменений в готовую работу. Но вы можете проверить и изменить текст на свое усмотрение."
  },
  {
    id: 6,
    question: "Безопасно ли использовать StudAI?",
    answer: "Абсолютно! Мы обеспечиваем полную конфиденциальность ваших данных. Все ваши работы и личная информация защищены современными методами шифрования. Мы не передаем информацию третьим лицам."
  },
  {
    id: 7,
    question: "Как происходит оплата?",
    answer: "После подтверждение плана работы, вам будет доступно кнопки банков (Мбанк, Обанк, Демирбанк) для оплаты. При нажатии на одну из кнопок, вы будете перенаправлены на приложение банка с поставленными счетами и стоимости работы. Вы должны оплатить и отправить чек через сайт. Менеджеры проверят чек за 5 минут и подтвердят заказ. И ваша работа будет готова за 3 минуты."
  },
  {
    id: 8,
    question: "Может ли StudAI допустить ошибку в работе?",
    answer: "Да, так как мы используем ИИ, он может допустить ошибку в работе, но только на 5-7%. Мы работаем над тем, чтобы этот процент был минимальным и постепенно уменьшался. Но рекомендуем вам проверять работу на уникальность и качество перед сдачей."
  }
];

// Компонент FAQ аккордеона
function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // Первый элемент открыт по умолчанию

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Разделяем вопросы на две колонки
  const leftColumnItems = faqData.filter((_, index) => index % 2 === 0);
  const rightColumnItems = faqData.filter((_, index) => index % 2 === 1);

  const renderFAQItem = (item: typeof faqData[0], delay: number) => (
    <motion.div
      key={item.id}
      className={`rounded-xl p-6 backdrop-blur-sm shadow-lg border border-white/40 mb-4 cursor-pointer transition-all duration-300 ${
        openItems.includes(item.id) ? 'bg-white/80' : 'bg-white/60 hover:bg-white/70'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onClick={() => toggleItem(item.id)}
    >
      <button className="w-full text-left">
        <div className="flex items-center justify-between gap-x-3 pb-3">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {item.question}
          </h3>
          <div className="flex-shrink-0">
            {openItems.includes(item.id) ? (
              <svg className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            )}
          </div>
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: openItems.includes(item.id) ? 'auto' : 0,
          opacity: openItems.includes(item.id) ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-gray-700 leading-relaxed">
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {/* Левая колонка */}
      <div className="space-y-4">
        {leftColumnItems.map((item, index) => renderFAQItem(item, index * 0.1))}
      </div>
      
      {/* Правая колонка */}
      <div className="space-y-4">
        {rightColumnItems.map((item, index) => renderFAQItem(item, (index * 0.1) + 0.05))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative overflow-hidden">
      
      {/* Header */}
      <header className="fixed top-4 left-4 right-4 bg-white/80 backdrop-blur-xl border border-white/40 z-50 rounded-3xl shadow-lg">
        <motion.div 
          className="px-8 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/studai-logo.svg" 
              alt="StudAI Logo" 
              className="w-10 h-10 relative -top-0.75"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const nextElement = target.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'flex';
                }
              }}
            />
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center hidden">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-600">StudAI</span>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Услуги
            </a>
            <a href="#process" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Как работает
            </a>
            <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Преимущества
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Отзывы
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              FAQ
            </a>
          </nav>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-black font-bold hover:text-blue-600 transition-colors">
              Войти
            </a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                Создать аккаунт
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2 mb-8 shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 text-sm font-medium">Лучший ИИ-помощник</span>
            </motion.div>

            {/* Background cards - behind text */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Left cards */}
              <motion.div 
                className="absolute left-10 top-2 bg-white/40 backdrop-blur-lg rounded-xl p-3 shadow-lg border border-white/20 w-64 cursor-pointer pointer-events-auto hover:z-10 opacity-60 blur-[1.4px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-xs mb-1 text-left">Реферат по истории</h4>
                    <p className="text-gray-600 text-xs mb-1 line-clamp-1 text-left">"Великая Отечественная война"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-500 font-bold text-xs">700 руб.</span>
                      <span className="text-gray-500 text-xs">3.2 мин</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute left-25 bottom-40 bg-white/40 backdrop-blur-lg rounded-xl p-3 shadow-lg border border-white/20 w-64 cursor-pointer pointer-events-auto hover:z-20 z-10 opacity-60 blur-[1.4px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: -1,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-start gap-2 pointer-events-none">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-xs mb-1 text-left">Курсовая работа</h4>
                    <p className="text-gray-600 text-xs mb-1 line-clamp-1 text-left">"Анализ рынка IT-услуг"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-500 font-bold text-xs">1800 руб.</span>
                      <span className="text-gray-500 text-xs ">2.1 мин</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right cards */}
              <motion.div 
                className="absolute right-10 top-8 bg-white/40 backdrop-blur-lg rounded-xl p-3 shadow-lg border border-white/20 w-64 cursor-pointer pointer-events-auto hover:z-10 opacity-60 blur-[1.4px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: -2,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-xs mb-1 text-left">СРС по физике</h4>
                    <p className="text-gray-600 text-xs mb-1 line-clamp-1 text-left">"Квантовая механика"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-xs">450 руб.</span>
                      <span className="text-gray-500 text-xs">2.7 мин</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute right-25 bottom-35 bg-white/40 backdrop-blur-lg rounded-xl p-3 shadow-lg border border-white/20 w-64 cursor-pointer pointer-events-auto hover:z-10 opacity-60 blur-[1.4px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 1,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-xs mb-1 text-left">Доклад</h4>
                    <p className="text-gray-600 text-xs mb-1 line-clamp-1 text-left">"Экология и природа"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-xs">550 руб.</span>
                      <span className="text-gray-500 text-xs">2.4 мин</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main content - centered and free */}
            <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                StudAI — создавайте студенческие работы с помощью ИИ всего{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  за 3 минуты
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Рефераты, курсовые работы, СРС и доклады высочайшего качества. Просто введите тему, количество страниц, тип работы и ваша 
                работа будет готова за считанные минуты.
              </motion.p>

              {/* Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -2 }} 
                   whileTap={{ scale: 0.95 }}
                   className="group"
                 >
                   <Button 
                     className="text-lg px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[50px] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                   >
                     <FileText className="h-5 w-5" />
                     Сделать работу
                   </Button>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ 
                     scale: 1.05, 
                     y: -2
                   }} 
                   whileTap={{ scale: 0.95 }}
                   className="group"
                 >
                   <Button 
                     variant="outline"
                     className="text-lg px-12 py-5 bg-white/80 hover:bg-blue-600 text-gray-700 hover:text-white border-2 border-gray-200 hover:border-blue-600 rounded-[50px] font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
                   >
                     <CheckCircle className="h-5 w-5" />
                     Стоимость
                   </Button>
                 </motion.div>
              </motion.div>
            </div>

            
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Профессиональная помощь студентам во всех видах академических работ
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <motion.div 
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image placeholder */}
              <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white">
                <img src="/card1.png" alt="Рефераты" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 712-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Рефераты</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-1 text-sm">
                  Качественные рефераты по любым предметам с уникальностью 90%+
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">От 500 руб.</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">10-20 стр.</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">3 мин</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Image placeholder */}
              <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white">
                <img src="/card2.png" alt="Курсовые работы" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Курсовые работы</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-1 text-sm">
                  Серьезные исследовательские работы с глубоким анализом темы
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">От 1500 руб.</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">30-50 стр.</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">3 мин</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Image placeholder */}
              <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white">
                <img src="/card3.png" alt="СРС" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">СРС</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-1 text-sm">
                  Самостоятельные работы студентов любой сложности
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">От 300 руб.</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">5-15 стр.</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">3 мин</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              {/* Image placeholder */}
              <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white">
                <img src="/card4.png" alt="Доклады" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Доклады</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-1 text-sm">
                  Презентации и доклады для выступлений на семинарах
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">От 400 руб.</span>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">5-10 стр.</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">3 мин</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="process" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Как это работает
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Получите потрясающие студенческие работы всего за 3 простых шага
            </p>
          </motion.div>
          
          {/* Main Content Block */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/40 overflow-visible max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Left side - Steps */}
              <motion.div 
                className="basis-3/5 p-6 lg:p-8 flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-4">
                  {/* Step 1 */}
                  <motion.div 
                    className="flex items-start gap-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        01
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        Введите требования
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[14px]">
                        Опишите тему работы, укажите количество страниц, тип работы и особые требования. 
                        Наш ИИ проанализирует ваш запрос и создаст план работы.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Step 2 */}
                  <motion.div 
                    className="flex items-start gap-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        02
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        Подтвердите план
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[14px]">
                        Подтвердите план работы и оплатите заказ. Наш сервис сделает работу за 3 минуты.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Step 3 */}
                  <motion.div 
                    className="flex items-start gap-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        03
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[20px] font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        Скачайте работу
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[14px]">
                        Получите готовую работу высочайшего качества в формате Word с гарантией уникальности. 
                        Наслаждайтесь отличными оценками и свободным временем!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right side - Image extending out */}
              <motion.div 
                className="basis-2/5 relative flex items-end justify-center lg:justify-end overflow-visible"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative lg:absolute lg:right-0 lg:bottom-0 lg:transform lg:translate-x-32 z-30">
                  <div className="relative overflow-visible">
                    <img 
                      src="/documents.png" 
                      alt="Документы и папка" 
                      className="w-full h-auto max-w-2xl object-contain drop-shadow-xl lg:-translate-x-24 lg:scale-115"
                      onError={(e) => { 
                        if (e.currentTarget.parentElement?.parentElement) { 
                          e.currentTarget.parentElement.parentElement.innerHTML = '<div class="w-full h-64 flex items-center justify-center"><div class="text-center"><div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"><svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 712-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><p class="text-gray-600 font-medium">Документы и работы</p></div></div>'; 
                        } 
                      }} 
                    />
                    
                    {/* Decorative elements around image */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-500 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/3 -left-4 w-3 h-3 bg-green-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Преимущества, которые делают нас лучшими
            </p>
          </motion.div>
          
          {/* Main content container */}
          <div className="relative">
            {/* Background cards - positioned behind image in orderly grid */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Top row cards - 2 horizontal cards */}
              <div className="flex justify-center items-start gap-90 absolute top-20 left-170 transform -translate-x-1/2 w-full max-w-4xl">
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 w-80 z-10 flex items-center gap-4"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900">Скорость</div>
                    <div className="text-sm text-gray-500">За 3 минуты</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 w-80 z-10 flex items-center gap-4"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900">Качество</div>
                    <div className="text-sm text-gray-500">100% гарантия</div>
                  </div>
                </motion.div>
              </div>

              {/* Middle row cards - 2 horizontal cards */}
              <div className="flex justify-center items-start gap-120 absolute top-53 left-175 transform -translate-x-1/2 w-full max-w-6xl">
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 w-80 z-10 flex items-center gap-4"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900">Уникальность</div>
                    <div className="text-sm text-gray-500">90%+</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 w-80 z-10 flex items-center gap-4"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900">Поддержка</div>
                    <div className="text-sm text-gray-500">24/7</div>
                  </div>
                </motion.div>
              </div>

              {/* Fifth card - right after the 4 cards */}
              <div className="flex justify-center items-start absolute -top-12 left-175 transform -translate-x-1/2 w-full max-w-4xl">
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/40 w-80 z-10 flex items-center gap-4"
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900">Доступные цены</div>
                    <div className="text-sm text-gray-500">Без переплат</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Central image container */}
            <motion.div 
              className="relative flex justify-center items-center min-h-[500px] z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src="/girl-student.png" 
                  alt="Студентка с ноутбуком" 
                  className="w-full h-auto max-w-xl object-contain drop-shadow-xl z-30 relative"
                  onError={(e) => { 
                    if (e.currentTarget.parentElement) { 
                      e.currentTarget.parentElement.innerHTML = '<div class="w-80 h-96 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl"><div class="text-center text-white"><div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><p class="font-semibold">Студентка</p></div></div>'; 
                    } 
                  }} 
                />
                
                {/* Decorative elements around the image */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-70 animate-pulse z-40"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-500 rounded-full opacity-50 animate-pulse z-40" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/3 -left-8 w-6 h-6 bg-cyan-400 rounded-full opacity-60 animate-pulse z-40" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-1/4 -right-8 w-4 h-4 bg-pink-400 rounded-full opacity-80 animate-pulse z-40" style={{animationDelay: '0.5s'}}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Background graphic */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Студенты любят то, что мы делаем
              </h2>
              <div className="mb-6"></div>
              <div className="max-w-3xl mx-auto mb-4">
                <p className="text-xl text-gray-600">
                  Воспользуйтесь подлинными отзывами и укрепите доверие с помощью отзывов, которые имеют значение. 
                </p>
              </div>
            </motion.div>

            {/* Testimonial Cards Animation Container */}
            <TestimonialAnimatedContainer />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative overflow-hidden">
        <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Title */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ваши вопросы — наши ответы
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Узнайте всё о StudAI: от возможностей до гарантий качества
            </p>
          </motion.div>
          {/* End Title */}

          <FAQAccordion />
        </div>
      </section>
      {/* End FAQ */}

      {/* Ready to get your work section - outside container */}
      <div data-test-id="help-container" className="container mx-auto px-22 my-20">
        <section className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/40 overflow-visible relative mx-12 md:mx-8 lg:mx-12">
          <div className="relative" style={{ height: "424px" }}>
            <div className="flex items-center h-full">
              {/* Left content */}
              <motion.div 
                className="flex-1 px-18 py-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Готовы заказать <br />
                  свою работу?
                </h2>
                
                <div className="mb-8">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    StudAI поможет вам создать качественную работу за считанные минуты. <br />
                    Рефераты, курсовые, СРС и доклады с гарантией уникальности 90%+.
                  </p>
                </div>
                
                <div className="flex items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <FileText className="h-6 w-6" />
                      <span className="border-l border-white/30 pl-3 ml-3">Сделать заказ</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right image - overflowing from top */}
              <motion.div 
                className="flex-shrink-0 relative ml-18 mr-12"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative" style={{ maxWidth: "364px", marginRight: "0px" }}>
                  <img 
                    alt="Студент с работами" 
                    className="w-full h-auto max-w-lg object-contain relative z-10" 
                    style={{ 
                      transform: "translateY(-60px)"
                    }}
                    src="/boy-student.png"
                    onError={(e) => { 
                      if (e.currentTarget.parentElement) { 
                        e.currentTarget.parentElement.innerHTML = '<div class="w-80 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative z-10" style="transform: translateY(-60px); clip-path: polygon(0 60px, 100% 0, 100% 100%, 0 100%)"><div class="text-center text-white"><div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><p class="font-semibold">Студент</p></div></div>'; 
                      } 
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl text-gray-700 py-16 relative border-t border-white/20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/studai-logo.svg" 
                  alt="StudAI Logo" 
                  className="w-10 h-10 relative -top-0.75"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const nextElement = target.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center hidden">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-blue-600">StudAI</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Современный сервис для создания студенческих работ с помощью искусственного интеллекта. 
                Качественные рефераты, курсовые, СРС и доклады за 3 минуты.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/studai.kg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/996555123456" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Услуги</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Рефераты</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Курсовые работы</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors">СРС</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Доклады</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Презентации</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Компания</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">О нас</a></li>
                <li><a href="#reviews" className="hover:text-blue-600 transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Гарантии</a></li>
                <li><a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Поддержка</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Контакты</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-600" />
                  <a href="tel:+996555123456" className="hover:text-blue-600 transition-colors">
                    +996 555 123 456
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-600" />
                  <a href="mailto:info@studai.kg" className="hover:text-blue-600 transition-colors">
                    info@studai.kg
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                  <span>Бишкек, Кыргызстан</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500">
            <p>&copy; 2025 StudAI. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-600 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}