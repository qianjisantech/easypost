import { useState } from 'react';
import { Select, Button, Divider, Modal, message } from "antd";
import ModalHeader from './ModalHeader';
import { PlusOutlined } from "@ant-design/icons";

interface DataGeneratorModalProps {
  visible: boolean;
  onBack: () => void;
  onClose: () => void;
  onInsert: (value: string) => void;
}

const DataGeneratorModal = ({ visible, onBack, onClose, onInsert }: DataGeneratorModalProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  // 数据生成器选项
  const generatorOptions = [
    {
      value: 'random_number',
      label: '随机数字',
      preview: '42'
    },
    {
      value: 'random_string',
      label: '随机字符串',
      preview: '"aB3dE"'
    },
    {
      value: 'uuid',
      label: 'UUID',
      preview: '"550e8400-e29b-41d4-a716-446655440000"'
    },
    {
      value: 'timestamp',
      label: '时间戳',
      preview: '1672531200'
    },
    {
      value: 'date',
      label: '日期',
      preview: '"2023-01-01"'
    },
    {
      value: 'datetime',
      label: '日期时间',
      preview: '"2023-01-01 12:00:00"'
    },
  ];

  // 获取当前预览值
  const getPreviewValue = () => {
    const selectedOption = generatorOptions.find(opt => opt.value === selectedValue);
    return selectedOption ? selectedOption.preview : '';
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleClear = () => {
    setSelectedValue('');
  };

  const handleInsert = () => {
    if (selectedValue) {
      onInsert(`{{${selectedValue}}}`);
      onClose();
    }
  };

  return (
    <Modal
      closable={false}
      footer={null}
      open={visible}
      width={400}
      onCancel={onClose}
      bodyStyle={{ backgroundColor: 'transparent' }}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <div style={{ padding: '0 16px' }}>
        <ModalHeader
          title="数据生成器"
          onBack={onBack}
          onClose={onClose}
        />
        {/* 变量选择下拉框 - 添加清空功能 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ margin: "10px 10px 5px", fontSize: "12px", color: "#484444" }}>类型</div>
          <Select
            placeholder="选择函数"
            style={{ width: "100%" }}
            options={generatorOptions.map(opt => ({
              value: opt.value,
              label: (
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "4px 0"
                }}>
                  <span style={{ fontSize: 14, flex: 1 }}>{opt.label}</span>
                  <span style={{
                    fontSize: 12,
                    color: "#888",
                    fontFamily: "monospace",
                    marginLeft: 16
                  }}>
                {`{{${opt.value}}}`}
              </span>
                </div>
              )
            }))}
            onChange={handleSelect}
            onClear={handleClear}
            allowClear
            size="small"
            value={selectedValue}
            dropdownStyle={{
              padding: "8px 0",
              borderRadius: 4
            }}
            listHeight={256}
            // 关键修改：选中后只显示value
            tagRender={(props) => (
              <span style={{
                color: "#1890ff", // 浅蓝色
                fontFamily: "monospace",
                fontSize: 12
              }}>
            {`{{${props.value}}}`}
          </span>
            )}
          />
        </div>
        {/* 空白分割区域 */}
        <Divider style={{ margin: "12px 0" }} />
        {/* 展示框 */}
        <div style={{
          padding: 0,
          marginBottom: 16,
          borderRadius: 4,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          fontSize: 16
        }}>
          {/* 按钮置顶 */}
          <Button
            type="default"
            icon={<PlusOutlined />}
            style={{
              width: '100%',
              height: 40,
              fontSize: 14,
              backgroundColor: '#fafafa',
              border: 'none', // 移除默认边框
              borderRadius: '10px', // 只圆角顶部
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#595959', // 文字颜色
              fontWeight: 500, // 中等粗细
              transition: 'all 0.3s', // 平滑过渡效果
              ':hover': {
                backgroundColor: '#f0f0f0', // 悬停背景色
                color: '#262626' // 悬停文字颜色
              }
            }}
            onClick={() => {
              console.log('添加处理函数')
              message.error('暂不支持添加处理函数')
            }}
          >
            <span style={{ letterSpacing: 1 }}>添加处理函数</span> {/* 文字间距微调 */}
          </Button>

          {/* 下方空白区域 */}
          <div style={{ flex: 1 }}></div>
        </div>
        {/* 预览框 */}
        <div style={{
          padding: 16,
          marginBottom: 16,
          border: '1px solid #d9d9d9',
          borderRadius: 10,
          minHeight: 80,
          backgroundColor: '#e6f7ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize: 12,
          overflow: 'hidden' // 防止内容溢出容器
        }}>
          <div style={{
            color: '#0050b3',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            width: '100%' // 确保宽度填满
          }}>
            <span style={{ fontWeight: 500, marginRight: 8, flexShrink: 0 }}>表达式:</span>
            <span style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontFamily: 'monospace',
              whiteSpace: 'nowrap', // 防止换行
              overflow: 'auto', // 允许滚动
              maxWidth: '100%',
              display: 'inline-block'
            }}>
      {selectedValue ? `{{${selectedValue}}}` : '未选择'}
    </span>
          </div>
          <div style={{
            color: '#0050b3',
            display: 'flex',
            alignItems: 'center',
            width: '100%' // 确保宽度填满
          }}>
            <span style={{ fontWeight: 500, marginRight: 8, flexShrink: 0 }}>预览:</span>
            <div style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontFamily: 'monospace',
              whiteSpace: 'nowrap', // 防止换行
              overflow: 'auto', // 允许滚动
              maxWidth: '100%',
              display: 'inline-block'
            }}>
              {getPreviewValue() || '无'}
            </div>
          </div>
        </div>

        {/* 插入按钮 */}
        <Button
          type="primary"
          block
          disabled={!selectedValue}
          onClick={handleInsert}
          style={{ marginBottom: 16 }}
        >
          插入
        </Button>
      </div>
    </Modal>
  );
};

export default DataGeneratorModal;