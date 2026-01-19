"use client";

import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Card, Row, Col, Switch } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { Menu as MenuTy } from "@prisma/client";
import send from "@/utils/send";

const page: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<MenuTy[]>([]);
  const [menus, setMenus] = useState<MenuTy[]>([]);
  useEffect(() => {
    (async () => {
      const res = await send.get("/queryMenu");
      setMenus(res.data);
    })();
  }, []);

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
  };

  const columns: TableProps<MenuTy>["columns"] = [
    { title: "菜单名称", dataIndex: "menuName" },
    { title: "菜单路径", dataIndex: "menuKey" },
    { title: "父路径", dataIndex: "parentKey" },
    { title: "排序", dataIndex: "sort" },
    {
      title: "状态开关",
      dataIndex: "action",
      render: (_, record) => (
        <Switch
          size="small"
          disabled={record.menuKey === "/menu"}
          checked={record.status === "1"}
        />
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
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 表格区域 */}
      <Card style={{ marginTop: "16px" }}>
        <Table
          rowKey="menuKey"
          columns={columns}
          dataSource={menus}
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
    </div>
  );
};

export default page;
