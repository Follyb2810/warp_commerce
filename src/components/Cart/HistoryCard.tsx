import { useState } from "react";
import { IPurchaseHistory } from "./HistoryTab";
import AppButton from "../shared/AppButton";
import { Copy } from "lucide-react";
import { maskAddress } from "@/utils/maskAddress";
import { RootState, useAppSelector } from "@/store";
import { releaseFunds } from "@/utils/escrowService";

export default function HistoryCard({ purchase }: { purchase: IPurchaseHistory }) {
  const [copied, setCopied] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [error, setError] = useState("");

  const handleReleaseFunds = () => {
    if (!user?.walletAddress) {
      setError("Wallet address is required to release funds.");
      return;
    }
    setError("");
    releaseFunds(user.walletAddress);
  };

  const { txHash, amount } = purchase.payment;
  const showButtons = purchase.status.toLowerCase() === "pending";

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
        <strong>Amount:</strong> {amount} ETH
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
              <p>Stock: {item.product?.stock}</p>
            </div>
          </div>
        ))}
      </div>

      {showButtons && (
        <div className="mt-4 flex gap-4">
          <AppButton className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded" label="Cancel Order"/>
          <AppButton
            className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
            onClick={handleReleaseFunds}
            disabled={!user?.walletAddress}
            label="Release Fund"
          />
        </div>
      )}
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
