import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; 
import React from "react";

interface IAppButton extends React.ComponentProps<typeof Button> {
  label?: string;
  isLoading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  buttonStyle?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export default function AppButton({
  label = "Submit",
  buttonStyle = "",
  rightIcon,
  isLoading = false,
  textStyle = "",
  disabled = false,
  leftIcon,
  onPress,
  ...rest 
}: IAppButton) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`flex items-center justify-center ${buttonStyle}`}
      onClick={onPress}
      {...rest} 
    >
      {!isLoading && leftIcon && <span className="ml-2">{leftIcon}</span>}
      {isLoading && <Loader2 className="animate-spin mr-2" size={20} />}
      {!isLoading && <span className={`${textStyle}`}>{label}</span>}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Button>
  );
}
