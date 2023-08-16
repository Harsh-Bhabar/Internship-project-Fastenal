import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import TheNavbar from "../../components/TheNavbar/TheNavbar";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

import { isUserVerified } from "../../services/VerifyUser";

import styles from "./ordersPage.module.css";
import { toggleToastNotification } from "../../services/ToggleToast";
import TheFooter from "../../components/TheFooter/TheFooter";
import InternalErrorIllustration from "../../components/InternalErrorIllustration/InternalErrorIllustration";
import Loader from "../../components/Loader/Loader";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isAscSorted, setIsAscSorted] = useState(true);
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();

  const getOrdersForUser = async (userName, sortOrder) => {
    setLoading(true);
    const ordersBaseUrl = process.env.REACT_APP_ORDERS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${ordersBaseUrl}/sort-by-time/${userName}/${sortOrder}`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    const orders = response.data.content;
    setOrders(orders);
  };

  const toggleSortByDate = () => {
    let sortOrder = "";
    if (isAscSorted) {
      getOrdersForUser(userName, "desc");
      sortOrder = "descending";
    } else {
      getOrdersForUser(userName, "asc");
      sortOrder = "ascending";
    }
    toggleToastNotification(`Orders sorted in ${sortOrder} order!`);
    setIsAscSorted(!isAscSorted);
  };

  const updateOrders = (orderIdToRemove) => {
    setOrders(orders.filter((order) => order.id !== orderIdToRemove));
  };

  useEffect(() => {
    const isUserLoggedIn = isUserVerified(userName);
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    getOrdersForUser(userName, "asc");
  }, []);

  return (
    <>
      <TheNavbar />
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : showInternalError ? (
        <InternalErrorIllustration />
      ) : orders.length === 0 ? (
        <div className={styles.emptyOrdersPage}>
          <h1 className={styles.emptyOrdersPageHeading}>Orders</h1>
          <svg
            width="180"
            height="250"
            viewBox="0 0 218 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 150.142V57.8584C4.00837 56.5254 4.42734 55.2178 5.21465 54.0676C6.00196 52.9174 7.12978 51.9651 8.48438 51.3068L104.734 4.97805C106.031 4.33732 107.502 4 109 4C110.498 4 111.969 4.33732 113.266 4.97805L209.516 51.3068C210.87 51.9651 211.998 52.9174 212.785 54.0676C213.573 55.2178 213.992 56.5254 214 57.8584V150.142C213.992 151.475 213.573 152.782 212.785 153.932C211.998 155.083 210.87 156.035 209.516 156.693L113.266 203.022C111.969 203.663 110.498 204 109 204C107.502 204 106.031 203.663 104.734 203.022L8.48438 156.693C7.12978 156.035 6.00196 155.083 5.21465 153.932C4.42734 152.782 4.00837 151.475 4 150.142Z"
              fill="white"
              stroke="#979797"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M55 127V78.2038L162 28"
              stroke="#979797"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.99999 54L108.014 104L213 54"
              stroke="#979797"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M108 104L109 204"
              stroke="#979797"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="145.869"
              cy="123.869"
              r="6"
              transform="rotate(-23.0219 145.869 123.869)"
              fill="#979797"
            />
            <path
              d="M175.665 145.126C174.462 142.295 169.572 141.663 164.743 143.715C159.914 145.767 156.975 149.726 158.178 152.557C159.023 154.546 160.946 153.072 163.24 150.691C165.23 148.627 167.941 147.475 170.808 147.475C174.115 147.476 176.51 147.115 175.665 145.126Z"
              fill="#979797"
            />
            <circle
              cx="177.869"
              cy="108.869"
              r="6"
              transform="rotate(-23.0219 177.869 108.869)"
              fill="#979797"
            />
            <ellipse cx="109.5" cy="248" rx="79.5" ry="12" fill="#EDEDED" />
          </svg>

          <h2 className={styles.emptyOrdersPageSubheading}>
            You haven't placed any orders yet.
          </h2>
          <p className={styles.description}>
            When you do, their status will appear here.
          </p>
          <Link to="/shop">
            <button
              className={styles.emptyOrdersPageContinueShoppingBtn}
              type="button"
            >
              <svg
                width="20"
                height="8"
                viewBox="0 0 20 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 3.67065L18.3076 3.81065"
                  stroke="var(--primary-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 3.67065L3.62943 6.3845"
                  stroke="var(--primary-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 3.67077L3.69599 1"
                  stroke="var(--primary-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.mainHeading}>My Orders</h1>
            <button
              className={styles.sortBtn}
              type="button"
              onClick={toggleSortByDate}
            >
              Sort by: <span>Date</span>
              {isAscSorted ? (
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.67065 1L3.81065 15"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.67065 1L6.3845 3.12692"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.67077 1L1 3.18077"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.67065 15L3.81065 0.999999"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.67065 15L6.3845 12.8731"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.67077 15L1 12.8192"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className={styles.orderItems}>
            <OrdersTable orders={orders} updateOrders={updateOrders} />
          </div>
        </div>
      )}
      <TheFooter />
    </>
  );
}
