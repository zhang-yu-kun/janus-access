"use client";
import { Layout, Menu } from "antd";
import React from "react";

const { Header, Content, Sider } = Layout;
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ height: "100%" }}>
      {" "}
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default layout;
