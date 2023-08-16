import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./addProductForm.module.css";

const defaultState = {
  brand: "",
  name: "",
  description: "",
  sku: "",
  price: 0,
  gender: "",
  bandMaterial: "",
  movementType: "",
  color: "",
  bandColor: "",
  imageUrl: "",
};

export default function AddProductForm() {
  const [productDetails, setProductDetails] = useState(defaultState);

  const [isLiked, setIsLiked] = useState(false);

  const handleShareClick = () => {
    var dummyElement = document.createElement("input"),
      text = window.location.origin + "/product/" + productDetails.sku;
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

  const handleAddProduct = async () => {
    if (!isProductDetailsValid()) return;
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .post(`${productsBaseUrl}`, productDetails)
      .catch((error) => console.error(error));
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Product added successfully!");
      setProductDetails(defaultState);
    } else {
      toggleToastNotification("Error adding product! Try again!");
    }
  };

  const isProductDetailsValid = () => {
    if (
      productDetails.brand.length === 0 ||
      productDetails.name.length === 0 ||
      productDetails.description.length === 0 ||
      productDetails.sku.length === 0 ||
      productDetails.price.length === 0 ||
      productDetails.gender.length === 0 ||
      productDetails.bandMaterial.length === 0 ||
      productDetails.movementType.length === 0 ||
      productDetails.color.length === 0 ||
      productDetails.bandColor.length === 0 ||
      productDetails.imageUrl.length === 0
    ) {
      toggleToastNotification("Input fields cannot be empty!");
      return false;
    }
    return true;
  };

  return (
    <div className={styles.addProductForm}>
      <div className={styles.form}>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td className={styles.label}>SKU</td>
              <td>
                <input
                  type="text"
                  value={productDetails.sku}
                  placeholder="SKU"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      sku: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>Image URL</td>
              <td>
                <input
                  type="text"
                  value={productDetails.imageUrl}
                  placeholder="Image URL"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      imageUrl: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>BRAND</td>
              <td>
                <input
                  type="text"
                  value={productDetails.brand}
                  placeholder="Brand"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      brand: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>NAME</td>
              <td>
                <input
                  type="text"
                  value={productDetails.name}
                  placeholder="Name"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>DESCRIPTION</td>
              <td>
                <input
                  type="text"
                  value={productDetails.description}
                  placeholder="Description"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>PRICE</td>
              <td>
                <input
                  type="text"
                  value={productDetails.price}
                  placeholder="Price"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      price: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>GENDER</td>
              <td>
                <input
                  type="text"
                  value={productDetails.gender}
                  placeholder="Gender"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      gender: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>BAND MATERIAL</td>
              <td>
                <input
                  type="text"
                  value={productDetails.bandMaterial}
                  placeholder="Band Material"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      bandMaterial: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>MOVEMENT TYPE</td>
              <td>
                <input
                  type="text"
                  value={productDetails.movementType}
                  placeholder="Movement Type"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      movementType: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>COLOR</td>
              <td>
                <input
                  type="text"
                  value={productDetails.color}
                  placeholder="Color"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      color: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td className={styles.label}>BAND COLOR</td>
              <td>
                <input
                  type="text"
                  value={productDetails.bandColor}
                  placeholder="Band Color"
                  onChange={(e) =>
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      bandColor: e.target.value,
                    }))
                  }
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h1 className={styles.previewHeading}>Product Preview</h1>
        <div className={`${styles.productPreview} disableUserSelect`}>
          <div className={styles.cardHeader}>
            <p className={styles.brandName}>
              {productDetails.brand === ""
                ? "PRODUCT BRAND"
                : productDetails.brand}
            </p>
            <div className={styles.actionBtns}>
              <div className={styles.btn} onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? (
                  <svg
                    width="20"
                    height="20"
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
                    width="20"
                    height="20"
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
                  width="20"
                  height="20"
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
          {productDetails.imageUrl === "" ? (
            <div className={styles.imgDiv}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 195 297"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M97.6667 237C146.636 237 186.333 197.303 186.333 148.334C186.333 99.3643 146.636 59.6669 97.6667 59.6669C48.6974 59.6669 9 99.3643 9 148.334C9 197.303 48.6974 237 97.6667 237Z"
                  stroke="#EAEAEA"
                  strokeWidth="17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M154.792 216.1L150.359 264.614C149.788 270.93 146.869 276.802 142.179 281.07C137.488 285.339 131.367 287.693 125.025 287.667H70.1788C63.8369 287.693 57.7161 285.339 53.0256 281.07C48.3351 276.802 45.4162 270.93 44.8454 264.614L40.4121 216.1M40.5388 80.5669L44.9721 32.0535C45.5409 25.7592 48.4419 19.9047 53.1056 15.6395C57.7692 11.3742 63.8588 9.00616 70.1788 9.00021H125.279C131.621 8.97448 137.741 11.3283 142.432 15.5967C147.122 19.865 150.041 25.7374 150.612 32.0535L155.045 80.5669"
                  stroke="#EAEAEA"
                  strokeWidth="17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <img
              className={styles.productImage}
              src={productDetails.imageUrl}
              alt={productDetails.brand}
            />
          )}
          <p className={styles.name}>
            {productDetails.name === "" ? "PRODUCT NAME" : productDetails.name}
          </p>

          <div className={styles.cardFooter}>
            <p className={styles.price}>₹ {productDetails.price}</p>
            <button className={styles.addToCartBtn} type="button">
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
          </div>
        </div>
        <button className={styles.addProductBtn} onClick={handleAddProduct}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 17V3C1 1.89543 1.89543 1 3 1H14.1716C14.702 1 15.2107 1.21071 15.5858 1.58579L18.4142 4.41421C18.7893 4.78929 19 5.29799 19 5.82843V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17Z"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M6.6 7H13.4C13.7314 7 14 6.73137 14 6.4V1.6C14 1.26863 13.7314 1 13.4 1H6.6C6.26863 1 6 1.26863 6 1.6V6.4C6 6.73137 6.26863 7 6.6 7Z"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M4 11.6V19H16V11.6C16 11.2686 15.7314 11 15.4 11H4.6C4.26863 11 4 11.2686 4 11.6Z"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          Add Product
        </button>
      </div>
    </div>
  );
}
