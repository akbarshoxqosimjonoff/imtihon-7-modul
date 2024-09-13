import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { CarOutlined, FileTextOutlined } from "@ant-design/icons";
import Adds from "../companyAdd"; // Assuming Adds is your component
import Contract from "../vakansiyaAdd";

const { Header, Sider, Content } = Layout;

const Menus: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh", margin: "0" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick}
          items={[
            {
              key: "1",
              icon: <AuditOutlined />,
              label: "Company",
            },
            {
              key: "2",
              icon: <FileTextOutlined />,
              label: "Vakansiya",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedKey === "1" && <Adds />}{" "}
          {selectedKey === "2" && <Contract />}{" "}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Menus;
