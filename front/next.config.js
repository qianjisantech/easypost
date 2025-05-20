import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const nextConfig = {
  reactStrictMode: false, // 禁用严格模式避免编辑器组件重复渲染
  eslint: {
    ignoreDuringBuilds: true, // 构建时跳过ESLint检查
  },
  typescript: {
    ignoreBuildErrors: true, // 构建时跳过TypeScript检查
  },
  // 生产环境关闭source map以减小体积
  productionBrowserSourceMaps: false,

  // 自定义Webpack配置
  webpack: (config, { isServer }) => {
    // 只在客户端构建时添加Monaco编辑器插件
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript', 'json', 'html', 'css'],
          filename: 'static/[name].worker.[contenthash].js',
          globalAPI: true
        })
      )

      // 优化Monaco编辑器打包
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          monaco: {
            test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            name: 'monaco-editor',
            chunks: 'all',
            priority: 20
          }
        }
      }
    }

    return config
  },

  // 代理配置
  async rewrites() {
    if (!process.env.API_BASE_URL) {
      console.warn('API_BASE_URL is not set, rewrites will be disabled')
      return []
    }

    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/api/:path*`,
        basePath: false
      },
      {
        source: '/proxy/:path*',
        destination: `${process.env.API_BASE_URL}/proxy/:path*`,
        basePath: false
      }
    ]
  },

  // 添加安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  }
}

export default nextConfig