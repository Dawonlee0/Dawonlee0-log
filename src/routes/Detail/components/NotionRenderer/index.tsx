import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
  .notion-list {
    width: 100%;
  }

  /* 코드 블록 스타일 */
  .notion-code {
    position: relative !important;
    background: ${({ theme }) => 
      theme.scheme === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)"} !important;
    border: 1px solid ${({ theme }) => 
      theme.scheme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"} !important;
    border-radius: 0.5rem !important;
  }

  .notion-code > code {
    &::before {
      content: attr(class) !important;
      position: absolute !important;
      top: 0 !important;
      right: 0 !important;
      padding: 0.25rem 0.75rem !important;
      font-size: 0.75rem !important;
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important;
      color: ${({ theme }) => 
        theme.scheme === "dark"
          ? theme.colors.gray9
          : theme.colors.gray9} !important;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)"} !important;
      border-bottom-left-radius: 0.5rem !important;
      text-transform: uppercase !important;
    }
  }

  /* 코드 블록 내부 스타일 */
  .notion-code > code {
    color: ${({ theme }) => 
      theme.scheme === "dark"
        ? theme.colors.gray12
        : theme.colors.gray12} !important;
    background: transparent !important;
    padding: 1.25rem !important;
  }

  /* 제목 스타일 개선 */
  .notion-h1 {
    font-size: 2rem !important;
    font-weight: 700 !important;
    margin: 3.5rem 0 2rem !important;
    color: ${({ theme }) => theme.colors.gray12} !important;
    line-height: 1.3 !important;
    padding-bottom: 0.5rem !important;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray6} !important;
    transition: all 0.2s ease !important;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.gray8} !important;
    }
  }

  .notion-h2 {
    font-size: 1.5rem !important;
    font-weight: 600 !important;
    margin: 2.5rem 0 1.5rem !important;
    color: ${({ theme }) => theme.colors.gray12} !important;
    line-height: 1.4 !important;
    padding-left: 1rem !important;
    border-left: 3px solid ${({ theme }) => theme.colors.gray6} !important;
    transition: all 0.2s ease !important;

    &:hover {
      border-left-color: ${({ theme }) => theme.colors.gray8} !important;
      padding-left: 1.5rem !important;
    }
  }

  .notion-h3 {
    font-size: 1.2rem !important;
    font-weight: 500 !important;
    margin: 2rem 0 1rem !important;
    color: ${({ theme }) => theme.colors.gray11} !important;
    line-height: 1.5 !important;
    transition: all 0.2s ease !important;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12} !important;
      padding-left: 0.5rem !important;
    }
  }

  /* 모바일 대응 */
  @media (max-width: 768px) {
    .notion-h1 {
      font-size: 1.75rem !important;
      margin: 3rem 0 1.5rem !important;
    }

    .notion-h2 {
      font-size: 1.375rem !important;
      margin: 2.5rem 0 1.25rem !important;
      padding-left: 0.875rem !important;
    }

    .notion-h3 {
      font-size: 1.125rem !important;
      margin: 2rem 0 1rem !important;
    }
  }
`
