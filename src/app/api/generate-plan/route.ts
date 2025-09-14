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
      teacherName
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

    const prompt = `Ты студент и должен создать подробный план для работы.

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

Создай детальный план работы по теме "${topic}" для предмета "${subject}".

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
}`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Ты помощник для создания академических планов работ. Всегда отвечай только в указанном JSON формате без дополнительного текста."
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

    // Добавляем метаданные о работе
    const result = {
      ...parsedResponse,
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
