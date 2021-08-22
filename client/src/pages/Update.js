import React, { useEffect, useState } from "react";
import UpdateRoomModalForm from "../components/Modal/UpdateRoomModalForm";

import axios from "axios";

const Update = ({ match }) => {
  const [singleRoomData, setSingleRoomData] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  useEffect(() => {
    handleSingleRoomInfo();
  }, []);

  const handleSingleRoomInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API}/room/${match.params.slug}`)
      .then((res) => {
        console.log(res.data);
        setSingleRoomData(res.data);
        setUpdateModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    updateModalVisible && (
      <UpdateRoomModalForm
        singleRoomData={singleRoomData}
        updateModalVisible={updateModalVisible}
        setUpdateModalVisible={setUpdateModalVisible}
      />
    )
  );
};

export default Update;
