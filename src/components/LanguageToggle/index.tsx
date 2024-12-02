import React from 'react'
import styled from '@emotion/styled'
import useLanguage from 'src/hooks/useLanguage'
import { useEffect, useState } from 'react'

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 서버 사이드에서는 아무것도 렌더링하지 않음
  if (!isClient) {
    return null
  }

  return (
    <StyledWrapper>
      <button
        type="button"
        className={language === 'ko' ? 'active' : ''}
        onClick={() => setLanguage('ko')}
        aria-label="한국어"
      >
        <span className="flag">🇰🇷</span>
      </button>
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
        aria-label="English"
      >
        <span className="flag">🇺🇸</span>
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    &.active {
      background: #fff;
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .flag {
      font-size: 1.2rem;
      line-height: 1;
    }
  }
`

export default LanguageToggle 