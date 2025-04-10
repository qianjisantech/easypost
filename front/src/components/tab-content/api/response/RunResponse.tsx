import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { Divider, Segmented, Space, Statistic, Table, Tabs, Tooltip } from "antd";

import type { JsonSchemaEditorProps } from '@/components/JsonSchema'
import { JsonSchemaCard } from '@/components/JsonSchemaCard'
import { JsonViewer } from '@/components/JsonViewer'

interface JsonSchemaCardProps extends Pick<JsonSchemaEditorProps, 'value' | 'onChange'> {
  editorProps?: JsonSchemaEditorProps
  headers?: Record<string, string>
  cookies?: { name: string; value: string; domain?: string; path?: string; expires?: string }[]
  actualRequest?: {
    method: string
    url: string
    headers: Record<string, string>
    body?: any
  }
}

export function RunResponse(props: JsonSchemaCardProps) {
  const { value = {}, onChange, editorProps, cookies = [], actualRequest } = props
  const [body, setBodyStr] = useState<string>('')
  const [headers, setHeaders] = useState<string>('')
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);

  // 计算响应信息
  const responseSize = props.value?.data
    ? new Blob([JSON.stringify(props.value.data)]).size
    : 0;
  const requestSize = props.actualRequest?.body
    ? new Blob([JSON.stringify(props.actualRequest.body)]).size
    : 0;
  const responseTime = props.responseTime || 0;

  // 处理鼠标按下事件
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidth(sidebarWidth);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  // 处理鼠标移动事件
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newWidth = startWidth + (startX - e.clientX);
    setSidebarWidth(Math.max(200, Math.min(400, newWidth)));
  };

  // 处理鼠标抬起事件
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // 添加全局事件监听
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, startWidth]);
  useEffect(() => {
      console.log('value.headers', value.headers)
    const data = value.data
    if (typeof data === 'object') {
      setBodyStr(JSON.stringify(data, null, 2))
    } else {
      setBodyStr(data || '')
    }
  // const headers =  value.headers.get('Api-H0')
  // if (headers){
  //   setHeaders(headers)
  // }
  }, [value.data,value.headers])

  const isJson = (str: string) => {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  const [alignValue, setAlignValue] = useState<Align>('pretty')
  type Align = 'pretty' | 'raw' | 'preview'

  const renderResponseBody = () => {
    switch (alignValue) {
      case 'pretty':
        return <div>{body}</div>
      case 'raw':
        return (
          <SyntaxHighlighter language="json" style={docco}>
            {body}
          </SyntaxHighlighter>
        )
      case 'preview':
        return <div>{body}</div>
      default:
        return null
    }
  }

  // 响应头表格列配置
  const headerColumns = [
    {
      title: '名称',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
  ]

  // Cookie表格列配置
  const cookieColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: 'Expires',
      dataIndex: 'expires',
      key: 'expires',
    },
    {
      title: 'MaxAge',
      dataIndex: 'maxAge',
      key: 'maxAge',
    },
    {
      title: 'HttpOnly',
      dataIndex: 'httpOnly',
      key: 'httpOnly',
    },
    {
      title: 'Secure',
      dataIndex: 'secure',
      key: 'secure',
    },
  ]

  // 实际请求表单数据
  const actualRequestData = [
    {
      key: 'method',
      name: 'Method',
      value: actualRequest?.method || 'GET',
    },
    {
      key: 'url',
      name: 'URL',
      value: actualRequest?.url || '',
    },
    {
      key: 'headers',
      name: 'Headers',
      value: JSON.stringify(actualRequest?.headers || {}, null, 2),
    },
    {
      key: 'body',
      name: 'Body',
      value: actualRequest?.body ? JSON.stringify(actualRequest.body, null, 2) : 'None',
    },
  ]

  const ResponseInfoItem = [
    {
      key: 'body',
      label: 'Body',
      children: (
        <div>
          <Segmented
            options={[
              { label: 'Pretty', value: 'pretty' },
              { label: 'Raw', value: 'raw' },
              { label: 'Preview', value: 'preview' },
            ]}
            style={{ marginBottom: 8 }}
            value={alignValue}
            onChange={setAlignValue}
          />
          {renderResponseBody()}
        </div>
      ),
    },
    {
      key: 'cookie',
      label: 'Cookie',
      children: (
        <Table columns={cookieColumns} dataSource={cookies} pagination={false} size="small" />
      ),
    },
    {
      key: 'header',
      label: 'Header',
      children: (
        <Table
          columns={[
            {
              title: '名称',
              dataIndex: 'key',
              key: 'key',
              render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
            },
            {
              title: '值',
              dataIndex: 'value',
              key: 'value',
              render: (value) => {
                // 特殊处理 Set-Cookie 头
                if (value.includes('Set-Cookie')) {
                  const cookies = value.split(/(?<=; path=\/)\s/);
                  return (
                    <div>
                      {cookies.map((cookie, index) => (
                        <div key={index} style={{ marginBottom: index < cookies.length - 1 ? 8 : 0 }}>
                          <SyntaxHighlighter language="text" style={docco}>
                            {cookie.trim()}
                          </SyntaxHighlighter>
                        </div>
                      ))}
                    </div>
                  );
                }
                // 其他头值
                return (
                  <SyntaxHighlighter language="text" style={docco}>
                    {value}
                  </SyntaxHighlighter>
                );
              },
            },
          ]}
          dataSource={Object.entries(headers).map(([name, value]) => ({
            name,
            value,
            key: name
          }))}
          pagination={false}
          size="small"
          bordered
          rowKey="name"
        />
      ),
    },
    {
      key: 'console',
      label: '控制台',
      children: <div> 没有内容</div>,
    },
      {
          key: 'actualRequest',
          label: '实际请求',
          children: (
            <div style={{ padding: '16px' }}>
                {/* 请求URL部分 - 表单样式 */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontWeight: 500, marginBottom: '8px', fontSize: '16px', color: '#333' }}>请求URL</div>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ flex: 1, wordBreak: "break-all" }}>{actualRequest?.method || "GET"}</span>
                    <span style={{ flex: 1, wordBreak: "break-all" }}>{actualRequest?.url || ""}</span>
                  </div>
                </div>

                {/* Header部分 - 表格样式 */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontWeight: 500, marginBottom: '8px', fontSize: '16px', color: '#333' }}>Headers</div>
                    <Table
                      columns={[
                          { title: '名称', dataIndex: 'key', key: 'key' },
                          { title: '值', dataIndex: 'value', key: 'value' },
                      ]}
                      dataSource={Object.entries(actualRequest?.headers || {}).map(([name, value]) => ({
                          name,
                          value,
                          key: name,
                      }))}
                      pagination={false}
                      size="small"
                      bordered
                    />
                </div>

                {/* Body部分 - 表单样式 */}
                <div>
                    <div style={{ fontWeight: 500, marginBottom: '8px', fontSize: '16px', color: '#333' }}>Body</div>
                    {actualRequest?.body ? (
                      <SyntaxHighlighter language="json" style={docco}>
                          {JSON.stringify(actualRequest.body, null, 2)}
                      </SyntaxHighlighter>
                    ) : (
                      <div style={{ color: '#999' }}>No request body</div>
                    )}
                </div>
            </div>
          ),
      }
  ]

  return (
    <div

      ref={containerRef}
      style={{
        display: 'flex',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* 主内容区域 */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        marginRight: sidebarWidth,
        transition: 'margin 0.2s'
      }}>
        <Tabs
          defaultActiveKey="body"
          indicator={{ size: (origin) => origin - 20, align: 'center' }}
          items={ResponseInfoItem}
        />
      </div>

      {/* 可拖动的侧边栏 */}
      <div
        ref={sidebarRef}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: sidebarWidth,
          background: '#fff',
          borderLeft: '1px solid #f0f0f0',
          padding: '16px',
          overflow: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {/* 拖动条 */}
        <div
          style={{
            position: 'absolute',
            left: -5,
            top: 0,
            bottom: 0,
            width: 10,
            cursor: 'col-resize',
            zIndex: 1
          }}
          onMouseDown={handleMouseDown}
        />
        <Space
          direction="horizontal"
          size="middle"
          style={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '12px 16px', // 增加上下内边距
            fontSize: '12px',
            backgroundColor: '#f5f5f5', // 淡灰色背景
            borderRadius: '4px', // 添加圆角
            border: '1px solid #e8e8e8' // 添加细边框
          }}
        >
          <Tooltip title="状态码" placement="top">
            <Statistic
              value={props.responseStatus || 200}
              valueStyle={{
                color: '#52c41a',
                fontSize: '12px',
                cursor: 'help'
              }}
            />
          </Tooltip>


          <Tooltip title="响应时间" placement="top">
            <Statistic
              value={responseTime}
              valueStyle={{
                color: '#52c41a',
                fontSize: '12px',
                cursor: 'help'
              }}
              suffix="ms"
              precision={2}
            />
          </Tooltip>


          <Tooltip title="请求体大小" placement="top">
            <Statistic
              value={requestSize}
              valueStyle={{
                color: '#52c41a',
                fontSize: '12px',
                cursor: 'help'
              }}
              suffix="bytes"
            />
          </Tooltip>



          <Tooltip title="响应体大小" placement="top">
            <Statistic
              value={responseSize}
              valueStyle={{
                color: '#52c41a',
                fontSize: '12px',
                cursor: 'help'
              }}
              suffix="bytes"
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}
