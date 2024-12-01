import React from "react"
import styled from "@emotion/styled"

interface Props {
  tags?: string[]
}

const TagList: React.FC<Props> = ({ tags = [] }) => {
  if (!tags.length) return null

  return (
    <StyledWrapper>
      {tags.map((tag) => (
        <span key={tag} className="tag">
          #{tag}
        </span>
      ))}
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  .tag {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray11};
    transition: color 0.2s;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
