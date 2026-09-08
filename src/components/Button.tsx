
import React from "react";
import "../css/Button.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  disabled?: boolean;
  variant?: "default" | "receive" | "approve" | "fee" | "print";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  className = "",
  title,
  disabled = false,
  variant = "default",
}) => {
  return (
    <button
      type={type}
      className={`common-btn btn-${variant} ${className}`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
