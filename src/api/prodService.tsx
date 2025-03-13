import { baseDomain } from "./BaseDomain";


export const prodService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: ({ walletAddress }: { walletAddress: string }) => ({
        url: '/product',
        method: 'POST',
        body: { walletAddress },
      }),
      // providesTags: [],
    //   invalidatesTags : [],
    }),
    allProduct:build.query({
     query :()=>'/product' ,
     providesTags: ['Product'],   
    })
    
  }),
  
  overrideExisting: false,
});

export const {useCreateProductMutation,useAllProductQuery } = prodService;
