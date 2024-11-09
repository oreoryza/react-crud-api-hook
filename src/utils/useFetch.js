import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/students`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "RJS1-202414",
        },
      });
      setData(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // POST DATA
  const postData = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/students`, data, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "RJS1-202414",
        },
      });
      setData((prevData) => [...prevData, res.data.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE DATA
  const updateData = async (data, id) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/students/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "RJS1-202414",
        },
      });
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? res.data.data : item))
      ); // Update state with modified data
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE DATA
  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/students/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "RJS1-202414",
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // DETAIL DATA
  const detailData = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/students/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": "RJS1-202414",
        },
      });
      return res.data.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, postData, updateData, deleteData, detailData };
};

export default useFetch;
