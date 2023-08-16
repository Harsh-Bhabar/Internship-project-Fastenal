import { toast } from "react-toastify";
import ErrorIcon from "../icons/ErrorIcon";
import InformationIcon from "../icons/InformationIcon";
import SuccessIcon from "../icons/SuccessIcon";

export const toggleToastNotification = (message, id, status = null) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    icon:
      status === "success"
        ? SuccessIcon
        : status === "error"
        ? ErrorIcon
        : InformationIcon,
    toastId: id,
  });
};
