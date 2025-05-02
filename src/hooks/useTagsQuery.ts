import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"
import { useEffect, useState } from "react"
import { TTags } from "src/types"

export const useTagsQuery = () => {
  const posts = usePostsQuery()
  const [tags, setTags] = useState<TTags>({})

  useEffect(() => {
    try {
      // 디버깅을 위한 로그 추가
      console.log('Posts received in useTagsQuery:', posts)
      
      if (!Array.isArray(posts)) {
        console.warn('Posts is not an array:', posts)
        setTags({})
        return
      }

      // 유효한 태그를 가진 포스트만 필터링
      const validPosts = posts.filter(post => {
        if (!post || !post.tags) return false
        return Array.isArray(post.tags) && post.tags.some(tag => tag && typeof tag === 'string')
      })

      console.log('Valid posts with tags:', validPosts)

      if (validPosts.length > 0) {
        const newTags = getAllSelectItemsFromPosts("tags", validPosts)
        console.log('Processed tags:', newTags)
        
        if (newTags && typeof newTags === 'object') {
          setTags(newTags)
        } else {
          console.warn('Invalid tags object:', newTags)
          setTags({})
        }
      } else {
        console.log('No valid posts with tags found')
        setTags({})
      }
    } catch (error) {
      console.error("Error in useTagsQuery:", error)
      setTags({})
    }
  }, [posts])

  return tags
}
