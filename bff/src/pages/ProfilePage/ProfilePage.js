import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TheNavbar from "../../components/TheNavbar/TheNavbar";
import TheFooter from "../../components/TheFooter/TheFooter";

import styles from "./profilePage.module.css";
import axios, { HttpStatusCode } from "axios";
import SaveIcon from "../../icons/SaveIcon";
import { toggleToastNotification } from "../../services/ToggleToast";
import InternalServerIllustrationSmall from "../../components/InternalServerIllustrationSmall/InternalServerIllustrationSmall";
import Loader from "../../components/Loader/Loader";

const defaultUserState = {
  name: "",
  userName: "",
  userType: "",
  emailId: "",
  password: "",
  dateOfBirth: "",
  phoneNumber: "",
  age: "",
  profilePicUrl: "",
  address: "",
};

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState(defaultUserState);
  const [updatedUserDetails, setUpdatedUserDetails] =
    useState(defaultUserState);
  const [updatedPassword, setUpdatedPassword] = useState({
    password: "",
    confirmedPassword: "",
  });
  const { userName } = useParams();
  const [activeTab, setActiveTab] = useState(-1);
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleUpdateProfile = () => {
    let newUserDetails = { ...updatedUserDetails };
    for (const key in newUserDetails) {
      if (newUserDetails[key] === "") delete newUserDetails[key];
    }
    delete newUserDetails.age;
    delete newUserDetails.password;
    delete newUserDetails.userName;
    delete newUserDetails.userType;
    delete newUserDetails.emailId;
    if (updateUserDetails(newUserDetails)) {
      toggleToastNotification("User details updated successfully!");
      setUpdatedUserDetails(defaultUserState);
      getUserDetails(userName);
    } else {
      toggleToastNotification("Error updating user details!");
    }
  };

  const handleUpdatePassword = () => {
    if (
      updatedPassword.password.length !== 0 &&
      updatedPassword.password === updatedPassword.confirmedPassword
    ) {
      if (updateUserDetails({ password: updatedPassword.password })) {
        toggleToastNotification("Password updated successfully!");
        setUpdatedPassword({ password: "", confirmedPassword: "" });
      } else {
        toggleToastNotification("Error updating password!");
      }
    } else {
      toggleToastNotification("Invalid password fields!");
    }
  };

  const updateUserDetails = async (requestBody) => {
    const userBaseUrl = process.env.REACT_APP_USER_BACKEND_BASE_URL;
    const response = await axios
      .put(`${userBaseUrl}/${userName}`, requestBody)
      .catch((error) => console.error(error));
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getUserDetails(userName);
  }, []);

  return (
    <>
      <TheNavbar />
      <div className={styles.profilePage}>
        <div className={styles.profileHeader}>
          <h1 className={styles.mainHeading}>My Profile</h1>
          <div className={styles.actionBtns}>
            <Link to={`/orders/${userName}`}>
              <button className={styles.actionBtn} type="button">
                Orders
              </button>
            </Link>
            <Link to={`/wishlist/${userName}`}>
              <button className={styles.actionBtn} type="button">
                Wishlist
              </button>
            </Link>
            <Link to={`/cart/${userName}`}>
              <button className={styles.actionBtn} type="button">
                Cart
              </button>
            </Link>
          </div>
        </div>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : showInternalError ? (
          <InternalServerIllustrationSmall />
        ) : (
          <div className={styles.profileDetailsContainer}>
            <div className={styles.profilePicContainer}>
              <img src={userDetails.profilePicUrl} alt={userName} />
            </div>
            <div className={styles.profileDetails}>
              <h1 className={styles.mainHeading}>{userDetails.name}</h1>
              <p className={styles.userName}>@userName</p>
              <div className={styles.contact}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 0H4C1.8 0 0 1.8 0 4V14C0 16.2 1.8 18 4 18H20C22.2 18 24 16.2 24 14V4C24 1.8 22.2 0 20 0ZM21.6 5.8L13.7 11.1C13.2 11.4 12.6 11.6 12 11.6C11.4 11.6 10.8 11.4 10.3 11.1L2.4 5.8C2 5.5 1.9 4.9 2.2 4.4C2.5 4 3.1 3.9 3.6 4.2L11.5 9.5C11.8 9.7 12.3 9.7 12.6 9.5L20.5 4.2C21 3.9 21.6 4 21.9 4.5C22.1 4.9 22 5.5 21.6 5.8Z"
                    fill="var(--primary-color)"
                  />
                </svg>
                <p className={styles.link}>
                  <a>{userDetails.emailId}</a>
                </p>
              </div>
              <div className={styles.contact}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 0C4.02984 0 0 4.02963 0 8.99952C0 12.6279 1.26422 13.6413 8.07656 23.5159C8.52333 24.1614 9.47859 24.1614 9.92531 23.5159C16.7344 13.6399 18 12.6274 18 8.99952C18 4.02963 13.9688 0 9 0ZM9 12.7071C6.93141 12.7071 5.25 11.0253 5.25 8.95733C5.25 6.88932 6.93281 5.20753 9 5.20753C11.0672 5.20753 12.75 6.88932 12.75 8.95733C12.75 11.0253 11.0672 12.7071 9 12.7071Z"
                    fill="var(--primary-color)"
                  />
                </svg>

                <p className={styles.link}>{userDetails.address}</p>
              </div>
              <div className={styles.contact}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0868 14.5114C18.2574 13.6591 15.8998 12.0625 14.3545 12.0625C13.9966 12.0625 13.6841 12.142 13.4285 12.3068C12.6729 12.7898 12.0707 13.1648 11.781 13.1648C11.6219 13.1648 11.4515 13.0227 11.0765 12.6989L11.014 12.642C9.97441 11.7386 9.75285 11.5057 9.34949 11.0852L9.24723 10.9773C9.17338 10.9034 9.11089 10.8352 9.0484 10.7727C8.69617 10.4091 8.44052 10.1477 7.53723 9.125L7.49746 9.07955C7.0657 8.59091 6.78165 8.27273 6.76461 8.03977C6.74756 7.8125 6.9464 7.44318 7.45202 6.75568C8.06557 5.92614 8.0883 4.90341 7.52587 3.71591C7.07706 2.77841 6.34421 1.88068 5.69656 1.09091L5.63975 1.02273C5.08301 0.340909 4.43537 0 3.71387 0C2.91284 0 2.24816 0.431818 1.89593 0.659091C1.86752 0.676136 1.83912 0.698864 1.81071 0.715909C1.02104 1.21591 0.447256 1.90341 0.231376 2.60227C-0.0924454 3.65341 -0.308326 5.01705 1.24261 7.85227C2.58334 10.3068 3.79909 11.9545 5.73065 13.9375C7.54859 15.8011 8.35531 16.4034 10.1619 17.7102C12.173 19.1648 14.1045 20 15.4566 20C16.7122 20 17.7007 20 19.1096 18.3011C20.5866 16.517 19.9731 15.4261 19.0868 14.5114Z"
                    fill="var(--primary-color)"
                  />
                </svg>

                <p className={styles.link}>{userDetails.phoneNumber}</p>
              </div>
            </div>
          </div>
        )}
        <div className={styles.updateContainer}>
          <div className={styles.tab}>
            <button
              className={`${styles.tabLinks} ${
                activeTab === 0 && styles.active
              }`}
              onClick={() => setActiveTab(0)}
            >
              Update Profile
            </button>
            <button
              className={`${styles.tabLinks} ${
                activeTab === 1 && styles.active
              }`}
              onClick={() => setActiveTab(1)}
            >
              Update Password
            </button>
          </div>
          {activeTab === 0 && (
            <div className={styles.tabContent}>
              <div className={styles.contentHeader}>
                <h2 className={styles.tabContentHeading}>Update Profile</h2>
                <button
                  className={styles.saveBtn}
                  onClick={handleUpdateProfile}
                >
                  <SaveIcon />
                  Save changes
                </button>
              </div>
              <div className={styles.form}>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>
                        <input
                          type="text"
                          value={updatedUserDetails.name}
                          placeholder="Name"
                          onChange={(e) =>
                            setUpdatedUserDetails((prevDetails) => ({
                              ...prevDetails,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Date of Birth</td>
                      <td>
                        <input
                          type="text"
                          value={updatedUserDetails.dateOfBirth}
                          placeholder="YYYY-MM-dd"
                          onChange={(e) =>
                            setUpdatedUserDetails((prevDetails) => ({
                              ...prevDetails,
                              dateOfBirth: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>
                        <input
                          type="text"
                          value={updatedUserDetails.phoneNumber}
                          placeholder="Phone Number"
                          onChange={(e) =>
                            setUpdatedUserDetails((prevDetails) => ({
                              ...prevDetails,
                              phoneNumber: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Profile Pic URL</td>
                      <td>
                        <input
                          type="text"
                          value={updatedUserDetails.profilePicUrl}
                          placeholder="URL"
                          onChange={(e) =>
                            setUpdatedUserDetails((prevDetails) => ({
                              ...prevDetails,
                              profilePicUrl: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                        <input
                          type="text"
                          value={updatedUserDetails.address}
                          placeholder="Address"
                          onChange={(e) =>
                            setUpdatedUserDetails((prevDetails) => ({
                              ...prevDetails,
                              address: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className={styles.tabContent}>
              <div className={styles.contentHeader}>
                <h2 className={styles.tabContentHeading}>Update Password</h2>
                <button
                  className={styles.saveBtn}
                  onClick={handleUpdatePassword}
                >
                  <SaveIcon />
                  Update password
                </button>
              </div>
              <div className={styles.form}>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>New Password</td>
                      <td>
                        <input
                          type="password"
                          value={updatedPassword.password}
                          placeholder="Password"
                          onChange={(e) =>
                            setUpdatedPassword((prevDetails) => ({
                              ...prevDetails,
                              password: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Confirm New Password</td>
                      <td>
                        <input
                          type="password"
                          value={updatedPassword.confirmedPassword}
                          placeholder="Password"
                          onChange={(e) =>
                            setUpdatedPassword((prevDetails) => ({
                              ...prevDetails,
                              confirmedPassword: e.target.value,
                            }))
                          }
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}
