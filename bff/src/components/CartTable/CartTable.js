import React from "react";
import { Link } from "react-router-dom";
import DecreaseIcon from "../../icons/DecreaseIcon";
import DeleteFilledIcon from "../../icons/DeleteFilledIcon";
import IncreaseIcon from "../../icons/IncreaseIcon";
import styles from "./cartTable.module.css";

export default function CartTable(props) {
  const { products, handleChangeQuantity, handleRemoveItemFromCart } = props;

  return (
    <div className={styles.cartTable}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Brand</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (1 Unit)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <Link to={`/product/${product.sku}`}>
                    <img src={product.imageUrl} alt={product.brand} />
                  </Link>
                </td>
                <td>{product.brand}</td>
                <td>
                  {" "}
                  <Link
                    to={`/product/${product.sku}`}
                    className={styles.productName}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>
                  <div className={`${styles.quantityField} disableUserSelect`}>
                    <div
                      className={styles.decreaseQtyBtn}
                      onClick={() => handleChangeQuantity(product.sku, "dec")}
                    >
                      <DecreaseIcon />
                    </div>
                    {product.quantity < 10
                      ? `0${product.quantity}`
                      : product.quantity}
                    <div
                      className={styles.increaseQtyBtn}
                      onClick={() =>
                        handleChangeQuantity(product.sku, "inc", product.price)
                      }
                    >
                      <IncreaseIcon />
                    </div>
                  </div>
                </td>
                <td>₹{product.price}</td>
                <td>
                  <button
                    className={styles.removeBtn}
                    type="button"
                    onClick={() => handleRemoveItemFromCart(product.sku)}
                  >
                    <DeleteFilledIcon />
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
