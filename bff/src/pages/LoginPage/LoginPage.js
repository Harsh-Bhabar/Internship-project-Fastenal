import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import { saveWishlistForUserFromLocal } from "../../services/ProductService";
import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./loginPage.module.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isInputValid()) return;
    if (await checkUserValidity()) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("isLoggedIn", true);
      await saveWishlistForUserFromLocal(userName);
      toggleToastNotification(
        "Logged in successfully!",
        "login-success-id",
        "success"
      );
      navigate("/");
    } else {
      setErrorMessage("Invalid UserName or password! Try again!");
      setErrorField(2);
    }
  };

  const checkUserValidity = async () => {
    const userBaseUrl = process.env.REACT_APP_USER_BACKEND_BASE_URL;
    const response = await axios
      .post(`${userBaseUrl}/verify-password/${userName}`, {
        password,
      })
      .catch((error) => console.error(error));
    if (response === undefined) {
      setErrorMessage("Invalid UserName or password! Try again!");
      setErrorField(2);
      return false;
    }
    const responseData = response.data.content;
    return responseData.isUserPasswordValid;
  };

  // Add validation checks for password
  const isInputValid = () => {
    const isUserNameValid = userName.length !== 0;
    const isPasswordValid = password.length !== 0;
    if (!isUserNameValid && !isPasswordValid) {
      setErrorMessage("UserName & password cannot be empty!");
      setErrorField(2);
    } else {
      if (!isUserNameValid) {
        setErrorMessage("UserName cannot be empty!");
        setErrorField(0);
      } else if (!isPasswordValid) {
        setErrorMessage("Password cannot be empty!");
        setErrorField(1);
      } else setErrorMessage("");
    }
    return isUserNameValid && isPasswordValid;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    if (
      localStorage.getItem("userName") &&
      localStorage.getItem("isLoggedIn")
    ) {
      navigate("/shop");
      toggleToastNotification("Already logged in!", "already-logged-id");
    }
  }, []);

  return (
    <section className={styles.loginSection}>
      <TheNavbar />
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h2 className={styles.heading}>Log in</h2>
          <p className={styles.topMessage}>Welcome back!</p>
          <p className={styles.errorMessage}>{errorMessage}</p>
          {/* <p className="account-message">
          Did you
          <Link to="/register" className="link"> forget your password?</Link>
        </p> */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className={`${
                errorField === 0 || errorField === 2
                  ? styles.errorField
                  : styles.inputGroupInput
              }`}
            />
            <span className={styles.bar}></span>
            <label>UserName</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              className={`${
                errorField === 1 || errorField === 2
                  ? styles.errorField
                  : styles.inputGroupInput
              }`}
            />
            <span className={styles.bar}></span>
            <label>Password</label>
          </div>
          <button
            className={styles.loginBtn}
            type="button"
            onClick={handleSubmit}
          >
            Log in
          </button>
          <p className={styles.accountMessage}>
            Don't have an account?
            <Link to="/register" className={styles.link}>
              {" "}
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
