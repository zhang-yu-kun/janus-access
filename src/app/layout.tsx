"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "@/styles/root.scss";
const rootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default rootLayout;
