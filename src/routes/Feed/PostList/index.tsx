import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [filteredPosts, setFilteredPosts] = useState(data)

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = [...data]
      
      console.log("Original Posts Data:", newFilteredPosts)

      // keyword
      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      console.log("Filtered Posts:", newFilteredPosts)

      return newFilteredPosts
    })
  }, [data, q, currentTag, currentCategory, currentOrder])

  return (
    <>
      <div className="my-2">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.id} 
            data={{
              ...post,
              tags: post.tags || []
            }} 
          />
        ))}
      </div>
    </>
  )
}

export default PostList
