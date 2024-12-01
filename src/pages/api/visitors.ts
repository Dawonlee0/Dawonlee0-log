import { NextApiRequest, NextApiResponse } from 'next'

const SA_API_KEY = process.env.SIMPLE_ANALYTICS_API_KEY
const WEBSITE = process.env.NEXT_PUBLIC_SITE_URL || ''

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    // Simple Analytics API 호출
    const [totalStats, todayStats, yesterdayStats] = await Promise.all([
      fetch(`https://api.simpleanalytics.com/v1/${WEBSITE}/stats?version=5&fields=pageviews&start=2020-01-01&end=${today}`, {
        headers: { 'Api-Key': SA_API_KEY || '' }
      }).then(res => res.json()),
      fetch(`https://api.simpleanalytics.com/v1/${WEBSITE}/stats?version=5&fields=pageviews&start=${today}&end=${today}`, {
        headers: { 'Api-Key': SA_API_KEY || '' }
      }).then(res => res.json()),
      fetch(`https://api.simpleanalytics.com/v1/${WEBSITE}/stats?version=5&fields=pageviews&start=${yesterday}&end=${yesterday}`, {
        headers: { 'Api-Key': SA_API_KEY || '' }
      }).then(res => res.json())
    ])

    res.status(200).json({
      totalVisits: totalStats.pageviews || 0,
      todayVisits: todayStats.pageviews || 0,
      yesterdayVisits: yesterdayStats.pageviews || 0
    })
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    res.status(500).json({ error: 'Failed to fetch analytics data' })
  }
} 