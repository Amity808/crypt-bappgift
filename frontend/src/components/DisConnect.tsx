import React, { useState, useEffect } from 'react'

import DisConnectModal from './DisConnectModal';
import { Button } from './ui/button'
import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';


const Disconnect = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className=''>
      <Button
        variant="default"
        size="sm"
        className='bg-[#0FA0CE] hover:bg-[#0FA0CE]/50'
        onClick={() => setIsWalletModalOpen(true)} // Open the modal on button click
      >
        <Wallet className="h-4 w-4 " />
        {address ? 'View Wallet' : 'Connect Wallet'}
      </Button>
      <DisConnectModal
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
      />
    </div>
  )
}

export default Disconnect