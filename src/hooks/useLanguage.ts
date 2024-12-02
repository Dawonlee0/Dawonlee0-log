import { useState, useEffect } from 'react'
import { getCookie, setCookie } from 'cookies-next'

export type Language = 'ko' | 'en'

// 전역 상태 관리를 위한 이벤트 이미터
const languageChangeEmitter = {
  listeners: new Set<(lang: Language) => void>(),
  emit(lang: Language) {
    this.listeners.forEach(listener => listener(lang))
  },
  subscribe(listener: (lang: Language) => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
      return true
    }
  }
}

function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = getCookie('preferred-language') as Language
      return savedLang || 'ko'
    } catch {
      return 'ko'
    }
  })

  useEffect(() => {
    // 언어 변경 구독
    const unsubscribe = languageChangeEmitter.subscribe((newLang) => {
      console.log('[useLanguage] Language change subscription triggered:', newLang)
      setLanguageState(newLang)
    })

    // cleanup 함수에서 void 반환
    return () => {
      unsubscribe()
    }
  }, [])

  const setLanguage = (newLang: Language) => {
    console.log('[useLanguage] Changing language to:', newLang)
    try {
      // 쿠키 설정
      setCookie('preferred-language', newLang, {
        path: '/',
        maxAge: 365 * 24 * 60 * 60, // 1년
        sameSite: 'lax'
      })

      // 전역 상태 업데이트
      languageChangeEmitter.emit(newLang)
      
      // 상태 업데이트
      setLanguageState(newLang)
      
      console.log('[useLanguage] Language changed successfully to:', newLang)
      
      // 페이지 새로고침 없이 상태 업데이트를 위해 이벤트 발생
      window.dispatchEvent(new CustomEvent('languageChange', { 
        detail: { language: newLang } 
      }))
    } catch (error) {
      console.error('[useLanguage] Error changing language:', error)
    }
  }

  return { language, setLanguage }
}

export function getPreferredLanguage(): Language {
  try {
    if (typeof window === 'undefined') return 'ko'
    const savedLang = getCookie('preferred-language')
    console.log('[useLanguage] Getting preferred language:', savedLang)
    return (savedLang as Language) || 'ko'
  } catch (error) {
    console.error('[useLanguage] Error getting preferred language:', error)
    return 'ko'
  }
}

export default useLanguage 