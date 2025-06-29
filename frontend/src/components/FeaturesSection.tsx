
import React from 'react';
import { Shield, Gift, Wallet, Send, ArrowRight } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Gift />,
    title: 'Personalized Gift Cards',
    description: 'Create beautiful, customizable crypto gift cards with personal messages and themes.',
  },
  {
    icon: <Send />,
    title: 'Easy Sending',
    description: 'Send your crypto gift cards via email, messaging apps, or generate a unique link.',
  },
  {
    icon: <Wallet />,
    title: 'Multiple Cryptocurrencies',
    description: 'Choose from popular cryptocurrencies like Bitcoin, Ethereum, and more.',
  },
  {
    icon: <Shield />,
    title: 'Secure Transactions',
    description: 'All transactions are secured by blockchain technology for maximum safety.',
  },
];

const FeaturesSection = () => {
  return (
    <div className="section bg-crypto-light-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-crypto-dark mb-4 animate-reveal">
            Why Choose CryptoGift?
          </h2>
          <p className="text-crypto-gray max-w-2xl mx-auto animate-reveal animate-delay-1">
            The perfect way to introduce friends and family to cryptocurrency with a personal touch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-reveal",
                `animate-delay-${index + 1}`
              )}
            >
              <div className="w-12 h-12 bg-crypto-blue/10 rounded-lg flex items-center justify-center text-crypto-blue mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-crypto-dark mb-2">{feature.title}</h3>
              <p className="text-crypto-gray">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-reveal animate-delay-4">
          <Button size="lg" iconRight={<ArrowRight className="ml-1 h-5 w-5" />}>
            Start Creating Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
