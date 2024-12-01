import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import Category from "../../../components/Category"
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
          {data.category && (
            <div className="category">
              <Category>{data.category}</Category>
            </div>
          )}
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
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background-color: ${({ theme }) => 
        theme.scheme === "light" 
          ? "white" 
          : theme.colors.gray5};

      h2 {
        color: ${({ theme }) => theme.colors.gray12};
      }

      .thumbnail {
        img {
          transform: scale(1.05);
        }
      }
    }

    .content {
      flex: 1;
      margin-right: 1rem;

      .category {
        margin-bottom: 0.5rem;
      }

      h2 {
        margin-bottom: 0.5rem;
        font-size: 1.125rem;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray12};
        transition: color 0.3s ease;
      }

      .date {
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.gray11};
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        min-height: 24px;
        margin-top: 0.5rem;
        
        > div {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          background-color: ${({ theme }) => theme.colors.gray5};
          color: ${({ theme }) => theme.colors.gray12};
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: ${({ theme }) => theme.colors.gray6};
            transform: translateY(-1px);
          }
        }

        @media (min-width: 1024px) {
          display: flex;
        }
      }
    }

    .thumbnail {
      width: 160px;
      height: 90px;
      border-radius: 1rem;
      overflow: hidden;
      flex-shrink: 0;

      img {
        transition: transform 0.3s ease;
      }
    }
  }
`
