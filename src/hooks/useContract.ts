import { useCallback } from 'react';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
// import { Coin } from '@cosmjs/proto-signing';
import { Coin } from '@cosmjs/stargate';

export const useContract = (
  client: SigningCosmWasmClient | null,
  contractAddress: string
) => {
  const queryContract = useCallback(
    async (queryMsg: Record<string, unknown>) => {
      if (!client) return null;
      
      try {
        const result = await client.queryContractSmart(contractAddress, queryMsg);
        return result;
      } catch (error) {
        console.error('Error querying contract:', error);
        return null;
      }
    },
    [client, contractAddress]
  );

  const executeContract = useCallback(
    async (
      senderAddress: string,
      executeMsg: Record<string, unknown>,
      funds?: readonly Coin[]
    ) => {
      if (!client) return null;

      try {
        const result = await client.execute(
          senderAddress,
          contractAddress,
          executeMsg,
          'auto',
          undefined,
          funds
        );
        return result;
      } catch (error) {
        console.error('Error executing contract:', error);
        return null;
      }
    },
    [client, contractAddress]
  );

  return { queryContract, executeContract };
};
