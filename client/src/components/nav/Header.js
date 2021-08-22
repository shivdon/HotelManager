import React from "react";
import { Layout } from "antd";
import classes from "./Header.module.css";
import hotelIcon from "../../images/apple-touch-icon.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const HeaderNav = () => {
  return (
    <Header className="header">
      <div className={`float-start ${classes.hotel}`}>
        <img src={hotelIcon} alt="logo" height="30" width="30" />
        <span>Hotelier</span>
      </div>

      <div className={classes.navlink}>
        <Link className={classes.link} to="/rooms">
          Rooms
        </Link>
        <Link className={classes.link} to="/hotels">
          Hotels
        </Link>
      </div>
    </Header>
  );
};

export default HeaderNav;
