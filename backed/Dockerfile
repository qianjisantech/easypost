# ===== 构建阶段 =====
FROM golang:1.22-alpine AS builder

# 配置环境变量
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64 \
    GOPROXY=https://goproxy.cn,direct

WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# 编译时指定监听端口（可通过 ARG 动态注入）
ARG APP_PORT=8888
ENV APP_PORT=$APP_PORT
RUN go build -ldflags="-s -w" -o /app/easypost ./easypost.go

# ===== 运行时阶段 =====
FROM registry.cn-hangzhou.aliyuncs.com/google_containers/golang:1.21-alpine

# 中国镜像源优化
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk add --no-cache ca-certificates tzdata && \
    update-ca-certificates

# 时区与非root用户
ENV TZ=Asia/Shanghai
RUN adduser -D -u 1000 appuser && \
    mkdir -p /app/data && \
    chown appuser:appuser /app/data

# 复制可执行文件
WORKDIR /app
COPY --from=builder --chown=appuser:appuser /app/easypost .
COPY --chown=appuser:appuser ./configs /app/configs

# 健康检查（针对8888端口）
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -qO- http://localhost:8888/health || exit 1

# 启动命令（强制监听8888端口）
USER appuser
EXPOSE 8888
CMD ["/app/easypost", "--port", "8888"]