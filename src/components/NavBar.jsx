import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import img from "../../images/avatar.svg";

const items = [
  {
    label: <Link to="/">Homepage</Link>,
    icon: <HomeOutlined />,
    key: "home",
  },

  {
    label: <Link to="/Exchanges">Exchanges</Link>,
    icon: <HomeOutlined />,
    key: "exchanges",
    icon: <MoneyCollectOutlined />,
  },

  {
    key: "cryptocurrencies",
    icon: <FundOutlined />,
    label: <Link to="/Cryptocurrencies">Cryptocurrencies</Link>,
  },

  {
    key: "news",
    icon: <BulbOutlined />,
    label: <Link to="/News">News</Link>,
  },
];

function NavBar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={img} size={64} />
        <Typography.Title level={2} className="logo">
          <Link to={"/"}>CRYPTOCOMPASS</Link>
        </Typography.Title>
      </div>

      <Menu theme="dark" items={items} />
    </div>
  );
}

export default NavBar;
