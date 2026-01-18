"use client";

import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Tabs, message } from "antd";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { SignInResponse } from "next-auth/react";
import send from "@/utils/send";

type LoginFieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

type RegisterFieldType = {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const onFinishLogin = async (values: any) => {
    setLoading(true);
    console.log("values", values);

    const res = (await signIn("credentials", {
      ...values,
      redirect: false,
    })) as SignInResponse | undefined;

    console.log("res:", res);

    if (res?.ok) {
      message.success("登录成功");
    } else {
      message.error("登录失败");
    }

    setLoading(false);
  };

  const onFinishRegister = async (values: any) => {
    console.log("Register values:", values);
    setLoading(true);
    const res = await send.post("/auth/register", values);
    if (res.success) {
      message.success(res.message);
      setActiveTab("login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              label: "登录",
              key: "login",
              children: (
                <Form
                  name="login_form"
                  initialValues={{ remember: true }}
                  onFinish={onFinishLogin}
                  autoComplete="off"
                  size="large"
                >
                  <Form.Item<LoginFieldType>
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="email" />
                  </Form.Item>

                  <Form.Item<LoginFieldType>
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>

                  {/* <Form.Item<LoginFieldType>
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>记住我</Checkbox>
                    <a style={{ float: "right" }} href="#">
                      忘记密码?
                    </a>
                  </Form.Item> */}

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      登录
                    </Button>
                  </Form.Item>

                  <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <span>新用户? </span>
                    <a onClick={() => setActiveTab("register")}>创建账户</a>
                  </div>
                </Form>
              ),
            },
            {
              label: "注册",
              key: "register",
              children: (
                <Form
                  name="register_form"
                  onFinish={onFinishRegister}
                  autoComplete="off"
                  size="large"
                >
                  <Form.Item<RegisterFieldType>
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                  </Form.Item>

                  <Form.Item<RegisterFieldType>
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>

                  <Form.Item<RegisterFieldType>
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "请输入密码!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item<RegisterFieldType>
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!"),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      注册
                    </Button>
                  </Form.Item>

                  <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <span>已有账户? </span>
                    <a onClick={() => setActiveTab("login")}>Sign in</a>
                  </div>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
