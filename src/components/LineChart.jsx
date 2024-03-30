import { Col, Row, Typography } from "antd";
import React from "react";
import { Line } from "react-chartjs-2";
const { Text, Title } = Typography;
function LineChart({ historyFetching, coinHistory, currentPrice, coinName }) {
  try {
    if (historyFetching) {
      return (
        <div className="center">
          <RingLoader color="#001529" loading={true} />;
        </div>
      );
    }
 
    console.log(coinHistory);
    return (
      <>
        <Row className="chart-header">
          <Title level={2} className="chart-title">
            {coinName} Price Chart.
          </Title>
          <Col className="price-container">
            <Title className="price-change" level={5}>
              {coinHistory}
            </Title>
            <Title className="price-change" level={5}>
              {" "}
              Current
              {coinName} Price: ${currentPrice}
            </Title>
          </Col>
        </Row>
      </>
    );
  } catch (error) {
    console.log("cant fetch.");
  }
}

export default LineChart;
