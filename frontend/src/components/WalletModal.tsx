import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useConnectors, useAccount } from "wagmi";
import { useSwitchChain } from 'wagmi'
import { citreChain } from "@/config/wgami";
import { toast } from "sonner";


// Mock data for wallet options - in a real app, these would be detected


interface WalletModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const WalletModal = ({ open, onOpenChange }: WalletModalProps) => {

    const [pendingConnectorUID, setPendingConnectorUID] = useState(null);

    const { switchChain } = useSwitchChain()

    const connectors = useConnectors();

    // const walletConnector = connectors.find(
    //     (connector) => connector.id === "walletConnect"
    // )

    const otherConnectors = connectors.filter(
        (connector) => connector.id !== "walletConnect"
    )

    // Handle wallet selection and connection
    const { address } = useAccount()

    console.log(address)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleConnectWallet = async (connector: any) => {
        try {
            setPendingConnectorUID(connector?.id);
            await connector.connect();
            if(citreChain) {
                await switchChain({ chainId: citreChain.id});
            }
        } catch (error) {
            if (error instanceof Error && error.name === 'UserRejectedRequestError') {
                // Handle user rejection specifically
                toast.error('User rejected the connection request');
                // Optionally show a user-friendly message
            } else {
                console.error("Wallet connection error:", error);
            }
            onOpenChange(false)
        } finally {
            setPendingConnectorUID(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Connect Wallet</DialogTitle>
                    <DialogDescription>
                        Connect your preferred wallet to access staking features
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {otherConnectors.map((wallet) => (
                        <Button
                            key={wallet.id}
                            variant="outline"
                            className="flex justify-between items-center p-4 h-auto"
                            disabled={pendingConnectorUID === wallet.uid}
                            onClick={() => handleConnectWallet(wallet)}
                        >
                            <div className="flex items-center gap-3">
                                {pendingConnectorUID === wallet.uid && (
                                    <div className="text-2xl">{wallet.icon}</div>
                                )}


                                <span>{wallet.name}</span>
                            </div>

                            {/* {selectedWallet === wallet.id && connecting ? (
                <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              ) : (
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              )} */}
                        </Button>
                    ))}
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

export default WalletModal;