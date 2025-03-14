import AppButton from "../shared/AppButton";

interface QuantitySelectorProps {
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

export default function QuantitySelector({ quantity, increment, decrement }: QuantitySelectorProps) {
  return (
    <div className="flex items-center justify-between mt-2 border rounded-full p-2 w-full">
      <AppButton
        onClick={decrement}
        disabled={quantity === 0}
        className={`px-3 py-1 rounded-full text-sm ${
          quantity === 0 ? "text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
        }`}
        label="-"
      />
      <span className="text-sm font-medium">{quantity}</span>
      <AppButton
        onClick={increment}
        className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
        label="+"
      />
    </div>
  );
}
