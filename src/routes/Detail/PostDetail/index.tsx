import React, { useEffect, useState } from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  const [headings, setHeadings] = useState<{id: string, text: string, level: number}[]>([])

  useEffect(() => {
    // DOM이 완전히 로드된 후에 실행
    const setupHeadings = () => {
      const elements = document.querySelectorAll('h2, h3, h4')
      const headingsList = Array.from(elements).map((el, index) => {
        // 기존 ID가 없으면 새로운 ID 생성
        if (!el.id) {
          el.id = `heading-${index}`
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: parseInt(el.tagName[1])
        }
      })
      setHeadings(headingsList)
    }

    // 약간의 지연을 주어 Notion 컨텐츠가 완전히 렌더링된 후 실행
    setTimeout(setupHeadings, 1000)
  }, [data])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = element.offsetTop - 100 // 여유 공간 추가
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      })
    }
  }

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category.name}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
      {headings.length > 0 && (
        <TableOfContents>
          <div className="toc-header">Contents</div>
          <nav>
            {headings.map((heading) => (
              <button
                key={heading.id}
                className={`toc-item level-${heading.level}`}
                onClick={() => scrollToHeading(heading.id)}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </TableOfContents>
      )}
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  position: relative;
  
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`

const TableOfContents = styled.aside`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 10;
  min-width: 240px;
  padding: 0.5rem 1rem;
  
  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray8};
    border-radius: 3px;
  }
  
  .toc-header {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: ${({ theme }) => theme.colors.gray12};
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray8};
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 1280px) {
    display: none;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .toc-item {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.95rem;
    line-height: 1.5;
    transition: all 0.2s;
    opacity: 0.85;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    position: relative;
    letter-spacing: -0.01em;

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.gray12};
    }

    &.level-2 {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    &.level-3 {
      padding-left: 1.125rem;
      font-size: 0.9rem;
      font-weight: 400;
      margin-bottom: 0.375rem;
      
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 6px;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.gray9};
      }
    }

    &.level-4 {
      padding-left: 2.25rem;
      font-size: 0.85rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.gray10};
      
      &::before {
        content: "";
        position: absolute;
        left: 1.125rem;
        top: 50%;
        width: 4px;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.gray8};
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`
