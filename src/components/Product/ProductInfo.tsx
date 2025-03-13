import { IApiResponse, IProduct } from "@/@types/types";
import { useCallback, useState, useMemo } from "react";
import AppButton from "../shared/AppButton";
import { useAddToCartMutation } from "@/api/cartService";

interface ProductInfoProps extends IProduct {
  // _id: string;
  oldPrice?: number;
  rating?: number;
  description?: string;
  specialOfferEnds?: string;
}

export default function ProductInfo({
  title,
  price,
  oldPrice,
  rating,
  description,
  specialOfferEnds,
  _id
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(0);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const isAddingToCart = useMemo(() => isLoading, [isLoading]);
   
  console.log(_id,'thos is from product info')
  const handleAddToCart = useCallback(async () => {
    console.log("from add to cart", { quantity, productId: _id });
    try {
      const response: IApiResponse = await addToCart({
        quantity,
        productId: _id,
      }).unwrap();
      if (response.status === 200) {
          console.log(response)
            } else {
              console.log(response);
            }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [_id, quantity, addToCart]);

  return (
    <div className="w-full p-4 md:p-6 space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

      <div className="flex items-center mt-2 space-x-2">
        {rating && (
          <span className="text-yellow-500">⭐ {rating.toFixed(2)}</span>
        )}
        <span className="text-gray-500">(2 reviews)</span>
      </div>

      {description && (
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      )}

      <div className="flex items-center space-x-3 mt-3">
        {price && (
          <span className="text-red-500 font-bold text-lg md:text-xl">
            ${price.toFixed(2)}
          </span>
        )}
        {oldPrice && (
          <span className="line-through text-gray-400">
            ${oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      {specialOfferEnds && (
        <div className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded mt-2">
          Special Offer: <span className="font-bold">{specialOfferEnds}</span>{" "}
          remaining
        </div>
      )}

      <div className="flex items-center justify-between mt-4 border rounded-full p-2 w-full max-w-sm">
        <AppButton
          aria-label="Decrease quantity"
          onClick={decrement}
          disabled={quantity === 0}
          className={`px-3 py-1 rounded-full text-sm ${
            quantity === 0
              ? "text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          label="-"
        />
        <span className="text-sm font-medium">{quantity}</span>
        <AppButton
          aria-label="Increase quantity"
          onClick={increment}
          className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
          label="+"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <AppButton
          label="Add To Cart"
          className="bg-blue-600 text-white px-4 py-2 w-full sm:w-auto"
          isLoading={isAddingToCart}
          onClick={handleAddToCart}
          disabled={quantity === 0}
        />
        <AppButton label="Buy Now" className="w-full sm:w-auto" disabled={quantity === 0}/>
      </div>
    </div>
  );
}
