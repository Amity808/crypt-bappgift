import React, { useState } from 'react';
import useTransferRandom from '../hooks/useTransferRandom';

interface RandomGiftProps {
  onChange?: (values: string[]) => void; 
}

const RandomGift: React.FC<RandomGiftProps> = ({ onChange }) => {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  
  const { transferRandom, isLoading } = useTransferRandom();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formattedRecipients = recipients.map(addr => 
        addr.startsWith('0x') ? addr as `0x${string}` : `0x${addr}` as `0x${string}`
      );

      await transferRandom({
        recipients: formattedRecipients,
        amount,
        tokenAddress: tokenAddress as `0x${string}`,
      });

      setRecipients([]);
      setAmount('');
      setTokenAddress('');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const handleRecipientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0 && /^0x[a-fA-F0-9]{40}$/.test(v));
    setRecipients(values);
    onChange?.(values); 
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setAmount(value);
    }
  };

  return (
    <div className="random-gift">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Recipients (comma-separated addresses):</label>
          <input
            type="text"
            value={recipients.join(',')}
            onChange={handleRecipientsChange}
            placeholder="0x123..., 0x456..."
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Amount:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Token Address:</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value.trim())}
            placeholder="0x..."
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={
            isLoading || 
            !recipients.length || 
            !amount || 
            Number(amount) <= 0 || 
            !tokenAddress || 
            !/^0x[a-fA-F0-9]{40}$/.test(tokenAddress)
          }
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : (
            'Send Random Gift'
          )}
        </button>
      </form>
    </div>
  );
};

export default RandomGift;