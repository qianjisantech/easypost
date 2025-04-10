import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { JsonEditor as Editor } from 'react-json-editor-ajrm';
import { validate } from 'jsonschema';
import { Button } from "antd";

interface JsonEditorChangeEvent {
  jsObject: any;
  json: string;
  error: Error | null;
}
interface PostmanStyleJsonEditorProps {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
}
function PostmanStyleJsonEditor(props:PostmanStyleJsonEditorProps) {
  const { defaultValue, value = defaultValue, onChange } = props

  const [json, setJson] = useState(value);
  const [rawJson, setRawJson] = useState(value);
  const [error, setError] = useState<string | null>(null);

  // 处理 react-json-editor-ajrm 的变化
  const handleJsonEditorChange = (data: JsonEditorChangeEvent) => {
    if (!data.jsObject) return;
    setJson(data.jsObject);
    setRawJson(JSON.stringify(data.jsObject, null, 2));
    setError(data.error ? data.error.message : null);
  };

  // 处理 Monaco Editor 的变化
  const handleMonacoChange = (value: string | undefined) => {
    setRawJson(value || '');
    try {
      const parsed = JSON.parse(value || '{}');
      setJson(parsed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

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

  // 验证 JSON
  const validateJson = () => {
    try {
      JSON.parse(rawJson);
      setError(null);
      alert('JSON 有效!');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div style={{  fontFamily: 'Arial' }}>
      <div style={{ marginBottom: '10px', marginTop: '10px', right: 0 }}>
        <Button type={"primary"} size={"small"} onClick={formatJson} style={{ marginRight: '10px' }}>美化</Button>
        <Button type={"primary"} size={"small"} onClick={minifyJson}>压缩</Button>
        {/*<Button onClick={validateJson} style={buttonStyle}>验证</Button>*/}
        {error && <span style={{ color: 'red', marginLeft: '10px' }}>{error}</span>}
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 使用 react-json-editor-ajrm */}

        {/* 使用 Monaco Editor */}
        <MonacoEditor
          height="500px"
          language="json"
          theme="vs"
          value={rawJson}
          onChange={handleMonacoChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            renderWhitespace: 'none',
            formatOnPaste: true,
            formatOnType: true,
            lineNumbers: 'on',  // 显示行号
            lineNumbersMinChars: 3,  // 行号最小宽度
            lineDecorationsWidth: 10,  // 行号区域宽度
          }}
        />
      </div>


    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  marginRight: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default PostmanStyleJsonEditor;