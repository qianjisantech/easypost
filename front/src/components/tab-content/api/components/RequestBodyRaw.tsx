import { useRef, useState } from 'react'

import TextArea from 'antd/es/input/TextArea'

interface TextInputProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
}

export function RequestBodyRaw(props: TextInputProps) {
  const { defaultValue, value = defaultValue, onChange } = props

  // 初始化输入框的值
  const [inputValue, setInputValue] = useState<string>(value || '')

  // 编辑器的高度状态
  const [editorHeight, setEditorHeight] = useState<number>(100) // 默认高度 100px

  const editorRef = useRef<HTMLDivElement | null>(null)

  // 输入框内容变化时触发
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    console.log('Input value changed:', inputValue)
    onChange?.(newValue) // 调用回调
  }

  // 处理拖动事件调整高度
  const handleMouseDown = (e: React.MouseEvent) => {
    const startY = e.clientY
    const startHeight = editorHeight

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dy = moveEvent.clientY - startY
      setEditorHeight(startHeight + dy) // 动态更新高度
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      ref={editorRef}
      style={{
        width: '100%',
        height: `${editorHeight}px`,
        position: 'relative',
        border: '1px solid #ccc',
      }}
    >
      {/* 普通输入框 */}
      <TextArea
        style={{
          width: '100%',
          height: '100%',
          padding: '10px',
          fontSize: '14px',
          textAlign: 'left',
          verticalAlign: 'top',
          border: 'none',
        }}
        value={inputValue}
        onChange={handleInputChange}
      />

      {/* 调整高度的拖动手柄 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '10px',
          cursor: 'ns-resize',
          backgroundColor: '#ccc',
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
