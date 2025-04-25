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

  const category = data.category?.[0]

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
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
  position: relative;
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
  
  > article {
    margin: 0 auto;
    max-width: 42rem;
  }
`

const TableOfContents = styled.aside`
  display: none;
  
  @media (min-width: 1440px) {
    display: block;
    position: fixed;
    top: 7rem;
    right: calc((100vw - 56rem) / 2 - 16rem);
    width: 14rem;
    height: auto;
    z-index: 10;
  }

  .toc-header {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.gray12};
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray8};
    letter-spacing: -0.02em;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .toc-item {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.875rem;
    line-height: 1.4;
    transition: all 0.2s;
    opacity: 0.85;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    position: relative;
    letter-spacing: -0.01em;
    word-break: keep-all;
    overflow-wrap: break-word;

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.gray12};
    }

    &.level-2 {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    &.level-3 {
      padding-left: 1rem;
      font-size: 0.8125rem;
      font-weight: 400;
      margin-bottom: 0.125rem;
      
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 5px;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.gray9};
      }
    }

    &.level-4 {
      padding-left: 1.75rem;
      font-size: 0.8125rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.gray10};
      
      &::before {
        content: "";
        position: absolute;
        left: 1rem;
        top: 0.7em;
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
