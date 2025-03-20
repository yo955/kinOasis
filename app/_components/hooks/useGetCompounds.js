import axios from "axios";
import { useState, useEffect } from "react";

const useGetCompounds = (ProductsDetails) => {
  const [compound, setCompound] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!ProductsDetails) return;
      try {
        const response = await axios.get(
          `${apiURL}/compound/find/${ProductsDetails}`
        );
        console.log(response.data);

        setCompound(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ProductsDetails]);

  return { compound, loading, error };
};

export default useGetCompounds;
