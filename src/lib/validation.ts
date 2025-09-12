import { Language } from '@/contexts/LanguageContext'

// Переводы для сообщений валидации браузера
const validationMessages = {
  ru: {
    valueMissing: 'Заполните это поле',
    typeMismatch: 'Введите корректный email адрес',
    tooShort: 'Пароль должен содержать минимум 6 символов',
    patternMismatch: 'Введите корректный формат',
    rangeUnderflow: 'Значение слишком мало',
    rangeOverflow: 'Значение слишком велико',
    stepMismatch: 'Введите корректное значение',
    badInput: 'Введите корректное значение',
    customError: 'Неверное значение'
  },
  ky: {
    valueMissing: 'Бул талааны толтуруңуз',
    typeMismatch: 'Туура email дарегин киргизиңиз',
    tooShort: 'Сыр сөз кеминде 6 белгиден турушу керек',
    patternMismatch: 'Туура форматты киргизиңиз',
    rangeUnderflow: 'Маани өтө кичине',
    rangeOverflow: 'Маани өтө чоң',
    stepMismatch: 'Туура маанини киргизиңиз',
    badInput: 'Туура маанини киргизиңиз',
    customError: 'Туура эмес маани'
  },
  en: {
    valueMissing: 'Please fill out this field',
    typeMismatch: 'Please enter a valid email address',
    tooShort: 'Password must be at least 6 characters',
    patternMismatch: 'Please enter a valid format',
    rangeUnderflow: 'Value is too small',
    rangeOverflow: 'Value is too large',
    stepMismatch: 'Please enter a valid value',
    badInput: 'Please enter a valid value',
    customError: 'Invalid value'
  }
}

export function setCustomValidationMessage(element: HTMLInputElement, language: Language) {
  const messages = validationMessages[language]
  
  element.addEventListener('invalid', (event) => {
    const target = event.target as HTMLInputElement
    const validity = target.validity
    
    let message = messages.customError
    
    if (validity.valueMissing) {
      message = messages.valueMissing
    } else if (validity.typeMismatch) {
      message = messages.typeMismatch
    } else if (validity.tooShort) {
      message = messages.tooShort
    } else if (validity.patternMismatch) {
      message = messages.patternMismatch
    } else if (validity.rangeUnderflow) {
      message = messages.rangeUnderflow
    } else if (validity.rangeOverflow) {
      message = messages.rangeOverflow
    } else if (validity.stepMismatch) {
      message = messages.stepMismatch
    } else if (validity.badInput) {
      message = messages.badInput
    }
    
    target.setCustomValidity(message)
  })
  
  // Сбрасываем кастомное сообщение при вводе
  element.addEventListener('input', () => {
    element.setCustomValidity('')
  })
}

export function setupValidationForForm(form: HTMLFormElement, language: Language) {
  const inputs = form.querySelectorAll('input[required]') as NodeListOf<HTMLInputElement>
  
  inputs.forEach(input => {
    setCustomValidationMessage(input, language)
  })
}
