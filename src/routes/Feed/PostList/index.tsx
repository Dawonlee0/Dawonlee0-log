import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import filterPosts from "src/utils/filterPosts"

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
      return filterPosts({
        posts: data,
        q,
        tag: currentTag,
        category: currentCategory,
        order: currentOrder
      })
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
