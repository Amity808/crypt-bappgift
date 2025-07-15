// import FactoryAbi from "@/contract/Factory.json"
import GiftAbi from "@/contract/GiftAbi.json";
import { useCallback, useState } from "react";
import { Contract } from "ethers";
import { isSupportedNetwork } from "@/utils";
import { getEthersSigner } from "@/config/adapter"
import { useAccount, useChainId, useConfig } from "wagmi";
import { toast } from 'sonner';
// import { Factory } from "@/constant";
import { GiftContractAddress } from "@/constant";
// import { ethers } from "ethers";

interface Params {
    recipient: string;
    amount: string;
    mail: string
}

const useDeployNewGift = ({ recipient, amount, mail }: Params) => {
    const [isLoading, setIsLoading] = useState(false)
    const [cardIdE, setCardIdE] = useState('')
    const { address } = useAccount();
    const chainId = useChainId();
    // console.log(chainId)
    const wagmiConfig = useConfig();

    const handleCreateContract = useCallback(async () => {

        setIsLoading(true);
        if (!address) return toast.error("Please connect your wallet");
        if (!isSupportedNetwork(chainId)) return toast.error("Unsupported network");
        // if(!)

        const signer = await getEthersSigner(wagmiConfig);

        const factoryContract = new Contract(GiftContractAddress, GiftAbi, signer);

        try {
            // Convert amount to wei and add as value to the transaction
            // const amountInWei = ethers.parseUnits(amount);
            const tx = await factoryContract.createGiftcard(recipient, mail, { value: amount });
            const receipt = await tx.wait(1);
            if (receipt.status === 0) {
                throw new Error("Transation failed");
            }
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const event = receipt.logs.find((log: any) =>
                log.address.toLowerCase() === GiftContractAddress.toLowerCase()
            );

            if (event) {
                const parsedLog = factoryContract.interface.parseLog(event);
                console.log("GiftCardCreated Event Data:", parsedLog?.args);
                const cardId = parsedLog?.args.cardId;
                console.log("Card ID:", cardId);
                setCardIdE(cardId);
            } else {
                console.error("Event not found in transaction logs");
                return null;
            }

            toast.success("Gift card successfully created");
            return receipt
        } catch (error) {
            console.log(error, "err")
            toast.error("Unable to create giftcard")
        } finally {
            setIsLoading(false)
        }

    }, [address, wagmiConfig, chainId, recipient, amount, mail]);
    return {
        handleCreateContract, isLoading, cardIdE
    }


}


export default useDeployNewGift;