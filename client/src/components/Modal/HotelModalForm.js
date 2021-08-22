import { Modal } from "antd";
import React, { useState } from "react";

import { Input, Row, Col, Select } from "antd";

import classes from "./ModalFormContent.module.css";
import countries from "../../data/country.json";
import TextArea from "rc-textarea";
import FileUpload from "./ImageUpload";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;

const ModalForm = ({ modalVisible, setModalVisible, getHotelInfo }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSavingInformationToDatabase = async () => {
    if (name === "" && country === "" && address === "") {
      alert("Fill the required details");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/hotel`, {
        images,
        country,
        name,
        address,
      });

      console.log(response);
      setModalVisible(false);
      setLoading(false);

      setAddress("");
      setCountry("");
      setImages([]);
      setName("");

      getHotelInfo();
      toast.success(`${response.data.name} got successfully Registered`);
    } catch (err) {
      console.log(err);
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
                <span>Hotel Name: </span>
              </Col>
              <Col span={12} offset={2}>
                <Input
                  size="middle"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the hotel Name.."
                  required
                />
              </Col>
            </Row>
          </div>
          <div className={classes.form}>
            <Row>
              <Col span={5}>
                <span>Location: </span>
              </Col>
              <Col span={12} offset={2}>
                <Select
                  style={{ width: 250 }}
                  placeholder="Select Country"
                  onChange={(value) => setCountry(value)}
                  required
                >
                  {countries.map((country) => (
                    <Option value={country.name} key={country.code}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </div>
          <div className={classes.form}>
            <Row>
              <Col span={5}>
                <span>Address: </span>
              </Col>
              <Col span={12} offset={2}>
                <TextArea
                  rows={3}
                  style={{ width: 260 }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Address.."
                  required={true}
                />
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

export default ModalForm;
