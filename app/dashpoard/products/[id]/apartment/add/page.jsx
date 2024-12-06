"use client";
import styles from "@/app/ui/dashpoard/products/singleproduct/apartment/addapartment/addapartment.module.css";
import axios from "axios";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import UploadCareButton from "../../../add/components/UploadCare";
import CustomSwiper from "@/app/_components/lib/CustomSwipper";
import { useParams } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";

const AddApartmentPage = () => {
  const [isloading, setisloading] = useState(false);
  const [apartment, setApartment] = useState({
    mainImage: "",
    images: [],
    rooms: "",
    space: "",
    floor: "",
    bathrooms: "",
    status: "available",
    description: "",
    identity: "",
    // video: [],
  });

  const { id } = useParams();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment((prevApartment) => ({
      ...prevApartment,
      [name.toLowerCase()]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      toast.error("Please log in to add the apartment.");
      return;
    }

    try {
      setisloading(true)
      const response = await axios.post(
        `${apiUrl}/apartment/add/${id}`,
        apartment,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Apartment added successfully!");
      window.location.pathname = window.location.pathname.split("/").slice(0,-1).join("/")
      // setApartment({
      //   mainImage: "",
      //   images: [],
      //   rooms: "",
      //   space: "",
      //   floor: "",
      //   bathrooms: "",
      //   status: "",
      //   description: "",
      //   identity: "",
      //   // video: [],
      // });
    } catch (error) {
      console.error("Error adding apartment:", error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong, please try again."
      );
    }finally{
      setisloading(false)
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.infoContainer}`}>
        <div className={`${styles.imgContainer}`}>
          <label>Main Image</label>
          <Image
            src={apartment.mainImage || "/noproduct.jpg"}
            alt="Main Apartment Image"
            width={300}
            height={300}
            className={styles.userImg}
          />
          <UploadCareButton
            setProduct={setApartment}
            uniqueKey={"mainImage"}
            isArray={false}
            className={"mt-5"}
          />
        </div>

        <div className={`${styles.imgContainer}`}>
          <label>Additional Images</label>
          {apartment.images.length > 1 ? (
            <CustomSwiper
              images={apartment.images.map((img) => ({
                src: img,
                alt: "Apartment Image",
              }))}
            />
          ) : apartment.images.length === 1 ? (
            <Image
              src={apartment.images[0]}
              alt="Apartment Additional Image"
              width={200}
              height={200}
              className={styles.userImg}
            />
          ) : (
            <p>No Additional Images</p>
          )}
          <UploadCareButton
            setProduct={setApartment}
            uniqueKey={"images"}
            isArray={true}
            className={"mt-5"}
          />
        </div>

        {/* <div className={`${styles.imgContainer}`}>
          <label>Videos</label>
          {apartment.video.length > 1 ? (
            <CustomSwiper
              images={apartment.video.map((vid) => ({
                src: vid,
                alt: "Apartment Video",
              }))}
            />
          ) : apartment.video.length === 1 ? (
            <video
              src={apartment.video[0]}
              controls
              className="w-[200px] h-[200px]"
            ></video>
          ) : (
            <p>No Video</p>
          )}
          <UploadCareButton
            setProduct={setApartment}
            uniqueKey={"video"}
            isArray={true}
            className={"mt-5"}
          />
        </div> */}
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Identity</label>
          <input
            type="text"
            name="identity"
            placeholder="Identity"
            value={apartment.identity}
            onChange={handleChange}
          />
          <label>Rooms</label>
          <input
            type="number"
            name="rooms"
            placeholder="Rooms"
            value={apartment.rooms}
            onChange={handleChange}
          />
          <label>Space</label>
          <input
            type="number"
            name="space"
            placeholder="Space"
            value={apartment.space}
            onChange={handleChange}
          />
          <label>Floor</label>
          <input
            type="number"
            name="floor"
            placeholder="Floor"
            value={apartment.floor}
            onChange={handleChange}
          />
          <label>Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={apartment.bathrooms}
            onChange={handleChange}
          />
          <label>Status</label>
          <select
            name="status"
            id="status"
            value={apartment.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="soon">Soon</option>
            <option value="sold">Sold</option>
          </select>
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            placeholder="Description"
            value={apartment.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit">{isloading?
          <div className="w-full flex justify-center items-center">
            <div style={{scale:1.6}} className="animate-spin"><TbLoader2 /></div>
          </div>
          :"Add Apartment"}</button>
          {/* <button type="submit">Add Apartment</button> */}
        </form>
      </div>
    </div>
  );
};

export default AddApartmentPage;
