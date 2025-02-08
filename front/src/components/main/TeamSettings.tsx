import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { TeamDetail, TeamUpdate } from "@/api/team"; // 假设 TeamDetail 用于获取团队详情

const TeamSettings = ({ teamId }) => {
  // 控制弹窗显示状态和表单数据
  const [visible, setVisible] = useState(false);
  // 注意这里将 value 属性改名为 teamName，与 Form.Item 的 name 保持一致
  const [formData, setFormData] = useState({ key: "", label: "", teamName: "" });
  const [form] = Form.useForm();
  // 保存从后端获取的团队信息
  const [teamInfo, setTeamInfo] = useState(null);

  // 获取团队详情（请根据实际接口调整参数和返回数据结构）
  const fetchTeamInfo = async () => {
    try {
      const response = await TeamDetail(teamId);
      if (response.data.success) {

        setTeamInfo(response.data.data);
      }
    } catch (error) {
      message.error("获取团队信息异常");
    }
  };

  // 组件挂载或 teamId 变化时获取团队信息
  useEffect(() => {
    if (teamId) {
      fetchTeamInfo();
    }
  }, [teamId]);

  // 当弹窗显示时，同步表单数据
  useEffect(() => {
    if (visible) {
      form.setFieldsValue(formData);
    }
  }, [visible, formData, form]);

  // 根据后端返回数据构造基础信息表格的数据源
  const normalDataSource = teamInfo
    ? [
      {
        key: "1",
        label: "团队名称",
        value: teamInfo.teamName,
      },
      {
        key: "2",
        label: "团队ID",
        value: teamInfo.teamId,
      },
      {
        key: "3",
        label: "我的团队内昵称",
        value: teamInfo.teamName,
      },
    ]
    : [];

  const normalColumns = [
    {
      dataIndex: "label",
      key: "label",
      render: (text) => <span>{text}</span>,
      width: 80, // 设置 label 列宽度
    },
    {
      dataIndex: "value",
      key: "value",
      render: (text) => <span>{text}</span>,
      width: 300, // 设置 value 列宽度
    },
    {
      key: "actions",
      render: (text, record) => {
        // 当 label 为“团队ID”时不显示编辑按钮
        if (record.label === "团队ID") {
          return null;
        }
        return (
          <Button onClick={() => handleEdit(record)}>
            编辑
          </Button>
        );
      },
      width: 100,
      align: "right", // 让编辑按钮对齐到右边
    },
  ];

  const dangerDataSource = [
    {
      key: "1",
      label: "移交",
      value: "将团队的所有者权限移交给其他成员",
    },
    {
      key: "2",
      label: "解散团队",
      value: "务必谨慎，解散后无法找回",
    },
    {
      key: "3",
      label: "退出团队",
      value: "退出当前所在团队",
    },
  ];

  const dangerColumns = [
    {
      dataIndex: "label",
      key: "label",
      render: (text) => <span>{text}</span>,
      width: 80,
    },
    {
      dataIndex: "value",
      key: "value",
      render: (text) => <span>{text}</span>,
      width: 300,
    },
    {
      key: "actions",
      render: (text, record) => {
        const buttonText =
          record.label === "移交"
            ? "移交"
            : record.label === "退出团队"
              ? "退出"
              : "解散";
        return <Button>{buttonText}</Button>;
      },
      width: 100,
      align: "right",
    },
  ];

  // 处理点击编辑按钮时，将对应行数据设置到表单中，并打开弹窗
  const handleEdit = (record) => {
    console.log("点击编辑按钮，当前行的数据：", record);
    setFormData({
      key: record.key,
      label: record.label,
      teamName: record.value,
    });
    setVisible(true);
  };

  // 处理表单提交，同时增加 id 字段到提交数据中
  const handleSubmit = async (values) => {
    // 合并提交数据，id 为传入的 teamId
    const submitData = { id: teamId, ...values };
    try {
      const response = await TeamUpdate(submitData);
      if (response.data.success) {
        message.success(response.data.message);
        // 更新成功后刷新团队信息
        fetchTeamInfo();
      } else {
        message.error(response.data.message || "更新失败");
      }
    } catch (error) {
      message.error("更新异常");
    }
    console.log("提交的数据：", submitData);
    setVisible(false);
  };

  return (
    <div>
      <div style={{ fontSize: "16px", marginBottom: "10px" }}>基础信息</div>
      <div style={{ border: "0.5px solid #d9d9d9", borderRadius: "1px" }}>
        <Table
          dataSource={normalDataSource}
          columns={normalColumns}
          pagination={false}
          bordered={false}
          showHeader={false}
          style={{
            backgroundColor: "white",
            width: "100%",
            tableLayout: "fixed",
          }}
        />
      </div>
      <div
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        危险区域
      </div>
      <div style={{ border: "0.5px solid #d9d9d9", borderRadius: "1px" }}>
        <Table
          dataSource={dangerDataSource}
          columns={dangerColumns}
          pagination={false}
          bordered={false}
          showHeader={false}
          style={{
            backgroundColor: "white",
            width: "100%",
            tableLayout: "fixed",
          }}
        />
      </div>

      {/* 弹窗内容 */}
      <Modal
        title="修改"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} initialValues={formData} onFinish={handleSubmit}>
          <Form.Item
            label={formData.label}
            name="teamName"
            rules={[{ required: true, message: "请输入内容" }]}
          >
            {/* 使用 key 强制 Input 在 formData 变化时更新 */}
            <Input key={formData.key} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={() => setVisible(false)} style={{ marginLeft: 10 }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamSettings;
