"use client";
import styles from "@/app/ui/dashpoard/products/products.module.css";
import Link from "next/link";
import Image from "next/image";
import Search from "@/app/ui/dashpoard/search/Search";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ProductsPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [compound, setCompound] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compoundToDelete, setCompoundToDelete] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // الترقيم
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // عدد العناصر في الصفحة
  const [totalPages, setTotalPages] = useState(0);

  const trimText = useCallback((text) => {
    return text.length > 10 ? text.slice(0, 10) + "..." : text;
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/compound`)
      .then((response) => {
        setCompound(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // حساب عدد الصفحات الإجمالية
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      });
  }, [apiUrl]);

  // تصفية المنتجات بناءً على الصفحة الحالية
  const paginatedProducts = compound.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/compound/delete/${compoundToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setCompound(
        compound.filter((product) => product._id !== compoundToDelete)
      );
      setShowPopup(false);
      toast.success("Product deleted successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error deleting compound:", error);
      toast.error("Error deleting product. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  const openDeletePopup = (compoundId) => {
    setCompoundToDelete(compoundId);
    setShowPopup(true);
  };

  const closeDeletePopup = () => {
    setShowPopup(false);
    setCompoundToDelete(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link prefetch={true} href="/dashpoard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Img</td>
            <td>Title</td>
            <td>Location</td>
            <td>Status</td>
            <td>Created At</td>
            <td>Updated At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.noData}>
                No data available
              </td>
            </tr>
          ) : (
            paginatedProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="test-for-image w-full">
                  <div className={styles.product}>
                    <Image
                      src={product.mainImage || "/noproduct.jpg"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className={styles.productImage }
                   
                    />
                  </div>
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.location}</td>
                <td>{product.status}</td>
                <td>{trimText(product.createdAt)}</td>
                <td>{trimText(product.updatedAt)}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link
                      prefetch={true}
                      href={`/dashpoard/products/${product._id}`}
                    >
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => openDeletePopup(product._id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* الترقيم اليدوي */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.button}
          >
            Previous
          </button>
        </div>
        <div>
          <span className={styles.pageIndicator}>
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.button}
          >
            Next
          </button>
        </div>
      </div>

      {/* Popup تأكيد الحذف */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-400 p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold">
              Are you sure you want to delete this Compound?
            </h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeDeletePopup}
                className="bg-gray-300 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer لعرض التوست */}
      <ToastContainer />
    </div>
  );
};

export default ProductsPage;
