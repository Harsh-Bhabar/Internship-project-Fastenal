import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CartIcon from "../../icons/CartIcon";
import LikedFilledIcon from "../../icons/LikedFilledIcon";
import LikedOutlinedIcon from "../../icons/LikedOutlinedIcon";
import ShareIcon from "../../icons/ShareIcon";
import {
  isWishlistedInLocal,
  saveProductToLocal,
} from "../../services/ProductService";
import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./watchCard.module.css";

export default function WatchCard(props) {
  const { product } = props;
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const toggleIsLiked = async () => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      saveProductToLocal(product.sku);
      if (isLiked)
        toggleToastNotification(
          "Product removed from wishlist! Login to access wishlist.",
          "product-removed-wishlist-id",
          "success"
        );
      else
        toggleToastNotification(
          "Product added to wishlist! Login to access wishlist.",
          "product-added-wishlist-id",
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
        toggleToastNotification(
          "Product removed from wishlist!",
          "product-removed-wishlist-id",
          "success"
        );
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
        toggleToastNotification(
          "Product added to wishlist!",
          "product-added-wishlist-id",
          "success"
        );
        setIsLiked(!isLiked);
      }
    }
    if (window.location.pathname.includes("wishlist")) window.location.reload();
  };

  const handleShareClick = () => {
    var dummyElement = document.createElement("input"),
      text = window.location.origin + "/product/" + product.sku;
    document.body.appendChild(dummyElement);
    dummyElement.value = text;
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    toggleToastNotification(
      "Product link copied to clipboard!",
      "url-copied-id",
      "copied-id",
      "success"
    );
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
    checkIsProductWishlisted(product.sku);
  }, []);

  const handleAddToCart = () => {
    if (
      !(localStorage.getItem("userName") && localStorage.getItem("isLoggedIn"))
    ) {
      toggleToastNotification(
        "Login to add items to cart!",
        "login-id",
        "info"
      );
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
      toggleToastNotification(
        "Product added to cart successfully!",
        "added-to-cart-id",
        "success"
      );
    else
      toggleToastNotification(
        "Unable to add product to cart!",
        "error-add-to-cart-id",
        "error"
      );
  };

  return (
    <div className={`${styles.watchCard} disableUserSelect`}>
      <div className={styles.cardHeader}>
        <p className={styles.brandName}>{product.brand}</p>
        <div className={styles.actionBtns}>
          <div className={styles.btn} onClick={toggleIsLiked}>
            {isLiked ? <LikedFilledIcon /> : <LikedOutlinedIcon />}
          </div>
          <div className={styles.btn} onClick={handleShareClick}>
            <ShareIcon />
          </div>
        </div>
      </div>
      <Link to={`/product/${product.sku}`}>
        <img
          className={styles.productImage}
          src={product.imageUrl}
          alt={product.brand}
        />
        <p className={styles.name}>{product.name}</p>
      </Link>
      <div className={styles.cardFooter}>
        <p className={styles.price}>₹ {product.price}</p>
        <button
          className={styles.addToCartBtn}
          type="button"
          onClick={handleAddToCart}
        >
          <CartIcon />
          Add to cart
        </button>
      </div>
    </div>
  );
}
