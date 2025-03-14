import { useDeleteFromCartMutation, useRemoveFromCartMutation } from "@/api/cartService";
import { useCallback } from "react";
import { IApiResponse } from "@/@types/types";

export function useCartActions() {
  const [removeCart, { isLoading: removeLoad }] = useRemoveFromCartMutation();
  const [deleteCart, { isLoading: deleteLoad }] = useDeleteFromCartMutation();

  const handleRemoveCart = useCallback(async (productId: string, quantity: number) => {
    console.log({productId})
    console.log(quantity)
    try {
      const response: IApiResponse = await removeCart({ productId, quantity }).unwrap();
      console.log("Removed:", response);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, [removeCart]);
  
  const handleClearCart = useCallback(async (cartId: string) => {
    console.log({cartId})
    try {
      const response: IApiResponse = await deleteCart({ cartId }).unwrap();
      console.log("Removed:", response);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }, [deleteCart]);

  return { handleRemoveCart, removeLoad,deleteLoad,handleClearCart };
}
