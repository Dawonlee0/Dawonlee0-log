/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.notion.so',
      'lh5.googleusercontent.com',
      'lh3.googleusercontent.com',
      's3-us-west-2.amazonaws.com',
      'images.unsplash.com',
      's3.us-west-2.amazonaws.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
    ],
  },
  experimental: {
    workerThreads: true,
    scrollRestoration: true,
  },
  onDemandEntries: {
    // 서버 사이드 페이지 캐시 유지 시간
    maxInactiveAge: 10 * 1000, // 10초
    // 동시에 캐시할 수 있는 페이지 수
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        http: false,
        https: false,
        crypto: false,
        os: false,
        stream: false,
        url: false,
        net: false,
        tls: false,
        zlib: false,
        querystring: false,
        buffer: false,
        util: false,
        assert: false,
        dns: false,
        http2: false,
        dgram: false,
        child_process: false,
        cluster: false,
        module: false,
        repl: false,
        readline: false,
        worker_threads: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
