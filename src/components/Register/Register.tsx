// @ts-nocheck
"use client"
import { FormControl, FormHelperText, FormLabel, Input, List, ListIcon, ListItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { VscAccount } from "react-icons/vsc";
import { IoBuild } from "react-icons/io5";
import { BsSafe2 } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { MdRemoveCircle } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import AddressLabel from '../AddressLabel';
import { FaFileContract } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa6";
import { BsFillPencilFill } from "react-icons/bs";
import EnterDetails from './EnterDetails';
import WhitelistedContract from './WhitelistedContract';
import WhitelistedAddress from './WhitelistedAddress';
import { Tableland } from '../TableLand';
import Litencrypt from '../Litencrypt';




const Register = () => {

    const [apiKey, setApiKey] = useState<any>();
    const [activeState, setActiveState] = useState(1);
    const [protocol_name, setProtocolName] = useState<any>();
    const [contractAddresses, setContractAddresses] = useState<any>([]);
    const [whitelistedAddresses, setWhitelistedAddresses] = useState<any>([]);


    const updateContractAddresses = (e: any) => {
        const address = e.target.value;
        setContractAddresses((prev: any) => [...prev, address]);
    }
    const removeContractAddress = (value: any) => {
        const address = value;
        setContractAddresses(contractAddresses.filter((e) => (e !== address)));

    }


    const handleAPIKey = (e: any) => {
        const apiKey = e.target.value;
        setApiKey(apiKey);
    }

    const handleProtocolName = (e: any) => {
        const protocolname = e.target.value;
        setProtocolName(protocolname);
    }


    const updateWalletAddress = (e: any) => {
        const address = e.target.value;
        setWhitelistedAddresses((prev: any) => [...prev, address]);
    }
    const removeWalletAddress = (value: any) => {
        const address = value;
        setWhitelistedAddresses(whitelistedAddresses.filter((e) => (e !== address)));

    }


    const handleSubmit = () => {

    }

    return (
        <div className='w-[100%]'>
            <div className='flex flex-row shadow-lg border-2 border-zinc-800'>
                <div className='w-3/12 flex flex-col ml-8 mr-4 my-8 gap-3'>
                    <div onClick={() => setActiveState(1)} className='flex flex-row gap-2 items-center cursor-pointer hover:bg-slate-500 hover:rounded-lg p-2 pl-4'>
                        <BsFillPencilFill className="h-[16px] w-[16px]" />
                        <p className='text-lg'>Enter Details</p>
                    </div>
                    <div onClick={() => setActiveState(2)} className='flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-600 hover:rounded-lg p-2 pl-4'>
                        <FaFileContract className="h-[16px] w-[16px]" />
                        <p>Whitelisted Contracts</p>
                    </div>
                    <div onClick={() => setActiveState(3)} className='flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-600 hover:rounded-lg p-2 pl-4'>
                        <FaAddressCard className="h-[16px] w-[16px]" />
                        <p>Whitelisted Address</p>
                    </div>
                </div>
                <div className='w-[4px] h-[auto] bg-zinc-800 mx-4'></div>

                <div className='flex flex-col w-9/12 ml-8 mr-4 mt-8 mb-8 gap-8'>
                    {activeState === 1 && (
                        <>
                        <EnterDetails
                        handleAPIKey={handleAPIKey}
                        contractAddresses={contractAddresses}
                        whitelistedAddresses={whitelistedAddresses}
                        updateContractAddresses={updateContractAddresses}
                        removeContractAddress={removeContractAddress}
                        updateWalletAddress={updateWalletAddress}
                        removeWalletAddress={removeWalletAddress}
                        handleSubmit={handleSubmit}
                        handleProtocolName={handleProtocolName}
                    />
                    <Litencrypt />
                    <Tableland protocol_name={protocol_name} encrypted_apikey={apiKey} whitelisted_addresses={whitelistedAddresses} contract_address={contractAddresses}/>
                    </>
                    )}

                    {activeState === 2 && (
                        <WhitelistedContract contractAddresses={contractAddresses} />
                    )}

                    {activeState === 3 && (
                        <WhitelistedAddress whitelistedAddresses={whitelistedAddresses} />
                    )}
                </div>




            </div>
        </div>
    );
};

export default Register;