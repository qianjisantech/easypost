import { useEffect, useState } from "react";
import { Select, Button, Divider, Modal, message } from "antd";
import ModalHeader from './ModalHeader';
import { PlusOutlined } from "@ant-design/icons";
import { EnvironmentManageDynamic } from "@/api/ams/environmentmanage";

interface ReadVariableModalProps {
  visible: boolean;
  onBack: () => void;
  onClose: () => void;
  onInsert: (value: string) => void;
}
interface Option {
  value: string
  key: string
  type: string
  id: string
}
const ReadVariableModal = ({ visible, onBack, onClose, onInsert }: ReadVariableModalProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [variableOptions, setVariableOptions]=useState<Option[]>([])
  const loadingVariableOptions =async()=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response =await EnvironmentManageDynamic()
    if (response.data.success){
      console.log('读取变量成功',response.data.data)
      setVariableOptions(response.data.data.map((item:any)=>{
        return {
          value:item.value,
          key:item.key,
          type:item.type,
          id:item.id
        }
      }))
    }
  }

  // 获取当前选中项的预览值
  const getPreviewValue = () => {
    const selectedOption = variableOptions.find(opt => opt.key === selectedValue);
    return selectedOption ? selectedOption.value : '';
  };

  // 处理变量选择
  const handleSelect = (value: string, option: Option) => {
    setSelectedValue(option.key); // 使用option.key而不是value
  };

  // 处理清空
  const handleClear = () => {
    setSelectedValue('');
  };

  // 处理插入操作
  const handleInsert = () => {
    if (selectedValue) {
      const formattedValue = `{{${selectedValue}}}`; // 格式化变量
      onInsert(formattedValue); // 传递给父组件
      onClose(); // 关闭弹窗
    }
  };
  return (
    <Modal
      closable={false}
      footer={null}
      open={visible}
      width={350}
      heigth={'100%'}
      onCancel={onClose}
      bodyStyle={{ backgroundColor: 'transparent' }}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <div style={{ padding: '0 16px' }}>
        <ModalHeader
          title="读取变量"
          onBack={onBack}
          onClose={onClose}
        />

        {/* 变量选择下拉框 - 添加清空功能 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ margin: '10px', fontSize: '14px',color: '#595959' }}>变量名</div>
          <Select
            placeholder="选择变量"
            fieldNames={{
              label: 'key',  // 显示key作为标签
              value: 'value' // 但实际值仍使用value
            }}
            style={{ width: '100%' }}
            options={variableOptions}
            onChange={(value, option) => { handleSelect(value, option)}}
            onClear={handleClear}
            allowClear
            optionRender={(option) => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{option.data.key}</span>
                <span style={{ color: '#888' }}>{option.data.type}</span>
              </div>
            )}
            value={variableOptions.find(opt => opt.key === selectedValue)?.value || ''}
            onDropdownVisibleChange={(open) => {
              if (open) {
                loadingVariableOptions()
              }
            }}
          />
        </div>
        {/* 空白分割区域 */}
        <Divider style={{ margin: '12px 0' }} />
        {/* 展示框 */}
        <div style={{
          padding: 0,
          marginBottom: 16,
          borderRadius: 4,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          fontSize: 16,
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

        {/* 展示框 */}
        <div style={{
          padding: 16,
          marginBottom: 16,
          border: '1px solid #d9d9d9',
          borderRadius: 10,
          minHeight: 60,  // 增加高度以适应两行内容
          backgroundColor: '#e6f7ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize: 12
        }}>
          <div style={{
            color: '#565959',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 400, marginRight: 8 }}>表达式:</span>
            <span style={{
              padding: '2px 8px',
              borderRadius: 4
            }}>{`{{${selectedValue}}}`}</span>
          </div>
          <div style={{
            color: "#565959",
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ fontWeight: 400, marginRight: 8 }}>预览:</span>
            <span style={{
              padding: "2px 8px",
              borderRadius: 4
            }}>{getPreviewValue()}</span>
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

export default ReadVariableModal;