import React from 'react'
import { Button } from 'antd'

interface SwitchLoginMethodButtonProps {
  isQRCodeLogin: boolean
  setIsQRCodeLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchLoginMethodButton: React.FC<SwitchLoginMethodButtonProps> = ({
                                                                           isQRCodeLogin,
                                                                           setIsQRCodeLogin
                                                                         }) => {
  return (
    <Button
      style={{
        width: "100%",
        marginTop:20,
        borderColor: "#D6A5D6",
        color: "#D6A5D6",
        borderRadius: '4px',
      }}
      onClick={() => setIsQRCodeLogin(!isQRCodeLogin)} // 切换登录方式
      ghost
    >
      {isQRCodeLogin ? '邮箱登录' : '飞书登录'}
    </Button>
  )
}

export default SwitchLoginMethodButton
