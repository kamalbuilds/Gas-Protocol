import React, { useContext } from 'react';
import SafeInfo from './SafeInfo';
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';

const SafeAccountInfo = () => {

    const { safeSelected, chainId } = useContext(AccountAbstractionContext)

    console.log("safe selected", safeSelected, chainId);

    return (
        <div>
            <h2>Safe Account Details</h2>

            <p className='mt-2'>Your Safe account (Smart Contract) holds and protects your assets.</p>

            {safeSelected && <SafeInfo safeAddress={safeSelected} chainId={chainId} />}
        </div>
    );
};

export default SafeAccountInfo;