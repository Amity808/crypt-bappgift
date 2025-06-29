import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GiftCardClaimForm } from "@/components/GiftCardClaimForm";

import { Card } from "@/components/ui/card";
import { BadgeCheck, Gift } from "lucide-react";
import { useReadContract } from "wagmi";
import GiftAbi from "@/contract/GiftAbi.json";
import {  GiftContractAddress } from "@/constant";
import { shortenAddress } from "@/utils";

interface GiftCardDetails {
  poolBalance: bigint;
  owner: string;
  isRedeem: boolean;
  recipient: string;
  mail: string;
  token: string;
}
const ClaimGiftCard = () => {
  const params = useParams();
  const id = params?.id as string;
  const navigate = useRouter();
  // const { address } = useAccount();
  const [gitDetails, setGitDetails] = useState<GiftCardDetails | null>(null)
  // const { id } = navigate.query 
  // const [giftCard, setGiftCard] = useState<any>(null);


  const { data: getGifCardDetails } = useReadContract({
    abi: GiftAbi,
    address: GiftContractAddress,
    functionName: "getGiftCardDetails",
    args: [id]
  }) as { data: [bigint, string, boolean, string, string, string] };




  const FormatGift = useCallback(() => {
    if (!getGifCardDetails || !Array.isArray(getGifCardDetails) || getGifCardDetails.length < 6) {
      console.error("getGifCardDetails is empty or invalid:", getGifCardDetails);
      return;
    }
    if (!getGifCardDetails) return null;
    setGitDetails({
      poolBalance: getGifCardDetails[0],
      owner: getGifCardDetails[1],
      isRedeem: Boolean(getGifCardDetails[2]),
      recipient: getGifCardDetails[3],
      mail: getGifCardDetails[4],
      token: getGifCardDetails[5],
    })
  }, [getGifCardDetails])


  useEffect(() => {
    FormatGift();
  }, [FormatGift])


  

  if (!gitDetails) return null;

  // Add check for isRedeem
  if (gitDetails.isRedeem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="max-w-md mx-auto p-8 text-center bg-gradient-to-br from-red-200 to-red-400 border-red-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <BadgeCheck className="h-10 w-10 text-red-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Gift Card Already Claimed!</h2>
              <p className="mb-4">
                This gift card has already been redeemed and cannot be claimed again.
              </p>
              <div className="py-3 px-4 bg-white/50 rounded-lg mb-4">
                <p className="font-mono text-sm break-all">Recipient: {shortenAddress(gitDetails.recipient)}</p>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate.push("/")}
                  className="px-6 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                >
                  Return Home
                </button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  console.log(gitDetails, "gitDetails")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Claim Your Gift Card</h1>
            <p className="text-crypto-gray mt-2">
              You&apos;ve received a crypto gift! Enter your wallet address to claim it.
            </p>
          </div>

          {gitDetails ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="order-2 md:order-1">
              <GiftCardClaimForm giftCard={gitDetails} cardId={id}/>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-full max-w-md">
                <div className="relative w-full max-w-md h-64 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-300 to-yellow-500 p-6 flex flex-col justify-between">
                  {/* Card shine effect */}
                  <div className="absolute inset-0 bg-card-shine bg-[length:200%_100%] animate-shimmer opacity-30"></div>

                  {/* Top section */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="flex items-center">
                        <Gift className="h-6 w-6 mr-2 text-white" />
                        <h3 className="text-lg font-semibold text-white">Crypto Gift</h3>
                      </div>
                      {/* <p className="text-sm text-white/80 mt-1">For: {giftCard.recipientName}</p> */}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center">
                      <span className="font-medium text-white">USDC</span>
                    </div>
                  </div>

                  {/* Middle section */}
                  <div className="relative z-10">
                    <div className="mb-3">
                      <p className="text-xs uppercase text-white/70">Amount</p>
                      <p className="text-2xl font-bold text-white">{gitDetails?.poolBalance?.toString()} </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      {/* <p className="text-sm italic text-white/90">&quot;{giftCard.message}&quot;</p> */}
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="flex justify-between items-center text-xs text-white/70 relative z-10">
                    <span>CryptoGift</span>
                    <span>From: {shortenAddress(gitDetails?.recipient)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : (
            <div className="text-center py-8">
              <p>Gift card not found.</p>
            </div>
          )} 
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ClaimGiftCard;
