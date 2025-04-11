import { Form, Tabs, theme, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import type { ApiDetails } from '@/types'
import { ParamsEditableTable } from '../components/ParamsEditableTable'
import { ParamsBody, ParamsPayload } from "./ParamsPayload";
import { Authorization } from "@/components/tab-content/api/authorization/Authorization"
import { Scripts } from "@/components/tab-content/api/scripts/Scripts"
import { ParamsEditableRunTable } from "@/components/tab-content/api/components/ParamsEditableRunTable"
import { useEffect, useState, useMemo } from 'react'

function BadgeLabel(props: React.PropsWithChildren<{ count?: number; hasValue?: boolean }>) {
  const { token } = theme.useToken()
  const { children, count, hasValue } = props

  return (
    <span>
      {children}
      {(typeof count === 'number' && count > 0) || hasValue ? (
        <span
          className="ml-1 inline-block size-2 rounded-full"
          style={{ backgroundColor: token.colorSuccessActive }}
        />
      ) : null}
    </span>
  )
}

interface ParamsTabProps {
  value?: ApiDetails['parameters']
  onChange?: (value: ParamsTabProps['value']) => void
}

export function ParamsRunTab(props: ParamsTabProps) {
  const { value, onChange } = props
  const [form] = useForm()
  const [formValues, setFormValues] = useState<ApiDetails>(null)

  // 使用useMemo优化计算，避免不必要的重渲染
  const tabStatus = useMemo(() => {
    const auth = value?.authorization || {}
    const hasAuthorization = Object.keys(auth).length > 0 &&
      Object.values(auth).some(v => v !== undefined && v !== '' && v !== null)

    const payload = value?.payload || {}
    const hasPayload = Object.keys(payload).length > 0 &&
      (payload.jsonSchema || payload.parameters || payload.type)

    return {
      hasAuthorization,
      hasPayload,
      hasHeaders: (value?.header?.length || 0) > 0,
      hasCookies: (value?.cookie?.length || 0) > 0,
      paramsCount: (value?.query?.length || 0) + (value?.path?.length || 0)
    }
  }, [value])

  const handleValuesChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues)
    if (changedValues.parameters) {
      onChange?.(changedValues.parameters)
    }
  }

  const tabItems = useMemo(() => [
    {
      key: 'params',
      label: (
        <BadgeLabel
          count={tabStatus.paramsCount}
          hasValue={tabStatus.paramsCount > 0}
        >
          Params
        </BadgeLabel>
      ),
      children: (
        <div>
          <div className="py-2">
            <Typography.Text type="secondary">Query 参数</Typography.Text>
          </div>
          <ParamsEditableRunTable
            value={value?.query}
            onChange={(query) => {
              onChange?.({ ...value, query })
            }}
          />

          {value?.path && value.path.length > 0 && (
            <>
              <div className="py-2">
                <Typography.Text type="secondary">Path 参数</Typography.Text>
              </div>
              <ParamsEditableTable
                isPathParamsTable
                autoNewRow={false}
                removable={false}
                value={value.path}
                onChange={(path) => {
                  onChange?.({ ...value, path })
                }}
              />
            </>
          )}
        </div>
      ),
    },
    {
      key: 'authorization',
      label: (
        <BadgeLabel hasValue={tabStatus.hasAuthorization}>
          Authorization
        </BadgeLabel>
      ),
      children: (
        <Authorization
          value={value?.authorization}
          onChange={(authorization) => {
            onChange?.({ ...value, authorization })
          }}
        />
      ),
    },
    {
      key: 'body',
      label: (
        <BadgeLabel hasValue={tabStatus.hasPayload}>
          Body
        </BadgeLabel>
      ),
      children: (
        <ParamsPayload
          value={value?.payload}
          onChange={(payload) => {
            onChange?.({ ...value, payload })
          }}
        />
      ),
    },
    {
      key: 'headers',
      label: (
        <BadgeLabel hasValue={tabStatus.hasHeaders}>
          Headers
        </BadgeLabel>
      ),
      children: (
        <div className="pt-2">
          <ParamsEditableRunTable
            value={value?.header}
            onChange={(header) => {
              onChange?.({ ...value, header })
            }}
          />
        </div>
      ),
    },
    {
      key: 'cookie',
      label: (
        <BadgeLabel hasValue={tabStatus.hasCookies}>
          Cookie
        </BadgeLabel>
      ),
      children: (
        <div className="pt-2">
          <ParamsEditableRunTable
            value={value?.cookie}
            onChange={(cookie) => {
              onChange?.({ ...value, cookie })
            }}
          />
        </div>
      ),
    },
    {
      key: 'pre-scripts',
      label: (
        <BadgeLabel>
          前置脚本
        </BadgeLabel>
      ),
      children: (
        <Form.Item noStyle name="pre-scripts">
          <Scripts />
        </Form.Item>
      ),
    },
    {
      key: 'post-scripts',
      label: (
        <BadgeLabel>
          后置脚本
        </BadgeLabel>
      ),
      children: (
        <Form.Item noStyle name="post-scripts">
          <Scripts />
        </Form.Item>
      ),
    },
  ], [value, onChange, tabStatus])

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Tabs
        animated={false}
        items={tabItems}
      />
    </Form>
  )
}