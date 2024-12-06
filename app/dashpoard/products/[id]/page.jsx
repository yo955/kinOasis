"use client";
import styles from "@/app/ui/dashpoard/products/singleproduct/singleproduct.module.css";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadCareButton from "../add/components/UploadCare";
import { TbLoader2 } from "react-icons/tb";
const SingleProductPage = () => {
  const { id } = useParams();
  const [isloading, setisloading] = useState(false);
  const [product, setProduct] = useState({
    mainImage: "",
    title: "",
    location: "",
    status: "",
    mainImage: "",
    map: "",
    address: "",
    description: "",
    pdf: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setisloading(true)
    axios
      .get(`${apiUrl}/compound/find/${id}`)
      .then((res) => {
        const productData = res.data;
        const extractedMapSrc = extractSrc(productData.map); // استخراج رابط الخريطة
        setProduct({ ...productData, map: extractedMapSrc });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }).finally(()=>{
        setisloading(false)
      })
  }, [id, apiUrl]);

  // دالة لاستخراج الرابط من الخريطة
  const extractSrc = (input) => {
    if (!input || !input.includes("src=")) return null;
    try {
      return input.split("src=")[1].split(/"/)[1];
    } catch (error) {
      console.error("Error extracting src:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "map"){
      setProduct({...product,map:value?.split(/src="/)[1]?.split('"')[0]})
    }else{
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name.toLowerCase()]: value,
      }));
    }
    console.log(product)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.warn("Please log in to update the product.", {
        position: "bottom-right",
      });
      return;
    }
    try {
      await axios.patch(`${apiUrl}/compound/update/${product._id}`, product, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      toast.success("Compound updated successfully!", {
        position: "bottom-right",
      });
      window.location.pathname = window.location.pathname.split("/").slice(0,-1).join("/")
    } catch (error) {
      console.error("Error updating compound:", error);
      toast.error("Failed to update compound.", {
        position: "bottom-right",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  console.log(product.map);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div>
        <div className={`${styles.infoContainer}`}>
          <div className={`${styles.imgContainer}`}>
            <Image
              src={product.mainImage ? product.mainImage : "/noavatar.png"}
              alt="productImage"
              fill
              className={`${styles.userImg}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="title">Edit Img</div>
            <UploadCareButton
              setProduct={setProduct}
              uniqueKey={"mainImage"}
              className=""
            />
          </div>
        </div>
        <div className="mt-5 p-3 flex flex-col justify-between items-center bg-blue-950 rounded-2xl">
          <div className="title ">Edit PDf</div>
          <UploadCareButton
            setProduct={setProduct}
            uniqueKey={"pdf"}
            className="mt-3"
          />
        </div>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={product.title}
            onChange={handleChange}
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="location"
            value={product.location}
            onChange={handleChange}
          />
          <label>Status</label>
          <select
            name="status"
            id="status"
            value={product.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="soon">Soon</option>
            <option value="sold">Sold</option>
          </select>
          <label>Map</label>
          <input
            type="text"
            name="map"
            placeholder="Map"
            value={`${product.map}` || ""}
            onChange={handleChange}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="address"
            value={product.address}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
            style={{ direction: "rtl" }}
          ></textarea>
           <button type="submit">{isLoading?
          <div className="w-full flex justify-center items-center">
            <div style={{scale:1.6}} className="animate-spin"><TbLoader2 /></div>
          </div>
          :"Update"}</button>
          {/* <button type="submit">Update</button> */}
        </form>
        <Link prefetch={true} href={`/dashpoard/products/${id}/apartment`}>
          <button className={styles.AddApartmentBtn}>Add an apartment</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProductPage;
