import { useRef, useState } from 'react'

import TextArea from 'antd/es/input/TextArea'
import PostmanStyleJsonEditor from "@/components/JsonSchema/PostmanStyleJsonEditor";
import { Input } from "antd";

interface TextInputProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
}

export function RequestBodyJson(props: TextInputProps) {
  const { defaultValue, value = defaultValue, onChange } = props

  // 初始化输入框的值
  const [inputValue, setInputValue] = useState<string>(value || '')

  // 编辑器的高度状态
  const [editorHeight, setEditorHeight] = useState<number>(300) // 默认高度 100px

  const editorRef = useRef<HTMLDivElement | null>(null)

  // 输入框内容变化时触发
// 修改后的处理函数，直接接收字符串值
  const handleEditorChange = (newValue: string) => {
    setInputValue(newValue)
    console.log('Editor value changed:', newValue)
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
      <PostmanStyleJsonEditor  onChange={handleEditorChange} defaultValue={""} disabled={false} value={inputValue}></PostmanStyleJsonEditor>

      {/* 调整高度的拖动手柄 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          cursor: 'ns-resize',
          backgroundColor: '#ccc',
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
