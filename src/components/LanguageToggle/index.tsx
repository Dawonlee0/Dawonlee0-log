import React from 'react'
import styled from '@emotion/styled'
import useLanguage from 'src/hooks/useLanguage'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LanguageToggleComponent = () => {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <StyledWrapper aria-hidden="true">
        <div className="placeholder" />
      </StyledWrapper>
    )
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  padding-right: 1rem;
  min-width: 76px;
  height: 28px;
  justify-content: flex-end;

  .placeholder {
    width: 76px;
    height: 28px;
    opacity: 0;
  }

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

// dynamic import를 사용하여 클라이언트 사이드에서만 렌더링
export default dynamic(() => Promise.resolve(LanguageToggleComponent), {
  ssr: false,
  loading: () => (
    <StyledWrapper aria-hidden="true">
      <div className="placeholder" />
    </StyledWrapper>
  ),
}) 