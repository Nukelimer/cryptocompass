import React, { useState } from "react";

import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoapp";
import { RingLoader } from "react-spinners";
import LineChart from "./LineChart";

function CryptoDetails() {
  const { Text, Title } = Typography;
  const [timePeriod, setTimePeriod] = useState("3m");

  const { Option } = Select;
  const { coinId } = useParams();
  const { data: CoinDetails, isFetching: IsFetchingCoinDetails } =
    useGetCryptoDetailsQuery(coinId);
  const { data, isFetching } = useGetCryptoHistoryQuery({ coinId, timePeriod });



  try {
    if (IsFetchingCoinDetails) {
      return (
        <div className="center">
          <RingLoader color="#001529" loading={true} />;
        </div>
      );
    }

    const cryptoDetails = CoinDetails?.data?.coin;

    const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = [
      {
        title: "Price to USD",
        value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
        icon: <DollarCircleOutlined />,
      },
      { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
      {
        title: "24h Volume",
        value: `$ ${
          cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
        }`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: "Market Cap",
        value: `$ ${
          cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "All-time-high(daily avg.)",
        value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
        icon: <TrophyOutlined />,
      },
    ];

    const genericStats = [
      {
        title: "Number Of Markets",
        value: cryptoDetails.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: "Number Of Exchanges",
        value: cryptoDetails.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Aprroved Supply",
        value: cryptoDetails.supply?.confirmed ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Total Supply",
        value: `$ ${millify(cryptoDetails.supply?.total)}`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${millify(cryptoDetails.supply?.circulating)}`,
        icon: <ExclamationCircleOutlined />,
      },
    ];
    {
    }
    return (
      <>
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title className="coin-name">
              {cryptoDetails.name}{" "}
              {cryptoDetails.slug ? cryptoDetails.slug : ""} Price
            </Title>

            <p>
              {cryptoDetails.name} price in USD. View value statistics, market
              cap and supply.
            </p>
          </Col>

          <Select
            defaultValue={timePeriod}
            placeholder={"select period"}
            onChange={(value) =>{
              
              console.log(' ....',value);
              
              setTimePeriod(value)}}
            className="select-timeperiod">
            {time.map((period) => {
              console.log(' period....',period);

              return <Option key={period}>{period}</Option>;
            })}
          </Select>
          <LineChart
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
            coinHistory={data?.data}
            historyFetching={isFetching}
          />
          <Col className="stats-container">
            <Col className="coin-value-statistic">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-detaile s-heading">
                  {cryptoDetails.name}
                </Title>
                <p>An overview showing the statistics {cryptoDetails.name}</p>
              </Col>

              {stats.map(({ title, value, icon }) => {
                return (
                  <Col className="coin-stats" key={value+Math.random()}>
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
                );
              })}
            </Col>
            <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-detaile s-heading">
                  More Statistics
                </Title>
                <p>
                  An overview showing the statistics of all cryptocurrencies
                  globally.
                </p>
              </Col>

              {genericStats.map(({ title, value, icon }) => {
                return (
                  <Col className="coin-stats" key={value+Math.random()}>
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
                );
              })}
            </Col>
          </Col>

          <Col className="coin-desc-link">
            <Row className="coin-desc">
              <Title level={3} className="coin-details-heading">
                What is {cryptoDetails.name}?
                <br /> {""}
              </Title>

              <p> {HTMLReactParser(cryptoDetails.description)}</p>
            </Row>
          </Col>
        </Col>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
export default CryptoDetails;
