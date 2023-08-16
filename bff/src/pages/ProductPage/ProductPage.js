import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import TheFooter from "../../components/TheFooter/TheFooter";
import ProductSuggestions from "../../components/ProductSuggestions/ProductSuggestions";
import { toggleToastNotification } from "../../services/ToggleToast";

import InternalErrorIllustration from "../../components/InternalErrorIllustration/InternalErrorIllustration";

import styles from "./productPage.module.css";
import {
  isWishlistedInLocal,
  saveProductToLocal,
} from "../../services/ProductService";

export default function ProductPage() {
  const [product, setProduct] = useState({
    sku: "",
    brand: "",
    name: "",
    description: "",
    price: 0,
    gender: "Unisex",
    bandMaterial: "",
    movementType: "",
    color: "",
    bandColor: "",
    imageUrl: "",
  });

  const [isLiked, setIsLiked] = useState(false);
  const [showInternalError, setShowInternalError] = useState(false);

  const navigate = useNavigate();

  const toggleIsLiked = async () => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      saveProductToLocal(product.sku);
      if (isLiked)
        toggleToastNotification(
          "Product removed from wishlist! Login to access wishlist.",
          "wishlist-id",
          "success"
        );
      else
        toggleToastNotification(
          "Product added to wishlist! Login to access wishlist.",
          "wishlist-id",
          "success"
        );
      setIsLiked(!isLiked);
      return;
    }
    const wishlistBaseUrl = process.env.REACT_APP_WISHLIST_BACKEND_BASE_URL;
    if (isLiked === true) {
      const response = await axios
        .post(`${wishlistBaseUrl}/remove/${userName}/${product.sku}`)
        .catch((error) => {
          console.error(error);
        });
      const responseStatus = response.data.status;
      if (responseStatus == HttpStatusCode.Ok) {
        toggleToastNotification("Product removed from wishlist!");
        setIsLiked(!isLiked);
      }
    } else {
      const response = await axios
        .post(`${wishlistBaseUrl}/add/${userName}/${product.sku}`)
        .catch((error) => {
          console.error(error);
        });
      const responseStatus = response.data.status;
      if (responseStatus == HttpStatusCode.Ok) {
        toggleToastNotification("Product added to wishlist!");
        setIsLiked(!isLiked);
      }
    }
  };

  const { sku } = useParams();

  const getProductBySku = async (sku) => {
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/${sku}`)
      .catch((error) => {
        if (error.response) {
          navigate("*");
        } else {
          setShowInternalError(true);
        }
        console.error(error);
      });
    setProduct(response.data.content);
  };

  const checkIsProductWishlisted = async (productSku) => {
    if (!localStorage.getItem("userName")) {
      setIsLiked(isWishlistedInLocal(productSku));
    } else {
      const wishlistBaseUrl = process.env.REACT_APP_WISHLIST_BACKEND_BASE_URL;
      const userName = localStorage.getItem("userName");
      const response = await axios
        .get(
          `${wishlistBaseUrl}/is-product-wishlisted/${userName}/${productSku}`
        )
        .catch((error) => {
          console.error(error);
        });
      const responseData = response.data.content;
      if (responseData.isWishlisted) setIsLiked(true);
    }
  };

  useEffect(() => {
    getProductBySku(sku);
    checkIsProductWishlisted(sku);
  }, [navigate]);

  const handleShareClick = () => {
    var dummyElement = document.createElement("input"),
      text = window.location.href;
    document.body.appendChild(dummyElement);
    dummyElement.value = text;
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    toggleToastNotification(
      "Product link copied to clipboard!",
      "url-copied-id"
    );
  };

  const handleAddToCart = () => {
    if (
      !(localStorage.getItem("userName") && localStorage.getItem("isLoggedIn"))
    ) {
      toggleToastNotification("Login to add items to cart!");
      navigate("/login");
      return;
    }

    addItemToCart();
  };

  const addItemToCart = async () => {
    const cartBaseUrl = process.env.REACT_APP_CART_BACKEND_BASE_URL;
    const response = await axios
      .post(
        `${cartBaseUrl}/add-one?userName=${localStorage.getItem(
          "userName"
        )}&sku=${product.sku}&unitPrice=${product.price}`
      )
      .catch((error) => console.error(error));
    if (response.data.status === HttpStatusCode.Ok)
      toggleToastNotification("Product added to cart successfully!");
    else toggleToastNotification("Unable to add product to cart!");
  };

  return (
    <>
      <TheNavbar />
      {showInternalError ? (
        <InternalErrorIllustration />
      ) : (
        <div className={`${styles.product} disableUserSelect`}>
          <div className={styles.imageSection}>
            <div className={styles.actionBtns}>
              <p className={styles.sku}>
                SKU <span>{product.sku}</span>
              </p>
              <div>
                <div className={styles.btn} onClick={toggleIsLiked}>
                  {isLiked ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.9873 2.28318C26.8921 5.25308 26.5693 9.87292 23.5569 12.7328L14.5198 21.4225C13.6591 22.1925 12.2605 22.1925 11.3998 21.4225L2.36272 12.7328C-0.542067 9.87292 -0.864821 5.25308 1.93238 2.28318C5.05234 -0.686712 10.0012 -0.796708 13.0136 2.17319C16.026 -0.796708 20.9749 -0.686712 23.9873 2.28318Z"
                        fill="#FF005C"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 26 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.7728 3.20555C24.0474 2.20843 23.0766 1.39517 21.9451 0.83666C20.8135 0.27815 19.5555 -0.00866135 18.2807 0.0012243C17.2913 -0.0168196 16.3092 0.164767 15.3989 0.534015C14.4887 0.903263 13.6711 1.45179 13 2.14344C12.3281 1.4527 11.5104 0.904781 10.6003 0.535605C9.6903 0.166428 8.7085 -0.0156768 7.71929 0.0012243C6.44448 -0.00866135 5.18647 0.27815 4.05492 0.83666C2.92336 1.39517 1.9526 2.20843 1.22724 3.20555C0.487584 4.32341 0.0671417 5.60537 0.00739658 6.92495C-0.0523485 8.24452 0.250668 9.55612 0.886548 10.7303C1.85148 12.7911 3.19054 14.674 4.84235 16.2929C6.71283 18.1591 8.75923 19.8584 10.9559 21.3694C11.5503 21.7793 12.2658 22 13 22C13.7342 22 14.4497 21.7793 15.0441 21.3694C17.2413 19.8591 19.2878 18.1597 21.1577 16.2929C22.8095 14.674 24.1485 12.7911 25.1135 10.7303C25.7493 9.55612 26.0524 8.24452 25.9926 6.92495C25.9329 5.60537 25.5124 4.32341 24.7728 3.20555ZM23.5236 10.1002C22.6269 11.9779 21.3977 13.6951 19.8895 15.1768C18.0922 16.9622 16.1283 18.5891 14.0221 20.0373C13.7272 20.2476 13.3686 20.3613 13 20.3613C12.6314 20.3613 12.2728 20.2476 11.9779 20.0373C9.87222 18.5884 7.90842 16.9617 6.11048 15.1768C4.59486 13.7009 3.36468 11.9824 2.47644 10.1002C1.96095 9.17059 1.70744 8.12978 1.74061 7.07923C1.77378 6.02867 2.0925 5.00421 2.66571 4.10564C3.23518 3.33741 3.99309 2.7129 4.87372 2.28628C5.75435 1.85965 6.73111 1.64378 7.71929 1.65739C8.52329 1.63173 9.32288 1.78048 10.0575 2.09239C10.792 2.40429 11.4423 2.87115 11.959 3.45757C12.2443 3.71725 12.624 3.86219 13.0189 3.86219C13.4138 3.86219 13.7935 3.71725 14.0789 3.45757C14.5916 2.876 15.2357 2.41205 15.9633 2.10035C16.6908 1.78864 17.483 1.63722 18.2807 1.65739C19.2689 1.64378 20.2457 1.85965 21.1263 2.28628C22.0069 2.7129 22.7648 3.33741 23.3343 4.10564C23.9075 5.00421 24.2262 6.02867 24.2594 7.07923C24.2926 8.12978 24.0391 9.17059 23.5236 10.1002Z"
                        fill="#494949"
                      />
                    </svg>
                  )}
                </div>
                <div className={styles.btn} onClick={handleShareClick}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.09605 14.6128C5.58948 15.1085 4.94766 15.443 4.25148 15.5741C3.55531 15.7052 2.83593 15.6271 2.18402 15.3497C1.53211 15.0722 0.97684 14.6078 0.588193 14.0149C0.199547 13.4221 -0.00508191 12.7273 9.58849e-05 12.0182C0.000531312 11.3116 0.208491 10.6207 0.598107 10.0315C0.987722 9.44227 1.5418 8.9807 2.19142 8.70421C2.84104 8.42772 3.55753 8.3485 4.25177 8.47642C4.94601 8.60434 5.58736 8.93374 6.09605 9.42366L16.824 4.05434C16.7178 3.21115 16.9127 2.35751 17.3743 1.64424C17.836 0.930967 18.5346 0.40397 19.3468 0.156349C20.159 -0.0912712 21.0324 -0.0435788 21.8129 0.291001C22.5934 0.62558 23.2306 1.22551 23.612 1.98481C23.9934 2.74411 24.0944 3.61391 23.8972 4.44054C23.7 5.26717 23.2173 5.99744 22.5343 6.50232C21.8513 7.00721 21.0121 7.25422 20.1648 7.19972C19.3175 7.14521 18.5167 6.79271 17.904 6.20447L7.17604 11.5738C7.21232 11.869 7.21232 12.1675 7.17604 12.4627L17.904 17.832C18.4105 17.3363 19.0523 17.0018 19.7485 16.8707C20.4447 16.7396 21.1641 16.8176 21.816 17.0951C22.4679 17.3726 23.0232 17.837 23.4118 18.4299C23.8005 19.0227 24.0051 19.7175 23.9999 20.4265C23.9958 20.916 23.8922 21.3994 23.6953 21.8474C23.4984 22.2954 23.2124 22.6986 22.8548 23.0323C22.4971 23.3661 22.0753 23.6234 21.6151 23.7886C21.1548 23.9537 20.6658 24.0233 20.1777 23.9931C19.6897 23.9629 19.213 23.8335 18.7766 23.6128C18.3402 23.392 17.9533 23.0846 17.6394 22.7093C17.3256 22.334 17.0915 21.8986 16.9513 21.4297C16.8111 20.9609 16.7677 20.4683 16.824 19.9821L6.09605 14.6128Z"
                      fill="#494949"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <img
              className={styles.productImage}
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className={styles.productDetails}>
            <p className={styles.brand}>{product.brand}</p>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>₹ {product.price}</p>
            <p className={styles.description}>{product.description}</p>
            <button
              className={styles.addToCartBtn}
              type="button"
              onClick={handleAddToCart}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.55413 23.4546C10.1447 23.4546 10.6234 22.9758 10.6234 22.3853C10.6234 21.7948 10.1447 21.316 9.55413 21.316C8.96359 21.316 8.48486 21.7948 8.48486 22.3853C8.48486 22.9758 8.96359 23.4546 9.55413 23.4546Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.3161 23.4546C21.9066 23.4546 22.3854 22.9758 22.3854 22.3853C22.3854 21.7948 21.9066 21.316 21.3161 21.316C20.7256 21.316 20.2468 21.7948 20.2468 22.3853C20.2468 22.9758 20.7256 23.4546 21.3161 23.4546Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1H5.27706L8.14268 15.3174C8.24046 15.8097 8.50827 16.2519 8.89924 16.5667C9.2902 16.8814 9.7794 17.0486 10.2812 17.039H20.6745C21.1763 17.0486 21.6655 16.8814 22.0564 16.5667C22.4474 16.2519 22.7152 15.8097 22.813 15.3174L24.5238 6.34632H6.34632"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add to cart
            </button>
            <p className={styles.subHeading}>More Details</p>
            <div className={styles.moreDetails}>
              <p className={styles.gender}>Gender: {product.gender}</p>
              <p className={styles.bandMaterial}>
                Band Material: {product.bandMaterial}
              </p>
              <p className={styles.movementType}>
                Movement Type: {product.movementType}
              </p>
              <p className={styles.color}>Color: {product.color}</p>
              <p className={styles.bandColor}>
                Band Color: {product.bandColor}
              </p>
            </div>
          </div>
        </div>
      )}
      <ProductSuggestions />
      <TheFooter />
    </>
  );
}
