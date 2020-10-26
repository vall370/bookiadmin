import React from "react";
import { Context } from '../Wrapper'
import { useContext } from 'react';

import "antd/dist/antd.css";
import "../../index.css";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { FormattedMessage, FormattedDate } from 'react-intl';

const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const context = useContext(Context)

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Login
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Register
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        /> */}
        <Content style={{ margin: "24px 16px 0", height: "100vh" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <FormattedMessage id="content" defaultMessage="content" />


          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
