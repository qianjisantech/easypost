import { Spin } from 'antd'
import { createPortal } from 'react-dom'

const GlobalLoading = () => {
  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // 半透明背景
      zIndex: 9999
    }}>
      <Spin size="large" />
    </div>,
    document.body
  )
}

export default GlobalLoading
