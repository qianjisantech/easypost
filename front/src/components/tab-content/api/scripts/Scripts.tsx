import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { JsonSchemaEditorProps } from '@/components/JsonSchema';
import { Tabs, TabsProps } from 'antd';

// 动态加载 MonacoEditor，避免初次加载时影响性能
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
    ssr: false, // 禁用 SSR 渲染
});

interface JsonSchemaCardProps extends Pick<JsonSchemaEditorProps, 'value' | 'onChange'> {
    editorProps?: JsonSchemaEditorProps;
}

export function Scripts(props: JsonSchemaCardProps) {
    const { value = {}, onChange, editorProps } = props;
    const [body, setBodyStr] = useState<string>('');

    useEffect(() => {
        const data = value.data;
        setBodyStr(typeof data === 'object' ? JSON.stringify(data, null, 2) : data || '');
    }, [value.data]);

    // Monaco 编辑器的配置
    const renderMonacoEditor = (onChange: (value: string) => void) => (
        <MonacoEditor
            language="javascript" // 设置 JavaScript 语言
            value={body} // 初始值
            theme="vs-dark" // 设置主题
            onChange={(newValue) => {
                setBodyStr(newValue || ''); // 更新值
                onChange(newValue || ''); // 触发 onChange 事件
            }}
            options={{
                automaticLayout: true, // 自动布局
                minimap: { enabled: false, showSlider: 'mouseover' }, // 禁用小地图
                quickSuggestions: true, // 启用快速建议（代码补全）
                snippetSuggestions: 'inline', // 启用内联代码片段建议
                suggestOnTriggerCharacters: true, // 启用在触发字符时提供建议
                wordBasedSuggestions: true,
                parameterHints: true,
                lineNumbers: true,
                tabSize: 2,
            }}
            width="100%"
            height="300px"
            onMount={(editor, monaco) => {
                // 在 Monaco Editor 加载后注册补全提供者
                monaco.languages.registerCompletionItemProvider('javascript', {
                    provideCompletionItems: (model, position) => {
                        const word = model.getWordAtPosition(position);
                        const suggestions = [
                            {
                                label: 'console.log',
                                kind: monaco.languages.CompletionItemKind.Function,
                                insertText: 'console.log($1);',
                                detail: 'Log output to console',
                                documentation: 'This will log output to the console',
                            },
                            {
                                label: 'alert',
                                kind: monaco.languages.CompletionItemKind.Function,
                                insertText: 'alert($1);',
                                detail: 'Display an alert box',
                                documentation: 'This will show an alert dialog box',
                            },
                            // pm.environment.set 的补全项
                            {
                                label: 'pm.environment.set',
                                kind: monaco.languages.CompletionItemKind.Function,
                                insertText: 'pm.environment.set("$1", "$2");',
                                detail: 'Set an environment variable in Postman',
                                documentation: 'This will set an environment variable in Postman',
                            },
                            // 你可以继续添加其他的补全项
                        ];

                        // 在输入 pm. 时提供 pm.environment.set 补全
                        if (word && word.word.startsWith('pm.')) {
                            return { suggestions };
                        }

                        // 返回空数组，如果当前输入不匹配 pm.，就不提供任何补全项
                        return { suggestions: [] };
                    },
                });
            }}
        />
    );

    // Tabs 配置
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '前置脚本',
            children: <div>{renderMonacoEditor(onChange)}</div>,
        },
    ];

    return (
        <div style={{ height: '100%' }}>
            <Tabs
                tabPosition="left"
                items={items}
                style={{
                    marginTop: 40,
                    marginLeft: 5,
                    height: '100%',
                }}
            />
        </div>
    );
}
