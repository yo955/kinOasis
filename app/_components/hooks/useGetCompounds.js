import { useState, useEffect } from "react";
import axios from "axios";

const useGetCompounds = () => {
  const [compounds, setCompounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/compound`);
        setCompounds(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { compounds, loading, error };
};

export default useGetCompounds;
