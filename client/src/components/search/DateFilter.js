import React from "react";
import { DatePicker, Tooltip } from "antd";
import classes from "./DateFilter.module.css";

const { RangePicker } = DatePicker;

const DateFilter = ({ handleChange }) => {
  return (
    <Tooltip title="Check Availability For Rooms">
      <div className={classes.range}>
        <RangePicker onChange={handleChange} />
      </div>
    </Tooltip>
  );
};

export default DateFilter;
