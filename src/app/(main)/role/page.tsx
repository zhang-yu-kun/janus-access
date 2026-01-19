// pages/search-table.tsx 或 app/search-table/page.tsx
"use client";

import React, { useState } from "react";
import { Table, Input, Button, Space, Card, Row, Col, Modal, Form } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { Role } from "@prisma/client";

type Props = { open: boolean; status: "add" | "edit"; onClose: () => void };
const Edit = ({ open, status, onClose }: Props) => {
  const onFinish = (values: Role) => {
    console.log("Success:", values);
    onClose();
  };
  return (
    <Modal open={open} title="角色" onCancel={onClose}>
      <Form onFinish={onFinish}>
        <Form.Item label="角色名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="角色描述" name="descript">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const page: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Role[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Props["status"]>("add");
  const handleSearch = (value: string) => {
    setLoading(true);

    // 模拟 API 调用
    setTimeout(() => {
      const filteredData = dataSource.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase()),
        ),
      );

      setDataSource(filteredData);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setSearchText("");
    setLoading(true);
  };

  const columns: TableProps<Role>["columns"] = [
    { title: "角色名称", dataIndex: "name" },
    { title: "角色描述", dataIndex: "description" },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setOpen(true);
            setStatus("edit");
          }}
        >
          编辑
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Card>
        {/* 搜索区域 */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={() => handleSearch(searchText)}
              suffix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => handleSearch(searchText)}
                loading={loading}
              >
                搜索
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                loading={loading}
              >
                重置
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                  setStatus("add");
                }}
              >
                新增
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 表格区域 */}
      <Card style={{ marginTop: "16px" }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ["5", "10", "20", "50"],
            defaultPageSize: 10,
          }}
        />
      </Card>

      <Edit open={open} status={status} onClose={() => setOpen(false)} />
    </div>
  );
};

export default page;
