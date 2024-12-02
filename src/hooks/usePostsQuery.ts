import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const usePostsQuery = () => {
  const { data } = useQuery<TPost[]>({
    queryKey: [queryKey.POSTS],
    initialData: [],
  })

  if (!data) throw new Error("Posts data is not found")

  return data
}

export default usePostsQuery
