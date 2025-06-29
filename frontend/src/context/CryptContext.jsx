import React, { useContext, createContext } from "react";
// import { ethers } from "ethers";
import FactoryAbi from "@/contract/Factory.json"
import { Factory } from "@/constant/index";
import { useReadContract, useAccount } from "wagmi";


const CryptContext = createContext(null);

// : { children: React.ReactNode}

export const AppProvider = ({ children }) => {
    const { address } = useAccount()

    const { data: GiftCardDeployLen } = useReadContract({
        abi: FactoryAbi,
        address: Factory,
        functionName: "giftDeployCount",
        args: [],
    })

    console.log(GiftCardDeployLen, "giftDeployCount")

    const { data: userCreatedAddress } = useReadContract({
        abi: FactoryAbi,
        address: Factory,
        functionName: "GiftCardDeploy",
        args: [address],
        query: {
            enabled: !!address, // Only run if address exists
        }
    })
    




    return (
        <CryptContext.Provider value={{userCreatedAddress}}>
            {children}
        </CryptContext.Provider>
    )
}


export const useCryptContext = () => {
    const context = useContext(CryptContext)
    if(!context) {
        throw new Error("This must be use within the app provider")
    }
    return context
}