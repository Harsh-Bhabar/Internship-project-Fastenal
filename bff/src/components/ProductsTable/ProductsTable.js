import axios, { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import PreviousIcon from "../../icons/PreviousIcon";
import NextIcon from "../../icons/NextIcon";
import ViewIcon from "../../icons/ViewIcon";
import { toggleToastNotification } from "../../services/ToggleToast";

import styles from "./productsTable.module.css";
import InternalServerIllustrationSmall from "../InternalServerIllustrationSmall/InternalServerIllustrationSmall";
import Loader from "../Loader/Loader";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [productSkuToDelete, setProductSkuToDelete] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInternalError, setShowInternalError] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModalDisplay = (skuToDelete) => {
    setProductSkuToDelete(skuToDelete);
    const modalId = "product-delete-modal";
    const modal = document.getElementById(modalId);

    if (modal.style.display == "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  const handleDeleteProduct = async () => {
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .delete(`${productsBaseUrl}/${productSkuToDelete}`)
      .catch((error) => {
        console.error(error);
      });
    const responseData = response.data;
    if (responseData.status === HttpStatusCode.Ok) {
      toggleToastNotification("Product deleted successfully!");
      toggleModalDisplay("");
      getAllProducts();
    }
  };

  const updatePageDetails = (items) => {
    let pages = Math.ceil(items.length / 10);
    setTotalPages(pages);
  };

  const getAllProducts = async () => {
    setLoading(true);
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/all`)
      .catch((error) => {
        setLoading(false);
        setShowInternalError(true);
        console.error(error);
      });
    setLoading(false);
    setProducts(response.data.content);
    updatePageDetails(response.data.content);
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
    getAllProducts();
  }, []);

  return (
    <>
      <div className={styles.productsTable}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Gender</th>
              <th>Band Material</th>
              <th>Movement Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <Loader />}
            {showInternalError && <InternalServerIllustrationSmall />}
            {products.map((product, index) => {
              return (
                Math.ceil((index + 1) / 10) === currentPage && (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.brand}</td>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.price}</td>
                    <td>{product.gender}</td>
                    <td>{product.bandMaterial}</td>
                    <td>{product.movementType}</td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link to={`/product/${product.sku}`} target="_blank">
                          <div className={styles.viewBtn}>
                            <ViewIcon />
                          </div>
                        </Link>
                        <div
                          className={styles.deleteBtn}
                          onClick={() => toggleModalDisplay(product.sku)}
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
      <div className={styles.modal} id="product-delete-modal">
        <div className={styles.modalContent}>
          <div className={styles.container}>
            <p className={styles.modalMainHeading}>Hey, Wait!</p>
            <p className={styles.modalSubHeading}>
              Are you sure you want to delete this product?{" "}
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
                onClick={handleDeleteProduct}
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
