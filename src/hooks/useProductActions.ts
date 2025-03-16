import { useState, useCallback, useMemo } from "react";
import { IApiResponse, IAvailableOrder } from "@/@types/types";
import { useAddToCartMutation } from "@/api/cartService";
import { useOrderAvailableMutation, useOrderPaymentConfirmMutation } from "@/api/orderService";
import { RootState, useAppSelector } from "@/store";
import { confirmOrder } from "@/utils/orderConfirm";
import { initEscrow } from "@/utils/escrowService";

export const useProductActions = (_id: string) => {
  const [quantity, setQuantity] = useState(1);
  const [keepLoad,setKeepLoad] = useState(false)


  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [orderAvailable, { isLoading: orderLoad }] = useOrderAvailableMutation();
  const [orderConfirm, { isLoading: orderConfirmLoad }] = useOrderPaymentConfirmMutation();
  
  const { user } = useAppSelector((state: RootState) => state.auth);

  const isAddingToCart = useMemo(() => isLoading, [isLoading]);

  const handleAddToCart = useCallback(async () => {
    try {
      const response: IApiResponse = await addToCart({ quantity, productId: _id }).unwrap();
      console.log(response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [_id, quantity, addToCart]);

  const handleBuyOrder = useCallback(async () => {
    try {
      setKeepLoad(true)
      const response: IApiResponse = await orderAvailable({ productId: _id, quantity }).unwrap();
      
      if (response.status === 200) {
        const available = response.data as IAvailableOrder;
        const { totalAmount, sellerAddress } = available;

        console.log("Order details:", available);
        console.log("Processing payment...");

        const escrowResult = await initEscrow(
          user!.walletAddress,
          totalAmount.toString(),
          sellerAddress
        );

        if (escrowResult && escrowResult.transactionHash) {
          await confirmOrder(orderConfirm, _id, quantity, escrowResult.transactionHash);
        } else {
          console.error("Escrow transaction failed. Order confirmation skipped.");
        }
      } else {
        console.log("Order availability response:", response);
      }
    } catch (error) {
      console.error("Error processing order:", error);
    } finally {
      setKeepLoad(false); 
    }
  }, [_id, quantity, orderAvailable, orderConfirm,user]);

  return {
    quantity,
    increment,
    decrement,
    isAddingToCart,
    orderLoad,
    orderConfirmLoad,
    handleAddToCart,
    handleBuyOrder,
    keepLoad
  };
};


// import { useState, useCallback, useMemo } from "react";
// import { IApiResponse, IAvailableOrder } from "@/@types/types";
// import { useAddToCartMutation } from "@/api/cartService";
// import { useOrderAvailableMutation, useOrderPaymentConfirmMutation } from "@/api/orderService";
// import { RootState, useAppSelector } from "@/store";
// import { neutronChain } from "@/config/neotron";
// import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
// import { GasPrice } from "@cosmjs/stargate";

// export const useProductActions = (_id: string) => {
//   const [quantity, setQuantity] = useState(0);
//   const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;


//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

//   const [addToCart, { isLoading }] = useAddToCartMutation();
//   const [orderAvailable, { isLoading: orderLoad }] = useOrderAvailableMutation();
//   const [orderConfirm, { isLoading: orderPayConfirm }] = useOrderPaymentConfirmMutation();
  
//   const { user } = useAppSelector((state: RootState) => state.auth);

//   const isAddingToCart = useMemo(() => isLoading, [isLoading]);

//   const handleAddToCart = useCallback(async () => {
//     try {
//       const response: IApiResponse = await addToCart({ quantity, productId: _id }).unwrap();
//       console.log(response);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   }, [_id, quantity, addToCart]);

//   const handleBuyOrder = useCallback(async () => {
//     try {
//       const response: IApiResponse = await orderAvailable({ productId: _id, quantity }).unwrap();
      
//       if (response.status === 200) {
//         const available = response.data as IAvailableOrder;
//         const { totalAmount, sellerAddress } = available;
  
//         console.log("Order details:", available);
//         console.log("Processing payment...");
  
//         const escrowResult = await initEscrow(totalAmount.toString(), sellerAddress);
        
//         if (escrowResult && escrowResult.transactionHash) {
//           const confirmResponse: IApiResponse = await orderConfirm({
//             productId: _id,
//             quantity,
//             transactionHash: escrowResult.transactionHash,
//           }).unwrap();
//           console.log("Order confirmed:", confirmResponse);
//         } else {
//           console.error("Escrow transaction failed. Order confirmation skipped.");
//         }
//       } else {
//         console.log("Order availability response:", response);
//       }
//     } catch (error) {
//       console.error("Error processing order:", error);
//     }
//   }, [_id, quantity, orderAvailable, orderConfirm]);
  
//   const initEscrow = async (amount: string, sellerAddress: string) => {
//     try {
//       if (!window.keplr || !user?.walletAddress) {
//         throw new Error("Please connect your wallet first.");
//       }
  
//       const formattedAmount = Math.floor(Number(amount) * 1e6);
  
//       const msg = {
//         initiate_escrow: {
//           seller: sellerAddress,
//           amount: formattedAmount,
//         },
//       };
  
//       const offlineSigner = window.keplr.getOfflineSigner(neutronChain.chainId);
//       const client = await SigningCosmWasmClient.connectWithSigner(
//         neutronChain.rpc,
//         offlineSigner,
//         { gasPrice: GasPrice.fromString("0.025untrn") }
//       );
  
//       const result = await client.execute(
//         user.walletAddress,
//         contractAddress,
//         msg,
//         "auto",
//         undefined,
//         [
//           {
//             denom: "untrn",
//             amount: formattedAmount.toString(),
//           },
//         ]
//       );
  
//       if (!result.transactionHash) {
//         throw new Error("Transaction failed. No hash returned.");
//       }
  
//       console.log("Escrow transaction result:", result);
//       return {
//         transactionHash: result.transactionHash,
//         gasUsed: result.gasUsed,
//         height: result.height,
//         events: result.events,
//       };
//     } catch (error) {
//       console.error("Error initiating escrow:", error);
//       return null;
//     }
//   };
  

//   return {
//     quantity,
//     increment,
//     decrement,
//     isAddingToCart,
//     orderLoad,
//     orderPayConfirm,
//     handleAddToCart,
//     handleBuyOrder,
//   };
// };

// import { useState, useCallback, useMemo } from "react";
// import { IApiResponse, IAvailableOrder } from "@/@types/types";
// import { useAddToCartMutation } from "@/api/cartService";
// import { useOrderAvailableMutation, useOrderPaymentConfirmMutation } from "@/api/orderService";
// import { RootState, useAppSelector } from "@/store";
// import { neutronChain } from "@/config/neotron";
// import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
// import { GasPrice } from "@cosmjs/stargate";

// // import { Window as KeplrWindow } from "@keplr-wallet/types";

// export const useProductActions = (_id: string) => {
//   const [quantity, setQuantity] = useState(0);

//   console.log(import.meta.env.ContractAddress,'import.meta.env.ContractAddress')
//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

//   const [addToCart, { isLoading }] = useAddToCartMutation();
//   const [orderAvailable, { isLoading: orderLoad }] = useOrderAvailableMutation();
//   const [orderConfirm, { isLoading: orderPayConfirm }] = useOrderPaymentConfirmMutation();
//   const {user} = useAppSelector((state:RootState)=>state.auth)

//   const isAddingToCart = useMemo(() => isLoading, [isLoading]);

//   const handleAddToCart = useCallback(async () => {
//     try {
//       const response: IApiResponse = await addToCart({ quantity, productId: _id }).unwrap();
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [_id, quantity, addToCart]);

//   const handleBuyOrder = useCallback(async () => {
//     try {
//       const response: IApiResponse = await orderAvailable({ productId: _id, quantity }).unwrap();
//       if (response.status === 200) {
//         const available = response.data as IAvailableOrder;
//         const { price, productId, quantity, seller, sellerAddress, totalAmount } = available;
//         console.log({ price, productId, quantity, seller, sellerAddress, totalAmount });

//         console.log("Make payment here...");
//         await initEscrow(totalAmount.toString(),sellerAddress)
//         const confirmResponse: IApiResponse = await orderConfirm({ productId: _id, quantity }).unwrap();
//         console.log(confirmResponse);
//       } else {
//         console.log(response);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [_id, quantity, orderAvailable, orderConfirm]);
  
//   const initEscrow =async(amount:string,sellerAddress:string)=>{
//     try {
//       if (!window.keplr || !user?.walletAddress) {
//         throw new Error("Please connect your wallet first");
//       }
//       const formatted_amount = parseInt(amount) * 1000000;
//       const msg = {
//         initiate_escrow: {
//           seller: sellerAddress,
//           amount: formatted_amount
//         }
//       }
      // const offlineSigner = window.keplr.getOfflineSigner(neutronChain.chainId);
      // const client = await SigningCosmWasmClient.connectWithSigner(
      //   neutronChain.rpc,
      //   offlineSigner,
      //   { gasPrice: GasPrice.fromString("0.025untrn") }
      // );
      
//       const result = await client.execute(
//         user.walletAddress,
//         import.meta.env.ContractAddress,
//         msg,
//         "auto",
//         undefined,
//         [
//           {
//             denom: "untrn",
//             amount: formatted_amount.toString()
//           }
//         ]
//       );
      
//       console.log(result)
//       console.log(result.transactionHash)
      
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return {
//     quantity,
//     increment,
//     decrement,
//     isAddingToCart,
//     orderLoad,
//     orderPayConfirm,
//     handleAddToCart,
//     handleBuyOrder,
//   };
// };
