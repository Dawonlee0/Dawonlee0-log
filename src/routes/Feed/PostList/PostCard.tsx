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
  console.log("Post Tags:", data.tags)

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        <div className="content">
          <h2>{data.title}</h2>
          <div className="date">
            {formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}
          </div>
          <div className="tags">
            {data.tags?.map((tag: string) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
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

      h2 {
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
        font-weight: 500;
      }

      .date {
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.gray10};
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        min-height: 24px;
        margin-top: 0.5rem;
        
        > div {  // Tag 컴포넌트 스타일
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          background-color: ${({ theme }) => theme.colors.gray5};
          color: ${({ theme }) => theme.colors.gray11};
          cursor: pointer;

          &:hover {
            background-color: ${({ theme }) => theme.colors.gray6};
          }
        }
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
