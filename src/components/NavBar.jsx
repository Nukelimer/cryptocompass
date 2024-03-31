import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Typography } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../images/avatar.svg";
import { useState } from "react";

function NavBar() {
  const [screenSize, setScreenSize] = useState(null);
  const [activeMenu, setActiveMenu] = useState(true);
  useEffect(() => {
    const resizeHandler = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const items = [
    {
      label: <Link to="/">Homepage</Link>,
      icon: <HomeOutlined />,
      key: "home",
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

  return (
    <div className="nav-container">
      <Link to={"/"} className="color">
      <div className="logo-container">
        <Avatar src={img} size={64} />
        <Typography.Title level={2} className="logo">
          CRYPTOCOMPASS
        </Typography.Title>
        </div>
        </Link>
      <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
        

        <MenuOutlined/>
</Button>
      {

        !activeMenu && <Menu theme="dark" items={items} />
      }
    </div>
  );
}

export default NavBar;
