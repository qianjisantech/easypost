import { Flex, Tag } from 'antd'
import { RequestBodyRaw } from '@/components/tab-content/api/components/RequestBodyRaw'
import { BodyType } from '@/enums'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDetails } from '@/types'
import { ParamsEditableTable } from '../components/ParamsEditableTable'
import { useEffect } from 'react'

const types = [
  { name: 'none', type: BodyType.None },
  { name: 'form-data', type: BodyType.FormData },
  { name: 'x-www-form-urlencoded', type: BodyType.UrlEncoded },
  { name: 'raw', type: BodyType.Raw },
]

interface BodyCompProps {
  value?: ApiDetails['parameters']['payload']
  onChange?: (value: BodyCompProps['value']) => void
}

function BodyComp(props: BodyCompProps) {
  const { value, onChange } = props

  const { styles } = useStyles(({ token }, css) => {
    return {
      bodyNone: css({
        color: token.colorTextQuaternary,
        border: `1px solid ${token.colorFillSecondary}`,
      }),
    }
  })

  if (!value) {
    return (
      <div className={`flex h-24 items-center justify-center rounded ${styles.bodyNone}`}>
        请选择 Body 类型
      </div>
    )
  }

  // 确保 parameters 总是有值
  const safeValue = {
    ...value,
    parameters: value.parameters || []
  }

  switch (safeValue.type) {
    case BodyType.None:
      return (
        <div className={`flex h-24 items-center justify-center rounded ${styles.bodyNone}`}>
          该请求没有 Body 体
        </div>
      )

    case BodyType.FormData:
    case BodyType.UrlEncoded:
      return (
        <ParamsEditableTable
          value={safeValue.parameters}
          onChange={(values) => {
            onChange?.({ ...safeValue, parameters: values || [] })
          }}
        />
      )

    case BodyType.Raw:
      return (
        <RequestBodyRaw
          value={safeValue.jsonSchema || ''}
          onChange={(values) => {
            onChange?.({ ...safeValue, jsonSchema: values || '' })
          }}
        />
      )

    default:
      return null
  }
}

interface ParamsPayloadProps {
  value?: ApiDetails['parameters']['payload']
  onChange?: (value: ParamsPayloadProps['value']) => void
}

export function ParamsPayload(props: ParamsPayloadProps) {
  const { value, onChange } = props

  // 确保初始值中 parameters 有默认值 []
  const safeValue = value ? {
    ...value,
    parameters: value.parameters || []
  } : { type: BodyType.None, parameters: [] }

  const selectedType = safeValue.type

  const handleTypeChange = (type: BodyType) => {
    const newValue = {
      ...safeValue,
      type,
      // 确保 parameters 总是有值
      parameters: safeValue.parameters || []
    }
    onChange?.(newValue)
  }

  return (
    <div>
      <Flex wrap className="p-2" gap={8}>
        {types.map(({ name, type }) => (
          <Tag.CheckableTag
            key={type}
            checked={type === selectedType}
            onChange={(checked) => checked && handleTypeChange(type)}
          >
            {name}
          </Tag.CheckableTag>
        ))}
      </Flex>

      <div>
        <BodyComp
          value={safeValue}
          onChange={onChange}
        />
      </div>
    </div>
  )
}