"use client"
import { useEffect, useState } from "react";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";


import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";

 function AddImageButton({setProduct,id,uniqueKey}) {
  const [publicId, setPublicId] = useState("");
  const [cloudName,setCloudNmae] = useState("dmrpkvddb");

  const [uploadPreset,setUpload] = useState("x0x_preset");



  const [uwConfig] = useState({
    cloudName,
    uploadPreset

  });


  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  return (
    <>
    <div className="App">
      <CloudinaryUploadWidget uniqueKey={uniqueKey} uwConfig={uwConfig} id={id} setPublicId={setPublicId} setProduct={setProduct}/>

      <div style={{ width: "500px" }} >
        <AdvancedImage
        
        className="max-h-[100px] mt-[20px]"
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>
    </>
  );
}

export default AddImageButton