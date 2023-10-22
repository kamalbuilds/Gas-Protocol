"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import { utils } from 'ethers';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { IoBuild } from "react-icons/io5";
import AddressLabel from '../AddressLabel';
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";



const DeploySafe = () => {

    const transferAmount = 0.001;
    const {
        safeBalance,
        isAuthenticated,
        gelatoTaskId,
        isRelayerLoading,
        relayTransaction,
        chain,
        chainId,
        safeSelected,
    } = useContext(AccountAbstractionContext);

    const hasNativeFunds =
        !!safeBalance &&
        Number(utils.formatEther(safeBalance || "0")) > transferAmount;

    const [transactionHash, setTransactionHash] = useState<string>('')

    console.log("chain", chain);

    return (
        <div>
            <div className='flex flex-row gap-2 items-center ' >
                <IoBuild className="h-[16px] w-[16px]" />
                <p className='text-[16px]'>Deploy Safe</p>
            </div>
            <div className='mt-4 mb-8 gap-2'>
                <p className='text-[34px]'>Safe Deployment</p>
                <p className='text-[14px]'>Sent a Relay Transaction and deploy your safe</p>
            </div>

            <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>


            <div className='flex flex-col gap-8 mt-8'>

                <div className='flex flex-col gap-4 '>
                    <p className='text-[18px]'>Safe Address: </p>
                    <div className='flex flex-row items-center gap-2'>
                        <AddressLabel address={safeSelected} showBlockExplorerLink useFullAddress />
                    </div>
                </div>

                <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>

                <p>For Safe Deployment, You will need to pass a transaction:</p>


                <div className='gap-2'>
                    {!hasNativeFunds && (
                        <div className='flex flex-row gap-2 items-center'>
                            <AiOutlineWarning className="text-red-700" />
                            <h3 className="text-red-700">
                                Insufficient funds. Send some funds to the Safe Account
                            </h3>
                        </div>
                    )}

                    {!hasNativeFunds && chain?.faucetUrl && (
                        <div className=' w-fit border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                            <Link href={chain.faucetUrl} target="_blank">
                                Request 0.5 {chain.token}.
                            </Link>
                        </div>
                    )}
                </div>



                <div>
                    <h3 className='text-[20px]'>
                        Transfer {transferAmount} {chain?.token}
                    </h3>
                    {safeSelected && (
                        <div className="flex flex-row gap-5 items-center">
                            <AddressLabel address={safeSelected} />
                            <FaLongArrowAltRight />
                            <AddressLabel address={safeSelected} />
                        </div>
                    )}
                </div>


                <div>
                    <button
                        style={{ cursor: !hasNativeFunds ? "not-allowed" : "pointer" }}
                        className="border-2 p-2 bg-[#1d4ed8]  border-transparent rounded-lg"
                        disabled={!hasNativeFunds}
                        onClick={relayTransaction}
                    >
                        Send Transaction
                    </button>
                </div>



            </div>
        </div>
    );
};

export default DeploySafe;