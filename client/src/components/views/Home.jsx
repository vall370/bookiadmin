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
    <div>
      <p>awd</p>
    </div>
  );
}
