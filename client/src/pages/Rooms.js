import React, { useEffect, useState } from "react";
import RoomCard from "../components/card/RoomCard";
import RoomModalForm from "../components/Modal/RoomModalForm";
import DateFilter from "../components/search/DateFilter";
import axios from "axios";
import { toast } from "react-toastify";

const Rooms = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateString, setDateString] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const handleChange = (value, dateString) => {
    setDateString(dateString);
  };

  const handleDeleteRoom = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/room/${slug}`)
      .then((res) => {
        console.log(res.data);

        getRoomInfo();
        toast.success("deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("deletion unsuccessful");
      });
  };

  useEffect(() => {
    getRoomInfo();
  }, []);

  const getRoomInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API}/rooms`)
      .then((res) => {
        console.log(res.data);
        setRoomData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (dateString.length <= 1) {
        getRoomInfo();
      } else {
        handleDateFilter(dateString);
      }
    }, 100);
    return () => clearTimeout(timeOut);
  }, [dateString]);

  const handleDateFilter = (date) => {
    axios
      .post(`${process.env.REACT_APP_API}/date/filter`, {
        date,
      })
      .then((res) => {
        setRoomData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <DateFilter handleChange={handleChange} />
      <div className="center">
        <button
          className="btn btn-primary button m-3"
          onClick={() => setModalVisible(true)}
        >
          + Add New Room Type
        </button>
      </div>
      <RoomModalForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getRoomInfo={getRoomInfo}
      />

      {roomData && roomData.length === 0 ? (
        <h1>No Rooms Available between this date</h1>
      ) : (
        <RoomCard roomData={roomData} handleDeleteRoom={handleDeleteRoom} />
      )}
    </div>
  );
};

export default Rooms;
