import { NextPage } from "next"
import { AppProps } from "next/app"
import { ExtendedRecordMap } from "notion-types"
import { ReactElement, ReactNode } from "react"

// TODO: refactor types
export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TPostStatus = 'Public' | 'Private' | 'PublicOnDetail'
export type TPostType = 'Post' | 'Paper' | 'Page'

export interface TPost {
  id: string
  date: { start_date: string }
  type: TPostType[]
  slug: string
  title: string
  description?: string
  summary?: string
  tags?: string[]
  category?: string
  status: TPostStatus[]
  createdTime: string
  fullWidth?: boolean
  thumbnail?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  recordMap: ExtendedRecordMap
}

// 이전 코드와의 호환성을 위해 PostDetail 타입을 TPost와 동일하게 설정
export type PostDetail = TPost

export type TPosts = TPost[]

export type TTags = {
  [tagName: string]: number
}
export type TCategories = {
  [category: string]: number
}

export type SchemeType = "light" | "dark"
