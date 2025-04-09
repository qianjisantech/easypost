import { useEffect, useState } from 'react'

import { Form, Input, Radio, Select, type SelectProps } from 'antd'

import { AuthorizationType, AuthorizationTypeName } from '@/enums'
import type { ApiDetails } from '@/types'

interface AuthorizationProps {
  value?: ApiDetails['authorization']
  onChange?: (value: AuthorizationProps['authorization']) => void
}

export function Authorization({ value, onChange }: AuthorizationProps) {
  const [type, setType] = useState<AuthorizationType>(value?.type || AuthorizationType.无需鉴权)
  const [form] = Form.useForm()

  useEffect(() => {
    if (value) {
      setType(value.type || AuthorizationType.无需鉴权)
      form.setFieldsValue(value.data || {})
    } else {
      // 新增：当没有初始值时，主动触发一次onChange
      onChange?.({
        type: 'NoneAuth',
        data: {}
      })
    }
  }, [value, form, onChange])

  const options: SelectProps['options'] = [
    { label: AuthorizationTypeName.无需鉴权, value: AuthorizationType.无需鉴权 },
    { label: AuthorizationTypeName.BasicAuth, value: AuthorizationType.BasicAuth },
    { label: AuthorizationTypeName.BearerToken, value: AuthorizationType.BearerToken },
    // { label: AuthorizationTypeName.ApiKey, value: AuthorizationType.ApiKey },
    // { label: AuthorizationTypeName.OAuth2, value: AuthorizationType.OAuth2 },
    // { label: AuthorizationTypeName.DigestAuth, value: AuthorizationType.DigestAuth },
    // { label: AuthorizationTypeName.HawkAuthorization, value: AuthorizationType.HawkAuthorization },
  ]

  const handleAuthTypeChange = (value: AuthorizationType) => {
    setType(value)
    form.resetFields()
    // 修改这里：当选择"无需鉴权"时返回NoAuth类型
    const authType = value === AuthorizationType.无需鉴权 ? 'NoneAuth' : value
    onChange?.({
      type: authType,
      data: {},
    })
  }

  const handleValuesChange = (_: any, allValues: any) => {
    // 修改这里：当类型为"无需鉴权"时返回NoAuth
    const authType = type === AuthorizationType.无需鉴权 ? 'NoneAuth' : type
    onChange?.({
      type: authType,
      data: allValues,
    })
  }
  const renderAuthForm = () => {
    const commonItemStyle = { marginBottom: 50 }

    switch (type) {
      case AuthorizationType.无需鉴权:
        return null
      case AuthorizationType.BasicAuth:
        return (
          <>
            <Form.Item label="Username" name="username" style={commonItemStyle}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item label="Password" name="password" style={commonItemStyle}>
              <Input placeholder="Password" />
            </Form.Item>
          </>
        )

      case AuthorizationType.BearerToken:
        return (
          <Form.Item label="Token" name="token" style={commonItemStyle}>
            <Input placeholder="Bearer Token" />
          </Form.Item>
        )

      case AuthorizationType.ApiKey:
        return (
          <>
            <Form.Item
              initialValue="header"
              label="添加位置"
              name="position"
              style={commonItemStyle}
            >
              <Select
                options={[
                  { label: 'Header', value: 'header' },
                  { label: 'Query Params', value: 'queryparams' },
                ]}
                style={{ width: 200 }}
              />
            </Form.Item>
            <Form.Item label="Key" name="key" style={commonItemStyle}>
              <Input placeholder="API Key" />
            </Form.Item>
            <Form.Item label="Value" name="value" style={commonItemStyle}>
              <Input.Password placeholder="API Key Value" />
            </Form.Item>
          </>
        )

      case AuthorizationType.OAuth2:
        return (
          <>
            <Form.Item
              label="Client ID"
              name="clientId"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input placeholder="Client ID" />
            </Form.Item>
            <Form.Item
              label="Client Secret"
              name="clientSecret"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input.Password placeholder="Client Secret" />
            </Form.Item>
            <Form.Item
              label="授权URL"
              name="authUrl"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input placeholder="Authorization URL" />
            </Form.Item>
            <Form.Item
              label="Token URL"
              name="tokenUrl"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input placeholder="Token URL" />
            </Form.Item>
            <Form.Item label="Scope" name="scope" style={commonItemStyle}>
              <Input placeholder="Scope (optional)" />
            </Form.Item>
          </>
        )

      case AuthorizationType.DigestAuth:
        return (
          <>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item label="Realm" name="realm" style={commonItemStyle}>
              <Input placeholder="Realm (optional)" />
            </Form.Item>
          </>
        )

      case AuthorizationType.HawkAuthorization:
        return (
          <>
            <Form.Item
              label="Hawk ID"
              name="id"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input placeholder="Hawk ID" />
            </Form.Item>
            <Form.Item
              label="Hawk Key"
              name="key"
              rules={[{ required: true }]}
              style={commonItemStyle}
            >
              <Input.Password placeholder="Hawk Key" />
            </Form.Item>
            <Form.Item initialValue="sha256" label="算法" name="algorithm" style={commonItemStyle}>
              <Radio.Group>
                <Radio value="sha256">SHA-256</Radio>
                <Radio value="sha1">SHA-1</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ margin: '30px 0 10px 30px' }}>鉴权方式</div>
      <Select
        options={options}
        style={{ width: 200, marginLeft: 30 }}
        value={type}
        onChange={handleAuthTypeChange}
      />

      <Form
        form={form}
        layout="vertical"
        style={{ margin: '20px 0', maxWidth: 600, padding: '0 20px' }}
        onValuesChange={handleValuesChange}
      >
        {renderAuthForm()}
      </Form>
    </div>
  )
}
