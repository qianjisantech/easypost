import { useEffect, useRef, useState } from 'react'

import { MonacoEditor } from '@/components/MonacoEditor'

interface JsonSchemaCardProps {
  value?: string | object
  onChange?: (value: string) => void
  defaultValue?: string | object
}

export function RequestBodyRaw(props: JsonSchemaCardProps) {
  const { defaultValue, value = defaultValue, onChange } = props

  // 确保 `value` 始终是合法 JSON 字符串
  const safeStringify = (val: unknown): string => {
    if (val === undefined || val === null) {
      return '' // 避免 undefined 和 null
    }
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val) // 确保是 JSON
        return JSON.stringify(parsed, null, 2) // 格式化返回
      } catch {
        return JSON.stringify({ error: 'Invalid JSON string' }, null, 2)
      }
    }
    try {
      return JSON.stringify(val, null, 2) // 对象直接转 JSON
    } catch {
      return JSON.stringify({ error: 'JSON.stringify failed' }, null, 2)
    }
  }

  // 初始化 `jsonStr`，确保是合法 JSON
  const [jsonStr, setJsonStr] = useState<string>('')

  // 编辑器的高度状态
  const [editorHeight, setEditorHeight] = useState<number>(200) // 默认高度 200px

  const editorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const formattedValue = safeStringify(value)
    setJsonStr(formattedValue)
  }, [value]) // `value` 变更时更新 JSON

  const handleEditorChange = (newValue: string) => {
    setJsonStr(newValue)
    onChange?.(newValue) // 调用回调
  }

  // 处理拖动事件
  const handleMouseDown = (e: React.MouseEvent) => {
    const startY = e.clientY
    const startHeight = editorHeight

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dy = moveEvent.clientY - startY
      setEditorHeight(startHeight + dy) // 仅更新高度
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
        fontFamily: 'monospace',
        overflow: 'hidden',
        marginTop: '20px',
      }}
    >
      <style>
        {`
         /* 彻底隐藏 Monaco Editor 的错误提示红条 */
      .monaco-editor .squiggly-error {
        display: none !important;
        }
          /* 自定义 Monaco Editor 滚动条样式 */
          .monaco-editor .monaco-scrollable-element > .scrollbar {
            background-color: rgba(0, 0, 0, 0.1) !important; /* 滚动条背景颜色 */
            border-radius: 4px;
          }

          .monaco-editor .monaco-scrollable-element > .scrollbar > .slider {
            background-color: rgba(0, 0, 0, 0.3) !important;
            border-radius: 4px;
          }

          .monaco-editor .monaco-scrollable-element > .scrollbar:hover > .slider {
            background-color: rgba(0, 0, 0, 0.5) !important;
          }

          /* 拖动区域样式 */
          .resize-handle {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 10px;
            cursor: ns-resize;
            background-color: #ccc;
          }
        `}
      </style>

      <MonacoEditor
        height="100%" // Monaco 编辑器自适应父元素高度
        language="json"
        options={{
          wordWrap: 'off',
          minimap: { enabled: false },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            alwaysConsumeMouseWheel: false,
          },
        }}
        theme={'light'}
        value={jsonStr} // 确保 `value` 是合法的字符串
        width="100%"
        onChange={handleEditorChange}
      />

      {/* 可拖动的底部区域 */}
      <div className="resize-handle" onMouseDown={handleMouseDown} />
    </div>
  )
}
