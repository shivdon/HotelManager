import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classes from "./SearchBar.module.css";
const SearchBar = ({ searchtext, setSearchText }) => {
  return (
    <div className={classes.search}>
      <Input
        placeholder="Search Hotels, destinations and more ..."
        prefix={<SearchOutlined />}
        className={classes.searchtext}
        value={searchtext}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
