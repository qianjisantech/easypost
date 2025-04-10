import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from '@monaco-editor/react';
import { Button, Divider, Space } from "antd";
import { CodeOutlined, ExpandOutlined, ShrinkOutlined } from "@ant-design/icons";

interface PostmanStyleJsonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled: boolean;
}

function PostmanStyleJsonEditor(props: PostmanStyleJsonEditorProps) {
  const { disabled, defaultValue, value = defaultValue, onChange } = props;
  const [theme, setTheme] = useState('light');
  const [rawJson, setRawJson] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 1. 定义稳定主题
  useEffect(() => {
    const monaco = window.monaco;
    if (!monaco) return;

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineNumbersBackground': '#f5f5f5',
        'editor.lineNumbersColor': '#666666',
      }
    });

    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.lineNumbersBackground': '#252526',
        'editor.lineNumbersColor': '#858585',
      }
    });
  }, []);

  // 处理编辑器挂载
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // 应用当前主题
    monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');

    // 立即触发布局计算
    requestAnimationFrame(() => {
      editor.layout();
      editor.render();
    });

    // 添加resize观察器
    const resizeObserver = new ResizeObserver(() => {
      editor.layout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  };

  // 主题同步
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      window.monaco.editor.setTheme(theme === 'dark' ? 'custom-dark' : 'custom-light');
    }
  }, [theme]);

  // 初始化组件
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // 处理编辑器变化
  const handleMonacoChange = (value: string | undefined) => {
    if (disabled) return;
    setRawJson(value || '');
    onChange?.(value || '');
  };

  // 格式化 JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // 压缩 JSON
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial',
      position: 'relative',
    }}>
      {/* 按钮容器 */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '12px',
        padding: '8px 12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e9ecef',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        <Space>
          <Button
            type="text"
            size="small"
            onClick={formatJson}
            icon={<ExpandOutlined />}
            style={buttonStyle}
          >
            格式化
          </Button>
          <Button
            type="text"
            size="small"
            onClick={minifyJson}
            icon={<ShrinkOutlined />}
            style={buttonStyle}
          >
            压缩
          </Button>
          <Divider type="vertical" style={{ margin: '0 8px', height: '20px' }} />
          {error && (
            <span style={{
              color: '#ff4d4f',
              marginLeft: '12px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px'
            }}>
              {error}
            </span>
          )}
        </Space>
      </div>

      {/* 编辑器区域 */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {isMounted && (
          <MonacoEditor
            height="500px"
            language="json"
            theme={theme === 'dark' ? 'custom-dark' : 'custom-light'}
            value={rawJson}
            onChange={handleMonacoChange}
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
            // 覆盖默认的编辑器贡献（去除只读警告）
            beforeMount={(monaco) => {
              monaco.editor.onDidCreateEditor((editor) => {
                editor.onDidAttemptReadOnlyEdit(() => {
                  // 空函数，阻止默认警告行为
                });
              });
            }}
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
          />
        )}
      </div>
    </div>
  );
}

// 按钮样式常量
const buttonStyle = {
  color: '#495057',
  border: 'none',
  borderRadius: '4px',
  padding: '0 8px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: '#e9ecef',
    color: '#212529'
  },
  ':active': {
    backgroundColor: '#dee2e6'
  },
  ':disabled': {
    color: '#adb5bd',
    cursor: 'not-allowed'
  }
};

export default PostmanStyleJsonEditor;