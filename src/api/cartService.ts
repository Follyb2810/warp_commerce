import { baseDomain } from "./BaseDomain";

export const cartService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: ({ productId, quantity }: { productId: string; quantity: number }) => ({
        url: "/cart/add_to_cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: [{ type: "Cart" },{ type: "Product" }], 
    }),
    buyFromCart: build.mutation({
      query: ({
        productId,
        quantity,
      }: {
        productId: string;
        quantity: number;
      }) => ({
        url: "/cart/buy_from_cart",
        method: "POST",
        body: { productId, quantity },
      }),
      // providesTags: [],
        invalidatesTags: ( { productId }) => [{ type: 'Cart', id :productId},{ type: "Product" }],
    }),

    removeFromCart: build.mutation({
      query: ({ productId, quantity }: { productId: string; quantity: number }) => ({
        url: "/cart/remove_from_cart", 
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: ({ productId }) => [{ type: "Cart", id: productId },{ type: "Product" }], 
    }),
    deleteFromCart: build.mutation({
      query: ({ cartId }: { cartId: string }) => ({
        url: `/cart/${cartId}`, 
        method: "DELETE",
        // body: {  },
      }),
      invalidatesTags: ({ cartId }) => [{ type: "Cart", id: cartId }], 
    }),//

    userCart: build.query({
      query: () => "/cart/user_cart",
      providesTags: [{ type: "Cart" },{ type: "Product" },{ type: "Order" }],
    }),

    allProduct: build.query({
      query: () => "/product",
      providesTags: [{ type: "Product" }],
    }),

  
    singleProduct: build.query({
      query: (id) => `/product/${id}`,
      providesTags: (_,__,id) => [{ type: "Product", id }],
    }),
    
  }),

  overrideExisting: false,
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation, 
  useAllProductQuery,
  useSingleProductQuery,
  useUserCartQuery,
  useDeleteFromCartMutation,
  useBuyFromCartMutation
} = cartService;
