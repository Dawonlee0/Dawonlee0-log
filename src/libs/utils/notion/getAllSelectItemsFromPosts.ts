import { TPosts } from "src/types"

export function getAllSelectItemsFromPosts(
  key: "tags" | "category",
  posts: TPosts
) {
  // 유효한 posts만 필터링 (더 엄격한 검증 추가)
  const selectedPosts = posts.filter((post) => {
    if (!post || !post[key]) return false
    const value = post[key]
    // 배열이 아니거나 빈 배열이면 제외
    if (!Array.isArray(value) || value.length === 0) return false
    // 배열의 모든 요소가 유효한 문자열인지 확인
    return value.every(item => 
      typeof item === 'string' && item.trim().length > 0
    )
  })

  // 모든 태그를 평탄화하고 정규화
  const items = selectedPosts
    .map((p) => p[key])
    .flat()
    .filter((item): item is string => {
      return typeof item === 'string' && item.trim().length > 0
    })
    .map(item => item.trim()) // 태그 정규화 (대소문자 구분 유지)

  // 태그 카운트 계산 (중복 제거 및 정규화된 형태로 저장)
  const itemObj: { [itemName: string]: number } = {}
  items.forEach((item) => {
    const normalizedItem = item.trim()
    if (normalizedItem in itemObj) {
      itemObj[normalizedItem]++
    } else {
      itemObj[normalizedItem] = 1
    }
  })

  // 빈 태그나 무효한 태그 제거
  return Object.fromEntries(
    Object.entries(itemObj)
      .filter(([key]) => key.length > 0)
      .sort((a, b) => b[1] - a[1]) // 사용 빈도순으로 정렬
  )
}
