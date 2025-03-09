import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  className = "",
  label = "",
  disabled = false,
  error = "",
}) => {
  return (
    <div className={`form-control ${className}`}>
      {label && (
        <label className="label py-0.5">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;
