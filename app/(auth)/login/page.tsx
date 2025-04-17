"use client";

import React from "react";
import { Form, Input, Button, message, Modal, Spin } from "antd";
import { useRouter } from "next/navigation";
import { $baseApi } from "@/api";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showLoadingModal, setShowLoadingModal] = React.useState(false);

  const handleSubmit = (values: LoginForm) => {
    setLoading(true);

    $baseApi
      .post("/auth/signin", values)
      .then((response) => {
        if (response.data) {
          const { token } = response.data;
          localStorage.setItem("auth_token", token);
          message.success("Login successful");
          setShowLoadingModal(true);

          setTimeout(() => {
            setShowLoadingModal(false);
            router.push("/dashboard");
          }, 3000);
        }
      })
      .catch(() => {
        message.error("Invalid email or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-full w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label={<span className="text-white">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            className="border-[#591293] bg-white/5 text-white placeholder:text-gray-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white">Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            className="border-[#591293] bg-white/5 text-white placeholder:text-gray-300"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full bg-[#0fb7d4] hover:bg-[#0ca4bd]"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={showLoadingModal}
        closable={false}
        footer={null}
        centered
        styles={{
          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(4px)",
          },
        }}
        modalRender={() => (
          <div className="flex flex-col items-center justify-center p-8">
            <Spin size="large" />
            <p className="mt-4 text-white text-lg">
              Preparing your dashboard...
            </p>
          </div>
        )}
        wrapClassName="bg-transparent"
        width={300}
      />
    </div>
  );
}
