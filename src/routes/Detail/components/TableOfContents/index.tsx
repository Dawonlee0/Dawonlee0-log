import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"

type Heading = {
  id: string
  text: string
  level: number
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // h1, h2, h3 태그를 가진 요소들을 찾습니다
    const elements = Array.from(document.querySelectorAll("h1, h2, h3")).filter(
      (element) => element.id && element.textContent
    )
    
    const headingElements = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1))
    }))
    
    setHeadings(headingElements)

    // Intersection Observer를 설정합니다
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <StyledWrapper>
      <nav>
        <h2>목차</h2>
        <ul>
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={activeId === heading.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth"
                  })
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </StyledWrapper>
  )
}

export default TableOfContents

const StyledWrapper = styled.div`
  position: fixed;
  top: 120px;
  right: 40px;
  width: 240px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  
  nav {
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => 
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h2 {
      margin-bottom: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray12};
    }

    ul {
      li {
        margin: 0.5rem 0;
        font-size: 0.875rem;
        
        a {
          display: block;
          padding: 0.25rem 0;
          color: ${({ theme }) => theme.colors.gray11};
          text-decoration: none;
          transition: all 0.2s;
          
          &:hover {
            color: ${({ theme }) => theme.colors.gray12};
          }
          
          &.active {
            color: ${({ theme }) => theme.colors.gray12};
            font-weight: 500;
          }
        }
      }
    }
  }

  @media (max-width: 1400px) {
    display: none;
  }

  /* 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.gray6} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray6};
    border-radius: 3px;
  }
` 