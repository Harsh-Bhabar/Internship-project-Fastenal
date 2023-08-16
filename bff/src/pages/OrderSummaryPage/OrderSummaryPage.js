import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import { isUserVerified } from "../../services/VerifyUser";
import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./orderSummaryPage.module.css";
import _ from "underscore";
import TheFooter from "../../components/TheFooter/TheFooter";
import InternalServerIllustrationSmall from "../../components/InternalServerIllustrationSmall/InternalServerIllustrationSmall";

export default function OrderSummaryPage() {
  const [orderSummary, setOrderSummary] = useState({
    id: "",
    userName: "",
    address: {
      locality: "",
      city: "",
      state: "",
      country: "",
    },
    timeStamp: "",
    totalPrice: 0,
    orderItems: [],
  });

  const [products, setProducts] = useState([]);
  const [showInternalError, setShowInternalError] = useState(false);
  const { userName, orderId } = useParams();
  const [orderIdToDelete, setOrderIdToDelete] = useState("");
  const navigate = useNavigate();

  const getProductBySku = async (orderItem) => {
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/${orderItem.productSku}`)
      .catch((error) => {
        setShowInternalError(true);
        console.error(error);
      });
    const newProduct = {
      ...response.data.content,
      quantity: orderItem.quantity,
    };
    if (_.findWhere(products, newProduct) == null) {
      setProducts([...products, newProduct]);
    }
  };

  const getOrderSummary = async () => {
    const ordersBaseUrl = process.env.REACT_APP_ORDERS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${ordersBaseUrl}/order-id/${orderId}`)
      .catch((error) => {
        setShowInternalError(true);
        console.error(error);
      });
    const responseData = response.data.content;
    const orderItems = responseData.orderItems;
    orderItems.forEach((orderItem) => {
      getProductBySku(orderItem);
    });
    setOrderSummary(responseData);
  };

  const toggleModalDisplay = (idToDelete) => {
    setOrderIdToDelete(idToDelete);
    const modalId = "order-cancel-summary-modal";
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
      navigate(`/orders/${userName}`);
    }
  };

  useEffect(() => {
    const isUserLoggedIn = isUserVerified(userName);
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    getOrderSummary(orderId);
  }, [products]);

  return (
    <>
      <TheNavbar />
      <div className={styles.content}>
        <h1 className={styles.mainHeading}>Order Summary</h1>
        <div className={styles.orderSummary}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <th>ORDER ID</th>
                <th>USERNAME</th>
                <th>SHIP TO</th>
                <th>ORDER PLACED ON</th>
                <th></th>
              </tr>
              <tr>
                <td>{orderSummary.id}</td>
                <td>{orderSummary.userName}</td>
                <td>
                  {orderSummary.address?.locality}, {orderSummary.address?.city}
                  , {orderSummary.address?.state},{" "}
                  {orderSummary.address?.country}
                </td>
                <td>{orderSummary.timeStamp}</td>
                <td className={styles.actionBtn}>
                  <button
                    className={styles.cancelBtn}
                    type="button"
                    onClick={() => toggleModalDisplay(orderSummary.id)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p className={styles.orderItemsHeading}>Order Items</p>

          <div className={styles.ordersTable}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Brand</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price (1 Unit)</th>
                </tr>
              </thead>
              <tbody>
                {showInternalError && <InternalServerIllustrationSmall />}
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <Link to={`/product/${product.sku}`}>
                        <img src={product.imageUrl} />
                      </Link>
                    </td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/product/${product.sku}`}>{product.name}</Link>
                    </td>
                    <td>{product.quantity}</td>
                    <td>₹ {product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.total}>
            Total: <span>₹{orderSummary.totalPrice}</span>
          </div>
        </div>
      </div>
      <div className={styles.modal} id="order-cancel-summary-modal">
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
      <TheFooter />
    </>
  );
}
