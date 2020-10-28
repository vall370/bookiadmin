import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

export default function NavBar() {
  const { isAuth, user } = useSelector((state) => state.user);
  const [current, setCurrent] = React.useState("home");
  const location = useLocation();

  const handleClick = (e) => {
    console.log("click", e);
    setCurrent(e);
  };
  return (
    <nav className="nav">
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={[location.pathname]}
        mode="horizontal"
      >
        {/* <Menu.Item key="/home" icon={<MailOutlined />}>
          Home
          <Link to="/home" />
        </Menu.Item> */}
        <Menu.Item key="/login" icon={<AppstoreOutlined />}>
          Login
          <Link to="/login" />
        </Menu.Item>
        <Menu.Item key="/register" icon={<AppstoreOutlined />}>
          Register
          <Link to="/register" />
        </Menu.Item>
      </Menu>

      {isAuth ? (
        <div>
          <NavLink
            className="inactive"
            activeClassName="active"
            to="/my-profile"
          >
            {user.username}
          </NavLink>
          <NavLink
            className="inactive logout"
            activeClassName="active"
            to="/logout"
          >
            Logout
          </NavLink>
        </div>
      ) : (
          <div>
            {/* <NavLink className="inactive" activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink
            className="inactive "
            activeClassName="active"
            to="/register"
          >
            Register
          </NavLink> */}
          </div>
        )}
    </nav>
  );
}
