interface ApiStatusMessageProps {
    isLoading: boolean;
    error: unknown;
    loadingText?: string;
    errorText?: string;
  }
  
  const ApiStatusMessage: React.FC<ApiStatusMessageProps> = ({ 
    isLoading, 
    error, 
    loadingText = "Loading...", 
    errorText = "Something went wrong. Please try again." 
  }) => {
    if (isLoading) {
      return <p className="text-center text-gray-500">{loadingText}</p>;
    }
  
    if (error) {
      return <p className="text-center text-red-500">{errorText}</p>;
    }
  
    return null;
  };
  
  export default ApiStatusMessage;
  