import type { ApiMenuBase, ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import type { JsonSchema } from '@/components/JsonSchema'

import type {
  ApiStatus,
  AuthorizationType,
  BodyType,
  CatalogType,
  ContentType,
  HttpMethod,
  MenuItemType,
  ParamType,
} from './enums'
import { ScriptsType } from "./enums";

export type TabContentType = CatalogType | MenuItemType | 'blank'

export interface Creator {
  id: string
  name: string
  username: string
}

interface ParameterBase {
  id: string
  name?: string
  description?: string
  enable?: boolean
  required?: boolean
}

/** 请求参数信息（非数组类型）。 */
interface NonArrayParameter extends ParameterBase {
  type: Exclude<ParamType, ParamType.Array>
  example?: string
}

/** 请求参数信息（数组类型）。 */
interface ArrayParameter extends ParameterBase {
  type: ParamType.Array
  example?: string[]
}

/** 请求参数信息的联合类型。 */
export type Parameter = NonArrayParameter | ArrayParameter

export interface ApiDetailsResponse {
  id: string
  /** HTTP 状态码 */
  code: number
  /** 响应名称 */
  name: string
  /** 内容格式 */
  contentType?: ContentType
  jsonSchema?: JsonSchema
}

interface ApiDetailsResponseExample {
  id: string
  responseId: ApiDetailsResponse['id']
  name: string
  data: string
}

export interface ApiDetails {
  /** 唯一标识 */
  id: string
  /** 请求方法 */
  method: HttpMethod
  /** 接口路径 */
  path?: string
  /** 接口名称 */
  name?: string
  /** 接口状态 */
  status: ApiStatus
  /** 责任人 */
  responsible?: string
  /** 修改者 */
  editorId?: string
  /** 创建者 */
  creatorId?: string
  /** 接口标签 */
  tags?: string[]
  /** 前置 URL 选择 */
  serverId?: string
  /** 接口说明 */
  description?: string
  /** 请求参数 */
  parameters?: {
    cookie?: Parameter[]
    header?: Parameter[]
    query?: Parameter[]
    path?: Parameter[]
    authorization?: {
      type?: AuthorizationType
      data?: object
    }
    /** 请求参数 - Body */
    payload?: {
      type: BodyType
      parameters?: Parameter[]
      jsonSchema?: JsonSchema
    }
    prescripts: {
      data: string
      type: ScriptsType
    }
    postscripts: {
      data: string
      type?: ScriptsType
    }
  }

  /** 返回响应 */
  responses?: ApiDetailsResponse[]
  /** 响应示例 */
  responseExamples?: ApiDetailsResponseExample[]
  /** 接口文档创建时间 */
  createdTime?: string
  /** 接口文档更新时间 */
  updatedTime?: string
  createBy?: string
  updateBy?: string
  createByName?: string
  updateByName?: string
}

export interface ApiDoc {
  /** 唯一标识 */
  id: string
  /** 文档标题 */
  name: string
  /** 创建者唯一标识 */
  createBy?: string
  /** 编辑者唯一标识 */
  updateBy?: string
  /** 文档内容 */
  content?: string
  /** 创建时间 */
  createTime?: string
  /** 最后修改时间 */
  updateTime?: string
}

export interface ApiSchema {
  jsonSchema: JsonSchema
}

export interface ApiFolder {
  id: string
  name: string
  parentId?: ApiMenuBase['id']
  serverId?: string
  /** 文件夹备注。 */
  description?: string
}

export interface RecycleDataItem {
  id: string
  deletedItem: ApiMenuData
  creator: Creator
  expiredAt: string
}

export type RecycleCatalogType = CatalogType.Http | CatalogType.Schema | CatalogType.Request

export type RecycleData = Record<RecycleCatalogType, { list?: RecycleDataItem[] }>

export interface GlobalParameter {
  header: GlobalParameterChildren[]
  cookie: GlobalParameterChildren[]
  query: GlobalParameterChildren[]
  body: GlobalParameterChildren[]
}
export interface GlobalVariable{
  team: GlobalVariableChildren[]
  project: GlobalVariableChildren[]
}
export interface GlobalVariableChildren{
  id: string
  name: string
  type: string
  value: string
  description: string
}


export interface KeyStore {
  id: string
  name: string
  type:string
  value: string
  description: string
}
export interface Server {
  id: string
  name: string
  frontUrl:string
}

export interface EnvironmentSetting {
  id: string
  name: string
  servers: Server[]
  globalVariables: GlobalVariable[]
}
export interface LocalMock {
  servers: Server[]
  globalVariables: GlobalVariable[]
}

export interface CloudMock {
  servers: Server[]
  globalVariables: GlobalVariable[]
}

export interface SelfHostMock {
  servers: Server[]
  globalVariables: GlobalVariable[]
}
export interface GlobalParameterChildren {
  id: string
  key: string
  type:string
  value: string
  description: string
}
export  interface  EnvironmentManagement {
  id: string
  globalParameter: GlobalParameter
  globalVariable: GlobalVariable
  keyStores: KeyStore[]
  environmentSettings: EnvironmentSetting[]
  localMock: LocalMock
  cloudMock: CloudMock
  selfHostMock: SelfHostMock
}