'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`
        relative backdrop-blur-xl bg-white/10 border border-white/20 
        rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300
        before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br 
        before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity 
        before:duration-300 hover:before:opacity-100 overflow-hidden group
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      </div>
      {children}
    </motion.div>
  )
}

