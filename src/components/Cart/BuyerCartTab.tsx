import { Card, CardContent } from "@/components/ui/card";
import { CartItem, ICartResponseData } from "@/@types/types";
import AppButton from "../shared/AppButton";
import { useCartActions } from "@/hooks/useCartActions";
import QuantitySelector from "../shared/QuantitySelector";

interface CartProps {
  cart: ICartResponseData;
  onCheckout?: () => void;
}

export default function BuyerCartTab({ cart, onCheckout }: CartProps) {
  const { handleRemoveCart, handleClearCart, removeLoad,decrement,deleteLoad,increment ,quantity} = useCartActions();

  const handleRemoveItem = (productId?: string) => {
    if (productId) {
      handleRemoveCart(productId);
    } else {
      console.error("Product ID is undefined");
    }
  };

  const handleBuy = (itemId: string) => {
    alert(`Buy ${itemId}`);
  };




  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardContent>
          {cart.items.length > 0 ? (
            <div className="space-y-4">
              {cart.items.map((item: CartItem, index: number) => (
                <div key={`${item._id}-${index}`} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.product.image_of_land}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-sm text-gray-600">{item.product.description}</p>
                    <p className="font-semibold text-lg">${item.price * item.quantity}</p>
                    
                    <QuantitySelector 
                      quantity={quantity} 
                      increment={increment} 
                      decrement={decrement} 
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <AppButton
                      onClick={() => handleBuy(item._id)}
                      className="px-4 py-2 w-full"
                      label="Buy"
                    />

                    <AppButton
                      onClick={() => handleRemoveItem(item?.product?._id)}
                      className="px-4 py-2 w-full bg-red-500 hover:bg-red-600"
                      label="Remove"
                      isLoading={removeLoad}
                      disabled={quantity == 0}
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold">Total: ${cart.total}</span>
                <AppButton onClick={onCheckout} className="px-6 py-2" label="Checkout"/>
              </div>

              <div className="pt-4 flex justify-end">
                <AppButton
                  onClick={() =>handleClearCart(cart._id)}
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
