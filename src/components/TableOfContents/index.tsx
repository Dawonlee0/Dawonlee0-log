import React from 'react'
import dynamic from 'next/dynamic'

// 클라이언트 사이드에서만 렌더링되는 컴포넌트
const TableOfContentsClient = dynamic(() => import('./TableOfContentsClient'), {
  ssr: false,
})

const TableOfContents: React.FC = () => {
  return <TableOfContentsClient />
}

export default TableOfContents
 