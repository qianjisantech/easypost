import { useEffect, useMemo, useState } from "react";

import { Viewer } from "@bytemd/react";
import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  message,
  Select,
  type SelectProps,
  Space,
  Tabs,
  theme,
  Tooltip
} from "antd";
import dayjs from "dayjs";
import jsonBeautify from "json-beautify";
import { Code2Icon, ZapIcon } from "lucide-react";

import { ApiDocDetail } from "@/api/ams/api";
import { useTabContentContext } from "@/components/ApiTab/TabContentContext";
import { IconText } from "@/components/IconText";
import { JsonViewer } from "@/components/JsonViewer";
import { ApiRemoveButton } from "@/components/tab-content/api/ApiRemoveButton";
import { API_STATUS_CONFIG, HTTP_METHOD_CONFIG } from "@/configs/static";
import { useGlobalContext } from "@/contexts/global";
import { getContentTypeString } from "@/helpers";
import { useStyles } from "@/hooks/useStyle";
import type { ApiDetails, Parameter } from "@/types";

import { css } from "@emotion/css";
import { BodyType } from "@/enums";
import GenerateCode from "@/components/GenerateCode";
interface ApiData {
  method: string;
  path: string;
  headers?: Record<string, string>;
  parameters?: any;
  body?: any;
  responses?: any;
}

const statusOptions: SelectProps['options'] = Object.entries(API_STATUS_CONFIG).map(
  ([method, { text, color }]) => {
    return {
      value: method,
      label: (
        <span className="flex items-center">
          <span
            className="mr-2 inline-block size-[6px] rounded-full"
            style={{ backgroundColor: `var(${color})` }}
          />
          <span>{text}</span>
        </span>
      ),
    }
  }
)

function GroupTitle(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h2 className={`text-base font-semibold opacity-80 ${props.className ?? ''}`}>
      {props.children}
    </h2>
  )
}

function BaseInfoItem({ label, value }: { label: string; value?: string }) {
  const { token } = theme.useToken()

  return (
    <div>
      <span style={{ color: token.colorTextTertiary }}>{label}</span>
      <span className="ml-2" style={{ color: token.colorTextSecondary }}>
        {value || '-'}
      </span>
    </div>
  )
}

function ApiParameter({ param }: { param: Parameter }) {
  const { token } = theme.useToken()

  const isLongDesc = param.description?.includes('\n')

  return (
    <div>
      <Space>
        <span
          className="inline-flex items-center text-xs font-semibold"
          style={{
            padding: `${token.paddingXXS}px ${token.paddingXS}px`,
            color: token.colorPrimary,
            backgroundColor: token.colorPrimaryBg,
            borderRadius: token.borderRadiusSM,
          }}
        >
          {param.name}
        </span>

        <span
          className="font-semibold"
          style={{
            color: token.colorTextSecondary,
          }}
        >
          {param.type}
        </span>

        {!isLongDesc && (
          <span
            className="text-xs"
            style={{
              color: token.colorTextDescription,
            }}
          >
            {param.description}
          </span>
        )}
      </Space>

      {isLongDesc && (
        <div
          className="mt-2 text-xs"
          style={{
            color: token.colorTextDescription,
          }}
        >
          <Viewer value={param.description || ''} />
        </div>
      )}

      <div className="ml-1 mt-2">
        <span className="text-xs">示例值：</span>
        <span
          className="text-xs"
          style={{
            padding: `0 ${token.paddingXXS}px`,
            color: token.colorTextDescription,
            backgroundColor: token.colorFillQuaternary,
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadiusSM,
          }}
        >
          {param.example}
        </span>
      </div>
    </div>
  )
}

export function ApiDoc({ activeKey,setActiveKey}: { activeKey: string ,setActiveKey: (key: string) => void}) {
  const { token } = theme.useToken()
  const [modalVisible, setModalVisible] = useState(false);
  const { messageApi } = useGlobalContext()
  const { tabData } = useTabContentContext()
  const [apiDetails, setApiDetails] = useState<ApiDetails | null>(null)
  const [apiData, setApiData] = useState<ApiData|null>(null)
  // 加载 API 详情
  const loadingApiDetails = async () => {
    if (!tabData.key) {return;}

    try {
      const response = await ApiDocDetail(tabData.key);
      if (response.data.success) {
        const apiDetails = response.data.data.data;
        console.log('获取到的apiDetails', apiDetails);

        // 立即设置apiDetails和apiData
        setApiDetails(apiDetails);

        // 处理body数据，安全解析JSON
        let parsedBody = null;
        if (apiDetails.parameters?.payload?.jsonSchema) {
          try {
            parsedBody = JSON.parse(apiDetails.parameters.payload.jsonSchema);
          } catch (e) {
            console.error('JSON解析错误:', e);
            parsedBody = apiDetails.parameters.payload.jsonSchema; // 保留原始字符串
          }
        }

        setApiData({
          method: apiDetails.method || 'GET',
          path: apiDetails.path || '',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          headers: transformHeaders(apiDetails.parameters?.header) || {},
          parameters: apiDetails.parameters?.payload?.parameters || null,
          body: parsedBody
        });
      } else {
        setApiDetails(null);
        setApiData(null);
      }
    } catch (error) {
      console.error('获取API详情失败:', error);
      setApiDetails(null);
      setApiData(null);
    }
  };
  // 将apiDetails的header数组转换为Record<string, string>格式
  const transformHeaders = (headers?: Parameter[] | undefined): Record<string, string> => {
    return headers?.reduce((acc, header) => {
      if (header.name && header.example) {
        acc[header.name] = header.example;
      }
      return acc;
    }, {} as Record<string, string>);
  };
  // 计算 `docValue` 和 `methodConfig`
  const { docValue, methodConfig } = useMemo(() => {
    const methodConfig = apiDetails ? HTTP_METHOD_CONFIG[apiDetails.method] : undefined

    return { docValue: apiDetails, methodConfig }
  }, [apiDetails]) //
  useEffect(() => {
    if (activeKey === 'doc') {
      loadingApiDetails()
    }
  }, [activeKey, tabData.key])
  useEffect(() => {
    console.log('ApiDoc apiData',apiData)
  }, [apiData]);
  const generateCodeItems: MenuProps['items'] = [
    {
      key: 'generateApiCode',
      label: '生成接口请求代码',
      onClick: () => {
        setModalVisible(true)
      },
    },
    // {
    //   key: 'generateBusinessCode',
    //   label: '生成业务代码',
    //   onClick: () => {
    //     // 处理生成业务代码逻辑
    //     message.error('还没做，别急')
    //   },
    // },
  ];
  const { styles } = useStyles(({ token }) => {
    return {
      card: css({
        '&.ant-card': {
          '> .ant-card-head': {
            minHeight: 'unset',
            fontWeight: 'normal',
            padding: `0 ${token.paddingSM}px`,
            fontSize: token.fontSize,

            '.ant-card-head-title': {
              padding: `${token.paddingXS}px 0`,
            },
          },
        },
      }),

      tabWithBorder: css({
        '.ant-tabs-content-holder': {
          border: `1px solid ${token.colorBorderSecondary}`,
          borderTop: 'none',
          borderBottomLeftRadius: token.borderRadius,
          borderBottomRightRadius: token.borderRadius,
        },
      }),
    }
  })

  if (!docValue || !methodConfig) {
    return null
  }
  const hasHeaders =
    docValue.parameters?.header &&
    Array.isArray(docValue.parameters?.header) &&
    docValue.parameters.header.length > 0
  const hasPathParams =
    Array.isArray(docValue.parameters?.path) && docValue.parameters?.path.length > 0
  const hasQueryParams =
    Array.isArray(docValue.parameters?.query) && docValue.parameters?.query.length > 0
  const hasCookieParams =
    Array.isArray(docValue.parameters?.cookie) && docValue.parameters?.cookie.length > 0
  const hasJson=docValue.parameters?.payload?.type === BodyType.Json
    && docValue.parameters.payload.jsonSchema
  const hasUrlEncoded=docValue.parameters?.payload?.type === BodyType.UrlEncoded &&Array.isArray(docValue.parameters?.cookie)
    && docValue.parameters.payload.parameters?.length>0
  const hasFormData =docValue.parameters?.payload?.type === BodyType.FormData &&
    Array.isArray(docValue.parameters?.payload?.parameters)&&
  docValue.parameters.payload.parameters?.length > 0
  const hasPayload = hasJson || hasUrlEncoded || hasFormData
  const hasParams = hasPathParams || hasQueryParams || hasCookieParams
  const headers = docValue.parameters?.header
  const payload = docValue.parameters?.payload
  const pathParams = docValue.parameters?.path
  const queryParams = docValue.parameters?.query
  const cookieParams=docValue.parameters?.cookie
  // console.log('hasPathParams', hasPathParams)
  // console.log('hasPayload', hasPayload)
  // console.log('hasCookieParams',hasCookieParams)
  // console.log('hasPayload',hasPayload)
  // console.log('hasJson',hasJson)
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div className="h-full overflow-auto p-tabContent">
      <div className="flex items-center">
        <Space className="group/action">
          <h2 className="text-base font-semibold">{docValue.name}</h2>

          <Space className="opacity-0 group-hover/action:opacity-100" size="small">
            <Tooltip title="复制 ID">
              <Button
                size="small"
                type="link"
                onClick={() => {
                  navigator.clipboard.writeText(docValue.id).then(() => {
                    messageApi.success('已复制')
                  })
                }}
              >
                #{docValue.id}
              </Button>
            </Tooltip>
          </Space>
        </Space>

        <Space className="ml-auto pl-2">
          <Button type="primary"
                  onClick={() => { setActiveKey('run'); }}
          >
            <IconText icon={<ZapIcon size={14} />} text="运行" />
          </Button>

          <Dropdown
            menu={{ items: generateCodeItems }}
            placement="bottom"
            trigger={['click']}
          >
            <Button>
              <IconText icon={<Code2Icon size={14} />} text="生成代码" />
            </Button>
          </Dropdown>

          <ApiRemoveButton tabKey={tabData.key} />
        </Space>
      </div>
      <GenerateCode
        visible={modalVisible}
        onClose={() => { setModalVisible(false); }}
        apiData={apiData}
        key={`code-gen-${tabData.key}`} // 使用 API ID 作为 key 的一部分
      />
      <div className="mb-3">
        <span
          className="mr-2 px-2 py-1 text-xs/6 font-bold text-white"
          style={{
            backgroundColor: `var(${methodConfig.color})`,
            borderRadius: token.borderRadiusOuter,
          }}
        >
          {docValue.method}
        </span>
        <span className="mr-2">{docValue.path}</span>
        <Select options={statusOptions} value={docValue.status} variant="borderless" />
      </div>

      <div className="mb-3">
        <Space>
          {docValue.tags?.map((tag) => {
            return (
              <span
                key={tag}
                className="px-2 py-1 text-xs"
                style={{
                  color: token.colorPrimary,
                  backgroundColor: token.colorPrimaryBg,
                  borderRadius: token.borderRadiusXS,
                }}
              >
                {tag}
              </span>
            )
          })}
        </Space>
      </div>

      <div>
        <Space wrap size="large">
          <BaseInfoItem
            label="创建时间"
            value={dayjs(docValue.createdTime).format('YYYY年M月D日')}
          />
          <BaseInfoItem
            label="修改时间"
            value={dayjs(docValue.updatedTime).format('YYYY年M月D日')}
          />
          <BaseInfoItem label="修改者" value={docValue.updateByName} />
          <BaseInfoItem label="创建者" value={docValue.createByName} />
          <BaseInfoItem
            label="责任人"
            value={docValue.responsible ? JSON.parse(docValue.responsible).username : ''}
          />
        </Space>
      </div>

      {docValue.description ? (
        <div>
          <GroupTitle>接口说明</GroupTitle>
          <Viewer value={docValue.description} />
        </div>
      ) : null}

      <div>
        <GroupTitle>请求参数</GroupTitle>

        {hasParams || hasPayload ? (
          <div className="flex flex-col gap-y-4">
            {hasHeaders && (
              <Card className={styles.card} title={
                <span
                style={{
                  color: "rgb(52, 64, 84)",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                      Header 参数
                    </span>}>
                <div className="flex flex-col gap-3">
                  {headers?.map((param) => <ApiParameter key={param.id} param={param} />)}
                </div>
              </Card>
            )}
            {hasPathParams && (
              <Card className={styles.card}
                    title={
                      <span
                        style={{
                          color: "rgb(52, 64, 84)",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                      Params 参数
                    </span>}
              >
                <div className="flex flex-col gap-3">
                  {pathParams?.map((param) => <ApiParameter key={param.id} param={param} />)}
                </div>
              </Card>
            )}
            {hasCookieParams && (
              <Card className={styles.card}
                    title={
                      <span
                        style={{
                          color: "rgb(52, 64, 84)",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                      Cookie 参数
                    </span>}
              >
                <div className="flex flex-col gap-3">
                  {cookieParams?.map((param) => <ApiParameter key={param.id} param={param} />)}
                </div>
              </Card>
            )}
            {hasQueryParams && (
              <Card className={styles.card}
                    title={
                      <span
                        style={{
                          color: "rgb(52, 64, 84)",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}
                      >
                      Query 参数
                    </span>}>
                <div className="flex flex-col gap-3">
                  {queryParams?.map((param) => <ApiParameter key={param.id} param={param} />)}
                </div>
              </Card>
            )}

            {hasPayload && (
              <Card
                className={styles.card}
                headStyle={{
                  fontSize: "14px", // 设置字体大小
                  color: "#ce7d5f", // 设置字体颜色
                  fontWeight: "bold" // 可选：设置字体粗细
                }}
                title={
                  <span>
                    <span
                      style={{
                        color: "rgb(52, 64, 84)",
                        fontWeight: "bold",
                        fontSize: "14px"
                      }}
                    >
                      Body 参数
                    </span>
                    <span
                      style={{
                        color: "rgb(52, 64, 84)",
                        marginLeft: "10px",
                        fontSize: "12px"
                      }}
                    >
                      {payload?.type}
                    </span>
                  </span>
                }
              >
                <div style={{ height: "100%", overflow: "auto", width: "100%" }}>
                  <Card title={<span
                    style={{
                      color: "rgb(52, 64, 84)",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                      示例
                    </span>}>
                    {(() => {
                      switch (payload?.type) {
                        case BodyType.Json:
                          return (
                            <JsonViewer
                              value={jsonBeautify(JSON.parse(payload?.jsonSchema), null, 2)}
                            />
                          );
                        case BodyType.FormData:
                          return (
                            <div className="flex flex-col gap-3">
                              {payload.parameters?.map((param) => <ApiParameter key={param.id} param={pa} />)}
                            </div>
                          );
                        case BodyType.UrlEncoded:
                          return (
                            <div className="flex flex-col gap-3">
                              {payload.parameters?.map((param) => <ApiParameter key={param.id} param={param} />)}
                            </div>
                          )
                        case BodyType.Xml:
                          return (
                            <div>
                              {/* 纯文本展示 */}
                              Xml暂时没开发
                            </div>
                          )
                        default:
                          return (
                            <div>
                              {/* 默认情况或未知类型 */}
                              <p>不支持的数据类型: {payload?.type}</p>
                              <pre>{JSON.stringify(payload, null, 2)}</pre>
                            </div>
                          );
                      }
                    })()}
                  </Card>
                </div>
              </Card>
            )}
          </div>
        ) : (
          "无"
        )}
      </div>

      {!!docValue.responses && (
        <div>
          <GroupTitle>返回响应</GroupTitle>
          <Tabs
            className={styles.tabWithBorder}
            items={docValue.responses.map((res) => {
              return {
                key: res.id,
                label: `${res.name}(${res.code})`,
                children: (
                  <div>
                    <div className="flex flex-wrap items-center gap-4 p-3">
                      <span>
                        <span style={{ color: token.colorTextSecondary }}>HTTP 状态码：</span>
                        <span>{res.code}</span>
                      </span>

                      <span>
                        <span style={{ color: token.colorTextSecondary }}>内容格式：</span>
                        <span>{res.contentType}</span>
                      </span>
                      <span>
                        <span style={{ color: token.colorTextSecondary }}>Content-Type：</span>
                        <span>{getContentTypeString(res.contentType)}</span>
                      </span>
                    </div>
                    <div></div>
                  </div>
                ),
              }
            })}
            type="card"
          />
        </div>
      )}
    </div>
  )
}
