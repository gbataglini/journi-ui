import React from "react";
import styles from "./ui.module.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  buttonColour?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  buttonColour = "coral",
  disabled = false,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={() => onClick()}
      className={styles[buttonColour]}
    >
      {text}
    </button>
  );
};

export default Button;
