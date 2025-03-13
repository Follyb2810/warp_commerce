import { useState, useCallback } from 'react';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
// import { atomChain } from '../config/atomChain';
// import { junoChain } from '../config/junoChain';
// import { osmosisChain } from '../config/osmosisChain';
import { atomChainOne } from '../config/atomChainOne';

export const useKeplr = () => {
  const [address, setAddress] = useState<string | null>(null);;
  const [client, setClient] = useState<SigningCosmWasmClient | null>(null);

  const connect = useCallback(async () => {
    const keplr = (window as any).keplr;
    // if (!window.keplr) {
    if (!keplr) {
      alert('Please install Keplr extension');
      return;
    }

    try {
      // Enable the chain in Keplr
    //   await window.keplr.enable(atomChain.chainId);
      await keplr.enable(atomChainOne.chainId);

      // Get the offlineSigner for signing transactions
    //   const offlineSigner = window.keplr.getOfflineSigner(atomChainOne.chainId);
      const offlineSigner = keplr.getOfflineSigner(atomChainOne.chainId);

      // Get user address
      const accounts = await offlineSigner.getAccounts();
      setAddress(accounts[0].address);

      // Create signing client
      const client = await SigningCosmWasmClient.connectWithSigner(
        atomChainOne.rpc,
        offlineSigner
      );
      setClient(client);
    } catch (error) {
      console.error('Error connecting to Keplr:', error);
      // alert('Failed to connect to Keplr');
    }
  }, []);
  const disconnect = useCallback(() => {
    setAddress(null);
    setClient(null);
  }, []);

  return { address, client, connect, disconnect };

};
