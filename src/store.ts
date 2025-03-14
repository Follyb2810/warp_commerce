import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; 
import cartReducer from './features/cartSlice'; 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseDomain } from './api/BaseDomain';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [baseDomain.reducerPath]: baseDomain.reducer,
  },
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(  
      baseDomain.middleware,   
    ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
