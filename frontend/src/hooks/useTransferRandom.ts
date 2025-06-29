import { useCallback, useState } from "react";
import { useAccount, useChainId, useConfig } from "wagmi";
import { toast } from 'sonner';
import { GiftContractAddress } from "@/constant";
import GiftAbi from "@/contract/GiftAbi.json";
import { Contract, ethers } from "ethers";
import { getEthersSigner } from "@/config/adapter";
import { isSupportedNetwork } from "@/utils";


interface TransferRandomParams {
    recipients: `0x${string}`[];
    amount: string;
    tokenAddress: `0x${string}`;
}

const useTransferRandom = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();

    const transferRandom = useCallback(async ({ recipients, amount, tokenAddress }: TransferRandomParams) => {
        setIsLoading(true);

        try {
            if (!address) {
                toast.error("Please connect your wallet");
                return;
            }

            if (!isSupportedNetwork(chainId)) {
                toast.error("Unsupported network");
                return;
            }

            if (recipients.length === 0) {
                toast.error("At least one recipient is required");
                return;
            }

            const invalidRecipients = recipients.filter(addr => !/^0x[a-fA-F0-9]{40}$/.test(addr));
            if (invalidRecipients.length > 0) {
                toast.error(`Invalid recipient addresses: ${invalidRecipients.join(', ')}`);
                return;
            }

            const signer = await getEthersSigner(wagmiConfig);
            const giftCardContract = new Contract(GiftContractAddress, GiftAbi, signer);

            const amountInWei = ethers.parseUnits(amount.toString(), 6);

            const tx = await giftCardContract.transferRandom(
                recipients,
                amountInWei,
                tokenAddress
            );

            const receipt = await tx.wait();

            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            toast.success("Random transfer successful");
            return receipt;
        } catch (error) {
            console.error(error);
            toast.error("Failed to execute random transfer");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [address, wagmiConfig, chainId]);

    return {
        transferRandom,
        isLoading
    };
};

export default useTransferRandom; 

// const { transferRandom, isLoading } = useTransferRandom();

// const handleTransfer = async () => {
//   try {
//     const recipients: `0x${string}`[] = [
//       '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
//       '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
//       '0x742d35Cc6634C0532925a3b844Bc454e4438f44a'
//     ];
    
//     await transferRandom({
//       recipients,
//       amount: '1.0', // Amount in token units
//       tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC address
//     });
//   } catch (error) {
//     console.error('Transfer failed:', error);
//   }
// };