import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from '@monaco-editor/react';
import { JsonEditor as Editor } from 'react-json-editor-ajrm';
import { validate } from 'jsonschema';
import { Button, Divider, Space } from "antd";
import { CodeOutlined, ExpandOutlined, ShrinkOutlined } from "@ant-design/icons";

interface JsonEditorChangeEvent {
  jsObject: any;
  json: string;
  error: Error | null;
}
interface PostmanStyleJsonEditorProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  disabled: boolean
}
function PostmanStyleJsonEditor(props: PostmanStyleJsonEditorProps) {
  const { disabled,defaultValue, value = defaultValue, onChange } = props

  const [json, setJson] = useState(value);
  const [rawJson, setRawJson] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  // 处理 react-json-editor-ajrm 的变化
  const handleJsonEditorChange = (data: JsonEditorChangeEvent) => {
    if (!data.jsObject) return;
    setJson(data.jsObject);
    setRawJson(JSON.stringify(data.jsObject, null, 2));
    setError(data.error ? data.error.message : null);
  };

  // 处理 Monaco Editor 的变化
  const handleMonacoChange = (value: string | undefined) => {
    if (disabled) return;
    setRawJson(value || '');
    onChange?.(value || '');
  };
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  // 格式化 JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed, null, 2));
      setJson(parsed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

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

  useEffect(() => {
    if (editorRef.current) {
      // 手动触发编辑器布局计算
      setTimeout(() => {
        editorRef.current?.layout();
      }, 0);
    }
  }, []);
  // 压缩 JSON
  const minifyJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setRawJson(JSON.stringify(parsed));
      setJson(parsed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial',
      position: 'relative',
      opacity: disabled ? 0.7 : 1, // 轻度透明
    }}>
      {/* 按钮容器 - 使用 flex 布局右对齐 */}
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
            disabled={disabled}
          >
            格式化
          </Button>
          <Button
            type="text"
            size="small"
            onClick={minifyJson}
            icon={<ShrinkOutlined />}
            style={buttonStyle}
            disabled={disabled}
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
            theme="vs"
            value={rawJson}
            onChange={handleMonacoChange}
            onMount={handleEditorDidMount} // 添加挂载回调
            options={{
              readOnly: disabled || false, // 设置为只读
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
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PostmanStyleJsonEditor;

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