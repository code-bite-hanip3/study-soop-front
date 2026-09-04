import { useState } from "react";
import styles from "./Input.module.css";

import visibilityOff from "../../assets/btn_visibility_off.svg";
import visibilityOn from "../../assets/btn_visibility_on.svg";

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const inputType = type === "password" && isShowPassword ? "text" : type;
  const handlePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.inputWrap}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {type === "password" && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={handlePassword}
            disabled={disabled}
          >
            <img src={isShowPassword ? visibilityOn : visibilityOff} alt="" />
          </button>
        )}
      </div>
      {error && <p className={styles.inputErrorMessage}>*{error}</p>}
    </div>
  );
}
