import { Card, CardContent } from "@/components/ui/card";
import { CartItem, ICartResponseData } from "@/@types/types";
import AppButton from "../shared/AppButton";
import { useCartActions } from "@/hooks/useCartActions";
import { useState, useEffect } from "react";
import QuantitySelector from "../shared/QuantitySelector";

interface CartProps {
  cart: ICartResponseData;
  onCheckout?: () => void;
}

export default function BuyerCartTab({ cart, onCheckout }: CartProps) {
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    cart.items.forEach((item) => {
      initialQuantities[item._id] = item.quantity;
    });
    setItemQuantities(initialQuantities);
  }, [cart.items]);

  const {
    handleRemoveCart,
    handleClearCart,
    removeLoad,
    deleteLoad,
    handleBuyFromCart,
    buyLoad,
    orderConfirmLoad,
    keepLoad,
  } = useCartActions();

  const incrementItem = (itemId: string) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const decrementItem = (itemId: string) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  const handleRemoveItem = (productId?: string, quantity?: number) => {
    if (productId) {
      handleRemoveCart(productId, quantity ?? 1);
    } else {
      console.error("Product ID is undefined");
    }
  };

  const calculateItemTotal = (item: CartItem) => {
    const quantity = itemQuantities[item._id] || item.quantity;
    return item.price * quantity;
  };

  const calculateCartTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + calculateItemTotal(item);
    }, 0);
  };

  return (
    <div className="w-full mx-auto py-4">
      <Card>
        <CardContent>
          {cart.items.length > 0 ? (
            <div className="space-y-4">
              {cart.items.map((item: CartItem, index: number) => (
                <div
                  key={`${item._id}-${index}`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.product.image_of_land}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.product.description}
                    </p>
                    <p className="font-semibold text-lg">
                      ${calculateItemTotal(item)}
                    </p>
                    {item.product.stock >=
                    (itemQuantities[item._id] || item.quantity) ? (
                      <p className="text-green-500 text-xs">
                        IN STOCK ({item.product.stock} available)
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
                        handleRemoveItem(
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
              ))}

              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold">
                  Total: ${calculateCartTotal()}
                </span>
                <AppButton
                  onClick={onCheckout}
                  className="px-6 py-2"
                  label="Checkout"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <AppButton
                  onClick={() => handleClearCart(cart._id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700"
                  label="Delete All"
                  isLoading={deleteLoad}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
