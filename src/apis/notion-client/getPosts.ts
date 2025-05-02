import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  // 클라이언트 사이드에서 실행되는 것을 방지
  if (typeof window !== 'undefined') {
    throw new Error('getPosts can only be called from server-side')
  }

  let id = CONFIG.notionConfig.pageId as string
  const api = new NotionAPI()

  try {
    const response = await api.getPage(id)
    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id].value

    // Check Type
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      return []
    } else {
      // Construct Data
      const pageIds = getAllPageIds(response)
      const data = []
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties = (await getPageProperties(id, block, schema)) || null
        
        if (properties) {
          // Add fullwidth, createdtime to properties
          properties.createdTime = new Date(
            block[id].value?.created_time
          ).toString()
          properties.fullWidth =
            (block[id].value?.format as any)?.page_full_width ?? false

          // 디버깅: 각 포스트의 태그 데이터 출력
          console.log(`Post ${i + 1}:`, {
            title: properties.title,
            tags: properties.tags,
            rawTags: properties.Tags // 노션 API의 원본 태그 데이터
          })

          data.push(properties)
        }
      }

      // Sort by date
      data.sort((a: any, b: any) => {
        const dateA: any = new Date(a?.date?.start_date || a.createdTime)
        const dateB: any = new Date(b?.date?.start_date || b.createdTime)
        return dateB - dateA
      })

      const posts = data as TPosts
      return posts
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}
