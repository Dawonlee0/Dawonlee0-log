import { useRouter } from "next/router"
import React, { useMemo } from "react"
import styled from "@emotion/styled"

// 미리 정의된 파스텔톤 색상 세트
const PASTEL_COLORS = [
  "hsl(190, 90%, 85%)",  // 하늘색
  "hsl(350, 90%, 85%)",  // 분홍색
  "hsl(280, 90%, 85%)",  // 보라색
  "hsl(220, 90%, 85%)",  // 파란색
  "hsl(160, 90%, 85%)",  // 민트색
  "hsl(120, 90%, 85%)",  // 연두색
  "hsl(45, 90%, 85%)",   // 노란색
  "hsl(20, 90%, 85%)",   // 주황색
]

const generateCategoryColor = (input: unknown): string => {
  const defaultColor = "hsl(0, 0%, 90%)"
  
  if (!input || typeof input !== 'string') {
    return defaultColor
  }

  try {
    const str = String(input).trim()
    if (!str) return defaultColor

    // 문자열의 해시값을 색상 배열의 인덱스로 사용
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    // 색상 배열의 길이로 나눈 나머지를 사용하여 색상 선택
    const colorIndex = Math.abs(hash) % PASTEL_COLORS.length
    return PASTEL_COLORS[colorIndex]
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
