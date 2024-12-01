import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

interface TocItem {
  id: string
  text: string
  level: number
}

const StyledWrapper = styled.div`
  .toc {
    position: fixed;
    top: 50%;
    right: 4rem;
    transform: translateY(-50%);
    width: 16rem;
    max-height: 80vh;
    overflow-y: auto;
    background-color: ${({ theme }) => 
      theme.scheme === "light" 
        ? "rgba(255, 255, 255, 0.8)" 
        : "rgba(38, 38, 38, 0.8)"};
    backdrop-filter: blur(8px);
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 100;
  }

  .title {
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.gray12};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.25rem 0;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.875rem;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }

    &.active {
      color: ${({ theme }) => theme.colors.gray12};
      font-weight: 500;
    }
  }

  .level-1 {
    padding-left: 0;
  }

  .level-2 {
    padding-left: 1rem;
  }

  .level-3 {
    padding-left: 2rem;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`

const TableOfContents: React.FC = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 제목 요소들 찾기
    const headings = document.querySelectorAll('.notion-h1, .notion-h2, .notion-h3')
    
    // TOC 아이템 생성
    const items: TocItem[] = Array.from(headings).map((heading, index) => {
      const id = `toc-${index}`
      heading.id = id
      
      let level = 1
      if (heading.classList.contains('notion-h2')) level = 2
      if (heading.classList.contains('notion-h3')) level = 3

      return {
        id,
        text: heading.textContent || '',
        level,
      }
    })

    setTocItems(items)

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const headingElements = Array.from(headings)
      
      // 현재 화면에 보이는 제목 찾기
      const found = headingElements.find((heading) => {
        const rect = heading.getBoundingClientRect()
        return rect.top > 0 && rect.top < window.innerHeight / 2
      })

      if (found) {
        setActiveId(found.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 초기 실행

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (tocItems.length === 0) return null

  return (
    <StyledWrapper>
      <nav className="toc">
        <div className="title">목차</div>
        <ul>
          {tocItems.map((item) => (
            <li
              key={item.id}
              className={`level-${item.level} ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </nav>
    </StyledWrapper>
  )
}

export default TableOfContents
 