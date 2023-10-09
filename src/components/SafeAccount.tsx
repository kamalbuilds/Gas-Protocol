"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import React, { useContext } from 'react';
import SafeInfo from './SafeInfo';

const SafeAccount = () => {

    const { safeSelected, chainId } = useContext(AccountAbstractionContext)


    return (
        <div>
            <h2>Safe Account</h2>

            <h3>Your Safe account (Smart Contract) holds and protects your assets.</h3>

            {safeSelected && <SafeInfo safeAddress={safeSelected} chainId={chainId} />}


        </div>
    );
};

export default SafeAccount;