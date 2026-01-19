"use client";
import send from "@/utils/send";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Menu as MenuTy } from "@prisma/client";
import Link from "next/link";

const { Header, Content, Sider } = Layout;

type MenuItem = {
  label: string | React.ReactElement;
  key: string;
  children?: MenuItem[];
};
const layout = ({ children }: { children: React.ReactNode }) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  useEffect(() => {
    (async () => {
      const res = await send.get("/queryMenu");
      // 处理菜单数据，添加路径信息
      const processedMenus = processMenuData(res.data);
      setMenus(processedMenus);
    })();
  }, []);

  // 处理菜单数据，添加路径信息
  const processMenuData = (menuList: MenuTy[]): MenuItem[] => {
    const nodeMap = new Map<string, MenuItem>();
    const rootNodes: MenuItem[] = [];
    menuList.forEach((menu) => {
      nodeMap.set(menu.menuKey, {
        ...menu,
        label: <Link href={menu.menuKey}>{menu.menuName}</Link>,
        key: menu.menuKey,
      });
    });
    menuList.forEach((item) => {
      const currentNode = nodeMap.get(item.menuKey)!;
      const { label, key } = currentNode;
      if (item.parentKey && nodeMap.has(item.parentKey)) {
        // 有父节点：将自己添加到父节点的children中
        const parentNode = nodeMap.get(item.menuKey)!;
        if (!parentNode.children) {
          parentNode.children = []; // 首次添加子节点时创建数组
        }
        parentNode.children.push({ label, key });
      } else {
        // 没有父节点或父节点不存在：自己是根节点
        rootNodes.push({ label, key });
      }
    });
    return rootNodes;
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" items={menus} />
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
