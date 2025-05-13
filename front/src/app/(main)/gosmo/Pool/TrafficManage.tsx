'use client'

import type React from 'react'
import { useState } from 'react'
import JsonView from 'react18-json-view'
import dayjs from 'dayjs';
import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from 'antd'
import { TrafficDetail, TrafficQueryPage } from '@/api/gosmo/trafficmanage'
import { ColumnsType } from "antd/es/table";

interface DataType {
  id: string
  taskId: string
  url: string
  method: string
  body: string
  headers: { key: string; value: string }[]
  response: string
  recordTime: string
  status: number
  details?: any
}

const { RangePicker } = DatePicker

export default function TrafficManage() {
  const [form] = Form.useForm()
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null)
  const [formattedDates, setFormattedDates] = useState<[string, string]>(['', '']);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  // 获取接口详情
  const fetchDetail = async (id: string) => {
    try {
      const response = await TrafficDetail(id)
      if (response.data.success) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response.data.data
      } else {
        throw new Error(response.data.message || '获取详情失败')
      }
    } catch (error) {
      throw new Error('获取详情失败，请重试')
    }
  }
 const handleCreateReplayTask = async () => {

 }
  const handleSearch = () => {
    form.validateFields().then((values) => {
      setExpandedRowKeys([])
      const queryParams = {
        ...values,
        current: 1,
        pageSize: pagination.pageSize,
      }

      fetchData(queryParams)
    })
  }
  const handleTableChange = (page: number, pageSize?: number) => {
    fetchData({
      page,
      pageSize: pageSize || pagination.pageSize,
    })
  }
  const handleReset = () => {
    form.resetFields()
    fetchData({ result: 0, current: 1, pageSize: pagination.pageSize })
  }

  // 获取表格数据
  const fetchData = async (params: any = {}) => {
    setLoading((prev) => ({ ...prev, table: true }))
    try {
      const response = await TrafficQueryPage(params)
      if (response.data.success) {
        setData(response.data.data.records)
        setPagination({
          current: response.data.data.current,
          pageSize: response.data.data.pageSize,
          total: response.data.data.total,
          totalPages: response.data.data.totalPages,
        })
      }
      message.success(response.data?.message)
    } catch (error) {
      console.error('获取数据失败:', error)
      message.error('获取数据失败，请重试')
    } finally {
      setLoading((prev) => ({ ...prev, table: false }))
    }
  }

  // 处理表格展开
  const handleExpand = async (expanded: boolean, record: DataType) => {
    if (expanded && !record.details) {
      try {
        setLoading((prev) => ({ ...prev, [record.id]: true }))
        const detail = await fetchDetail(record.id)

        // 更新当前行的 details 字段
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id ? { ...item, details: detail } : item
          )
        )
      } catch (error) {
        // 如果获取详情失败，设置默认值
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? {
                ...item,
                details: {
                  id: '-',
                  taskId: '-',
                  url: '-',
                  body: '-',
                  headers: [],
                  response: '-',
                  recordTime: '-',
                  status: 0,
                },
              }
              : item
          )
        )
      } finally {
        setLoading((prev) => ({ ...prev, [record.id]: false }))
      }
    }
  }

  // 渲染展开行内容
  const renderExpandedRow = (record: DataType) => {
    if (loading[record.id]) {
      return <Spin /> // 如果正在加载，显示加载状态
    }
    if (!record.details) {
      return <Spin /> // 如果记录为空，显示加载状态
    }
    return (
      <Descriptions size="small" title="接口详情">

        <Descriptions.Item label="接口URL">{record.details.url}</Descriptions.Item>
        <Descriptions.Item label="请求头">
          <Table
            bordered
            columns={[
              { title: 'Key', dataIndex: 'key', key: 'key', width: 300 },
              { title: 'Value', dataIndex: 'value', key: 'value', width: 300 },
            ]}
            dataSource={record.details.headers || []}
            pagination={false}
            rowKey="key"
            size="small"
          />
        </Descriptions.Item>
        <Descriptions.Item label="请求体">
          <JsonView src={record.details.payload || '-'} />
        </Descriptions.Item>

        <Descriptions.Item label="响应">
          <JsonView src={record.details.response || '-'} />
        </Descriptions.Item>
      </Descriptions>
    )
  }

  // 表格列配置
  const columns: ColumnsType<DataType> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '录制任务ID', dataIndex: 'taskId', key: 'taskId', width: 150 },
    { title: 'IP/域名', dataIndex: 'ip', key: 'ip' },
    { title: '接口URL', dataIndex: 'url', key: 'url' },
    {
      title: '请求方式',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => (
        <Tag color={'blue'}>
          {method}
        </Tag>
      ),
    },
    {
      title: '请求状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : status === 2 ? 'red' : 'gray'}>
          {status === 1 ? '成功' : status === 2 ? '失败' : '未知'}
        </Tag>
      ),
    },
    { title: '录制时间', dataIndex: 'recordTime', key: 'recordTime' },
    {
      title: '操作',
      key: 'action',
      width: 300,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => message.success('发送请求成功')}>
            发送请求
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Card style={{ margin: 20 }} title="流量管理">
      {/* 查询表单 */}
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item label="任务ID" name="taskId">
          <Input allowClear placeholder="请输入任务ID" />
        </Form.Item>
        <Form.Item label="接口URL" name="url">
          <Input allowClear placeholder="请输入请求路径" />
        </Form.Item>
        <Form.Item label="请求状态" name="status">
          <Select
            allowClear
            defaultValue={null}
            options={[
              { label: '全部', value: null },
              { label: '未知', value: 0 },
              { label: '成功', value: 1 },
              { label: '失败', value: 2 },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
        {/*<Form.Item label="录制时间" name="recordTime">*/}
        {/*  <RangePicker showTime />*/}
        {/*</Form.Item>*/}
        <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item >
            <Space>
              <Button type="primary" onClick={handleSearch}>
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
              <Button onClick={handleCreateReplayTask} disabled={selectedRowKeys.length === 0} type="primary">
                创建回放任务
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Form>

      {/* 表格 */}
      <Table
        bordered
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowKeys,
          expandedRowRender: renderExpandedRow,
          onExpand: (expanded:boolean, record:DataType) => {
            if (expanded) {

              setExpandedRowKeys([record.id]); // 展开当前行
            } else {
              setExpandedRowKeys([]) // 关闭当前行
            }
            handleExpand(expanded, record)
          }
        }}
        loading={loading.table}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
          showSizeChanger: true,
        }}
        rowKey="id"
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys)
          },
        }}
      />

      {/* 查看弹窗 */}
      <Modal
        footer={null}
        open={viewModalVisible}
        title="查看详情"
        onCancel={() => {
          setViewModalVisible(false)
        }}
      >
        <Descriptions size="small" title="接口详情">
          <Descriptions.Item label="接口URL">{currentRecord?.url}</Descriptions.Item>
          <Descriptions.Item label="请求体">{currentRecord?.body || '-'}</Descriptions.Item>
          <Descriptions.Item label="响应">{currentRecord?.response || '-'}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </Card>
  )
}