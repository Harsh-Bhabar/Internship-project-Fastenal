import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import { saveWishlistForUserFromLocal } from "../../services/ProductService";

import styles from "./registerPage.module.css";

export default function RegisterPage() {
  const [userDetails, setUserDetails] = useState({
    emailId: "",
    password: "",
    name: "",
    userName: "",
    dateOfBirth: "",
    phoneNumber: "",
    userType: "customer",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterUser = async () => {
    if (!isInputValid()) return;

    if (await registerUser()) {
      localStorage.setItem("userName", userDetails.userName);
      localStorage.setItem("isLoggedIn", true);
      await saveWishlistForUserFromLocal(userDetails.userName);
      navigate("/shop");
    } else {
      setErrorMessage("Unable to register! Try again!");
    }
  };

  const isInputValid = () => {
    const isEmailIdValid = userDetails.emailId.length !== 0;
    const isPasswordValid = userDetails.password.length !== 0;
    const isNameValid = userDetails.name.length !== 0;
    const isUserNameValid = userDetails.userName.length !== 0;
    const isDateOfBirthValid = userDetails.dateOfBirth.length !== 0;
    const isPhoneNumberValid = userDetails.phoneNumber.length !== 0;
    const isUserTypeValid = userDetails.userType.length !== 0;
    const isValid =
      isEmailIdValid &&
      isPasswordValid &&
      isNameValid &&
      isUserNameValid &&
      isDateOfBirthValid &&
      isPhoneNumberValid &&
      isUserTypeValid;
    if (!isValid) setErrorMessage("Check input details!");
    else setErrorMessage("");

    return isValid;
  };

  const registerUser = async () => {
    const userBaseUrl = process.env.REACT_APP_USER_BACKEND_BASE_URL;
    const response = await axios
      .post(`${userBaseUrl}`, userDetails)
      .catch((error) => console.error(error));
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) return true;
    return false;
  };

  return (
    <section className={styles.registerSection}>
      <TheNavbar />
      <div className={styles.registerPage}>
        <div className={styles.registerCard}>
          <h2 className={styles.heading}>Register Account</h2>
          <p className={styles.topMessage}>Welcome! Register to get started</p>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={userDetails.emailId}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  emailId: e.target.value,
                })
              }
              required
            />
            <span className={styles.bar}></span>
            <label>Email Id</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  password: e.target.value,
                })
              }
              required
            />
            <span className={styles.bar}></span>
            <label>Password</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  name: e.target.value,
                })
              }
              required
            />
            <span className={styles.bar}></span>
            <label>Name</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={userDetails.userName}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  userName: e.target.value,
                })
              }
              required
            />
            <span className={styles.bar}></span>
            <label>UserName</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={userDetails.dateOfBirth}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  dateOfBirth: e.target.value,
                })
              }
              required
            />
            <span className={styles.bar}></span>
            <label>Date of Birth (YYYY-MM-dd)</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={userDetails.phoneNumber}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  phoneNumber: e.target.value,
                })
              }
              required
            />
            <span className={styles.bar}></span>
            <label>Phone Number</label>
          </div>
          <button
            className={styles.registerBtn}
            type="button"
            onClick={handleRegisterUser}
          >
            Register
          </button>
          <p className={styles.accountMessage}>
            Already have an account?
            <Link to="/login" className={styles.link}>
              {" "}
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
