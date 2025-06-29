import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Check, Wallet } from "lucide-react";
import { useSimulateContract, useWriteContract } from "wagmi";
import GiftAbi from "@/contract/GiftAbi.json";
import { toast } from "sonner";
import { GiftContractAddress } from "@/constant";

interface GiftCardDetails {
  poolBalance: bigint;
  owner: string;
  isRedeem: boolean;
  recipient: string;
  mail: string;
  token: string;
}
interface GiftCardClaimFormProps {
  giftCard: GiftCardDetails;
  
  cardId: string;
}

export function GiftCardClaimForm({ giftCard, cardId }: GiftCardClaimFormProps) {
  // const [walletAddress, setWalletAddress] = useState("");
  // const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { address } = useAccount();

  // Simple validation function - in a real app, this would be more sophisticated
  // const validateWalletAddress = (address: string) => {
  //   // This is a very simple validation - just checking if it looks like an Ethereum address
  //   // In a real app, you'd want to do proper blockchain-specific validation
  //   const isValidEth = /^0x[a-fA-F0-9]{40}$/.test(address);
  //   // setIsValid(isValidEth);
  //   return isValidEth;
  // };
  const { writeContractAsync } = useWriteContract()
  const { data: simulate } = useSimulateContract({
    abi: GiftAbi,
    address: GiftContractAddress,
    functionName: "redeemGiftCard",
    args: [cardId],
  })



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateWalletAddress(walletAddress)) {
    //   return;
    // }
    setIsSubmitting(true);

    try {
      await writeContractAsync(simulate!.request)
      toast.success("Successfully claimed your wallet address")

    } catch (error) {
      // console.error(error);
      /* eslint-disable @typescript-eslint/no-explicit-any */
      toast.error("Failed to claim your wallet address", error as any)

    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Your Gift</CardTitle>
        <CardDescription>
          {/* {giftCard.currency} from {giftCard.senderName} */}
          You&lsquo;ve received {giftCard?.poolBalance}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="wallet-address" className="block text-sm font-medium mb-1">
                Your Wallet Address
              </label>
              <div className="relative">
                {/* <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="wallet-address"
                  placeholder="0x..."
                  className="pl-10"
                  value={walletAddress}
                  onChange={(e) => {
                    setWalletAddress(e.target.value);
                    validateWalletAddress(e.target.value);
                  }}
                /> */}
              </div>
              {/* {walletAddress && !isValid && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a valid wallet address
                </p>
              )}
              {isValid && (
                <p className="text-sm text-green-500 mt-1 flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  Valid wallet address
                </p>
              )} */}
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-800 mb-1">Important</h4>
              <p className="text-sm text-amber-700">
                {/* {giftCard.currency} */}
                Make sure you&lsquo;re using a wallet that supports USDC. Once claimed, the gift will be sent to your wallet immediately.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600"
          onClick={handleSubmit}
          // !isValid ||
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>Claim Gift</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
