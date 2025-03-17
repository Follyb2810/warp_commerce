import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { neutronChain } from "@/config/neotron";

// #[cw_serde]
// pub enum ExecuteMsg {
//     InitiateEscrow { seller: Addr, amount: Uint128 }, // Buyer initiates escrow
//     ReleaseFunds {},                                  // Buyer releases funds to seller
//     CancelEscrow {},
// }

// const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractAddress = 'neutron1vexhaemuahp2hfvmfmrjem3ngzrcrea5w7q2vpzzyz2ykfzw7vpq7ygurd';

const getClient = async () => {
  if (!window.keplr) throw new Error("Please connect your wallet first.");

  const offlineSigner = window.keplr.getOfflineSigner(neutronChain.chainId);
  return SigningCosmWasmClient.connectWithSigner(neutronChain.rpc, offlineSigner, {
    gasPrice: GasPrice.fromString("0.025untrn"),
  });
};

export const initEscrow = async (
  userWalletAddress: string,
  amount: string,
  sellerAddress: string
) => {
  try {
    const client = await getClient();
    
    if (!amount || Number(amount) <= 0) {
      throw new Error("Invalid amount: must be greater than zero.");
    }

    const formattedAmount = Math.floor(Number(amount) * 1e6).toString();

    const msg = {
      initiate_escrow: {
        seller: sellerAddress,
        amount: formattedAmount, 
      },
    };

    const funds = [{ denom: "untrn", amount: formattedAmount }];

    const result = await client.execute(userWalletAddress, contractAddress, msg, "auto", undefined, funds);

    console.log("Escrow initiated:", result);
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

export const releaseFunds = async (
  userWalletAddress: string,
) => {
  try {
    const client = await getClient();

    const msg = { release_funds: {} };

    const result = await client.execute(userWalletAddress, contractAddress, msg, "auto");

    console.log("Funds released:", result);
    return {
      transactionHash: result.transactionHash,
      gasUsed: result.gasUsed,
      height: result.height,
      events: result.events,
    };
  } catch (error) {
    console.error("Error releasing funds:", error);
    return null;
  }
};

export const cancelEscrow = async (
  userWalletAddress: string,
) => {
  try {
    const client = await getClient();

    const msg = { cancel_escrow: {} }; 

    const result = await client.execute(userWalletAddress, contractAddress, msg, "auto");

    console.log("Escrow canceled:", result);
    return {
      transactionHash: result.transactionHash,
      gasUsed: result.gasUsed,
      height: result.height,
      events: result.events,
    };
  } catch (error) {
    console.error("Error canceling escrow:", error);
    return null;
  }
};
