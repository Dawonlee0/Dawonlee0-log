import { useRouter } from "next/router"
import React, { useMemo } from "react"
import styled from "@emotion/styled"
import { PASTEL_COLORS } from './constants'

// 수정: 색상 생성 함수를 캐시로 관리
const colorCache: { [key: string]: string } = {}

const generateCategoryColor = (input: unknown): string => {
  const defaultColor = "hsl(0, 0%, 90%)"
  
  if (!input || typeof input !== 'string') {
    return defaultColor
  }

  const str = String(input).trim()
  if (!str) return defaultColor

  // 캐시된 색상이 있으면 반환
  if (colorCache[str]) {
    return colorCache[str]
  }

  try {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const colorIndex = Math.abs(hash) % PASTEL_COLORS.length
    const color = PASTEL_COLORS[colorIndex]
    
    // 새로운 색상을 캐시에 저장
    colorCache[str] = color
    return color
  } catch {
    return defaultColor
  }
}

type Props = {
  children: string
  readOnly?: boolean
}

const Category: React.FC<Props> = ({ readOnly = false, children }) => {
  const router = useRouter()
  
  const backgroundColor = useMemo(() => {
    return generateCategoryColor(children)
  }, [children])

  const handleClick = (value: string) => {
    if (readOnly) return
    router.push(`/?category=${value}`)
  }

  return (
    <StyledWrapper
      onClick={() => handleClick(children)}
      style={{
        backgroundColor,
        cursor: readOnly ? "default" : "pointer",
      }}
    >
      {children}
    </StyledWrapper>
  )
}

export default Category

const StyledWrapper = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 9999px;
  width: fit-content;
  font-size: 0.875rem;
  line-height: 1.25rem;
  opacity: 0.9;
  color: ${({ theme }) => theme.scheme === 'dark' ? theme.colors.gray1 : theme.colors.gray12};
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`
