// escrowService.ts
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { neutronChain } from "@/config/neotron";

export const initEscrow = async (
  userWalletAddress: string,
  contractAddress: string,
  amount: string,
  sellerAddress: string
) => {
  try {
    if (!window.keplr || !userWalletAddress) {
      throw new Error("Please connect your wallet first.");
    }
    // const formatted_amount = parseInt(amount) * 1000000;
    const formattedAmount = Math.floor(Number(amount) * 1e6);

    const msg = {
      initiate_escrow: {
        seller: sellerAddress,
        amount: formattedAmount,
      },
    };

    const offlineSigner = window.keplr.getOfflineSigner(neutronChain.chainId);
    const client = await SigningCosmWasmClient.connectWithSigner(
      neutronChain.rpc,
      offlineSigner,
      { gasPrice: GasPrice.fromString("0.025untrn") }
    );

    const result = await client.execute(
      userWalletAddress,
      contractAddress,
      msg,
      "auto",
      undefined,
      [
        {
          denom: "untrn",
          amount: formattedAmount.toString(),
        },
      ]
    );

    if (!result.transactionHash) {
      throw new Error("Transaction failed. No hash returned.");
    }

    console.log("Escrow transaction result:", result);
    return {
      transactionHash: result.transactionHash,
      gasUsed: result.gasUsed,
      height: result.height,
      events: result.events,
    };
  } catch (error) {
    console.error("Error initiating escrow:", error);
    return null;
  }
};
