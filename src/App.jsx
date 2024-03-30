import { Layout, Space, Typography } from "antd";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Homepage from "./components/Homepage";
import "./App.css";
import News from "./components/News";
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/Exchanges" element={<Exchanges />} />
              <Route path="/News" element={<News />} />
              <Route path="/Cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}>
            CryptoCompass <br />
            All right reserved.
          </Typography.Title>

          <Space>
            <Link to={"/"}>Home</Link>
            <Link to={"/Exchanges"}>Exchanges</Link>
            <Link to={"/News"}>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
