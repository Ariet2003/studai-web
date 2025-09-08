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
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import GlassCard from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-xl border-b border-white/10 z-50">
        <motion.div 
          className="container mx-auto px-4 py-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <GraduationCap className="h-8 w-8 text-cyan-400" />
              <motion.div
                className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">StudAI</span>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            <motion.a 
              href="#services" 
              className="text-white/80 hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Услуги
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
            <motion.a 
              href="#process" 
              className="text-white/80 hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Как работает
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
            <motion.a 
              href="#benefits" 
              className="text-white/80 hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Преимущества
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
            <motion.a 
              href="#reviews" 
              className="text-white/80 hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Отзывы
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-cyan-500/25 rounded-full">
              Заказать работу
            </Button>
          </motion.div>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Революция в образовании</span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Студенческие работы
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative">
                за 3 минуты
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Рефераты, курсовые работы, СРС и доклады высочайшего качества. 
              <span className="text-cyan-400 font-semibold"> Современные технологии ИИ</span> создают 
              уникальные работы за считанные минуты.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 shadow-2xl shadow-cyan-500/25 border-0 group rounded-full"
                >
                  <Brain className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Создать работу сейчас
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div 
                className="flex items-center text-white/60 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="h-5 w-5 mr-3 text-cyan-400" />
                <span className="font-medium">Готово за 3 минуты</span>
              </motion.div>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">15,000+</div>
                  <div className="text-white/60 font-medium">Выполненных работ</div>
                </div>
              </motion.div>
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">98%</div>
                  <div className="text-white/60 font-medium">Довольных студентов</div>
                </div>
              </motion.div>
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">3 мин</div>
                  <div className="text-white/60 font-medium">Среднее время</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900/50 backdrop-blur-xl relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="h-4 w-4 text-cyan-400" />
              <span className="text-white/80 text-sm font-medium">Наши возможности</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6">
              Наши услуги
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Профессиональная помощь студентам во всех видах академических работ 
              с использованием передовых технологий
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassCard delay={0.1}>
              <div className="relative flex flex-col h-full">
                {/* Image placeholder */}
                <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white border border-white/10">
                  <img src="/card1.png" alt="Рефераты" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div></div>'; } }} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">Рефераты</h3>
                  <p className="text-white/60 mb-4 leading-relaxed flex-1 text-sm">
                    Качественные рефераты по любым предметам с уникальностью 90%+
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-cyan-400/20 text-cyan-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-cyan-400/30">От 500 руб.</span>
                    <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">10-20 стр.</span>
                    <span className="bg-green-400/20 text-green-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-green-400/30">3 мин</span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.2}>
              <div className="relative flex flex-col h-full">
                {/* Image placeholder */}
                <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white border border-white/10">
                  <img src="/card2.png" alt="Курсовые работы" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div></div>'; } }} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">Курсовые работы</h3>
                  <p className="text-white/60 mb-4 leading-relaxed flex-1 text-sm">
                    Серьезные исследовательские работы с глубоким анализом темы
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-purple-400/20 text-purple-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-purple-400/30">От 1500 руб.</span>
                    <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">30-50 стр.</span>
                    <span className="bg-green-400/20 text-green-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-green-400/30">3 мин</span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.3}>
              <div className="relative flex flex-col h-full">
                {/* Image placeholder */}
                <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white border border-white/10">
                  <img src="/card3.png" alt="СРС" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg></div></div>'; } }} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">СРС</h3>
                  <p className="text-white/60 mb-4 leading-relaxed flex-1 text-sm">
                    Самостоятельные работы студентов любой сложности
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-green-400/20 text-green-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-green-400/30">От 300 руб.</span>
                    <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">5-15 стр.</span>
                    <span className="bg-green-400/20 text-green-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-green-400/30">3 мин</span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.4}>
              <div className="relative flex flex-col h-full">
                {/* Image placeholder */}
                <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-white border border-white/10">
                  <img src="/card4.png" alt="Доклады" className="w-full h-full object-contain" onError={(e) => { if (e.currentTarget.parentElement) { e.currentTarget.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-white"><div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center"><svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div></div>'; } }} />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">Доклады</h3>
                  <p className="text-white/60 mb-4 leading-relaxed flex-1 text-sm">
                    Презентации и доклады для выступлений на семинарах
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-orange-400/20 text-orange-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-orange-400/30">От 400 руб.</span>
                    <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">5-10 стр.</span>
                    <span className="bg-green-400/20 text-green-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-green-400/30">3 мин</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="process" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
              Как это работает
            </h2>
            <p className="text-xl text-white/60">Простой процесс в 3 шага</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <GlassCard delay={0.1}>
              <div className="text-center">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  1
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Укажите тему</h3>
                <p className="text-white/60 leading-relaxed">
                  Введите тему работы, требования и пожелания в удобной форме
                </p>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.2}>
              <div className="text-center">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  2
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">ИИ создает работу</h3>
                <p className="text-white/60 leading-relaxed">
                  Наш ИИ анализирует тему и создает уникальную работу за 3 минуты
                </p>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.3}>
              <div className="text-center">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  3
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Получите результат</h3>
                <p className="text-white/60 leading-relaxed">
                  Скачайте готовую работу в формате Word с гарантией качества
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-slate-900/30 backdrop-blur-xl relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-white/60">Преимущества, которые делают нас лучшими</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard delay={0.1}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <Zap className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Молниеносная скорость</h3>
                  <p className="text-white/60 leading-relaxed">
                    Получите готовую работу всего за 3 минуты благодаря технологиям ИИ
                  </p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.2}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <Shield className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">100% уникальность</h3>
                  <p className="text-white/60 leading-relaxed">
                    Каждая работа создается с нуля и проверяется на плагиат
                  </p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.3}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <Award className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Высокое качество</h3>
                  <p className="text-white/60 leading-relaxed">
                    Работы соответствуют всем академическим стандартам
                  </p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.4}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <CheckCircle className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Гарантия возврата</h3>
                  <p className="text-white/60 leading-relaxed">
                    Если работа не устроит - вернем деньги без вопросов
                  </p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.5}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <Star className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Доступные цены</h3>
                  <p className="text-white/60 leading-relaxed">
                    Справедливые цены для студентов без переплат
                  </p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.6}>
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  <Heart className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Поддержка 24/7</h3>
                  <p className="text-white/60 leading-relaxed">
                    Наша команда всегда готова помочь в любое время
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
              Отзывы студентов
            </h2>
            <p className="text-xl text-white/60">Что говорят наши клиенты</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard delay={0.1}>
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-lg">АМ</span>
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">Анна Михайлова</h4>
                <p className="text-white/60 text-sm mb-4">МГУ, 3 курс</p>
                <div className="flex justify-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-white/70 italic leading-relaxed">
                  "Невероятно! Получила курсовую за 3 минуты, качество превзошло ожидания. 
                  Преподаватель поставил отлично!"
                </p>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.2}>
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-lg">ДК</span>
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">Дмитрий Козлов</h4>
                <div className="flex justify-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-white/70 italic leading-relaxed">
                  "Сервис спас меня перед дедлайном. Реферат был готов моментально, 
                  уникальность 95%. Рекомендую всем!"
                </p>
              </div>
            </GlassCard>
            
            <GlassCard delay={0.3}>
              <div className="text-center">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white font-bold text-lg">ЕС</span>
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">Елена Смирнова</h4>
                <p className="text-white/60 text-sm mb-4">МГТУ, 4 курс</p>
                <div className="flex justify-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-white/70 italic leading-relaxed">
                  "Пользуюсь уже полгода. Качество работ всегда на высоте, 
                  цены адекватные. Лучший сервис для студентов!"
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Готовы получить свою работу?
            </h2>
            <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам довольных студентов уже сегодня
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="text-xl px-12 py-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 text-white shadow-2xl border-0 group font-bold rounded-full"
              >
                <Brain className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Создать работу сейчас
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-xl text-white py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <GraduationCap className="h-10 w-10 text-cyan-400" />
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">StudAI</span>
              </motion.div>
              <p className="text-white/60 leading-relaxed">
                Современный сервис для создания студенческих работ с помощью искусственного интеллекта.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Услуги</h3>
              <ul className="space-y-3 text-white/60">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Рефераты</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Курсовые работы</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">СРС</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Доклады</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Компания</h3>
              <ul className="space-y-3 text-white/60">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Контакты</h3>
              <div className="space-y-4 text-white/60">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="h-5 w-5 mr-3 text-cyan-400" />
                  <span>+7 (999) 123-45-67</span>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-5 w-5 mr-3 text-cyan-400" />
                  <span>info@studai.ru</span>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="h-5 w-5 mr-3 text-cyan-400" />
                  <span>Москва, Россия</span>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 StudAI. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

