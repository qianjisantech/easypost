import { useState, useEffect } from 'react';
import { JsonSchemaEditorProps } from '@/components/JsonSchema';
import { Segmented, Tabs, TabsProps } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface JsonSchemaCardProps extends Pick<JsonSchemaEditorProps, 'value' | 'onChange'> {
    editorProps?: JsonSchemaEditorProps;
}

export function RunResponse(props: JsonSchemaCardProps) {
    const { value = {}, onChange, editorProps } = props;
    const [body, setBodyStr] = useState<string>(''); // 设置 body 初始值为空字符串

    // 使用 useEffect 来监听 value 的变化并更新 body
    useEffect(() => {
        const data = value.data;
        if (typeof data === 'object') {
            setBodyStr(JSON.stringify(data, null, 2)); // 格式化对象为 JSON 字符串
        } else {
            setBodyStr(data || ''); // 如果不是对象，直接赋值
        }
    }, [value.data]);

    // 判断是否是有效的 JSON 字符串
    const isJson = (str: string) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    const [alignValue, setAlignValue] = useState<Align>('pretty');
    type Align = 'pretty' | 'raw' | 'preview';

    // 渲染不同的响应体内容
    const renderResponseBody = () => {
        switch (alignValue) {
            case 'pretty':
                return (
                    <div
                        style={{
                            width: '50%', // 固定宽度为 100%（或根据需要设置为固定值）
                            height: '400px', // 设置固定高度，例如 400px
                            border: '2px solid #ffffff', // 实线边框，设置颜色为黑色，厚度为 2px
                            borderRadius: '4px', // 圆角
                            backgroundColor: '#ffffff', // 背景色
                            padding: '8px 12px', // 内边距
                            fontFamily: 'Arial, sans-serif', // 字体
                            fontSize: '14px', // 字号
                            color: '#333', // 字体颜色
                            whiteSpace: 'pre-wrap', // 保持换行
                            wordBreak: 'break-word', // 长单词换行
                            overflowWrap: 'break-word', // 自动换行
                            overflow: 'auto', // 当内容溢出时，添加滚动条
                        }}
                    >
                        {isJson(body) ? (
                            <SyntaxHighlighter language="json" style={docco}>
                                {body}
                            </SyntaxHighlighter>
                        ) : (
                            <SyntaxHighlighter language="html" style={docco}>
                                {body}
                            </SyntaxHighlighter>
                        )}
                    </div>
                );
            case 'raw':
                return <pre>{body}</pre>; // 原始内容显示
            case 'preview':
                return <div>{body}</div>; // 预览内容
            default:
                return null;
        }
    };


    const ResponseInfoItem: TabsProps['items'] = [
        {
            key: 'body',
            label: 'Body',
            children: (
                <div>
                    <Segmented
                        value={alignValue}
                        style={{ marginBottom: 8 }}
                        onChange={setAlignValue}
                        options={['pretty', 'raw', 'preview']}
                    />
                    {renderResponseBody()} {/* 渲染响应体内容 */}
                </div>
            ),
        },
        { key: 'cookie', label: 'Cookie', children: 'Content of Tab Pane 2' },
        { key: 'header', label: 'Header', children: 'Content of Tab Pane 3' },
        { key: 'console', label: '控制台', children: 'Content of Tab Pane 3' },
        { key: 'actualRequest', label: '实际请求', children: 'Content of Tab Pane 3' },
    ];

    return (
        <div>
            <Tabs
                defaultActiveKey="body"
                items={ResponseInfoItem}
                indicator={{ size: (origin) => origin - 20, align: 'center' }}
            />
        </div>
    );
}
