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
import SwiperImages from "@/app/_components/lib/SwipperImages";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    mainImage: "",
    images: [],
    title: "",
    location: "",
    status: "",
    map: "",
    address: "",
    description: "",
    pdf: "",
    video: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}/compound/find/${id}`)
      .then((res) => {
        const productData = res.data;

        const formattedImages = Array.isArray(productData.images)
          ? productData.images
          : typeof productData.images === "string"
          ? [productData.images]
          : [];

        setProduct({
          ...productData,
          images: formattedImages,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "map") {
      String(value).startsWith("https")
        ? setProduct({ ...product, map: value })
        : setProduct({
            ...product,
            map: value?.split(/src="/)[1]?.split('"')[0],
          });
    } else if (name === "images") {
      // حماية: إذا المستخدم كتب سترينج أو لصق صور مفصولة بفاصلة
      let imagesArr = value;
      if (typeof value === "string") {
        if (value.includes(",")) {
          imagesArr = value.split(",").map((img) => img.trim());
        } else if (value.includes(" ")) {
          imagesArr = value.split(" ").map((img) => img.trim());
        } else {
          imagesArr = [value];
        }
      }
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: Array.isArray(imagesArr) ? imagesArr : [],
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name.toLowerCase()]: value,
      }));
    }
    console.log(product);
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

    setIsLoading(true); // <-- أضف هذا السطر ليظهر اللودر

    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        // بنرسل كل الصور في نفس المفتاح سواء كانت جديدة أو قديمة
        value.forEach((img) => {
          if (typeof img === "string") {
            formData.append("images", img); // خلي بالك، ده محتاج الباك إند يقبله كـ string
          } else if (img instanceof File) {
            formData.append("images", img);
          }
        });
      } else if (
        (key === "mainImage" || key === "video" || key === "pdf") &&
        value instanceof File
      ) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.patch(
        `https://kinoasis.online/compound/update/${product._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Compound updated successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error updating compound:", error);
      toast.error("Failed to update compound.", { position: "bottom-right" });
    } finally {
      setIsLoading(false); // <-- أضف هذا السطر ليختفي اللودر
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const handleRemoveMainImage = () => {
    setProduct((prev) => ({ ...prev, mainImage: null }));
  };
  const handleRemoveImages = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      className={styles.container}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ToastContainer />

      <div className="flex gap-5 items-center justify-between ">
        <div className={`${styles.infoContainer}`}>
          {product.mainImage ? (
            <div className={`${styles.imgContainer}`}>
              <button
                onClick={handleRemoveMainImage}
                className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
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
          ) : (
            <Image
              src="/noproduct.jpg"
              alt="No Product"
              width={250}
              height={300}
              className="absolute rounded-md bg-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setProduct((prev) => ({ ...prev, mainImage: file }));
            }}
          />
        </div>
        {/* Images */}
        <div className={`${styles.infoContainer} `}>
          <div className={`${styles.imgContainer}`}>
            {product.images.length > 0 ? (
              <SwiperImages
                // مرر الصور كما هي (سترينج أو File)، وSwiperImages سيعالجها
                images={product.images}
                handleRemoveImages={handleRemoveImages}
              />
            ) : (
              <Image
                src="/noproduct.jpg"
                alt="No Product"
                fill
                className="absolute rounded-md bg-cover"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              // حماية: لا تدمج إلا إذا كل العناصر ملفات أو سترينج صورة
              if (files.length > 0) {
                setProduct((prev) => ({
                  ...prev,
                  images: [
                    ...(Array.isArray(prev.images)
                      ? prev.images.filter(
                          (img) =>
                            typeof img === "string" || img instanceof File
                        )
                      : []),
                    ...files,
                  ],
                }));
              }
            }}
          />
        </div>
        {/* Video Upload */}
      </div>

      <div>
        {/* PDF Upload */}
        <div className=" p-3 flex flex-col items-center bg-blue-950 rounded-2xl">
          <div className="title">Edit PDF</div>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0])
                setProduct((prev) => ({ ...prev, pdf: e.target.files[0] }));
            }}
          />
        </div>

        <div className="mt-5 p-3 flex flex-col items-center bg-blue-950 rounded-2xl">
          <div className="title">Edit Video</div>
          {product.video && (
            <div className="flex flex-col">
              <video width="300" controls>
                <source
                  src={`https://kinoasis.online/${product.video}`}
                  type="video/mp4"
                />
              </video>
              <button
                className="bg-red-500 rounded-lg w-[200px] flex mx-auto text-center justify-center p-3 my-3"
                onClick={() => {
                  setProduct((prev) => ({
                    ...prev,
                    video: "",
                  }));
                }}
              >
                delete
              </button>
            </div>
          )}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              if (e.target.files?.[0])
                setProduct((prev) => ({ ...prev, video: e.target.files[0] }));
            }}
          />
        </div>
      </div>

      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          style={{ flex: 1 }}
          className={styles.form}
        >
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
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
            value={product.map || ""}
            onChange={handleChange}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="address"
            value={product.address || ""}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={5}
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <TbLoader2 className="animate-spin" /> : "Update"}
          </button>
        </form>
        <Link prefetch={true} href={`/dashpoard/products/${id}/apartment`}>
          <button className={styles.AddApartmentBtn}>Add an apartment</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProductPage;
