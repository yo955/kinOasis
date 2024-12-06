"use client";
import styles from "@/app/ui/login/login.module.css";
import "@/app/ui/dashpoard-globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // New state to handle redirect
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setRedirecting(true); // Start redirecting if token is found
      router.push("/dashpoard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://real-state-liard.vercel.app/user/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        localStorage.setItem("jwt", response.data.token);
        router.push("/dashpoard");
      }
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (redirecting) {
    return <div>Loading...</div>; // Show loading screen if redirecting
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Login</h1>
        {error && <p className="text-red-500 text-xl text-center">{error}</p>}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          autoComplete="current-username"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? <div className={styles.spinner}></div> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
