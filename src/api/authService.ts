import { baseDomain } from "./BaseDomain";


export const authService = baseDomain.injectEndpoints({
  endpoints: (build) => ({
    walletAuth: build.mutation({
      query: ({ walletAddress }: { walletAddress: string }) => ({
        url: '/wallet',
        method: 'POST',
        body: { walletAddress },
      }),
      // providesTags: [],
    //   invalidatesTags : [],
    }),
    
    
  }),
  
  overrideExisting: false,
});

export const {useWalletAuthMutation } = authService;
