import { css } from '@emotion/react'

export const scrollbarStyle = css`
  /* 웹킷 기반 브라우저용 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray6};
    border-radius: 5px;
    border: 2px solid transparent;
    background-clip: padding-box;
    transition: background-color 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.gray8};
      border: 2px solid transparent;
      background-clip: padding-box;
    }
  }

  /* Firefox용 스크롤바 스타일 */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => `${theme.colors.gray6} transparent`};
  }

  /* 목차 스크롤바 특별 스타일 */
  .toc {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.gray6};
      border-radius: 3px;
      border: 1px solid transparent;
      background-clip: padding-box;

      &:hover {
        background: ${({ theme }) => theme.colors.gray8};
      }
    }
  }
` 