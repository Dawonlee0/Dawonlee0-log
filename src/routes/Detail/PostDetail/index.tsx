import React, { useEffect, useState } from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import TableOfContents from "src/components/TableOfContents"
import { translatePost } from "src/libs/utils/translate"
import useLanguage from "src/hooks/useLanguage"
import { TPost } from "src/types"
import { ExtendedRecordMap } from "notion-types"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const originalData = usePostQuery()
  const [data, setData] = useState<TPost | undefined>(originalData)
  const { language } = useLanguage()
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    const translateContent = async () => {
      if (!originalData) return
      
      console.log('Language changed to:', language)
      
      if (language === 'ko') {
        console.log('Setting Korean content')
        setData(JSON.parse(JSON.stringify(originalData)))
        return
      }

      try {
        setIsTranslating(true)
        const translated = await translatePost(originalData, language)
        if (translated.recordMap) {
          setData(translated)
        } else {
          setData({
            ...translated,
            recordMap: originalData.recordMap
          })
        }
      } catch (error) {
        console.error('Translation error:', error)
        setData(JSON.parse(JSON.stringify(originalData)))
      } finally {
        setIsTranslating(false)
      }
    }

    translateContent()
  }, [originalData, language])

  if (!data || !data.recordMap) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {isTranslating && (
          <div className="translation-indicator">
            Translating...
          </div>
        )}
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap as ExtendedRecordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
      <TableOfContents />
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding: 3rem 1.5rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 55rem;
  margin: 0 auto;
  position: relative;
  
  > article {
    margin: 0 auto;
    max-width: 42rem;
    position: relative;
  }

  .translation-indicator {
    position: fixed;
    top: 5rem;
    right: 1rem;
    background-color: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    z-index: 50;
  }

  @media (max-width: 1200px) {
    padding: 2rem 1rem;
  }
`
