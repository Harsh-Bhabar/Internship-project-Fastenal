import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import WatchCard from "../../components/WatchCard/WatchCard";

import styles from "./productSuggestions.module.css";

export default function ProductSuggestions() {
  const [products, setProducts] = useState([]);
  const { sku } = useParams();

  const getProductSuggestions = async () => {
    const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
    const response = await axios
      .get(`${productsBaseUrl}/product-suggestions/${sku}`)
      .catch((error) => {
        console.error(error);
      });
    setProducts(response.data.content);
  };

  useEffect(() => {
    getProductSuggestions();
  }, []);

  return (
    <section className={styles.suggestionsSection}>
      <div className={styles.suggestionsHeader}>
        <h1 className={styles.mainHeading}>SIMILAR PRODUCTS</h1>
        <Link to="/shop">
          <button className={styles.shopAllBtn} type="button">
            Shop All
          </button>
        </Link>
      </div>
      {products?.map((product) => {
        return <WatchCard key={product.id} product={product} />;
      })}
    </section>
  );
}
