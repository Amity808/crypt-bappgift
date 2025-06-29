
import React, { useEffect } from 'react';
import { ArrowRight, Gift, Send } from 'lucide-react';
import Button from './Button';

const HeroSection = () => {
  // const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Add observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Get all elements with the animate-reveal class
    const elements = document.querySelectorAll('.animate-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32 bg-gradient-to-b from-white to-crypto-light-gray">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-crypto-light-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-crypto-blue/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-8">
              <span className="animate-reveal inline-flex items-center rounded-full bg-crypto-blue/10 px-3 py-1 text-sm font-medium text-crypto-blue">
                <Gift className="mr-1 h-4 w-4" />
                Send Crypto Gifts with Ease
              </span>
            </div>
            
            <h1 className="animate-reveal animate-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold text-crypto-dark tracking-tight mb-6">
              <span className="block">Gift Crypto,</span>
              <span className="block text-crypto-blue">Share the Future</span>
            </h1>
            
            <p className="animate-reveal animate-delay-2 text-lg sm:text-xl text-crypto-gray max-w-2xl mb-8 leading-relaxed">
              Create beautiful gift cards loaded with cryptocurrency. The perfect way to introduce friends and family to the world of digital assets with a personal touch.
            </p>
            
            <div className="animate-reveal animate-delay-3 flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" iconRight={<ArrowRight className="ml-1 h-5 w-5" />}>
                Create a Gift Card
              </Button>
              <Button variant="outline" size="lg">
                How It Works
              </Button>
            </div>
            
            <div className="animate-reveal animate-delay-4 flex items-center text-sm text-crypto-gray">
              <div className="flex -space-x-2 mr-3">
                <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" />
                <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              </div>
              <span>Trusted by <span className="font-medium text-crypto-dark">10,000+</span> users worldwide</span>
            </div>
          </div>
          
          {/* Right column */}
          <div className="lg:col-span-6 mt-10 lg:mt-0 flex justify-center lg:justify-end items-center">
            <div className="animate-reveal animate-delay-2 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-crypto-blue to-crypto-light-blue rounded-3xl blur opacity-30 animate-pulse"></div>
              <div className="relative glass-card rounded-3xl p-6 shadow-soft overflow-hidden card-glow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-crypto-dark">Crypto Gift Card</h3>
                    <p className="text-sm text-crypto-gray">For: Sarah Johnson</p>
                  </div>
                  <Gift className="h-8 w-8 text-crypto-blue" />
                </div>
                
                <div className="bg-crypto-light-gray/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-crypto-gray">Amount</span>
                    <span className="text-sm font-medium">0.05 ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-crypto-gray">Value</span>
                    <span className="text-sm font-medium">≈ $120.00 USD</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-crypto-gray italic">
                  &quot;Happy birthday, Sarah! Hope this helps you start your crypto journey. Love, Alex&quot;
                  </p>
                </div>
                
                <Button fullWidth iconLeft={<Send className="mr-1 h-4 w-4" />}>
                  Send Gift Card
                </Button>
                
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-crypto-blue/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
