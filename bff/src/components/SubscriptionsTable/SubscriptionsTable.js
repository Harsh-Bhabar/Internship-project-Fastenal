import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import NextIcon from "../../icons/NextIcon";
import PreviousIcon from "../../icons/PreviousIcon";
import { toggleToastNotification } from "../../services/ToggleToast";
import InternalServerIllustrationSmall from "../InternalServerIllustrationSmall/InternalServerIllustrationSmall";
import Loader from "../Loader/Loader";

import styles from "./subscriptionsTable.module.css";

export default function SubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionIdToDelete, setSubscriptionIdToDelete] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModalDisplay = (idToDelete) => {
    setSubscriptionIdToDelete(idToDelete);
    const modalId = "subscription-delete-modal";
    const modal = document.getElementById(modalId);

    if (modal.style.display == "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  const handleDeleteSubscription = async () => {
    const newsletterBaseUrl = process.env.REACT_APP_NEWSLETTER_BACKEND_BASE_URL;

    const response = await axios
      .delete(`${newsletterBaseUrl}/${subscriptionIdToDelete}`)
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Subscription deleted successfully!");
      toggleModalDisplay("");
      getAllSubscriptions();
    }
  };

  const getAllSubscriptions = async () => {
    setLoading(true);
    const newsletterBaseUrl = process.env.REACT_APP_NEWSLETTER_BACKEND_BASE_URL;
    const response = await axios
      .get(`${newsletterBaseUrl}/all`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    setSubscriptions(response.data.content);
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
    getAllSubscriptions();
  }, []);

  return (
    <>
      <div className={styles.subscriptionsTable}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email ID</th>
              <th>Subscribed on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loader />}
            {showInternalError && <InternalServerIllustrationSmall />}
            {subscriptions.map((subscription, index) => {
              return (
                Math.ceil((index + 1) / 10) === currentPage && (
                  <tr key={subscription.id}>
                    <td>{subscription.id}</td>
                    <td>{subscription.emailId}</td>
                    <td>{subscription.subscribedTimeStamp}</td>
                    <td>
                      <div className={styles.actionBtns}>
                        <div
                          className={styles.deleteBtn}
                          onClick={() => toggleModalDisplay(subscription.id)}
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
      <div className={styles.modal} id="subscription-delete-modal">
        <div className={styles.modalContent}>
          <div className={styles.container}>
            <p className={styles.modalMainHeading}>Hey, Wait!</p>
            <p className={styles.modalSubHeading}>
              Are you sure you want to delete this subscription?{" "}
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
                onClick={handleDeleteSubscription}
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
