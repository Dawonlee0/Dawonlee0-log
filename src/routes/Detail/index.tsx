import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import { useRouter } from "next/router"

type Props = {}

const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  const router = useRouter()
  useMermaidEffect()

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.back()
    }
  }

  if (!data) return null
  return (
    <StyledWrapper onClick={handleBackgroundClick}>
      <div className="container">
        <div className="content" data-type={data.type}>
          {data.type[0] === "Page" && <PageDetail />}
          {data.type[0] !== "Page" && <PostDetail />}
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.gray2};
  cursor: pointer;

  .container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .content {
    position: relative;
    max-width: 60rem;
    margin: 0 auto;
    cursor: default;
    background-color: ${({ theme }) => 
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &[data-type="Paper"] {
      padding: 40px 0;
    }
  }

  /** Reference: https://github.com/chriskempson/tomorrow-theme **/
  code[class*="language-mermaid"],
  pre[class*="language-mermaid"] {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
