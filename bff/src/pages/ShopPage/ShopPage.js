import axios from "axios";
import React, { useEffect, useState } from "react";
import FilterHeader from "../../components/FilterHeader/FilterHeader";
import Filters from "../../components/Filters/Filters";
import InternalErrorIllustration from "../../components/InternalErrorIllustration/InternalErrorIllustration";
import Loader from "../../components/Loader/Loader";
import TheFooter from "../../components/TheFooter/TheFooter";
import TheNavbar from "../../components/TheNavbar/TheNavbar";
import WatchCard from "../../components/WatchCard/WatchCard";
import WatchListCard from "../../components/WatchListCard/WatchListCard";
import NextIcon from "../../icons/NextIcon";
import NoProductsIllustration from "../../icons/NoProductsIllustration";
import PreviousIcon from "../../icons/PreviousIcon";
import { toggleToastNotification } from "../../services/ToggleToast";
import styles from "./shopPage.module.css";

const displayView = {
  grid: "grid",
  list: "list",
};

let brandsToFilter = new Set();
let movementTypesToFilter = new Set();
let colorToFilter = new Set();
let genderToFilter = new Set();

const defaultFilters = {
  brandsToFilter: new Set(),
  movementTypesToFilter: new Set(),
  colorToFilter: new Set(),
  genderToFilter: new Set(),
};

const defaultPriceRange = {
  min: 0,
  max: 50000,
};

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeView, setActiveView] = useState(displayView.grid);
  const [filterValues, setFilterValues] = useState(defaultFilters);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceValues, setPriceValues] = useState(defaultPriceRange);
  const [showInternalError, setShowInternalError] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const getAllProducts = async () => {
    setContentLoading(true);
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/all`)
      .catch((error) => {
        setContentLoading(false);
        console.error(error);
        setShowInternalError(true);
      });
    setContentLoading(false);
    setAllProducts(response.data.content);
    setProducts(response.data.content);
    updatePageDetails(response.data.content);
    setLoading(false);
  };

  const applyPriceFilters = (priceRange) => {
    setPriceValues({ ...priceRange });
    if (loading || (priceRange.min === 0 && priceRange.max === 50000)) return;
    let filteredProducts = allProducts.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );
    filterProducts(filteredProducts);
  };

  const applyFilters = (filterType, filterToApply) => {
    if (filterType === "brands") {
      if (brandsToFilter.has(filterToApply))
        brandsToFilter.delete(filterToApply);
      else brandsToFilter.add(filterToApply);
    } else if (filterType === "movementType") {
      if (movementTypesToFilter.has(filterToApply))
        movementTypesToFilter.delete(filterToApply);
      else movementTypesToFilter.add(filterToApply);
    } else if (filterType === "color") {
      if (colorToFilter.has(filterToApply)) colorToFilter.delete(filterToApply);
      else colorToFilter.add(filterToApply);
    } else if (filterType === "gender") {
      if (genderToFilter.has(filterToApply))
        genderToFilter.delete(filterToApply);
      else genderToFilter.add(filterToApply);
    }

    applyPriceFilters(priceValues);
  };

  const filterProducts = (priceFilteredProducts = allProducts) => {
    let brandFilteredProducts = priceFilteredProducts;
    let movementTypeFilteredProducts = priceFilteredProducts;
    let colorFilteredProducts = priceFilteredProducts;
    let genderFilteredProducts = priceFilteredProducts;

    if (brandsToFilter.size !== 0)
      brandFilteredProducts = priceFilteredProducts.filter((product) =>
        brandsToFilter.has(product.brand.toLowerCase())
      );

    if (movementTypesToFilter.size !== 0)
      movementTypeFilteredProducts = priceFilteredProducts.filter((product) =>
        movementTypesToFilter.has(product.movementType.toLowerCase())
      );

    if (colorToFilter.size !== 0)
      colorFilteredProducts = priceFilteredProducts.filter((product) =>
        colorToFilter.has(product.color.toLowerCase())
      );

    if (genderToFilter.size !== 0)
      genderFilteredProducts = priceFilteredProducts.filter(
        (product) =>
          genderToFilter.has(product.gender.toLowerCase()) ||
          product.gender.toLowerCase() === "unisex"
      );

    let filteredProducts = brandFilteredProducts.filter(
      (product) =>
        movementTypeFilteredProducts.includes(product) &&
        colorFilteredProducts.includes(product) &&
        genderFilteredProducts.includes(product)
    );
    updatePageDetails(filteredProducts);
    setProducts(filteredProducts);
    setFilterValues({
      brandsToFilter,
      movementTypesToFilter,
      colorToFilter,
      genderToFilter,
    });
  };

  const toggleView = () => {
    if (activeView === displayView.grid) {
      setActiveView(displayView.list);
      toggleToastNotification("List view applied!");
    } else {
      setActiveView(displayView.grid);
      toggleToastNotification("Grid view applied!");
    }
  };

  const resetFilterValues = () => {
    brandsToFilter.clear();
    movementTypesToFilter.clear();
    colorToFilter.clear();
    genderToFilter.clear();
    setFilterValues(defaultFilters);
    setProducts(allProducts);
    setPriceValues(defaultPriceRange);
  };

  const updatePageDetails = (items) => {
    let pages = Math.ceil(items.length / 9);
    setTotalPages(pages);
  };

  const togglePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
    scrollToTop();
  };

  const toggleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
    scrollToTop();
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    getAllProducts();
    resetFilterValues();
  }, []);

  return (
    <>
      <TheNavbar />
      <FilterHeader toggleView={toggleView} />
      <div className={styles.shopPage}>
        <Filters
          applyFilters={applyFilters}
          applyPriceFilters={applyPriceFilters}
          filterValues={filterValues}
          clearFilters={resetFilterValues}
        />
        {contentLoading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <div className={styles.productsGallery}>
          {products.length === 0 && !contentLoading ? (
            showInternalError ? (
              <div className={styles.internalError}>
                <InternalErrorIllustration />
              </div>
            ) : (
              <div className={styles.emptyProductPage}>
                <h1 className={styles.emptyProductPageHeading}>Products</h1>
                <NoProductsIllustration />
                <h2 className={styles.emptyProductPageSubheading}>
                  No products available!
                </h2>
              </div>
            )
          ) : activeView === displayView.grid ? (
            products?.map((product, index) => {
              return (
                Math.ceil((index + 1) / 9) === currentPage && (
                  <WatchCard key={product.id} product={product} />
                )
              );
            })
          ) : (
            products?.map((product, index) => {
              return (
                Math.ceil((index + 1) / 9) === currentPage && (
                  <WatchListCard key={product.id} product={product} />
                )
              );
            })
          )}
          {products.length != 0 && (
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
          )}
        </div>
      </div>
      <TheFooter />
    </>
  );
}
