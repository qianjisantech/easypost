// components/EnvironmentManager.tsx
import type React from 'react'
import { useEffect, useState } from 'react'

import {
  CloudOutlined,
  CloudServerOutlined,
  ClusterOutlined,
  CodeOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  GlobalOutlined,
  LockOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Menu, message, Modal, Select, Tooltip } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import { EnvironmentManageDetail, EnvironmentManageSave } from '@/api/environmentmanage'
import type { EnvironmentManagement, EnvironmentSetting } from "@/types";
import EnvironmentSettingsMenu from './EnvironmentSettingsMenu'
import GlobalParameter from './GlobalParameter'
import GlobalVariable from './GlobalVariable'
import { nanoid } from "nanoid";



interface EnvironmentManagerProps {
  initialEnv?: string
  onEnvChange?: (envKey: string) => void
  values?: EnvironmentSetting[]
}

const EnvironmentManager: React.FC<EnvironmentManagerProps> = ({
  initialEnv,
  onEnvChange,
                                                                 values,
}) => {
  const [currentEnv, setCurrentEnv] = useState<string | undefined>(initialEnv)
  const [modalState, setModalState] = useState({
    visible: false,
    tab: 'globalVariable' as
      | 'globalVariable'
      | 'globalParameter'
      | 'environmentSettings'
      | 'keyStores'
      | 'localMock'
      | 'cloudMock'
      | 'selfHostedMock',
  })
  const [environmentManagement, setEnvironmentManagement] = useState<EnvironmentManagement | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [envConfigs, setEnvConfigs] = useState<EnvironmentSetting[]>([])
  const [saving, setSaving] = useState(false)
  // 加载环境管理数据
  const loadEnvironmentManager = async () => {
    setLoading(true)
    try {
      const response = await EnvironmentManageDetail('22')
      if (response.data.success) {
        setEnvironmentManagement(response.data.data)
        setEnvConfigs(response.data.data.environmentSettings)
        // // 如果API返回了环境配置，使用API的数据
        // if (response.data.data?.environments) {
        //   setEnvConfigs(response.data.data.environments);
        // }
      }
    } catch (error) {
      message.error('加载环境配置失败')
      console.error('加载环境配置失败:', error)
    } finally {
      setLoading(false)
    }
  }
  const handleDropdownVisibleChange = (open: boolean) => {
     if (open){
       loadEnvironmentManager()
     }
  };

  // 保存环境配置
  const handleEnvironmentManageSave = async () => {
    setSaving(true)
    try {
      const formdata = new FormData()
      formdata.append('id', '22')
      formdata.append('globalParameter', JSON.stringify(environmentManagement?.globalParameter))
      formdata.append('globalVariable', JSON.stringify(environmentManagement?.globalVariable))
      formdata.append('keyStores', JSON.stringify(environmentManagement?.keyStores))
      formdata.append(
        'environmentSettings',
        JSON.stringify(environmentManagement?.environmentSettings)
      )
      formdata.append('localMock', JSON.stringify(environmentManagement?.localMock))
      formdata.append('cloudMock', JSON.stringify(environmentManagement?.cloudMock))
      formdata.append('selfHostMock', JSON.stringify(environmentManagement?.selfHostMock))
      console.log('保存环境配置数据:', formdata)
      const response = await EnvironmentManageSave(formdata)

      if (response.data.success) {
        message.success('保存成功')
        setModalState((prev) => ({ ...prev, visible: false }))
      } else {
        message.error(response.data.message || '保存失败')
      }
      loadEnvironmentManager()
    } catch (error) {
      message.error('保存失败')
      console.error('保存环境配置失败:', error)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (modalState.visible){
      loadEnvironmentManager()
    }

  }, [modalState.visible])
// 在 EnvironmentManager.tsx 中添加

  const handleDeleteEnvironment = (envId: string) => {
    setEnvironmentManagement(prev => ({
      ...prev,
      environmentSettings: prev?.environmentSettings?.filter(env => env.id !== envId) || []
    }));

    // 如果删除的是当前选中的环境，清空选择
    if (modalState.subTab === envId) {
      setModalState(prev => ({
        ...prev,
        subTab: undefined
      }));
    }
  };

  // 合并自定义配置和默认配置
  useEffect(() => {
    if (values && values.length > 0) {
      setEnvConfigs(values)
    } else  {
      setEnvConfigs(environmentManagement?.environmentSettings)
    }
  }, [values])

  // 管理环境弹窗内容
  const renderContent = () => {
    console.log('environmentManagement', environmentManagement)
    switch (modalState.tab) {
      case 'globalVariable':
        return (
          <div>
            <h3>全局变量管理</h3>
            <ConfigProvider locale={zhCN}>
              <GlobalVariable
                data={environmentManagement?.globalVariable || { team: [], project: [] }}
                onChange={(newData) => {
                  setEnvironmentManagement((prev) => ({
                    ...prev,
                    globalVariable: newData,
                  }))
                }}
              />
            </ConfigProvider>
          </div>
        )
      case 'globalParameter':
        return (
          <div>
            <h3>全局变量管理</h3>
            <ConfigProvider locale={zhCN}>
              <GlobalParameter
                data={environmentManagement?.globalParameter || { header: [], query: [],body: [], cookie: []}}
                onChange={(newData) => {
                  setEnvironmentManagement((prev) => ({
                    ...prev,
                    globalParameter: newData,
                  }))
                }}
              />
            </ConfigProvider>
          </div>
        )
      case 'environmentSettings':
        // const currentSetting = environmentManagement?.environmentSettings?.find(
        //   env => env.id === modalState.tab
        // );
        //
        // return (
        //   <div style={{ display: 'flex', minHeight: 400 }}>
        //     <div style={{ display: 'flex', flexDirection: 'column', width: 220 }}>
        //       <EnvironmentSettingsMenu
        //         settings={environmentManagement?.environmentSettings || []}
        //         activeKey={modalState.tab}
        //         onMenuClick={(envId) => {
        //           setModalState(prev => ({
        //             ...prev,
        //             subTab: envId
        //           }));
        //         }}
        //         style={{ flex: 1, borderRight: '1px solid #f0f0f0' }}
        //       />
        //       <Button
        //         type="primary"
        //         onClick={handleAddEnvironment}
        //         style={{ margin: 16 }}
        //       >
        //         添加环境
        //       </Button>
        //     </div>

            {/*<div style={{ flex: 1, padding: '0 24px' }}>*/}
            {/*  <EnvironmentSettingsContent*/}
            {/*    setting={currentSetting}*/}
            {/*    onSettingChange={(newSetting) => {*/}
            {/*      setEnvironmentManagement(prev => ({*/}
            {/*        ...prev,*/}
            {/*        environmentSettings: prev?.environmentSettings?.map(env =>*/}
            {/*          env.id === newSetting.id ? newSetting : env*/}
            {/*        )*/}
            {/*      }));*/}
            {/*    }}*/}
            {/*    onDelete={handleDeleteEnvironment}*/}
            {/*  />*/}
            {/*</div>*/}
          // </div>
        // );
      case 'keyStores':
        return (
          <div>
            <h3>密钥库管理</h3>

            <p>安全存储和管理敏感信息</p>
          </div>
        )
      case 'localMock':
        return (
          <div>
            <h3>本地Mock服务</h3>
            <p>配置本地模拟接口服务</p>
          </div>
        )
      case 'cloudMock':
        return (
          <div>
            <h3>云端Mock服务</h3>
            <p>连接云端模拟接口服务</p>
          </div>
        )
      case 'selfHostedMock':
        return (
          <div>
            <h3>自托管Mock服务</h3>
            <p>管理自建的Mock服务配置</p>
          </div>
        )
      default:
        return null
    }
  }
  // 获取环境图标
  const getEnvironmentIcon = (type: string) => {
    switch (type) {
      case 'dev':
        return <CodeOutlined />
      case 'test':
        return <ExperimentOutlined />
      case 'prod':
        return <CloudServerOutlined />
      default:
        return <CloudServerOutlined />
    }
  }
  const handleEnvChange = (value: string) => {
    setCurrentEnv(value)
    if (onEnvChange) {
      onEnvChange(value)
    }
    const selectedEnv = envConfigs.find((env) => env.id === value)
    if (selectedEnv) {
      message.success(`已切换到${selectedEnv.name}`)
    }
  }
  const handleAddEnvironment = () => {
    const newEnv: EnvironmentSetting = {
      id: nanoid(6), // 使用nanoid生成唯一ID
      name: '新环境',
      type: 'custom',
      url: '',
      servers: [],
      globalVariable: []
    };

    setEnvironmentManagement(prev => ({
      ...prev,
      environmentSettings: [
        ...(prev?.environmentSettings || []),
        newEnv
      ]
    }));

    // 自动选中新创建的环境
    setModalState(prev => ({
      ...prev,
      subTab: newEnv.id
    }));
  };
// 处理菜单点击事件
  const handleEnvironmentSettingsMenuClick = (key: string) => {
    if (key === 'create-new-environment') {
      handleAddEnvironment();
    } else {
      setModalState(prev => ({
        ...prev,
        subTab: key
      }));
    }
  };
  return (
    <div className="environment-manager">
      <Select
        onDropdownVisibleChange={handleDropdownVisibleChange}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div style={{ padding: '1px', borderTop: '1px solid #f0f0f0', marginTop: 4 }}>
              <Button
                icon={<SettingOutlined />}
                size="small"
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalState(prev => ({
                    ...prev,
                    visible: true,
                    tab: 'environmentSettings' // 默认打开环境配置标签
                  }));
                }}
              >
                管理环境
              </Button>
            </div>
          </>
        )}
        loading={loading}
        placeholder="请选择环境"
        style={{ width: 150, marginLeft: 8 }}
        suffixIcon={<SearchOutlined />}
        value={currentEnv}
        onChange={handleEnvChange}

        notFoundContent={envConfigs && envConfigs.length === 0 ? '暂无环境配置' : null}
      >
        {envConfigs &&envConfigs.length > 0 ? (
          envConfigs.map((config) => (
            <Select.Option key={config.id} value={config.id}>
              <Tooltip
                mouseEnterDelay={0.3}
                placement="right"
                title={config.name}
              >
                <span>{config.name}</span>
              </Tooltip>
            </Select.Option>
          ))
        ) : (
          <Select.Option key="no-env" disabled value="no-env">
            暂无环境配置
          </Select.Option>
        )}
      </Select>
      {/* 环境管理弹窗 */}
      <Modal
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setModalState((prev) => ({ ...prev, visible: false }))
            }}
          >
            关闭
          </Button>,
          <Button key="save" loading={saving} type="primary" onClick={handleEnvironmentManageSave}>
            保存
          </Button>,
        ]}
        open={modalState.visible}
        style={{ maxWidth: '100vw' }}
        title="环境管理"
        width={1200}
        onCancel={() => {
          setModalState((prev) => ({ ...prev, visible: false }))
        }}
      >
        <div style={{ display: 'flex', minHeight: 400 }}>
          {/* 左侧菜单 */}
          <Menu
            mode="inline"
            selectedKeys={[modalState.tab]}
            style={{ width: 220, borderRight: '1px solid #f0f0f0' }}
            onClick={(e) => {
              setModalState((prev) => ({ ...prev, tab: e.key as typeof modalState.tab }))
            }}
          >
            <Menu.ItemGroup key="globalSettings" title="全局设置">
              <Menu.Item key="globalVariable" icon={<GlobalOutlined />}>
                全局变量
              </Menu.Item>
              <Menu.Item key="globalParameter" icon={<GlobalOutlined />}>
                全局参数
              </Menu.Item>
              <Menu.Item key="keyStores" icon={<LockOutlined />}>
                密钥库
              </Menu.Item>
            </Menu.ItemGroup>
            <EnvironmentSettingsMenu
              values={environmentManagement?.environmentSettings || []}
              activeKey={modalState.tab}
              onMenuClick={handleEnvironmentSettingsMenuClick}
            />
            <Menu.ItemGroup key="mockServices" title="Mock服务">
              <Menu.Item key="localMock" icon={<DesktopOutlined />}>
                本地Mock
              </Menu.Item>
              <Menu.Item key="cloudMock" icon={<CloudOutlined />}>
                云端Mock
              </Menu.Item>
              <Menu.Item key="selfHostedMock" icon={<ClusterOutlined />}>
                自托管Mock
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>

          {/* 右侧内容区 */}
          <div style={{ flex: 1, padding: '0 24px' }}>{renderContent()}</div>
        </div>
      </Modal>
    </div>
  )
}

export default EnvironmentManager
