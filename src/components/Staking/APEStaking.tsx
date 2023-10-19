
"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import React, { useContext, useEffect, useState } from 'react';
import StakingAPE from './StakingAPE';

const APEStaking = () => {
    const { getProvider, isAuthenticated } = useContext(AccountAbstractionContext)


    return (
        <div>
            hello bored APE

            <button onClick={getProvider}>Get Provider</button>


            {isAuthenticated && <StakingAPE />}
        </div>
    );
};

export default APEStaking;