import React from "react";
import { Card, Skeleton, Row, Col } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card style={{ width: 400 }} className="col-md-4 m-5" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
