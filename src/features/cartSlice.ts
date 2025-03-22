import { ICart } from "@/@types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  value: ICart[];
  totalQuantity: number;
}

const initialState: CartState = {
  value: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<{ items: ICart[] }>) {
      state.value = action.payload.items;
      state.totalQuantity = action.payload.items.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );
    },
    addToCart(state, action: PayloadAction<{_id: string}>) {
    // addToCart(state, action: PayloadAction<ICart>) {
      const productIndex = state.value.findIndex((product) => product._id === action.payload._id);

      if (productIndex > -1 && state.value[productIndex]) {
        state.value[productIndex].quantity = (state.value[productIndex].quantity || 0) + 1;
      } else {
        state.value.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    setQuantity(state, action: PayloadAction<{ _id: string; quantity: number }>) {
      const productIndex = state.value.findIndex((product) => product._id === action.payload._id);
      if (productIndex > -1 && state.value[productIndex]) {
        state.totalQuantity += action.payload.quantity - (state.value[productIndex].quantity || 0);
        state.value[productIndex].quantity = action.payload.quantity;
      }
    },
    deleteFromCart(state, action: PayloadAction<{ _id: string }>) {
      state.value = state.value.filter((product) => product._id !== action.payload._id);
      state.totalQuantity = state.value.reduce((acc, item) => acc + (item.quantity || 0), 0);
    },
    clearCart(state) {
      state.value = [];
      state.totalQuantity = 0;
    }
  },
});

export const { addToCart, setQuantity, deleteFromCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
