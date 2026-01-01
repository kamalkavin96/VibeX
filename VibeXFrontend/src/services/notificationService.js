import { toast } from "react-toastify";

const baseOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/* -------- SUCCESS -------- */
export const notifySuccess = async (message, options = {}) =>
  toast.success(message, { ...baseOptions, ...options });

/* -------- ERROR -------- */
export const notifyError = (message, options = {}) =>
  toast.error(message, { ...baseOptions, ...options });

/* -------- INFO -------- */
export const notifyInfo = async (message, options = {}) =>
  toast.info(message, { ...baseOptions, ...options });

/* -------- WARNING -------- */
export const notifyWarning = (message, options = {}) =>
  toast.warning(message, { ...baseOptions, ...options });

/* -------- LOADING (ASYNC) -------- */
export const notifyLoading = (message, options = {}) =>
  toast.loading(message, { ...baseOptions, ...options });

/* -------- UPDATE EXISTING TOAST -------- */
export const updateToast = (toastId, type, message, options = {}) =>
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: 3000,
    ...options,
  });
