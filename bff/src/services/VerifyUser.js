import { toggleToastNotification } from "./ToggleToast";

export const isUserVerified = (userName) => {
  const isLoggedInUser =
    localStorage.getItem("userName") === userName &&
    JSON.parse(localStorage.getItem("isLoggedIn")) === true;
  if (!isLoggedInUser) {
    toggleToastNotification("Login to continue!", "login-msg-id");
    return false;
  }
  return true;
};
