import { TPost } from 'src/types'
import axios from 'axios'
import { ExtendedRecordMap } from 'notion-types'

const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2'
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY

async function translateText(text: string, source: string = 'ko', target: string = 'en'): Promise<string> {
  if (!text || !API_KEY || typeof text !== 'string') {
    console.log('Invalid text or API key:', { text, hasApiKey: !!API_KEY })
    return text
  }
  if (!text.trim()) return text

  try {
    console.log(`Translating text from ${source} to ${target}:`, text)
    const response = await axios.post(
      `${GOOGLE_TRANSLATE_API_URL}?key=${API_KEY}`,
      {
        q: text,
        source,
        target,
        format: 'html'
      }
    )

    if (!response.data?.data?.translations?.[0]?.translatedText) {
      console.error('Invalid translation response:', response.data)
      return text
    }

    const translatedText = response.data.data.translations[0].translatedText
    console.log('Translation result:', translatedText)
    return translatedText
  } catch (error) {
    console.error('Translation API error:', error)
    if (axios.isAxiosError(error)) {
      console.error('API response:', error.response?.data)
    }
    return text
  }
}

async function translateBlock(block: any, sourceLang: string, targetLang: string): Promise<any> {
  if (!block?.value?.properties) return block

  const translatedBlock = JSON.parse(JSON.stringify(block))
  const properties = translatedBlock.value.properties

  for (const key in properties) {
    if (Array.isArray(properties[key])) {
      const segments = properties[key]
      if (segments.length > 0) {
        try {
          const translatedSegments = await Promise.all(
            segments.map(async (segment: any) => {
              if (Array.isArray(segment)) {
                if (typeof segment[0] === 'string' && segment[0].trim()) {
                  const translatedText = await translateText(segment[0], sourceLang, targetLang)
                  return [translatedText, ...(segment.slice(1) || [])]
                }
              } else if (typeof segment === 'string' && segment.trim()) {
                return await translateText(segment, sourceLang, targetLang)
              }
              return segment
            })
          )
          translatedBlock.value.properties[key] = translatedSegments
        } catch (error) {
          console.error(`Error translating property ${key}:`, error)
        }
      }
    }
  }

  if (translatedBlock.value.title) {
    try {
      translatedBlock.value.title = await translateText(
        translatedBlock.value.title,
        sourceLang,
        targetLang
      )
    } catch (error) {
      console.error('Error translating block title:', error)
    }
  }

  return translatedBlock
}

export async function translatePost(post: TPost, targetLang: string = 'en'): Promise<TPost> {
  // API 키 확인
  if (!API_KEY) {
    console.error('Translation API key is missing')
    return post
  }

  // 원본 데이터가 없을 때
  if (!post) {
    console.error('No post data to translate')
    return post
  }
  
  // 언어 확인
  console.log('Current target language:', targetLang)
  
  // 항상 깊은 복사를 수행하여 원본 데이터 보존
  const translatedPost = JSON.parse(JSON.stringify(post))
  
  // 한국어로 전환할 때는 깊은 복사본을 바로 반환
  if (targetLang === 'ko') {
    console.log('Returning Korean version')
    return translatedPost
  }

  const sourceLang = 'ko'
  console.log('Starting translation to:', targetLang)

  try {
    // 기본 필드 번역
    if (typeof post.title === 'string' && post.title.trim()) {
      console.log('Translating title:', post.title)
      const translatedTitle = await translateText(post.title, sourceLang, targetLang)
      translatedPost.title = translatedTitle
      console.log('Translated title:', translatedTitle)
    }

    if (typeof post.description === 'string' && post.description.trim()) {
      console.log('Translating description:', post.description)
      translatedPost.description = await translateText(post.description, sourceLang, targetLang)
    }

    if (typeof post.summary === 'string' && post.summary.trim()) {
      console.log('Translating summary:', post.summary)
      translatedPost.summary = await translateText(post.summary, sourceLang, targetLang)
    }

    if (Array.isArray(post.tags)) {
      console.log('Translating tags:', post.tags)
      const validTags = post.tags.filter(tag => typeof tag === 'string' && tag.trim())
      translatedPost.tags = await Promise.all(
        validTags.map(tag => translateText(tag, sourceLang, targetLang))
      )
    }

    if (Array.isArray(post.category)) {
      console.log('Translating categories:', post.category)
      const validCategories = post.category.filter(cat => typeof cat === 'string' && cat.trim())
      translatedPost.category = await Promise.all(
        validCategories.map(cat => translateText(cat, sourceLang, targetLang))
      )
    }

    // Notion 블록 번역
    if (post.recordMap?.block) {
      console.log('Starting blocks translation...')
      const translatedBlocks = await Promise.all(
        Object.entries(post.recordMap.block).map(async ([key, block]) => {
          try {
            const translatedBlock = await translateBlock(block, sourceLang, targetLang)
            return [key, translatedBlock]
          } catch (error) {
            console.error(`Block translation error for key ${key}:`, error)
            return [key, JSON.parse(JSON.stringify(block))]
          }
        })
      )

      translatedPost.recordMap = {
        ...post.recordMap,
        block: Object.fromEntries(translatedBlocks)
      }
      console.log('Blocks translation completed')
    }

    console.log('Translation completed successfully')
    return translatedPost
  } catch (error) {
    console.error('Post translation error:', error)
    return translatedPost
  }
} 