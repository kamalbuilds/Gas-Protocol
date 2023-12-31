// @ts-nocheck
"use client"
import getChain from '@/constants/getChain';
import useApi from '@/hooks/useApi';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import React, { useCallback, useEffect } from 'react';
import { TransactionStatusResponse } from '@gelatonetwork/relay-sdk'
import Link from 'next/link';
import AddressLabel from './AddressLabel';

type GelatoTaskStatusLabelProps = {
    gelatoTaskId: string
    chainId: string
    transactionHash?: string
    setTransactionHash: React.Dispatch<React.SetStateAction<string>>
}

const pollingTime = 4_000

const GelatoTaskStatusLabel = ({
    gelatoTaskId,
    chainId,
    transactionHash,
    setTransactionHash
}: GelatoTaskStatusLabelProps) => {
    const fetchGelatoTaskInfo = useCallback(
        async () => await new GelatoRelayPack().getTaskStatus(gelatoTaskId),
        [gelatoTaskId]
    )

    const { data: gelatoTaskInfo } = useApi(fetchGelatoTaskInfo, pollingTime)
    console.log('gelatoTaskInfo: ', gelatoTaskInfo)

    const chain = getChain(chainId)

    const isCancelled = gelatoTaskInfo?.taskState === 'Cancelled'
    const isSuccess = gelatoTaskInfo?.taskState === 'ExecSuccess'
    const isLoading = !isCancelled && !isSuccess

    useEffect(() => {
        if (gelatoTaskInfo?.transactionHash) {
            setTransactionHash(gelatoTaskInfo.transactionHash)
        }
    }, [gelatoTaskInfo, setTransactionHash])



    return (
        <div className='mt-8'>

            {gelatoTaskInfo?.taskState && (
                <div
                    className='rounded-lg px-4 py-2 text-white text-[20px] w-fit'
                    style={{
                        backgroundColor: gelatoTaskInfo.taskState === 'WaitingForConfirmation' ? 'rgb(3 105 161)' :
                            gelatoTaskInfo.taskState === 'CheckPending' ? 'rgb(194 65 12)' :
                                gelatoTaskInfo.taskState === 'ExecSuccess' ? 'rgb(21 128 61)' :
                                    gelatoTaskInfo.taskState === 'Cancelled' ? 'rgb(185 28 28)' : 'transparent'
                    }}
                >
                    <h3>{getGelatoTaskStatusLabel(gelatoTaskInfo.taskState)}</h3>
                </div>
            )}

            {!isCancelled && (
                <div className='flex flex-row items-center gap-4 mt-8'>

                    <p className='text-[18px]'>Transaction Hash: </p>


                    {transactionHash ? (
                        <Link href={`${chain?.blockExplorerUrl}/tx/${transactionHash}`} target="_blank">
                            <AddressLabel
                                address={transactionHash}
                                isTransactionAddress
                                showBlockExplorerLink
                                showCopyIntoClipboardButton={false}
                            />
                        </Link>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            )}


            {gelatoTaskInfo?.lastCheckMessage && (
                <>
                    <h3>{gelatoTaskInfo.lastCheckMessage}</h3>
                </>
            )}

        </div>
    );
};

const getGelatoTaskStatusLabel = (taskStatus: TransactionStatusResponse['taskState']) => {
    const label: Record<TransactionStatusResponse['taskState'], string> = {
        CheckPending: 'Pending',
        WaitingForConfirmation: 'Waiting confirmations',
        ExecPending: 'Executing',
        ExecSuccess: 'Success',
        Cancelled: 'Cancelled',
        ExecReverted: 'Reverted',
        Blacklisted: 'Blacklisted',
        NotFound: 'Not Found'
    }

    return label[taskStatus]
}

export default GelatoTaskStatusLabel;