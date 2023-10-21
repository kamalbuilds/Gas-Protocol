"use client"
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import Link from 'next/link';
import React, { useContext } from 'react';

import { RxAvatar } from "react-icons/rx";


const Navbar = () => {

    const { loadingWeb3Auth, userInfo, isAuthenticated, loginWeb3Auth, logoutWeb3Auth } = useContext(AccountAbstractionContext)

    return (
        <div className='flex flex-row justify-between p-12'>
            <Link href='/'>
                <div>Gas Protocol</div>
            </Link>


            {!isAuthenticated ? (
                <Link href='/login'>
                    <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]'>Login</button>
                </Link>
            ) : (
                <div className='flex flex-row gap-5'>
                    <Link href='/login'>
                        <RxAvatar size={40} />
                    </Link>
                    <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]' onClick={logoutWeb3Auth}>LogOut</button>

                </div>
            )}

        </div>
    );
};

export default Navbar;