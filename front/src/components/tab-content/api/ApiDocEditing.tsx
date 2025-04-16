import { useEffect, useRef, useState } from "react";

import { Button, Form, type FormProps, message, Select, type SelectProps, Space } from 'antd'
import { nanoid } from 'nanoid'
// eslint-disable-next-line import/no-unresolved
import { ApiDetail, ApiDetailCreate, ApiDetailUpdate, ApiTreeQueryPage } from "@/api/ams/api";

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { InputUnderline } from '@/components/InputUnderline'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { ResponseTab } from '@/components/tab-content/api/components/ResponseTab'
import { HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useMenuTabContext, useMenuTabHelpers, } from "@/contexts/menu-tab-settings";
import { initialCreateApiDetailsData } from '@/data/remote'
import { MenuItemType, ParamType } from '@/enums'
import type { ApiDetails } from '@/types'

import { BaseFormItems } from './components/BaseFormItems'
import { GroupTitle } from './components/GroupTitle'
import { PathInput, type PathInputProps } from './components/PathInput'
import { ParamsTab } from './params/ParamsTab'
import type { ApiTabItem } from "@/components/ApiTab";


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
 * API 「修改文档」部分。
 */
export function ApiDocEditing({ activeKey,setActiveKey }: { activeKey: string,setActiveKey: (key:string)=>void }) {
  const [form] = Form.useForm<ApiDetails>()
  const { messageApi } = useGlobalContext()
  const msgKey = useRef<string>()
  const { setTabItemEditStatus } = useMenuTabHelpers()
  const { tabData} = useTabContentContext()
  const  [loading,setLoading]=useState(false)
  const { setMenuRawList } = useMenuHelpersContext()
  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create
  const loadingApiDetails = async (id: string) => {
    try {
      if (id) {
        const response = await ApiDetail(id)
        if (response.data.success) {

          const menuData = response.data.data
          const apiDetails = menuData.data
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          form.setFieldsValue(apiDetails)
          console.log('menuData',apiDetails)
          }

        }

    } catch (error) {
      console.error('加载 API 详情失败:', error)
    }

  }
  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      if (activeKey === 'docEdit'){
        loadingApiDetails(tabData.key)
      }

    }
  }, [activeKey, isCreating, tabData.key])
  const loadingMenuTree = async (projectId: string) => {
    const response = await ApiTreeQueryPage({ projectId })
    if (response.data.success && setMenuRawList) {
      setMenuRawList(response.data?.data)
    }
  }

  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      loadingApiDetails(tabData.key)
    }
  }, [form,isCreating, tabData.key])


  const createApiForm = async (values) => {
    setLoading(true)

    const formData = new FormData()
    // 添加普通字段
    formData.append('id', '')
    formData.append('method', values.data.method || 'GET')
    formData.append('path', values.data.path || '')
    formData.append('name', values.data.name || '')
    formData.append('status', values.data.status)
    formData.append('responsible', values.data.responsible || '')
    formData.append('tags', values.data.tags || [])
    formData.append('description', values.data.description || '')
    formData.append('serverId', values.data.serverId || '')
    formData.append('parameters', JSON.stringify(values.data.parameters))
    formData.append('responses', JSON.stringify(values.data.responses|| []))
    // formData.append('authorization', JSON.stringify(values.data.authorization || {"type":"NoneAuth","data":{}}))
    // formData.append(
    //   'requestBody',
    //   JSON.stringify(values.data.requestBody || { type: 'none', parameters: [], jsonSchema: '' })
    // )
    formData.append('responseExamples', JSON.stringify(values.data.responseExamples || []))

    const response = await ApiDetailCreate(formData)
    console.log('response.data.data.id', response.data.data.id)
    if (response.data.success) {
      message.success(response.data.message)
      loadingMenuTree("22")
      loadingApiDetails(response.data.data.id)

    }
    setLoading(false)
  }
  const updateApiForm = async (values) => {
    setLoading(true)

    const formData = new FormData()
    // 添加普通字段
    formData.append('id', values.id)
    formData.append('method', values.data.method || 'GET')
    formData.append('path', values.data.path || '')
    formData.append('name', values.data.name || '')
    formData.append('status', values.data.status)
    formData.append('responsible', values.data.responsible || '')
    formData.append('tags', values.data.tags || [])
    formData.append('description', values.data.description || '')
    formData.append('serverId', values.data.serverId || '')
    formData.append('parameters', JSON.stringify(values.data.parameters))
    formData.append('responses', JSON.stringify(values.data.responses|| []))
    // formData.append('authorization', JSON.stringify(values.data.authorization || {"type":"NoneAuth","data":{}}))
    // formData.append(
    //   'requestBody',
    //   JSON.stringify(values.data.requestBody || { type: 'none', parameters: [], jsonSchema: '' })
    // )
    formData.append('responseExamples', JSON.stringify(values.data.responseExamples || []))

    const response = await ApiDetailUpdate(formData)
    console.log('response.data.data.id', response.data.data.id)
    if (response.data.success) {
      message.success(response.data.message)
      loadingMenuTree("22")
      loadingApiDetails(response.data.data.id)
    }
    setLoading(false)

  }
  const handleFinish: FormProps<ApiDetails>['onFinish'] = async (values) => {
    const menuName = values.name || DEFAULT_NAME

    console.log('handleFinishValues', JSON.stringify(values))
    if (isCreating) {
      const menuItemId = values.id
      const menuItemData = {
        id: menuItemId,
        name: menuName,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
      }
      console.log('创建menuItemData',JSON.stringify(menuItemData))
      createApiForm(menuItemData)



    } else {
      const menuItemData = {
        id: tabData.key,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
      }
      console.log('更新 menuItemData', JSON.stringify(menuItemData))

      updateApiForm(menuItemData)

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
        console.log('提交的表单数据:', values)

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
          <Button loading={loading} htmlType="submit" type="primary">
            保存
          </Button>

          {!isCreating && (
            <>
              <Button
                onClick={() => { setActiveKey('run'); }}
              >运行</Button>
              <ApiRemoveButton tabKey={tabData.key} />
            </>
          )}
        </Space>
      </div>

      <div className="flex-1 overflow-y-auto p-tabContent">
        <Form.Item noStyle name="name">
          <InputUnderline placeholder={DEFAULT_NAME} />
        </Form.Item>

        <div className="pt-2">
          <BaseFormItems />
        </div>

        <GroupTitle className="mt-2">请求参数</GroupTitle>
        <Form.Item noStyle name="parameters">
          <ParamsTab />
        </Form.Item>

        <GroupTitle className="mb-3 mt-8">返回响应</GroupTitle>
        <Form.Item noStyle name="responses">
          <ResponseTab />
        </Form.Item>
      </div>
    </Form>
  )
}
