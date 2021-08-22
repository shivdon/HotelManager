import { Modal } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Input, Row, Col, Select, DatePicker } from "antd";

import classes from "./RoomModalForm.module.css";

import FileUpload from "./ImageUpload";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;

const { Option } = Select;

const UpdateRoomModalForm = ({
  singleRoomData,
  updateModalVisible,
  setUpdateModalVisible,
  getRoomInfo,
}) => {
  const { roomtype, price, images, slug } = singleRoomData.room;

  const history = useHistory();

  const [roomType, setRoomType] = useState(roomtype);
  const [roomPrice, setRoomPrice] = useState(price);

  const [roomImages, setRoomImages] = useState(images);

  const [loading, setLoading] = useState(false);

  const handleSavingInformationToDatabase = async () => {
    if (roomType == "" && price <= 0) {
      alert("Please fill all the details");
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/room/${slug}`,
        {
          roomtype: roomType,
          price: roomPrice,
          images: roomImages,
        }
      );

      console.log(response.data);
      setUpdateModalVisible(false);
      history.push("/rooms");
      setRoomImages([]);
      setRoomPrice(0);
      setRoomType("");

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
        visible={updateModalVisible}
        onOk={handleSavingInformationToDatabase}
        onCancel={() => {
          setUpdateModalVisible(false);
          history.push("/rooms");
        }}
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
                  value={roomPrice}
                  onChange={(e) => setRoomPrice(e.target.value)}
                  placeholder="Enter the Price for the room.."
                  required
                />
              </Col>
            </Row>
          </div>
          <div className={classes.form}>
            {loading ? (
              <LoadingOutlined />
            ) : (
              <FileUpload
                images={roomImages}
                setImages={setRoomImages}
                setLoading={setLoading}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateRoomModalForm;
