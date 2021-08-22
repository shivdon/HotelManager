import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { Avatar, Badge } from "antd";

const FileUpload = ({ images, setImages, setLoading }) => {
  const handleFileUploadAndResize = (e) => {
    //resize
    setLoading(true);
    let files = e.target.files;
    let allUploadedImages = images;

    for (let i = 0; i < files.length; i++) {
      Resizer.imageFileResizer(
        files[i],
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri })
            .then((res) => {
              console.log(res);
              allUploadedImages.push(res.data);
              setImages(allUploadedImages);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("CLOUDINARY ERROR: ", err);
            });
        },
        "base64"
      );
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API}/removeimages`, { public_id })
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((image) => {
          return image.public_id !== public_id;
        });
        setImages(filteredImages);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="row mt-5">
        {images &&
          images.map((image) => (
            <Badge
              count="X"
              className="mr-5 mb-3"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={image.url} shape="square" size={150} />
            </Badge>
          ))}
      </div>
      <div className="row mt-3">
        <label className="btn btn-primary btn-raised">
          Choose File for Image Uploads
          <input
            type="file"
            multiple
            accept="images"
            hidden
            onChange={handleFileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
