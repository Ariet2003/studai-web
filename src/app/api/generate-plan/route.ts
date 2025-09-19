import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface GeneratePlanRequest {
  workType: string
  workLanguage: string
  topic: string
  subject: string
  pageCount: string
  requirements?: string
  includeTitlePage: boolean
  university?: string
  studentName?: string
  group?: string
  teacherName?: string
  uiLanguage?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GeneratePlanRequest = await request.json()
    
    const {
      workType,
      workLanguage,
      topic,
      subject,
      pageCount,
      requirements,
      includeTitlePage,
      university,
      studentName,
      group,
      teacherName,
      uiLanguage
    } = body

    // Определяем тип работы на русском для промпта
    const workTypeNames = {
      essay: 'реферат',
      coursework: 'курсовая работа',
      srs: 'самостоятельная работа студента (СРС)',
      report: 'доклад'
    }

    const workLanguageNames = {
      russian: 'русском',
      kyrgyz: 'кыргызском',
      english: 'английском'
    }

    const pageCountNames = {
      pages5_10: '5-10',
      pages10_20: '10-20',
      pages20_30: '20-30',
      pages30_40: '30-40'
    }

    // Создаем промпт в зависимости от языка работы
    const prompts = {
      russian: `Ты студент и должен создать подробный план для работы.

Параметры работы:
- Тип работы: ${workTypeNames[workType as keyof typeof workTypeNames] || workType}
- Язык работы: ${workLanguageNames[workLanguage as keyof typeof workLanguageNames] || workLanguage}
- Тема: "${topic}"
- Предмет: ${subject}
- Количество страниц: ${pageCountNames[pageCount as keyof typeof pageCountNames] || pageCount} страниц
${requirements ? `- Дополнительные требования: ${requirements}` : ''}
${includeTitlePage ? `
- Включить титульный лист:
  - Университет: ${university}
  - Студент: ${studentName}
  - Группа: ${group}
  - Преподаватель: ${teacherName}
` : ''}

Создай детальный план работы по теме "${topic}" для предмета "${subject}" на русском языке.

ВАЖНО: Генерируй СТРОГО в указанной структуре:

Структура должна быть:
Введение
Глава 1. [КОНКРЕТНОЕ название главы по теме]
1.1. [КОНКРЕТНОЕ название подраздела]
1.2. [КОНКРЕТНОЕ название подраздела]
1.3. [КОНКРЕТНОЕ название подраздела]
Глава 2. [КОНКРЕТНОЕ название главы по теме]
2.1. [КОНКРЕТНОЕ название подраздела]
2.2. [КОНКРЕТНОЕ название подраздела]
2.3. [КОНКРЕТНОЕ название подраздела]
Заключение
Список литературы

Ответь ТОЛЬКО в JSON формате:
{
  "title": "Конкретное название работы по теме",
  "plan": [
    "Введение",
    "Глава 1. Конкретное название",
    "1.1. Конкретное название",
    "1.2. Конкретное название",
    "1.3. Конкретное название",
    "Глава 2. Конкретное название",
    "2.1. Конкретное название",
    "2.2. Конкретное название",
    "2.3. Конкретное название",
    "Заключение",
    "Список литературы"
  ]
}`,

      kyrgyz: `Сен студентсиң жана иш үчүн кеңири план түзүшүң керек.

Иштин параметрлери:
- Иштин түрү: ${workType === 'essay' ? 'реферат' : workType === 'coursework' ? 'курстук жумуш' : workType === 'srs' ? 'СӨЖ' : workType === 'report' ? 'доклад' : workType}
- Иштин тили: ${workLanguage === 'russian' ? 'орусча' : workLanguage === 'kyrgyz' ? 'кыргызча' : workLanguage === 'english' ? 'англисче' : workLanguage}
- Тема: "${topic}"
- Предмет: ${subject}
- Бет саны: ${pageCountNames[pageCount as keyof typeof pageCountNames] || pageCount} бет
${requirements ? `- Кошумча талаптар: ${requirements}` : ''}
${includeTitlePage ? `
- Титулдук баракты кошуу:
  - Университет: ${university}
  - Студент: ${studentName}
  - Топ: ${group}
  - Мугалим: ${teacherName}
` : ''}

"${topic}" темасы боюнча "${subject}" предмети үчүн кыргызча кеңири иш планын түз.

МААНИЛҮҮ: Көрсөтүлгөн структурада КАТУУ түзгүн:

Структура төмөнкүдөй болушу керек:
Киришүү
1-Бөлүм. [Тема боюнча КОНКРЕТТҮҮ глава аталышы]
1.1. [КОНКРЕТТҮҮ бөлүм аталышы]
1.2. [КОНКРЕТТҮҮ бөлүм аталышы]  
1.3. [КОНКРЕТТҮҮ бөлүм аталышы]
2-Бөлүм. [Тема боюнча КОНКРЕТТҮҮ глава аталышы]
2.1. [КОНКРЕТТҮҮ бөлүм аталышы]
2.2. [КОНКРЕТТҮҮ бөлүм аталышы]
2.3. [КОНКРЕТТҮҮ бөлүм аталышы]
Корутунду
Колдонулган адабияттардын тизмеси

ЖӨӨН гана JSON форматында жооп бер:
{
  "title": "Тема боюнча конкреттүү иш аталышы",
  "plan": [
    "Киришүү",
    "1-Бөлүм. Конкреттүү аталыш",
    "1.1. Конкреттүү аталыш",
    "1.2. Конкреттүү аталыш", 
    "1.3. Конкреттүү аталыш",
    "2-Бөлүм. Конкреттүү аталыш",
    "2.1. Конкреттүү аталыш",
    "2.2. Конкреттүү аталыш",
    "2.3. Конкреттүү аталыш",
    "Корутунду",
    "Колдонулган адабияттардын тизмеси"
  ]
}`,

      english: `You are a student and need to create a detailed work plan.

Work parameters:
- Work type: ${workType === 'essay' ? 'essay' : workType === 'coursework' ? 'coursework' : workType === 'srs' ? 'independent work' : workType === 'report' ? 'report' : workType}
- Work language: ${workLanguage === 'russian' ? 'Russian' : workLanguage === 'kyrgyz' ? 'Kyrgyz' : workLanguage === 'english' ? 'English' : workLanguage}
- Topic: "${topic}"
- Subject: ${subject}
- Number of pages: ${pageCountNames[pageCount as keyof typeof pageCountNames] || pageCount} pages
${requirements ? `- Additional requirements: ${requirements}` : ''}
${includeTitlePage ? `
- Include title page:
  - University: ${university}
  - Student: ${studentName}
  - Group: ${group}
  - Teacher: ${teacherName}
` : ''}

Create a detailed work plan on the topic "${topic}" for the subject "${subject}" in English.

IMPORTANT: Generate STRICTLY in the specified structure:

Structure should be:
Introduction
Chapter 1. [SPECIFIC chapter title by topic]
1.1. [SPECIFIC subsection title]
1.2. [SPECIFIC subsection title]
1.3. [SPECIFIC subsection title]
Chapter 2. [SPECIFIC chapter title by topic]
2.1. [SPECIFIC subsection title]
2.2. [SPECIFIC subsection title]
2.3. [SPECIFIC subsection title]
Conclusion
References

Answer ONLY in JSON format:
{
  "title": "Specific work title by topic",
  "plan": [
    "Introduction",
    "Chapter 1. Specific title",
    "1.1. Specific title",
    "1.2. Specific title",
    "1.3. Specific title", 
    "Chapter 2. Specific title",
    "2.1. Specific title",
    "2.2. Specific title",
    "2.3. Specific title",
    "Conclusion",
    "References"
  ]
}`
    }

    const prompt = prompts[workLanguage as keyof typeof prompts] || prompts.russian

    // Определяем system prompt в зависимости от языка интерфейса  
    const systemPrompts = {
      ru: "Ты помощник для создания академических планов работ. Всегда отвечай только в указанном JSON формате без дополнительного текста.",
      ky: "Сен академиялык иш планын түзүү үчүн жардамчысың. Ар дайым көрсөтүлгөн JSON форматында гана кошумча текстсиз жооп бер.",
      en: "You are an assistant for creating academic work plans. Always respond only in the specified JSON format without additional text."
    }

    const systemPrompt = systemPrompts[uiLanguage as keyof typeof systemPrompts] || systemPrompts.ru

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Парсим JSON ответ
    let parsedResponse
    try {
      parsedResponse = JSON.parse(response)
    } catch (error) {
      // Если не удалось распарсить, попробуем извлечь JSON из текста
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Invalid JSON response from OpenAI')
      }
    }

    // Конвертируем план в новый формат с типами
    const convertPlanToNewFormat = (plan: string[]) => {
      return plan.map((item, index) => {
        const isChapter = item.match(/^(Введение|Заключение|Список литературы|References|Conclusion|Introduction|Глава \d+\.|Chapter \d+\.|Киришүү|Жыйынтык|Корутунду|Адабияттар тизмеси|Колдонулган адабияттардын тизмеси|\d+-глава\.|\d+-Бөлүм\.)/)
        return {
          text: item,
          type: isChapter ? 'chapter' : 'subsection',
          id: `item-${index}-${Date.now()}`
        }
      })
    }

    // Добавляем метаданные о работе
    const result = {
      ...parsedResponse,
      plan: convertPlanToNewFormat(parsedResponse.plan),
      isFirstGeneration: true, // Флаг для анимации печати
      metadata: {
        workType,
        workLanguage,
        topic,
        subject,
        pageCount,
        requirements,
        includeTitlePage,
        ...(includeTitlePage && {
          titlePageInfo: {
            university,
            studentName,
            group,
            teacherName
          }
        }),
        generatedAt: new Date().toISOString()
      }
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error generating plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate work plan' },
      { status: 500 }
    )
  }
}
