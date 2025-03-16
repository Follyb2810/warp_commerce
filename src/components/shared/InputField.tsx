import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FormFieldProps {
  id: string;
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "textarea" | "password" | 'number' | 'file';// "textarea" | "text" | "email" | "tel" | "password" 
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  errorMessage?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  containerClassName?: string;
  icon?: React.ReactNode; 
  onIconClick?: () => void; 
}

export function InputField({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  className = "",
  containerClassName = "",
  value,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
  icon,
  onIconClick,
}: FormFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const borderColor = errorMessage
    ? "border-red-500 focus:ring-red-500"
    : "border-[#E7E7E8] dark:border-gray-600 focus:ring-codeline-200";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <Label htmlFor={id} className="text-gray-800 dark:text-gray-200 text-lg block mb-2">
          {label}
          {required && <span className="text-red-500 font-black ml-[2px]">*</span>}
        </Label>
      )}
      <div className="relative w-full">
        {type === "textarea" ? (
          <Textarea
            id={id}
            placeholder={placeholder}
            required={required}
            value={value}
            name={id}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            className={`min-h-[200px] bg-[#F9F9F9] dark:bg-gray-800 text-black dark:text-white py-6 ${borderColor} ${className}`}
          />
        ) : (
          <>
            <Input
              id={id}
              type={type === "password" && isPasswordVisible ? "text" : type}
              placeholder={placeholder}
              required={required}
              value={value}
              disabled={disabled}
              name={id}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              className={`bg-[#F9F9F9] dark:bg-gray-800 text-black dark:text-white py-6 pr-10 ${borderColor} ${className}`}
              autoComplete={type === "password" ? "current-password" : "new-password"}
              step={type === "number" ? "0.0001" : undefined}
              min={type === "number" ? "0" : undefined}
              
            />


            {icon && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                onClick={onIconClick}
              >
                {icon}
              </Button>
            )}

            {/* Password Toggle Button */}
            {type === "password" && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </Button>
            )}
          </>
        )}
        {errorMessage && <p className="absolute text-red-500 text-sm mt-1">{errorMessage}</p>}
      </div>
    </div>
  );
}
