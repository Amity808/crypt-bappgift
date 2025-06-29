import GiftAbi from "@/contract/GiftAbi.json";
import { useCallback, useState } from "react";
import { Contract } from "ethers";
import { isSupportedNetwork } from "@/utils";
import { getEthersSigner } from "@/config/adapter";
import { useAccount, useChainId, useConfig } from "wagmi";
import { toast } from 'sonner';
import { GiftContractAddress } from "@/constant";
interface Params {
    cardId: string;
}

const useClaim = ({ cardId }: Params) => {
    const [isLoading, setIsLoading] = useState(false);
    const { address } = useAccount();
    const chainId = useChainId();
    const wagmiConfig = useConfig();

    const handleClaim = useCallback(async () => {
        setIsLoading(true);

        if (!address) {
            toast.error("Please connect your wallet");
            return;
        }

        if (!isSupportedNetwork(chainId)) {
            toast.error("Unsupported network");
            return;
        }

        const signer = await getEthersSigner(wagmiConfig);
        const giftCardContract = new Contract(GiftContractAddress, GiftAbi, signer);

        try {
            const tx = await giftCardContract.redeemGiftCard(cardId);
            const receipt = await tx.wait();

            if (receipt.status === 0) {
                throw new Error("Transaction failed");
            }

            toast.success("Gift card successfully claimed");
            return receipt;
        } catch (error) {
            console.error(error);
            toast.error("Unable to claim gift card");
        } finally {
            setIsLoading(false);
        }
    }, [address, wagmiConfig, chainId, cardId]);

    return {
        handleClaim,
        isLoading
    };
};

export default useClaim;
