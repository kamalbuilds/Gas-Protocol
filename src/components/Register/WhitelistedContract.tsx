import { List, ListIcon, ListItem } from '@chakra-ui/react';
import React from 'react';
import { FaFileContract } from "react-icons/fa6";
import AddressLabel from '../AddressLabel';
import { MdCheckCircle } from 'react-icons/md';


const WhitelistedContract = ({
    contractAddresses
}: any) => {
    return (
        <div>



            <div>
                <div className='flex flex-row gap-2 items-center ' >
                    <FaFileContract className="h-[16px] w-[16px]" />
                    <p className='text-[16px]'>Whitelisted Contracts</p>
                </div>
                <div className='mt-4'>
                    <p className='text-[34px]'>Contracts Added</p>
                    <p className='text-[14px]'>Addresses of the contracts which have access for gasless</p>
                </div>
            </div>

            <div className='w-[auto] h-[2px] rounded-lg bg-zinc-800 '></div>

            <List spacing={3} className='mt-4'>
                {contractAddresses.map((contract: any) => {
                    return (
                        <ListItem className='text-[16px] flex flex-row items-center'>
                            <ListIcon className='w-[40px] h-[20px] cursor-pointer' as={MdCheckCircle} color='red.500' />
                            <AddressLabel address={contract} showBlockExplorerLink useFullAddress />
                        </ListItem>
                    )
                })}
            </List>


        </div>
    );
};

export default WhitelistedContract;