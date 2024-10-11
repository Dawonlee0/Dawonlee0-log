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
          <div className="date">{formatDate(data?.date?.start_date || data.createdTime, CONFIG.lang)}</div>
          <div className="tags">
            {data.tags && data.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        {data.thumbnail && (
          <div className="thumbnail">
            <Image
              src={data.thumbnail}
              width={160} // 16:9 비율을 위해 너비 조정
              height={90} // 16:9 비율을 위해 높이 조정
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
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.scheme === "light" ? "white" : theme.colors.gray4};

    .content {
      flex: 1;
      margin-right: 1rem;
    }

    .thumbnail {
      width: 160px; // 16:9 비율을 위해 너비 조정
      height: 90px; // 16:9 비율을 위해 높이 조정
      border-radius: 1rem;
      overflow: hidden;
    }

    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
      font-weight: 500;
    }

    .date {
      color: ${({ theme }) => theme.colors.gray10};
    }

    .tags {
      display: flex; // 가로로 나열
      flex-wrap: wrap; // 여러 줄로 나열 가능
      gap: 0.5rem; // 태그 간격
    }
  }
`
