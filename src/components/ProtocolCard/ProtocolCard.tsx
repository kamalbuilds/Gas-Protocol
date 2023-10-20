"use client"
import Image from 'next/image';
import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, ListItem, UnorderedList } from '@chakra-ui/react';
import AddressLabel from '../AddressLabel';
import { useSismoConnect, SismoConnectResponse, SismoConnectButton } from "@sismo-core/sismo-connect-react";
import { createSismoConnectConfig } from '../createSismoConnectConfig';
import { CONFIG } from '../../sismo-connect-config';
import Sismo from '../Sismo';
import Link from 'next/link';
import { useState } from 'react';
import { SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-react';
const ProtocolCard = ({
    title,
    src,
    tags,
    whitelistedAddresses,
    whitelistedContracts,
    proofrequest,
    protocol_claims = [
        {groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a"},
        {groupId: "0x8b64c959a715c6b10aa8372100071ca7"},
        ]
}: any) => {

    const { sismoConnect } = useSismoConnect({ config : CONFIG });
    const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =useState<SismoConnectVerifiedResult>();
    const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>();
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
                    {/* <div className='w-[100%] h-[2px] bg-gray-500 mt-2'></div> */}
                    {proofrequest ? <SismoConnectButton config={CONFIG} claim={protocol_claims} text='Submit ZK Proofs to get whitelisted' 
                    onResponse={async (response: SismoConnectResponse) => {
                        setSismoConnectResponse(response);
                        console.log("sending to the backend");
                        const verifiedResult = await fetch("/api/verifyprotocols", {
                          method: "POST",
                          body: JSON.stringify(response , protocol_claims),
                        });
                        console.log(verifiedResult,"verifiedResult");
                        const data = await verifiedResult.json();
                        if (verifiedResult.ok) {
                          setSismoConnectVerifiedResult(data);
                        } else {
                          console.log(Error);
                        }
                      }}
                    /> : <><Link href={`/protocol/${title}`}> <Button className='text-white bg-grey-400 hover:bg-purple-900 w-100 bg-blue-400'>Create Custom zkproof requests to filter users</Button></Link></>}
                    <div className='mb-8 mt-6'>
                        <div className='flex gap-4 mb-2'>
                            {tags?.map((tag: any) => (
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
                                        <ListItem>
                                            <AddressLabel address={whitelistedContracts} showBlockExplorerLink useFullAddress enableTransaction />
                                        </ListItem>

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
                                    <ListItem>
                                        <AddressLabel address={whitelistedAddresses} showBlockExplorerLink useFullAddress />
                                                </ListItem>
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