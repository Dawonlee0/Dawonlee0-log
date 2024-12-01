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
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  .tag {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray11};
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
