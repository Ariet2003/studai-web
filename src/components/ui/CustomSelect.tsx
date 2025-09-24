'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  options: Option[]
  onChange: (value: string) => void
  isDarkMode?: boolean
  placeholder?: string
  className?: string
}

export default function CustomSelect({
  value,
  options,
  onChange,
  isDarkMode = false,
  placeholder = 'Выберите опцию',
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl transition-colors duration-300 border flex items-center justify-between ${
          isDarkMode 
            ? 'bg-[#2d3748] border-[#2d3748] text-white hover:border-blue-500' 
            : 'bg-white border-slate-200 text-slate-900 hover:border-blue-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
          isOpen ? (isDarkMode ? 'border-blue-500' : 'border-blue-500') : ''
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className={`text-left ${!selectedOption ? (isDarkMode ? 'text-gray-400' : 'text-gray-500') : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 right-0 mt-2 py-2 rounded-xl border shadow-lg z-50 ${
              isDarkMode 
                ? 'bg-[#2d3748] border-[#2d3748] shadow-black/20' 
                : 'bg-white border-slate-200 shadow-gray-200'
            }`}
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center justify-between ${
                  isDarkMode 
                    ? 'hover:bg-[#3d4854] text-white' 
                    : 'hover:bg-slate-50 text-slate-900'
                } ${option.value === value ? (isDarkMode ? 'bg-[#3d4854]' : 'bg-blue-50') : ''}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

