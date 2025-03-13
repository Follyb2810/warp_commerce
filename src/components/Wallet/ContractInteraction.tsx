import { useContract } from '@/hooks/useContract';
import { useKeplr } from '@/hooks/useKeplr';
import React, { useState } from 'react';


interface ContractInteractionProps {
  contractAddress: string;
}

export const ContractInteraction: React.FC<ContractInteractionProps> = ({
  contractAddress,
}) => {
  const { address, client } = useKeplr();
  const { queryContract, executeContract } = useContract(client, contractAddress);
  const [queryResult, setQueryResult] = useState(null);
//   const [queryResult, setQueryResult] = useState<any>(null);

  const handleQuery = async () => {
    const result = await queryContract({ 
      get_count: {} // Example query message
    });
    setQueryResult(result);
  };

  const handleExecute = async () => {
    if (!address) return;

    const result = await executeContract(
      address,
      { increment: {} }, // Example execute message
      []
    );
    
    if (result) {
      alert('Transaction successful!');
      handleQuery(); // Refresh the query result
    }
  };

  return (
    <div>
      <h2>Contract Interaction</h2>
      <button onClick={handleQuery}>Query Contract</button>
      {queryResult && (
        <pre>{JSON.stringify(queryResult, null, 2)}</pre>
      )}
      <button onClick={handleExecute} disabled={!address}>
        Execute Contract
      </button>
    </div>
  );
};
