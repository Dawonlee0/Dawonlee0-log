import { useRouter } from "next/router"
import React from "react"
import { COLOR_SET, CATEGORY_COLOR_MAP } from "./constants"
import styled from "@emotion/styled"
import { colors } from "src/styles"

type Props = {
  children: string
  readOnly?: boolean
}

export const getColorClassByName = (name: string): string => {
  if (!name) return COLOR_SET["0"]
  
  // 부분 문자열 매칭으로 카테고리 찾기
  const matchedCategory = Object.keys(CATEGORY_COLOR_MAP).find(key => 
    name.includes(key) || key.includes(name)
  )
  
  return matchedCategory ? CATEGORY_COLOR_MAP[matchedCategory] : COLOR_SET["0"]
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
        backgroundColor: getColorClassByName(children),
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
  color: ${colors.dark.gray1};
`
