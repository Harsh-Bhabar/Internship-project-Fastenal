import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import NextIcon from "../../icons/NextIcon";
import PreviousIcon from "../../icons/PreviousIcon";
import { toggleToastNotification } from "../../services/ToggleToast";
import InternalServerIllustrationSmall from "../InternalServerIllustrationSmall/InternalServerIllustrationSmall";
import Loader from "../Loader/Loader";

import styles from "./usersTable.module.css";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [userNameToDelete, setUserNameToDelete] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModalDisplay = (userName) => {
    if (isUserToDeleteAdmin(userName)) {
      toggleToastNotification(
        "Cannot delete logged in user!",
        "admin-logged-id",
        "error"
      );
      return;
    }
    setUserNameToDelete(userName);
    const modalId = "user-delete-modal";
    const modal = document.getElementById(modalId);

    if (modal.style.display == "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  const isUserToDeleteAdmin = (userName) => {
    return localStorage.getItem("userName") === userName;
  };

  const handleDeleteUser = async () => {
    const userBaseUrl = process.env.REACT_APP_USER_BACKEND_BASE_URL;
    const response = await axios
      .delete(`${userBaseUrl}/${userNameToDelete}`)
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("User deleted successfully!");
      toggleModalDisplay("");
      getAllUsers();
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    const userBaseUrl = process.env.REACT_APP_USER_BACKEND_BASE_URL;
    const response = await axios.get(`${userBaseUrl}/all`).catch((error) => {
      setLoading(false);
      setShowInternalError(true);
      console.error(error);
    });
    setLoading(false);
    setUsers(response.data.content);
    updatePageDetails(response.data.content);
  };

  const updatePageDetails = (items) => {
    let pages = Math.ceil(items.length / 10);
    setTotalPages(pages);
  };

  const togglePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const toggleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className={styles.usersTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>userName</th>
              <th>Email ID</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loader />}
            {showInternalError && <InternalServerIllustrationSmall />}
            {users.map((user, index) => {
              return (
                Math.ceil((index + 1) / 10) === currentPage && (
                  <tr key={user.userName}>
                    <td>{user.name}</td>
                    <td>{user.userName}</td>
                    <td>{user.emailId}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.age}</td>
                    <td>
                      <div className={styles.actionBtns}>
                        <div
                          className={styles.deleteBtn}
                          onClick={() => toggleModalDisplay(user.userName)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
        <div className={`${styles.pageActionBtns} disableUserSelect`}>
          <button
            className={`${styles.prevBtn} ${
              currentPage === 1 && styles.disabledBtn
            }`}
            onClick={togglePreviousPage}
          >
            <PreviousIcon />
            Prev
          </button>
          <span className={styles.currentPage}>
            {currentPage > 9 ? currentPage : `0${currentPage}`} /{" "}
            {totalPages > 9 ? totalPages : `0${totalPages}`}
          </span>
          <button
            className={`${styles.nextBtn} ${
              currentPage === totalPages && styles.disabledBtn
            }`}
            onClick={toggleNextPage}
          >
            Next
            <NextIcon />
          </button>
        </div>
      </div>
      <div className={styles.modal} id="user-delete-modal">
        <div className={styles.modalContent}>
          <div className={styles.container}>
            <p className={styles.modalMainHeading}>Hey, Wait!</p>
            <p className={styles.modalSubHeading}>
              Are you sure you want to delete this user?{" "}
              <span>This action is irreversible.</span>
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
                onClick={handleDeleteUser}
                className={styles.modalDeleteBtn}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
