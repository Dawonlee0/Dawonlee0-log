import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'src/styles'
import Link from 'next/link'

type CategoryItem = {
  name: string
  count: number
  subcategories?: {
    name: string
    count: number
  }[]
}

interface Props {
  categories: CategoryItem[]
}

export const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <StyledWrapper>
      <h2>📑 카테고리</h2>
      {categories.map((category, index) => (
        <div key={index} className="category-group">
          <Link href={`/?category=${category.name}`} className="category-main">
            <span className="name">{category.name}</span>
            <span className="count">({category.count})</span>
          </Link>
          {category.subcategories && (
            <div className="subcategories">
              {category.subcategories.map((sub, subIndex) => (
                <Link
                  href={`/?category=${sub.name}`}
                  key={subIndex}
                  className="category-sub"
                >
                  <span className="name">{sub.name}</span>
                  <span className="count">({sub.count})</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .category-group {
    margin-bottom: 0.5rem;
  }

  .category-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    font-weight: 500;
    color: ${colors.dark.gray1};
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover {
      background-color: ${colors.dark.gray3};
    }

    .count {
      font-size: 0.875rem;
      color: ${colors.dark.gray11};
    }
  }

  .subcategories {
    margin-left: 1rem;
    border-left: 1px solid ${colors.dark.gray3};
    margin-top: 0.25rem;
  }

  .category-sub {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 0.5rem;
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: ${colors.dark.gray1};
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover {
      background-color: ${colors.dark.gray3};
    }

    .count {
      font-size: 0.75rem;
      color: ${colors.dark.gray11};
    }
  }
`

export default CategoryList 