import { Modal } from "antd";
import React, { useState } from "react";

import { Input, Row, Col, Select, DatePicker } from "antd";

import classes from "./RoomModalForm.module.css";

import FileUpload from "./ImageUpload";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;

const { Option } = Select;

const RoomModalForm = ({ modalVisible, setModalVisible, getRoomInfo }) => {
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState(0);
  const [dateRange, setdateRange] = useState([]);
  const [dateString, setDateString] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (value, dateString) => {
    console.log(value);
    setdateRange(value);
    setDateString(dateString);
  };

  const handleSavingInformationToDatabase = async () => {
    if (roomType == "" && price <= 0 && dateRange.length <= 1) {
      alert("Please fill all the details");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/room`, {
        roomtype: roomType,
        price: price,
        images,
        startdate: dateRange[0],
        enddate: dateRange[1],
      });

      console.log(response.data);
      setModalVisible(false);
      setImages([]);
      setPrice(0);
      setRoomType("");
      setdateRange([]);
      getRoomInfo();

      toast.success(`${response.data.roomtype} successfully registered`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <Modal
        title="Fill in the Details"
        centered
        style={{ top: 20 }}
        visible={modalVisible}
        onOk={handleSavingInformationToDatabase}
        onCancel={() => setModalVisible(false)}
        width="600px"
        okText="Save Details"
      >
        <div className={classes.main}>
          <div className={classes.form}>
            <Row>
              <Col span={5}>
                <span>Room Type: </span>
              </Col>
              <Col span={12} offset={2}>
                <Input
                  size="middle"
                  type="text"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="Enter the Room Type.."
                  required
                />
              </Col>
            </Row>
          </div>
          <div className={classes.form}>
            <Row>
              <Col span={5}>
                <span>Price: </span>
              </Col>
              <Col span={12} offset={2}>
                <Input
                  size="middle"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter the Price for the room.."
                  required
                />
              </Col>
            </Row>
          </div>
          <div className={classes.form}>
            <Row>
              <Col span={5}>
                <span>Availability: </span>
              </Col>
              <Col span={12} offset={2}>
                <RangePicker onChange={handleChange} value={dateRange} />
              </Col>
            </Row>
            {loading ? (
              <LoadingOutlined />
            ) : (
              <FileUpload
                images={images}
                setImages={setImages}
                setLoading={setLoading}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoomModalForm;
