import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu'
import type { ApiTabItem } from '@/components/ApiTab'
import { SchemaType } from '@/components/JsonSchema'
import { SERVER_INHERIT } from '@/configs/static'
import {
  ApiStatus,
  CatalogType,
  ContentType,
  HttpMethod,
  MenuId,
  MenuItemType,
  ParamType,
} from '@/enums'
import { findFolders } from '@/helpers'
import type { ApiDetails, ApiDetailsResponse, ApiSchema, Creator, RecycleData } from '@/types'

const RESPONSE_ID_1 = ''
const RESPONSE_ID_2 = ''

const defaultResponse = (): ApiDetailsResponse => {
  const id = ''

  return {
    id,
    code: 200,
    name: '成功',
    contentType: ContentType.JSON,
    jsonSchema: {
      type: SchemaType.Object,
      properties: [],
    },
  }
}

export const creator: Creator = {
  id: '',
  name: '张三',
  username: '李四',
}

/** 菜单原始数据，通常从服务端中获取，然后在客户端中需要被组装为树状结构。 */
export const apiDirectoryData: ApiMenuData[] = [
  {
    id: MenuId.文档,
    name: '🦊 EasyPost 是什么',
    type: MenuItemType.Doc,
    data: {
      id: '',
      name: '🦊 EasyPost 是什么',
      content: ``,
    },
  },
  {
    id: MenuId.默认分组,
    name: '默认分组',
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.嵌套分组,
    parentId: MenuId.默认分组,
    name: '嵌套分组',
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.xx,
    parentId: MenuId.嵌套分组,
    name: 'Markdown 文档',
    type: MenuItemType.Doc,
    data: {
      id: '',
      name: '文档',
      content:'111'},
  },
  {
    id: MenuId.示例接口,
    parentId: MenuId.嵌套分组,
    name: '示例接口',
    type: MenuItemType.ApiDetail,
    data: {
      id: '',
      path: '/example',
      name: '示例接口',
      method: HttpMethod.Get,
      status: ApiStatus.Released,
      responsibleId: creator.id,
      serverId: SERVER_INHERIT,
      responses: [defaultResponse()],
        jsonSchema: {
          type: SchemaType.String,
          $ref: '111111111111111'
        },
        // query: [
        //   {
        //     id: '',
        //     name: 'x',
        //     type: ParamType.Array,
        //     enable: true,
        //     required: false,
        //     description: '1.xxx\n2.xxx\n3.xxx',
        //     example: ['yyy', 'zzz'],
        //   },
        // ],
    },
  },
  {
    id: MenuId.示例接口2,
    parentId: MenuId.嵌套分组,
    name: '名称超长的示例接口',
    type: MenuItemType.ApiDetail,
    data: {
      id: '',
      path: '/example',
      name: '名称超长的示例接口',
      method: HttpMethod.Get,
      status: ApiStatus.Released,
      responsibleId: creator.id,
      serverId: SERVER_INHERIT,
      responses: [defaultResponse()],
    },
  },
  {
    id: MenuId.宠物店,
    name: '宠物店',
    type: MenuItemType.ApiDetailFolder,
  },
  {
    id: MenuId.查询宠物详情,
    parentId: MenuId.宠物店,
    name: '查询宠物详情',
    type: MenuItemType.ApiDetail,
    data: {
      id: '',
      path: 'http://111111ate',
      name: '查询宠物详情',
      method: HttpMethod.Post,
      status: ApiStatus.Developing,
      responsibleId: creator.id,
      tags: ['下单'],
      serverId: SERVER_INHERIT,
      description: '## 接口说明',

       jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '宠物 ID 编号',
          },
        ],
      },
      responses: [
        {
          id: RESPONSE_ID_1,
          code: 200,
          name: '成功',
          contentType: ContentType.JSON,
          jsonSchema: {
            type: SchemaType.Object,
            properties: [
              {
                name: 'code',
                type: SchemaType.Integer,
                description: '状态码',
              },
              {
                name: 'data',
                type: SchemaType.Refer,
                $ref: MenuId.SchemaPet,
                description: '宠物信息',
              },
            ],
          },
        },
        {
          id: RESPONSE_ID_2,
          code: 404,
          name: '记录不存在',
          contentType: ContentType.JSON,
          jsonSchema: {
            type: SchemaType.Object,
            properties: [
              {
                name: 'code',
                type: SchemaType.Integer,
                description: '状态码',
              },
              {
                name: 'message',
                type: SchemaType.String,
                description: '提示信息',
              },
            ],
          },
        },
      ],
      responseExamples: [
        {
          id: '1',
          responseId: RESPONSE_ID_1,
          name: '成功示例',
          data: JSON.stringify({
            code: 0,
            data: {
              name: 'Hello Kitty',
              photoUrls: ['http://dummyimage.com/400x400'],
              id: 3,
              category: {
                id: 71,
                name: 'Cat',
              },
              tags: [
                {
                  id: 22,
                  name: 'Cat',
                },
              ],
              status: 'sold',
            },
          }),
        },
        {
          id: '2',
          responseId: RESPONSE_ID_2,
          name: '异常示例',
          data: JSON.stringify({
            code: -1,
            message: 'Not found',
          }),
        },
      ],
      createdAt: '2022-03-23T12:00:00.000Z',
      updatedAt: '2022-03-23T12:00:00.000Z',
    },
  },
  {
    id: MenuId.新建宠物信息,
    parentId: MenuId.宠物店,
    name: '新建宠物信息',
    type: MenuItemType.ApiDetail,
    data: {
      id: '',
      path: '/pet',
      name: '新建宠物信息',
      method: HttpMethod.Post,
      status: ApiStatus.Testing,
      responsibleId: creator.id,
      tags: ['宠物'],
      serverId: SERVER_INHERIT,
      responses: [defaultResponse()],
    },
  },
  {
    id: MenuId.宠物店S,
    name: '宠物店',
    type: MenuItemType.ApiSchemaFolder,
    data: {
      jsonSchema: {
        type: SchemaType.Boolean,
      },
    },
  },
  {
    id: MenuId.SchemaPet,
    parentId: MenuId.宠物店S,
    name: 'Pet',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '宠物 ID 编号',
          },
          {
            name: 'category',
            type: SchemaType.Refer,
            $ref: MenuId.SchemaCategory,
            description: '分组',
          },
          {
            name: 'name',
            type: SchemaType.String,
            description: '名称',
          },
          {
            name: 'photoUrls',
            type: SchemaType.Array,
            items: {
              type: SchemaType.String,
            },
            description: '照片 URL',
          },
          {
            name: 'status',
            type: SchemaType.String,
            description: '宠物销售状态',
          },
        ],
      },
    },
  },
  {
    id: MenuId.SchemaCategory,
    parentId: MenuId.宠物店S,
    name: 'Category',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '分组 ID 编号',
          },
          {
            name: 'name',
            type: SchemaType.String,
            description: '分组名称',
          },
        ],
      },
    },
  },
  {
    id: MenuId.SchemaTag,
    parentId: MenuId.宠物店S,
    name: 'Tag',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Object,
        properties: [
          {
            name: 'id',
            type: SchemaType.Integer,
            description: '标签 ID 编号',
          },
          {
            name: 'name',
            type: SchemaType.String,
            description: '标签名称',
          },
        ],
      },
    },
  },
  {
    id: MenuId.引用模型,
    name: '引用模型',
    type: MenuItemType.ApiSchema,
    data: {
      jsonSchema: {
        type: SchemaType.Boolean,
      },
    },
  },
  {
    id: MenuId.Request,
    name: 'xxx',
    type: MenuItemType.RequestFolder,
  },
  {
    id: MenuId.Request2,
    parentId: MenuId.Request,
    name: 'https://abc.com',
    type: MenuItemType.HttpRequest,
    data: {
      id: '',
      path: 'https://abc.com',
      name: '快捷接口示例',
      method: HttpMethod.Get,
      status: ApiStatus.Developing,
      tags: ['宠物'],
      serverId: SERVER_INHERIT,
      responses: [
        {
          id: '',
          code: 200,
          name: '成功',
          contentType: ContentType.JSON,
          jsonSchema: {
            type: SchemaType.Object,
            properties: [
              {
                name: 'code',
                type: SchemaType.Integer,
                description: '状态码',
              },
              {
                name: 'data',
                type: SchemaType.Refer,
                $ref: MenuId.SchemaPet,
                description: '宠物信息',
              },
            ],
          },
        },
      ],
      createdAt: '2022-03-23T12:00:00.000Z',
    },
  },
]

export const recycleGroupData: RecycleData = {
  [CatalogType.Http]: {
    list: [
      {
        id: '',
        creator,
        deletedItem: {
          id: '',
          name: '接口1',
          type: MenuItemType.ApiDetail,
          data: {
            id: '',
            path: '/api',
            name: '接口1',
            method: HttpMethod.Get,
            status: ApiStatus.Released,
            responsibleId: creator.id,
            serverId: SERVER_INHERIT,
          },
        },
        expiredAt: '29天',
      },
      {
        id: '',
        creator,
        deletedItem: {
          id: '',
          parentId: MenuId.嵌套分组,
          name: '文档1',
          type: MenuItemType.Doc,
          data: {
            id: '',
            name: '文档1',
            content: '文档内容',
          },
        },
        expiredAt: '22天',
      },
      {
        id: '',
        creator,
        deletedItem: {
          id: '',
          parentId: MenuId.默认分组,
          name: '空分组',
          type: MenuItemType.ApiDetailFolder,
        },
        expiredAt: '11天',
      },
    ],
  },

  [CatalogType.Schema]: {
    list: [
      {
        id: '',
        creator,
        deletedItem: {
          id: '',
          name: '示例模型',
          type: MenuItemType.ApiSchema,
        },
        expiredAt: '28天',
      },
    ],
  },

  [CatalogType.Request]: {
    list: [
      {
        id: '',
        creator,
        deletedItem: {
          id: '',
          name: '示例请求',
          type: MenuItemType.HttpRequest,
          data: {
            id: '',
            path: '/request',
            name: '示例请求',
            method: HttpMethod.Get,
            status: ApiStatus.Released,
            responsibleId: creator.id,
            serverId: SERVER_INHERIT,
          },
        },
        expiredAt: '16天',
      },
    ],
  },
}

export const initialTabItems: ({
  label: string;
  contentType: MenuItemType.ApiDetail | MenuItemType.ApiSchema | MenuItemType.ApiSchemaFolder | MenuItemType.Doc | MenuItemType.HttpRequest | MenuItemType.RequestFolder | MenuItemType.ApiDetailFolder;
  key: string
} | { label: string; contentType: string; key: string })[] = (() => {
  return [
    ...apiDirectoryData
      .filter(({ id }) => {
        return (
          id === "0"
        )
      })
      .map(({ id, name, type }) => {
        return {
          key: id,
          label: name,
          contentType: type,
        }
      }),
    {
      key: 'newCatalog',
      label: '新建...',
      contentType: 'blank',
    },
  ]
})()

export const initialActiveTabKey = MenuId.查询宠物详情

export const initialExpandedKeys: ApiMenuData['id'][] = [
  CatalogType.Http,
  CatalogType.Schema,
  ...initialTabItems.reduce<ApiMenuData['id'][]>((acc, { key }) => {
    const target = apiDirectoryData.find((item) => item.id === key)

    if (target?.parentId) {
      acc.push(...findFolders(apiDirectoryData, [], target.parentId).map(({ id }) => id))
    }

    return acc
  }, []),
]

export const initialCreateApiDetailsData: ApiDetails = {
  id: '',
  method: HttpMethod.Get,
  status: ApiStatus.Developing,
  serverId: SERVER_INHERIT,
  responses: [defaultResponse()],
}

export const initialCreateApiSchemaData: ApiSchema = {
  jsonSchema: {
    type: SchemaType.Object,
  },
}
