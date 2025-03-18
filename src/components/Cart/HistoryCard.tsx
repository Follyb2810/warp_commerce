import { useState } from "react";
import AppButton from "../shared/AppButton";
import { Copy } from "lucide-react";
import { maskAddress } from "@/utils/maskAddress";
import { RootState, useAppSelector } from "@/store";
import { cancelEscrow, releaseFunds } from "@/utils/escrowService";
import { IApiResponse, IUserOrderHistory } from "@/@types/types";
import { useUpdateOrderStatusMutation } from "@/api/orderService";

interface HistoryCardProps {
  purchase: IUserOrderHistory;
  showActions?: boolean;
}

export default function HistoryCard({ purchase, showActions = false }: HistoryCardProps) {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [error, setError] = useState("");
  const [releaseFund, { isLoading }] = useUpdateOrderStatusMutation();

  const handleReleaseFunds = async () => {
    try {
      if (!user?.walletAddress) {
        setError("Wallet address is required to release funds.");
        return;
      }
      setError("");

      const releaseFundResult = await releaseFunds(user.walletAddress);

      if (releaseFundResult?.transactionHash) {
        const response: IApiResponse = await releaseFund({
          status: "release",
          orderId: purchase._id,
        }).unwrap();

        console.log("Order status updated:", response);
      } else {
        console.log("Release fund failed: Transaction failed");
      }
    } catch (error) {
      console.error("Error releasing funds:", error);
      setError("Failed to release funds. Please try again.");
    }
  };
  const handleCancelOrder = async () => {
    try {
      if (!user?.walletAddress) {
        setError("Wallet address is required to release funds.");
        return;
      }
      setError("");

      const cancelFundofOrderResult = await cancelEscrow(user.walletAddress);

      if (cancelFundofOrderResult?.transactionHash) {
        const response: IApiResponse = await releaseFund({
          status: "canceled",
          orderId: purchase._id,
        }).unwrap();

        console.log("Order status updated:", response);
      } else {
        console.log("Release fund failed: Transaction failed");
      }
    } catch (error) {
      console.error("Error releasing funds:", error);
      setError("Failed to release funds. Please try again.");
    }
  };

  const { txHash, amount } = purchase.payment;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div key={purchase._id} className="border p-4 rounded-lg shadow-lg w-full">
      <div className="flex items-center justify-between">
        <p className="text-gray-700 break-words">
          <strong>Transaction Hash:</strong> {maskAddress(txHash)}
        </p>
        <AppButton
          onClick={handleCopy}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
          rightIcon={<Copy size={16} />}
          label={copied ? "Copied!" : "Copy"}
          variant={copied ? "default" : "outline"}
        />
      </div>

      <p className="text-gray-700">
        <strong>Amount:</strong> {amount} NTRN
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> {purchase.status}
      </p>
      <p className="text-gray-700">
        <strong>Date:</strong> {new Date(purchase.createdAt).toLocaleString()}
      </p>

      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchase.items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 border p-2 rounded">
            <img
              src={item.product?.image_of_land}
              alt="Product"
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <p className="font-semibold">Price: {item?.price} NTRN</p>
              <p>Quantity: {item.quantity}</p>
              {/* <p>Stock: {item.product?.stock}</p> */}
            </div>
          </div>
        ))}
      </div>

      {showActions && (
        <div className="mt-4 flex gap-4">
          <AppButton 
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded" 
          isLoading={isLoading}
            disabled={isLoading || !user?.walletAddress}
          onClick={handleCancelOrder}
           label="Cancel Order" 
          />
          <AppButton
            className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
            onClick={handleReleaseFunds}
            disabled={isLoading || !user?.walletAddress}
            label="Release Fund"
            isLoading={isLoading}
          />
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
