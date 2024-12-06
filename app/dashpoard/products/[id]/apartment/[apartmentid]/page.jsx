"use client";
import styles from "@/app/ui/dashpoard/products/singleproduct/apartment/singleapartment/singleapartment.module.css";
import axios from "axios";
import Image from "next/image";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.patch(
        `${apiUrl}/apartment/update/${apartmentid}`,
        apartment,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      toast.success("Apartment updated successfully!");
      window.location.pathname = window.location.pathname.split("/").slice(0,-1).join("/")
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
          <Image
            src={apartment.mainImage || "/noproduct.jpg"}
            alt="Apartment Image"
            width={300}
            height={300}
            className={styles.userImg}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleApartmentPage;
