import { baseDomain } from "./BaseDomain";


export const cartService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: ({ productId, quantity}: { productId: string,quantity:number }) => ({
        url: '/cart/add_to_cart',
        method: 'POST',
        body: { productId, quantity },
      }),
      // providesTags: [],
      invalidatesTags : ['Cart'],
    //   invalidatesTags: ( { id }) => [{ type: 'Get_in_Touch', id }],
    }),
    allProduct:build.query({
     query :()=>'/product' ,
     providesTags: ['Product'],   
    }),
    SingleProduct: build.query({
      query: (id) => `/product/${id}`, 
      providesTags: ['Product'], 
      // invalidatesTags : ['Blogs'], 
    }),
    
  }),
  
  overrideExisting: false,
});

export const {useAddToCartMutation,useAllProductQuery,useSingleProductQuery } = cartService;
