import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginIcon from "../../icons/LoginIcon";
import RegisterIcon from "../../icons/RegisterIcon";
import Logo from "../Logo/Logo";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

import SearchBar from "../SearchBar/SearchBar";

import styles from "./theNavbar.module.css";

export default function TheNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const updateLoggedInStatus = (statusToUpdate) => {
    setIsLoggedIn(statusToUpdate);
  };

  useEffect(() => {
    const isLoggedInUser =
      localStorage.getItem("userName") &&
      JSON.parse(localStorage.getItem("isLoggedIn")) === true;
    if (isLoggedInUser) {
      setIsLoggedIn(true);
    }
    if (
      window.location.href === "http://localhost:3000/" ||
      window.location.href === "http://localhost:3000"
    ) {
      document.getElementById("home-navbar").style.position = "fixed";
    }
  }, [isLoggedIn]);

  return (
    <header
      className={`${styles.header} ${
        location.pathname === "/" ? styles.headerBlur : styles.headerColored
      }`}
      id="home-navbar"
    >
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo lightTheme={true} />
          </Link>
        </div>
        <div className={styles.navRightSection}>
          <SearchBar />
          {isLoggedIn ? (
            <ProfileDropdown updateLoggedInStatus={updateLoggedInStatus} />
          ) : (
            <>
              <Link to="/login">
                <button className={styles.loginBtn}>
                  <LoginIcon />
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className={styles.registerBtn}>
                  <RegisterIcon />
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
