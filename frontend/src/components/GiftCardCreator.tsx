
import React, { useState } from 'react';
import GiftCardCustomizer from './GiftCardCustomizer';
import GiftCardPreview from './GiftCardPreview';

const GiftCardCreator = () => {
  const [cardData, setCardData] = useState({
    recipient: '',
    amount: 0.05,
    currency: 'ETH',
    message: '',
    theme: 'blue' as 'blue' | 'purple' | 'green' | 'gold',
  });

  const handleUpdate = (data: typeof cardData) => {
    setCardData(data);
  };

  return (
    <div className="section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-crypto-dark mb-4">Create Your Crypto Gift Card</h2>
          <p className="text-crypto-gray max-w-2xl mx-auto">
            Customize your crypto gift card with a personal message and send it to someone special.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-reveal order-2 md:order-1">
            <GiftCardCustomizer onUpdate={handleUpdate} />
          </div>
          
          <div className="animate-reveal animate-delay-2 order-1 md:order-2 flex justify-center">
            <GiftCardPreview {...cardData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardCreator;
