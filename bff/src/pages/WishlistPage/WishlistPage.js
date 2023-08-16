import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "underscore";
import InternalErrorIllustration from "../../components/InternalErrorIllustration/InternalErrorIllustration";
import Loader from "../../components/Loader/Loader";
import TheFooter from "../../components/TheFooter/TheFooter";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import WatchCard from "../../components/WatchCard/WatchCard";

import styles from "./wishlistPage.module.css";

export default function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();

  const getWishlistForUser = async (userName) => {
    setLoading(true);
    const wishlistBaseUrl = process.env.REACT_APP_WISHLIST_BACKEND_BASE_URL;
    const response = await axios
      .get(`${wishlistBaseUrl}/${userName}`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    const wishlist = response.data.content;
    wishlist.productSkus.forEach((sku) => {
      getProductBySku(sku);
    });
  };

  const getProductBySku = async (sku) => {
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/${sku}`)
      .catch((error) => {
        console.error(error);
      });
    if (_.findWhere(products, response.data.content) == null) {
      setProducts([...products, response.data.content]);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userName") != userName)
      navigate("/notfound-page");
    getWishlistForUser(userName);
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
      ) : products.length === 0 ? (
        <div className={styles.emptyWishlistPage}>
          <h1 className={styles.emptyWishlistPageHeading}>Wishlist</h1>
          <svg
            width="250"
            height="250"
            viewBox="0 0 220 261"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="110" cy="163" rx="110" ry="98" fill="#F7F7F7" />
            <rect
              x="114.134"
              y="81.9105"
              width="88.4545"
              height="115.813"
              rx="8.5"
              transform="rotate(16.0408 114.134 81.9105)"
              fill="white"
              stroke="#979797"
              strokeWidth="3"
            />
            <path
              d="M137.999 157.591C148.365 160.572 159.185 154.584 162.165 144.218C165.146 133.852 159.158 123.032 148.792 120.052C138.426 117.071 127.606 123.059 124.626 133.425C121.645 143.791 127.633 154.611 137.999 157.591Z"
              stroke="#E9E9E9"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M151.364 156.643L147.473 166.643C146.967 167.945 145.992 169.011 144.739 169.629C143.487 170.247 142.048 170.373 140.707 169.981L129.096 166.643C127.752 166.263 126.6 165.392 125.867 164.203C125.134 163.014 124.873 161.593 125.137 160.221L127.151 149.682M135.427 120.998L139.318 110.999C139.822 109.701 140.792 108.638 142.039 108.019C143.286 107.4 144.719 107.269 146.057 107.653L157.721 111.006C159.065 111.387 160.218 112.258 160.951 113.447C161.684 114.636 161.944 116.056 161.681 117.428L159.667 127.968"
              stroke="#E9E9E9"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="94.9053"
              y="177.301"
              width="71.1313"
              height="11.7249"
              rx="5"
              transform="rotate(16.0408 94.9053 177.301)"
              fill="#E9E9E9"
            />
            <rect
              x="17.6829"
              y="54.8386"
              width="114"
              height="149"
              rx="8.5"
              transform="rotate(-7.49656 17.6829 54.8386)"
              fill="white"
              stroke="#979797"
              strokeWidth="3"
            />
            <rect
              x="44.3359"
              y="176.905"
              width="91"
              height="15"
              rx="5"
              transform="rotate(-7.49656 44.3359 176.905)"
              fill="#E9E9E9"
            />
            <path
              d="M159.826 19.4946C157.249 15.4542 152.96 12.5979 148.359 11.4751L147.778 11.3709C141.963 10.3285 136.212 12.2797 131.894 16.2772C129.784 9.63641 124.351 4.78592 117.664 3.58725L117.374 3.53514C112.431 2.64916 107.126 3.78568 103.254 6.96846C99.1441 9.81019 96.5192 14.4093 95.9295 19.3731C94.9572 28.1452 98.5415 33.2608 101.939 37.7465C105.762 43.2032 109.45 47.741 106.028 58.4597C105.717 60.1932 106.382 61.5053 107.836 61.7659C108.417 61.8701 108.708 61.9222 109.632 61.7896C141.527 57.964 159.744 48.4065 162.23 34.538L162.282 34.2491C163.557 28.8116 162.641 23.8761 159.826 19.4946Z"
              fill="#E1E1E1"
            />
            <path
              d="M84.8079 131.771C98.489 129.971 108.12 117.421 106.32 103.74C104.52 90.0585 91.9695 80.4272 78.2884 82.2275C64.6073 84.0279 54.976 96.578 56.7764 110.259C58.5767 123.94 71.1268 133.572 84.8079 131.771Z"
              stroke="#E9E9E9"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M99.9992 123.832L100.544 137.549C100.617 139.334 100.017 141.082 98.8638 142.447C97.7103 143.812 96.0868 144.695 94.3141 144.921L78.9909 146.937C77.2201 147.178 75.4235 146.745 73.9561 145.725C72.4888 144.705 71.4574 143.172 71.0657 141.428L68.0436 128.037M63.0962 90.1671L62.5512 76.4503C62.4787 74.6709 63.074 72.9286 64.2201 71.5655C65.3662 70.2024 66.9805 69.317 68.746 69.083L84.1399 67.0572C85.9107 66.8169 87.7073 67.2495 89.1747 68.2696C90.642 69.2896 91.6734 70.8229 92.0651 72.5666L95.0872 85.9573"
              stroke="#E9E9E9"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className={styles.emptyWishlistPageSubheading}>
            No items in wishlist
          </h2>
          <p className={styles.description}>Save your favorite items here!</p>
          <Link to="/shop">
            <button
              className={styles.emptyWishlistPageContinueShoppingBtn}
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
        <>
          <h1 className={styles.wishlistHeading}>Wishlist</h1>
          <div className={styles.wishlistItems}>
            {products.map((product) => (
              <WatchCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
      <TheFooter />
    </>
  );
}
