import { baseDomain } from "./BaseDomain";


export const orderService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    OrderAvailable: build.mutation({
      query: ({ productId, quantity}: { productId: string,quantity:number }) => ({
        url: '/order/available',
        method: 'POST',
        body: { productId, quantity },
      }),
      // providesTags: [],
      invalidatesTags : ['Order'],
    //   invalidatesTags: ( { id }) => [{ type: 'Get_in_Touch', id }],
    }),
    OrderPaymentConfirm: build.mutation({
      query: ({ productId, quantity,transactionHash ='hello'}: { productId: string,quantity:number,transactionHash?:string }) => ({
        url: '/order/confrim',
        method: 'POST',
        body: { productId, quantity ,transactionHash},
      }),
      // providesTags: [],
      invalidatesTags : ['Order'],
    //   invalidatesTags: ( { id }) => [{ type: 'Get_in_Touch', id }],
    }),
    // allProduct:build.query({
    //  query :()=>'/product' ,
    //  providesTags: ['Product'],   
    // }),
    SingleProduct: build.query({
      query: (id) => `/order/${id}`, 
      providesTags: ['Order'], 
      // invalidatesTags : ['Blogs'], 
    }),
    
  }),
  
  overrideExisting: false,
});

export const { useOrderAvailableMutation,useOrderPaymentConfirmMutation} = orderService;
