import getSafeInfo from '@/api/getSafeInfo';
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import useApi from '@/hooks/useApi';
import usePolling from '@/hooks/usePolling';
import isContractAddress from '@/utils/isContractAddress';
import Image from 'next/image';
import React, { useCallback, useContext, useState } from 'react';
import safeLogoDark from 'src/assets/safe-info-logo-dark.svg'
import AddressLabel from './AddressLabel';
import { utils } from 'ethers';
import AmountLabel from './AmountLabel';


type SafeInfoProps = {
    safeAddress: string
    chainId: string
}

const SafeInfo = ({ safeAddress, chainId }: SafeInfoProps) => {

    const { web3Provider, chain, safeBalance } = useContext(AccountAbstractionContext)

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

            <div className='flex flex-row gap-5'>
                <div className='flex flex-col gap-1 items-center'>
                    <Image src={safeLogoDark} height={40} width={40} alt='safe-logo' />
                    {isDeployed && <h3>{threshold}/{owners}</h3>}
                </div>

                <div>
                    <div>
                        <AddressLabel address={safeAddress} showBlockExplorerLink />
                    </div>

                    {!isDeployed && !isDeployLoading && (
                        <div className='bg-[#B7F0FF] text-black rounded-md p-1'>
                            <p className='text-[14px]'>Creation Pending</p>
                        </div>

                    )}

                    {!isLoading && (
                        <AmountLabel
                            amount={utils.formatEther(safeBalance || '0')}
                            tokenSymbol={chain?.token || ''}
                        />
                    )}


                </div>

            </div>






        </div>
    );
};

export default SafeInfo;