import React from 'react'
import styled from '@emotion/styled'
import useLanguage from 'src/hooks/useLanguage'
import dynamic from 'next/dynamic'

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <StyledWrapper>
      <button
        className={language === 'ko' ? 'active' : ''}
        onClick={() => setLanguage('ko')}
        aria-label="한국어"
      >
        <span className="flag">🇰🇷</span>
      </button>
      <button
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
        aria-label="English"
      >
        <span className="flag">🇺🇸</span>
      </button>
    </StyledWrapper>
  )
}

export default dynamic(() => Promise.resolve(LanguageToggle), {
  ssr: false
})

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  padding-right: 1rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border-radius: 50%;
    transition: all 0.2s ease;
    opacity: 0.6;
    
    &:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }
    
    &.active {
      opacity: 1;
      transform: scale(1.1);
    }

    .flag {
      font-size: 1.2rem;
      line-height: 1;
    }
  }
` 