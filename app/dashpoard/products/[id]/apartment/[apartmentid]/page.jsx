"use client";
import styles from "@/app/ui/dashpoard/products/singleproduct/apartment/singleapartment/singleapartment.module.css";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadCareButton from "../../../add/components/UploadCare";
import CustomSwiper from "@/app/_components/lib/CustomSwipper";

const SingleApartmentPage = () => {
  const { apartmentid } = useParams();

  const [apartment, setApartment] = useState({
    mainImage: "",
    images: [],
    rooms: "",
    space: "",
    floor: "",
    bathrooms: "",
    status: "",
    description: "",
    identity: "",
    price: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/apartment/find/${apartmentid}`, { withCredentials: true })
      .then((res) => {
        setApartment(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        toast.error("Failed to load apartment data.");
      });
  }, [apartmentid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment((prevApartment) => ({
      ...prevApartment,
      [name.toLowerCase()]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApartment((prev) => ({ ...prev, mainImage: file }));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setApartment((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveMainImage = () => {
    setApartment((prev) => ({ ...prev, mainImage: null }));
  };

  const handleRemoveImages = (index) => {
    setApartment((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(apartment).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((img) => formData.append("images", img));
        } else {
          formData.append(key, value);
        }
      });

      await axios.patch(`${apiUrl}/apartment/update/${apartmentid}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Apartment updated successfully!");
      window.location.pathname = window.location.pathname
        .split("/")
        .slice(0, -1)
        .join("/");
    } catch (error) {
      console.error("Error updating apartment:", error);
      toast.error("Failed to update apartment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <label>Main Image</label>
          <div className="relative">
            {apartment.mainImage && (
              <button
                onClick={handleRemoveMainImage}
                className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            )}
            <img
              src={
                apartment.mainImage instanceof File
                  ? URL.createObjectURL(apartment.mainImage)
                  : apartment.mainImage
                  ? `https://kinoasis.online/${apartment.mainImage}`
                  : "/noproduct.jpg"
              }
              alt="Apartment Image"
              className={`${styles.userImg} w-[300px] h-[300px] object-cover`}
            />
          </div>
          <input
            type="file"
            onChange={handleMainImageChange}
            className="mt-5"
          />
          <UploadCareButton
            setProduct={setApartment}
            uniqueKey={"mainImage"}
            isArray={false}
            className={"mt-5"}
          />
        </div>

        <div className={styles.imgContainer}>
          <label>Additional Images</label>

          {apartment.images.length > 0 ? (
            <CustomSwiper
              images={apartment.images.map((img) => ({
                src: img instanceof File ? URL.createObjectURL(img) : img,
                alt: "Apartment Image",
                isFile: img instanceof File,
              }))}
              apartment={apartment}
              handleRemoveImages={handleRemoveImages}
            />
          ) : (
            <p>No Additional Images</p>
          )}
          <input
            type="file"
            multiple
            onChange={handleImagesChange}
            className="mt-5"
            setProduct={setApartment}
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleApartmentPage;
