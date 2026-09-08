
import Swal from "sweetalert2";

export const showToast = (
  title: string,
  icon: "success" | "error" | "warning" | "info" = "success"
) => {
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#0dcaf0",
  };

  const textColors = {
    success: "#ffffff",
    error: "#ffffff",
    warning: "#212529",
    info: "#ffffff",
  };

  return Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,

    background: colors[icon],
    color: textColors[icon],

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};