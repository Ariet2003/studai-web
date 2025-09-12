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
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import LanguageSelector from '@/components/LanguageSelector'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Функция для получения отзывов из переводов
const getTestimonials = (t: any) => [
  {
    id: 1,
    name: t.testimonials.reviews.r1.name,
    university: t.testimonials.reviews.r1.university,
    review: t.testimonials.reviews.r1.review,
    avatar: "https://ui-avatars.com/api/?name=A+A&background=4F46E5&color=fff&size=64"
  },
  {
    id: 2,
    name: t.testimonials.reviews.r2.name,
    university: t.testimonials.reviews.r2.university,
    review: t.testimonials.reviews.r2.review,
    avatar: "https://ui-avatars.com/api/?name=D+O&background=059669&color=fff&size=64"
  },
  {
    id: 3,
    name: t.testimonials.reviews.r3.name,
    university: t.testimonials.reviews.r3.university,
    review: t.testimonials.reviews.r3.review,
    avatar: "https://ui-avatars.com/api/?name=G+T&background=DC2626&color=fff&size=64"
  },
  {
    id: 4,
    name: t.testimonials.reviews.r4.name,
    university: t.testimonials.reviews.r4.university,
    review: t.testimonials.reviews.r4.review,
    avatar: "https://ui-avatars.com/api/?name=B+I&background=7C3AED&color=fff&size=64"
  },
  {
    id: 5,
    name: t.testimonials.reviews.r5.name,
    university: t.testimonials.reviews.r5.university,
    review: t.testimonials.reviews.r5.review,
    avatar: "https://ui-avatars.com/api/?name=N+T&background=EA580C&color=fff&size=64"
  },
  {
    id: 6,
    name: t.testimonials.reviews.r6.name,
    university: t.testimonials.reviews.r6.university,
    review: t.testimonials.reviews.r6.review,
    avatar: "https://ui-avatars.com/api/?name=A+M&background=0891B2&color=fff&size=64"
  }
];

// Список университетов для бегущей строки - теперь динамический
const getUniversities = (t: any) => t.testimonials.universities;

// Компонент бегущей строки университетов
function UniversityTicker({ isDarkMode }: { isDarkMode: boolean }) {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const universities = getUniversities(t);
  return (
    <div className="relative mb-4 md:mb-6 h-10 md:h-12 overflow-hidden">
      {/* Градиенты для плавного исчезновения по краям */}
      <div className={`absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r z-10 pointer-events-none ${isDarkMode ? 'from-[#050c26] to-transparent opacity-80' : 'from-purple-50 to-transparent'}`}></div>
      <div className={`absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l z-10 pointer-events-none ${isDarkMode ? 'from-[#050c26] to-transparent opacity-80' : 'from-blue-50 to-transparent'}`}></div>
      
      {/* Бегущая строка */}
      <div className="flex items-center h-full">
        <motion.div
          className="flex items-center space-x-4 md:space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -60 * universities.length, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {universities.map((university: string, index: number) => (
            <div
              key={index}
              className="text-sm md:text-base font-bold text-gray-500 px-2 md:px-4"
            >
              {university}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Компонент свайпабельных карточек услуг
function ServiceCardSwiper({ isDarkMode }: { isDarkMode: boolean }) {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const services = [
    {
      image: "/card1.png",
      alt: "Рефераты",
      title: t.services.essay.title,
      description: t.services.essay.description,
      from: t.services.essay.from,
      pages: t.services.essay.pages,
      time: t.services.essay.time,
      color: "blue"
    },
    {
      image: "/card2.png",
      alt: "Курсовые работы",
      title: t.services.coursework.title,
      description: t.services.coursework.description,
      from: t.services.coursework.from,
      pages: t.services.coursework.pages,
      time: t.services.coursework.time,
      color: "purple"
    },
    {
      image: "/card3.png",
      alt: "СРС",
      title: t.services.srs.title,
      description: t.services.srs.description,
      from: t.services.srs.from,
      pages: t.services.srs.pages,
      time: t.services.srs.time,
      color: "green"
    },
    {
      image: "/card4.png",
      alt: "Доклады",
      title: t.services.presentation.title,
      description: t.services.presentation.description,
      from: t.services.presentation.from,
      pages: t.services.presentation.pages,
      time: t.services.presentation.time,
      color: "orange"
    }
  ];

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (isAnimating) return;
    
    if (info.offset.x > threshold && currentCard > 0) {
      setIsAnimating(true);
      setCurrentCard(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    } else if (info.offset.x < -threshold && currentCard < services.length - 1) {
      setIsAnimating(true);
      setCurrentCard(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleCardChange = (index: number) => {
    if (isAnimating || index === currentCard) return;
    setIsAnimating(true);
    setCurrentCard(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          from: `${isDarkMode ? 'bg-[#050c26]' : 'bg-blue-100'} text-blue-800`,
          fallback: 'from-blue-500 to-cyan-400'
        };
      case "purple":
        return {
          from: `${isDarkMode ? 'bg-[#050c26]' : 'bg-purple-100'} text-purple-800`,
          fallback: 'from-purple-500 to-pink-400'
        };
      case "green":
        return {
          from: `${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-800`,
          fallback: 'from-green-500 to-emerald-400'
        };
      case "orange":
        return {
          from: `${isDarkMode ? 'bg-[#050c26]' : 'bg-orange-100'} text-orange-800`,
          fallback: 'from-orange-500 to-red-400'
        };
      default:
        return {
          from: `${isDarkMode ? 'bg-[#050c26]' : 'bg-gray-100'} text-gray-800`,
          fallback: 'from-gray-500 to-gray-400'
        };
    }
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentCard}
          className={`backdrop-blur-sm rounded-2xl p-4 shadow-lg border flex flex-col h-full ${
            isDarkMode 
              ? 'bg-[#181f38]/60 border-[#181f38]/40' 
              : 'bg-white/60 border-white/40'
          }`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5
          }}
        >
        <motion.div 
          className={`relative w-full h-40 mb-4 rounded-xl overflow-hidden ${
            isDarkMode ? 'bg-[#101831]' : 'bg-white'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <img 
            src={services[currentCard].image} 
            alt={services[currentCard].alt} 
            className="w-full h-full object-contain transition-opacity duration-300" 
            onError={(e) => {
              if (e.currentTarget.parentElement) {
                const colors = getColorClasses(services[currentCard].color);
                e.currentTarget.parentElement.innerHTML = `<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br ${colors.fallback} rounded-2xl flex items-center justify-center"><div class="w-8 h-8 text-white">📄</div></div></div>`;
              }
            }}
          />
        </motion.div>
        
        <motion.div 
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{services[currentCard].title}</h3>
          <p className={`mb-4 leading-relaxed flex-1 text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
          }`}>
            {services[currentCard].description}
          </p>
          <motion.div 
            className="flex flex-wrap gap-2 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <span className={`${getColorClasses(services[currentCard].color).from} text-xs font-semibold px-3 py-1 rounded-full`}>
              {services[currentCard].from}
            </span>
            <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-gray-100'} text-gray-700 text-xs font-medium px-3 py-1 rounded-full`}>
              {services[currentCard].pages}
            </span>
            <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-700 text-xs font-medium px-3 py-1 rounded-full`}>
              {services[currentCard].time}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
      </AnimatePresence>
      
      {/* Card indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardChange(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed ${
              index === currentCard 
                ? 'bg-blue-600 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
      
      {/* Swipe hint */}
      <motion.div 
        className="text-center mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <p className={`text-xs ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>
          Потяните влево или вправо • Карточка {currentCard + 1} из {services.length}
        </p>
      </motion.div>
    </div>
  );
}

// Компонент анимированных отзывов
function TestimonialAnimatedContainer({ isDarkMode }: { isDarkMode: boolean }) {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const testimonials = getTestimonials(t);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeCards, setActiveCards] = useState([
    { container: 0, showFirst: true },
    { container: 1, showFirst: true },
    { container: 2, showFirst: true },
    { container: 3, showFirst: true }
  ]);

  useEffect(() => {
    // Mobile: cycle through all testimonials
    const mobileInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    // Desktop: container animation
    let currentContainer = 0;
    const desktopInterval = setInterval(() => {
      setActiveCards(prev => {
        const newState = [...prev];
        newState[currentContainer] = {
          ...newState[currentContainer],
          showFirst: !newState[currentContainer].showFirst
        };
        return newState;
      });
      
      currentContainer = (currentContainer + 1) % 4;
    }, 3000);
    
    return () => {
      clearInterval(mobileInterval);
      clearInterval(desktopInterval);
    };
  }, [testimonials.length]);

  return (
    <div className="relative w-full">
      {/* Бегущая строка с университетами */}
      <UniversityTicker isDarkMode={isDarkMode} />

      {/* Mobile: Single testimonial card */}
      <div className="md:hidden max-w-sm mx-auto">
        <motion.div
          key={currentTestimonial}
          className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border transition-colors ${
            isDarkMode ? 'bg-[#181f38]/90 border-[#181f38]/40' : 'bg-white/90 border-white/40'
          }`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialCard testimonial={testimonials[currentTestimonial]} isDarkMode={isDarkMode} />
        </motion.div>
        
        {/* Mobile indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid of animated containers */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Array.from({ length: 4 }, (_, containerIndex) => (
          <TestimonialContainer
            key={containerIndex}
            containerIndex={containerIndex}
            showFirst={activeCards[containerIndex].showFirst}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}

// Компонент контейнера с отзывами (как в оригинале)
function TestimonialContainer({ 
  containerIndex, 
  showFirst,
  isDarkMode
}: {
  containerIndex: number;
  showFirst: boolean;
  isDarkMode: boolean;
}) {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const testimonials = getTestimonials(t);
  
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
      className="relative h-64 md:h-80"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: containerIndex * 0.2 }}
    >
      {/* Первая карточка */}
      <div
        className={`absolute inset-0 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border transition-colors ${
          isDarkMode ? 'bg-[#181f38]/90 border-[#181f38]/40' : 'bg-white/90 border-white/40'
        }`}
        style={{
          transition: 'opacity 1500ms cubic-bezier(1, 0, 0.615, 0.995), transform 1500ms cubic-bezier(1, 0, 0.615, 0.995)',
          opacity: showFirst ? 1 : 0,
          transform: showFirst ? 'translateY(0px)' : 'translateY(110%)'
        }}
      >
        <TestimonialCard testimonial={testimonials[first]} isDarkMode={isDarkMode} />
      </div>

      {/* Вторая карточка */}
      <div
        className={`absolute inset-0 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border transition-colors ${
          isDarkMode ? 'bg-[#181f38]/90 border-[#181f38]/40' : 'bg-white/90 border-white/40'
        }`}
        style={{
          transition: 'opacity 1500ms cubic-bezier(1, 0, 0.615, 0.995), transform 1500ms cubic-bezier(1, 0, 0.615, 0.995)',
          opacity: showFirst ? 0 : 1,
          transform: showFirst ? 'translateY(110%)' : 'translateY(0px)'
        }}
      >
        <TestimonialCard testimonial={testimonials[second]} isDarkMode={isDarkMode} />
      </div>
    </motion.div>
  );
}

// Компонент карточки отзыва
function TestimonialCard({ testimonial, isDarkMode }: { testimonial: any; isDarkMode: boolean }) {
  return (
    <div className="space-y-3 md:space-y-4">
      {/* Звезды */}
      <div className="flex space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      {/* Текст отзыва */}
      <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
        "{testimonial.review}"
      </p>
      
      {/* Информация о клиенте */}
      <div className="flex items-center space-x-2 md:space-x-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-1 md:space-x-2">
            <h4 className={`font-semibold text-xs md:text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
          </div>
          <p className={`text-[10px] md:text-xs ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>{testimonial.university}</p>
        </div>
      </div>
    </div>
  );
}

// FAQ данные - теперь динамически генерируется из переводов
const getFaqData = (t: any) => [
  {
    id: 1,
    question: t.faq.questions.q1.question,
    answer: t.faq.questions.q1.answer
  },
  {
    id: 2,
    question: t.faq.questions.q2.question,
    answer: t.faq.questions.q2.answer
  },
  {
    id: 3,
    question: t.faq.questions.q3.question,
    answer: t.faq.questions.q3.answer
  },
  {
    id: 4,
    question: t.faq.questions.q4.question,
    answer: t.faq.questions.q4.answer
  },
  {
    id: 5,
    question: t.faq.questions.q5.question,
    answer: t.faq.questions.q5.answer
  },
  {
    id: 6,
    question: t.faq.questions.q6.question,
    answer: t.faq.questions.q6.answer
  },
  {
    id: 7,
    question: t.faq.questions.q7.question,
    answer: t.faq.questions.q7.answer
  },
  {
    id: 8,
    question: t.faq.questions.q8.question,
    answer: t.faq.questions.q8.answer
  }
];

// Компонент FAQ аккордеона
function FAQAccordion({ isDarkMode }: { isDarkMode?: boolean }) {
  const [openItems, setOpenItems] = useState<number[]>([1]); // Первый элемент открыт по умолчанию
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  // Пересчитываем faqData при изменении языка
  const faqData = getFaqData(t);

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
      className={`rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-lg border mb-3 md:mb-4 cursor-pointer transition-all duration-300 ${
        isDarkMode
          ? openItems.includes(item.id)
            ? 'bg-[#181f38]/80 border-[#181f38]/40'
            : 'bg-[#181f38]/60 hover:bg-[#181f38]/70 border-[#181f38]/40'
          : openItems.includes(item.id)
            ? 'bg-white/80 border-white/40'
            : 'bg-white/60 hover:bg-white/70 border-white/40'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onClick={() => toggleItem(item.id)}
    >
      <button className="w-full text-left">
        <div className="flex items-center justify-between gap-x-2 md:gap-x-3 pb-2 md:pb-3">
          <h3 className={`text-base md:text-lg font-semibold transition-colors ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`}>
            {item.question}
          </h3>
          <div className="flex-shrink-0">
            {openItems.includes(item.id) ? (
              <svg className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isDarkMode ? 'text-[#78819d] hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            ) : (
              <svg className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${isDarkMode ? 'text-[#78819d] hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-[#78819d]' : 'text-gray-700'}`}>
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
      {/* Левая колонка */}
      <div className="space-y-3 md:space-y-4">
        {leftColumnItems.map((item, index) => renderFAQItem(item, index * 0.1))}
      </div>
      
      {/* Правая колонка */}
      <div className="space-y-3 md:space-y-4">
        {rightColumnItems.map((item, index) => renderFAQItem(item, (index * 0.1) + 0.05))}
      </div>
    </div>
  );
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, isClient } = useLanguage();
  const t = getTranslation(language);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Редирект авторизованных пользователей в дашборд
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  // Функции для работы с темой в куки
  const setThemeCookie = (isDark: boolean) => {
    if (typeof window !== 'undefined') {
      const expires = new Date()
      expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)) // 365 дней
      document.cookie = `studai-theme=${isDark ? 'dark' : 'light'};expires=${expires.toUTCString()};path=/`
    }
  }

  const getThemeCookie = (): boolean => {
    if (typeof window !== 'undefined') {
      const nameEQ = "studai-theme="
      const ca = document.cookie.split(';')
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length) === 'dark'
        }
      }
    }
    return false
  }

  // Загружаем тему из куки при инициализации
  useEffect(() => {
    if (isClient) {
      const savedTheme = getThemeCookie()
      setIsDarkMode(savedTheme)
    }
  }, [isClient])
  
  
  
  // Показываем загрузку, пока не определился язык на клиентской стороне
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Theme toggle component
  const ThemeToggle = () => (
    <div className="switchWrapper--1eo4">
      <div 
        className={`pointer icon--2r1-plus -mr-4 ${isDarkMode ? 'isActive--ihJ-' : ''}`}
        onClick={() => {
          setIsDarkMode(true)
          setThemeCookie(true)
        }}
      >
        <div className="wrapper wrapper__svg-is-inherit" style={{width:'24px',height:'24px'}} data-v-411017c9="">
          <svg data-v-411017c9="" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path data-v-411017c9="" d="M12.708 5.16673C12.836 4.91868 12.8254 4.62187 12.6801 4.38356C12.5348 4.14525 12.2758 3.99989 11.9967 4C7.57994 4.00179 4 7.58282 4 12C4 16.4183 7.58172 20 12 20C15.0997 20 17.7862 18.237 19.114 15.6627C19.2419 15.4147 19.2313 15.118 19.0861 14.8797C18.9409 14.6414 18.682 14.496 18.403 14.496L18.4 14.496C14.8654 14.496 12 11.6306 12 8.096C12 7.03876 12.2557 6.04358 12.708 5.16673Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      <div 
        className={`pointer icon--2r1-plus ${!isDarkMode ? 'isActive--ihJ-' : ''}`}
        onClick={() => {
          setIsDarkMode(false)
          setThemeCookie(false)
        }}
      >
        <div className="wrapper wrapper__svg-is-inherit" style={{width:'24px',height:'24px'}} data-v-411017c9="">
          <svg data-v-411017c9="" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
            <path data-v-411017c9="" d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V3Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M5.636 7.05086C6.02653 7.44138 6.65969 7.44138 7.05022 7.05086C7.44074 6.66033 7.44074 6.02717 7.05022 5.63664L6.34311 4.92954C5.95259 4.53901 5.31942 4.53901 4.9289 4.92954C4.53837 5.32006 4.53837 5.95323 4.9289 6.34375L5.636 7.05086Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M19.0711 4.92976C18.6806 4.53924 18.0474 4.53924 17.6569 4.92976L16.9498 5.63687C16.5593 6.02739 16.5593 6.66056 16.9498 7.05108C17.3403 7.44161 17.9735 7.44161 18.364 7.05108L19.0711 6.34398C19.4616 5.95345 19.4616 5.32029 19.0711 4.92976Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M7.05037 16.9493C6.65984 16.5588 6.02668 16.5588 5.63615 16.9493L4.92905 17.6564C4.53852 18.0469 4.53852 18.6801 4.92905 19.0706C5.31957 19.4611 5.95274 19.4611 6.34326 19.0706L7.05037 18.3635C7.44089 17.973 7.44089 17.3398 7.05037 16.9493Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M19.071 19.0704C18.6804 19.4609 18.0473 19.4609 17.6568 19.0704L16.9496 18.3633C16.5591 17.9728 16.5591 17.3396 16.9496 16.9491C17.3402 16.5585 17.9733 16.5585 18.3639 16.9491L19.071 17.6562C19.4615 18.0467 19.4615 18.6799 19.071 19.0704Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M12 19C11.4477 19 11 19.4477 11 20V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V20C13 19.4477 12.5523 19 12 19Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H21Z" fill="currentColor"></path>
            <path data-v-411017c9="" d="M5 12C5 11.4477 4.55228 11 4 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H4C4.55228 13 5 12.5523 5 12Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#050c26]' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
    }`}>
      
      {/* Header */}
      <header className={`fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 backdrop-blur-xl border z-50 rounded-2xl md:rounded-3xl shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#181f38]/80 border-[#181f38]/40' 
          : 'bg-white/80 border-white/40'
      }`}>
        <motion.div 
          className="px-3 md:px-8 py-3 md:py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center space-x-2 md:space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={isDarkMode ? "/studai-logo-white.svg" : "/studai-logo.svg"} 
              alt="StudAI Logo" 
              className="w-8 h-8 md:w-10 md:h-10 relative -top-0.75"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const nextElement = target.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'flex';
                }
              }}
            />
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center hidden">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>StudAI</span>
          </motion.div>
          
          <nav className="hidden lg:flex space-x-4 xl:space-x-8">
            <a href="#services" className={`transition-colors font-medium text-sm xl:text-base ${
              isDarkMode 
                ? 'text-[#78819d] hover:text-white' 
                : 'text-gray-700 hover:text-blue-600'
            }`}>
              {t.nav.services}
            </a>
            <a href="#process" className={`transition-colors font-medium text-sm xl:text-base ${
              isDarkMode 
                ? 'text-[#78819d] hover:text-white' 
                : 'text-gray-700 hover:text-blue-600'
            }`}>
              {t.nav.howItWorks}
            </a>
            <a href="#benefits" className={`transition-colors font-medium text-sm xl:text-base ${
              isDarkMode 
                ? 'text-[#78819d] hover:text-white' 
                : 'text-gray-700 hover:text-blue-600'
            }`}>
              {t.nav.benefits}
            </a>
            <a href="#reviews" className={`transition-colors font-medium text-sm xl:text-base ${
              isDarkMode 
                ? 'text-[#78819d] hover:text-white' 
                : 'text-gray-700 hover:text-blue-600'
            }`}>
              {t.nav.reviews}
            </a>
            <a href="#faq" className={`transition-colors font-medium text-sm xl:text-base ${
              isDarkMode 
                ? 'text-[#78819d] hover:text-white' 
                : 'text-gray-700 hover:text-blue-600'
            }`}>
              {t.nav.faq}
            </a>
          </nav>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSelector isDarkMode={isDarkMode} />
            <ThemeToggle />
            
            {session ? (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link 
                  href="/profile" 
                  className={`hidden sm:block font-bold transition-colors text-sm md:text-base ${
                    isDarkMode 
                      ? 'text-white hover:text-blue-600' 
                      : 'text-black hover:text-blue-600'
                  }`}
                >
                  {t.auth.profile.title}
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    variant="outline"
                    className="px-3 md:px-6 py-2 rounded-full font-semibold shadow-lg text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">{t.auth.profile.signOut}</span>
                    <span className="sm:hidden">Выйти</span>
                  </Button>
                </motion.div>
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className={`hidden sm:block font-bold transition-colors text-sm md:text-base ${
                    isDarkMode 
                      ? 'text-white hover:text-blue-600' 
                      : 'text-black hover:text-blue-600'
                  }`}
                >
                  {t.nav.login}
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-6 py-2 rounded-full font-semibold shadow-lg text-sm md:text-base">
                      <span className="hidden sm:inline">{t.nav.createAccount}</span>
                      <span className="sm:hidden">{t.nav.start}</span>
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 relative min-h-screen md:min-h-0 flex items-center md:block">
        {/* Mobile gradient background - only for light theme */}
        <div className={`md:hidden absolute inset-0 ${
          isDarkMode 
            ? '' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-80'
        }`} />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className={`inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-6 md:mb-8 shadow-sm transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/40'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-[#78819d]' : 'text-gray-700'
              }`}>{t.hero.badge}</span>
            </motion.div>

            {/* Background cards - desktop only */}
            <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Left cards */}
              <motion.div 
                className={`absolute left-10 -top-5 backdrop-blur-lg rounded-xl p-3 shadow-lg border w-64 cursor-pointer pointer-events-auto hover:z-10 opacity-60 blur-[1.4px] transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-[#181f38]/40 border-[#181f38]/20' 
                    : 'bg-white/40 border-white/20'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-xs mb-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{t.hero.examples.essay.title}</h4>
                    <p className={`text-xs mb-1 line-clamp-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                    }`}>{t.hero.examples.essay.topic}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-500 font-bold text-xs">{t.hero.examples.essay.price}</span>
                      <span className="text-gray-500 text-xs">{t.hero.examples.essay.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className={`absolute left-25 bottom-40 backdrop-blur-lg rounded-xl p-3 shadow-lg border w-64 cursor-pointer pointer-events-auto hover:z-20 z-10 opacity-60 blur-[1.4px] transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-[#181f38]/40 border-[#181f38]/20' 
                    : 'bg-white/40 border-white/20'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex items-start gap-2 pointer-events-none">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-xs mb-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{t.hero.examples.coursework.title}</h4>
                    <p className={`text-xs mb-1 line-clamp-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                    }`}>{t.hero.examples.coursework.topic}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-500 font-bold text-xs">{t.hero.examples.coursework.price}</span>
                      <span className="text-gray-500 text-xs">{t.hero.examples.coursework.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right cards */}
              <motion.div 
                className={`absolute right-10 -top-4 backdrop-blur-lg rounded-xl p-3 shadow-lg border w-64 cursor-pointer pointer-events-auto hover:z-10 opacity-60 blur-[1.4px] transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-[#181f38]/40 border-[#181f38]/20' 
                    : 'bg-white/40 border-white/20'
                }`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-xs mb-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{t.hero.examples.srs.title}</h4>
                    <p className={`text-xs mb-1 line-clamp-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                    }`}>{t.hero.examples.srs.topic}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-xs">{t.hero.examples.srs.price}</span>
                      <span className="text-gray-500 text-xs">{t.hero.examples.srs.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className={`absolute right-25 bottom-35 backdrop-blur-lg rounded-xl p-3 shadow-lg border w-64 cursor-pointer pointer-events-auto hover:z-10 opacity-60 blur-[1.4px] transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-[#181f38]/40 border-[#181f38]/20' 
                    : 'bg-white/40 border-white/20'
                }`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-xs mb-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{t.hero.examples.report.title}</h4>
                    <p className={`text-xs mb-1 line-clamp-1 text-left transition-colors duration-300 ${
                      isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                    }`}>{t.hero.examples.report.topic}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-xs">{t.hero.examples.report.price}</span>
                      <span className="text-gray-500 text-xs">{t.hero.examples.report.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main content - centered and free */}
            <div className="relative z-10 max-w-5xl mx-auto text-center mb-12 md:mb-16 px-2">
              <motion.h1 
                className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t.hero.title}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </motion.h1>

              <motion.p 
                className={`text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {t.hero.subtitle}
              </motion.p>

              {/* Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -2 }} 
                   whileTap={{ scale: 0.95 }}
                   className="group w-full sm:w-auto"
                 >
                   <Link href="/auth/signup">
                     <Button 
                       className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[50px] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto"
                     >
                       <FileText className="h-4 w-4 md:h-5 md:w-5" />
                       {t.hero.createWork}
                     </Button>
                   </Link>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ 
                     scale: 1.05, 
                     y: -2
                   }} 
                   whileTap={{ scale: 0.95 }}
                   className="group w-full sm:w-auto"
                 >
                   <Button 
                   variant="outline"
                   className={`text-base md:text-lg px-8 md:px-12 py-4 md:py-5 rounded-[50px] font-semibold backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 border-2 w-full sm:w-auto
                    ${isDarkMode 
                      ? 'bg-[#181f38]/60 text-white !border-[#181f38] hover:bg-blue-600 hover:border-blue-600' 
                      : 'bg-white/80 text-gray-700 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      }`}
                      >
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                        {t.hero.pricing}
                        </Button>
                 </motion.div>
              </motion.div>
            </div>

            
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.services.title}
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 ${
              isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
            }`}>
              {t.services.subtitle}
            </p>
          </motion.div>
          
          {/* Mobile: Swipeable single card */}
          <div className="md:hidden max-w-sm mx-auto">
            <ServiceCardSwiper isDarkMode={isDarkMode} />
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <motion.div 
              className={`backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border transition-all duration-300 flex flex-col h-full ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/40'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Image placeholder */}
              <div className={`relative w-full h-32 md:h-40 mb-3 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-[#101831]' : 'bg-white'
              }`}>
                <img src="/card1.png" alt="Рефераты" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center"><svg class="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 712-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{t.services.essay.title}</h3>
                <p className={`mb-3 md:mb-4 leading-relaxed flex-1 text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                }`}>
                  {t.services.essay.description}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-blue-100'} text-blue-800 text-xs font-semibold px-2 md:px-3 py-1 rounded-full`}>{t.services.essay.from}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-gray-100'} text-gray-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.essay.pages}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.essay.time}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border transition-all duration-300 flex flex-col h-full ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/40'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Image placeholder */}
              <div className={`relative w-full h-32 md:h-40 mb-3 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-[#101831]' : 'bg-white'
              }`}>
                <img src="/card2.png" alt="Курсовые работы" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center"><svg class="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{t.services.coursework.title}</h3>
                <p className={`mb-3 md:mb-4 leading-relaxed flex-1 text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                }`}>
                  {t.services.coursework.description}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-purple-100'} text-purple-800 text-xs font-semibold px-2 md:px-3 py-1 rounded-full`}>{t.services.coursework.from}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-gray-100'} text-gray-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.coursework.pages}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.coursework.time}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border transition-all duration-300 flex flex-col h-full ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/40'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Image placeholder */}
              <div className={`relative w-full h-32 md:h-40 mb-3 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-[#101831]' : 'bg-white'
              }`}>
                <img src="/card3.png" alt="СРС" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center"><svg class="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{t.services.srs.title}</h3>
                <p className={`mb-3 md:mb-4 leading-relaxed flex-1 text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                }`}>
                  {t.services.srs.description}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-800 text-xs font-semibold px-2 md:px-3 py-1 rounded-full`}>{t.services.srs.from}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-gray-100'} text-gray-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.srs.pages}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.srs.time}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border transition-all duration-300 flex flex-col h-full ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/40'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Image placeholder */}
              <div className={`relative w-full h-32 md:h-40 mb-3 md:mb-4 rounded-xl md:rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-[#101831]' : 'bg-white'
              }`}>
                <img src="/card4.png" alt="Доклады" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl flex items-center justify-center"><svg class="h-6 w-6 md:h-8 md:w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div></div>'; } }} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{t.services.presentation.title}</h3>
                <p className={`mb-3 md:mb-4 leading-relaxed flex-1 text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                }`}>
                  {t.services.presentation.description}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-orange-100'} text-orange-800 text-xs font-semibold px-2 md:px-3 py-1 rounded-full`}>{t.services.presentation.from}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-gray-100'} text-gray-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.presentation.pages}</span>
                  <span className={`${isDarkMode ? 'bg-[#050c26]' : 'bg-green-100'} text-green-700 text-xs font-medium px-2 md:px-3 py-1 rounded-full`}>{t.services.presentation.time}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="process" className={`py-12 md:py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#050c26]' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50'
      }`}>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t.howItWorks.title}
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4 ${
              isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
            }`}>
              {t.howItWorks.subtitle}
            </p>
          </motion.div>
          
          {/* Main Content Block */}
          <div className={`relative backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg overflow-visible max-w-7xl mx-auto border ${
            isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
          }`}>
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Left side - Steps */}
              <motion.div 
                className="basis-full lg:basis-3/5 p-4 md:p-6 lg:p-8 flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-4 md:space-y-6">
                  {/* Step 1 */}
                  <motion.div 
                    className="flex items-start gap-3 md:gap-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        01
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg md:text-[20px] font-bold mb-2 md:mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600`}>
                        {t.howItWorks.step1.title}
                      </h3>
                      <p className={`leading-relaxed text-sm md:text-[14px] transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                        {t.howItWorks.step1.description}
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Step 2 */}
                  <motion.div 
                    className="flex items-start gap-3 md:gap-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        02
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg md:text-[20px] font-bold mb-2 md:mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-purple-600`}>
                        {t.howItWorks.step2.title}
                      </h3>
                      <p className={`leading-relaxed text-sm md:text-[14px] transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                        {t.howItWorks.step2.description}
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Step 3 */}
                  <motion.div 
                    className="flex items-start gap-3 md:gap-6 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        03
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg md:text-[20px] font-bold mb-2 md:mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-green-600`}>
                        {t.howItWorks.step3.title}
                      </h3>
                      <p className={`leading-relaxed text-sm md:text-[14px] transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                        {t.howItWorks.step3.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right side - Image extending out */}
              <motion.div 
                className="hidden lg:flex basis-2/5 relative items-end justify-center lg:justify-end overflow-visible"
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
      <section id="benefits" className={`py-12 md:py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#050c26]' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
      }`}>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.benefits.title}
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors px-4 ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
              {t.benefits.subtitle}
            </p>
          </motion.div>
          
          {/* Main content container */}
          <div className="relative">
            {/* Mobile cards - stacked layout */}
            <div className="lg:hidden space-y-4">
              <motion.div 
                className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border flex items-center gap-3 transition-colors ${
                  isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.speed.title}</div>
                  <div className={`text-xs transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.speed.subtitle}</div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border flex items-center gap-3 transition-colors ${
                  isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.quality.title}</div>
                  <div className={`text-xs transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.quality.subtitle}</div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border flex items-center gap-3 transition-colors ${
                  isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.uniqueness.title}</div>
                  <div className={`text-xs transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.uniqueness.subtitle}</div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border flex items-center gap-3 transition-colors ${
                  isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.support.title}</div>
                  <div className={`text-xs transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.support.subtitle}</div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`backdrop-blur-sm rounded-xl p-4 shadow-lg border flex items-center gap-3 transition-colors ${
                  isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.pricing.title}</div>
                  <div className={`text-xs transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.pricing.subtitle}</div>
                </div>
              </motion.div>
            </div>
            
            {/* Desktop cards - positioned behind image in orderly grid */}
            <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
              {/* Top row cards - 2 horizontal cards */}
              <div className="flex justify-center items-start gap-90 absolute top-20 left-170 transform -translate-x-1/2 w-full max-w-4xl">
                <motion.div 
                  className={`backdrop-blur-sm rounded-xl p-6 shadow-lg border w-80 z-10 flex items-center gap-4 transition-colors ${
                    isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                  }`}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-base font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.speed.title}</div>
                    <div className={`text-sm transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.speed.subtitle}</div>
                  </div>
                </motion.div>

                <motion.div 
                  className={`backdrop-blur-sm rounded-xl p-6 shadow-lg border w-80 z-10 flex items-center gap-4 transition-colors ${
                    isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                  }`}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-base font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.quality.title}</div>
                    <div className={`text-sm transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.quality.subtitle}</div>
                  </div>
                </motion.div>
              </div>

              {/* Middle row cards - 2 horizontal cards */}
              <div className="flex justify-center items-start gap-120 absolute top-53 left-175 transform -translate-x-1/2 w-full max-w-6xl">
                <motion.div 
                  className={`backdrop-blur-sm rounded-xl p-6 shadow-lg border w-80 z-10 flex items-center gap-4 transition-colors ${
                    isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                  }`}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-base font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.uniqueness.title}</div>
                    <div className={`text-sm transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.uniqueness.subtitle}</div>
                  </div>
                </motion.div>

                <motion.div 
                  className={`backdrop-blur-sm rounded-xl p-6 shadow-lg border w-80 z-10 flex items-center gap-4 transition-colors ${
                    isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                  }`}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-base font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.support.title}</div>
                    <div className={`text-sm transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.support.subtitle}</div>
                  </div>
                </motion.div>
              </div>

              {/* Fifth card - right after the 4 cards */}
              <div className="flex justify-center items-start absolute -top-12 left-175 transform -translate-x-1/2 w-full max-w-4xl">
                <motion.div 
                  className={`backdrop-blur-sm rounded-xl p-6 shadow-lg border w-80 z-10 flex items-center gap-4 transition-colors ${
                    isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/80 border-white/40'
                  }`}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-base font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.benefits.pricing.title}</div>
                    <div className={`text-sm transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-500'}`}>{t.benefits.pricing.subtitle}</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Central image container - desktop only */}
            <motion.div 
              className="hidden lg:flex relative justify-center items-center min-h-[500px] z-20"
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
      <section id="reviews" className={`py-12 md:py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#050c26]' : 'bg-gradient-to-r from-purple-50 to-blue-50'
      }`}>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Background graphic */}
          <div className={`absolute inset-0 w-full h-full pointer-events-none ${isDarkMode ? 'opacity-0' : 'opacity-30'}` }>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <motion.div 
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.testimonials.title}
              </h2>
              <div className="mb-4 md:mb-6"></div>
              <div className="max-w-3xl mx-auto mb-4 px-4">
                <p className={`text-lg md:text-xl transition-colors ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                  {t.testimonials.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Testimonial Cards Animation Container */}
            <TestimonialAnimatedContainer isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-12 md:py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-[#050c26]' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50'
      }`}>
        <div className="max-w-7xl px-4 py-6 md:py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Title */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-8 md:mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.faq.title}
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed transition-colors px-4 ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
              {t.faq.subtitle}
            </p>
          </motion.div>
          {/* End Title */}

          <FAQAccordion isDarkMode={isDarkMode} />
        </div>
      </section>
      {/* End FAQ */}

      {/* Ready to get your work section - outside container */}
      <div data-test-id="help-container" className="container mx-auto px-4 md:px-6 my-12 md:my-20">
        <section className={`backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg overflow-visible relative mx-2 md:mx-8 lg:mx-12 border ${
          isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/40' : 'bg-white/60 border-white/40'
        }`}>
          <div className="relative md:!h-[424px]" style={{ minHeight: "160px" }}>
            <div className="flex flex-col lg:flex-row items-center lg:items-center h-full">
              {/* Left content */}
              <motion.div 
                className="flex-1 px-4 md:px-8 lg:px-18 py-3 md:py-4 text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.ready.title}
                </h2>
                
                <div className="mb-6 md:mb-8">
                  <p className={`text-base md:text-lg leading-relaxed transition-colors ${
                    isDarkMode ? 'text-[#78819d]' : 'text-gray-600'
                  }`}>
                    {t.ready.subtitle}
                  </p>
                </div>
                
                <div className="flex justify-center lg:justify-start items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/auth/signup">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center gap-2 md:gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <FileText className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="border-l border-white/30 pl-2 md:pl-3 ml-2 md:ml-3">{t.ready.createOrder}</span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right image - overflowing from top - hidden on mobile */}
              <motion.div 
                className="hidden lg:flex flex-shrink-0 relative ml-18 mr-12"
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
      <footer className={`backdrop-blur-xl py-12 md:py-16 relative border-t transition-colors ${
        isDarkMode ? 'bg-[#181f38]/80 border-[#181f38]/30 text-[#78819d]' : 'bg-white/80 border-white/20 text-gray-700'
      }`}>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                <img 
                  src={isDarkMode ? "/studai-logo-white.svg" : "/studai-logo.svg"} 
                  alt="StudAI Logo" 
                  className="w-8 h-8 md:w-10 md:h-10 relative -top-0.75"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const nextElement = target.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center hidden">
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>StudAI</span>
              </div>
              <p className={`leading-relaxed mb-4 md:mb-6 text-sm md:text-base ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                {t.footer.description}
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-3 md:space-x-4">
                <a 
                  href="https://instagram.com/studai.kg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/996555123456" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className={`text-base md:text-lg font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.footer.services}</h3>
              <ul className={`space-y-2 md:space-y-3 text-sm md:text-base ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                <li><a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.servicesLinks.essays}</a></li>
                <li><a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.servicesLinks.coursework}</a></li>
                <li><a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.servicesLinks.srs}</a></li>
                <li><a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.servicesLinks.reports}</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.servicesLinks.presentations}</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className={`text-base md:text-lg font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.footer.company}</h3>
              <ul className={`space-y-2 md:space-y-3 text-sm md:text-base ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.companyLinks.about}</a></li>
                <li><a href="#reviews" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.companyLinks.reviews}</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.companyLinks.guarantees}</a></li>
                <li><a href="#faq" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.companyLinks.faq}</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>{t.footer.companyLinks.support}</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className={`text-base md:text-lg font-bold mb-4 md:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.footer.contact}</h3>
              <div className={`space-y-3 md:space-y-4 text-sm md:text-base ${isDarkMode ? 'text-[#78819d]' : 'text-gray-600'}`}>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-blue-600" />
                  <a href="tel:+996555123456" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>
                    +996 555 123 456
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-blue-600" />
                  <a href="mailto:info@studai.kg" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>
                    info@studai.kg
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 text-blue-600" />
                  <span>Бишкек, Кыргызстан</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`border-t mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-start md:items-center ${isDarkMode ? 'border-[#181f38]/40 text-[#78819d]' : 'border-gray-200 text-gray-500'}`}>
            <p className="text-sm md:text-base mb-3 md:mb-0">{t.footer.copyright}</p>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className={`text-sm md:text-base transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>
                {t.footer.privacy}
              </a>
              <a href="#" className={`text-sm md:text-base transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-blue-600'}`}>
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}