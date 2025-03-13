import { Button } from "@/components/ui/button";

interface ProductInfoProps {
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  description: string;
  specialOfferEnds: string;
}

export default function ProductInfo({ title, price, oldPrice, rating, description, specialOfferEnds }: ProductInfoProps) {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">⭐ {rating.toFixed(2)}</span>
        <span className="text-gray-500 ml-2">(2 reviews)</span>
      </div>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="flex items-center space-x-3 mt-3">
        <span className="text-red-500 font-bold text-xl">${price.toFixed(2)}</span>
        {oldPrice && <span className="line-through text-gray-400">${oldPrice.toFixed(2)}</span>}
      </div>
      <div className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded mt-2">
        Special Offer: <span className="font-bold">{specialOfferEnds}</span> remaining
      </div>
      <div className="flex space-x-3 mt-4">
        <Button className="bg-blue-600 text-white px-4 py-2">Add to Cart</Button>
        <Button variant="outline">Buy Now</Button>
      </div>
    </div>
  );
}
