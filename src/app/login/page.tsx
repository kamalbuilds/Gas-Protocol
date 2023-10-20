"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import { VscAccount } from "react-icons/vsc";
import { IoBuild } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import OwnerDetails from '@/components/ownerDetails/OwnerDetails';
import SafeDetails from '@/components/safeDetails/SafeDetails';
import DeploySafe from '@/components/safeDetails/DeploySafe';
import Link from 'next/link';
import { BsArrowRightCircle } from "react-icons/bs";
import getSafeInfo from '@/api/getSafeInfo';
import useApi from '@/hooks/useApi';
import usePolling from '@/hooks/usePolling';
import isContractAddress from '@/utils/isContractAddress';
import Image from 'next/image';
import React, { useCallback, useContext, useState } from 'react';
import { BsSafe2 } from "react-icons/bs";
import safeLogoDark from 'src/assets/safe-info-logo-dark.svg'
import { utils } from 'ethers';
import { AiOutlineWarning } from "react-icons/ai";


const Page = () => {

    const {
        loadingWeb3Auth,
        userInfo,
        chain,
        safeBalance,
        safeSelected,
        web3Provider,
        chainId,
        ownerAddress,
        isAuthenticated,
        loginWeb3Auth,
        logoutWeb3Auth
    } = useContext(AccountAbstractionContext)

    const [activeState, setActiveState] = useState(1);

    const [isDeployed, setIsDeployed] = useState<boolean>(false)
    const [isDeployLoading, setIsDeployLoading] = useState<boolean>(true)

    const detectSafeIsDeployed = useCallback(async () => {
        // @ts-ignore
        const isDeployed = await isContractAddress(safeSelected, web3Provider)

        setIsDeployed(isDeployed)
        setIsDeployLoading(false)
    }, [web3Provider, safeSelected])

    usePolling(detectSafeIsDeployed)

    const fetchInfo = useCallback(
        // @ts-ignore
        (signal: AbortSignal) => getSafeInfo(safeSelected, chainId, { signal }),
        [safeSelected, chainId]
    )

    const { data: safeInfo, isLoading: isGetSafeInfoLoading } = useApi(fetchInfo)

    console.log("Data", safeInfo, isGetSafeInfoLoading);

    const owners = safeInfo?.owners.length || 1
    const threshold = safeInfo?.threshold || 1
    const isLoading = isDeployLoading || isGetSafeInfoLoading


    return (
        <div className='m-10'>

            <div className='flex flex-row items-center gap-8 justify-center my-12'>
                <div className='w-[40px] flex-1 bg-gray-700 h-[4px]'></div>
                <div className='text-[28px] text-center flex-1'>Your Profile and Safe Details </div>
                <div className='w-[40px] flex-1 bg-gray-700 h-[4px]'></div>
            </div>

            {!isDeployed && !isDeployLoading && (
                <div className='w-fit bg-red-600 text-white gap-2 rounded-md p-1 flex flex-row mb-4 items-center'>
                    <AiOutlineWarning />
                    <p className='text-[14px]'>
                        Safe Wallet not deployed yet. Head over to Deploy Safe or click {" "}
                        <span className='m-o hover:underline cursor-pointer' onClick={() => setActiveState(3)}>here</span>
                    </p>
                </div>
            )}

            {!isAuthenticated && (
                <div className='flex flex-col justify-between items-center gap-8'>
                    <div>
                        Create Your Safe wallet in 3 easy steps.
                    </div>

                    <div className='flex flex-col  items-center gap-4'>
                        <div>
                            <button className='border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                                1. Login via Google, Facebook or Metamask
                            </button>
                        </div>
                        <div>
                            <button className='border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                                2. Create Safe and send funds to your safe wallet
                            </button>
                        </div>
                        <div>
                            <button className='border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                                3. Deploy Safe Wallet Contract
                            </button>
                        </div>

                    </div>

                    <div>
                        <button
                            onClick={loginWeb3Auth}
                            className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]'
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}





            {isAuthenticated && userInfo && (
                <div className='flex flex-row shadow-lg border-2 border-zinc-800'>
                    <div className='w-3/12 flex flex-col ml-8 mr-4 my-8 gap-3'>
                        <div onClick={() => setActiveState(1)} className='flex flex-row gap-2 items-center cursor-pointer hover:bg-slate-500 hover:rounded-lg p-2 pl-4'>
                            <VscAccount className="h-[16px] w-[16px]" />
                            <p className='text-lg'>Owner Details</p>
                        </div>
                        <div onClick={() => setActiveState(2)} className='flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-600 hover:rounded-lg p-2 pl-4'>
                            <BsSafe2 className="h-[16px] w-[16px]" />
                            <p>Safe Details</p>
                        </div>
                        <div onClick={() => setActiveState(3)} className='flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-600 hover:rounded-lg p-2 pl-4'>
                            <IoBuild className="h-[16px] w-[16px]" />
                            <p>Deploy Safe</p>
                        </div>
                    </div>
                    <div className='w-[4px] h-[auto] bg-zinc-800 mx-4'></div>


                    <div className='w-9/12 ml-8 mr-4 mt-8 mb-8'>

                        {activeState == 1 && <OwnerDetails userInfo={userInfo} ownerAddress={ownerAddress} />}
                        {activeState == 2 && <SafeDetails
                            safeAddress={safeSelected}
                            web3Provider={web3Provider}
                            chainId={chainId}
                            chain={chain}
                            safeBalance={safeBalance}
                            setActiveState={setActiveState}
                        />}
                        {activeState == 3 && <DeploySafe />}

                    </div>
                </div>
            )}




        </div>
    );
};

export default Page;