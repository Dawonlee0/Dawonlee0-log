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
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray6};
    border-radius: 2px;
  }

  span.tag {
    display: inline-block;
    white-space: nowrap;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray11};
    transition: color 0.2s;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
