import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        <div className="content">
          <h2>{data.title}</h2>
          <div className="date">
            {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
          </div>
          {data.tags && data.tags.length > 0 && (
            <div className="tags">
              {data.tags.map((tag: string) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
        {data.thumbnail && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              width={160}
              height={90}
              alt={data.title}
              objectFit="cover"
            />
          </div>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  article {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.scheme === "light" ? "white" : theme.colors.gray4};

    .content {
      flex: 1;
      margin-right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h2 {
        margin-bottom: 0.25rem;
        font-size: 1.125rem;
        font-weight: 500;
      }

      .date {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray10};
        margin-bottom: 0.5rem;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
        min-height: 24px;
      }
    }

    .thumbnail {
      width: 160px;
      height: 90px;
      border-radius: 1rem;
      overflow: hidden;
      flex-shrink: 0;
    }
  }
`
