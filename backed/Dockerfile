# 构建阶段
FROM golang:1.21-alpine AS builder
ENV CGO_ENABLED=0 GOPROXY=https://goproxy.cn,direct
WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -ldflags="-s -w" -o /app/easypost ./easypost.go

# 运行阶段
FROM alpine:3.18
RUN apk add --no-cache ca-certificates tzdata && \
    echo "Asia/Shanghai" > /etc/timezone
WORKDIR /app
COPY --from=builder /app/easypost .
EXPOSE 8888
CMD ["/app/easypost"]