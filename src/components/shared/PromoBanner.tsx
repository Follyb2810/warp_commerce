import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PromoBannerProps } from "@/@types/types";



const PromoBanner: FC<PromoBannerProps> = ({
  discountText,
  title,
  subTitle,
  buttonText,
  imageUrl,
  bgColor = "bg-white",
}) => {
  return (
    <Card className={`overflow-hidden rounded-xl shadow-md ${bgColor} w-full`}>
      <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
    
        <div className="sm:w-1/2">
          <p className="text-red-600 text-sm font-semibold mb-2">
            {discountText}
          </p>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-gray-600 mb-4">{subTitle}</p>
          <Button variant="default" className="bg-blue-600 text-white">
            {buttonText}
          </Button>
        </div>
        <div className="sm:w-1/2 flex justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="object-contain w-full max-w-xs h-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoBanner;
