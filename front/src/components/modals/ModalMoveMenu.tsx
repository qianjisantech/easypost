import { useEffect } from "react";

import { create, useModal } from "@ebay/nice-modal-react";
import { Form, Input, message, Modal, type ModalProps } from "antd";

import type { ApiMenuData } from "@/components/ApiMenu/ApiMenu.type";
import { SelectorCatalog } from "@/components/SelectorCatalog";
import { useMenuHelpersContext } from "@/contexts/menu-helpers";
import { MenuItemType } from "@/enums";
import { ApiMove, ApiTreeQueryPage } from "@/api/ams/api";

interface ModalMoveMenuProps extends Omit<ModalProps, 'open' | 'onOk'> {
  menuItemType?: MenuItemType
  formData?: Pick<ApiMenuData, 'id' | 'parentId'>
}

type FormData = Pick<ApiMenuData, 'id' | 'parentId'>

export const ModalMoveMenu = create(({ menuItemType, formData, ...props }: ModalMoveMenuProps) => {
  const modal = useModal()
  const { setMenuRawList } = useMenuHelpersContext()

  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
    }
  }, [form, formData])

  // const { updateMenuItem } = useMenuHelpersContext()
  const loadingMenuTree = async () => {
    const response = await ApiTreeQueryPage()
    if (response.data.success && setMenuRawList) {
      setMenuRawList(response.data?.data)
    }
  }
  const handleHide = () => {
    form.resetFields()
    void modal.hide()
  }
  const moveApi = async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const response = await ApiMove(values)
    if (response.data.success){
      message.success(response.data.message)
      loadingMenuTree()
      handleHide()
    }
  }
  const moveApiFolder =  (values) => {
    console.log('moveApiFolder',values)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // const response = await ApiMove(values)
    // if (response.data.success){
    //   message.success(response.data.message)
    //   loadingMenuTree()
    //   handleHide()
    // }
  }
  return (
    <Modal
      title="移动到..."
      {...props}
      open={modal.visible}
      onCancel={(...parmas) => {

        props.onCancel?.(...parmas)
        handleHide()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          switch (menuItemType){
            case  MenuItemType.ApiDetail:
              moveApi(values)
              break
            case MenuItemType.Doc:
              moveApiFolder(values)
              message.error('暂不支持移动文档')
          }
        })
      }}
    >
      <Form<FormData> form={form} layout="vertical">
        <Form.Item hidden noStyle name="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="目标目录" name="parentId" rules={[{ required: true }]}>
          <SelectorCatalog
            placeholder="移动到..."
            type={
              menuItemType === MenuItemType.ApiDetail
                ? MenuItemType.ApiDetailFolder
                : menuItemType === MenuItemType.ApiSchema
                  ? MenuItemType.ApiSchemaFolder
                  : menuItemType
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})
