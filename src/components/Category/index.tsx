import { useRouter } from "next/router"
import React from "react"
import styled from "@emotion/styled"
import { colors } from "src/styles"

// HSL 색상을 사용하여 카테고리별 고유 색상 생성
const generatePastelColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // HSL 색상 생성
  // Hue: 0-360 (색상), 
  // Saturation: 65-85% (파스텔톤을 위해), 
  // Lightness: 80-90% (밝은 톤 유지)
  const h = hash % 360
  const s = 65 + (hash % 20) // 65-85% 사이의 채도
  const l = 80 + (hash % 10) // 80-90% 사이의 밝기

  return `hsl(${h}, ${s}%, ${l}%)`
}

type Props = {
  children: string
  readOnly?: boolean
}

const Category: React.FC<Props> = ({ readOnly = false, children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    if (readOnly) return
    router.push(`/?category=${value}`)
  }

  return (
    <StyledWrapper
      onClick={() => handleClick(children)}
      css={{
        backgroundColor: generatePastelColor(children),
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
  color: ${({ theme }) => theme.colors.gray12};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`
