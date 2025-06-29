import React, { useState } from 'react'
import WalletModal from './WalletModal'
import { Button } from './ui/button'
import { Wallet } from 'lucide-react';


const WalletConnect = () => {
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    

  return (
    <div className=''>
      
        <Button
                variant="default"
                size="sm" 
                className='bg-[#0FA0CE] hover:bg-[#0FA0CE]/50'
                onClick={() => setIsWalletModalOpen(true)} // Open the modal on button click
            >
              <Wallet className="h-4 w-4 " />
                Connect Wallet
            </Button>
        <WalletModal
                open={isWalletModalOpen}
                onOpenChange={setIsWalletModalOpen}
            />
    </div>
  )
}

export default WalletConnect