import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        <div className="content">
          <header className="top">
            <h2>{data.title}</h2>
            {data.thumbnail && (
              <div className="thumbnail">
                <Image
                  src={data.thumbnail}
                  width={100} // 작은 크기로 설정
                  height={100} // 작은 크기로 설정
                  alt={data.title}
                  css={{ objectFit: "cover" }}
                />
              </div>
            )}
          </header>
          <div className="date">
            <div className="content">
              {formatDate(
                data?.date?.start_date || data.createdTime,
                CONFIG.lang
              )}
            </div>
          </div>
          <div className="summary">
            <p>{data.summary}</p>
          </div>
          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  article {
    display: flex; // Flexbox 사용
    align-items: center; // 수직 정렬
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    padding: 1rem; // 패딩 추가

    .content {
      flex: 1; // 제목과 내용이 남은 공간을 차지하도록 설정
      margin-right: 1rem; // 사진과의 간격
    }

    .thumbnail {
      margin-left: auto; // 오른쪽으로 정렬
      width: 100px; // 사진 크기
      height: 100px; // 사진 크기
    }

    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 500;
      cursor: pointer;
    }
  }
`
