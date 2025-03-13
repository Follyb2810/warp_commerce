import { useKeplr } from '@/hooks/useKeplr';
import React, { useEffect, useCallback } from 'react';
import AppButton from '../shared/AppButton';
import { maskAddress } from '@/utils/maskAddress';
import { useWalletAuthMutation } from '@/api/authService';
import { setAuthenticated } from '@/features/authSlice';
import { IApiResponse, IUserResponse } from '@/@types/types';
import { RootState, useAppDispatch, useAppSelector } from '@/store';

interface IWalletConnectProps {
  buttonProps?: React.ComponentProps<typeof AppButton>;
}

export const WalletConnect: React.FC<IWalletConnectProps> = ({ buttonProps }) => {
  const { address, connect, disconnect } = useKeplr();
  const [walletAuth, { isLoading }] = useWalletAuthMutation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  const handleAuth = useCallback(async () => {
    if (!address) return;
    try {
      const response: IApiResponse = await walletAuth({ walletAddress: address }).unwrap();
      if (response.status === 200) {
        const successResponse = response.data as IUserResponse;
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            user: {
              id: successResponse.accessToken,
              roles: successResponse.result.role,
              walletAddress: successResponse.result.walletAddress,
            },
          })
        );
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Wallet Auth Error:', error);
    }
  }, [address, walletAuth, dispatch]);

  useEffect(() => {
    if (!address) return;
    handleAuth();
  }, [address, handleAuth]);

  const handleDisconnect = () => {
    const confirmDisconnect = window.confirm("Are you sure you want to disconnect your wallet?");
    if (confirmDisconnect) {
      disconnect();
      dispatch(setAuthenticated({ isAuthenticated: false, user: null }));
    }
  };
  

  return (
    <div>
      {isAuthenticated && user?.walletAddress ? (
        <AppButton
          label={`Address: ${maskAddress(user.walletAddress)}`}
          variant="default"
          className="w-full py-2 text-center"
          {...buttonProps}
          onClick={handleDisconnect}
        />
      ) : (
        <AppButton
          label="Connect Wallet"
          variant="default"
          onClick={connect}
          isLoading={isLoading}
          className="w-full py-2 text-center"
          {...buttonProps}
        />
      )}
    </div>
  );
};
 

//? library use
//! npm install @keplr-wallet/types @cosmjs/cosmwasm-stargate @cosmjs/proto-signing
//! npm install @keplr-wallet/types@0.11.51 \--save-dev --save-exact
//! npm i @keplr-wallet/provider-extension
//? import { Keplr } from "@keplr-wallet/provider-extension";
//? 

//🔗 Keplr Chain Registry → https://github.com/chainapsis/keplr-chain-registry
//🔗 Cosmos Chainlist → https://chainlist.org/
// 🔗 Public Cosmos RPC Endpoints → https://github.com/cosmos/chain-registry

// import React from 'react';
// import { WalletConnect } from './components/WalletConnect';
// import { ContractInteraction } from './components/ContractInteraction';

// const CONTRACT_ADDRESS = 'your-contract-address-here';

// function App() {
//   return (
//     <div className="App">
//       <h1>Keplr + CosmWasm Demo</h1>
//       <WalletConnect />
//       <ContractInteraction contractAddress={CONTRACT_ADDRESS} />
//     </div>
//   );
// }

// export default App;
// onSendClicked = async(e: MouseEvent<HTMLButtonElement>) => {
//   // Detect Keplr
//   const { keplr } = window
//   if (!keplr) {
//       alert("You need to install Keplr")
//       return
//   }
//   // Get the current state and amount of tokens that we want to transfer
//   const { denom, toSend } = this.state
//   const { faucetAddress, rpcUrl } = this.props
//   // Suggest the testnet chain to Keplr
//   await keplr.experimentalSuggestChain(this.getTestnetChainInfo())
//   // Create the signing client
//   const offlineSigner =
//       window.getOfflineSigner!("theta-testnet-001")
//   const signingClient = await SigningStargateClient.connectWithSigner(
//       rpcUrl,
//       offlineSigner,
//   )
//   // Get the address and balance of your user
//   const account: AccountData = (await offlineSigner.getAccounts())[0]
//   this.setState({
//       myAddress: account.address,
//       myBalance: (await signingClient.getBalance(account.address, denom))
//           .amount,
//   })
//   // Submit the transaction to send tokens to the faucet
//   const sendResult = await signingClient.sendTokens(
//       account.address,
//       faucetAddress,
//       [
//           {
//               denom: denom,
//               amount: toSend,
//           },
//       ],
//       {
//           amount: [{ denom: "uatom", amount: "500" }],
//           gas: "200000",
//       },
//   )
//   // Print the result to the console
//   console.log(sendResult)
//   // Update the balance in the user interface
//   this.setState({
//       myBalance: (await signingClient.getBalance(account.address, denom))
//           .amount,
//       faucetBalance: (
//           await signingClient.getBalance(faucetAddress, denom)
//       ).amount,
//   })
// }

