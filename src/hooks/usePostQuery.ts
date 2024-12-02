import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const usePostQuery = () => {
  const router = useRouter()
  const { slug } = router.query

  const { data } = useQuery<TPost>({
    queryKey: [queryKey.POST, slug],
    enabled: !!slug,
  })

  return data
}

export default usePostQuery
