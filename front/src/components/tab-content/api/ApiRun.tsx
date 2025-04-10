'use client'
import { useEffect, useRef, useState } from 'react'

import { Button, Form, type FormProps, Select, type SelectProps, Space } from 'antd'
import type { AxiosRequestConfig } from 'axios'
import { nanoid } from 'nanoid'
import { ApiDetail, ApiDetailCreate, ApiDetailUpdate, ApiRunDetail } from 'src/api/api'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { InputUnderline } from '@/components/InputUnderline'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { ResponseTab } from '@/components/tab-content/api/components/ResponseTab'
import { ParamsRunTab } from '@/components/tab-content/api/params/ParamsRunTab'
import { RunResponse } from '@/components/tab-content/api/response/RunResponse'
import { HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { initialCreateApiDetailsData } from '@/data/remote'
import { AuthorizationType, MenuItemType, ParamType } from "@/enums";
import type { ApiDetails } from '@/types'
import { request } from '@/utils/request'

import { BaseFormItems } from './components/BaseFormItems'
import { GroupTitle } from './components/GroupTitle'
import { PathInput, type PathInputProps } from './components/PathInput'
import { ParamsTab } from './params/ParamsTab'

const DEFAULT_NAME = '未命名接口'

const methodOptions: SelectProps['options'] = Object.entries(HTTP_METHOD_CONFIG).map(
  ([method, { color }]) => {
    return {
      value: method,
      label: (
        <span className="font-semibold" style={{ color: `var(${color})` }}>
          {method}
        </span>
      ),
    }
  }
)

/**
 * API 「运行」部分。
 */
export function ApiRun() {
  const [form] = Form.useForm<ApiDetails>()

  const { messageApi } = useGlobalContext()
  const msgKey = useRef<string>()

  const { addMenuItem, updateMenuItem } = useMenuHelpersContext()
  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()
  const [loading, setLoading] = useState(false)

  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create

  const [requestConfig, setRequestConfig] = useState<AxiosRequestConfig>({})
  const loadingApiDetails = async (id: string) => {
    try {
      if (id) {
        const response = await ApiRunDetail(id)
        if (response.data.success) {
          const menuData = response.data.data
          if (
            menuData &&
            (menuData.type === MenuItemType.ApiDetail || menuData.type === MenuItemType.HttpRequest)
          ) {
            const apiDetails = menuData.data

            if (apiDetails) {
              form.setFieldsValue(apiDetails)
            }
          }
        }
        console.log('tabData', tabData)
      }
    } catch (error) {
      console.error('加载 API 详情失败:', error)
    }
  }
  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      loadingApiDetails(tabData.key)
    }
  }, [form, isCreating, tabData.key])

  const handleSaveCase: FormProps<ApiDetails>['onFinish'] = async (values) => {
    const menuName = values.name || DEFAULT_NAME

    if (isCreating) {
      const menuItemId = ''
      try {
        await ApiDetailCreate({
          id: menuItemId,
          name: menuName,
          type: MenuItemType.ApiDetail,
          data: { ...values, name: menuName },
        }).then((r) => {
          console.log('保存case', r)
        })
      } catch (err) {
        console.error('保存case失败', err)
      }
    } else {
      await ApiDetailUpdate({
        id: tabData.key,
        name: menuName,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
      }).then((r) => {
        console.log('更新case结果', r)
      })
    }
  }

  const handleFinish: FormProps<ApiDetails>['onFinish'] = async (values) => {
    const menuName = values.name || DEFAULT_NAME

    if (isCreating) {
      const menuItemId = ''
      try {
        await ApiDetailUpdate({
          id: menuItemId,
          name: menuName,
          type: MenuItemType.ApiDetail,
          data: { ...values, name: menuName },
        }).then((r) => {
          console.log('保存接口结果', r)
        })
      } catch (err) {
        console.error('保存接口失败', err)
      }

      addMenuItem({
        id: menuItemId,
        name: menuName,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
      })

      addTabItem(
        {
          key: menuItemId,
          label: menuName,
          contentType: MenuItemType.ApiDetail,
        },
        { replaceTab: tabData.key }
      )
    } else {
      updateMenuItem({
        id: tabData.key,
        name: menuName,
        data: { ...values, name: menuName },
      })
    }
  }

  const handlePathChange: PathInputProps['onValueChange'] = (pathVal) => {
    if (typeof pathVal === 'string') {
      // 匹配任意数量的 { 包围的路径参数。
      const regex = /\{+([^{}/]+)\}+/g
      let match: RegExpExecArray | null
      const pathParams: string[] = []

      // 使用 exec 迭代匹配。
      while ((match = regex.exec(pathVal)) !== null) {
        // match[1] 匹配 {} 包围的参数。
        const param = match[1]

        if (param) {
          pathParams.push(param)
        }
      }

      const oldParameters = form.getFieldValue('parameters') as ApiDetails['parameters']
      const oldPath = oldParameters?.path

      const newPath =
        pathParams.length >= (oldPath?.length || 0)
          ? pathParams.reduce(
              (acc, cur, curIdx) => {
                const target = oldPath?.at(curIdx)

                if (target) {
                  acc.splice(curIdx, 1, { ...target, name: cur })
                } else {
                  acc.push({
                    id: nanoid(4),
                    name: cur,
                    type: ParamType.String,
                    required: true,
                  })
                }

                return acc
              },
              [...(oldPath || [])]
            )
          : oldPath?.slice(0, pathParams.length)

      const newParameters: ApiDetails['parameters'] = { ...oldParameters, path: newPath }

      form.setFieldValue('parameters', newParameters)
    }
  }

  const send = async (values: ApiDetails) => {
    console.log('apiDetail', values)
    // 1. 处理 headers
    const headers = values.parameters?.header?.reduce(
      (acc, item) => {
        if (item.name && item.example) {
          acc[item.name] = item.example
        }
        return acc
      },
      {} as Record<string, string>
    )

    setLoading(true)

    // 从 path 中提取域名作为 Host
    let host = ''
    try {
      // 如果 path 不是完整 URL，添加 https:// 前缀以便解析
      const urlPath = values.path.startsWith('http') ? values.path : `https://${values.path}`
      const url = new URL(urlPath)
      host = url.hostname
    } catch (e) {
      console.error('无法从 path 中解析域名:', e)
      setLoading(false)
      return // 如果无法解析域名，直接返回不发送请求
    }

    // 检查 headers 中是否已有 Content-Type
    const hasContentType = headers && Object.keys(headers).some(
      key => key.toLowerCase() === 'content-type'
    )

    const fixedHeaders = {
      'User-Agent': 'Easypost/1.0.0 (https://easypost.com)',
      Accept: '*/*',
      Host: host, // 使用从 path 提取的域名
      Connection: 'keep-alive',
      ...(!hasContentType && { 'Content-Type': 'text/plain' }) // 如果没有 Content-Type 则添加默认值
    }
// 处理 Basic Auth 认证
    if (values.parameters.authorization?.type === AuthorizationType.BasicAuth) {
      const { username, password } = values.authorization.data as { username: string; password: string }
      if (username && password) {
        const token = btoa(`${username}:${password}`) // Base64 编码
        fixedHeaders['Authorization'] = `Basic ${token}`
      }
    }
    if (values.parameters.authorization?.type === AuthorizationType.BearerToken) {
      const { token } = values.parameters.authorization.data as { token: string}
      if (token) {
        fixedHeaders['Authorization'] = `Bearer ${token}`
      }
    }
    const allHeaders = { ...headers, ...fixedHeaders }

    const easypostHeaders = {
      'Api-u': values.path,
      'Api-o0': `method=${values.method},timings=true,timeout=300000,rejectUnauthorized=false,followRedirect=true`,
      'Api-H0': Object.entries(allHeaders)
        .map(([key, value]) => `${key}=${value}`)
        .join(', '),
      'Content-Type': 'application/json'
    }

    // 2. 组装 requestConfig
    const requestConfig: Record<string, any> = {
      method: 'POST',
      headers: {
        ...allHeaders,
        ...easypostHeaders,
      },
      baseURL: '/proxy/v1/request',
    }
    console.log('values.parameters.payload',values.parameters?.payload)

    if (values.parameters?.payload?.jsonSchema) {
      requestConfig.data = values.parameters?.payload?.jsonSchema
    } else if (values.parameters?.payload?.parameters) {
      const formData = new FormData()
      values.parameters?.payload?.parameters.forEach((item) => {
        formData.append(item.name!, item.example)
      })
      requestConfig.data = formData
    }

    console.log('requestConfig', requestConfig)

    // 3. 发送请求
    try {
      const res = await request(requestConfig)
      form.setFieldValue('responses', res)
    } catch (e) {
      console.error('Error:', e)
    } finally {
      setLoading(false)
    }
  }
  const handleParseQueryParams: PathInputProps['onParseQueryParams'] = (parsedParams) => {
    if (Array.isArray(parsedParams)) {
      type Param = NonNullable<ApiDetails['parameters']>['query']

      const currentParmas = form.getFieldValue(['parameters', 'query']) as Param

      let newQueryParmas: Param = parsedParams

      if (Array.isArray(currentParmas)) {
        newQueryParmas = parsedParams.reduce((acc, item) => {
          const target = acc.find(({ name }) => name === item.name)

          if (!target) {
            acc.push(item)
          }

          return acc
        }, currentParmas)
      }

      form.setFieldValue(['parameters', 'query'], newQueryParmas)

      if (!msgKey.current) {
        msgKey.current = '__'
      }

      messageApi.info({
        key: msgKey.current,
        content: (
          <span>
            路径中&nbsp;Query&nbsp;参数已自动提取，并填充到下方<strong>请求参数</strong>的&nbsp;
            <strong>Param</strong>&nbsp;中
          </span>
        ),
        duration: 3,
        onClose: () => {
          msgKey.current = undefined
        },
      })
    }
  }

  return (
    <Form<ApiDetails>
      className="flex h-full flex-col"
      form={form}
      onFinish={(values) => {
        handleFinish(values)
      }}
    >
      <div className="flex items-center px-tabContent py-3">
        <Space.Compact className="flex-1">
          <Form.Item noStyle name="method">
            <Select
              showSearch
              className="min-w-[110px]"
              options={methodOptions}
              popupClassName="!min-w-[120px]"
            />
          </Form.Item>
          <Form.Item noStyle name="path">
            <PathInput
              onParseQueryParams={handleParseQueryParams}
              onValueChange={handlePathChange}
            />
          </Form.Item>
        </Space.Compact>

        <Space className="ml-auto pl-2">
          <Button loading={loading} type="primary" onClick={() => send(form.getFieldsValue())}>
            发送
          </Button>
          <Button
            onClick={() => {
              handleFinish(form.getFieldsValue(), true)
            }}
          >
            暂存
          </Button>
          <Button
            htmlType="submit"
            onClick={() => {
              handleSaveCase(form.getFieldsValue(), true)
            }}
          >
            保存为用例
          </Button>
        </Space>
      </div>

      <div className="flex-1 overflow-y-auto p-tabContent">
        <Form.Item noStyle name="parameters">
          <ParamsRunTab />
        </Form.Item>

        <GroupTitle className="mb-3 mt-8">返回响应</GroupTitle>
        <Form.Item noStyle name="responses">
          <RunResponse />
        </Form.Item>
      </div>
    </Form>
  )
}
