import { useDeleteFromCartMutation, useRemoveFromCartMutation } from "@/api/cartService";
import { useCallback, useState } from "react";
import { IApiResponse } from "@/@types/types";

export function useCartActions() {
  const [removeCart, { isLoading: removeLoad }] = useRemoveFromCartMutation();
  const [deleteCart, { isLoading: deleteLoad }] = useDeleteFromCartMutation();
    const [quantity, setQuantity] = useState<number>(0);
  
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleRemoveCart = useCallback(async (productId: string) => {
  // const handleRemoveCart = useCallback(async (productId: string, quantity: number) => {
    console.log({productId})
    console.log(quantity)
    try {
      const response: IApiResponse = await removeCart({ productId, quantity }).unwrap();
      console.log("Removed:", response);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, [removeCart,quantity]);
  
  const handleClearCart = useCallback(async (cartId: string) => {
    console.log({cartId})
    try {
      const response: IApiResponse = await deleteCart({ cartId }).unwrap();
      console.log("Removed:", response);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, [deleteCart]);

  return { handleRemoveCart, removeLoad,deleteLoad,handleClearCart ,increment,decrement,quantity};
}
