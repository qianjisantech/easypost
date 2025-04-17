import React, { useEffect, useRef, useState } from 'react'
import { ExpandOutlined, QuestionCircleOutlined, ShrinkOutlined } from '@ant-design/icons'
import MonacoEditor from '@monaco-editor/react'
import { Button, Divider, Space } from 'antd'
import DynamicValueModal from "@/components/DynamicValue/DynamicValueModal";

interface PostmanStyleJsonEditorProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  disabled: boolean
}

function PostmanStyleJsonEditor(props: PostmanStyleJsonEditorProps) {
  const { disabled, defaultValue, value = defaultValue, onChange } = props
  const [theme, setTheme] = useState('light')
  const [rawJson, setRawJson] = useState(value || '')
  const [error, setError] = useState<string | null>(null)
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  // 初始化时设置默认值
  useEffect(() => {
    if (value !== undefined) {
      setRawJson(value)
    }
  }, [value])

  // 1. 定义稳定主题
  useEffect(() => {
    const monaco = window.monaco
    if (!monaco) {
      return
    }

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineNumbersBackground': '#f5f5f5',
        'editor.lineNumbersColor': '#666666',
      },
    })

    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.lineNumbersBackground': '#252526',
        'editor.lineNumbersColor': '#858585',
      },
    })
  }, [])

  // 处理动态值插入
  const handleInsertDynamicValue = (value: string) => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    const selection = editor.getSelection();

    if (selection) {
      // 在当前光标位置执行编辑操作
      editor.executeEdits('insert-dynamic-value', [
        {
          range: selection, // 使用当前选择范围
          text: value,     // 要插入的文本
          forceMoveMarkers: true // 强制移动标记
        }
      ]);

      // 将光标移动到插入内容之后
      const position = selection.getEndPosition();
      editor.setPosition(position);
      editor.focus();

      // 更新状态
      const newValue = editor.getValue();
      setRawJson(newValue);
      onChange?.(newValue);
    } else {
      // 如果没有选择范围，在文档末尾插入
      const model = editor.getModel();
      const fullRange = model.getFullModelRange();
      const endPosition = model.getPositionAt(model.getValueLength());

      editor.executeEdits('insert-dynamic-value', [
        {
          range: {
            startLineNumber: endPosition.lineNumber,
            startColumn: endPosition.column,
            endLineNumber: endPosition.lineNumber,
            endColumn: endPosition.column
          },
          text: value,
          forceMoveMarkers: true
        }
      ]);

      // 将光标移动到新插入内容之后
      const newPosition = model.getPositionAt(model.getValueLength());
      editor.setPosition(newPosition);
      editor.focus();

      // 更新状态
      const newValue = editor.getValue();
      setRawJson(newValue);
      onChange?.(newValue);
    }
  };

  // 处理编辑器挂载
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    // 应用当前主题
    monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light')

    // 立即触发布局计算
    requestAnimationFrame(() => {
      editor.layout()
      editor.render()
    })

    // 添加resize观察器
    const resizeObserver = new ResizeObserver(() => {
      editor.layout()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }

  // 主题同步
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      window.monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light')
    }
  }, [theme])

  // 初始化组件
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  // 处理编辑器变化
  const handleMonacoChange = (value: string | undefined) => {
    if (disabled) {
      return
    }
    const newValue = value || '';
    setRawJson(newValue);
    onChange?.(newValue); // 通知父组件值已变更
  }

  // 格式化 JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(rawJson)
      const formattedJson = JSON.stringify(parsed, null, 2)
      setRawJson(formattedJson)
      onChange?.(formattedJson); // 通知父组件值已变更
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  // 压缩 JSON
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(rawJson)
      const minifiedJson = JSON.stringify(parsed)
      setRawJson(minifiedJson)
      onChange?.(minifiedJson); // 通知父组件值已变更
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  // 动态值按钮的特殊样式
  const dynamicButtonStyle = {
    ...buttonStyle,
    marginRight: '8px',
    backgroundColor: '#f0f0f0', // 浅灰色背景
    ':hover': {
      backgroundColor: '#e0e0e0', // 悬停时稍深的灰色
      color: '#212529'
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial',
        position: 'relative',
      }}
    >
      {/* 按钮容器 - 修改为左右布局 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // 左右两端对齐
          alignItems: 'center', // 垂直居中
          marginBottom: '8px',
          padding: '4px 8px',
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          border: '1px solid #e9ecef',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {/* 左侧 - 自动生成按钮和动态值弹窗 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between', // 左右两端对齐
          alignItems: 'center', // 垂直居中
        }}>
          <Button
            type="text"
            size="small"
            icon={<QuestionCircleOutlined />}
            style={dynamicButtonStyle}
            onClick={() => setModalVisible(true)}
          >
            自动生成
          </Button>
          <DynamicValueModal
            visible={modalVisible}
            onClose={() => { setModalVisible(false); }}
            onInsert={handleInsertDynamicValue}
          />
        </div>

        {/* 右侧 - 格式化、压缩按钮和错误信息 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {error && (
            <span
              style={{
                color: '#ff4d4f',
                marginRight: '8px',
                fontSize: '12px',
              }}
            >
              {error}
            </span>
          )}
          <Space>
            <Button
              icon={<ExpandOutlined />}
              size="small"
              style={buttonStyle}
              type="text"
              onClick={formatJson}
            >
              格式化
            </Button>
            <Button
              icon={<ShrinkOutlined />}
              size="small"
              style={buttonStyle}
              type="text"
              onClick={minifyJson}
            >
              压缩
            </Button>
          </Space>
        </div>
      </div>

      {/* 编辑器区域 */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {isMounted && (
          <MonacoEditor
            beforeMount={(monaco) => {
              monaco.editor.onDidCreateEditor((editor) => {
                editor.onDidAttemptReadOnlyEdit(() => {
                  // 空函数，阻止默认警告行为
                });
              });
            }}
            height="500px"
            language="json"
            options={{
              readOnly: disabled,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              renderWhitespace: 'none',
              formatOnPaste: true,
              formatOnType: true,
              lineNumbers: 'on',
              lineNumbersMinChars: 3,
              lineDecorationsWidth: 10,
              hover:{enabled:false},
              cursorStyle:'line',
            }}
            theme={theme === 'dark' ? 'custom-dark' : 'custom-light'}
            onMount={(editor, monaco) => {
              // 1. 移除默认的只读警告处理器
              editor.onDidAttemptReadOnlyEdit = () => {};

              // 2. 覆盖编辑器贡献点
              const contributions = editor.getContribution('editor.contrib.readOnlyMessage');
              if (contributions) {
                contributions.dispose();
              }

              handleEditorDidMount(editor, monaco);
            }}
            value={rawJson}
            onChange={handleMonacoChange}
          />
        )}
      </div>
    </div>
  )
}

// 按钮样式常量
const buttonStyle = {
  marginRight: '8px',
  color: '#495057',
  border: 'none',
  borderRadius: '4px',
  padding: '0 8px',
  height: '24px',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: '#f0f0f0',
    color: '#212529',
  },
  ':active': {
    backgroundColor: '#e0e0e0',
  },
  ':disabled': {
    color: '#adb5bd',
    cursor: 'not-allowed',
  },
}

export default PostmanStyleJsonEditor