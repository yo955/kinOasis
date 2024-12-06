"use client";
import React from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
const UploadCareButton = ({
  setProduct,
  isArray = false,
  uniqueKey,
  className,
}) => {
  const set = new Set();
  const handleChangeEvent = (files) => {
    if (!files.allEntries[0]?.cdnUrl) {
      setProduct((prev) => ({ ...prev, [`${uniqueKey}`]: isArray ? [] : "" }));
    } else if (isArray) {
      files.allEntries?.map((map) => {
        if (map?.cdnUrl) {
          set.add(map.cdnUrl);
          setProduct((prev) => ({
            ...prev,
            [`${uniqueKey}`]: [...set.values()],
          }));
        }
      });
    } else {
      if (files.allEntries[0]?.cdnUrl) {
        setProduct((prev) => ({
          ...prev,
          [`${uniqueKey}`]:
            files.allEntries[files.allEntries.length - 1].cdnUrl,
        }));
      }
    }

    console.log("change event payload:", files);
  };
  return (
    <div>
      <FileUploaderRegular
        onChange={handleChangeEvent}
        sourceList="local, url, camera, dropbox"
        classNameUploader="uc-dark"
        pubkey="640288cd1c0769deb1f5"
        className={className}
      />
    </div>
  );
};

export default UploadCareButton;
