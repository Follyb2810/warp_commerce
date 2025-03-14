import { ICart } from "@/@types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		value: [] as ICart[], 
	},
	reducers: {
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
		},
		setQuantity(state, action: PayloadAction<{ _id: string; quantity: number }>) {
			const { _id, quantity } = action.payload;
			const productIndex = state.value.findIndex(product => product._id === _id);

			if (productIndex > -1) { 
				state.value[productIndex].quantity = quantity;
			}
		},
		deleteFromCart(state, action: PayloadAction<{ _id: string }>) {
			const { _id } = action.payload;
			state.value = state.value.filter(product => product._id !== _id); 
		}
	}
});

export const { addToCart, setQuantity, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;



