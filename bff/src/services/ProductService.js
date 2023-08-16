import axios, { HttpStatusCode } from "axios";

export const getProductBySku = async (sku) => {
  const productsBaseUrl = process.env.REACT_APP_PRODUCTS_BACKEND_BASE_URL;
  const response = axios.get(`${productsBaseUrl}/${sku}`).catch((error) => {
    console.error(error);
  });
  return response.data.content;
};

export const addProductToWishlistForUser = async (userName, sku) => {
  const wishlistBaseUrl = process.env.REACT_APP_WISHLIST_BACKEND_BASE_URL;
  const response = await axios
    .post(`${wishlistBaseUrl}/add/${userName}/${sku}`)
    .catch((error) => {
      console.error(error);
    });
  const responseStatus = response.data.status;
  if (responseStatus == HttpStatusCode.Ok) return true;

  return false;
};

export const saveProductToLocal = (sku) => {
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
  let items = new Set(wishlistItems);
  if (items.has(sku)) {
    items.delete(sku);
  } else {
    items.add(sku);
  }
  localStorage.setItem("wishlistItems", JSON.stringify([...items]));
};

export const isWishlistedInLocal = (sku) => {
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
  let items = new Set(wishlistItems);
  if (items.has(sku)) {
    return true;
  } else {
    return false;
  }
};

export const saveWishlistForUserFromLocal = async (userName) => {
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
  localStorage.removeItem("wishlistItems");
  if (!wishlistItems) return;
  const wishlistBaseUrl = process.env.REACT_APP_WISHLIST_BACKEND_BASE_URL;
  const response = await axios
    .post(`${wishlistBaseUrl}/add-all/${userName}`, {
      userName,
      productSkus: wishlistItems
    })
    .catch((error) => {
      console.error(error);
    });
  const responseStatus = response.data.status;
  if (responseStatus == HttpStatusCode.Ok) return true;
  return false;
};
