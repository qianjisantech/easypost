/** @type {import('next').NextConfig} */

export default {
  reactStrictMode: true, // 启用严格模式，帮助识别潜在的错误
  eslint: {
    ignoreDuringBuilds: true, // 在构建时忽略 eslint 检查
  },
  typescript: {
    ignoreBuildErrors: true, // 在构建时忽略 TypeScript 错误
  },
  output: 'export', // 配置为静态导出模式，适用于静态站点生成（SSG）
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 匹配前端的 /api 路径
        destination: `${process.env.API_BASE_URL}/api/:path*`, // 转发请求到环境变量中的 API 基础路径
        basePath: false, // 禁用基础路径，确保路径不被修改
      },
      {
        source: '/proxy/:path*', // 匹配前端的 /api 路径
        destination: `${process.env.PROXY_BASE_URL}/api/:path*`, // 转发请求到环境变量中的 API 基础路径
        basePath: false, // 禁用基础路径，确保路径不被修改
      },
    ];
  },
};