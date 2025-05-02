import type { NextApiRequest, NextApiResponse } from 'next'

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

    // 전체 사이트 재검증
    await res.revalidate('/')
    
    // 특정 페이지 재검증 (필요한 경우)
    const { path } = req.body
    if (path) {
      await res.revalidate(path)
    }

    return res.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    // 에러가 발생하면 에러 메시지와 함께 500 응답
    return res.status(500).send('Error revalidating')
  }
}
