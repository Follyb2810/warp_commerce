import { useBuyFromCartMutation, useDeleteFromCartMutation, useRemoveFromCartMutation } from "@/api/cartService";
import { useCallback, useState } from "react";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { confirmOrder } from "@/utils/orderConfirm";
import { initEscrow } from "@/utils/escrowService";
import { useOrderPaymentConfirmMutation } from "@/api/orderService";
import { RootState, useAppSelector } from "@/store";

export function useCartActions() {
  const [removeCart, { isLoading: removeLoad }] = useRemoveFromCartMutation();
  const [deleteCart, { isLoading: deleteLoad }] = useDeleteFromCartMutation();
  const [keepLoad,setKeepLoad] = useState(false)
  
  const [buyFromCart, { isLoading: buyLoad }] = useBuyFromCartMutation();
    const [orderConfirm, { isLoading: orderConfirmLoad }] = useOrderPaymentConfirmMutation();
    const { user } = useAppSelector((state: RootState) => state.auth);
  

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
  
  const handleBuyFromCart = useCallback(async (productId: string, quantity: number) => {
    console.log({ productId, quantity });
    setKeepLoad(true);
    
    try {
      const response: IApiResponse = await buyFromCart({ productId, quantity }).unwrap();
      console.log("buy from cart:", response);
  
      if (response.status === 200) {
        const available = response.data as IAvailableOrder;
        const { totalAmount, sellerAddress } = available;
  
        console.log("Order details:", available);
        console.log("Processing payment...");
  
        const escrowResult = await initEscrow(
          user!.walletAddress,
          totalAmount.toString(),
          sellerAddress
        );
  
        if (escrowResult && escrowResult.transactionHash) {
          await confirmOrder(orderConfirm, productId, quantity, escrowResult.transactionHash);
        } else {
          console.error("Escrow transaction failed. Order confirmation skipped.");
        }
      } else {
        console.log("Order availability response:", response);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setKeepLoad(false); 
    }
  }, [buyFromCart, orderConfirm, user]);
  

  return { handleRemoveCart, removeLoad,deleteLoad,handleClearCart,handleBuyFromCart ,buyLoad,orderConfirmLoad,keepLoad};
}
