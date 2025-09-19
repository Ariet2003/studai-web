'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  RefreshCw,
  FileText,
  BookOpen,
  GraduationCap,
  Clock,
  Check,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  MoreVertical,
  AlertTriangle,
  GripVertical
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/translations'
import LanguageSelector from '@/components/LanguageSelector'

interface PlanItem {
  text: string
  type: 'chapter' | 'subsection'
  id: string
}

// Компонент для перетаскиваемого элемента плана
interface SortablePlanItemProps {
  item: PlanItem
  index: number
  isDarkMode: boolean
  isMobile: boolean
  isTypingComplete: boolean
  isCurrentItem: boolean
  editingIndex: number | null
  editingText: string
  onEditItem: (index: number) => void
  onSaveItem: () => void
  onCancelEdit: () => void
  onDeleteItem: (index: number) => void
  onOpenAddDropdown: (index: number) => void
  onOpenDeleteModal: (index: number) => void
  onSetEditingText: (text: string) => void
  onAddItem: (index: number, isChapter: boolean) => void
  showAddDropdown: number | null
  mobileMenuIndex: number | null
  onSetMobileMenuIndex: (index: number | null) => void
  onSetShowMobileMenuModal: (show: boolean) => void
}

const SortablePlanItem = ({
  item,
  index,
  isDarkMode,
  isMobile,
  isTypingComplete,
  isCurrentItem,
  editingIndex,
  editingText,
  onEditItem,
  onSaveItem,
  onCancelEdit,
  onDeleteItem,
  onOpenAddDropdown,
  onOpenDeleteModal,
  onSetEditingText,
  onAddItem,
  showAddDropdown,
  mobileMenuIndex,
  onSetMobileMenuIndex,
  onSetShowMobileMenuModal
}: SortablePlanItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
  }

  const isChapter = item.type === 'chapter'
  const isSubsection = item.type === 'subsection'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-plan-item={index}
      className={`group relative p-2 md:p-3 rounded-lg transition-colors duration-150 cursor-grab active:cursor-grabbing select-none ${
        isDarkMode 
          ? 'bg-[#0f172a]/40 hover:bg-[#0f172a]/60' 
          : 'bg-slate-50/50 hover:bg-slate-100/70'
      } ${
        isDragging ? 'opacity-50 shadow-lg z-50' : ''
      } ${
        isChapter
          ? `text-sm md:text-lg font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`
          : `ml-4 text-sm md:text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`
      }`}
      onMouseDown={(e) => {
        // Предотвращаем выделение текста
        e.preventDefault()
      }}
      onDragStart={(e) => {
        // Предотвращаем стандартное поведение перетаскивания
        e.preventDefault()
      }}
    >
      {editingIndex === index ? (
        // Режим редактирования
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editingText}
            onChange={(e) => onSetEditingText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className={`flex-1 px-2 py-1 rounded border ${
              isDarkMode 
                ? 'bg-[#2d3748] border-[#4a5568] text-white' 
                : 'bg-white border-slate-300 text-slate-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSaveItem()
              if (e.key === 'Escape') onCancelEdit()
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSaveItem()
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className={`p-1 rounded transition-colors ${
              isDarkMode 
                ? 'hover:bg-green-600/20 text-green-400' 
                : 'hover:bg-green-100 text-green-600'
            }`}
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCancelEdit()
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className={`p-1 rounded transition-colors ${
              isDarkMode 
                ? 'hover:bg-red-600/20 text-red-400' 
                : 'hover:bg-red-100 text-red-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Режим просмотра
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            {/* Drag handle - только иконка */}
            {isTypingComplete && (
              <div className="p-1 rounded transition-colors text-slate-400">
                <GripVertical className="w-4 h-4" />
              </div>
            )}
            
            <span className="flex-1">
              {item.text}
              {isCurrentItem && (
                <span className="animate-pulse ml-1 text-blue-500 font-mono">|</span>
              )}
            </span>
          </div>
          
          {isTypingComplete && (
            <div className={`flex items-center gap-1 ${
              isMobile 
                ? '' 
                : 'opacity-0 group-hover:opacity-100'
            } transition-opacity`}>
              {/* Десктопная версия */}
              {!isMobile && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditItem(index)
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`p-1 rounded transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-blue-600/20 text-blue-400' 
                        : 'hover:bg-blue-100 text-blue-600'
                    }`}
                    title="Редактировать"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <div className="relative add-dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenAddDropdown(index)
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className={`p-1 rounded transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-green-600/20 text-green-400' 
                          : 'hover:bg-green-100 text-green-600'
                      }`}
                      title="Добавить после"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    
                    {/* Локальный выпадающий список */}
                    <AnimatePresence>
                      {showAddDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg border z-20 ${
                            isDarkMode 
                              ? 'bg-[#2d3748] border-[#4a5568]' 
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onAddItem(index, true)
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-xs transition-colors ${
                              isDarkMode 
                                ? 'hover:bg-blue-600/20 text-blue-400' 
                                : 'hover:bg-blue-100 text-blue-600'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                            Глава
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onAddItem(index, false)
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-xs transition-colors ${
                              isDarkMode 
                                ? 'hover:bg-slate-600/20 text-white' 
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-700'}`}></div>
                            Подтема
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenDeleteModal(index)
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`p-1 rounded transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-red-600/20 text-red-400' 
                        : 'hover:bg-red-100 text-red-600'
                    }`}
                    title="Удалить"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </>
              )}
              
              {/* Мобильная версия */}
              {isMobile && (
                <div className="relative mobile-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSetMobileMenuIndex(index)
                      onSetShowMobileMenuModal(true)
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`p-2 rounded transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-slate-600/20 text-slate-400' 
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface GeneratedPlan {
  title: string
  plan: PlanItem[]
  isFirstGeneration?: boolean
  metadata: {
    workType: string
    workLanguage: string
    topic: string
    subject: string
    pageCount: string
    requirements?: string
    includeTitlePage: boolean
    titlePageInfo?: {
      university: string
      studentName: string
      group: string
      teacherName: string
    }
    generatedAt: string
  }
}

export default function ResultPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language, isClient } = useLanguage()
  const t = getTranslation(language)
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [typedItems, setTypedItems] = useState<PlanItem[]>([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [currentItemText, setCurrentItemText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')
  const [editablePlan, setEditablePlan] = useState<PlanItem[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [showAddDropdown, setShowAddDropdown] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteModalIndex, setDeleteModalIndex] = useState<number | null>(null)
  const [mobileMenuIndex, setMobileMenuIndex] = useState<number | null>(null)
  const [showMobileMenuModal, setShowMobileMenuModal] = useState(false)
  const [showMobileAddModal, setShowMobileAddModal] = useState(false)
  const [mobileAddIndex, setMobileAddIndex] = useState<number | null>(null)
  const [newItemIndex, setNewItemIndex] = useState<number | null>(null)
  const [isFirstGeneration, setIsFirstGeneration] = useState(false)

  // Сенсоры для перетаскивания
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Функция для синхронизации данных с localStorage
  const syncWithLocalStorage = (updatedPlan: PlanItem[]) => {
    if (generatedPlan) {
      const updatedGeneratedPlan = {
        ...generatedPlan,
        plan: updatedPlan
      }
      localStorage.setItem('studai-generated-plan', JSON.stringify(updatedGeneratedPlan))
      setGeneratedPlan(updatedGeneratedPlan)
    }
  }

  // Обработчик изменения порядка элементов
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // Восстанавливаем выделение текста
    document.body.style.userSelect = ''

    if (over && active.id !== over.id) {
      const oldIndex = typedItems.findIndex((item) => item.id === active.id)
      const newIndex = typedItems.findIndex((item) => item.id === over.id)

      const newItems = arrayMove(typedItems, oldIndex, newIndex)
      setTypedItems(newItems)
      
      // Обновляем также editablePlan если он существует
      if (editablePlan.length > 0) {
        const newEditablePlan = arrayMove(editablePlan, oldIndex, newIndex)
        setEditablePlan(newEditablePlan)
        syncWithLocalStorage(newEditablePlan)
      } else {
        syncWithLocalStorage(newItems)
      }
    }
  }

  // Функции для работы с темой
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

  const setThemeCookie = (isDark: boolean) => {
    if (typeof window !== 'undefined') {
      const expires = new Date()
      expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000))
      document.cookie = `studai-theme=${isDark ? 'dark' : 'light'};expires=${expires.toUTCString()};path=/`
    }
  }

  const workTypeIcons = {
    essay: <BookOpen className="w-5 h-5" />,
    coursework: <GraduationCap className="w-5 h-5" />,
    srs: <FileText className="w-5 h-5" />,
    report: <Clock className="w-5 h-5" />
  }

  const workTypeNames = t.result.workTypeNames

  useEffect(() => {
    if (isClient) {
      const savedTheme = getThemeCookie()
      setIsDarkMode(savedTheme)
      
      // Определяем мобильное устройство
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkIsMobile()
      window.addEventListener('resize', checkIsMobile)
      
      // Загружаем готовый план и запускаем эффект печатания
      const savedPlan = localStorage.getItem('studai-generated-plan')
      if (savedPlan) {
        try {
          const planData = JSON.parse(savedPlan)
          
          // Конвертируем старый формат в новый, если необходимо
          if (planData.plan && Array.isArray(planData.plan) && planData.plan.length > 0) {
            if (typeof planData.plan[0] === 'string') {
              // Старый формат - конвертируем в новый
              planData.plan = planData.plan.map((item: string, index: number) => {
                const isChapter = item.match(/^(Введение|Заключение|Список литературы|References|Conclusion|Introduction|Глава \d+\.|Chapter \d+\.|Киришүү|Жыйынтык|Корутунду|Адабияттар тизмеси|Колдонулган адабияттардын тизмеси|\d+-глава\.|\d+-Бөлүм\.|Новая глава)/)
                return {
                  text: item,
                  type: isChapter ? 'chapter' : 'subsection',
                  id: `item-${index}-${Date.now()}`
                }
              })
            } else if (planData.plan[0] && !planData.plan[0].id) {
              // Новый формат без ID - добавляем ID
              planData.plan = planData.plan.map((item: any, index: number) => ({
                ...item,
                id: item.id || `item-${index}-${Date.now()}`
              }))
            }
          }
          
          setGeneratedPlan(planData)
          
          // Проверяем, нужно ли запускать анимацию печати
          const shouldAnimate = planData.isFirstGeneration === true
          setIsFirstGeneration(shouldAnimate)
          
          if (shouldAnimate) {
            // Запускаем эффект печатания только при первой генерации
          setTimeout(() => {
            startTypingEffect(planData)
          }, 500)
          } else {
            // Сразу отображаем план без анимации
            const planItems = planData.plan
            setTypedItems(planItems)
            setIsTypingComplete(true)
          }
        } catch (error) {
          console.error('Error parsing plan data:', error)
          router.push('/dashboard/create')
        }
      } else {
        router.push('/dashboard/create')
      }

      // Добавляем обработчик для кнопки "назад" в браузере
      const handlePopState = () => {
        localStorage.removeItem('studai-generated-plan')
      }
      window.addEventListener('popstate', handlePopState)

      // Закрытие мобильного меню и выпадающих списков при клике вне их
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element
        
        if (mobileMenuIndex !== null && !target.closest('.mobile-menu-container')) {
          setMobileMenuIndex(null)
        }
        
        if (showAddDropdown !== null && !target.closest('.add-dropdown-container')) {
          setShowAddDropdown(null)
        }
      }
      
      document.addEventListener('click', handleClickOutside)

      return () => {
        window.removeEventListener('popstate', handlePopState)
        window.removeEventListener('resize', checkIsMobile)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isClient, router])


  const startTypingEffect = (planData: GeneratedPlan) => {
    setIsTypingComplete(false)
    
    const planItems = planData.plan
    let itemIndex = 0
    let charIndex = 0
    let animationId: NodeJS.Timeout
    
    // Инициализируем массив с пустыми объектами
    const initialItems = new Array(planItems.length).fill(null).map((_, index) => ({
      text: '',
      type: planItems[index].type,
      id: planItems[index].id
    }))
    setTypedItems(initialItems)
    setCurrentItemIndex(0)
    
    const typeNextChar = () => {
      if (itemIndex >= planItems.length) {
        setIsTypingComplete(true)
        // Сбрасываем флаг после завершения анимации
        setIsFirstGeneration(false)
        // Обновляем данные в localStorage без флага анимации
        const updatedPlan = {
          ...planData,
          isFirstGeneration: false
        }
        localStorage.setItem('studai-generated-plan', JSON.stringify(updatedPlan))
        setGeneratedPlan(updatedPlan)
        return
      }
      
      const currentItem = planItems[itemIndex]
      
      if (charIndex < currentItem.text.length) {
        // Печатаем следующий символ, обновляя элемент в массиве
        charIndex++
        const partialText = currentItem.text.slice(0, charIndex)
        
        setTypedItems(prev => {
          const newItems = [...prev]
          newItems[itemIndex] = {
            text: partialText,
            type: currentItem.type,
            id: currentItem.id
          }
          return newItems
        })
        
        // Автоматическая прокрутка к текущему элементу
        setTimeout(() => {
          const currentElement = document.querySelector(`[data-plan-item="${itemIndex}"]`)
          if (currentElement) {
            // Прокручиваем к элементу с отступом от верха
            const elementRect = currentElement.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            
            // Если элемент находится в нижней половине экрана, прокручиваем
            if (elementRect.bottom > viewportHeight * 0.7) {
              currentElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              })
            }
          }
        }, 50)
        
        // Скорость печатания
        const delay = currentItem.text[charIndex - 1] === ' ' ? 10 : 15
        animationId = setTimeout(typeNextChar, delay)
      } else {
        // Завершили текущий элемент, переходим к следующему
        itemIndex++
        setCurrentItemIndex(itemIndex)
        charIndex = 0
        
        // Прокрутка к новому элементу при переходе
        setTimeout(() => {
          const nextElement = document.querySelector(`[data-plan-item="${itemIndex}"]`)
          if (nextElement) {
            const elementRect = nextElement.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            
            // Если следующий элемент находится в нижней половине экрана, прокручиваем
            if (elementRect.bottom > viewportHeight * 0.6) {
              nextElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              })
            }
          }
        }, 10)
        
        // Небольшая пауза только для плавности (50ms)
        animationId = setTimeout(typeNextChar, 50)
      }
    }
    
    // Прокрутка к началу плана перед началом печати
    setTimeout(() => {
      const firstElement = document.querySelector('[data-plan-item="0"]')
      if (firstElement) {
        firstElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
      }
    }, 200)
    
    // Начинаем печатание с задержкой
    animationId = setTimeout(typeNextChar, 500)
    
    // Очистка при размонтировании
    return () => {
      if (animationId) {
        clearTimeout(animationId)
      }
    }
  }

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  const handleBack = () => {
    // Очищаем план из localStorage и возвращаемся на форму создания
    localStorage.removeItem('studai-generated-plan')
    router.push('/dashboard/create')
  }

  const handleRegenerate = async () => {
    // Перенаправляем на страницу создания для новой генерации
    localStorage.removeItem('studai-generated-plan')
    router.push('/dashboard/create')
  }

  const handleCreateWork = () => {
    // Здесь будет логика создания полной работы
    alert('Функция создания полной работы будет реализована позже')
  }

  // Функции для редактирования плана
  const handleEditItem = (index: number) => {
    setEditingIndex(index)
    const currentItem = editablePlan[index] || typedItems[index]
    setEditingText(currentItem?.text || '')
  }

  const handleSaveItem = () => {
    if (editingIndex !== null) {
      const updatedPlan = [...editablePlan]
      if (updatedPlan.length === 0) {
        // Если editablePlan пуст, копируем из typedItems
        updatedPlan.push(...typedItems)
      }
      updatedPlan[editingIndex] = {
        text: editingText,
        type: updatedPlan[editingIndex]?.type || 'subsection',
        id: updatedPlan[editingIndex]?.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      setEditablePlan(updatedPlan)
      
      // Обновляем также typedItems для отображения
      const updatedTypedItems = [...typedItems]
      updatedTypedItems[editingIndex] = {
        text: editingText,
        type: updatedTypedItems[editingIndex]?.type || 'subsection',
        id: updatedTypedItems[editingIndex]?.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      setTypedItems(updatedTypedItems)
      
      // Синхронизируем с localStorage
      syncWithLocalStorage(updatedPlan)
      
      // Сбрасываем состояние нового элемента
      setNewItemIndex(null)
      setEditingIndex(null)
      setEditingText('')
    }
  }

  const handleCancelEdit = () => {
    // Если это новый элемент, удаляем его
    if (newItemIndex !== null && editingIndex === newItemIndex) {
      const updatedPlan = editablePlan.length > 0 ? [...editablePlan] : [...typedItems]
      updatedPlan.splice(newItemIndex, 1)
      setEditablePlan(updatedPlan)
      
      // Обновляем typedItems
      const updatedTypedItems = [...typedItems]
      updatedTypedItems.splice(newItemIndex, 1)
      setTypedItems(updatedTypedItems)
      
      // Синхронизируем с localStorage
      syncWithLocalStorage(updatedPlan)
      
      setNewItemIndex(null)
    }
    
    setEditingIndex(null)
    setEditingText('')
  }

  const handleDeleteItem = (index: number) => {
    const updatedPlan = editablePlan.length > 0 ? [...editablePlan] : [...typedItems]
    updatedPlan.splice(index, 1)
    setEditablePlan(updatedPlan)
    
    // Обновляем typedItems
    const updatedTypedItems = [...typedItems]
    updatedTypedItems.splice(index, 1)
    setTypedItems(updatedTypedItems)
    
    // Синхронизируем с localStorage
    syncWithLocalStorage(updatedPlan)
    
    // Сбрасываем редактирование если удаляем редактируемый элемент
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingText('')
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  // Открытие выпадающего списка добавления (десктоп) или модального окна (мобайл)
  const handleOpenAddDropdown = (afterIndex: number) => {
    if (isMobile) {
      setMobileAddIndex(afterIndex)
      setShowMobileAddModal(true)
    } else {
      setShowAddDropdown(showAddDropdown === afterIndex ? null : afterIndex)
    }
    setMobileMenuIndex(null) // Закрываем мобильное меню
  }

  // Функция для поиска правильной позиции для новой главы
  const findChapterInsertPosition = (fromIndex: number, plan: string[]) => {
    // Если это глава, размещаем после всех подглав текущей главы
    let insertIndex = fromIndex + 1
    
    // Ищем текущую главу (идем назад от fromIndex)
    let currentChapterIndex = fromIndex
    while (currentChapterIndex >= 0) {
      const item = plan[currentChapterIndex]
      const isChapter = item?.match(/^(Введение|Заключение|Список литературы|References|Conclusion|Introduction|Глава \d+\.|Chapter \d+\.|Киришүү|Жыйынтык|Корутунду|Адабияттар тизмеси|Колдонулган адабияттардын тизмеси|\d+-глава\.|\d+-Бөлүм\.|Новая глава)/)
      if (isChapter) {
        break
      }
      currentChapterIndex--
    }
    
    // Теперь ищем конец всех подглав этой главы
    for (let i = currentChapterIndex + 1; i < plan.length; i++) {
      const item = plan[i]
      const isChapter = item?.match(/^(Введение|Заключение|Список литературы|References|Conclusion|Introduction|Глава \d+\.|Chapter \d+\.|Киришүү|Жыйынтык|Корутунду|Адабияттар тизмеси|Колдонулган адабияттардын тизмеси|\d+-глава\.|\d+-Бөлүм\.|Новая глава)/)
      
      if (isChapter) {
        // Нашли следующую главу, вставляем перед ней
        insertIndex = i
        break
      } else {
        // Это подглава, продолжаем поиск
        insertIndex = i + 1
      }
    }
    
    return insertIndex
  }

  // Добавление нового элемента с определенным типом
  const handleAddItem = (afterIndex: number, isChapter: boolean) => {
    const currentPlan = editablePlan.length > 0 ? editablePlan : typedItems
    
    const newItem: PlanItem = {
      text: isChapter ? 'Новая глава' : 'Новый подраздел',
      type: isChapter ? 'chapter' : 'subsection',
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    // Определяем правильную позицию для вставки
    let insertIndex = afterIndex + 1
    if (isChapter) {
      insertIndex = findChapterInsertPosition(afterIndex, currentPlan.map(item => item.text))
    }
    
    const updatedPlan = [...currentPlan]
    updatedPlan.splice(insertIndex, 0, newItem)
    setEditablePlan(updatedPlan)
    
    // Обновляем typedItems
    const updatedTypedItems = [...typedItems]
    updatedTypedItems.splice(insertIndex, 0, newItem)
    setTypedItems(updatedTypedItems)
    
    // Синхронизируем с localStorage
    syncWithLocalStorage(updatedPlan)
    
    // Закрываем выпадающий список или мобильное модальное окно
    setShowAddDropdown(null)
    setShowMobileAddModal(false)
    setMobileAddIndex(null)
    
    // Помечаем как новый элемент и начинаем редактирование
    setNewItemIndex(insertIndex)
    setEditingIndex(insertIndex)
    setEditingText(newItem.text)
  }

  // Открытие модального окна удаления
  const handleOpenDeleteModal = (index: number) => {
    setDeleteModalIndex(index)
    setShowDeleteModal(true)
    setMobileMenuIndex(null) // Закрываем мобильное меню
  }

  // Подтверждение удаления
  const handleConfirmDelete = () => {
    if (deleteModalIndex !== null) {
      handleDeleteItem(deleteModalIndex)
      setShowDeleteModal(false)
      setDeleteModalIndex(null)
    }
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
  )

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-[#050c26]' : 'bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-white' : 'text-slate-600'}>Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#050c26]' 
        : 'bg-gradient-to-br from-blue-100 via-cyan-20 to-purple-100'
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
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#2d3748] text-[#78819d] hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
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
                  if (nextElement) nextElement.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center hidden">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className={`hidden sm:block text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>StudAI</span>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSelector isDarkMode={isDarkMode} />
            <ThemeToggle />
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="pt-22 md:pt-36 p-2 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          
          {/* Work Information Block */}
          {generatedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-6 mb-6 backdrop-blur-xl border ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/60'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                  <FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {generatedPlan.title}
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                    {generatedPlan.metadata ? `${workTypeNames[generatedPlan.metadata.workType as keyof typeof workTypeNames]} • ${generatedPlan.metadata.subject}` : t.result.planGeneration.completed}
                  </p>
                </div>
              </div>
              
              {generatedPlan.metadata && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>{t.result.workInfo.type}</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {workTypeNames[generatedPlan.metadata.workType as keyof typeof workTypeNames]}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>{t.result.workInfo.language}</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {t.workGenerator.form.workLanguageOptions[generatedPlan.metadata.workLanguage as keyof typeof t.workGenerator.form.workLanguageOptions]}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>{t.result.workInfo.pages}</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {t.workGenerator.form.pageCountOptions[generatedPlan.metadata.pageCount as keyof typeof t.workGenerator.form.pageCountOptions]}
                    </span>
                  </div>
                  <div>
                    <span className={`block font-medium ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>{t.result.workInfo.subject}</span>
                    <span className={`${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {generatedPlan.metadata.subject}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Plan Content - всегда показываем */}
          {generatedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-4 mb-6 backdrop-blur-xl border ${
                isDarkMode 
                  ? 'bg-[#181f38]/60 border-[#181f38]/40' 
                  : 'bg-white/60 border-white/60'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {!isTypingComplete ? (
                  <>
                    <div className={`w-3 h-3 rounded-full bg-green-500 animate-pulse`}></div>
                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {t.result.planGeneration.generating}
                    </h2>
                  </>
                ) : (
                  <>
                    <div className={`w-3 h-3 rounded-full bg-blue-500`}></div>
                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {t.result.planGeneration.completed}
                    </h2>
                  </>
                )}
              </div>
                
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  onDragStart={() => {
                    // Отключаем выделение текста при начале перетаскивания
                    document.body.style.userSelect = 'none'
                  }}
                  onDragCancel={() => {
                    // Восстанавливаем выделение текста при отмене
                    document.body.style.userSelect = ''
                  }}
                >
                  <SortableContext
                    items={typedItems.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                <div className="space-y-2">
                  {typedItems.map((item, index) => {
                    // Показываем только непустые элементы
                        if (!item || !item.text) return null
                    
                    const isCurrentItem = index === currentItemIndex && !isTypingComplete
                    
                    return (
                          <SortablePlanItem
                            key={item.id}
                            item={item}
                            index={index}
                            isDarkMode={isDarkMode}
                            isMobile={isMobile}
                            isTypingComplete={isTypingComplete}
                            isCurrentItem={isCurrentItem}
                            editingIndex={editingIndex}
                            editingText={editingText}
                            onEditItem={handleEditItem}
                            onSaveItem={handleSaveItem}
                            onCancelEdit={handleCancelEdit}
                            onDeleteItem={handleDeleteItem}
                            onOpenAddDropdown={handleOpenAddDropdown}
                            onOpenDeleteModal={handleOpenDeleteModal}
                            onSetEditingText={setEditingText}
                            onAddItem={handleAddItem}
                            showAddDropdown={showAddDropdown}
                            mobileMenuIndex={mobileMenuIndex}
                            onSetMobileMenuIndex={setMobileMenuIndex}
                            onSetShowMobileMenuModal={setShowMobileMenuModal}
                          />
                    )
                  })}
                </div>
                  </SortableContext>
                </DndContext>
            </motion.div>
          )}

          {/* Action Buttons - показываем только кнопки после завершения */}
          {generatedPlan && isTypingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isRegenerating
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : isDarkMode
                        ? 'bg-[#2d3748] text-white hover:bg-[#4a5568]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  whileHover={isRegenerating ? {} : { scale: 1.02 }}
                  whileTap={isRegenerating ? {} : { scale: 0.98 }}
                >
                  <RefreshCw className={`w-5 h-5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  {isRegenerating ? t.result.actions.regenerating : t.result.actions.regenerate}
                </motion.button>

                <motion.button
                  onClick={handleCreateWork}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5" />
                  {t.result.actions.createWork}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>


      {/* Модальное окно удаления */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl p-6 max-w-sm w-full ${
                isDarkMode ? 'bg-[#181f38]' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Подтвердить удаление
                </h3>
              </div>
              
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
  {t.result.actions.cancel}
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  Удалить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Мобильное модальное окно добавления */}
      <AnimatePresence>
        {showMobileAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMobileAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl p-6 max-w-sm w-full ${
                isDarkMode ? 'bg-[#181f38]' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Добавить элемент
              </h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#78819d]' : 'text-slate-600'}`}>
                Выберите тип элемента для добавления:
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => mobileAddIndex !== null && handleAddItem(mobileAddIndex, true)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-blue-400/30 hover:border-blue-400/50 hover:bg-blue-400/10' 
                      : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                  <div className="text-left">
                    <div className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      Добавить главу
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-500'}`}>
                      Основной раздел работы
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => mobileAddIndex !== null && handleAddItem(mobileAddIndex, false)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-700'}`}></div>
                  <div className="text-left">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                      Добавить подтему
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-[#78819d]' : 'text-slate-500'}`}>
                      Подраздел главы
                    </div>
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setShowMobileAddModal(false)}
                className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
{t.result.actions.cancel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Мобильное модальное окно для меню с тремя точками */}
      <AnimatePresence>
        {showMobileMenuModal && mobileMenuIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowMobileMenuModal(false)
              setMobileMenuIndex(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl p-6 w-full max-w-xs ${
                isDarkMode ? 'bg-[#181f38]' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-lg font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.result.actions.menuTitle}
              </h3>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleEditItem(mobileMenuIndex)
                    setShowMobileMenuModal(false)
                    setMobileMenuIndex(null)
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-blue-600/20 text-blue-400 border border-blue-400/30' 
                      : 'hover:bg-blue-100 text-blue-600 border border-blue-200'
                  }`}
                >
                  <Edit2 className="w-5 h-5" />
                  <span className="font-medium">{t.result.actions.edit}</span>
                </button>
                
                <button
                  onClick={() => {
                    handleOpenAddDropdown(mobileMenuIndex)
                    setShowMobileMenuModal(false)
                    setMobileMenuIndex(null)
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-green-600/20 text-green-400 border border-green-400/30' 
                      : 'hover:bg-green-100 text-green-600 border border-green-200'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">{t.result.actions.addAfter}</span>
                </button>
                
                <button
                  onClick={() => {
                    handleOpenDeleteModal(mobileMenuIndex)
                    setShowMobileMenuModal(false)
                    setMobileMenuIndex(null)
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-red-600/20 text-red-400 border border-red-400/30' 
                      : 'hover:bg-red-100 text-red-600 border border-red-200'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-medium">{t.result.actions.delete}</span>
                </button>
              </div>
              
              <button
                onClick={() => {
                  setShowMobileMenuModal(false)
                  setMobileMenuIndex(null)
                }}
                className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
{t.result.actions.cancel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
