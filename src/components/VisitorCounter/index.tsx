import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const VisitorCounter: React.FC = () => {
  const [totalVisits, setTotalVisits] = useState(0)
  const [todayVisits, setTodayVisits] = useState(0)

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors')
        const data = await response.json()
        setTotalVisits(data.totalVisits)
        setTodayVisits(data.todayVisits)
      } catch (error) {
        console.error('Failed to fetch visitor count:', error)
      }
    }

    const updateVisitorCount = async () => {
      if (!sessionStorage.getItem('visited')) {
        try {
          await fetch('/api/visitors', { method: 'POST' })
          sessionStorage.setItem('visited', 'true')
          fetchVisitorCount()
        } catch (error) {
          console.error('Failed to update visitor count:', error)
        }
      }
    }

    fetchVisitorCount()
    updateVisitorCount()
  }, [])

  return (
    <StyledWrapper>
      <div className="counter">
        <div className="item">
          <span className="label">누적 방문자</span>
          <span className="value">{totalVisits.toLocaleString()}</span>
        </div>
        <div className="divider">|</div>
        <div className="item">
          <span className="label">오늘 방문자</span>
          <span className="value">{todayVisits.toLocaleString()}</span>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default VisitorCounter

const StyledWrapper = styled.div\`
  .counter {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.875rem;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .label {
    color: ${({ theme }) => theme.colors.gray10};
  }

  .value {
    font-weight: 500;
  }

  .divider {
    color: ${({ theme }) => theme.colors.gray6};
  }
\` 