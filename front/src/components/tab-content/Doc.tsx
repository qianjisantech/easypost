import { useEffect, useState } from 'react'

import { Viewer } from '@bytemd/react'
import { Button, Space, theme } from 'antd'

import { ApiTreeQueryPage, DocDetail, DocSave } from "@/api/am";
import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { InputUnderline } from '@/components/InputUnderline'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { MenuItemType } from '@/enums'
import type { ApiDoc } from '@/types'
import { usePathname } from "next/navigation";

const DEFAULT_DOC_NAME = '未命名文档'

export function Doc() {
  const { token } = theme.useToken()
  const { setMenuRawList } = useMenuHelpersContext()
  const { messageApi } = useGlobalContext()
  const { addMenuItem, updateMenuItem } = useMenuHelpersContext()
  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()
  const pathname = usePathname()
  const [docValue, setDocValue] = useState<ApiDoc | undefined>(undefined)
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const loadingMenuTree = async () => {
    if (pathname) {
      const match = pathname.match(/project\/([^/]+)/)
      if (match) {
        const projectId = match[1]
        const response = await ApiTreeQueryPage({ projectId:projectId })
        if (response.data.success && setMenuRawList) {
          setMenuRawList(response.data?.data)
        }
      }
    }

  }
  const fetchDoc = async (id:string) => {
    setLoading(true)
    try {
      const response = await DocDetail(id)

      if (response.data.success) {
        setDocValue(response.data.data)
        setContent(response.data.data.content || '') // Sync content with the document data
      } else {
        messageApi.error('获取文档失败，原因：' + response.data.message)
      }
    } catch (error) {
      console.error(error)
      messageApi.error('获取文档失败', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tabData.key && !isCreating) {
      fetchDoc(tabData.key)
    }
  }, [tabData.key, messageApi])

  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create
  const [editing, setEditing] = useState(isCreating)

  const docSave = async (values) => {
    const response = await DocSave(values)
    if (response.data.success) {
      messageApi.success(response.data.message)
      setEditing(false)
      fetchDoc(response.data.data.id)
      loadingMenuTree()
    }

  }

  if (loading) {
    return <div>加载中...</div>
  }

  if (editing) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center px-tabContent py-2" style={{ gap: `${token.padding}px` }}>
          <InputUnderline
            placeholder={DEFAULT_DOC_NAME}
            style={{ fontWeight: 'bold', fontSize: '18px' }}
            value={docValue?.name || ''}
            onChange={(ev) => {
              setDocValue((prev) => ({
                ...prev,
                name: ev.target.value,
              }))
            }}
          />
          <Space>
            {!isCreating && (
              <Button
                onClick={() => {
                  setEditing(false)
                }}
              >
                退出编辑
              </Button>
            )}
            <Button
              type="primary"
              onClick={() => {
                const values = {
                  id: docValue?.id || '',
                  name: docValue?.name || DEFAULT_DOC_NAME,
                  content: content,
                }
                if (isCreating) {
                  addMenuItem({
                    id: values.id,
                    name: values.name || DEFAULT_DOC_NAME,
                    type: MenuItemType.Doc,
                    data: values,
                  })
                  addTabItem(
                    {
                      key: '',
                      label: docValue?.name || DEFAULT_DOC_NAME,
                      contentType: MenuItemType.Doc,
                    },
                    { replaceTab: tabData.key }
                  )
                } else {
                  updateMenuItem({
                    id: values.id,
                    name: values.name,
                    data: values,
                  })
                }
                docSave(values)
              }}
            >
              保存
            </Button>
          </Space>
        </div>

        <div className="flex-1 overflow-y-auto">
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
      </div>
    )
  }

  // 在非编辑状态下渲染文档内容
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center px-tabContent py-2">
        <div className="flex-1 text-lg font-bold">{docValue?.name}</div>
        <Button
          onClick={() => {
            setEditing(true)
          }}
        >
          编辑
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto" style={{ maxWidth: '1512px', padding: `${token.padding}px` }}>
          {/* 渲染包含 HTML 标签的内容 */}
          <Viewer value={docValue?.content || ''} />
        </div>
      </div>
    </div>
  )
}
