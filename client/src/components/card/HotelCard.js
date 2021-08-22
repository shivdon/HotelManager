import { EyeOutlined } from "@ant-design/icons";
import { Card, Tooltip, Skeleton } from "antd";
import React from "react";

import classes from "./HotelCard.module.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

const HotelCard = ({ hotelData, loading }) => {
  return (
    <>
      <div className="row">
        {hotelData &&
          hotelData.map((data) => (
            <div className="col-md-4 pb-4" key={data._id}>
              <Card
                className={classes.hotelCard}
                cover={
                  <img
                    src={data.images[0] && data.images[0].url}
                    style={{ height: 200 }}
                  />
                }
                actions={[
                  <Tooltip title="view Hotel">
                    <h3>
                      <Link to={`/hotel/${data.slug}`}>
                        <EyeOutlined />
                      </Link>
                    </h3>
                  </Tooltip>,
                ]}
              >
                <Skeleton loading={loading} avatar active></Skeleton>

                <h4>{data.name}</h4>
                <h5>{data.country}</h5>
                <span>
                  <strong>Location: </strong>
                  {data.address}
                </span>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};

export default HotelCard;
