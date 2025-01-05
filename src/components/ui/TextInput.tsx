import React, { useState } from "react";
import styles from "./ui.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
interface TextInputProps {
  label?: string;
  value: string;
  onChange: (e: string) => void;
  placeholder: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  function setInputType() {
    if (type === "password") {
      if (passwordVisible) {
        return "text";
      } else {
        return "password";
      }
    } else {
      return type;
    }
  }
  return (
    <div className={styles.column}>
      {value !== undefined && value.length > 0 && (
        <label className={styles.inputLabel}> {label?.toLowerCase()}</label>
      )}

      <div className={styles.inputWrapper}>
        <input
          placeholder={placeholder}
          className={styles.inputField}
          type={setInputType()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {type === "password" &&
          (passwordVisible ? (
            <IoMdEyeOff
              size={18}
              className={styles.visibilityIcon}
              onClick={() => setPasswordVisible(false)}
            />
          ) : (
            <IoMdEye
              size={18}
              className={styles.visibilityIcon}
              onClick={() => setPasswordVisible(true)}
            />
          ))}
      </div>
    </div>
  );
};
export default TextInput;
