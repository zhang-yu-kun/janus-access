// pages/search-table.tsx 或 app/search-table/page.tsx
"use client";

import React, { useState } from "react";
import { Table, Input, Button, Space, Card, Row, Col } from "antd";
import type { TableProps } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  email: string;
}

const page: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      email: "john@example.com",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      email: "jim@example.com",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      email: "joe@example.com",
    },
    {
      key: "4",
      name: "Jane Doe",
      age: 28,
      address: "Paris No. 1 Lake Park",
      email: "jane@example.com",
    },
    {
      key: "5",
      name: "Tom Wilson",
      age: 35,
      address: "Tokyo No. 1 Lake Park",
      email: "tom@example.com",
    },
  ]);

  const handleSearch = (value: string) => {
    setLoading(true);

    // 模拟 API 调用
    setTimeout(() => {
      const filteredData = dataSource.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      );

      setDataSource(filteredData);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setSearchText("");
    setLoading(true);

    // 恢复原始数据
    setTimeout(() => {
      setDataSource([
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          email: "john@example.com",
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          email: "jim@example.com",
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sydney No. 1 Lake Park",
          email: "joe@example.com",
        },
        {
          key: "4",
          name: "Jane Doe",
          age: 28,
          address: "Paris No. 1 Lake Park",
          email: "jane@example.com",
        },
        {
          key: "5",
          name: "Tom Wilson",
          age: 35,
          address: "Tokyo No. 1 Lake Park",
          email: "tom@example.com",
        },
      ]);
      setLoading(false);
    }, 300);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
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
    </div>
  );
};

export default page;
