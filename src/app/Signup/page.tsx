"use client"
import Modal from '@/components/Modal/Modal';
import React, { useState } from 'react';

const Page = () => {

    const [show, setShow] = useState(false);

    return (
        <div className='flex flex-col items-center justify-between px-16'>

            <div className='text-2xl'>Create Your Smart Contract Account in Simple Steps</div>

            <div className='flex flex-row justify-between'>

                <div>
                    <div>User Details:</div>
                </div>
                <div>
                    <div>Follow the Step</div>
                </div>

            </div>

        </div>
    );
};

export default Page;