import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
// import Image from "next/image";

interface DealsOfTheWeekProps {
  image: string;
  discount: number;
  oldPrice: number;
  newPrice: number;
  title: string;
  location: string;
  stock: number;
  available: number;
  endTime: string; // Format: "YYYY-MM-DD HH:MM:SS"
}

const DealsOfTheWeek: React.FC<DealsOfTheWeekProps> = ({
  image,
  discount,
  oldPrice,
  newPrice,
  title,
  location,
  stock,
  available,
  endTime,
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
      } else {
        clearInterval(countdown);
        setTimeLeft("Offer expired");
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [endTime]);

  return (
    <Card className="border border-gray-200 shadow-lg p-6 rounded-xl">
      <h2 className="text-lg font-semibold text-gray-700">
        Deals of the <span className="text-blue-600 font-bold">week!</span>
      </h2>
      <p className="text-red-500 font-bold text-lg">{timeLeft}</p>

      <div className="flex items-center gap-3 mt-3">
        <span className="text-red-500 text-xl font-bold">{discount}%</span>
        <span className="text-gray-500">Discount</span>
      </div>

      <img src={image} alt={title} width={200} height={150} className="mx-auto my-3 rounded-md" />

      <div className="text-center">
        <p className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</p>
        <p className="text-red-500 text-2xl font-bold">${newPrice.toFixed(2)}</p>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>

      <p className="text-green-600 text-sm font-semibold mt-2">IN STOCK</p>
      <Progress value={(available / stock) * 100} className="w-full h-2 mt-2 bg-gray-200" />
      <p className="text-gray-400 text-xs mt-1">Available: {available}</p>
    </Card>
  );
};

export default DealsOfTheWeek;
