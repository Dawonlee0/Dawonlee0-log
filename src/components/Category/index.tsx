import { useRouter } from "next/router"
import React, { useMemo } from "react"
import styled from "@emotion/styled"
import { colors } from "src/styles"

const generatePastelColor = (str: string): string => {
  if (!str) return "hsl(0, 0%, 90%)"
  
  const hash = str.split("").reduce((acc, char) => {
    const chr = char.charCodeAt(0)
    return ((acc << 5) - acc) + chr | 0
  }, 0)

  const h = Math.abs(hash) % 360
  const s = 70
  const l = 85

  return `hsl(${h}, ${s}%, ${l}%)`
}

type Props = {
  children: string
  readOnly?: boolean
}

const Category: React.FC<Props> = ({ readOnly = false, children }) => {
  const router = useRouter()
  
  const backgroundColor = useMemo(() => 
    generatePastelColor(children), [children]
  )

  const handleClick = (value: string) => {
    if (readOnly) return
    router.push(`/?category=${value}`)
  }

  return (
    <StyledWrapper
      onClick={() => handleClick(children)}
      css={{
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
  color: ${({ theme }) => theme.colors.gray12};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`
