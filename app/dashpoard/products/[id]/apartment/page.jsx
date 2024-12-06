"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import styles from "@/app/ui/dashpoard/products/singleproduct/apartment/apartment.module.css";
import Search from "@/app/ui/dashpoard/search/Search";

const ApartmentPage = () => {
  const { id } = useParams();
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // عدد العناصر التي سيتم عرضها في كل صفحة

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch apartments
  useEffect(() => {
    axios
      .get(`${apiUrl}/apartment/${id}`)
      .then((res) => {
        setApartments(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [id, apiUrl]);

  // Delete function
  const handleDelete = useCallback(async () => {
    try {
      await axios.delete(`${apiUrl}/apartment/delete/${apartmentToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setApartments((prev) =>
        prev.filter((apt) => apt._id !== apartmentToDelete)
      );
      setShowPopup(false);
      toast.success("Apartment deleted successfully!");
    } catch (error) {
      console.error("Error deleting apartment:", error);
      toast.error("Failed to delete apartment.");
    }
  }, [apiUrl, apartmentToDelete]);

  // Truncate long text
  const truncateText = (text, maxLength = 50) =>
    text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  // Popup handlers
  const openDeletePopup = (apartmentId) => {
    setApartmentToDelete(apartmentId);
    setShowPopup(true);
  };

  const closeDeletePopup = () => {
    setShowPopup(false);
    setApartmentToDelete(null);
  };

  // Pagination logic
  const indexOfLastApartment = currentPage * itemsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - itemsPerPage;
  const currentApartments = apartments.slice(
    indexOfFirstApartment,
    indexOfLastApartment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Calculate total pages
  const totalPages = Math.ceil(apartments.length / itemsPerPage);

  return (
    <>
      <Head>
        <title>Apartment List</title>
        <meta
          name="description"
          content="Manage apartments and their details."
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a product..." />
          <Link
            prefetch={true}
            href={`/dashpoard/products/${id}/apartment/add`}
          >
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <table className="w-full border-collapse border border-gray-300 mt-5">
          <thead className="bg-gray-600">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Img</th>
              <th className="border border-gray-300 px-4 py-2">Identity</th>
              <th className="border border-gray-300 px-4 py-2">Rooms</th>
              <th className="border border-gray-300 px-4 py-2">Space</th>
              <th className="border border-gray-300 px-4 py-2">Bathrooms</th>
              {/* <th className="border border-gray-300 px-4 py-2">Description</th> */}
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentApartments.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.noData}>
                  No Apartment available
                </td>
              </tr>
            ) : (
              currentApartments.map((apartment) => (
                <tr key={apartment._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <Image
                      src={apartment.mainImage || "/noproduct.jpg"}
                      alt="ApartmentImg"
                      width={100}
                      height={100}
                      className="w-full h-full "
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apartment.identity || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apartment.rooms || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apartment.space || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {apartment.bathrooms || 0}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">
                    {truncateText("inside...")}
                  </td> */}
                  <td className="border border-gray-300 px-4 py-2">
                    {apartment.status || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className={styles.buttons}>
                      <Link
                        prefetch={true}
                        href={`/dashpoard/products/${id}/apartment/${apartment._id}`}
                      >
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => openDeletePopup(apartment._id)}
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

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-black p-6 rounded shadow-lg">
              <h3 className="text-lg font-bold text-white">
                Are you sure you want to delete this Apartment?
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
      </div>
      {/* ToastContainer لعرض التوست */}
      <ToastContainer />
    </>
  );
};

export default ApartmentPage;
