import getSafeInfo from '@/app/api/getSafeInfo';
import useApi from '@/hooks/useApi';
import usePolling from '@/hooks/usePolling';
import isContractAddress from '@/utils/isContractAddress';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { BsSafe2 } from "react-icons/bs";
import safeLogoDark from 'src/assets/safe-info-logo-dark.svg'
import AddressLabel from '../AddressLabel';
import AmountLabel from '../AmountLabel';
import { utils } from 'ethers';
import { AiOutlineWarning } from "react-icons/ai";



const SafeDetails = ({
    safeAddress,
    web3Provider,
    chainId,
    chain,
    safeBalance,
    setActiveState
}: any) => {

    const [isDeployed, setIsDeployed] = useState<boolean>(false)
    const [isDeployLoading, setIsDeployLoading] = useState<boolean>(true)

    const detectSafeIsDeployed = useCallback(async () => {
        const isDeployed = await isContractAddress(safeAddress, web3Provider)

        setIsDeployed(isDeployed)
        setIsDeployLoading(false)
    }, [web3Provider, safeAddress])

    usePolling(detectSafeIsDeployed)

    const fetchInfo = useCallback(
        (signal: AbortSignal) => getSafeInfo(safeAddress, chainId, { signal }),
        [safeAddress, chainId]
    )

    const { data: safeInfo, isLoading: isGetSafeInfoLoading } = useApi(fetchInfo)

    console.log("Data", safeInfo, isGetSafeInfoLoading);

    const owners = safeInfo?.owners.length || 1
    const threshold = safeInfo?.threshold || 1
    const isLoading = isDeployLoading || isGetSafeInfoLoading


    return (
        <div>

            {!isDeployed && !isDeployLoading && (
                <div className='bg-red-600 text-white gap-2 rounded-md p-1 flex flex-row mb-4 items-center'>
                    <AiOutlineWarning />
                    <p className='text-[14px]'>
                        Safe Wallet not deployed yet. Head over to Deploy Safe or click {" "}
                        <span className='m-o hover:underline cursor-pointer' onClick={() => setActiveState(3)}>here</span>
                    </p>
                </div>
            )}

            <div>
                <div className='flex flex-row gap-2 items-center ' >
                    <BsSafe2 className="h-[16px] w-[16px]" />
                    <p className='text-[16px]'>Safe Details</p>
                </div>
                <div className='mt-4'>
                    <p className='text-[34px]'>Safe Details</p>
                    <p className='text-[14px]'>Safes associated with your account</p>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-8 mb-12'>
                <p className='text-[18px]'>Safe Address</p>
                <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>
                <div className='flex flex-row items-center gap-2'>
                    <Image src={safeLogoDark} height={40} width={40} alt='safe-logo' />
                    <AddressLabel address={safeAddress} showBlockExplorerLink useFullAddress />
                </div>
            </div>
            <div className='flex flex-col gap-4 mb-12'>
                <p className='text-[18px]'>Deployment Status</p>
                <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>
                <div className='flex flex-row gap-2 items-center'>
                    <p className='text-[14px]'>Balance: </p>
                    {!isLoading && (
                        <AmountLabel
                            amount={utils.formatEther(safeBalance || '0')}
                            tokenSymbol={chain?.token || ''}
                        />
                    )}
                </div>
            </div>

            <div className='flex flex-col gap-4 mb-12'>
                <p className='text-[18px]'>Recent Transactions</p>
                <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>
                <p>No Transactions</p>
            </div>


        </div>
    );
};

export default SafeDetails;