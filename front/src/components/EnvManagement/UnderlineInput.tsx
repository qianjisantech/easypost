import { ConfigProvider, Input, type InputProps, theme } from 'antd'
import { css } from '@emotion/css'
import React from 'react'

interface UnderlineInputProps extends InputProps {
  /**
   * 输入框的值
   */
  value?: string
  /**
   * 值变化时的回调函数
   * @param value 当前输入值
   * @param event 原始事件（可选）
   */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * 占位文本
   */
  placeholder?: string
  /**
   * 是否显示必填标记
   * @default false
   */
  required?: boolean
}

export const UnderlineInput = React.forwardRef<Input, UnderlineInputProps>(
  ({ value, onChange, placeholder, required, ...restProps }, ref) => {
    const { token } = theme.useToken()

    // 定义样式
    const styles = {
      wrapper: css({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
      }),
      input: css({
        color: token.colorText,
        borderBottom: `1px solid ${token.colorBorder}`,
        padding: `0 ${token.paddingXXS}px`,
        transition: 'border-color 0.2s ease',
        flex: 1,
        fontSize: token.fontSizeLG,
        fontWeight: token.fontWeightStrong,

        '&:hover': {
          borderColor: token.colorPrimaryHover,
        },

        '&:focus': {
          borderColor: token.colorPrimary,
          boxShadow: 'none',
        },

        '&.ant-input-status-error': {
          borderColor: token.colorError,
        }
      }),
      requiredMark: css({
        color: token.colorError,
        marginRight: token.marginXXS,
      })
    }

    // 处理输入变化
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        // 同时提供值和原始事件
        onChange(e.target.value, e)
      }
    }

    return (
      <ConfigProvider
        theme={{
          components: {
            Input: {
              borderRadiusLG: 0,
              paddingInlineLG: 0,
              paddingBlockLG: token.paddingXXS,
              hoverBorderColor: token.colorPrimary,
              activeBorderColor: token.colorPrimary,
            },
          },
        }}
      >
        <div className={styles.wrapper}>
          {required && <span className={styles.requiredMark}>*</span>}
          <Input
            {...restProps}
            ref={ref}
            value={value}
            onChange={handleChange}  // 确保使用内部处理函数
            placeholder={placeholder}
            className={styles.input}
            size="large"
            variant="borderless"
          />
        </div>
      </ConfigProvider>
    )
  }
)

UnderlineInput.displayName = 'UnderlineInput'