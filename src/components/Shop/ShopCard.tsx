import { IProduct } from "@/@types/types";
import { RootState, useAppSelector } from "@/store";
import { useState } from "react";

export interface ShopCardProps extends IProduct {
  price: number;
  discountPrice?: number;
  discount?: number;
  inStock: boolean;
}

export default function ShopCard({
  title,
  image_of_land,
  price,
  discountPrice,
  discount,
  stock,
}: ShopCardProps) {
  const [quantity, setQuantity] = useState(0);
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const addToCart = () => {
    console.log(`Added ${quantity} ${title} to cart`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white relative">
      {discount && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          {discount}%
        </span>
      )}

      <img src={image_of_land} alt={title} className="w-full h-40 object-cover rounded-md" />

      <h3 className="text-sm font-semibold mt-2">{title}</h3>

      {stock > 0 ? (
        <p className="text-green-500 text-xs">IN STOCK</p>
      ) : (
        <p className="text-red-500 text-xs">OUT OF STOCK</p>
      )}

      <div className="flex items-center space-x-2 mt-2">
        {discountPrice ? (
          <>
            <p className="text-red-500 font-bold">${discountPrice.toFixed(2)}</p>
            <p className="line-through text-gray-400 text-sm">${price.toFixed(2)}</p>
          </>
        ) : (
          <p className="font-bold">${price.toFixed(2)}</p>
        )}
      </div>


      <div className="flex items-center justify-between mt-2 border rounded-full p-2 w-full">
        <button
          onClick={decrement}
          disabled={quantity === 0}
          className={`px-3 py-1 rounded-full text-sm ${
            quantity === 0 ? "text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          -
        </button>
        <span className="text-sm font-medium">{quantity}</span>
        <button onClick={increment} className="px-3 py-1 bg-warp-200 rounded-full hover:bg-gray-300">
          +
        </button>
      </div>

      {isAuthenticated && quantity > 0 && (
        <button
          onClick={addToCart}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
