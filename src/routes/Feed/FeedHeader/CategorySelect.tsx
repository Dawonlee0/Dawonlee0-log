import useDropdown from "src/hooks/useDropdown"
import { useRouter } from "next/router"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import { DEFAULT_CATEGORY } from "src/constants"
import styled from "@emotion/styled"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"
import Category from "src/components/Category"
import { Emoji } from "src/components/Emoji"

const CategorySelect: React.FC = () => {
  const router = useRouter()
  const data = useCategoriesQuery()
  const [dropdownRef, opened, handleOpen] = useDropdown()

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }

  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        <div className="current-category">
          {currentCategory} Posts <MdExpandMore />
        </div>
      </div>
      {opened && (
        <div className="content">
          {Object.keys(data).map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(key)}
            >
              {`${key} (${data[key]})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled.div`
  position: relative;
  
  .wrapper {
    .current-category {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0;
      padding: 0.5rem;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: 600;
      
      .category-text {
        margin-top: 2px;
      }
      
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .content {
    position: absolute;
    z-index: 40;
    min-width: 220px;
    padding: 0.5rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      
      .category-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
      }
      
      .count {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray10};
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }
    }
  }
`
