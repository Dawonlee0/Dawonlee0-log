import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const VisitorCounter: React.FC = () => {
  const [counts, setCounts] = useState({
    total: '0',
    today: '0'
  })

  useEffect(() => {
    const updateCounts = () => {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = 'https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdawonlee0-log.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false'
      document.body.appendChild(iframe)

      fetch('https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdawonlee0-log.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false', {
        method: 'GET',
        headers: {
          'Accept': 'image/svg+xml'
        }
      })
      .then(response => response.text())
      .then(text => {
        // SVG 텍스트에서 숫자 추출
        const match = text.match(/fill="#fff">[^>]*?(\d+)\s*\/\s*(\d+)\s*<\/text>/)
        if (match) {
          setCounts({
            total: match[1],
            today: match[2]
          })
        }
      })
      .catch(error => {
        console.error('Failed to fetch hits:', error)
      })
    }

    updateCounts()
    const interval = setInterval(updateCounts, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <StyledWrapper>
      <div className="counter-text">
        {parseInt(counts.total).toLocaleString()} / {parseInt(counts.today).toLocaleString()}
      </div>
      <img 
        src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdawonlee0-log.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"
        alt="hits"
        style={{ display: 'none' }}
      />
    </StyledWrapper>
  )
}

export default VisitorCounter

const StyledWrapper = styled.div`
  .counter-text {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray11};
    opacity: 0.6;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    backdrop-filter: blur(4px);
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
` 