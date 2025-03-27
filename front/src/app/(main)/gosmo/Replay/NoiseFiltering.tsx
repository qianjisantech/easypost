'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
  message, Select
} from "antd";
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  result: boolean
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  testTime: string
}

export default function NoiseFiltering() {
  const [form] = Form.useForm()
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null)

  // eslint-disable-next-line @typescript-eslint/require-await
  const fetchData = async (params: any = {}) => {
    setLoading(true)
    setTimeout(() => {
      const total = 50
      const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
      let list = Array.from({ length: params.pageSize }, (_, index) => ({
        key: `${(params.page - 1) * params.pageSize + index + 1}`,
        name: `ES ${(params.page - 1) * params.pageSize + index + 1}`,
        age: 20 + (((params.page - 1) * params.pageSize + index) % 30),
        address: `localhost ${(params.page - 1) * params.pageSize + index + 1}`,
        result: Math.random() > 0.5,
        createdAt: now,
        createdBy: 'Admin',
        updatedAt: now,
        updatedBy: 'Admin',
        testTime: now,
      }))

      // 模拟根据 result 过滤
      if (params.result === 0) {
        list = list.filter((item) => item.result === 0)
      } else if (params.result === 1) {
        list = list.filter((item) => item.result === 1)
      }

      setData(list)
      setPagination({ ...pagination, total, current: params.page })
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    fetchData({ page: pagination.current, pageSize: pagination.pageSize })
  }, [])

  const handleSearch = () => {
    form.validateFields().then((values) => {
      fetchData({ ...values, page: 1, pageSize: pagination.pageSize })
    })
  }


  const handleReset = () => {
    form.resetFields()
    fetchData({ result: 0, page: 1, pageSize: pagination.pageSize })
  }


  const handleTableChange = (page: number, pageSize?: number) => {
    fetchData({
      page,
      pageSize: pageSize || pagination.pageSize,
    })
  }

  const handleAdd = () => {
    setAddModalVisible(true)
  }

  const handleEdit = (record: DataType) => {
    setCurrentRecord(record)
    setEditModalVisible(true)
  }

  const handleView = (record: DataType) => {
    setCurrentRecord(record)
    setViewModalVisible(true)
  }

  const handleDelete = (record: DataType) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除 "${record.name}" 吗？`,
      onOk() {
        setData((prev) => prev.filter((item) => item.key !== record.key))
        message.success('删除成功')
      },
    })
  }

  const handleTestConnection = (record: DataType) => {
    message.loading('正在测试连接...', 1).then(() => {
      const success = Math.random() > 0.5
      if (success) {
        message.success('连接成功')
      } else {
        message.error('连接失败')
      }
    })
  }

  const columns: ColumnsType<DataType> = [
    { title: '序号', dataIndex: 'key', key: 'key', width: 80 },
    { title: 'ES名称', dataIndex: 'name', key: 'name' },
    { title: 'ES地址', dataIndex: 'address', key: 'address' },
    {
      title: '连接结果',
      dataIndex: 'result',
      key: 'result',
      render: (result: boolean) =>
        result ? <Tag color="green">成功</Tag> : <Tag color="red">失败</Tag>,
    },
    { title: '测试连接时间', dataIndex: 'testTime', key: 'testTime' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '创建人', dataIndex: 'createdBy', key: 'createdBy' },
    { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt' },
    { title: '更新人', dataIndex: 'updatedBy', key: 'updatedBy' },

    {
      title: '操作',
      key: 'action',
      width: 300,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleView(record)}>
            查看
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            删除
          </Button>
          <Button type="link" onClick={() => handleTestConnection(record)}>
            测试连接
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Card style={{ margin: 20 }} title="噪音消除">
      {/* 查询表单 */}
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="ES名称" name="name">
          <Input allowClear placeholder="请输入ES名称" />
        </Form.Item>
        <Form.Item label="ES地址" name="name">
          <Input allowClear placeholder="请输入ES地址" />
        </Form.Item>
        <Form.Item label="连接结果" name="result">
          <Select
            allowClear
            style={{ width: 120 }}
            options={[
              { label: '全部', value: '-' },
              { label: '成功', value: 1 },
              { label: '失败', value: 0 },
            ]}
            defaultValue={'-'}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" onClick={handleAdd}>
              新增
            </Button>
          </Space>
        </Form.Item>
      </Form>

      {/* 表格 */}
      <Table
        bordered
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="key"
      />

      {/* 分页 */}
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Pagination
          showSizeChanger
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handleTableChange}
        />
      </div>

      {/* 新增弹窗 */}
      <Modal
        open={addModalVisible}
        title="新增ES信息"
        onCancel={() => setAddModalVisible(false)}
        onOk={() => {
          message.success('新增成功')
          setAddModalVisible(false)
        }}
      >
        <Form layout="vertical">
          <Form.Item label="Es名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Es地址" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* 编辑弹窗 */}
      <Modal
        open={editModalVisible}
        title="编辑ES信息"
        onCancel={() => setEditModalVisible(false)}
        onOk={() => {
          message.success('修改成功')
          setEditModalVisible(false)
        }}
      >
        <Form layout="vertical" initialValues={currentRecord || {}}>
          <Form.Item label="Es名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Es地址" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看弹窗 */}
      <Modal
        open={viewModalVisible}
        title="查看ES信息"
        footer={null}
        onCancel={() => setViewModalVisible(false)}
      >
        <p><strong>ES名称：</strong>{currentRecord?.name}</p>
        <p><strong>ES地址：</strong>{currentRecord?.address}</p>
        <p><strong>连接结果：</strong>
          {currentRecord?.result ? <Tag color="green">成功</Tag> : <Tag color="red">失败</Tag>}
        </p>
        <p><strong>测试连接时间：</strong>{currentRecord?.testTime}</p>
        <p><strong>创建时间：</strong>{currentRecord?.createdAt}</p>
        <p><strong>创建人：</strong>{currentRecord?.createdBy}</p>
        <p><strong>更新时间：</strong>{currentRecord?.updatedAt}</p>
        <p><strong>更新人：</strong>{currentRecord?.updatedBy}</p>
      </Modal>

      {/* 原有查看、编辑弹窗不变 */}
    </Card>
  )
}
