import { CONFIG } from "site.config"
import Tag from "src/components/Tag"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostHeader: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper>
      <div className="header">
        <h1 className="title">{data.title}</h1>
        <div className="date">{formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}</div>
      </div>
      <div className="tags">
        {data.tags && data.tags.map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      {data.thumbnail && (
        <div className="thumbnail">
          <Image
            src={data.thumbnail}
            alt={data.title}
            layout="responsive"
            width={300}
            height={200}
            objectFit="cover"
          />
        </div>
      )}
    </StyledWrapper>
  )
}

export default PostHeader

const StyledWrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.875rem;
    font-weight: 700;
  }
  .date {
    color: ${({ theme }) => theme.colors.gray11};
  }
  .tags {
    margin-bottom: 1rem;
    display: flex;
    gap: 0.5rem;
  }
  .thumbnail {
    margin-top: 1rem;
    border-radius: 1rem;
    overflow: hidden;
  }
`
