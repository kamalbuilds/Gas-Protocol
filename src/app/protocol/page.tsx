// @ts-nocheck
"use client";
import { Card } from '@/components/Card'
import ProtocolCard from '@/components/ProtocolCard/ProtocolCard'
import Image from 'next/image'
import APEProtocol from '../../assets/APECoinProtocol.png';
import Link from 'next/link';
import Register from '@/components/Register/Register';
import MakerDao from '../../assets/makerdao.png';
import { Database } from '@tableland/sdk';
import {ethers } from 'ethers';
import { useState , useEffect} from 'react';

export default function User() {

  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const[protocolData, setProtocolData] = useState<any>([]);

  useEffect(() => {
    // Fetch data for each protocol when the component mounts
    fetchProtocolData();
  }, []);

  async function read(protocol_name : string) {
    try {
      const db = new Database({ signer });
        const { results } = await db
          .prepare(
            `SELECT protocol_name, encrypted_apikey, whitelisted_addresses, contract_address FROM gaslessprotocols_80001_8204 WHERE protocol_name = ?;`
          )
          .bind(protocol_name)
          .all();
  
        if (results.length > 0) {
          console.log(results,"results")
          const whitelistedAdd = results[0].whitelisted_addresses;
          const contractAddress = results[0].contract_address;
          return {
            protocolName: protocol_name,
            contractAddress: contractAddress,
            whitelistedAddresses: whitelistedAdd,
          };
        } else {
          console.log("No data found for the protocol ", protocol_name);
        }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProtocolData() {
    // Define an array of protocol information
    const protocols = [
      { name: 'APE Protocol'},
      { name: 'MakerDAO'},
      // Add more protocols as needed
    ];

    const dataPromises = protocols.map(async (protocol) => {
      const data = await read(protocol.name);
      console.log(data,"data")
      if (data) {
        return data;
      }
    });

    const protocolDataResults = await Promise.all(dataPromises);

    // Filter out null results (protocols with no data found)
    const filteredProtocolData = protocolDataResults.filter((data) => data !== null);

    // Update the state with the protocol data
    setProtocolData(filteredProtocolData);
    console.log(filteredProtocolData,"protocolData");
  }

  return (
    <main className="flex  flex-col items-center justify-between p-12">

      <p
        className="text-2xl w-[700px] text-center text-gray-300 mb-12"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        If you are a protocol, You can add/update contract Addresses and whitelisted wallet addresses who can use your gasless options.
      </p>

      <div className='self-center my-12'>
        <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]'>
          <Link href={"/registerProtocol"}>
            Register as a Protocol
          </Link>
        </button>
      </div>

      <div className='flex flex-row items-center gap-8 justify-center my-12 w-[100%]'>
        <div className='flex-1 bg-gray-700 h-[4px]'></div>
        <div className='text-[28px] text-center flex-1'>Protocols Associated </div>
        <div className='flex-1 bg-gray-700 h-[4px]'></div>
      </div>

      <div className='flex flex-col gap-12 w-[100%]'>
        <ProtocolCard
          title="APE Protocol"
          src={APEProtocol}
          tags={[{
            name: 'Staking',
            color: 'blue'
          }, {
            name: 'User-Onboarding',
            color: 'red'
          }]}
          whitelistedContracts={protocolData[0]?.contractAddress}
          whitelistedAddresses={protocolData[0]?.whitelistedAddresses}
        />
        <ProtocolCard
          title="Maker DAO"
          src={MakerDao}
          tags={[{
            name: 'Borrowing',
            color: 'red '
          }, {
            name: 'staking',
            color: 'blue'
          }, {
            name: 'Lending',
            color: 'green'
          },
          ]}
          whitelistedAddresses={protocolData[1]?.whitelistedAddresses}
          whitelistedContracts={protocolData[1]?.contractAddress}
        />
      </div>

      <div className='flex'>
        Want to get see your protocol in this list ?
        Reach out to us at <a href='mailto:kamalthedev7@gmail.com' className='mx-4'> Mail ID</a>
      </div>
    </main>
  )
}
