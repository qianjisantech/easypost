import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { current, produce } from 'immer'
import { nanoid } from 'nanoid'
import type { ApiMenuData } from '@/components/ApiMenu'
import { creator } from "@/data/remote"; // 假设这两个是从远程获取的 API
import { ApiStatus, BodyType, CatalogType, HttpMethod } from "@/enums";
import { getCatalogType, isMenuFolder } from '@/helpers'
import type { ApiDetailsResponse, Parameter, RecycleCatalogType, RecycleData, RecycleDataItem } from "@/types";
import { moveArrayItem } from '@/utils'


interface MenuHelpers {
  /** 添加一个新的菜单项到菜单列表中。 */
  addMenuItem: (menuData: {
    data: {
      editorId?: string;
      method: HttpMethod;
      creatorId?: string;
      description?: string;
      serverId?: string;
      tags?: string[];
      responseExamples?: ApiDetailsResponseExample[];
      path?: string;
      createdAt?: string;
      requestBody?: { Id: string; type: BodyType; parameters?: Parameter[]; jsonSchema?: JsonSchema };
      name: string;
      responses?: ApiDetailsResponse[];
      responsibleId?: string;
      id: string;
      parameters?: { cookie?: Parameter[]; header?: Parameter[]; query?: Parameter[]; path?: Parameter[] };
      status: ApiStatus;
      updatedAt?: string
    };
    name: string;
    id: string;
    type: MenuItemType
  }) => void
  /** 从菜单列表中移除一个菜单项。 */
  removeMenuItem: (menuData: Pick<ApiMenuData, 'id'>) => void
  /** 更新一个菜单项的信息。 */
  updateMenuItem: (menuData: {
    data: {
      editorId?: string;
      method: HttpMethod;
      creatorId?: string;
      description?: string;
      serverId?: string;
      tags?: string[];
      responseExamples?: ApiDetailsResponseExample[];
      path?: string;
      createdAt?: string;
      requestBody?: { Id: string; type: BodyType; parameters?: Parameter[]; jsonSchema?: JsonSchema };
      name: string;
      responses?: ApiDetailsResponse[];
      responsibleId?: string;
      id: string;
      parameters?: { cookie?: Parameter[]; header?: Parameter[]; query?: Parameter[]; path?: Parameter[] };
      status: ApiStatus;
      updatedAt?: string
    };
    id: any;
    type: MenuItemType
  }) => void
  /** 从回收站中恢复菜单项。 */
  restoreMenuItem: (
    menuData: Partial<ApiMenuData> & {
      restoreId: RecycleDataItem['id']
      catalogType: RecycleCatalogType
    }
  ) => void
  /** 移动菜单项。 */
  moveMenuItem: (moveInfo: {
    dragKey: ApiMenuData['id']
    dropKey: ApiMenuData['id']
    /** the drop position relative to the drop node, inside 0, top -1, bottom 1 */
    dropPosition: 0 | -1 | 1
  }) => void
}

interface MenuHelpersContextData extends MenuHelpers {
  menuRawList?: ApiMenuData[]
  recyleRawData?: RecycleData

  menuSearchWord?: string
  setMenuSearchWord?: React.Dispatch<React.SetStateAction<MenuHelpersContextData['menuSearchWord']>>

  apiDetailDisplay: 'name' | 'path'
  setApiDetailDisplay: React.Dispatch<React.SetStateAction<MenuHelpersContextData['apiDetailDisplay']>>

  setMenuRawList?: React.Dispatch<React.SetStateAction<ApiMenuData[] | undefined>> // 暴露 setMenuRawList
}

const MenuHelpersContext = createContext({} as MenuHelpersContextData)

export function MenuHelpersContextProvider(props: React.PropsWithChildren) {
  const { children } = props
  const [menuRawList, setMenuRawList] = useState<ApiMenuData[] | undefined>()
  const [recyleRawData, setRecyleRawData] = useState<RecycleData | undefined>()

  // 3. 使用状态来管理其他的功能
  const [menuSearchWord, setMenuSearchWord] = useState<string>('')
  const [apiDetailDisplay, setApiDetailDisplay] = useState<'name' | 'path'>('name')

  // 4. 创建菜单管理函数
  const menuHelpers = useMemo<MenuHelpers>(() => {
    return {
      addMenuItem: (menuData) => {
        setMenuRawList((list = []) => [...list, menuData])
      },

      removeMenuItem: ({ id }) => {
        const newMenuRawList = menuRawList?.filter((item) => {
          const shouldRemove = item.id === id || item.parentId === id

          if (shouldRemove) {
            setRecyleRawData((d) =>
              d
                ? produce(d, (draft) => {
                  let catalogType = getCatalogType(item.type)

                  if (catalogType === CatalogType.Markdown) {
                    catalogType = CatalogType.Http
                  }

                  if (
                    catalogType === CatalogType.Http ||
                    catalogType === CatalogType.Schema ||
                    catalogType === CatalogType.Request
                  ) {
                    const list = draft[catalogType].list

                    draft[catalogType].list = [
                      { id: nanoid(6), expiredAt: '30天', creator, deletedItem: item },
                      ...(list || []),
                    ]
                  }
                })
                : d
            )
          }

          return !shouldRemove
        })

        setMenuRawList(newMenuRawList)
      },

      updateMenuItem: ({ id, ...rest }) => {
        setMenuRawList((list) =>
          list?.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...rest,
                data: { ...item.data, ...rest.data, name: rest.name || item.name },
              } as ApiMenuData
            }

            return item
          })
        )
      },

      restoreMenuItem: ({ restoreId, catalogType }) => {
        const newRecyleRawData = produce(recyleRawData, (draft) => {
          if (draft) {
            const list = draft[catalogType].list

            draft[catalogType].list = list?.filter((li) => {
              const shouldRestore = li.id === restoreId

              if (shouldRestore) {
                const apiMenuDataItem = current(li).deletedItem

                setMenuRawList((rawList = []) => {
                  return [...rawList, apiMenuDataItem]
                })
              }

              return !shouldRestore
            })
          }
        })

        setRecyleRawData(newRecyleRawData)
      },

      moveMenuItem: ({ dragKey, dropKey, dropPosition }) => {
        setMenuRawList((list = []) => {
          const { dragMenu, dropMenu, dragMenuIdx, dropMenuIdx } = list.reduce<{
            dragMenu: ApiMenuData | null
            dropMenu: ApiMenuData | null
            dragMenuIdx: number | null
            dropMenuIdx: number | null
          }>(
            (acc, item, idx) => {
              if (item.id === dragKey) {
                acc.dragMenu = item
                acc.dragMenuIdx = idx
              } else if (item.id === dropKey) {
                acc.dropMenu = item
                acc.dropMenuIdx = idx
              }

              return acc
            },
            { dragMenu: null, dropMenu: null, dragMenuIdx: null, dropMenuIdx: null }
          )

          if (
            dragMenu &&
            dropMenu &&
            typeof dragMenuIdx === 'number' &&
            typeof dropMenuIdx === 'number'
          ) {
            return produce(list, (draft) => {
              if (isMenuFolder(dropMenu.type) && dropPosition === 0) {
                draft[dragMenuIdx].parentId = dropMenu.id
                moveArrayItem(draft, dragMenuIdx, dropMenuIdx + 1)
              } else if (dropPosition === 1) {
                if (dragMenu.parentId !== dropMenu.parentId) {
                  draft[dragMenuIdx].parentId = dropMenu.parentId
                  moveArrayItem(draft, dragMenuIdx, dropMenuIdx + 1)
                } else {
                  moveArrayItem(draft, dragMenuIdx, dropMenuIdx + 1)
                }
              }
            })
          }

          return list
        })
      },
    }
  }, [menuRawList, recyleRawData])

  return (
    <MenuHelpersContext.Provider
      value={{
        menuRawList,
        setMenuRawList,
        recyleRawData,
        menuSearchWord,
        setMenuSearchWord,
        apiDetailDisplay,
        setApiDetailDisplay,
        ...menuHelpers,
      }}
    >
      {children}
    </MenuHelpersContext.Provider>
  )
}

export const useMenuHelpersContext = () => useContext(MenuHelpersContext)
