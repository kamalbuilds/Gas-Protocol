"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import useMemoizedAddressLabel from '@/hooks/useMemoizedAddressLabel';
import Link from 'next/link';
import React, { useContext } from 'react';
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { ImNewTab } from "react-icons/im";


type AddressLabelProps = {
    address: string
    isTransactionAddress?: boolean
    showBlockExplorerLink?: boolean
    showCopyIntoClipboardButton?: boolean
    useFullAddress?: boolean
}


const AddressLabel = ({
    address,
    isTransactionAddress,
    showBlockExplorerLink,
    showCopyIntoClipboardButton = true,
    useFullAddress = false
}: AddressLabelProps) => {

    const addressLabel = useMemoizedAddressLabel(address)

    const { chain } = useContext(AccountAbstractionContext)


    const blockExplorerLink = `${chain?.blockExplorerUrl}/${isTransactionAddress ? 'tx' : 'address'
        }/${address}`


    return (
        <div className='flex flex-row gap-1 items-center'>
            <span>{useFullAddress ? address : addressLabel}</span>
            {showBlockExplorerLink && blockExplorerLink && (
                <Link target='_blank' href={blockExplorerLink}><MdOpenInNew /></Link>
            )}

            {showCopyIntoClipboardButton && (
                <div onClick={() => navigator?.clipboard?.writeText?.(address)}>
                    <AiOutlineCopy />
                </div>)}

            {showCopyIntoClipboardButton && (
                <Link href={`/transactions/${address}`}>
                    {<ImNewTab />}
                </Link>

            )}
                
        </div>
    );
};

export default AddressLabel;