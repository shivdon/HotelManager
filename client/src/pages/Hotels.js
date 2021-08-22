import React, { useEffect, useState } from "react";
import HotelCard from "../components/card/HotelCard";
import ModalForm from "../components/Modal/HotelModalForm";

import SearchBar from "../components/search/SearchBar";
import axios from "axios";
import LoadingCard from "../components/card/LoadingCard";

const Hotels = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchtext, setSearchText] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getHotelInfo();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!searchtext) {
        getHotelInfo();
      } else {
        fetchProductsonSearch(searchtext);
      }
    }, 100);

    return () => clearTimeout(timeOut);
  }, [searchtext]);

  const fetchProductsonSearch = (query) => {
    axios
      .post(`${process.env.REACT_APP_API}/search/filter`, {
        query,
      })
      .then((res) => {
        setHotelData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHotelInfo = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/hotels`)
      .then((res) => {
        console.log(res.data);
        setHotelData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <SearchBar searchtext={searchtext} setSearchText={setSearchText} />
      <div className="center">
        <button
          className="btn btn-primary button m-3"
          onClick={() => setModalVisible(true)}
        >
          + Add hotel
        </button>
      </div>
      <ModalForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        getHotelInfo={getHotelInfo}
      />
      {hotelData && hotelData.length === 0 ? (
        <LoadingCard count={3} />
      ) : (
        <HotelCard hotelData={hotelData} loading={loading} />
      )}
    </div>
  );
};

export default Hotels;
