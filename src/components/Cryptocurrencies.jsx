import { Card, Row, Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoapp";
import { RingLoader } from "react-spinners";
import millify from "millify";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 20 : 1000;
  const { data, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");

  useEffect(() => {
    const filteredCrypto = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchCrypto.toLowerCase())
    );

    setCryptos(filteredCrypto);
  }, [searchCrypto, data]);

  try {
    if (isFetching) {
      return (
        <div className="center">
          <RingLoader color="#001529" loading={true} />;
        </div>
      );
    }

    return (
      <>
        {!simplified && (
          <div className="search-crypto">
            <Input
              placeholder="Search."
              onChange={(event) => {
                setSearchCrypto(event.target.value);
              }}
            />
          </div>
        )}

        <Row gutter={[10, 10]} className="crypto-card-container">
          {cryptos?.map((crypto) => {
            return (
              <Col
                xs={24}
                sm={12}
                lg={6}
                xl={3}
                className="crypto-card "
                key={crypto.uuid}>
                <Link to={`/crypto/${crypto.uuid}`}>
                  <Card
                    title={`${crypto.rank} . ${crypto.name}`}
                    extra={
                      <img className="crypto-image" src={crypto.iconUrl} />
                    }
                    hoverable>
                    <p> Price: ${millify(crypto.price)}</p>
                    <p>
                      Color:{" "}
                      <span
                        style={{
                          background: `${crypto.color}`,
                          width: "10px",
                          height: "10px",
                        }}></span>
                    </p>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </>
    );
  } catch (error) {
    console.log("cant fetch.");
  }
}
export default Cryptocurrencies;
