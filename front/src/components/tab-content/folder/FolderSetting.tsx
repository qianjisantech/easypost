import { useEffect, useMemo } from 'react'

import { Button, Form, Input, message } from 'antd'

import { FolderDetail, FolderDetailSave } from '@/api/folder'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { SelectorCatalog } from '@/components/SelectorCatalog'
import { SelectorService } from '@/components/SelectorService'
import { ROOT_CATALOG, SERVER_INHERIT } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { MenuItemType } from '@/enums'
import type { ApiFolder } from '@/types'

export function FolderSetting() {
  const { tabData } = useTabContentContext()

  const [form] = Form.useForm<ApiFolder>()

  const fetchFolderDetail = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response = await FolderDetail(tabData.key)
    if (response.data.success) {
      form.setFieldsValue({
        id: response.data.data.id,
        name: response.data.data.name,
        parentId: response.data.data.parentId || ROOT_CATALOG,
        serverId: response.data.data.serverId || SERVER_INHERIT,
        description: response.data.data.description,
      })
    }
  }
  const createFolderDetail = async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response = await FolderDetailSave(values)
    if (response.data.success) {
      message.success(response.data.message)
    }
  }

  useEffect(() => {
    fetchFolderDetail()
  }, [form])

  return (
    <div className="max-w-2xl">
      <Form
        colon={false}
        form={form}
        labelCol={{ span: 6 }}
        onFinish={(values) => {
          createFolderDetail({
            ...values,
            id: tabData.key,
          })

          // updateMenuItem({ ...values, id: apiFolder.id })
        }}
      >
        <Form.Item
          label="目录名称"
          name="name"
          rules={[{ required: true, message: '目录名称不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="父级目录" name="parentId" required={false} rules={[{ required: true }]}>
          <SelectorCatalog
            exclued={form.id ? [form.id] : undefined}
            type={MenuItemType.ApiDetailFolder}
          />
        </Form.Item>

        <Form.Item
          label="服务（前置URL）"
          name="serverId"
          tooltip="指定服务后，该目录下的所有接口，运行时都会使用该服务对应的 “前置 URL”（在环境里设置）。"
        >
          <SelectorService />
        </Form.Item>

        <Form.Item label="备注" name="description">
          <Input.TextArea placeholder="如需展示在发布的文档中，请在“文档” Tab 里编辑" rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
