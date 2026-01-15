import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import CELOGO from "../assets/images/CELOGO.png";
import { loginApi } from "../api/Auth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resizing for responsive design
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(formData.username, formData.password);

      login({
        token: res.token,
        user: res.user,
        company: res.company,
      });

      navigate("/home");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  // Styles Object
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "24px 16px" : "20px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      maxWidth: "900px",
      backgroundColor: "#141414",
      borderRadius: isMobile ? "20px" : "15px",
      overflow: "hidden",
      border: "1px solid #333",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
    },
    leftSide: {
      flex: 1,
      backgroundColor: "#4a3439",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "48px 24px" : "60px 40px",
    },
    rightSide: {
      flex: 1,
      padding: isMobile ? "48px 32px" : "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    logo: {
      width: isMobile ? "200px" : "180px",
      marginBottom: isMobile ? "24px" : "20px",
    },
    brandName: {
      color: "white",
      letterSpacing: "8px",
      fontSize: isMobile ? "28px" : "24px",
      fontWeight: "300",
      margin: 0,
      textAlign: "center",
    },
    brandSub: {
      color: "#ccc",
      fontSize: isMobile ? "12px" : "10px",
      letterSpacing: "4px",
      textTransform: "uppercase",
      marginTop: "5px",
      textAlign: "center",
    },
    title: {
      color: "white",
      fontSize: isMobile ? "22px" : "18px",
      fontWeight: "bold",
      marginBottom: isMobile ? "48px" : "40px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    inputGroup: {
      marginBottom: isMobile ? "32px" : "25px",
    },
    label: {
      display: "block",
      color: "#888",
      fontSize: isMobile ? "15px" : "12px",
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: isMobile ? "12px" : "8px",
    },
    input: {
      width: "100%",
      backgroundColor: "#1c1c1c",
      color: "white",
      border: "1px solid #333",
      borderRadius: isMobile ? "10px" : "6px",
      padding: isMobile ? "16px 18px" : "12px 15px",
      fontSize: isMobile ? "16px" : "14px",
      outline: "none",
      boxSizing: "border-box",
      minHeight: isMobile ? "48px" : "auto",
    },
    passwordContainer: {
      position: "relative",
    },
    eyeIcon: {
      position: "absolute",
      right: isMobile ? "18px" : "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
      cursor: "pointer",
      fontSize: isMobile ? "24px" : "20px",
      display: "flex",
      alignItems: "center",
      minWidth: isMobile ? "32px" : "auto",
      minHeight: isMobile ? "32px" : "auto",
    },
    button: {
      marginTop: isMobile ? "16px" : "10px",
      padding: isMobile ? "16px 48px" : "12px 40px",
      backgroundColor: "transparent",
      color: "white",
      border: "1px solid white",
      borderRadius: isMobile ? "8px" : "4px",
      cursor: "pointer",
      fontSize: isMobile ? "15px" : "12px",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: "all 0.3s ease",
      minHeight: isMobile ? "48px" : "auto",
      width: isMobile ? "100%" : "auto",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* LEFT SECTION */}
        <div style={styles.leftSide}>
          <img src={CELOGO} alt="Crown Logo" style={styles.logo} />
          <h1 style={styles.brandName}>CROWN</h1>
          <p style={styles.brandSub}>Home Elevator</p>
        </div>

        {/* RIGHT SECTION */}
        <div style={styles.rightSide}>
          <h2 style={styles.title}>Login to your account</h2>

          {/* FIX 1: Move handleSubmit to the form tag */}
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile / Email</label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your registered mobile/email"
                style={styles.input}
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={passwordShow ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  {passwordShow ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>

            {/* FIX 2: type="submit" triggers the form's onSubmit */}
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
