import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { Segmented, Table, Tabs } from 'antd'

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
  const [headers, setHeaders] = useState<Record<string, string>>({})
  useEffect(() => {
      console.log('value.data', actualRequest)
    const data = value.data
    if (typeof data === 'object') {
      setBodyStr(JSON.stringify(data, null, 2))
    } else {
      setBodyStr(data || '')
    }
    setHeaders(value.headers || {})
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
          columns={headerColumns}
          dataSource={Object.entries(headers).map(([name, value]) => ({ name, value, key: name }))}
          pagination={false}
          size="small"
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
    <div className="run-response-container">
      <Tabs
        defaultActiveKey="body"
        indicator={{ size: (origin) => origin - 20, align: 'center' }}
        items={ResponseInfoItem}
      />
    </div>
  )
}
