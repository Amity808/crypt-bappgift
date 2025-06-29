
import React from 'react';
import { Gift, Twitter, Instagram, Github, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Gift className="h-6 w-6 text-crypto-blue" />
              <span className="ml-2 text-xl font-semibold text-crypto-dark">CryptoGift</span>
            </Link>
            <p className="text-crypto-gray text-sm mb-4">
              The easiest way to gift cryptocurrency to friends and family with personalized gift cards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-crypto-dark uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Create Gift Card
                </Link>
              </li>
              <li>
                <Link href="/redeem" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Redeem Gift
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-crypto-dark uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-crypto-dark uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-crypto-gray hover:text-crypto-blue transition-smooth">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-crypto-gray text-sm text-center">
            &copy; {year} CryptoGift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
