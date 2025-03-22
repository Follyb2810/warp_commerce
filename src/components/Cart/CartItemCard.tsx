import { CartItem } from "@/@types/types";
import AppButton from "../shared/AppButton";
import QuantitySelector from "../shared/QuantitySelector";

interface CartItemProps {
  item: CartItem;
  itemQuantities: Record<string, number>;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  handleBuyFromCart: (productId: string, quantity: number) => void;
  handleRemoveCart: (productId: string, quantity: number) => void;
  buyLoad: boolean;
  orderConfirmLoad: boolean;
  keepLoad: boolean;
  removeLoad: boolean;
  // buyLoading:Record<string,boolean>
}

export default function CartItemCard({
  item,
  itemQuantities,
  incrementItem,
  decrementItem,
  handleBuyFromCart,
  handleRemoveCart,
  buyLoad,
  orderConfirmLoad,
  keepLoad,
  removeLoad,
}: CartItemProps) {
  const itemTotal = item.price * (itemQuantities[item._id] || item.quantity);

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <img
        src={item?.product?.image_of_land}
        alt={item?.product?.title}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item?.product?.title}</h3>
        <p className="text-sm text-gray-600">{item?.product?.description}</p>
        <p className="font-semibold text-lg">${itemTotal.toFixed(6)}</p>
        {item?.product?.stock >= (itemQuantities[item._id] || item.quantity) ? (
          <p className="text-green-500 text-xs">
            IN STOCK ({item?.product?.stock} available)
          </p>
        ) : (
          <p className="text-red-500 text-xs">OUT OF STOCK</p>
        )}

        <QuantitySelector
          quantity={itemQuantities[item._id] || item.quantity}
          decrement={() => decrementItem(item._id)}
          increment={() => incrementItem(item._id)}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <AppButton
          onClick={() =>
            handleBuyFromCart(
              item?.product?._id,
              itemQuantities[item._id] || item.quantity
            )
          }
          className="px-4 py-2 w-full"
          label="Buy"
          isLoading={buyLoad || orderConfirmLoad || keepLoad}
        />

        <AppButton
          onClick={() =>
            handleRemoveCart(
              item?.product?._id,
              itemQuantities[item._id] || item.quantity
            )
          }
          className="px-4 py-2 w-full bg-red-500 hover:bg-red-600"
          label="Remove"
          isLoading={removeLoad}
        />
      </div>
    </div>
  );
}
