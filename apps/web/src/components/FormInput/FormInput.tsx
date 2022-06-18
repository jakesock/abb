// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/require-default-props */
import { useField, useFormikContext } from "formik";
import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    placeholder: string;
    password?: boolean;
    textarea?: boolean;
  };

export const FormInput: React.FC<InputFieldProps> = ({
  label,
  size: _,
  rows,
  password = false,
  textarea = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [field, { error, touched }] = useField(props);
  const { handleBlur } = useFormikContext();

  const onFocus = () => setIsFocused(true);
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    handleBlur(event); // Formik uses onVlur events for validation, etc. so handleBlur needed to keep this behavior
  };
  const onClick = () => {
    setShowPassword(!showPassword);
    inputRef.current?.focus(); // Keep focus on an input when show/hide password is clicked
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, [showPassword]);

  if (password) {
    return (
      <div>
        <label htmlFor={field.name}>{label}</label>
        <input
          id={field.name}
          type={showPassword ? "text" : "password"}
          onFocus={onFocus}
          ref={inputRef}
          {...field}
          {...props}
          onBlur={onBlur}
        />
        <button
          type="button"
          onClick={onClick}
          style={{
            color: isFocused ? "black" : "gray",
          }}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      {textarea ? (
        <textarea id={field.name} rows={rows} {...field} {...props} />
      ) : (
        <input id={field.name} {...field} {...props} />
      )}
      {error && touched ? <p>{error}</p> : null}
    </div>
  );
};
