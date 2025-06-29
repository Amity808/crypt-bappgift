import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Gift, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAccount } from 'wagmi'

import WalletConnect from './Wallet';
import Disconnect from './DisConnect';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { address } = useAccount();


  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-white/90 backdrop-blur-lg shadow-md' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Gift className="h-7 w-7 text-crypto-blue" />
              <span className="ml-2 text-xl font-semibold text-crypto-dark">CryptoGift</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-crypto-dark hover:text-crypto-blue transition-smooth font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center text-crypto-dark hover:text-crypto-blue transition-smooth font-medium">
                Features <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <Link href="/create" className="block px-4 py-2 text-sm rounded-md hover:bg-crypto-light-gray transition-smooth">
                  Create Gift Card
                </Link>
                <Link href="/redeem" className="block px-4 py-2 text-sm rounded-md hover:bg-crypto-light-gray transition-smooth">
                  Redeem Gift
                </Link>
                <Link href="/wallet" className="block px-4 py-2 text-sm rounded-md hover:bg-crypto-light-gray transition-smooth">
                  Manage Wallet
                </Link>
              </div>
            </div>
            <Link href="/pricing" className="text-crypto-dark hover:text-crypto-blue transition-smooth font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-crypto-dark hover:text-crypto-blue transition-smooth font-medium">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                //variant="outline" 
                //   size="sm" 
                className="gap-2 bg-[#0FA0CE] hover:bg-[#0FA0CE]/50">
                <User className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            {
              address ? <Disconnect /> : <WalletConnect />
            }

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-crypto-dark hover:text-crypto-blue transition-smooth"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'absolute top-full left-0 right-0 bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'
        )}
      >
        <div className="px-4 py-3 space-y-1">
          <Link href="/" className="block py-2 text-crypto-dark hover:text-crypto-blue transition-smooth">
            Home
          </Link>
          <Link href="/create" className="block py-2 text-crypto-dark hover:text-crypto-blue transition-smooth">
            Create Gift Card
          </Link>
          <Link href="/redeem" className="block py-2 text-crypto-dark hover:text-crypto-blue transition-smooth">
            Redeem Gift
          </Link>
          <Link href="/pricing" className="block py-2 text-crypto-dark hover:text-crypto-blue transition-smooth">
            Pricing
          </Link>
          <Link href="/about" className="block py-2 text-crypto-dark hover:text-crypto-blue transition-smooth">
            About
          </Link>
          <Link href="/dashboard" className="block py-2 text-crypto-dark  hover:text-white transition-smooth bg-[#0FA0CE] hover:bg-[#0FA0CE]/50">
            Dashboard
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            {/* <Button  className="w-full gap-2 bg-[#0FA0CE] hover:bg-[#0FA0CE]/50">
              <User className="h-4 w-4" />
              Sign In
            </Button> */}
            {
              address ? <Disconnect /> : <WalletConnect />
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
