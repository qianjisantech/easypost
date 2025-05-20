import { LeftOutlined, CloseOutlined } from '@ant-design/icons';

interface ModalHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

const ModalHeader = ({ title, onBack, onClose }: ModalHeaderProps) => (
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
);

export default ModalHeader