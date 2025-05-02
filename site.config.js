const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Dawonlee",
    image: "avatar1.svg", 
    // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "developer",
    bio: "I am dawon",
    email: "ttoyr219@naver.com",
    linkedin: "",
    github: "Dawonlee0",
    instagram: "",
  },
  projects: [
    {
      name: `morethan-log`,
      href: "https://github.com/morethanmin/morethan-log",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Dawonlee0-log",
    description: "welcome to Dawonlee0-log!",
    scheme: "system", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://morethan-log.vercel.app",
  since: 2022, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true, // Google Analytics 사용을 원할 경우 true로 변경
    config: {
      measurementId: "G-QM3NQX19QR", // 발급받은 Google Analytics Measurement ID를 입력
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "Dawonlee0/Dawonlee0-log", // GitHub 리포지토리 이름
      "issue-term": "og:title", // 댓글을 매핑할 기준 (예: 'og:title', 'pathname' 등)
      label: "💬 Utterances", // 이슈에 추가할 라벨 (선택사항)
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 2, // revalidate time for [slug], index
}

module.exports = { CONFIG }