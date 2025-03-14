import { useState, useCallback, useMemo } from "react";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { useAddToCartMutation } from "@/api/cartService";
import { useOrderAvailableMutation, useOrderPaymentConfirmMutation } from "@/api/orderService";

export const useProductActions = (_id: string) => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [orderAvailable, { isLoading: orderLoad }] = useOrderAvailableMutation();
  const [orderConfirm, { isLoading: orderPayConfirm }] = useOrderPaymentConfirmMutation();

  const isAddingToCart = useMemo(() => isLoading, [isLoading]);

  const handleAddToCart = useCallback(async () => {
    try {
      const response: IApiResponse = await addToCart({ quantity, productId: _id }).unwrap();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [_id, quantity, addToCart]);

  const handleBuyOrder = useCallback(async () => {
    try {
      const response: IApiResponse = await orderAvailable({ productId: _id, quantity }).unwrap();
      if (response.status === 200) {
        const available = response.data as IAvailableOrder;
        const { price, productId, quantity, seller, sellerAddress, totalAmount } = available;
        console.log({ price, productId, quantity, seller, sellerAddress, totalAmount });

        console.log("Make payment here...");
        const confirmResponse: IApiResponse = await orderConfirm({ productId: _id, quantity }).unwrap();
        console.log(confirmResponse);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [_id, quantity, orderAvailable, orderConfirm]);

  return {
    quantity,
    increment,
    decrement,
    isAddingToCart,
    orderLoad,
    orderPayConfirm,
    handleAddToCart,
    handleBuyOrder,
  };
};
