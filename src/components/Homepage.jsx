import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Input } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoapp";
import { RingLoader } from "react-spinners";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";




function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(5);
 
  if (isFetching) {
    return (
      <div className="center">
        <RingLoader color="#001529" loading={true} />;
      </div>
    );
  }

  const fetchedCoinData = data?.data?.stats;
 

  const { Title } = Typography;
  return (
    <>
     


      <Title level={2} className="heading">
        Crypto Statistics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(fetchedCoinData?.total)}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(fetchedCoinData?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap."
            value={millify(fetchedCoinData?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(fetchedCoinData?.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(fetchedCoinData?.totalMarketCap)}
          />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 20 Cryptos at the moment.
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/Cryptocurrencies"}>View More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Latest Cryptos news at the moment.
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/News"}>View More</Link>
        </Title>
      </div>

      <News simplified />
    </>
  );
}

export default Homepage;
