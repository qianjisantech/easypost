"use client";
import { useEffect, useRef, useState } from "react";

import { Button, Divider, Empty, Form, type FormProps, message, Select, type SelectProps, Space } from "antd";
import { nanoid } from "nanoid";
import { ApiDetailCreate, ApiDetailUpdate, ApiRunDetail } from "src/api/api";

import { PageTabStatus } from "@/components/ApiTab/ApiTab.enum";
import { useTabContentContext } from "@/components/ApiTab/TabContentContext";
import { ParamsRunTab } from "@/components/tab-content/api/params/ParamsRunTab";
import { RunResponse } from "@/components/tab-content/api/response/RunResponse";
import { HTTP_METHOD_CONFIG } from "@/configs/static";
import { useGlobalContext } from "@/contexts/global";
import { useMenuHelpersContext } from "@/contexts/menu-helpers";
import { useMenuTabHelpers } from "@/contexts/menu-tab-settings";
import { initialCreateApiDetailsData } from "@/data/remote";
import { AuthorizationType, MenuItemType, ParamType, ScriptsType } from "@/enums";
import type { ApiDetails, GlobalParameter } from "@/types";
import { request } from "@/utils/request";
import { GroupTitle } from "./components/GroupTitle";
import { PathInput, type PathInputProps } from "./components/PathInput";

interface JavaParseResult {
  className?: string;
  methods: { name: string; returnType: string }[];
  fields: { name: string; type: string }[];
  parseError?: string;
}
const DEFAULT_NAME = '未命名接口'

const methodOptions: SelectProps['options'] = Object.entries(HTTP_METHOD_CONFIG).map(
  ([method, { color }]) => {
    return {
      value: method,
      label: (
        <span className="font-semibold" style={{ color: `var(${color})` }}>
          {method}
        </span>
      ),
    }
  }
)

/**
 * API 「运行」部分。
 */
export function ApiRun({ activeKey }: { activeKey: string }) {
  const [form] = Form.useForm<ApiDetails>()

  const { messageApi } = useGlobalContext()
  const msgKey = useRef<string>()

  const { addMenuItem, updateMenuItem } = useMenuHelpersContext()
  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()
  const [loading, setLoading] = useState(false)
// 在 ApiRun 组件的顶部添加这些状态
  const [parsedVariables, setParsedVariables] = useState<{name: string, value: any}[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create
  const loadingApiDetails = async (id: string) => {
    try {
      if (id) {
        const response = await ApiRunDetail(id)
        if (response.data.success) {
          const menuData = response.data.data
          if (
            menuData &&
            (menuData.type === MenuItemType.ApiDetail || menuData.type === MenuItemType.HttpRequest)
          ) {
            const apiDetails = menuData.data

            if (apiDetails) {
              form.setFieldsValue(apiDetails)
            }
          }
        }
        console.log('tabData', tabData)
      }
    } catch (error) {
      console.error('加载 API 详情失败:', error)
    }
  }
  const parseJavaCode = (javaCode: string): JavaParseResult => {
    try {
      const ast = parse(javaCode);
      const classDecl = ast.types[0];

      if (!classDecl || classDecl.type !== "ClassDeclaration") {
        throw new Error("未找到有效的 Java 类定义");
      }

      // 提取类名
      const className = classDecl.name;

      // 提取方法
      const methods = classDecl.body
        .filter((node) => node.type === "MethodDeclaration")
        .map((method) => ({
          name: method.name,
          returnType: method.returnType || "void",
        }));

      // 提取字段
      const fields = classDecl.body
        .filter((node) => node.type === "FieldDeclaration")
        .flatMap((field) =>
          field.declarators.map((declarator) => ({
            name: declarator.name,
            type: field.type,
          }))
        );

      // 提取静态变量赋值 (如 pm.environment.set)
      const envVariables: {name: string, value: any}[] = [];
      classDecl.body.forEach(node => {
        if (node.type === "ExpressionStatement" &&
          node.expression.type === "MethodInvocation" &&
          node.expression.expression?.expression?.name === "pm" &&
          node.expression.expression?.name === "environment" &&
          node.expression.name === "set") {
          const name = node.expression.arguments[0]?.value;
          const value = node.expression.arguments[1]?.value;
          if (name && value !== undefined) {
            envVariables.push({name, value});
          }
        }
      });

      return {
        className,
        methods,
        fields,
        ...(envVariables.length > 0 && {envVariables})
      };
    } catch (error) {
      return {
        methods: [],
        fields: [],
        parseError: error instanceof Error ? error.message : "解析失败",
      };
    }
  };
  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      if (activeKey === 'run') {
        loadingApiDetails(tabData.key)
      }
    }
  }, [activeKey, isCreating, tabData.key])
  useEffect(() => {
    if (parseError) {
      message.error(`解析错误:[${JSON.stringify(parsedVariables)},失败原因：${parseError}]`)
    }
  }, [parsedVariables, parseError])
  const handleSaveCase: FormProps<ApiDetails>['onFinish'] = async (values) => {
    const menuName = values.name || DEFAULT_NAME

    if (isCreating) {
      const menuItemId = ''
      try {
        await ApiDetailCreate({
          id: menuItemId,
          name: menuName,
          type: MenuItemType.ApiDetail,
          data: { ...values, name: menuName },
        }).then((r) => {
          console.log('保存case', r)
        })
      } catch (err) {
        console.error('保存case失败', err)
      }
    } else {
      await ApiDetailUpdate({
        id: tabData.key,
        name: menuName,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
      }).then((r) => {
        console.log('更新case结果', r)
      })
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  const parseEnvironmentSets = async (codeString: string) => {
    try {
      const wrappedCode = `
      (function() {
        const pm = {
          environment: {
            sets: [],
            set: function(name, value) {
              this.sets.push({ name, value });
            },
            get: function(name) {
              const found = this.sets.find(item => item.name === name);
              return found ? found.value : undefined;
            }
          }
        };
        
        ${codeString}
        return pm.environment.sets;
      })();
    `;

      const sets = eval(wrappedCode);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (sets && sets.length > 0) {
        setParsedVariables(sets);
        setParseError(null);

        // 将解析出的变量添加到全局参数列表
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        sets.forEach(({name, value}) => {
          if (!globalParameterList.some(p => p.name === name)) {
            globalParameterList.push({
              id: '',
              name,
              value: String(value),
              description: '由预处理脚本生成'
            });
          }
        })
        console.log('globalParameterList解析出的变量:', globalParameterList);
      } else {
        setParseError('未找到有效的 pm.environment.set() 调用');
      }
    } catch (error) {
      setParseError(error instanceof Error ? error.message : String(error));
      console.error('解析错误:', error);
    }
  };
  const handleFinish: FormProps<ApiDetails>['onFinish'] = async (values) => {
    const menuName = values.name || DEFAULT_NAME

    if (isCreating) {
      const menuItemId = ''
      try {
        await ApiDetailUpdate({
          id: menuItemId,
          name: menuName,
          type: MenuItemType.ApiDetail,
          data: { ...values, name: menuName },
        }).then((r) => {
          console.log('保存接口结果', r)
        })
      } catch (err) {
        console.error('保存接口失败', err)
      }

      addMenuItem({
        id: menuItemId,
        name: menuName,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
      })

      addTabItem(
        {
          key: menuItemId,
          label: menuName,
          contentType: MenuItemType.ApiDetail,
        },
        { replaceTab: tabData.key }
      )
    } else {
      updateMenuItem({
        id: tabData.key,
        name: menuName,
        data: { ...values, name: menuName },
      })
    }
  }

  const handlePathChange: PathInputProps['onValueChange'] = (pathVal) => {
    if (typeof pathVal === 'string') {
      // 匹配任意数量的 { 包围的路径参数。
      const regex = /\{+([^{}/]+)\}+/g
      let match: RegExpExecArray | null
      const pathParams: string[] = []

      // 使用 exec 迭代匹配。
      while ((match = regex.exec(pathVal)) !== null) {
        // match[1] 匹配 {} 包围的参数。
        const param = match[1]

        if (param) {
          pathParams.push(param)
        }
      }

      const oldParameters = form.getFieldValue('parameters') as ApiDetails['parameters']
      const oldPath = oldParameters?.path

      const newPath =
        pathParams.length >= (oldPath?.length || 0)
          ? pathParams.reduce(
              (acc, cur, curIdx) => {
                const target = oldPath?.at(curIdx)

                if (target) {
                  acc.splice(curIdx, 1, { ...target, name: cur })
                } else {
                  acc.push({
                    id: nanoid(4),
                    name: cur,
                    type: ParamType.String,
                    required: true,
                  })
                }

                return acc
              },
              [...(oldPath || [])]
            )
          : oldPath?.slice(0, pathParams.length)

      const newParameters: ApiDetails['parameters'] = { ...oldParameters, path: newPath }

      form.setFieldValue('parameters', newParameters)
    }
  }
  //替换参数
  const replaceRawParameter = (
    data: PrimitiveSchema | ObjectSchema | ArraySchema | RefSchema | undefined,
    globalParameterList: GlobalParameter[]
  ): PrimitiveSchema | ObjectSchema | ArraySchema | RefSchema | undefined => {
    // 处理undefined或null情况
    if (data === undefined || data === null) {
      return data;
    }

    // 如果是字符串类型，执行参数替换
    if (typeof data === 'string') {
      return data.replace(/\{\{(.*?)\}\}/g, (match, key) => {
        // 去除可能的空格
        key = key.trim();

        // 在globalParameterList中查找匹配的参数
        const param = globalParameterList.find((p) => p.name === key);

        // 如果找到参数则返回其值，否则保留原始匹配
        return param ? String(param.value) : match;
      });
    }

    // 对于其他类型（数字、布尔值、对象、数组等），直接返回原值
    return data;
  };
  const globalParameterList: GlobalParameter[] = []
// 示例的Java代码执行函数（需要后端支持）


// 示例的Python代码执行函数（需要后端支持）
  const executePythonCode = async (pythonCode: string) => {
    try {
      const response = await request({
        method: 'POST',
        url: '/api/execute/python',
        data: {
          code: pythonCode
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      throw new Error('执行Python代码失败');
    }
  };
  const send = async (values: ApiDetails) => {
    console.log('values.parameters?.prescripts:', values.parameters?.prescripts);
    console.log('values.parameters?.prescripts.data:', values.parameters?.prescripts.data);
    console.log('values.parameters?.prescripts.type:', values.parameters?.prescripts.type);
    if (values.parameters?.prescripts.data) {
      // 使用正确的switch语法检查type
      switch (values.parameters.prescripts.type) {
        case ScriptsType.JavaScript:
          console.log('执行JavaScript预处理脚本');
          try {
            await parseEnvironmentSets(values.parameters.prescripts.data);
          } catch (error) {
            console.error('解析预处理脚本失败:', error);
          }
          break;
        case ScriptsType.Java:
          console.log('执行Java预处理脚本');
          try {
            const result = parseJavaCode(values.parameters.prescripts.data);

            if (result.parseError) {
              message.error(`Java解析错误: ${result.parseError}`);
              return;
            }

            // 处理提取的环境变量
            if (result.envVariables) {
              setParsedVariables(result.envVariables);
              result.envVariables.forEach(({name, value}) => {
                if (!globalParameterList.some(p => p.name === name)) {
                  globalParameterList.push({
                    id: '',
                    name,
                    value: String(value),
                    description: '由Java预处理脚本生成'
                  });
                }
              });
            }

            console.log('Java解析结果:', {
              className: result.className,
              methods: result.methods,
              fields: result.fields,
              envVariables: result.envVariables
            });

          } catch (error) {
            console.error('解析Java脚本失败:', error);
            message.error('解析Java脚本失败');
          }
          break;
        case ScriptsType.Python:
          console.log('执行Python预处理脚本');
          break;
        default:
          console.log('未知脚本类型');
          break;
      }
    } else {
      console.log('未设置预处理脚本或脚本数据为空');
    }
    console.log('apiDetail', values)
    // 1. 处理 headers
    const headers = values.parameters?.header?.reduce(
      (acc, item) => {
        if (item.name && item.example) {
          acc[item.name] = item.example
        }
        return acc
      },
      {} as Record<string, string>
    )

    setLoading(true)

    // 从 path 中提取域名作为 Host
    let host = ''
    try {
      // 如果 path 不是完整 URL，添加 https:// 前缀以便解析
      const urlPath = values.path.startsWith('http') ? values.path : `https://${values.path}`
      const url = new URL(urlPath)
      host = url.hostname
    } catch (e) {
      console.error('无法从 path 中解析域名:', e)
      setLoading(false)
      return // 如果无法解析域名，直接返回不发送请求
    }

    // 检查 headers 中是否已有 Content-Type
    const hasContentType =
      headers && Object.keys(headers).some((key) => key.toLowerCase() === 'content-type')

    const fixedHeaders = {
      'User-Agent': 'Easypost/1.0.0 (https://easypost.com)',
      Accept: '*/*',
      Host: host, // 使用从 path 提取的域名
      Connection: 'keep-alive',
      ...(!hasContentType && { 'Content-Type': 'text/plain' }), // 如果没有 Content-Type 则添加默认值
    }
    // 处理 Basic Auth 认证
    if (values.parameters.authorization?.type === AuthorizationType.BasicAuth) {
      const { username, password } = values.authorization.data as {
        username: string
        password: string
      }
      if (username && password) {
        const token = btoa(`${username}:${password}`) // Base64 编码
        fixedHeaders['Authorization'] = `Basic ${token}`
      }
    }
    if (values.parameters.authorization?.type === AuthorizationType.BearerToken) {
      const { token } = values.parameters.authorization.data as { token: string }
      if (token) {
        fixedHeaders['Authorization'] = `Bearer ${token}`
      }
    }
    const allHeaders = { ...headers, ...fixedHeaders }

    const easypostHeaders = {
      'Api-u': values.path,
      'Api-o0': `method=${values.method},timings=true,timeout=300000,rejectUnauthorized=false,followRedirect=true`,
      'Api-H0': Object.entries(allHeaders)
        .map(([key, value]) => `${key}=${value}`)
        .join(', '),
      'Content-Type': 'application/json',
    }

    // 2. 组装 requestConfig
    const requestConfig: Record<string, any> = {
      method: 'POST',
      headers: {
        ...allHeaders,
        ...easypostHeaders,
      },
      baseURL: '/proxy/v1/request',
    }
    console.log('values.parameters.payload', values.parameters?.payload)

    if (values.parameters?.payload?.jsonSchema) {
      console.log('replaceRawParameter', globalParameterList)
      requestConfig.data = replaceRawParameter(values.parameters.payload.jsonSchema, globalParameterList)

    } else if (values.parameters?.payload?.parameters) {
      const formData = new FormData()
      values.parameters.payload.parameters.forEach((item) => {
        formData.append(item.name!, item.example)
      })
      requestConfig.data = formData
    }

    console.log('requestConfig', requestConfig)

    // 3. 发送请求
    try {
      const res = await request(requestConfig)
      form.setFieldValue('responses', res)
    } catch (e) {
      console.error('Error:', e)
    } finally {
      setLoading(false)
    }
  }
  const handleParseQueryParams: PathInputProps['onParseQueryParams'] = (parsedParams) => {
    if (Array.isArray(parsedParams)) {
      type Param = NonNullable<ApiDetails['parameters']>['query']

      const currentParmas = form.getFieldValue(['parameters', 'query']) as Param

      let newQueryParmas: Param = parsedParams

      if (Array.isArray(currentParmas)) {
        newQueryParmas = parsedParams.reduce((acc, item) => {
          const target = acc.find(({ name }) => name === item.name)

          if (!target) {
            acc.push(item)
          }

          return acc
        }, currentParmas)
      }

      form.setFieldValue(['parameters', 'query'], newQueryParmas)

      if (!msgKey.current) {
        msgKey.current = '__'
      }

      messageApi.info({
        key: msgKey.current,
        content: (
          <span>
            路径中&nbsp;Query&nbsp;参数已自动提取，并填充到下方<strong>请求参数</strong>的&nbsp;
            <strong>Param</strong>&nbsp;中
          </span>
        ),
        duration: 3,
        onClose: () => {
          msgKey.current = undefined
        },
      })
    }
  }

  return (
    <Form<ApiDetails>
      className="flex h-full flex-col"
      form={form}
      onFinish={(values) => {
        handleFinish(values)
      }}
    >
      <div className="flex items-center px-tabContent py-3">
        <Space.Compact className="flex-1">
          <Form.Item noStyle name="method">
            <Select
              showSearch
              className="min-w-[110px]"
              options={methodOptions}
              popupClassName="!min-w-[120px]"
            />
          </Form.Item>
          <Form.Item noStyle name="path">
            <PathInput
              onParseQueryParams={handleParseQueryParams}
              onValueChange={handlePathChange}
            />
          </Form.Item>
        </Space.Compact>

        <Space className="ml-auto pl-2">
          <Button loading={loading} type="primary" onClick={() => send(form.getFieldsValue())}>
            发送
          </Button>
          <Button
            onClick={() => {
              handleFinish(form.getFieldsValue(), true)
            }}
          >
            暂存
          </Button>
          <Button
            htmlType="submit"
            onClick={() => {
              handleSaveCase(form.getFieldsValue(), true)
            }}
          >
            保存为用例
          </Button>
        </Space>
      </div>

      <div className="flex-1 overflow-y-auto p-tabContent">
        <Form.Item noStyle name="parameters">
          <ParamsRunTab />
        </Form.Item>
        <Divider style={{ borderColor: '#737b83' }}></Divider>
        <GroupTitle className="mb-3 mt-8">返回响应</GroupTitle>
        <Form.Item noStyle name="responses">
          {form.getFieldValue('responses') ? (
            <RunResponse />
          ) : (
            <Empty
              description={
                <span style={{ color: '#666', fontSize: '14px' }}>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  点击<span style={{ color: '#1890ff', fontWeight: 500 }}>"发送"</span>
                  按钮获取返回结果
                </span>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{
                margin: '40px 0',
                padding: '40px 0',
                background: 'transparent',
              }}
            />
          )}
        </Form.Item>
      </div>
    </Form>
  )
}
