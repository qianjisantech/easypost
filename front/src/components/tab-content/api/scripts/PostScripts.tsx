import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, Collapse, Space, Button, Select } from "antd";
import { ApiDetails } from "@/types";
import { ScriptsType } from "@/enums";

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

interface PostScriptsProps {
  value?: ApiDetails['parameters']['postscripts']
  onChange?: (value: { data: string; type: undefined | string }) => void
}

export function PostScripts(props: PostScriptsProps) {
  const { value = {}, onChange } = props;
  const [body, setBody] = useState<string>('')
  const [activeKey, setActiveKey] = useState<string | string[]>(['1','2']);
  const [language, setLanguage] = useState<string>(ScriptsType.JavaScript); // 默认语言为 JavaScript
  useEffect(() => {
    // 安全访问 value.data，提供默认值
    const data = value?.data || ''
    console.log('value.data', value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setBody(typeof data === 'object' ? JSON.stringify(data, null, 2) : data)
  }, [value]);

  // 插入代码片段到编辑器
  const insertSnippet = (snippet: string) => {
    const newValue = body ? `${body}\n${snippet}` : snippet;
    setBody(newValue);
    onChange?.({ data: newValue, type: ScriptsType.JavaScript })
  };
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // 根据选择的语言更新脚本类型
    const scriptType = value === 'javascript' ? ScriptsType.JavaScript :
      value === 'java' ? ScriptsType.Java :
        ScriptsType.Python;
    onChange?.({ data: body, type: scriptType });
  };
  // 代码片段数据
  const snippetItems = [
    {
      key: '1',
      label: '环境变量',
      children: (
        <Space direction="vertical" style={{ width: '100%',alignItems: 'flex-start'  }}>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('pm.environment.get("variable_name")'); }}
          >
            获取环境变量
          </Button>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('pm.environment.set("variable_name", "value")'); }}
          >
            设置环境变量
          </Button>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('pm.variables.get("variable_name")'); }}
          >
            获取临时变量
          </Button>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('pm.variables.set("variable_name", "value")'); }}
          >
            设置临时变量
          </Button>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('pm.sendRequest("https://www.api.com/xxx", function (err, response) {\n' +
              '  console.log(response.json());\n' +
              '});'); }}
          >
            请求接口
          </Button>
        </Space>
      ),
    },
    {
      key: '2',
      label: '高级功能',
      children: (
        <Space direction="vertical" style={{ width: '100%',alignItems: 'flex-start' }}>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('const moment = require(\'moment\');\n' +
              'const CryptoJS = require(\'crypto-js\');\n' +
              '\n' +
              'const timestamp = moment().format(\'YYYY-MM-DD HH:mm:ss\');\n' +
              'const md5Hash = CryptoJS.MD5(timestamp).toString();\n' +
              '\n' +
              'pm.environment.set("timestamp_md5", md5Hash);'); }}
          >
            MD5加密
          </Button>
          <Button
            type={'link'}
            block
            onClick={() => { insertSnippet('const timestamp = new Date().toISOString();\n' +
              'const base64Encoded = btoa(timestamp);  // 编码\n' +
              'const base64Decoded = atob(base64Encoded);  // 解码\n' +
              '\n' +
              '\n' +
              'const base64Encoded = Buffer.from(timestamp).toString(\'base64\');\n' +
              'const base64Decoded = Buffer.from(base64Encoded, \'base64\').toString(\'ascii\');\n' +
              '\n' +
              'pm.environment.set("base64Encoded", base64Encoded);\n' +
              'pm.environment.set("base64Decoded", base64Decoded);'); }}
          >
            Base64加密
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: '100%' }}>
      <div style={{ display: 'flex', height: '100%', gap: 16 }}>
        <div style={{ flex: 1 }}>
          {/* 添加语言选择横条 */}
          <div style={{
            background: 'white',
            padding: '8px 16px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              style={{ width: 120 }}
              options={[
                { value: 'javascript', label: 'JavaScript' },
                { value: 'java', label: 'Java' },
                { value: 'python', label: 'Python' },
              ]}
            />
            <div style={{ color: '#666', fontSize: 12 }}>
              当前语言: {language === 'javascript' ? 'JavaScript' :
              language === 'java' ? 'Java' : 'Python'}
            </div>
          </div>
          <MonacoEditor
            language="javascript"
            value={body}
            theme="vs-light"
            onChange={(newValue) => {
              setBody(newValue || '');
              onChange?.({ data: newValue, type: ScriptsType.JavaScript })
            }}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
              quickSuggestions: true,
              lineNumbers: true,
              tabSize: 2,
            }}
            width="100%"
            height="400px"
            onMount={(editor, monaco) => {
              monaco.languages.registerCompletionItemProvider('javascript', {
                provideCompletionItems: (model, position) => {
                  const suggestions = [
                    {
                      label: 'pm.environment.get',
                      kind: monaco.languages.CompletionItemKind.Function,
                      insertText: 'pm.environment.get("${1:variable_name}")',
                      documentation: 'Get environment variable',
                    },
                    {
                      label: 'pm.environment.set',
                      kind: monaco.languages.CompletionItemKind.Function,
                      insertText: 'pm.environment.set("${1:variable_name}", "${2:value}")',
                      documentation: 'Set environment variable',
                    },
                    {
                      label: 'pm.response.json',
                      kind: monaco.languages.CompletionItemKind.Function,
                      insertText: 'pm.response.json()',
                      documentation: 'Parse response as JSON',
                    },
                  ];
                  return { suggestions };
                },
              });
            }}
          />
        </div>

        {/* 右侧代码片段面板 */}
        <div style={{ width: 250 }}>
          <Card
            title="代码片段"
            size="small"
            bodyStyle={{ padding: 0 }}
          >
            <Collapse
              activeKey={activeKey}
              onChange={setActiveKey}
              bordered={false}
              items={snippetItems}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
export default PostScripts;