import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, Switch, Link, useLocation } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";
import { Context } from "./components/Wrapper";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Divider } from "antd";

import {
  ConfirmPage,
  Home,
  Profile,
  NavBar,
  Login,
  LoginForgot,
  LoginResetPassword,
  Logout,
  Register,
  Bookings,
  Rooms,
  Users,
  Settings,
} from "./components/views";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ProtectedRoute from "./components/shared/protectedRoute.jsx";

import { FormattedMessage, FormattedDate } from "react-intl";

const { Header, Content, Footer, Sider } = Layout;
const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
};
const { SubMenu } = Menu;
export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const [current, setCurrent] = React.useState("home");
  const location = useLocation();
  const handleClick = (e) => {
    console.log("click", e);
    setCurrent(e);
  };
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);


  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    // eslint-disable-next-line
  }, []);
  function IsAuthorized(params) {
    if (isAuth) {
      return (
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[location.pathname]}
              style={{ float: "right", }}
            >
              <Menu.Item key="/my-profile" icon={<UserOutlined />}>
                My Profile
                  <Link to="/my-profile" />
              </Menu.Item>
              <Menu.Item key="/home" icon={<UserOutlined />}>
                Home
                  <Link to="/home" />
              </Menu.Item>
              <Menu.Item key="/logout" icon={<VideoCameraOutlined />}>
                Logout
                  <Link to="/logout" />
              </Menu.Item>
            </Menu>

          </Header>

          <Layout style={{ height: "100vh" }}>
            <Sider width={200} className="site-layout-background">
              <Menu
              m
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultSelectedKeys={[location.pathname]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="/bookings" icon={<UserOutlined />}>
                  Bokningar
                  <Link to="/bookings" />

                </Menu.Item>
                <Menu.Item key="/rooms" icon={<VideoCameraOutlined />}>
                  Rum
                  <Link to="/rooms" />

                </Menu.Item>
                <Menu.Item key="/users" icon={<UploadOutlined />}>
                  Användare
                  <Link to="/users" />

                </Menu.Item>
                <Divider />
                <Menu.Item key="/settings" icon={<UploadOutlined />}>
                  Inställningar
                  <Link to="/settings" />

                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
              >
                <div>
                  <Switch>
                    <Route path="/home" exact component={Home} />
                    <ProtectedRoute
                      path="/my-profile"
                      exact
                      component={Profile}
                    />
                    <ProtectedRoute path="/bookings" exact component={Bookings} />
                    <ProtectedRoute path="/rooms" exact component={Rooms} />
                    <ProtectedRoute path="/users" exact component={Users} />
                    <ProtectedRoute path="/settings" exact component={Settings} />
                    <ProtectedRoute path='/logout' exact component={Logout} />

                    <Redirect from="/" exact to="/home" />
                    <Redirect to="/home" />
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      );
    } else {
      return (
        <Layout style={{ height: "100vh" }}>
          <Header className="header">
            <div className="logo" />

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[location.pathname]}
            >
              <Menu.Item key="/login" icon={<AppstoreOutlined />}>
                Login
                <Link to="/login" />
              </Menu.Item>
              <Menu.Item key="/register" icon={<AppstoreOutlined />}>
                Register
                <Link to="/register" />
              </Menu.Item>
            </Menu>
          </Header>

          <Layout >
            <Layout>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <div>
                  <Switch>
                    <Route
                      path="/account/confirm/:token"
                      exact
                      component={ConfirmPage}
                    />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/login/forgot" exact component={LoginForgot} />
                    <Route
                      path="/login/reset/:token"
                      component={LoginResetPassword}
                    />
                    <Redirect from="/" exact to="/login" />
                    <Redirect to="/login" />
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      );
    }
  }
  return loading ? <p>Loading</p> : <IsAuthorized />;
}
