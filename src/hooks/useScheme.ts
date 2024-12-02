import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next"
import { useEffect } from "react"
import { CONFIG } from "site.config"
import { queryKey } from "src/constants/queryKey"
import { SchemeType } from "src/types"

type SetScheme = (scheme: SchemeType) => void

const useScheme = (): [SchemeType, SetScheme] => {
  const queryClient = useQueryClient()
  const followsSystemTheme = CONFIG.blog.scheme === "system"

  const { data } = useQuery<SchemeType>({
    queryKey: [queryKey.SCHEME],
    enabled: false,
    initialData: followsSystemTheme
      ? "dark"
      : (CONFIG.blog.scheme as SchemeType),
  })

  const setScheme = (scheme: SchemeType) => {
    setCookie("scheme", scheme)
    queryClient.setQueryData([queryKey.SCHEME], scheme)
  }

  useEffect(() => {
    if (!window) return

    const cachedScheme = getCookie("scheme") as SchemeType
    const defaultScheme = followsSystemTheme
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : data
    setScheme(cachedScheme || defaultScheme)
  }, [data, followsSystemTheme])

  return [data, setScheme]
}

export default useScheme
