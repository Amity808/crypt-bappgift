import React from 'react'
import Button from './Button'
import { User } from 'lucide-react'
import { useSimulateContract, useWriteContract } from 'wagmi'
import FactoryAbi from "@/contract/Factory.json"
import { Factory, USDC } from '@/constant'
// import useDeployNewGift from '@/hooks/useDeployNewGift'
// import { LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'



const CreateAccount = () => {




    const { data: simulateCreate, error } = useSimulateContract({
        abi: FactoryAbi,
        address: Factory,
        functionName: "deployGift",
        args: [USDC],
    })

    console.log(error)
    const { writeContractAsync } = useWriteContract()

    const handleWrite = async () => {
        try {
            await writeContractAsync(simulateCreate!.request)
        } catch (error) {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            toast.error(error as any)
        }
    }

    // const {handleCreateContract, isLoading} = useDeployNewGift({tokenAddress: USDC})
    return (
        <div>
            {/* <Link href="/dashboard"> */}
            <Button
                onClick={() => handleWrite()}
                className="gap-2 bg-[#0FA0CE] hover:bg-[#0FA0CE]/50">
                <User className="h-4 w-4" />
                Create Account
            </Button>
            {/* {isLoading && (
                <LoaderIcon className="h-4 w-4 text-crypto-blue" />  
              )} */}
            {/* </Link> */}

        </div>
    )
}

export default CreateAccount