import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const usePostsQuery = () => {
  const { data } = useQuery({
    queryKey: queryKey.posts(),
    // 클라이언트에서는 서버에서 미리 가져온 데이터만 사용
    queryFn: async () => {
      return [] as TPost[]
    },
    initialData: [] as TPost[],
    enabled: true,
    staleTime: 1000 * 60, // 1분
    cacheTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false, // 클라이언트에서 재요청하지 않음
    refetchOnWindowFocus: false, // 윈도우 포커스시 재요청하지 않음
  })

  return data
}

export default usePostsQuery
