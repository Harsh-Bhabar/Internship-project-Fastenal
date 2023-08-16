import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownCloseIcon from "../../icons/DropdownCloseIcon";
import DropdownOpenIcon from "../../icons/DropdownOpenIcon";
import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./profileDropdown.module.css";

export default function ProfileDropdown(props) {
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    userName: "",
    userType: "",
    emailId: "",
    dateofBirth: "",
    phoneNumber: "",
    age: "",
    profilePicUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [showInternalError, setShowInternalError] = useState(false);

  const navigate = useNavigate();
  const { updateLoggedInStatus } = props;

  const toggleModalDisplay = () => {
    const modalId = "logout-modal";
    const modal = document.getElementById(modalId);

    if (modal.style.display == "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toggleToastNotification("Logged out successfully!");
    toggleModalDisplay();
    setShowDropdown(false);
    updateLoggedInStatus(false);
    navigate("/");
  };

  const getUserDetails = async (userName) => {
    setLoading(true);
    const userBaseUrl = process.env.REACT_APP_USER_BACKEND_BASE_URL;
    const response = await axios
      .get(`${userBaseUrl}/${userName}`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    setUserDetails(response.data.content);
  };

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      setUserName(localStorage.getItem("userName"));
      getUserDetails(localStorage.getItem("userName"));
    }
  }, []);

  return (
    <>
      <div
        className={`${styles.profileBtn} disableUserSelect`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {loading ? (
          <div className={styles.loader} />
        ) : showInternalError ? (
          <p className={styles.internalErrorMessage}>Error!</p>
        ) : (
          <>
            <img
              className={styles.userProfilePic}
              src={userDetails.profilePicUrl}
              alt={userName}
            />
            Hello {userDetails.name.split(" ")[0]}!
            {showDropdown ? (
              <DropdownOpenIcon />
            ) : (
              <DropdownCloseIcon />
            )}
          </>
        )}
      </div>
      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            <Link to={`/profile/${userName}`}>
              <div className={styles.dropdownItem}>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33336 7.11106C7.63014 7.11106 6.94272 6.90253 6.35802 6.51184C5.77331 6.12116 5.31759 5.56586 5.04848 4.91617C4.77937 4.26648 4.70896 3.55159 4.84615 2.86188C4.98334 2.17218 5.32197 1.53864 5.81922 1.04139C6.31647 0.544142 6.95001 0.205511 7.63971 0.0683201C8.32942 -0.0688708 9.04432 0.00154056 9.694 0.27065C10.3437 0.53976 10.899 0.995481 11.2897 1.58018C11.6804 2.16489 11.8889 2.85231 11.8889 3.55553C11.8889 4.49852 11.5143 5.40288 10.8475 6.06967C10.1807 6.73646 9.27635 7.11106 8.33336 7.11106ZM8.33336 1.18518C7.86455 1.18518 7.40627 1.3242 7.01646 1.58465C6.62666 1.84511 6.32285 2.21531 6.14344 2.64844C5.96404 3.08156 5.91709 3.55816 6.00856 4.01796C6.10002 4.47777 6.32577 4.90012 6.65727 5.23162C6.98877 5.56312 7.41113 5.78888 7.87093 5.88034C8.33073 5.9718 8.80733 5.92486 9.24046 5.74545C9.67358 5.56604 10.0438 5.26223 10.3042 4.87243C10.5647 4.48263 10.7037 4.02434 10.7037 3.55553C10.7037 2.92687 10.454 2.32397 10.0095 1.87944C9.56493 1.43491 8.96202 1.18518 8.33336 1.18518Z"
                    fill="#9C9C9C"
                  />
                  <path
                    d="M13.0743 15.9998H3.59285C2.80703 15.9998 2.05339 15.6877 1.49773 15.132C0.942071 14.5764 0.629905 13.8227 0.629905 13.0369C0.629289 12.9662 0.64133 12.896 0.665461 12.8295C1.23494 11.3273 2.24668 10.0331 3.56708 9.11792C4.88748 8.20274 6.45442 7.7096 8.06096 7.70361H8.60614C10.2127 7.7096 11.7796 8.20274 13.1 9.11792C14.4204 10.0331 15.4322 11.3273 16.0016 12.8295C16.0258 12.896 16.0378 12.9662 16.0372 13.0369C16.0372 13.8227 15.725 14.5764 15.1694 15.132C14.6137 15.6877 13.8601 15.9998 13.0743 15.9998ZM1.81508 13.1376C1.84084 13.5915 2.03945 14.0182 2.37009 14.3301C2.70074 14.642 3.1383 14.8154 3.59285 14.8147H13.0743C13.5288 14.8154 13.9664 14.642 14.297 14.3301C14.6277 14.0182 14.8263 13.5915 14.852 13.1376C14.3533 11.8874 13.4921 10.8147 12.3791 10.0576C11.2662 9.30049 9.95222 8.89345 8.60614 8.88879H8.06096C6.71488 8.89345 5.40094 9.30049 4.28795 10.0576C3.17497 10.8147 2.3138 11.8874 1.81508 13.1376Z"
                    fill="#9C9C9C"
                  />
                </svg>
                Profile
              </div>
            </Link>
            {userDetails.userType === "admin" && (
              <Link to="/admin-dashboard/all-products">
                <div className={styles.dropdownItem}>
                  <svg
                    className={styles.icon}
                    width="20"
                    height="20"
                    viewBox="0 0 40 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 31V48H30.343L32.51 46.314C37.27 42.612 40 37.03 40 31V30.351L31.159 26.42C29.569 22.195 25.93 19.158 21.609 18.273C24.257 16.472 26 13.436 26 10C26 4.486 21.514 0 16 0C10.486 0 6 4.486 6 10C6 13.431 7.739 16.464 10.38 18.265C4.464 19.481 0 24.729 0 31ZM37.988 31.645C37.801 36.805 35.381 41.548 31.281 44.737L30 45.733L28.719 44.736C24.619 41.548 22.198 36.804 22.012 31.644L30.002 28.094L37.988 31.645ZM8 10C8 5.589 11.589 2 16 2C20.411 2 24 5.589 24 10C24 14.411 20.411 18 16 18C11.589 18 8 14.411 8 10ZM13 20H19C23.312 20 27.173 22.517 28.961 26.367L20 30.351V31C20 36.865 22.589 42.3 27.109 46H2V31C2 24.935 6.935 20 13 20Z"
                      fill="var(--black)"
                    />
                    <path
                      d="M31 32H29V35H26V37H29V40H31V37H34V35H31V32Z"
                      fill="var(--black)"
                    />
                  </svg>
                  Admin Dashboard
                </div>
              </Link>
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.dropdownContent}>
            <Link to="/">
              <div className={styles.dropdownItem}>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.71067 0.489299C7.45547 -0.163101 8.54453 -0.163101 9.28933 0.489308L15.2893 5.74494C15.7399 6.13968 16 6.7208 16 7.33311V16.3842C16 17.2766 15.3036 18 14.4444 18H11.3333C10.4742 18 9.77778 17.2766 9.77778 16.3842V11.3059C9.77778 11.1785 9.67831 11.0751 9.55556 11.0751H6.44444C6.32169 11.0751 6.22221 11.1785 6.22221 11.3059V16.3842C6.22221 17.2766 5.52578 18 4.66667 18H1.55556C0.696444 18 0 17.2766 0 16.3842V7.33311C0 6.7208 0.260044 6.13968 0.710684 5.74494L6.71067 0.489299ZM8.42978 1.54808C8.18151 1.33061 7.81849 1.33061 7.57022 1.54808L1.57023 6.80373C1.42002 6.9353 1.33333 7.12901 1.33333 7.33311V16.3842C1.33333 16.5117 1.43283 16.615 1.55556 16.615H4.66667C4.7894 16.615 4.88888 16.5117 4.88888 16.3842V11.3059C4.88888 10.4135 5.58533 9.69011 6.44444 9.69011H9.55556C10.4147 9.69011 11.1111 10.4135 11.1111 11.3059V16.3842C11.1111 16.5117 11.2106 16.615 11.3333 16.615H14.4444C14.5672 16.615 14.6667 16.5117 14.6667 16.3842V7.33311C14.6667 7.12901 14.58 6.9353 14.4298 6.80373L8.42978 1.54808Z"
                    fill="var(--black)"
                  />
                </svg>
                Home
              </div>
            </Link>
            <Link to="/shop">
              <div className={styles.dropdownItem}>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0395 14.2937L15.4932 1.64332C15.4838 0.732393 14.7359 0 13.8179 0H2.22137C1.30373 0 0.55607 0.732436 0.546627 1.64335L0.000667564 14.2966C0.00022611 14.3069 0 14.3183 0 14.3285C0 15.2495 0.751526 16 1.67528 16H14.365C15.2887 16 16.0402 15.2481 16.0402 14.327C16.0402 14.3168 16.04 14.304 16.0395 14.2937ZM14.365 14.5787H1.67528C1.53726 14.5787 1.42839 14.472 1.423 14.3382L1.96867 1.68733C1.9691 1.67708 1.96932 1.67104 1.96932 1.66083C1.96932 1.52416 2.08004 1.42127 2.22137 1.42127H13.8179C13.9596 1.42127 14.0705 1.52331 14.0705 1.65999C14.0705 1.67022 14.0708 1.67795 14.0712 1.68816L14.6172 14.3395C14.6118 14.4733 14.503 14.5787 14.365 14.5787Z"
                    fill="var(--black)"
                  />
                  <path
                    d="M10.3959 2.7627C10.003 2.7627 9.67991 3.08119 9.67991 3.47409V5.62399C9.67991 6.52973 8.93899 7.26662 8.02673 7.26662C7.11494 7.26662 6.37439 6.52973 6.37439 5.62399V3.47409C6.37439 3.08119 6.05664 2.7627 5.66376 2.7627C5.27087 2.7627 4.95312 3.08119 4.95312 3.47409V5.62399C4.95312 7.31425 6.3358 8.6894 8.03211 8.6894C9.72889 8.6894 11.1119 7.31425 11.1119 5.62399V3.47409C11.1119 3.08119 10.7888 2.7627 10.3959 2.7627Z"
                    fill="var(--black)"
                  />
                </svg>
                Shop
              </div>
            </Link>
            <Link to={`/wishlist/${userName}`}>
              <div className={styles.dropdownItem}>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2448 2.0399C14.7984 1.40536 14.201 0.887835 13.5047 0.53242C12.8083 0.177004 12.0342 -0.00551177 11.2497 0.000779101C10.6408 -0.0107034 10.0364 0.104851 9.47627 0.339828C8.91614 0.574804 8.41299 0.923866 8 1.36401C7.58655 0.924443 7.08332 0.57577 6.52329 0.340839C5.96326 0.105909 5.35908 -0.00997616 4.75033 0.000779101C3.96584 -0.00551177 3.19168 0.177004 2.49533 0.53242C1.79899 0.887835 1.2016 1.40536 0.755224 2.0399C0.300051 2.75126 0.0413179 3.56705 0.00455174 4.40678C-0.0322145 5.24652 0.154257 6.08116 0.545568 6.82838C1.13937 8.13976 1.96341 9.33801 2.97991 10.3682C4.13097 11.5558 5.3903 12.6372 6.74207 13.5987C7.10788 13.8595 7.54816 14 8 14C8.45184 14 8.89212 13.8595 9.25794 13.5987C10.61 12.6376 11.8694 11.5562 13.0201 10.3682C14.0366 9.33801 14.8606 8.13976 15.4544 6.82838C15.8457 6.08116 16.0322 5.24652 15.9954 4.40678C15.9587 3.56705 15.7 2.75126 15.2448 2.0399ZM14.476 6.42743C13.9242 7.6223 13.1678 8.71504 12.2397 9.65794C11.1336 10.7942 9.92511 11.8294 8.62897 12.751C8.44752 12.8848 8.22682 12.9572 8 12.9572C7.77318 12.9572 7.55249 12.8848 7.37103 12.751C6.07521 11.829 4.86672 10.7938 3.76029 9.65794C2.8276 8.71874 2.07057 7.62516 1.52396 6.42743C1.20674 5.83583 1.05073 5.17349 1.07114 4.50496C1.09155 3.83643 1.28769 3.1845 1.64044 2.61268C1.99088 2.12381 2.45729 1.72639 2.99921 1.4549C3.54114 1.18341 4.14222 1.04604 4.75033 1.0547C5.2451 1.03837 5.73716 1.13304 6.1892 1.33152C6.64125 1.53 7.04142 1.82709 7.35939 2.20028C7.53497 2.36552 7.76862 2.45776 8.01165 2.45776C8.25467 2.45776 8.48832 2.36552 8.66391 2.20028C8.97942 1.83018 9.37583 1.53494 9.82356 1.33658C10.2713 1.13823 10.7588 1.04187 11.2497 1.0547C11.8578 1.04604 12.4589 1.18341 13.0008 1.4549C13.5427 1.72639 14.0091 2.12381 14.3596 2.61268C14.7123 3.1845 14.9084 3.83643 14.9289 4.50496C14.9493 5.17349 14.7933 5.83583 14.476 6.42743Z"
                    fill="var(--black)"
                  />
                </svg>
                Wishlist
              </div>
            </Link>
            <Link to={`/orders/${userName}`}>
              <div className={styles.dropdownItem}>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 12.4663V5.53344C15.7495 5.4333 15.7225 5.33507 15.6719 5.24865C15.6213 5.16224 15.5488 5.0907 15.4617 5.04125L9.27422 1.56078C9.19085 1.51265 9.09627 1.4873 9 1.4873C8.90373 1.4873 8.80915 1.51265 8.72578 1.56078L2.53828 5.04125C2.4512 5.0907 2.3787 5.16224 2.32808 5.24865C2.27747 5.33507 2.25054 5.4333 2.25 5.53344V12.4663C2.25054 12.5664 2.27747 12.6646 2.32808 12.751C2.3787 12.8374 2.4512 12.909 2.53828 12.9584L8.72578 16.4389C8.80915 16.487 8.90373 16.5124 9 16.5124C9.09627 16.5124 9.19085 16.487 9.27422 16.4389L15.4617 12.9584C15.5488 12.909 15.6213 12.8374 15.6719 12.751C15.7225 12.6646 15.7495 12.5664 15.75 12.4663Z"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.4453 10.7227V7.06641L5.625 3.30469"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.6725 5.24536L9.06309 9.00005L2.32715 5.24536"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.06328 9L9 16.5094"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Orders
              </div>
            </Link>
            <Link to={`/cart/${userName}`}>
              <div className={styles.dropdownItem}>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.91795 13.9094C6.25746 13.9094 6.53268 13.6342 6.53268 13.2947C6.53268 12.9552 6.25746 12.6799 5.91795 12.6799C5.57845 12.6799 5.30322 12.9552 5.30322 13.2947C5.30322 13.6342 5.57845 13.9094 5.91795 13.9094Z"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.6802 13.9094C13.0197 13.9094 13.2949 13.6342 13.2949 13.2947C13.2949 12.9552 13.0197 12.6799 12.6802 12.6799C12.3407 12.6799 12.0654 12.9552 12.0654 13.2947C12.0654 13.6342 12.3407 13.9094 12.6802 13.9094Z"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1H3.45892L5.10639 9.23123C5.16261 9.51424 5.31657 9.76847 5.54134 9.94941C5.76611 10.1304 6.04736 10.2265 6.33585 10.2209H12.311C12.5995 10.2265 12.8808 10.1304 13.1055 9.94941C13.3303 9.76847 13.4843 9.51424 13.5405 9.23123L14.524 4.07365H4.07365"
                    stroke="var(--black)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Cart
              </div>
            </Link>
          </div>
          <div className={styles.divider} />
          <div className={styles.dropdownContent}>
            <div
              className={`${styles.dropdownItem} ${styles.logoutBtn}`}
              onClick={toggleModalDisplay}
            >
              <svg
                className={styles.icon}
                width="20"
                height="20"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.36842 12.8H3.94737V14.4H13.4211V1.6H3.94737V3.2H2.36842V0.8C2.36842 0.587827 2.4516 0.384344 2.59965 0.234315C2.74771 0.0842854 2.94851 0 3.15789 0H14.2105C14.4199 0 14.6207 0.0842854 14.7688 0.234315C14.9168 0.384344 15 0.587827 15 0.8V15.2C15 15.4122 14.9168 15.6157 14.7688 15.7657C14.6207 15.9157 14.4199 16 14.2105 16H3.15789C2.94851 16 2.74771 15.9157 2.59965 15.7657C2.4516 15.6157 2.36842 15.4122 2.36842 15.2V12.8ZM3.94737 7.2H9.47368V8.8H3.94737V11.2L0 8L3.94737 4.8V7.2Z"
                  fill="var(--black)"
                />
              </svg>
              Log Out
            </div>
          </div>
        </div>
      )}
      <div className={styles.modal} id="logout-modal">
        <div className={styles.modalContent}>
          <div className={styles.container}>
            <p className={styles.modalMainHeading}>Hey, Wait!</p>
            <p className={styles.modalSubHeading}>
              Are you sure you want to log out?
            </p>
            <div className={styles.modalActionBtns}>
              <button
                type="button"
                onClick={() => toggleModalDisplay("")}
                className={styles.modalCancelBtn}
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.modalConfirmBtn}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
