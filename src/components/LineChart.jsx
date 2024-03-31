import { Col, Row, Typography } from "antd";
import millify from "millify";
import React from "react";
import { Line } from "react-chartjs-2";
import { RingLoader } from "react-spinners";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
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

    const coinPrice = [];
      const coinTimestamp = [];
      



    for (let i = 0; i < coinHistory?.history?.length; i += 1) {
      coinPrice.push(coinHistory.history[i].price);
      coinTimestamp.push(
        new Date(coinHistory.history[i].timestamp * 1000).toLocaleDateString()
      );
    }

    console.log(coinHistory);
    console.log(coinTimestamp);
    const data = {
      labels: coinTimestamp,
      datasets: [
        {
          label: "Price in USD",
          data: coinPrice,
          fill: false,
          backgroundColor: "#0071bd",
          borderColor: "#0001bf",
        },
      ],
    };

    const options = {
      scales: {
        

        // x: [
        //   {
        //     ticks: {
        //       beginAtZero: true,
        //     },
        //   },
        // ],
      },
    };
    return (
      <>
        <Row className="chart-header">
          <Title level={2} className="chart-title">
            {coinName} Price Chart.
          </Title>
          <Col className="price-container">
            <Title className="price-change" level={5}>
              {coinHistory.change}%
            </Title>
            <Title className="current-price" level={5}>
              Current {coinName} Price: $ {currentPrice}
            </Title>
          </Col>
        </Row>

        <Line data={data} options={options} />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default LineChart;
