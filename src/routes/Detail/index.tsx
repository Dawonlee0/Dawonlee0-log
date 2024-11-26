import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import TableOfContents from "./components/TableOfContents"

type Props = {}

const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  useMermaidEffect()

  if (!data) return null
  return (
    <StyledWrapper>
      <div className="inner">
        <div className="container">
          <div className="content" data-type={data.type}>
            {data.type[0] === "Page" && <PageDetail />}
            {data.type[0] !== "Page" && <PostDetail />}
          </div>
        </div>
        <TableOfContents />
      </div>
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.gray2};

  .inner {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .container {
    width: 100%;
    max-width: 60rem;
    margin: 0 auto;
  }

  .content {
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => 
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &[data-type="Paper"] {
      padding: 40px 0;
    }
  }

  code[class*="language-mermaid"],
  pre[class*="language-mermaid"] {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
