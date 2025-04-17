"use client";

import React from "react";
import Image from "next/image";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/products",
    icon: <ShoppingOutlined />,
    label: "Products",
  },
  {
    key: "/dashboard/orders",
    icon: <ShoppingCartOutlined />,
    label: "Orders",
  },
  {
    key: "/dashboard/customers",
    icon: <UserOutlined />,
    label: "Customers",
  },
  {
    key: "/dashboard/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sidebar-gradient"
        theme="dark"
      >
        <div className="p-4 flex justify-center">
          <Image
            src="/images/brand-logo.png"
            alt="Brand Logo"
            width={collapsed ? 40 : 60}
            height={collapsed ? 40 : 60}
            className="select-none"
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          className="border-none"
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />

        <Menu
          theme="dark"
          mode="inline"
          className="border-none absolute bottom-0 w-full"
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: handleLogout,
              danger: true,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content className="m-6 p-6 bg-white rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  );
}
