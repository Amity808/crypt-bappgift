import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { shortenAddress } from "@/utils";



// Mock data for wallet options - in a real app, these would be detected


interface WalletModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const DisConnectModal = ({ open, onOpenChange }: WalletModalProps) => {
    

    const { disconnect } = useDisconnect()
    // Handle wallet selection and connection
    const { address } = useAccount()

    // console.log(address)
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Wallet Connected</DialogTitle>
                    <DialogDescription>
                        Wallet details
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                
                    <Button
                    variant="outline"
                    className="flex justify-between items-center p-4 h-auto"
                    onClick={() => disconnect()}
                    >
                        {shortenAddress(address)}
                    </Button>
                    <Button
                    variant="outline"
                    className="flex justify-between items-center p-4 h-auto"
                    onClick={() => disconnect()}
                    >
                        DisConnect
                    </Button>

                </div>

                <div className="mt-2 flex flex-col space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>Your wallet data is securely handled</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-amber-500" />
                        <span>Never share your private keys or seed phrase</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DisConnectModal;