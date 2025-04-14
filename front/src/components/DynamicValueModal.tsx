import { useMemo, useState } from 'react'
import type React from 'react'
import {
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, Divider, Menu, Modal, Select } from 'antd'

interface DynamicValueDropdownProps {
  onInsert: (value: string) => void
}

const functionOptions = [
  {
    label: '基础类型',
    options: [
      { value: 'random.number', label: '随机数字', displayValue: '{{random.number}}' },
      { value: 'random.string', label: '随机字符串', displayValue: '{{random.string}}' },
      { value: 'uuid', label: 'UUID', displayValue: '{{uuid}}' },
    ],
  },
  {
    label: '时间日期',
    options: [
      { value: 'timestamp', label: '时间戳', displayValue: '{{timestamp}}' },
      { value: 'date', label: '日期', displayValue: '{{date}}' },
      { value: 'datetime', label: '日期时间', displayValue: '{{datetime}}' },
    ],
  },
]

const exampleValues: Record<string, string> = {
  'random.number': '42',
  'random.string': '"aB3dE"',
  uuid: '"550e8400-e29b-41d4-a716-446655440000"',
  timestamp: '1672531200',
  date: '"2023-01-01"',
  datetime: '"2023-01-01 12:00:00"',
  address: '"北京市朝阳区建国路88号"',
  province: '"广东省"',
  city: '"深圳市"',
  name: '"张三"',
  phone: '"13800138000"',
  idcard: '"110101199003072345"',
}

const ModalHeader = ({
  title,
  onBack,
  onClose,
}: {
  title: string
  onBack?: () => void
  onClose?: () => void
}) => (
  <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0', position: 'relative' }}>
    {onBack && (
      <LeftOutlined
        style={{ position: 'absolute', left: 16, cursor: 'pointer' }}
        onClick={onBack}
      />
    )}
    <span style={{ fontWeight: 500, display: 'block', textAlign: 'center' }}>{title}</span>
    {onClose && (
      <CloseOutlined
        style={{ position: 'absolute', right: 16, top: 16, cursor: 'pointer', color: '#999' }}
        onClick={onClose}
      />
    )}
  </div>
)

const DynamicValueModal: React.FC<DynamicValueDropdownProps> = ({ onInsert }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentView, setCurrentView] = useState<'main' | 'detail'>('main')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  const handleInsert = (value: string) => {
    onInsert(value)
    setModalVisible(false)
    setSelectedValue('')
    setCurrentView('main')
  }

  const renderSelectOptions = () => (
    <Select
      showSearch
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div
            style={{ padding: 8, cursor: 'pointer' }}
            onClick={() => {
              console.log('自定义数据规则')
            }}
          >
            <PlusOutlined /> 自定义数据规则
          </div>
        </div>
      )}
      placeholder="搜索或选择数据类型"
      style={{ width: '100%', marginBottom: 16 }}
      value={selectedValue}
      onChange={(value) => {
        console.log('选择了：', value)
        setSelectedValue(value)
      }}
    >
      {functionOptions.map((group) => (
        <Select.OptGroup key={group.label} label={group.label}>
          {group.options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.label}</span>
                <span style={{ color: '#888' }}>{option.displayValue}</span>
              </div>
            </Select.Option>
          ))}
        </Select.OptGroup>
      ))}
    </Select>
  )

  const dataGeneratorDetailView = useMemo(
    () => (
      <div>
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LeftOutlined
            style={{
              position: 'absolute',
              left: '16px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setCurrentView('main')
            }}
          />
          <span style={{ fontWeight: 500 }}>数据生成器</span>
          <CloseOutlined
            style={{
              position: 'absolute',
              right: '16px',
              cursor: 'pointer',
              color: '#999',
            }}
            onClick={() => {
              setModalVisible(false)
            }}
          />
        </div>
        <div style={{ padding: 16 }}>
          {renderSelectOptions()}
          {/* 新增的白色长方形框 */}
          <div
            style={{
              padding: '12px',
              marginBottom: '16px',
              backgroundColor: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '4px',
              display: 'flex',
              height: '200px',
              justifyContent: 'center',
              position: 'relative', // 为虚化效果添加定位
              overflow: 'hidden', // 确保虚化效果不溢出
            }}
          >
            <Button
              style={{
                width: '100%', // 撑满宽度

                color: '#8c8c8c',
                borderColor: '#d9d9d9',
                backgroundColor: 'rgba(245, 245, 245, 0.7)', // 半透明背景
                backdropFilter: 'blur(4px)', // 虚化效果
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'all 0.3s',
                borderStyle: 'dashed', // 虚线边框
                borderWidth: '1px',
              }}
              type="text"
              onClick={() => {
                console.log('添加处理函数')
              }}
            >
              添加处理函数
            </Button>
          </div>
          <div>
            <div>表达式:{`{{${selectedValue}}}` || ''}</div>
            <div>预览: {exampleValues[selectedValue] || '示例数据'}</div>
          </div>
          <Button
            block
            disabled={!selectedValue}
            style={{ marginTop: 16 }}
            type="primary"
            onClick={() => {
              handleInsert(`{{${selectedValue}}}`)
            }}
          >
            插入
          </Button>
        </div>
      </div>
    ),
    [selectedValue]
  )

  const createMenu = (items: string[], transform: (item: string) => string) => (
    <Menu style={{ border: 'none' }}>
      {items.map((item) => (
        <Menu.Item
          key={item}
          style={{ padding: '12px 16px' }}
          onClick={() => {
            handleInsert(transform(item))
          }}
        >
          {item}
        </Menu.Item>
      ))}
    </Menu>
  )

  const menuItems = [
    {
      title: '读取变量',
      description: '读取环境变量/全局变量/临时变量',
      icon: '📊',
      detailView: (
        <div>
          <ModalHeader
            title="读取变量"
            onBack={() => {
              setCurrentView('main')
            }}
          />
          <div style={{ padding: '0 16px', textAlign: 'center', color: '#888', fontSize: 12 }}>
            选择要读取的变量类型
          </div>
          {createMenu(
            ['环境变量', '全局变量', '请求参数', '响应数据'],
            (item) => `{{${item.toLowerCase().replace(/ /g, '_')}}}`
          )}
        </div>
      ),
    },
    {
      title: '数据生成器',
      description: '生成特定规则/随机数据(Mock)',
      icon: '🎲',
      detailView: dataGeneratorDetailView,
    },
    {
      title: '固定值',
      description: '写死固定值，可进一步数据处理，如加密',
      icon: '🔒',
      detailView: (
        <div>
          <ModalHeader
            title="固定值"
            onBack={() => {
              setCurrentView('main')
            }}
          />
          <div style={{ padding: '0 16px', textAlign: 'center', color: '#888', fontSize: 12 }}>
            选择要生成的数据类型
          </div>
          {createMenu(
            ['随机数字', '随机字符串', 'UUID', '时间戳', '递增序列'],
            (item) => `{{${item.toLowerCase().replace(/ /g, '_')}}}`
          )}
        </div>
      ),
    },
    {
      title: '自定义表达式',
      description: '满足特定复杂的业务场景需求',
      icon: '✏️',
      detailView: (
        <div>
          <ModalHeader
            title="自定义表达式"
            onBack={() => {
              setCurrentView('main')
            }}
          />
          <div style={{ padding: '0 16px', textAlign: 'center', color: '#888', fontSize: 12 }}>
            选择表达式类型
          </div>
          {createMenu(
            ['随机数字', '随机字符串', 'UUID', '时间戳', '递增序列'],
            (item) => `{{${item.toLowerCase().replace(/ /g, '_')}}}`
          )}
        </div>
      ),
    },
  ]

  const renderMainMenu = () => (
    <>
      <ModalHeader
        title="插入动态值"
        onClose={() => {
          setModalVisible(false)
        }}
      />
      <div style={{ padding: '8px 16px 16px' }}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '12px 16px',
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              marginBottom: 8,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => {
              setSelectedItem(item)
              setCurrentView('detail')
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 500 }}>
                {item.icon} {item.title}
              </div>
              <RightOutlined />
            </div>
            <div style={{ color: '#888', fontSize: 12 }}>{item.description}</div>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <>
      <Button
        icon={<QuestionCircleOutlined />}
        size="small"
        style={{
          backgroundColor: '#f0f0f0',
          color: '#495057',
          border: 'none',
          borderRadius: '4px',
          padding: '0 8px',
          height: '24px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
        }}
        type="text"
        onClick={() => {
          setModalVisible(true)
          setCurrentView('main')
        }}
      >
        {' '}
        动态值{' '}
      </Button>
      <Modal
        closable={false}
        footer={null}
        open={modalVisible}
        width={400}
        onCancel={() => {
          setModalVisible(false)
        }}
      >
        {currentView === 'main' ? renderMainMenu() : selectedItem?.detailView}
      </Modal>
    </>
  )
}

export default DynamicValueModal
