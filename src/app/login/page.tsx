"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import React, { useContext, useState } from 'react';
import { BsSafe2 } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoBuild } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import OwnerDetails from '@/components/ownerDetails/OwnerDetails';
import SafeDetails from '@/components/safeDetails/SafeDetails';
import DeploySafe from '@/components/safeDetails/DeploySafe';


const Page = () => {

    const { loadingWeb3Auth, userInfo, chain, safeBalance, safeSelected, web3Provider, chainId, ownerAddress, isAuthenticated, loginWeb3Auth, logoutWeb3Auth } = useContext(AccountAbstractionContext)

    const [activeState, setActiveState] = useState(1);

    return (
        <div className='m-10'>
            <button
                onClick={loginWeb3Auth}
                className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]'
            >
                Login
            </button>


            {isAuthenticated && userInfo ? (
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


                    <div className='w-9/12 ml-8 mr-4 mt-8'>

                        {activeState == 1 && <OwnerDetails userInfo={userInfo} ownerAddress={ownerAddress} />}
                        {activeState == 2 && <SafeDetails
                            safeAddress={safeSelected}
                            web3Provider={web3Provider}
                            chainId={chainId}
                            chain={chain}
                            safeBalance={safeBalance}
                        />}
                        {activeState == 3 && <DeploySafe />}

                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}




        </div>
    );
};

export default Page;