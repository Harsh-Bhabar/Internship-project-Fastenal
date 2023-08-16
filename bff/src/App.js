import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import ScrollToTop from "./providers/ScrollToTop";
import OrderSummaryPage from "./pages/OrderSummaryPage/OrderSummaryPage";

import PrivateRoutes from "./utils/PrivateRoutes";
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:sku" element={<ProductPage />} />
          <Route
            path="/search-results/:searchQuery"
            element={<SearchResultsPage />}
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/wishlist/:userName" element={<WishlistPage />} />
            <Route path="/cart/:userName" element={<CartPage />} />
            <Route path="/orders/:userName" element={<OrdersPage />} />
            <Route
              path="/order-summary/:userName/:orderId"
              element={<OrderSummaryPage />}
            />
            <Route path="/profile/:userName" element={<ProfilePage />} />
            <Route
              path="/admin-dashboard/:activeTab"
              element={<AdminDashboardPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        toastStyle={{
          backgroundColor: "var(--primary-color)",
          color: "white",
          fontWeight: "500",
          fontSize: "1.1rem",
          boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
          padding: "1rem",
        }}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
