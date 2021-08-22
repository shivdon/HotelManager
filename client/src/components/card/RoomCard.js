import React from "react";
import { Card } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import classes from "./HotelCard.module.css";
import axios from "axios";

const { Meta } = Card;

const RoomCard = ({ roomData, handleDeleteRoom }) => {
  return (
    <>
      <div className="row">
        {roomData &&
          roomData.map((data) => (
            <div className="col-md-4 pb-4" key={data._id}>
              <Card
                className={`${classes.hotelCard} m-5`}
                style={{ height: 200, border: "6px solid #d3d3d3" }}
                cover={
                  <img
                    src={data.images.length > 0 && data.images[0].url}
                    style={{ height: "200px", objectFit: "cover" }}
                    className="p-1"
                  />
                }
                actions={[
                  <Link to={`rooms/${data.slug}`}>
                    <EditOutlined className="text-primary" />
                  </Link>,

                  <DeleteOutlined
                    className="text-danger"
                    onClick={() => handleDeleteRoom(data.slug)}
                  />,
                ]}
              >
                <Meta
                  title={data.roomtype}
                  description={`Price: $ ${data.price}`}
                />
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};

export default RoomCard;
