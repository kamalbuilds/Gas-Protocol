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
        <div>

            {gelatoTaskInfo?.taskState && (
                <div>
                    <h3>{getGelatoTaskStatusLabel(gelatoTaskInfo.taskState)}</h3>
                </div>
            )}

            {!isCancelled && (
                <>
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
                </>
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