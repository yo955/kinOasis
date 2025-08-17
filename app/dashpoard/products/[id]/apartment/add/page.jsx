"use client";
import styles from "@/app/ui/dashpoard/products/singleproduct/apartment/addapartment/addapartment.module.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSwiper from "@/app/_components/lib/CustomSwipper";
import { useParams } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";

const AddApartmentPage = () => {
  const [isloading, setisloading] = useState(false);
  const [apartment, setApartment] = useState({
    mainImage: null,
    images: [],
    rooms: "",
    space: "",
    floor: "",
    bathrooms: "",
    status: "available",
    description: "",
    identity: "",
    price: 0,
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "mainImage") {
      setApartment((prev) => ({ ...prev, mainImage: files[0] }));
    } else if (name === "images") {
      setApartment((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      toast.error("Please log in to add the apartment.");
      return;
    }

    const formData = new FormData();
    formData.append("mainImage", apartment.mainImage);
    apartment.images.forEach((file) => formData.append("images", file));
    formData.append("rooms", apartment.rooms);
    formData.append("space", apartment.space);
    formData.append("floor", apartment.floor);
    formData.append("bathrooms", apartment.bathrooms);
    formData.append("status", apartment.status);
    formData.append("description", apartment.description);
    formData.append("identity", apartment.identity);
    formData.append("price", apartment.price);

    try {
      setisloading(true);
      await axios.post(`${apiUrl}/apartment/add/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Apartment added successfully!");
      window.location.pathname = window.location.pathname.split("/").slice(0, -1).join("/");
    } catch (error) {
      console.error("Error adding apartment:", error);
      toast.error(error?.response?.data?.error || "Something went wrong, please try again.");
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.infoContainer}`}>
        <div className={`${styles.imgContainer}`}>
          <label>Main Image</label>
          {apartment.mainImage ? (
            <img
              src={URL.createObjectURL(apartment.mainImage)}
              alt="Main Apartment Image"
              className={styles.userImg}
            />
          ) : (
            <p>No Main Image</p>
          )}
          <input
            type="file"
            name="mainImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-5"
          />
        </div>

        <div className={`${styles.imgContainer}`}>
          <label>Additional Images</label>
          {apartment.images.length > 0 ? (
            <CustomSwiper
              images={apartment.images.map((file) => ({
                src: URL.createObjectURL(file),
                alt: "Apartment Image",
              }))}
            />
          ) : (
            <p>No Additional Images</p>
          )}
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-5"
          />
        </div>
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
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={apartment.price}
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
            <option value="booked">booked</option>
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
          <button type="submit">
            {isloading ? (
              <div className="w-full flex justify-center items-center">
                <div style={{ scale: 1.6 }} className="animate-spin">
                  <TbLoader2 />
                </div>
              </div>
            ) : (
              "Add Apartment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApartmentPage;
