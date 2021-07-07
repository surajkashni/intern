import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import {Badge, Avatar } from "antd";

const FileUpload = ({ images, setImages }) => {

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = images;

    if (files) {
      
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                   
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
              
                allUploadedFiles.push(res.data.url);

                setImages(allUploadedFiles);
              })
              .catch((err) => {
                
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove=(id)=>{
    
    axios.post(`${process.env.REACT_APP_API}/removeimage`,{id},{
      headers:{
        
      }
    }).then((res)=>{
      
      
      let filteredImages=images.filter((item)=>{
        return item.public_id!=id;
      });
      setImages(filteredImages);
    })
    .catch((err)=>{
      
      console.log(err);
    })
  }

  return (
    <>
      <div className="row">
        {images &&
          images.map((image) => (
            <Badge count="x"   key={image.public_id} onClick={()=>handleImageRemove(image.public_id)} style={{cursor:"pointer"}}>
              <Avatar
            
              src={image.url}
              size={10}
              shape="square"
              className="ml-3"
              
            />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-2 ml-3">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
