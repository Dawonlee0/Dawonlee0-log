import { CONFIG } from "site.config"
import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"
import { useRouter } from "next/router"

type Props = {
  issueTerm: string
}

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  const [scheme] = useScheme()
  const router = useRouter()
  const utterancesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const theme = `github-${scheme}`
    const utterancesEl = utterancesRef.current

    if (!utterancesEl) return

    // 기존 utterances가 있다면 제거
    const utterancesIframe = utterancesEl.querySelector('.utterances-frame')
    if (utterancesIframe) {
      utterancesIframe.remove()
    }

    const script = document.createElement("script")
    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", "true")
    script.setAttribute("issue-term", issueTerm)
    script.setAttribute("theme", theme)
    
    const config: Record<string, string> = CONFIG.utterances.config
    Object.keys(config).forEach((key) => {
      script.setAttribute(key, config[key])
    })

    utterancesEl.appendChild(script)

    return () => {
      if (utterancesEl) {
        utterancesEl.innerHTML = ""
      }
    }
  }, [scheme, router, issueTerm])

  return (
    <StyledWrapper>
      <div ref={utterancesRef} className="utterances-container" />
    </StyledWrapper>
  )
}

export default Utterances

const StyledWrapper = styled.div`
  @media (min-width: 768px) {
    margin-left: -4rem;
  }

  .utterances-container {
    min-height: 200px;
  }
`
