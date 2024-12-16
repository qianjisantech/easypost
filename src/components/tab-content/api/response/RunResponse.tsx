import { useState, useEffect } from 'react';
import { JsonSchemaEditorProps } from '@/components/JsonSchema';
import TextArea from 'antd/es/input/TextArea';

interface JsonSchemaCardProps extends Pick<JsonSchemaEditorProps, 'value' | 'onChange'> {
    editorProps?: JsonSchemaEditorProps;
}

export function RunResponse(props: JsonSchemaCardProps) {
    const { value = {}, onChange, editorProps } = props;

    // 初始化 data，确保在初始渲染时正确获取 value.data
    const [data, setJsonStr] = useState<string>(JSON.stringify(value.data, null, 2) || ''); // 格式化为 JSON 字符串

    // 使用 useEffect 来监听 value 的变化并更新 data
    useEffect(() => {
        if (value.data !== data) {
            setJsonStr(JSON.stringify(value.data, null, 2) || ''); // 格式化为 JSON 字符串
        }
    }, [value.data]); // 当 value.data 变化时，更新 data

    // 处理 TextArea 的变化
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedValue = e.target.value;
        setJsonStr(updatedValue); // 更新本地的 JSON 字符串状态

        // 如果传入了 onChange，则触发它
        if (onChange) {
            try {
                const parsedData = JSON.parse(updatedValue); // 尝试解析 JSON
                onChange({ data: parsedData }); // 如果解析成功，则传递解析后的数据
            } catch (error) {
                console.error('Invalid JSON format:', error);
            }
        }
    };

    return (
        <div>
            <TextArea
                value={data} // 使用格式化后的 JSON 字符串
                autoSize={{minRows: 3, maxRows: 600}} // 设置自适应行数
                readOnly // 只读，禁止修改
                onChange={handleTextAreaChange} // 设置 onChange 事件（可以去掉，禁止修改时不需要 onChange）
                style={{
                    border: '1px solid #dcdfe6',  // 模拟边框
                    borderRadius: '4px',          // 圆角
                    backgroundColor: '#f5f7fa',   // 背景色
                    padding: '8px 12px',          // 内边距
                    fontFamily: 'Arial, sans-serif', // 字体
                    fontSize: '14px',             // 字号
                    color: '#333',                // 字体颜色
                    resize: 'none',               // 禁止调整大小
                    cursor: 'default',            // 禁止编辑时的光标
                }}
                {...editorProps} // 将额外的 editorProps 传递给 TextArea
            />
        </div>
    );
}
