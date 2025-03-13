import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductProps {
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  discount?: number;
  inStock: boolean;
}

export default function ProductCart({ title, image, price, discountPrice, discount, inStock }: ProductProps) {
  const [quantity, setQuantity] = useState(0);

  return (
    <Card className="p-4 rounded-lg shadow-md bg-white relative">
      {discount && <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{discount}%</span>}
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-sm font-semibold mt-2">{title}</h3>
      <p className={`text-xs ${inStock ? "text-green-500" : "text-red-500"}`}>{inStock ? "IN STOCK" : "OUT OF STOCK"}</p>
      <div className="flex items-center space-x-2 mt-2">
        {discountPrice ? (
          <>
            <p className="text-red-500 font-bold">${discountPrice}</p>
            <p className="line-through text-gray-400 text-sm">${price}</p>
          </>
        ) : (
          <p className="font-bold">${price}</p>
        )}
      </div>
      <div className="flex justify-between mt-2 border rounded-2xl p-1">
        <Button variant="ghost" className="rounded-full px-3" onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</Button>
        <input type="text" value={quantity} readOnly className="w-10 text-center bg-transparent" />
        <Button variant="ghost" className="rounded-full px-3" onClick={() => setQuantity(quantity + 1)}>+</Button>
      </div>
    </Card>
  );
}
