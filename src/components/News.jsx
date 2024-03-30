import React from "react";
import { useGetCryptoNews } from "../services/cryptonews";
import moment from "moment";

import { Typography, Row, Col, Avatar, Card, Select } from "antd";
import { Button } from "antd/es/radio";
import { RingLoader } from "react-spinners";
function News({ simplified }) {

  const count = simplified ? 5 : 10;
  const { data, isFetching } = useGetCryptoNews();

  const { Text, Title } = Typography;
  const { Option } = Select;

  try {
    if (isFetching) {
      return (
        <div className="center">
          <RingLoader color="#001529" loading={true} />;
        </div>
      );
    }

    return (
      <Row gutter={[24, 24]}>
        {data?.data?.slice(0, 10).map((news, index) => {
       
          return (
            <Col xs={24} sm={12} lg={8} key={index} className="box-height">
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={5}>
                      {news.title}
                    </Title>
                    <img
                      src={news?.thumbnail}
                      alt={news.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>

                  <p>{news.description}</p>

                  <div className="provider-container">
                    <Text>
                      {moment(news.createdAt).startOf("ss").fromNow()}
                    </Text>
                    <Button>
             
                   
                     Read More
                
                      </Button>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  } catch (error) {
    console.log("cant fetch news");
  }
}

export default News;
