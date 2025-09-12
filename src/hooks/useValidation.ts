import { useEffect, useRef } from 'react'
import { Language } from '@/contexts/LanguageContext'
import { setupValidationForForm } from '@/lib/validation'

export function useValidation(language: Language) {
  const formRef = useRef<HTMLFormElement>(null)
  
  useEffect(() => {
    if (formRef.current) {
      setupValidationForForm(formRef.current, language)
    }
  }, [language])
  
  return formRef
}
