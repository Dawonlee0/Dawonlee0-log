import { useState, useEffect } from 'react'
import { getCookie, setCookie } from 'cookies-next'

export type Language = 'ko' | 'en'

function useLanguage() {
  const [language, setLanguageState] = useState<Language>('ko')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      // 저장된 언어 설정 가져오기
      const savedLang = getCookie('preferred-language') as Language
      console.log('Initial saved language:', savedLang)
      
      if (!savedLang) {
        // 브라우저의 선호 언어 가져오기
        const browserLang = window.navigator.language.toLowerCase()
        const defaultLang = browserLang.startsWith('ko') ? 'ko' : 'en'
        console.log('Setting default language:', defaultLang)
        setLanguageState(defaultLang)
        setCookie('preferred-language', defaultLang, { path: '/' })
      } else {
        console.log('Using saved language:', savedLang)
        setLanguageState(savedLang)
      }
    } catch (error) {
      console.error('Language detection error:', error)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    if (!isClient) {
      console.log('Not in client, skipping language change')
      return
    }
    
    console.log('Setting language to:', lang)
    try {
      setLanguageState(lang)
      setCookie('preferred-language', lang, {
        path: '/',
        maxAge: 365 * 24 * 60 * 60, // 1년
        sameSite: 'strict'
      })
      console.log('Language set successfully:', lang)
      
      // 페이지 새로고침 없이 상태 업데이트를 위해 이벤트 발생
      window.dispatchEvent(new Event('languagechange'))
    } catch (error) {
      console.error('Error setting language:', error)
    }
  }

  // 언어 변경 이벤트 리스너
  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLang = getCookie('preferred-language') as Language
      console.log('Language change detected:', currentLang)
      setLanguageState(currentLang || 'ko')
    }

    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [])

  return { language, setLanguage }
}

export function getPreferredLanguage(): Language {
  try {
    if (typeof window === 'undefined') return 'ko'
    const savedLang = getCookie('preferred-language')
    console.log('Getting preferred language:', savedLang)
    if (!savedLang) {
      const browserLang = window.navigator.language.toLowerCase()
      const defaultLang = browserLang.startsWith('ko') ? 'ko' : 'en'
      console.log('No saved language, using browser language:', defaultLang)
      return defaultLang
    }
    return (savedLang as Language) || 'ko'
  } catch (error) {
    console.error('Language detection error:', error)
    return 'ko'
  }
}

export default useLanguage 