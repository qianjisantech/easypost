import type React from 'react'

import { Button } from 'antd'

import { useGlobalContext } from '@/contexts/global'

interface SwitchLoginMethodButtonProps {
  isQRCodeLogin: boolean
  setIsQRCodeLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchLoginMethodButton: React.FC<SwitchLoginMethodButtonProps> = ({
  isQRCodeLogin,
  setIsQRCodeLogin,
}) => {
  const { messageApi } = useGlobalContext()
  const handleClick = () => {
    if (!isQRCodeLogin) {
      messageApi.warning('当前功能待开发')
    }
    // setIsQRCodeLogin(!isQRCodeLogin)
  }
  return (
    <Button
      ghost
      style={{
        width: '100%',
        marginTop: 20,
        borderColor: '#D6A5D6',
        color: '#D6A5D6',
        borderRadius: '4px',
      }}
      onClick={handleClick} // 切换登录方式
    >
      {isQRCodeLogin ? '邮箱登录' : '飞书登录'}
    </Button>
  )
}

export default SwitchLoginMethodButton
