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
			state.totalQuantity = action.payload.items.reduce((acc, item) => acc + (item.quantity || 0), 0);
		  },
		addToCart(state, action: PayloadAction<ICart>) {
			const { _id, title, image_of_land, price } = action.payload;
			const productIndex = state.value.findIndex(
				product => product._id === _id 
			);

			if (productIndex > -1) {
				state.value[productIndex].quantity = (state.value[productIndex].quantity || 1) + 1;
			} else {
				state.value.push({ _id, quantity: 1, title, image_of_land, price });
			}
			
			state.totalQuantity += 1;
		},
		setQuantity(state, action: PayloadAction<{ _id: string; quantity: number }>) {
			const { _id, quantity } = action.payload;
			const productIndex = state.value.findIndex(product => product._id === _id);

			if (productIndex > -1) {
				state.totalQuantity += quantity - (state.value[productIndex].quantity || 0); 
				state.value[productIndex].quantity = quantity;
			  }
		},
		deleteFromCart(state, action: PayloadAction<{ _id: string }>) {
			const { _id } = action.payload;
			const product = state.value.find(p => p._id === _id);
			if (product) {
				state.totalQuantity -= product.quantity || 0; 
				state.value = state.value.filter(product => product._id !== _id);
			  }
		}
	}
});

export const { addToCart, setQuantity, deleteFromCart,setCart } = cartSlice.actions;
export default cartSlice.reducer;



