import React from 'react'
import styled from '@emotion/styled'
import useLanguage from 'src/hooks/useLanguage'
import { useCallback } from 'react'

const LanguageToggleComponent: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  const handleKoreanClick = useCallback(() => {
    setLanguage('ko')
  }, [setLanguage])

  const handleEnglishClick = useCallback(() => {
    setLanguage('en')
  }, [setLanguage])

  return (
    <StyledWrapper>
      <button
        type="button"
        className={language === 'ko' ? 'active' : ''}
        onClick={handleKoreanClick}
        aria-label="한국어"
      >
        <span className="flag">🇰🇷</span>
      </button>
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        onClick={handleEnglishClick}
        aria-label="English"
      >
        <span className="flag">🇺🇸</span>
      </button>
    </StyledWrapper>
  )
}

const LanguageToggle = React.memo(LanguageToggleComponent)

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
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.6;
    -webkit-tap-highlight-color: transparent;
    
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
      user-select: none;
    }
  }
`

export default LanguageToggle 