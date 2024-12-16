const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // 所有 /api 路径的请求都会被代理
        createProxyMiddleware({
            target: 'http://localhost:8888/api', // 目标服务器地址
            changeOrigin: true, // 修改请求头中的 Host 字段
        })
    );
};
