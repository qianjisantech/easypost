// components/EnvironmentManager.tsx
import type React from 'react'
import { useEffect, useState } from 'react'

import {
  CloudServerOutlined,
  CodeOutlined,
  ExperimentOutlined,
  GlobalOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Button, Card, ConfigProvider, Form, Input, Menu, message, Modal, Select, Tooltip } from "antd";
import zhCN from 'antd/lib/locale/zh_CN'

import { EnvironmentManageDetail, EnvironmentManageSave } from '@/api/ams/environmentmanage'
import type { EnvironmentManagement, EnvironmentSetting } from "@/types";
import EnvironmentSettingsMenu from './EnvironmentSettingsMenu'
import GlobalParameter from './GlobalParameter'
import GlobalVariable from './GlobalVariable'
import { nanoid } from "nanoid";
import EnvironmentSettingsContent from "@/components/EnvManagement/EnvironmentSettingsContent";



// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EnvironmentManagerProps {
}

const EnvironmentManager: React.FC<EnvironmentManagerProps> = () => {
  type TabKey = 'globalVariable' | 'globalParameter' | 'environmentSettings';

// 2. 修改状态初始化
  const [activeTab, setActiveTab] = useState<TabKey>('globalVariable');

  const [activeEnvId, setActiveEnvId] = useState<string>();
  const [currentEnv, setCurrentEnv] = useState<string | undefined>('')
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
  const [isCreating, setIsCreating] = useState(false);
  const [environmentSettings, setEnvironmentSettings] = useState<EnvironmentManagement['environmentSettings']>([]);
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
        setCurrentEnv(response.data.data.environmentSettings[0].name)
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
    if (isCreating) {
      // 创建新环境
      const newEnv = {
        id: Date.now().toString(),
        name: activeEnv?.name || '',
        type: activeEnv?.type || 'dev',
        url: activeEnv?.url || '',
        services: activeEnv?.services || [],
        variables: activeEnv?.variables || []
      };
      setEnvironmentSettings([...environmentSettings, newEnv]);
      setActiveEnvId(newEnv.id);
    }
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
    loadEnvironmentManager()
  }, [modalState.visible])
// 在 EnvironmentManager.tsx 中添加

  // const handleDeleteEnvironment = (envId: string) => {
  //   setEnvironmentManagement(prev => ({
  //     ...prev,
  //     environmentSettings: prev?.environmentSettings?.filter(env => env.id !== envId) || []
  //   }));
  //
  //   // 如果删除的是当前选中的环境，清空选择
  //   if (modalState.subTab === envId) {
  //     setModalState(prev => ({
  //       ...prev,
  //       subTab: undefined
  //     }));
  //   }
  // };

  // 合并自定义配置和默认配置
  useEffect(() => {
    if (
      environmentManagement?.environmentSettings &&
      environmentManagement.environmentSettings.length > 0
    ) {
      setEnvConfigs(environmentManagement.environmentSettings)
    } else  {
      setEnvConfigs(environmentManagement?.environmentSettings)
    }
  }, [environmentManagement?.environmentSettings])
  const activeEnv = environmentManagement?.environmentSettings.find(env => env.id === activeEnvId);
  const handleMenuClick = (key: string) => {
    if (key === 'create-new-environment') {
      // 创建新环境
      const newEnv = {
        id: Date.now().toString(),
        type: 'new',
        name: '新环境',
        url: ''
      };
      setEnvironments([...environments, newEnv]);
      setActiveEnvId(newEnv.id);
    } else {
      setActiveEnvId(key);
    }
  };

  const handleSettingChange = (updatedSetting: any) => {
    setEnvironments(environments.map(env =>
      env.id === updatedSetting.id ? updatedSetting : env
    ));
  };

  const handleDelete = (id: string) => {
    setEnvironmentSettings(environmentSettings.filter(env => env.id !== id));
    if (activeEnvId === id) {
      setActiveEnvId(undefined);
    }
  };

  // 管理环境弹窗内容
  const renderContent = (tab: TabKey) => {
    console.log('environmentManagement', environmentManagement)
    switch (tab) {
      case 'globalVariable':
        return (
          <div>
            <h3>全局变量管理</h3>
            <ConfigProvider locale={zhCN}>
              <GlobalVariable
                data={environmentManagement?.globalVariable || { team: [], project: [] }}
                onChange={(newData) => {
                  setEnvironmentManagement(prev => ({
                    ...prev,
                    globalVariable: newData,
                  }));
                }}
              />
            </ConfigProvider>
          </div>
        );
      case 'globalParameter':
        return (
          <div>
            <h3>全局参数管理</h3>
            <ConfigProvider locale={zhCN}>
              <GlobalParameter
                data={environmentManagement?.globalParameter || { header: [], query: [], body: [], cookie: [] }}
                onChange={(newData) => {
                  setEnvironmentManagement(prev => ({
                    ...prev,
                    globalParameter: newData,
                  }));
                }}
              />
            </ConfigProvider>
          </div>
        );
      case 'environmentSettings':
       return (
        <div style={{ flex: 1, padding: '24px' }}>
          <Card>
            <EnvironmentSettingsContent
              setting={activeEnv}
              isCreating={isCreating}
              onSettingChange={(updated) => {
                if (isCreating) {
                  // 暂存新建环境的数据
                } else {
                  // 更新现有环境
                  setEnvironmentSettings(environmentSettings.map(env =>
                    env.id === updated.id ? updated : env
                  ));
                }
              }}
              onSave={() => {
                if (isCreating) {
                  // 创建新环境
                  const newEnv = {
                    id: nanoid(),
                    name: form.getFieldValue('name'),
                    type: form.getFieldValue('type'),
                    url: form.getFieldValue('url'),
                    services,
                    variables
                  };
                  setEnvironments([...environments, newEnv]);
                  setActiveEnvId(newEnv.id);
                }
                setIsCreating(false);
              }}
              onCancel={() => {
                setIsCreating(false);
                if (environments.length > 0) {
                  setActiveEnvId(environments[0].id);
                }
              }}
            />
          </Card>
        </div>
       )
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
    const selectedEnv = envConfigs.find((env) => env.id === value)
    if (selectedEnv) {
      message.success(`已切换到${selectedEnv.name}`)
    }
  }
  const handleAddEnvironment = () => {
    const newEnv: { servers: any[]; name: string; globalVariable: any[]; id: string; type: string; url: string } = {
      id: nanoid(6), // 使用nanoid生成唯一ID
      name: '新环境',
      type: 'custom',
      url: '',
      servers: [],
      globalVariable: []
    };

    setEnvironmentManagement((prev) => ({
      ...prev,
      environmentSettings: [
        ...(prev?.environmentSettings || []),
        newEnv
      ]
    }));

    // 自动选中新创建的环境
    setModalState((prev) => ({
      ...prev,
      subTab: newEnv.id
    }));
  };
// 处理函数示例
// 在父组件中添加以下逻辑
  const handleDeleteEnvironment = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个环境吗？',
      onOk: () => {
        // 1. 删除环境
        const newEnvironments = environmentSettings.filter(env => env.id !== id);
        setEnvironmentSettings(newEnvironments);

        // 2. 如果删除的是当前选中的环境
        if (activeEnvId === id) {
          // 3. 自动定位到第一个环境（如果有）
          if (newEnvironments.length > 0) {
            setActiveEnvId(newEnvironments[0].id);
          } else {
            setActiveEnvId(undefined); // 没有环境时清空选择
          }
        }
      }
    });

  };

  const handleDuplicateEnvironment = (id: string) => {
    // 复制环境逻辑
    const original = environmentSettings.find(env => env.id === id);
    if (original) {
      const newEnv = {
        ...original,
        id: nanoid(),
        name: `${original.name} (副本)`
      };
      setEnvironmentSettings(prev => [...prev, newEnv]);
    }
  };
  const handleEnvironmentSettingsMenuClick = (key: string, env?: EnvironmentSetting) => {
    setActiveEnvId(key);
    setActiveTab('environmentSettings');
  };
  return (
    <div className="environment-manager">
      <Select
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
        defaultValue={currentEnv}
        loading={loading}
        notFoundContent={envConfigs && envConfigs.length === 0 ? '暂无环境配置' : null}
        placeholder="请选择环境"
        style={{ width: 150, marginLeft: 8 }}
        suffixIcon={<SearchOutlined />}
        value={currentEnv}
        onChange={handleEnvChange}

        onDropdownVisibleChange={handleDropdownVisibleChange}
      >
        {envConfigs &&envConfigs.length > 0 ? (
          envConfigs.map((config) => (
            <Select.Option  key={config.id} value={config.id}>
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
              // 确保只处理我们定义的tab key
              if (['globalVariable', 'globalParameter', 'environmentSettings'].includes(e.key)) {
                setActiveTab(e.key as TabKey);
              }
            }}
          >
            <Menu.ItemGroup key="globalSettings" title="全局设置">
              <Menu.Item key="globalVariable" icon={<GlobalOutlined />}>
                全局变量
              </Menu.Item>
              <Menu.Item key="globalParameter" icon={<GlobalOutlined />}>
                全局参数
              </Menu.Item>
              {/*<Menu.Item key="keyStores" icon={<LockOutlined />}>*/}
              {/*  密钥库*/}
              {/*</Menu.Item>*/}
            </Menu.ItemGroup>
            <EnvironmentSettingsMenu
              values={environmentManagement}
              activeKey={activeEnvId}
              onChange={handleEnvironmentSettingsMenuClick}
              onDelete={handleDeleteEnvironment}
              onDuplicate={handleDuplicateEnvironment}
            />
            {/*<Menu.ItemGroup key="mockServices" title="Mock服务">*/}
            {/*  <Menu.Item key="localMock" icon={<DesktopOutlined />}>*/}
            {/*    本地Mock*/}
            {/*  </Menu.Item>*/}
            {/*  <Menu.Item key="cloudMock" icon={<CloudOutlined />}>*/}
            {/*    云端Mock*/}
            {/*  </Menu.Item>*/}
            {/*  <Menu.Item key="selfHostedMock" icon={<ClusterOutlined />}>*/}
            {/*    自托管Mock*/}
            {/*  </Menu.Item>*/}
            {/*</Menu.ItemGroup>*/}
          </Menu>

          {/* 右侧内容区 */}
          <div style={{ flex: 1, padding: '0 24px' }}>{renderContent(activeTab)}</div>
        </div>
      </Modal>
    </div>
  )
}

export default EnvironmentManager
