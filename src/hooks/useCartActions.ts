import { useBuyFromCartMutation, useDeleteFromCartMutation, useRemoveFromCartMutation } from "@/api/cartService";
import { useCallback, useState } from "react";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { confirmOrder } from "@/utils/orderConfirm";
import { initEscrow } from "@/utils/escrowService";
import { useOrderPaymentConfirmMutation } from "@/api/orderService";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useToast } from "./useToast";
import { clearCart as clearCartFromReducer, deleteFromCart as deleteFromCartReducer } from "@/features/cartSlice";

export function useCartActions() {
  const [removeCart, { isLoading: removeLoad }] = useRemoveFromCartMutation();
  const [deleteCart, { isLoading: deleteLoad }] = useDeleteFromCartMutation();
  const [keepLoad, setKeepLoad] = useState(false);
  const [buyFromCart, { isLoading: buyLoad }] = useBuyFromCartMutation();
  const [orderConfirm, { isLoading: orderConfirmLoad }] = useOrderPaymentConfirmMutation();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const toast  = useToast();
  const dispatch = useAppDispatch()
  // const [buyLoading, setBuyLoading] = useState<Record<string, boolean>>({});


  const handleRemoveCart = useCallback(async (productId: string, quantity: number) => {
  
    try {
      const response: IApiResponse = await removeCart({ productId, quantity }).unwrap();
      dispatch(deleteFromCartReducer({_id:productId}))
      toast.success(response.message || "Item was successfully removed from your cart.!");
      console.log("Removed:", response);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart.");
    }
  }, [removeCart, toast]);

  const handleClearCart = useCallback(async (cartId: string) => {
    try {
      const response: IApiResponse = await deleteCart({ cartId }).unwrap();
      toast.success(response.message || "All items have been removed from your cart.");
      dispatch(clearCartFromReducer())
      console.log("Removed:", response);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear the cart.");
    }
  }, [deleteCart, toast]);

  const handleBuyFromCart = useCallback(async (productId: string, quantity: number) => {
    setKeepLoad(true);
    
    try {
      const response: IApiResponse = await buyFromCart({ productId, quantity }).unwrap();
  
      console.log("buy from cart:", response);
      if (response.status === 200) {
        toast.success(response.message || "Proceeding with payment...");
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
          toast.success("Your order has been placed successfully.");
        } else {
          console.error("Escrow transaction failed. Order confirmation skipped.");
          toast.error("Escrow transaction could not be completed.");
        }
      } else {
        toast.error(response.message || "The selected item is not available for purchase.");
      }
    } catch (error) {
      console.error("Error processing purchase:", error);
      toast.error("An error occurred while processing your order.");
    } finally {
      setKeepLoad(false);
      toast.dismiss()
    }
  }, [buyFromCart, orderConfirm, user, toast]);

  return { handleRemoveCart, removeLoad, deleteLoad, handleClearCart, handleBuyFromCart, buyLoad, orderConfirmLoad, keepLoad };
}
