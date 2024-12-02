import { CONFIG } from "site.config"
import Head from "next/head"
import dynamic from "next/dynamic"
import useLanguage from "src/hooks/useLanguage"
import { getPreferredLanguage } from "src/hooks/useLanguage"

export type MetaConfigProps = {
  title: string
  description: string
  type: "Website" | "Post" | "Page" | string
  date?: string
  image?: string
  url: string
}

const MetaConfig: React.FC<MetaConfigProps> = (props) => {
  // 서버 사이드에서는 기본값 사용
  const serverLanguage = getPreferredLanguage()
  const { language = serverLanguage } = useLanguage() || {}
  const alternateUrl = props.url + (language === 'ko' ? '' : '/en')

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="robots" content="follow, index" />
      <meta charSet="UTF-8" />
      <meta name="description" content={props.description} />
      <meta httpEquiv="Content-Language" content={language} />
      
      {/* 다국어 SEO */}
      <link rel="alternate" href={props.url} hrefLang="ko" />
      <link rel="alternate" href={props.url + '/en'} hrefLang="en" />
      <link rel="alternate" href={props.url} hrefLang="x-default" />

      {/* og */}
      <meta property="og:type" content={props.type} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={alternateUrl} />
      <meta property="og:locale" content={language === 'ko' ? 'ko_KR' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'ko' ? 'en_US' : 'ko_KR'} />
      {props.image && <meta property="og:image" content={props.image} />}

      {/* twitter */}
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      {props.image && <meta name="twitter:image" content={props.image} />}

      {/* post */}
      {props.type === "Post" && (
        <>
          <meta property="article:published_time" content={props.date} />
          <meta property="article:author" content={CONFIG.profile.name} />
        </>
      )}
    </Head>
  )
}

export default dynamic(() => Promise.resolve(MetaConfig), {
  ssr: true
})
