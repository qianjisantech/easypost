import { useState } from 'react';
import { Button, Modal } from 'antd';
import { QuestionCircleOutlined, RightOutlined } from '@ant-design/icons';
import ReadVariableModal from './ReadVariableModal';
import DataGeneratorModal from './DataGeneratorModal';
import ModalHeader from './ModalHeader';

interface DynamicValueDropdownProps {
  onInsert: (value: string) => void;
}

const DynamicValueModal = ({ onInsert }: DynamicValueDropdownProps) => {
  const [dynamicValueModalVisible, setDynamicValueModalVisible] = useState(false);
  const [readVariableModalVisible, setReadVariableModalVisible] = useState(false);
  const [dataGeneratorModalVisible, setDataGeneratorModalVisible] = useState(false);

  const handleInsert = (value: string) => {
    console.log('将收到格式如 {{message}} 的字符串',value); // 将收到格式如 {{message}} 的字符串
    onInsert(value);
    setDynamicValueModalVisible(false);
    setReadVariableModalVisible(false);
    setDataGeneratorModalVisible(false);
  };

  const renderDynamicValueModal = () => (
    <>
      <ModalHeader
        title="插入动态值"
        onClose={() => { setDynamicValueModalVisible(false); }}
      />
      <div style={{ padding: '8px 16px 16px' }}>
        <div
          style={{
            padding: '12px 16px',
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            marginBottom: 8,
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: 'transparent',
          }}
          onClick={() => {
            setDynamicValueModalVisible(false);
            setReadVariableModalVisible(true);
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 500 }}>📊 读取变量</div>
            <RightOutlined />
          </div>
          <div style={{ color: '#888', fontSize: 12 }}>读取环境变量/全局变量/临时变量</div>
        </div>

        <div
          style={{
            padding: '12px 16px',
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            marginBottom: 8,
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: 'transparent',
          }}
          onClick={() => {
            setDynamicValueModalVisible(false);
            setDataGeneratorModalVisible(true);
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 500 }}>🎲 数据生成器</div>
            <RightOutlined />
          </div>
          <div style={{ color: '#888', fontSize: 12 }}>生成特定规则/随机数据(Mock)</div>
        </div>
      </div>
    </>
  );

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
        onClick={() => { setDynamicValueModalVisible(true); }}
      >
        动态值
      </Button>

      <Modal
        closable={false}
        footer={null}
        open={dynamicValueModalVisible}
        width={400}
        onCancel={() => { setDynamicValueModalVisible(false); }}
        bodyStyle={{ backgroundColor: 'transparent' }}
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      >
        {renderDynamicValueModal()}
      </Modal>

      <ReadVariableModal
        visible={readVariableModalVisible}
        onBack={() => {
          setReadVariableModalVisible(false);
          setDynamicValueModalVisible(true);
        }}
        onClose={() => { setReadVariableModalVisible(false); }}
        onInsert={handleInsert}
      />

      <DataGeneratorModal
        visible={dataGeneratorModalVisible}
        onBack={() => {
          setDataGeneratorModalVisible(false);
          setDynamicValueModalVisible(true);
        }}
        onClose={() => { setDataGeneratorModalVisible(false); }}
        onInsert={handleInsert}
      />
    </>
  );
};

export default DynamicValueModal