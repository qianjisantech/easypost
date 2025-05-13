// components/EnvironmentManager.tsx
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import {
  CloudOutlined,
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Select,
  Table,
  Tooltip,
} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { isEqual } from 'lodash-es'
import { nanoid } from 'nanoid'

import { EnvironmentManageDetail, EnvironmentManageSave } from '@/api/ams/environmentmanage'
import EnvironmentCustomContent from '@/components/EnvManagement/EnvironmentCustomContent'
import type { EnvironmentManagement, EnvironmentSetting } from '@/types'

import GlobalParameter from './GlobalParameter'
import GlobalVariable from './GlobalVariable'

import { css } from '@emotion/css'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EnvironmentManagerProps {}

const EnvironmentManager: React.FC<EnvironmentManagerProps> = () => {
  const [form] = Form.useForm() // 在组件顶部添加表单实例
  const [currentEnvData, setCurrentEnvData] = useState<EnvironmentSetting | null>(null)
  const [activeEnvId, setActiveEnvId] = useState<string>('')
  const [currentEnv, setCurrentEnv] = useState<string | undefined>('')
  type ModalTab =
    | 'globalVariable'
    | 'globalParameter'
    | 'environmentSettings'
    | 'keyStores'
    | 'localMock'
    | 'cloudMock'
    | 'selfHostedMock'

  const [modalState, setModalState] = useState<{
    visible: boolean
    tab: ModalTab
  }>({
    visible: false,
    tab: 'globalVariable',
  })
  const [environmentManagement, setEnvironmentManagement] = useState<EnvironmentManagement | null>(
    null
  )
  const [environmentSettings, setEnvironmentSettings] = useState<
    EnvironmentManagement['environmentSettings']
  >([])
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  // 加载环境管理数据
  // 优化环境数据加载
  const loadEnvironmentManager = async () => {
    setLoading(true)
    try {
      const response = await EnvironmentManageDetail()
      if (response.data?.success) {
        const data = response.data.data
        setEnvironmentManagement(data)
        const settings = data.environmentSettings || []
        setEnvironmentSettings(settings)

        // 设置当前环境时添加null检查

        if (settings.length > 0) {
          setCurrentEnv(settings.find((env) => env.isActive)?.name || settings[0]?.name || '')
          setActiveEnvId(settings.find((env) => env.isActive)?.id || settings[0]?.id || '')
        }
      }
    } catch (error) {
      message.error('加载环境配置失败')
      console.error('加载环境配置失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDropdownVisibleChange = (open: boolean) => {
    if (open) {
      loadEnvironmentManager()
    }
  }
  useEffect(() => {
    let newEnvData: EnvironmentSetting | null = null

    if (isCreating) {
      newEnvData = {
        id: activeEnvId,
        name: '',
        isActive: true,
        servers: [],
        variables: [],
      }
    } else {
      newEnvData = environmentSettings.find((env) => env.id === activeEnvId) ?? null
    }

    // 使用深比较避免不必要的更新
    if (!isEqual(newEnvData, currentEnvData)) {
      setCurrentEnvData(newEnvData)

      // 更新表单值
      if (newEnvData) {
        form.resetFields()
        form.setFieldsValue(newEnvData)
      }
    }
  }, [isCreating, activeEnvId, environmentSettings, form, currentEnvData])
  const handleEnvironmentManageSave = async () => {
    try {
      setSaving(true)

      // 确保 environmentSettings 是数组
      const currentSettings = Array.isArray(environmentSettings) ? environmentSettings : []

      // 创建要保存的设置
      let settingsToSave: EnvironmentSetting[]

      if (isCreating) {
        // 新建环境：添加到现有列表
        settingsToSave = [...currentSettings, currentEnvData]
      } else {
        // 更新现有环境
        settingsToSave = currentSettings.map((env) =>
          env.id === currentEnvData.id ? currentEnvData : env
        )
      }

      // 调试日志
      console.log('准备保存的环境设置:', settingsToSave)

      // 创建可序列化的数据副本
      const serializableSettings = settingsToSave.map((env) => ({
        id: env.id,
        name: env.name,
        servers: env.servers || [],
        variables: env.variables || [],
        isActive: env.isActive || false,
      }))

      const formdata = new FormData()
      formdata.append('id', environmentManagement?.id || '')
      formdata.append(
        'globalParameter',
        JSON.stringify(environmentManagement?.globalParameter || {})
      )
      formdata.append('globalVariable', JSON.stringify(environmentManagement?.globalVariable || {}))
      formdata.append('environmentSettings', JSON.stringify(serializableSettings))
      formdata.append('keyStores', JSON.stringify(environmentManagement?.keyStores || {}))
      formdata.append('localMock', JSON.stringify(environmentManagement?.localMock || {}))
      formdata.append('cloudMock', JSON.stringify(environmentManagement?.cloudMock || {}))
      formdata.append('selfHostMock', JSON.stringify(environmentManagement?.selfHostMock || {}))

      const response = await EnvironmentManageSave(formdata)

      if (response.data?.success) {
        await loadEnvironmentManager()
        message.success('保存成功')
        setIsCreating(false) // 保存成功后取消创建状态
      } else {
        message.error(response.data?.message || '保存失败')
      }
    } catch (error) {
      console.error('保存环境配置失败:', error)
      message.error('保存失败')
    } finally {
      setSaving(false)
    }
  }
  useEffect(() => {
    loadEnvironmentManager()
  }, [])

  // 在组件挂载时初始化表单
  useEffect(() => {
    if (activeEnvId && !isCreating) {
      const envData = environmentSettings.find((env) => env.id === activeEnvId)
      if (envData) {
        form.resetFields()
        form.setFieldsValue(envData)
      }
    }
  }, [activeEnvId, isCreating])
  // 合并自定义配置和默认配置
  useEffect(() => {
    if (
      environmentManagement?.environmentSettings &&
      environmentManagement.environmentSettings.length > 0
    ) {
      setEnvironmentSettings(environmentManagement.environmentSettings)
    } else {
      setEnvironmentSettings([])
    }
  }, [environmentManagement?.environmentSettings])
  useEffect(() => {
    if (activeEnvId && !isCreating) {
      const envData = environmentSettings.find((env) => env.id === activeEnvId)
      if (envData) {
        form.resetFields()
        form.setFieldsValue(envData)
      }
    }
  }, [activeEnvId, isCreating, environmentSettings])

  // 管理环境弹窗内容
  const renderContent = (tab: string) => {
    console.log('environmentManagement', environmentManagement)
    switch (tab) {
      case 'globalVariable':
        return (
          <div>
            <h3>全局变量</h3>
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
            <h3>全局参数</h3>
            <ConfigProvider locale={zhCN}>
              <GlobalParameter
                data={
                  environmentManagement?.globalParameter || {
                    header: [],
                    query: [],
                    body: [],
                    cookie: [],
                  }
                }
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
        return (
          <div style={{ flex: 1, padding: '24px' }}>
            {currentEnvData &&
            (isCreating || environmentSettings.some((env) => env.id === activeEnvId)) ? (
              <EnvironmentCustomContent
                data={currentEnvData}
                onChange={(newData) => {
                  setCurrentEnvData(newData)
                  // 如果是编辑现有环境，立即更新环境列表
                  if (!isCreating) {
                    setEnvironmentSettings((prev) =>
                      prev.map((env) => (env.id === newData.id ? newData : env))
                    )
                  }
                }}
              />
            ) : (
              <div>请选择一个环境或创建新环境</div>
            )}
          </div>
        )
    }
  }
  // 在组件顶部添加
  const styles = {
    menuItem: css`
      &:hover .env-item-more {
        visibility: visible !important;
      }
    `,
  }
  const handleEnvChange = async (value: string) => {
    try {
      // 1. 更新当前选中的环境名称
      const selectedName = environmentSettings.find((env) => env.id === value)?.name || ''
      setCurrentEnv(selectedName)

      // 2. 更新所有环境的 isActive 状态
      const updatedSettings = environmentSettings.map((env) => ({
        ...env,
        isActive: env.id === value,
      }))

      // 3. 更新本地状态
      setEnvironmentSettings(updatedSettings)
      setActiveEnvId(value)

      const selectedEnv = updatedSettings.find((env) => env.id === value)
      if (selectedEnv) {
        // 4. 更新当前环境数据
        setCurrentEnvData(selectedEnv)

        // 5. 更新到 environmentManagement
        setEnvironmentManagement((prev) => ({
          ...prev,
          environmentSettings: updatedSettings,
        }))

        // 6. 创建可序列化的数据副本
        const serializableSettings = updatedSettings.map((env) => ({
          id: env.id,
          name: env.name,
          servers: env.servers || [],
          variables: env.variables || [],
          isActive: env.isActive,
        }))

        // 7. 创建 FormData 并保存
        const formdata = new FormData()
        formdata.append('id', environmentManagement?.id || '')
        formdata.append(
          'globalParameter',
          JSON.stringify(environmentManagement?.globalParameter || {})
        )
        formdata.append(
          'globalVariable',
          JSON.stringify(environmentManagement?.globalVariable || {})
        )
        formdata.append('environmentSettings', JSON.stringify(serializableSettings))
        formdata.append('keyStores', JSON.stringify(environmentManagement?.keyStores || {}))
        formdata.append('localMock', JSON.stringify(environmentManagement?.localMock || {}))
        formdata.append('cloudMock', JSON.stringify(environmentManagement?.cloudMock || {}))
        formdata.append('selfHostMock', JSON.stringify(environmentManagement?.selfHostMock || {}))

        // 8. 调用保存API
        const response = await EnvironmentManageSave(formdata)

        if (response.data?.success) {
          message.success(`已切换到${selectedEnv.name}`)
        } else {
          message.error(response.data?.message || '保存环境配置失败')
        }
      }
    } catch (error) {
      console.error('切换环境失败:', error)
      message.error('切换环境失败')
    }
  }

  const handleAddEnvironment = useCallback(() => {
    const newEnvId = nanoid(6)
    const newEnv: EnvironmentSetting = {
      id: newEnvId,
      name: '未命名环境',
      isActive: false,
      servers: [
        {
          id: nanoid(),
          name: '',
          frontUrl: '',
        },
      ],
      variables: [
        {
          id: nanoid(),
          key: '',
          type: 'string',
          value: '',
          description: '',
        },
      ],
    }

    // 处理空数组情况
    const updatedSettings =
      environmentSettings.length > 0 ? [...environmentSettings, newEnv] : [newEnv]

    setEnvironmentSettings(updatedSettings)
    setActiveEnvId(newEnvId)
    setIsCreating(true)
    setCurrentEnvData(newEnv)
    setCurrentEnv(newEnv.name)

    // 重置表单
    form.resetFields()
    form.setFieldsValue(newEnv)

    setEnvironmentManagement((prev) => ({
      // 1. 保留现有状态或提供默认值
      ...(prev || {
        id: nanoid(),
        globalParameter: { header: [], query: [], body: [], cookie: [] },
        globalVariable: { team: [], project: [] },
        environmentSettings: [],
        localMock: {},
        cloudMock: {},
        selfHostMock: {},
        keyStores: [],
      }),
      // 2. 更新特定的状态字段
      environmentSettings: updatedSettings,
    }))

    // 确保打开编辑界面
    setModalState((prev) => ({
      ...prev,
      visible: true,
      tab: 'environmentSettings',
    }))
  }, [environmentSettings, form])
  const handleDeleteEnvironment = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个环境吗？',
      onOk: () => {
        // 1. 删除环境
        const newEnvironments = environmentSettings.filter((env) => env.id !== id)
        setEnvironmentSettings(newEnvironments)

        // 2. 如果删除的是当前选中的环境
        if (activeEnvId === id) {
          // 3. 自动定位到第一个环境（如果有）
          if (newEnvironments.length > 0) {
            setActiveEnvId(newEnvironments[0].id)
          } else {
            setActiveEnvId(undefined) // 没有环境时清空选择
          }
        }
      },
    })
  }

  const handleDuplicateEnvironment = (id: string) => {
    // 复制环境逻辑
    const original = environmentSettings.find((env) => env.id === id)
    if (original) {
      const newEnv = {
        ...original,
        id: nanoid(6),
        name: `${original.name} (副本)`,
      }
      setEnvironmentSettings((prev) => [...prev, newEnv])
    }
  }
  return (
    <div className="environment-manager">
      <Select
        defaultValue={currentEnv}
        dropdownRender={(menu) => (
          <>
            {menu}
            <div style={{ padding: '1px', borderTop: '1px solid #f0f0f0', marginTop: 4 }}>
              <Button
                icon={<SettingOutlined />}
                size="small"
                type="link"
                onClick={(e) => {
                  e.stopPropagation()
                  setModalState((prev) => ({
                    ...prev,
                    visible: true,
                    tab: 'environmentSettings', // 默认打开环境配置标签
                  }))
                }}
              >
                管理环境
              </Button>
            </div>
          </>
        )}
        loading={loading}
        notFoundContent={environmentSettings.length === 0 ? '暂无环境配置' : null}
        placeholder="请选择环境"
        style={{ width: 150, marginLeft: 8 }}
        suffixIcon={<SearchOutlined />}
        value={currentEnv}
        onChange={handleEnvChange}
        onDropdownVisibleChange={handleDropdownVisibleChange}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
        {environmentSettings && environmentSettings.length > 0 ? (
          environmentSettings.map((config) => (
            <Select.Option key={config.id} value={config.id}>
              <Tooltip mouseEnterDelay={0.3} placement="right" title={config.name}>
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
            style={{ width: 180, borderRight: '1px solid #f0f0f0' }}
          >
            <Menu.ItemGroup key="globalSettings" title="全局设置">
              <Menu.Item
                key="globalVariable"
                icon={<GlobalOutlined />}
                onClick={(e) => {
                  setActiveEnvId(e.key)
                }}
              >
                全局变量
              </Menu.Item>
              <Menu.Item
                key="globalParameter"
                icon={<GlobalOutlined />}
                onClick={(e) => {
                  setActiveEnvId(e.key)
                }}
              >
                全局参数
              </Menu.Item>
              {/*<Menu.Item key="keyStores" icon={<LockOutlined />}>*/}
              {/*  密钥库*/}
              {/*</Menu.Item>*/}
            </Menu.ItemGroup>
            <Menu.ItemGroup key="environmentSettings" title="环境配置">
              {environmentSettings.map((env) => (
                <Menu.Item
                  key={env.id}
                  className={styles.menuItem}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => {
                    setActiveEnvId(env.id)
                    setIsCreating(false)
                  }}
                >
                  <span
                    style={{
                      color: ['local-mock', 'remote-mock', 'self-host-mock'].includes(env.id)
                        ? '#1890ff'
                        : 'inherit',
                    }}
                  >
                    {['local-mock', 'remote-mock', 'self-host-mock'].includes(env.id) && (
                      <CloudOutlined />
                    )}
                    {env.name}
                  </span>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          key="duplicate"
                          disabled={
                            env.id === 'local-mock' ||
                            env.id === 'remote-mock' ||
                            env.id === 'self-host-mock'
                          }
                          icon={<EditOutlined />}
                          onClick={(e) => {
                            e.domEvent.stopPropagation()
                            handleDuplicateEnvironment(env.id)
                          }}
                        >
                          复制
                        </Menu.Item>
                        <Menu.Item
                          key="delete"
                          danger
                          disabled={
                            env.id === 'local-mock' ||
                            env.id === 'remote-mock' ||
                            env.id === 'self-host-mock'
                          }
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.domEvent.stopPropagation()
                            handleDeleteEnvironment(env.id)
                          }}
                        >
                          删除
                        </Menu.Item>
                      </Menu>
                    }
                    placement="topRight"
                    trigger={['hover']}
                  >
                    <MoreOutlined
                      className="env-item-more"
                      style={{
                        padding: 4,
                        marginLeft: 16,
                        visibility: 'hidden',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />
                  </Dropdown>
                </Menu.Item>
              ))}
              <Menu.Item
                key="create-new-environment"
                icon={<PlusOutlined />}
                style={{ marginTop: 8, color: 'rgb(114,173,236)' }}
                onClick={handleAddEnvironment}
              >
                新建环境
              </Menu.Item>
            </Menu.ItemGroup>
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
          <div style={{ flex: 1, padding: '0 24px' }}>{renderContent(activeEnvId)}</div>
        </div>
      </Modal>
    </div>
  )
}

export default EnvironmentManager
