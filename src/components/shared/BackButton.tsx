import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AppButton
      onClick={handleGoBack}
      className="flex items-center text-warp-100 bg-warp-200 hover:text-white focus:outline-none my-5"
    >
      <ChevronLeft className="h-6 w-6 mr-2" />
      <span>Go Back</span>
    </AppButton>
  );
};

export default BackButton;
