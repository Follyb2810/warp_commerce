import { ICartResponseData } from "@/@types/types";
import { useUserCartQuery } from "@/api/cartService";
import { setCart } from "@/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";

export default function useSetCart() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data } = useUserCartQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isAuthenticated && data?.data?.items) {
      dispatch(setCart({ items: data.data.items ?? [] }));
    } else {
      dispatch(setCart({ items: [] }));
    }
  }, [isAuthenticated, data, dispatch]);

  return { cart: data?.data as ICartResponseData ?? { items: [] } };
}
