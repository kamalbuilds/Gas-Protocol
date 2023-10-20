import React from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import AddressLabel from '../AddressLabel';
import Image from 'next/image';

const OwnerDetails = ({
    userInfo,
    ownerAddress
}: any) => {

    console.log("User Info", userInfo);

    return (
        <div>

            <div>
                <div className='flex flex-row gap-2 items-center ' >
                    <BsFillPersonFill className="h-[16px] w-[16px]" />
                    <p className='text-[16px]'>Owner Details</p>
                </div>
                <div className='mt-4'>
                    <p className='text-[34px]'>Owner Details</p>
                    <p className='text-[14px]'>Owner of the safe wallets</p>
                </div>
            </div>


            {userInfo?.verifierId && (
                <div>
                    <div className='flex flex-col gap-4 mt-8 mb-12'>
                        <p className='text-[18px]'>Profile</p>
                        <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>
                        <div className='flex flex-row items-center gap-2'>
                            <Image src={userInfo?.profileImage} width={50} height={50} className='rounded-full' alt='profile' />
                            <p>Abhishek</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mb-12'>
                        <p className='text-[18px]'>Email Id</p>
                        <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>
                        <p>{userInfo?.email}</p>
                    </div>
                </div>
            )}


            <div className='flex flex-col gap-4 mb-12 mt-4'>
                <p className='text-[18px]'>Owner Wallet Address</p>
                <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>
                <AddressLabel address={ownerAddress} showBlockExplorerLink useFullAddress />
            </div>
        </div>
    );
};

export default OwnerDetails;