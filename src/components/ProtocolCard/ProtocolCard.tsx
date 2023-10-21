"use client"
import Image from 'next/image';
import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ListItem, UnorderedList } from '@chakra-ui/react';
import AddressLabel from '../AddressLabel';

const ProtocolCard = ({
    title,
    src,
    tags,
    whitelistedAddresses,
    whitelistedContracts
}: any) => {

    console.log("Image SRC", src);

    return (
        <div>

            <div className='flex flex-row gap-8 hover:bg-slate-900 cursor-pointer p-4 rounded-lg'>
                <div>
                    <Image
                        src={src}
                        height={400}
                        width={500}
                        alt='APE'
                        className='rounded-lg'
                    />
                </div>
                <div className='flex flex-col flex-1 content-between '>
                    <div className='text-[28px]'>{title}</div>
                    <div className='w-[100%] h-[2px] bg-gray-500 mt-2'></div>

                    <div className='mb-8 mt-6'>
                        <div className='flex gap-4 mb-2'>
                            {tags?.map((tag) => (
                                <div key={tag} style={{ backgroundColor: tag.color }} className=' py-[6px] px-4 border-gray-600 rounded-lg text-[12px]'>
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                        <p>Explore the contract addresses that {title} has whitelisted.</p>

                    </div>
                    <div>

                        <Accordion allowToggle defaultIndex={[0]} allowMultiple>
                            {whitelistedContracts && <AccordionItem className='border-slate-700'>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' className='text-gray-500 hover:text-white'>
                                            Contracts Accessible
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <UnorderedList>
                                        {whitelistedContracts?.map((contract) => {
                                            return (
                                                <ListItem>
                                                    <AddressLabel address={contract} showBlockExplorerLink useFullAddress />
                                                </ListItem>
                                            )
                                        })}
                                    </UnorderedList>
                                </AccordionPanel>
                            </AccordionItem>}

                            {whitelistedAddresses && <AccordionItem className='border-slate-700'>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' className='text-gray-500 hover:text-white' >
                                            Whitelisted Wallet Address
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <UnorderedList>
                                        {whitelistedAddresses?.map((address) => {
                                            return (
                                                <ListItem>
                                                    <AddressLabel address={address} showBlockExplorerLink useFullAddress />
                                                </ListItem>
                                            )
                                        })}
                                    </UnorderedList>
                                </AccordionPanel>
                            </AccordionItem>}
                        </Accordion>

                    </div>
                    <div></div>
                </div>
            </div>

        </div>
    );
};

export default ProtocolCard;