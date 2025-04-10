/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true, // 忽略所有构建时的类型错误
  },
  eslint: {
    ignoreDuringBuilds: true, // 忽略ESLint错误
  },
}