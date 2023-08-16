import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let isLoggedIn =
    localStorage.getItem("userName") &&
    JSON.parse(localStorage.getItem("isLoggedIn")) === true;

  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/" />
  );
};

export default PrivateRoutes;
