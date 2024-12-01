import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const VisitorCounter: React.FC = () => {
  const [counts, setCounts] = useState({
    total: 0,
    today: 0,
    yesterday: 0
  })

  useEffect(() => {
    const initVisitorCount = () => {
      const today = new Date().toDateString()
      const storedData = localStorage.getItem('visitorData')
      let data = storedData ? JSON.parse(storedData) : {
        total: 0,
        today: 0,
        yesterday: 0,
        lastVisit: ''
      }

      // 날짜가 바뀌었는지 확인
      if (data.lastVisit !== today) {
        // 어제 데이터 업데이트
        data.yesterday = data.today
        data.today = 1
        data.total += 1
        data.lastVisit = today
      } else if (!sessionStorage.getItem('visited')) {
        // 같은 날이지만 새로운 세션인 경우
        data.today += 1
        data.total += 1
      }

      // 현재 세션 방문 표시
      sessionStorage.setItem('visited', 'true')
      localStorage.setItem('visitorData', JSON.stringify(data))
      setCounts({
        total: data.total,
        today: data.today,
        yesterday: data.yesterday
      })
    }

    initVisitorCount()
  }, [])

  return (
    <StyledWrapper>
      <div className="counter">
        <div className="item">
          <div className="number">{counts.total.toLocaleString()}</div>
          <div className="label">Total</div>
        </div>
        <div className="item">
          <div className="number">{counts.today.toLocaleString()}</div>
          <div className="label">Today</div>
        </div>
        <div className="item">
          <div className="number">{counts.yesterday.toLocaleString()}</div>
          <div className="label">Yester</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default VisitorCounter

const StyledWrapper = styled.div`
  .counter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    padding: 1.25rem 1rem;
    background: ${({ theme }) => theme.colors.gray3};
    border-radius: 12px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 70%;
      background: ${({ theme }) => theme.colors.gray6};
    }
  }

  .number {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray12};
    letter-spacing: -0.02em;
  }

  .label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray10};
    letter-spacing: 0.02em;
  }
` 