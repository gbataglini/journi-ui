import React from "react";
import styles from "./ui.module.css";
import { IoIosAdd } from "react-icons/io";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  hasIcon: boolean;
  iconName?: string;
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
      {props.hasIcon && props.iconName === "Add" && <IoIosAdd size={20} />}
      {text}
    </button>
  );
};

export default Button;
