import { useEffect, useMemo, useState } from "react";

import { Button, ConfigProvider, Tabs, type TabsProps, theme, Tooltip } from 'antd'
import { PanelRightIcon } from 'lucide-react'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { ApiTabContentWrapper } from '@/components/ApiTab/ApiTabContentWrapper'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'
import { ApiRun } from '@/components/tab-content/api/ApiRun'

import { ApiDoc } from './ApiDoc'
import { ApiDocEditing } from './ApiDocEditing'
import { ApiSidePanel } from './ApiSidePanel'

export function Api() {
  const { token } = theme.useToken()

  const { tabData } = useTabContentContext()
  const [activeKey, setActiveKey] = useState('doc') // 添加 activeKey 状态
  const [panelOpen, setPanelOpen] = useState(false)
  // 使用 useEffect 监听 activeKey 变化
  useEffect(() => {
    // 这里可以执行每次 Tab 切换时的初始化逻辑
    console.log(`Tab switched to: ${activeKey}`)
    // 可以根据不同的 Tab key 执行不同的初始化逻辑
    // 例如重置某些状态或重新获取数据
  }, [activeKey])

  const [renderKey, setRenderKey] = useState(0);
  const apiTabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'doc',
        label: '文档',
        children: (
          <ApiTabContentWrapper key={`doc-${renderKey}`}>
            <ApiDoc  activeKey={activeKey} />
          </ApiTabContentWrapper>
        ),
      },
      {
        key: 'docEdit',
        label: '修改文档',
        children: (
          <ApiTabContentWrapper key={`docEdit-${renderKey}`}>
            <ApiDocEditing  activeKey={activeKey}  />
          </ApiTabContentWrapper>
        ),
      },
      {
        key: 'run',
        label: '运行',
        children: (
          <ApiTabContentWrapper  key={`run-${renderKey}`}>
            <ApiRun activeKey={activeKey}/>
          </ApiTabContentWrapper>
        ),
      },
      // {
      //   key: 'advancedMock',
      //   label: '高级Mock',
      //   children: <ApiTabContentWrapper></ApiTabContentWrapper>,
      // },
    ]
  }, [activeKey,renderKey])
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // 每次切换Tab时增加renderKey，强制子组件重新渲染
    setRenderKey(prev => prev + 1);
  };
  return (
    <div className="h-full overflow-hidden">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: token.colorTextSecondary,
              verticalLabelPadding: 0,
            },
            Tabs: {
              itemColor: token.colorTextSecondary,
              horizontalItemPadding: `8px 0`,
              horizontalItemGutter: 6,
            },
          },
        }}
      >
        {tabData.data?.tabStatus === PageTabStatus.Create ? (
          <ApiTabContentWrapper>
            <ApiDocEditing />
          </ApiTabContentWrapper>
        ) : (
          <div className="flex h-full overflow-hidden">
            <Tabs
              animated={false}
              className="api-details-tabs flex-1"
              defaultActiveKey="docEdit"
              items={apiTabItems}
              onChange={handleTabChange}
              tabBarExtraContent={
                <>
                  <Tooltip placement="topLeft" title="历史记录、SEO 设置">
                    <Button
                      size="small"
                      style={{
                        backgroundColor: panelOpen ? token.colorFillSecondary : undefined,
                      }}
                      type="text"
                      onClick={() => {
                        setPanelOpen(!panelOpen)
                      }}
                    >
                      <IconText icon={<PanelRightIcon size={18} />} />
                    </Button>
                  </Tooltip>
                </>
              }

            />

            <ApiSidePanel
              open={panelOpen}
              onClose={() => {
                setPanelOpen(false)
              }}
            />
          </div>
        )}
      </ConfigProvider>
    </div>
  )
}
