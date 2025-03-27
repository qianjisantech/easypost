import { useState, useEffect } from 'react';
import { JsonSchemaEditorProps } from '@/components/JsonSchema';
import { RadioChangeEvent, Segmented, Select, SelectProps, Space, Tabs, TabsProps } from "antd";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface JsonSchemaCardProps extends Pick<JsonSchemaEditorProps, 'value' | 'onChange'> {
    editorProps?: JsonSchemaEditorProps;
}

export function Authorization(props: JsonSchemaCardProps) {
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

    const [size, setSize] = useState<SizeType>('middle');

    const handleSizeChange = (e: RadioChangeEvent) => {
        setSize(e.target.value);
    };
    const options: SelectProps['options'] = [
        {
            label:'No Auth',
            value: 'No Auth',
        },
        {
            label:'Basic Auth',
            value: 'Basic Auth',
        },
        {
            label:'Bearer Token',
            value: 'Bearer Token',
        },
        {
            label:'Api Key',
            value: 'Api Key',
        },
        {
            label:'OAuth 2.0',
            value: 'OAuth 2.0',
        },
        {
            label:'Digest Auth',
            value: 'Digest Auth',
        },
        {
            label:'Hawk Authorization',
            value: 'Hawk Authorization',
        },
    ];



    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };



    return (
        <>

                <div  style={{ width: 200,marginTop:30,marginLeft:30 }}>类型</div>
                <Select
                size='large'
                defaultValue="No Auth"
                onChange={handleChange}
                style={{ width: 200,marginTop:10,marginLeft:30 }}
                options={options}
            />


  </>
    )}
