"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import { utils } from 'ethers';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { IoBuild } from "react-icons/io5";
import AddressLabel from '../AddressLabel';
import { FaLongArrowAltRight } from "react-icons/fa";



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

    return (
        <div>
            <div className='flex flex-row gap-2 items-center ' >
                <IoBuild className="h-[16px] w-[16px]" />
                <p className='text-[16px]'>Deploy Safe</p>
            </div>
            <div className='mt-4'>
                <p className='text-[34px]'>Safe Deployment</p>
                <p className='text-[14px]'>Sent a Relay Transaction and deploy your safe</p>
            </div>


            <div>

                <p>For Safe Deployment, You will need to pass a transaction:</p>

                {!hasNativeFunds && (
                    <h3 className="color-red">
                        Insufficient funds. Send some funds to the Safe Account
                    </h3>
                )}

                {!hasNativeFunds && chain?.faucetUrl && (
                    <Link href={chain.faucetUrl} target="_blank">
                        Request 0.5 {chain.token}.
                    </Link>
                )}


                <button
                    style={{ cursor: !hasNativeFunds ? "not-allowed" : "pointer" }}
                    className="border-2 p-2 bg-[#1d4ed8]  border-transparent rounded-lg"
                    disabled={!hasNativeFunds}
                    onClick={relayTransaction}
                >
                    Send Transaction
                </button>

                <div>
                    <h3>
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

            </div>
        </div>
    );
};

export default DeploySafe;