import { FormControl, FormLabel, Input, List, ListIcon, ListItem } from '@chakra-ui/react';
import React from 'react';
import AddressLabel from '../AddressLabel';
import { BsFillPencilFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";


const EnterDetails = ({
    handleAPIKey,
    contractAddresses,
    whitelistedAddresses,
    updateContractAddresses,
    removeContractAddress,
    updateWalletAddress,
    removeWalletAddress,
    handleSubmit
}: any) => {

    const handleKeyPress = async (e: any) => {
        const x = e.keyCode;
        if (x === 13 && !e.shiftKey) {
            updateContractAddresses(e);
        }
    };

    const handleKeyPressWallet = async (e: any) => {
        const x = e.keyCode;

        if (x === 13 && !e.shiftKey) {
            updateWalletAddress(e);
        }
    };

    return (
        <div className='flex flex-col w-9/12 ml-8 mr-4 mt-8 mb-8 gap-8'>

            <div>
                <div className='flex flex-row gap-2 items-center ' >
                    <BsFillPencilFill className="h-[16px] w-[16px]" />
                    <p className='text-[16px]'>Enter Details</p>
                </div>
                <div className='mt-4'>
                    <p className='text-[34px]'>Fill Details</p>
                    <p className='text-[14px]'>Enter the API Key, contracts and address that you want to whitelist</p>
                </div>
            </div>

            <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>

            <FormControl>
                <FormLabel>API Key</FormLabel>
                <Input type='text' onChange={handleAPIKey} />
            </FormControl>
            <FormControl>
                <FormLabel>Contract Address</FormLabel>
                <Input type='text' onKeyDown={handleKeyPress} />

                <List spacing={3} className='mt-4'>
                    {contractAddresses.map((contract: any) => {
                        return (
                            <ListItem className='text-[16px] flex flex-row items-center'>
                                <ListIcon onClick={() => removeContractAddress(contract)} className='w-[40px] h-[20px] cursor-pointer' as={MdRemoveCircle} color='red.500' />
                                <AddressLabel address={contract} showBlockExplorerLink useFullAddress />
                            </ListItem>
                        )
                    })}
                </List>


            </FormControl>
            <FormControl>
                <FormLabel>Whitelisted Wallet Address</FormLabel>
                <Input type='text' onKeyDown={handleKeyPressWallet} />

                <List spacing={3} className='mt-4'>
                    {whitelistedAddresses.map((address: any) => {
                        return (
                            <ListItem className='text-[16px] flex flex-row items-center'>
                                <ListIcon onClick={() => removeWalletAddress(address)} className='w-[40px] h-[20px] cursor-pointer' as={MdRemoveCircle} color='red.500' />
                                <AddressLabel address={address} showBlockExplorerLink useFullAddress />
                            </ListItem>
                        )
                    })}
                </List>
            </FormControl>

            <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]' onClick={handleSubmit}>Submit Details</button>




        </div>
    );
};

export default EnterDetails;