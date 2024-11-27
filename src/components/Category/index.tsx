import { useRouter } from "next/router"
import React, { useMemo } from "react"
import styled from "@emotion/styled"

const generatePastelColor = (input: unknown): string => {
  const defaultColor = "hsl(0, 0%, 90%)"
  
  if (!input || typeof input !== 'string') {
    return defaultColor
  }

  try {
    const str = String(input).trim()
    if (!str) return defaultColor

    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const h = Math.abs(hash) % 360
    const s = 60
    const l = 75

    return `hsl(${h}, ${s}%, ${l}%)`
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
    return generatePastelColor(children)
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

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`
