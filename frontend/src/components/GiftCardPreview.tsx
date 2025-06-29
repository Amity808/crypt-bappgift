import React from 'react';
import { Bitcoin, Gift, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { shortenAddress } from '@/utils';

interface GiftCardPreviewProps {
  recipient: string;
  amount: number;
  currency: string;
  message: string;
  theme: 'blue' | 'purple' | 'green' | 'dark' | 'gold';
}

const GiftCardPreview = ({ recipient, amount, currency, message, theme }: GiftCardPreviewProps) => {
  const getCurrencyIcon = () => {
    switch (currency) {
      case 'BTC':
        return <Bitcoin className="h-5 w-5" />;
      case 'ETH':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L11.988 8.25434V16.0309L12 16.0418L16.2978 13.6243L12 2Z" fill="currentColor"/>
            <path d="M12 2L7.7022 13.6243L12 16.0418V9.5971V2Z" fill="currentColor" fillOpacity="0.85"/>
            <path d="M12 17.418L11.9875 17.4336V21.0455L12 22.0001L16.3004 14.9996L12 17.418Z" fill="currentColor"/>
            <path d="M12 22.0001V17.418L7.7022 14.9996L12 22.0001Z" fill="currentColor" fillOpacity="0.85"/>
            <path d="M12 16.0418L16.2978 13.6243L12 9.59717V16.0418Z" fill="currentColor" fillOpacity="0.7"/>
            <path d="M7.7022 13.6243L12 16.0418V9.59717L7.7022 13.6243Z" fill="currentColor" fillOpacity="0.5"/>
          </svg>
        );
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  const themeClasses = {
    blue: 'from-blue-500 to-sky-400 text-white',
    purple: 'from-purple-500 to-indigo-400 text-white',
    green: 'from-emerald-500 to-teal-400 text-white',
    dark: 'from-gray-800 to-slate-700 text-white',
    gold: 'from-amber-300 to-yellow-800/90 text-white',
  };

  return (
    <div className="perspective-1000 animate-float">
      <div className={cn(
        'relative w-full max-w-md h-64 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform hover:scale-[1.02]',
        'bg-gradient-to-br p-6 flex flex-col justify-between',
        themeClasses[theme],
      )}>
        {/* Card shine effect */}
        <div className={cn(
          "absolute inset-0 bg-card-shine bg-[length:200%_100%] animate-shimmer opacity-30",
          theme === 'gold' && "opacity-50"
        )}></div>
        
        {/* Top section */}
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center">
              <Gift className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Crypto Gift</h3>
            </div>
            <p className="text-sm opacity-80 mt-1">For: {shortenAddress(recipient) || 'Recipient'}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center">
            {getCurrencyIcon()}
            <span className="ml-1 font-medium">{currency}</span>
          </div>
        </div>
        
        {/* Middle section */}
        <div className="relative z-10">
          <div className="mb-3">
            <p className="text-xs uppercase opacity-70">Amount</p>
            <p className="text-2xl font-bold">{amount} {currency}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm italic opacity-90">&quot;{message || 'Add a personal message here...'}&quot;</p>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex justify-between items-center text-xs opacity-70 relative z-10">
          <span>CryptoGift</span>
          <span>Redeem at cryptogift.com</span>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-xl transform -translate-x-10 translate-y-10"></div>
        
        {/* Additional gold theme decorations */}
        {theme === 'gold' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-amber-500/30 mix-blend-overlay"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl transform translate-x-8 translate-y-8"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default GiftCardPreview;
