import React, { useState } from 'react';

interface ArrayInputProps {
  onChange: (values: string[]) => void;
  placeholder?: string;
}
const RandomGift = ({ onChange, placeholder ="Wallet Addresss"}: ArrayInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = useState<string[]>([]);
  
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        const newValues = [...values, inputValue.trim()];
        setValues(newValues);
        onChange(newValues);
        setInputValue('');
      }
    };
  
    const removeValue = (index: number) => {
      const newValues = values.filter((_, i) => i !== index);
      setValues(newValues);
      onChange(newValues);
    };
  
    return (
      <div className="space-y-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="block w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-crypto-blue focus:ring-crypto-blue input-focus-ring py-2 border"
        />
        
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-crypto-blue/10 rounded-full px-3 py-1 text-sm text-crypto-blue"
            >
              {value}
              <button
                type="button"
                onClick={() => removeValue(index)}
                className="ml-2 text-crypto-blue hover:text-crypto-blue/70"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    );
}

export default RandomGift