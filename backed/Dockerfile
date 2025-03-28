# 构建阶段
FROM golang:alpine AS builder

LABEL stage=gobuilder

ENV CGO_ENABLED 0
ENV GOOS linux
ENV GOPROXY https://goproxy.cn,direct

WORKDIR /build
COPY . .
RUN [ -f go.mod ] || exit 1  # 检查 go.mod 是否存在

# 编译（注意输出路径与后续 COPY 一致）
RUN go build -ldflags="-s -w" -o /app/easypost easypost.go

# 运行时阶段
FROM alpine:3.18

# 配置 Alpine 镜像源（使用最新稳定版）
RUN echo -e http://mirrors.ustc.edu.cn/alpine/v3.18/main/ > /etc/apk/repositories && \
    apk update --no-cache && \
    apk add --no-cache ca-certificates tzdata

# 时区配置
ENV TZ Asia/Shanghai

# 复制编译结果和配置文件
WORKDIR /app
COPY --from=builder /app/easypost /app/easypost
COPY --from=builder /build/api/easypost/etc /app/etc

# 默认配置文件路径（可通过运行时覆盖）
ENV CONFIG_FILE /app/etc/easypost-api.yaml

# 启动命令（两种方式选其一）
# 方式1：直接执行二进制
CMD ["/app/easypost", "-f", "/app/etc/easypost-api.yaml"]

# 方式2：通过 Shell 解析变量（支持动态替换）
# CMD sh -c "/app/easypost -f ${CONFIG_FILE}"