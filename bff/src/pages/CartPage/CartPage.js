import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "underscore";
import CartTable from "../../components/CartTable/CartTable";
import InternalErrorIllustration from "../../components/InternalErrorIllustration/InternalErrorIllustration";
import Loader from "../../components/Loader/Loader";
import TheFooter from "../../components/TheFooter/TheFooter";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import { toggleToastNotification } from "../../services/ToggleToast";
import { isUserVerified } from "../../services/VerifyUser";

import styles from "./cartPage.module.css";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [cartDetails, setCartDetails] = useState({
    userName: "",
    products: [],
    totalPrice: 0,
  });
  const [shippingAddress, setShippingAddress] = useState({
    locality: "",
    city: "",
    state: "",
    country: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();

  const getCartForUser = async (userName) => {
    setLoading(true);
    const cartBaseUrl = process.env.REACT_APP_CART_BACKEND_BASE_URL;
    const response = await axios
      .get(`${cartBaseUrl}/${userName}`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    const cart = response.data.content;
    setCartDetails(cart);
    cart.products.forEach((orderItem) => {
      getProductBySku(orderItem.productSku, orderItem.quantity);
    });
  };

  const getProductBySku = async (sku, quantity) => {
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/${sku}`)
      .catch((error) => {
        console.error(error);
      });
    const newProduct = {
      ...response.data.content,
      quantity,
    };
    if (_.findWhere(products, newProduct) == null) {
      setProducts([...products, newProduct]);
    }
  };

  const isAddressValid = () => {
    if (
      shippingAddress.locality.length === 0 ||
      shippingAddress.city.length === 0 ||
      shippingAddress.state.length === 0 ||
      shippingAddress.country.length === 0
    )
      return false;
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!isAddressValid()) {
      setErrorMessage("Enter valid address!");
      return;
    }
    if (cartDetails.products.length === 0) {
      toggleToastNotification(
        "At least 1 item is required to place order!",
        "cart-id"
      );
      return;
    }

    const cartBaseUrl = process.env.REACT_APP_CART_BACKEND_BASE_URL;
    const response = await axios
      .delete(`${cartBaseUrl}/place-order/${userName}`, {
        data: shippingAddress,
      })
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Order placed successfully!");
      navigate(`/orders/${userName}`);
    }
  };

  const handleChangeQuantity = async (skuToUpdate, addOrRemove, unitPrice) => {
    const cartBaseUrl = process.env.REACT_APP_CART_BACKEND_BASE_URL;
    const addUrl = `${cartBaseUrl}/add-one?userName=${userName}&sku=${skuToUpdate}&unitPrice=${unitPrice}`;
    const removeUrl = `${cartBaseUrl}/remove-one?userName=${userName}&sku=${skuToUpdate}`;
    const response = await axios
      .post(addOrRemove === "inc" ? addUrl : removeUrl)
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Product quantity updated!");
      setProducts([]);
    }
  };

  const handleRemoveItemFromCart = async (skuToRemove) => {
    const cartBaseUrl = process.env.REACT_APP_CART_BACKEND_BASE_URL;
    const response = await axios
      .post(
        `${cartBaseUrl}/remove-this-item?userName=${userName}&sku=${skuToRemove}`
      )
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Product removed successfully!");
    }

    const updatedProducts = products.filter(
      (product) => product.sku !== skuToRemove
    );
    setProducts(updatedProducts);
  };

  const handleSortByField = (fieldToSort) => {
    var updatedProducts = products.slice();
    updatedProducts = _.sortBy(updatedProducts, fieldToSort);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const isUserLoggedIn = isUserVerified(userName);
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    getCartForUser(userName);
  }, [products]);

  return (
    <>
      <TheNavbar />
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : showInternalError ? (
        <InternalErrorIllustration />
      ) : cartDetails.products.length === 0 ? (
        <div className={styles.emptyCartPage}>
          <h1 className={styles.emptyCartPageHeading}>Shopping Cart</h1>
          <svg
            width="180"
            height="250"
            viewBox="0 0 222 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M198.921 42V0H129.408C127.737 0 126.386 1.341 126.386 3C126.386 4.659 127.737 6 129.408 6H182.558L169.587 18.876C169.487 18.975 169.435 19.11 169.351 19.221C169.239 19.368 169.127 19.506 169.046 19.671C169.012 19.737 168.961 19.788 168.931 19.857C168.879 19.977 168.882 20.106 168.849 20.232C168.798 20.421 168.752 20.601 168.737 20.796C168.734 20.862 168.698 20.928 168.698 21V42H53.8515V21C53.8515 20.928 53.8152 20.862 53.8122 20.793C53.7971 20.598 53.7517 20.418 53.7004 20.229C53.6671 20.103 53.6701 19.974 53.6188 19.854C53.5885 19.785 53.5372 19.734 53.5039 19.668C53.4223 19.506 53.3105 19.368 53.1987 19.221C53.1141 19.11 53.0596 18.975 52.9629 18.876L39.9913 6H129.408C131.08 6 126.386 4.659 126.386 3C126.386 1.341 131.08 0 129.408 0H23.6287V42H20.6064L0 153.777C0 161.619 6.42838 168 14.3286 168H207.671C215.572 168 222 161.619 222 153.777L201.943 42H198.921ZM192.876 6V42H191.365L175.713 21.282L191.105 6H192.876ZM174.743 29.997L183.809 42H174.743V29.997ZM38.7401 42L47.8069 29.997V42H38.7401ZM29.6733 6H31.4443L46.8398 21.282L31.1844 42H29.6733V6ZM215.955 153.777C215.955 158.313 212.241 162 207.671 162H14.3286C9.75893 162 6.04455 158.313 6.04455 153.777L26.651 48H195.899L215.955 153.777Z"
              fill="#848484"
            />
            <circle cx="80" cy="81" r="6" fill="#848484" />
            <path
              d="M121 111.57C121 108.494 116.747 106 111.5 106C106.253 106 102 108.494 102 111.57C102 113.731 104.346 113.126 107.389 111.832C110.027 110.711 112.973 110.711 115.611 111.832C118.654 113.126 121 113.731 121 111.57Z"
              fill="#848484"
            />
            <circle cx="143" cy="81" r="6" fill="#848484" />
            <ellipse cx="110.5" cy="234" rx="79.5" ry="12" fill="#EDEDED" />
          </svg>

          <h2 className={styles.emptyCartPageSubheading}>Empty Cart</h2>
          <p className={styles.description}>
            Looks like you haven't made your choice yet!
          </p>
          <Link to="/shop">
            <button
              className={styles.emptyCartPageContinueShoppingBtn}
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
        <div className={styles.cartPage}>
          <div className={styles.shoppingCart}>
            <div className={styles.shoppingCartHeader}>
              <h1 className={styles.heading}>Shopping Cart</h1>
              <div className={styles.sortBtns}>
                <button
                  className={styles.sortByQtyBtn}
                  onClick={() => handleSortByField("quantity")}
                >
                  Sort by: Qty
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.6709 1L3.8109 15"
                      stroke="var(--primary-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.6709 1L6.38474 3.12692"
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
                </button>
                <button
                  className={styles.sortByPriceBtn}
                  onClick={() => handleSortByField("price")}
                >
                  Sort by: Price
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.6709 1L3.8109 15"
                      stroke="var(--primary-color)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.6709 1L6.38474 3.12692"
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
                </button>
              </div>
            </div>
            <CartTable
              products={products}
              handleChangeQuantity={handleChangeQuantity}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
            />
            <Link to="/shop">
              <button className={styles.continueShoppingBtn} type="button">
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
          <div className={styles.orderSummary}>
            <h1 className={styles.heading}>Order Summary</h1>
            <div className={styles.summaryHeader}>
              <p className={styles.totalHeading}>Total Items:</p>
              <p className={styles.totalItems}>
                {cartDetails.products.length < 10
                  ? "0" + cartDetails.products.length
                  : cartDetails.products.length}
              </p>
            </div>
            <div className={styles.shippingAddress}>
              <p className={styles.addressHeading}>Shipping Address:</p>
              <p className={styles.errorMessage}>{errorMessage}</p>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={shippingAddress.locality}
                  onChange={(e) =>
                    setShippingAddress((prevValue) => {
                      return {
                        ...prevValue,
                        locality: e.target.value,
                      };
                    })
                  }
                  required
                />
                <span className={styles.bar}></span>
                <label>Locality</label>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress((prevValue) => {
                      return {
                        ...prevValue,
                        city: e.target.value,
                      };
                    })
                  }
                  required
                />
                <span className={styles.bar}></span>
                <label>City</label>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress((prevValue) => {
                      return {
                        ...prevValue,
                        state: e.target.value,
                      };
                    })
                  }
                  required
                />
                <span className={styles.bar}></span>
                <label>State</label>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress((prevValue) => {
                      return {
                        ...prevValue,
                        country: e.target.value,
                      };
                    })
                  }
                  required
                />
                <span className={styles.bar}></span>
                <label>Country</label>
              </div>
            </div>
            <div className={styles.summaryFooter}>
              <p className={styles.totalHeading}>Total:</p>
              <p className={styles.totalPrice}>₹{cartDetails.totalPrice}</p>
            </div>
            <button
              className={styles.checkOutBtn}
              type="button"
              onClick={handlePlaceOrder}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.375 12.25H7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.375 15.75H7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.9263 15.75C16.4765 15.75 15.3013 14.5747 15.3013 13.125C15.3013 11.6753 16.4765 10.5 17.9263 10.5C19.376 10.5 20.5513 11.6753 20.5513 13.125C20.5513 14.5747 19.376 15.75 17.9263 15.75Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.3169 18.375C21.1241 17.6222 20.6863 16.9549 20.0724 16.4783C19.4585 16.0018 18.7034 15.7432 17.9263 15.7432C17.1491 15.7432 16.3941 16.0018 15.7802 16.4783C15.1663 16.9549 14.7284 17.6222 14.5356 18.375"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.375 5.25H23.625C24.1082 5.25 24.5 5.64175 24.5 6.125V21.875C24.5 22.3582 24.1082 22.75 23.625 22.75H4.375C3.89175 22.75 3.5 22.3582 3.5 21.875V6.125C3.5 5.64175 3.89175 5.25 4.375 5.25Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Check Out
            </button>
          </div>
        </div>
      )}
      <TheFooter />
    </>
  );
}
