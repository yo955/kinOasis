"use client";
import styles from "@/app/ui/dashpoard/products/addproduct/addproduct.module.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLoader2 } from "react-icons/tb";
import SwiperImages from "@/app/_components/lib/SwipperImages";

const AddProductPage = () => {
  const [mainImage, setMainImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    location: "",
    status: "available",
    description: "",
    address: "",
    map: "kkk",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "map") {
      setProduct({ ...product, map: value?.split(/src="/)[1]?.split('"')[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.error("Please log in to add the product.");
      return;
    }
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value));

    if (mainImage) formData.append("mainImage", mainImage);
    if (video) formData.append("video", video);
    if (pdf) formData.append("pdf", pdf);

    if (additionalImages && Array.isArray(additionalImages)) {
      additionalImages.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    try {
      setIsLoading(true);
      await axios.post(`${apiUrl}/compound/add`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Compound added successfully!");
      window.location.pathname = "/dashpoard/products";
      setProduct({
        title: "",
        location: "",
        status: "available",
        description: "",
        address: "",
        map: "",
      });
      setMainImage(null);
      setVideo(null);
      setPdf(null);
      setAdditionalImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error?.response?.data?.error || "Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMainImage = () => {
    setMainImage(null);
  };

  const handleRemoveImages = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className={styles.container}>
      <ToastContainer />
      <section className="add-images flex justify-between items-start w-full">
        <div className={styles.infoContainer}>
          <div className="btn-container flex text-center items-center justify-between gap-5">
            <div className="grid grid-cols-2 justify-between w-full gap-10">
              {/* Main Image */}
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <label className="my-5">Add Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setMainImage)}
                  />
                </div>
                <div className="w-[400px] h-[180px] relative bg-slate-800">
                  {mainImage ? (
                    <>
                      <button
                        onClick={handleRemoveMainImage}
                        className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        ✕
                      </button>
                      <img
                        src={URL.createObjectURL(mainImage)}
                        alt="Main Image"
                        className="absolute w-full h-full object-cover rounded-md"
                      />
                    </>
                  ) : (
                    <p>لا يوجد صور</p>
                  )}
                </div>
              </div>
              {/* <<<<<<MainImage>>>>>> */}

              {/* Images Array */}
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <label className="my-5">Add Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleAdditionalImagesChange(e)}
                  />
                </div>
                <div className="w-[400px] h-[180px] relative bg-slate-800">
                  {additionalImages.length > 0 ? (
                    <SwiperImages
                      images={additionalImages.map((img) =>
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      )}
                      handleRemoveImages={handleRemoveImages}
                    />
                  ) : (
                    <img
                      src="/noproduct.jpg"
                      alt="No Product"
                      className="absolute w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
              {/* <<<<<<ImagesArray>>>>>> */}

              <div>
                <div className="flex items-center justify-between">
                  <label className="my-5">Add Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, setVideo)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="my-5">Add PDF</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, setPdf)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={product.title}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={product.location}
            onChange={handleChange}
          />

          <label>Status</label>
          <select name="status" value={product.status} onChange={handleChange}>
            <option value="available">Available</option>
            <option value="soon">Soon</option>
            <option value="sold">Sold</option>
            <option value="booked">booked</option>
          </select>

          <label>Map</label>
          <input
            type="text"
            name="map"
            placeholder="Map"
            value={product.map}
            onChange={handleChange}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={product.address}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            rows={5}
            style={{ direction: "rtl" }}
          ></textarea>

          <button type="submit">
            {isLoading ? (
              <div className="w-full flex justify-center items-center">
                <div style={{ scale: 1.6 }} className="animate-spin">
                  <TbLoader2 />
                </div>
              </div>
            ) : (
              "Add Compound"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProductPage;
