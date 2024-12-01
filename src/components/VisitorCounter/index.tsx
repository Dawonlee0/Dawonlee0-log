import React from 'react'
import styled from '@emotion/styled'

const VisitorCounter: React.FC = () => {
  return (
    <StyledWrapper>
      <img 
        src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdawonlee0-log.vercel.app&count_bg=%23FFFFFF00&title_bg=%23FFFFFF00&title=+&icon=&icon_color=%23FFFFFF00&edge_flat=false&count_color=ffffff"
        alt=""
        height="20"
        style={{ background: 'transparent' }}
      />
    </StyledWrapper>
  )
}

export default VisitorCounter

const StyledWrapper = styled.div`
  img {
    opacity: 0.7;
    transition: opacity 0.2s ease;
    background: transparent !important;
    filter: ${({ theme }) => theme.scheme === 'light' ? 'invert(1)' : 'none'};
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    pointer-events: none;

    &:hover {
      opacity: 1;
    }
  }
` 