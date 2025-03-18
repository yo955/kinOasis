"use client";
import styles from "@/app/ui/dashpoard/products/singleproduct/singleproduct.module.css";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLoader2 } from "react-icons/tb";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    mainImage: "",
    title: "",
    location: "",
    status: "",
    map: "",
    address: "",
    description: "",
    pdf: "",
    video: "", // إضافة الفيديو
  });

  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}/compound/find/${id}`)
      .then((res) => {
        const productData = res.data;
        // const extractedMapSrc = extractSrc(productData.map);
        setProduct({ ...productData});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, apiUrl]);

  // const extractSrc = (input) => {
  //   if (!input || !input.includes("src=")) return null;
  //   try {
  //     return input.split("src=")[1].split("/")[1]
  //   } catch (error) {
  //     console.error("Error extracting src:", error);
  //     return null;
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     [name.toLowerCase()]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "map") {
      String(value).startsWith("https")?setProduct({ ...product, map: value }):
      setProduct({ ...product, map: value?.split(/src="/)[1]?.split('"')[0] });
    } else {

      setProduct((prevProduct) => ({
        ...prevProduct,
        [name.toLowerCase()]: value,
      }));
    }
    console.log(product);
  };
  console.log(product.map)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.warn("Please log in to update the product.", { position: "bottom-right" });
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      if ((key === "mainImage" || key === "video" || key === "pdf") && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.patch(`https://kinoasis.online/compound/update/${product._id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Compound updated successfully!", { position: "bottom-right" });
    } catch (error) {
      console.error("Error updating compound:", error);
      toast.error("Failed to update compound.", { position: "bottom-right" });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <ToastContainer />
      

      {/* PDF Upload */}
      <div className="flex flex-col">
<div className={`${styles.infoContainer}`}>
        <div className={`${styles.imgContainer}`}>
          <Image
            src={
              product.mainImage instanceof File
                ? URL.createObjectURL(product.mainImage)
                : product.mainImage
                ? `https://kinoasis.online/${product.mainImage}`
                : "/noproduct.jpg"
            }
            alt="productImage"
            fill
            className={`${styles.userImg}`}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setProduct((prev) => ({ ...prev, mainImage: file }));
          }}
        />
      </div>
      <div className="mt-5 p-3 flex flex-col items-center bg-blue-950 rounded-2xl">
        <div className="title">Edit PDF</div>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) setProduct((prev) => ({ ...prev, pdf: e.target.files[0] }));
          }}
        />
      </div>

      {/* Video Upload */}
      <div className="mt-5 p-3 flex flex-col items-center bg-blue-950 rounded-2xl">
        <div className="title">Edit Video</div>
        {product.video && (
          <div className="flex flex-col">
            <video width="300" controls>
            <source src={`https://kinoasis.online/${product.video}`} type="video/mp4" />
          </video>
          <button className="bg-red-500 rounded-lg w-[200px] flex mx-auto text-center justify-center p-3 my-3" onClick={()=>{
            setProduct((prev)=>({
              ...prev,
              video:""
            }))
           
          }}>delete</button>
          </div>
        
        )}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            if (e.target.files?.[0]) setProduct((prev) => ({ ...prev, video: e.target.files[0] }));
          }}
        />
      </div>
      </div>

      <form onSubmit={handleSubmit} style={{flex:1}} className={styles.form } >
        <label>Title</label>
        <input type="text" name="title" value={product.title} onChange={handleChange} />
       
        <label>Location</label>
        <input type="text" name="location" value={product.location} onChange={handleChange} />
        <label>Map</label>
          <input
            type="text"
            name="map"
            placeholder="Map"
            value={product.map || ""}
            onChange={handleChange}
          />
        <label>Status</label>
        
        <select name="status" value={product.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="soon">Soon</option>
          <option value="sold">Sold</option>
        </select>
        <label>Description</label>
        <textarea name="description" value={product.description} onChange={handleChange} rows={5}></textarea>
        <button type="submit">{isLoading ? <TbLoader2 className="animate-spin" /> : "Update"}</button>
      </form>
    </div>
  );
};

export default SingleProductPage;