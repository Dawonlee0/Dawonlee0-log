import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from 'src/apis'

// for all path revalidate, https://<your-site.com>/api/revalidate?secret=<token>
// for specific path revalidate, https://<your-site.com>/api/revalidate?secret=<token>&path=<path>
// example, https://<your-site.com>/api/revalidate?secret=이것은_키&path=feed
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 요청 메서드 확인
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 토큰 검증 (보안을 위해)
    if (req.headers.authorization !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    // 메인 페이지 재검증
    await res.revalidate('/')
    
    // 모든 포스트 페이지 재검증
    const posts = await getPosts()
    const revalidatePromises = posts.map(post => {
      const paths = [
        `/${post.slug}`,  // 개별 포스트 페이지
      ]
      return Promise.all(paths.map(path => res.revalidate(path)))
    })

    // 병렬로 모든 페이지 재검증 실행
    await Promise.all(revalidatePromises.flat())

    // 추가 페이지 재검증 (필요한 경우)
    const { path } = req.body
    if (path) {
      await res.revalidate(path)
    }

    return res.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Successfully revalidated all pages'
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return res.status(500).json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    })
  }
}
