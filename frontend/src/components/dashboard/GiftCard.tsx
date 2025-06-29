import { useState, useCallback, useEffect } from "react";
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, SendToBack } from "lucide-react";
import GiftAbi from "@/contract/GiftAbi.json";
import { useReadContract } from "wagmi";
import { shortenAddress } from "@/utils";
import { GiftContractAddress } from "@/constant";
import Link from "next/link";

interface GiftDetailProp {
    id: string;
}

interface GiftCardDetails {
    poolBalance: bigint;
    owner: string;
    isRedeem: boolean;
    recipient: string;
    mail: string;
    token: string;
    status: number
}
export function GiftCard({ id }: GiftDetailProp) {

    const [gitDetails, setGitDetails] = useState<GiftCardDetails | null>(null)


    //   0x584fdea166fa97fc0cb4df07860cbcf7c487040197f50f8e194c3d39583aaadc

    const { data: getGifCardDetails } = useReadContract({
        abi: GiftAbi,
        address: GiftContractAddress,
        functionName: "getGiftCardDetails",
        args: [id]
    }) as { data: [bigint, string, boolean, string, string, string, number] };

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
            status: Number(getGifCardDetails[6]),
        })
    }, [getGifCardDetails])


    useEffect(() => {
        FormatGift();
    }, [FormatGift])



    if (!gitDetails) return null;

    return (
        <Card className="overflow-hidden">
            <div
                className="w-full h-48 bg-cover bg-center"
                style={{
                    // backgroundImage: `url(${card.image}) card.backgroundColor ||`,
                    backgroundColor: '#0ea0ce'
                }}
            >
                <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center bg-black/10">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {Number(gitDetails?.poolBalance)} USDC
                    </h3>
                    <p className="text-white font-medium drop-shadow-md">
                        {gitDetails?.mail}
                    </p>
                </div>
            </div>
            <CardHeader>
                <CardTitle>{shortenAddress(gitDetails?.mail)}</CardTitle>
                {/* <CardDescription>
                            Created: {new Date(card.createdAt).toLocaleDateString()}
                        </CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`font-medium ${gitDetails?.status === 1 ? 'text-green-600' :
                            gitDetails?.status === 0 ? 'text-amber-600' : 'text-blue-600'
                            }`}>
                            {gitDetails?.status === 0 ? "Not Claimed" : "Claimed"}
                        </span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Expires:</span>
                                <span className="font-medium">
                                    {new Date(card.expiresAt).toLocaleDateString()}
                                </span>
                            </div> */}
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                    <SendToBack className="mr-1 h-3 w-3" />
                    Refund
                </Button>
                <Link href={`/claim/${id}`}>
                    <Button variant="outline" size="sm" className="w-full">

                        <Share className="mr-1 h-3 w-3" />
                        Share

                    </Button>
                </Link>
                
            </CardFooter>
        </Card>
    );
}
