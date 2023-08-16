import axios, { HttpStatusCode } from "axios";
import React, { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./ordersTable.module.css";

export default function OrdersTable(props) {
  const { orders, updateOrders } = props;
  const { userName } = useParams();
  const [orderIdToDelete, setOrderIdToDelete] = useState("");
  const navigate = useNavigate();

  const toggleModalDisplay = (idToDelete) => {
    setOrderIdToDelete(idToDelete);
    const modalId = "order-cancel-modal";
    const modal = document.getElementById(modalId);

    if (modal.style.display == "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  const handleCancelOrder = async () => {
    const ordersBaseUrl = process.env.REACT_APP_ORDERS_BACKEND_BASE_URL;
    const response = await axios
      .delete(`${ordersBaseUrl}/${orderIdToDelete}`)
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Order deleted successfully!");
      toggleModalDisplay("");
      updateOrders(orderIdToDelete);
      navigate(`/orders/${userName}`);
    }
  };

  return (
    <>
      <div className={styles.orderTable}>
        <table>
          <thead></thead>
          <tbody>
            {orders.map((order) => {
              return (
                <Fragment key={order.id}>
                  <tr>
                    <th>ORDER PLACED ON</th>
                    <th>SHIP TO</th>
                    <th>ORDER ID</th>
                    <th>TOTAL</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>{order.timeStamp}</td>
                    <td>Company Address, New City, New State</td>
                    <td>{order.id}</td>
                    <td className={styles.totalPrice}>₹{order.totalPrice}</td>
                    <td className={styles.actionBtns}>
                      <button
                        className={styles.cancelBtn}
                        type="button"
                        onClick={() => toggleModalDisplay(order.id)}
                      >
                        Cancel Order
                      </button>
                      <Link
                        to={`/order-summary/${localStorage.getItem(
                          "userName"
                        )}/${order.id}`}
                      >
                        <button className={styles.viewDetailsBtn}>
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.modal} id="order-cancel-modal">
        <div className={styles.modalContent}>
          <div className={styles.container}>
            <p className={styles.modalMainHeading}>Hey, Wait!</p>
            <p className={styles.modalSubHeading}>
              Are you sure you want to delete this order?
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
                onClick={handleCancelOrder}
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
