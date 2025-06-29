import { useState, useCallback, useEffect } from "react";
import GiftAbi from "@/contract/GiftAbi.json";
import { useAccount, useReadContract } from "wagmi";
import { GiftContractAddress } from "@/constant";
import { GiftCard } from "./GiftCard";

export function GiftCardGrid() {

  const [giftCardId, setGiftCardId] = useState<Map<string, string>>(new Map());

  const { address } = useAccount();
  const { data: giftCardsLen } = useReadContract({
    abi: GiftAbi,
    address: GiftContractAddress,
    functionName: "getGiftCardsForAddress",
    args: [address]
  })

  // console.log(giftCardsLen);
  const setGiftCardIds = useCallback(() => {
    try {
      if (!giftCardsLen || !Array.isArray(giftCardsLen)) return;

      // Create a new Map from giftCardsLen array
      const newMap = new Map<string, string>();
      giftCardsLen.forEach((cardId: string, index: number) => {
        newMap.set(index.toString(), cardId);  // Using index as key
      });

      // Update state with new Map
      setGiftCardId(new Map(newMap));
    } catch (error) {
      console.error("Error setting gift card IDs:", error);
    }
  }, [giftCardsLen]);

  useEffect(() => {
    setGiftCardIds();
  }, [giftCardsLen, setGiftCardIds]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">




      {[...giftCardId.entries()].map(([key, value]) => (
        <GiftCard key={key} id={value} />
      ))}

    </div>
  );
}
