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
