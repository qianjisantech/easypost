import { useState, useEffect } from 'react';
import { JsonSchemaEditorProps } from '@/components/JsonSchema';
import { Tabs, TabsProps } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DOMPurify from 'dompurify';

interface JsonSchemaCardProps extends Pick<JsonSchemaEditorProps, 'value' | 'onChange'> {
    editorProps?: JsonSchemaEditorProps;
}

export function RunResponse(props: JsonSchemaCardProps) {
    const { value = {}, onChange, editorProps } = props;
    const [body, setBodyStr] = useState<string>(''); // 设置 body 初始值为空字符串

    // 使用 useEffect 来监听 value 的变化并更新 body
    useEffect(() => {
        // 如果 value.data 是对象，需要将其转换为 JSON 字符串
        const data = value.data;
        if (typeof data === 'object') {
            setBodyStr(JSON.stringify(data, null, 2)); // 格式化对象为 JSON 字符串
        } else {
            setBodyStr(data || ''); // 如果不是对象，直接赋值
        }
    }, [value.data]);

    console.log('body', body);

    // 判断是否是有效的 JSON 字符串
    const isJson = (str: string) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Tabs 配置
    const [alignValue, setAlignValue] = useState<Align>('center');
    const items: TabsProps['items'] = [
        {
            key: 'body',
            label: 'Body',
            children: (
                <div
                    style={{
                        border: '1px solid #dcdfe6', // 模拟边框
                        borderRadius: '4px', // 圆角
                        backgroundColor: '#ffffff', // 背景色
                        padding: '8px 12px', // 内边距
                        fontFamily: 'Arial, sans-serif', // 字体
                        fontSize: '14px', // 字号
                        color: '#333', // 字体颜色
                        whiteSpace: 'pre-wrap', // 保持换行
                        wordBreak: 'break-word', // 长单词换行
                        overflowWrap: 'break-word', // 自动换行
                    }}
                >
                    {/* 如果是有效的 JSON 字符串，则格式化显示；否则，作为普通文本或 HTML 渲染 */}
                    {isJson(body) ? (
                        <SyntaxHighlighter language="json" style={docco}>
                            {body}
                        </SyntaxHighlighter> // 使用 Prism 来高亮 JSON 内容
                    ) : (
                        // 如果不是 JSON 字符串，展示为普通文本或 HTML
                        <SyntaxHighlighter language={'html'} style={docco}>{body}</SyntaxHighlighter>
                    )}
                </div>
            ),
        },
        { key: 'cookie', label: 'Cookie', children: 'Content of Tab Pane 2' },
        { key: 'header', label: 'Header', children: 'Content of Tab Pane 3' },
        { key: 'console', label: '控制台', children: 'Content of Tab Pane 3' },
        { key: 'actualRequest', label: '实际请求', children: 'Content of Tab Pane 3' },
    ];

    type Align = 'start' | 'center' | 'end';

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                items={items}
                indicator={{ size: (origin) => origin - 20, align: alignValue }}
            />
        </div>
    );
}
