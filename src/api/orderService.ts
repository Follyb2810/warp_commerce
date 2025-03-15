import { baseDomain } from "./BaseDomain";

export const orderService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    OrderAvailable: build.mutation({
      query: ({
        productId,
        quantity,
      }: {
        productId: string;
        quantity: number;
      }) => ({
        url: "/order/available",
        method: "POST",
        body: { productId, quantity },
      }),
      // providesTags: [],
      invalidatesTags: ["Order"],
      //   invalidatesTags: ( { id }) => [{ type: 'Get_in_Touch', id }],
    }),
    OrderPaymentConfirm: build.mutation({
      query: ({
        productId,
        quantity,
        transactionHash,
      }: {
        productId: string;
        quantity: number;
        transactionHash: string;
      }) => ({
        url: "/order/confrim",
        method: "POST",
        body: { productId, quantity, transactionHash },
      }),
      // providesTags: [],
      invalidatesTags: ["Order"],
      //   invalidatesTags: ( { id }) => [{ type: 'Get_in_Touch', id }],
    }),
    // allProduct:build.query({
    //  query :()=>'/product' ,
    //  providesTags: ['Product'],
    // }),
    SingleProduct: build.query({
      query: (id) => `/order/${id}`,
      providesTags: ["Order"],
      // invalidatesTags : ['Blogs'],
    }),
    OrderHistory: build.query({
      query: () => "/order",
      providesTags: ["Order"],
      // invalidatesTags : ['Blogs'],
    }),
    UserOrder: build.query({
      query: () => "/order/user_order",
      providesTags: ["Order"],
      // invalidatesTags : ['Blogs'],
    }),
    AllOrder: build.query({
      query: () => "/order/all",
      providesTags: ["Order"],
      // invalidatesTags : ['Blogs'],
    }),
    AllUserOrder: build.query({
      query: () => "/order/all_user_order",
      providesTags: ["Order"],
      // invalidatesTags : ['Blogs'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useOrderAvailableMutation,
  useOrderPaymentConfirmMutation,
  useOrderHistoryQuery,
  useUserOrderQuery,
  useAllOrderQuery,
  useAllUserOrderQuery,
} = orderService;
