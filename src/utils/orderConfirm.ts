
import { useOrderPaymentConfirmMutation } from "@/api/orderService";
import { IApiResponse } from "@/@types/types";

export const confirmOrder = async (
  orderConfirm: ReturnType<typeof useOrderPaymentConfirmMutation>[0],
  _id: string,
  quantity: number,
  transactionHash: string
) => {
  try {
    const response: IApiResponse = await orderConfirm({
      productId: _id,
      quantity,
      transactionHash,
    }).unwrap();

    console.log("Order confirmed:", response);
    return response;
  } catch (error) {
    console.error("Error confirming order:", error);
    return null;
  }
};
