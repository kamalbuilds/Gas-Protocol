"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import useApi from '@/hooks/useApi';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import React, { useCallback, useContext } from 'react';

const pollingTime = 4_000

const StakingAPE = () => {
    const { web3Provider, approveAPEStaking, gelatoTaskId } = useContext(AccountAbstractionContext)
    console.log("Web 3 provider", web3Provider);

    return (
        <div>
            hello APES
            <button onClick={approveAPEStaking} className='border-2 m-2 p-4'>Approve APE</button>

            {gelatoTaskId && <GelatoTask />}
        </div>
    );
};


const GelatoTask = () => {

    const { web3Provider, approveAPEStaking, gelatoTaskId } = useContext(AccountAbstractionContext)

    const fetchGelatoTaskInfo = useCallback(
        async () => await new GelatoRelayPack().getTaskStatus(gelatoTaskId),
        [gelatoTaskId]
    )

    const { data: gelatoTaskInfo } = useApi(fetchGelatoTaskInfo, pollingTime)
    console.log('gelatoTaskInfo: ', gelatoTaskInfo)

    return (
        <div>
            hey there
        </div>
    )
}

export default StakingAPE;