import { useState } from 'react'

import { Modal, Space, theme } from 'antd'
import { BracesIcon, CopyIcon, ScanTextIcon } from 'lucide-react'

import {
    type JsonSchema,
    JsonSchemaEditor,
    type JsonSchemaEditorProps,
} from '@/components/JsonSchema'
import { MonacoEditor } from '@/components/MonacoEditor'
import { useGlobalContext } from '@/contexts/global'

import { UIButton } from '@/components/UIBtn'
import TextArea from "antd/es/input/TextArea";

interface JsonSchemaCardProps
    extends Pick<JsonSchemaEditorProps, 'value' | 'onChange' | 'defaultValue'> {
    editorProps?: JsonSchemaEditorProps
}

export function RequestBodyRaw(props: JsonSchemaCardProps) {
    const { token } = theme.useToken()

    const { defaultValue, value = defaultValue, onChange, editorProps } = props

    const [jsonStr, setJsonStr] = useState<string>()
    // const [jsonSchemeStr, setJsonSchemeStr] = useState<string>()

    const { messageApi } = useGlobalContext()
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedValue = e.target.value
        setJsonStr(updatedValue) // 更新 jsonStr 状态
        if (onChange) {
            onChange(updatedValue) // 如果有传入 onChange 事件，也触发它
        }
    }
   console.log("jsonStr",jsonStr)
    return (
       <div>
           <TextArea
               value={jsonStr} // 绑定 jsonStr 作为 value
               autoSize={{ minRows: 3, maxRows: 600 }}
               onChange={handleTextAreaChange} // 更新 jsonStr 的 onChange 事件
               />

       </div>
    )
}
