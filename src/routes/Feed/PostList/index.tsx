import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import { filterPosts } from "./filterPosts"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>([])

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    if (!data) return

    console.log("Original Posts:", data)
    
    const filtered = filterPosts({
      posts: data,
      q,
      tag: currentTag,
      category: currentCategory,
      order: currentOrder
    })

    console.log("Filtered Posts:", filtered)
    
    setFilteredPosts(filtered)
  }, [data, q, currentTag, currentCategory, currentOrder])

  return (
    <>
      <div className="my-2">
        {filteredPosts.map((post) => {
          console.log("Post being rendered:", post)
          return (
            <PostCard 
              key={post.id} 
              data={post}
            />
          )
        })}
      </div>
    </>
  )
}

export default PostList
