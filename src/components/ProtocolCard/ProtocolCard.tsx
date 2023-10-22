import Image from 'next/image';
import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ListItem, UnorderedList } from '@chakra-ui/react';
import AddressLabel from '../AddressLabel';
import Link from 'next/link';

const ProtocolCard = ({
    title,
    src,
    tags
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
                        <p>Explore the contract addresses that APE DAO has whitelisted.</p>

                    </div>
                    <div>

                        <Accordion allowToggle defaultIndex={[0]} allowMultiple>
                            <AccordionItem className='border-slate-700'>
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
                                        <ListItem>
                                            <AddressLabel address={'0x328507DC29C95c170B56a1b3A758eB7a9E73455c'} showBlockExplorerLink useFullAddress />
                                        </ListItem>
                                        <ListItem>
                                            <AddressLabel address={'0x328507DC29C95c170B56a1b3A758eB7a9E73455c'} showBlockExplorerLink useFullAddress />
                                        </ListItem>
                                        <ListItem>
                                            <AddressLabel address={'0x328507DC29C95c170B56a1b3A758eB7a9E73455c'} showBlockExplorerLink useFullAddress />
                                        </ListItem>
                                        <ListItem>
                                            <AddressLabel address={'0x328507DC29C95c170B56a1b3A758eB7a9E73455c'} showBlockExplorerLink useFullAddress />
                                        </ListItem>
                                    </UnorderedList>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem className='border-slate-700'>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left' className='text-gray-500 hover:text-white' >
                                            Whitelisted Wallet Address
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                    </div>
                    <div></div>
                </div>
            </div>

        </div>
    );
};

export default ProtocolCard;