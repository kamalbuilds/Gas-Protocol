import { Card } from '@/components/Card'
import ProtocolCard from '@/components/ProtocolCard/ProtocolCard'
import Image from 'next/image'
import APEProtocol from '../../assets/APECoinProtocol.png';
import Link from 'next/link';
import Register from '@/components/Register/Register';

export default function User() {

  console.log("Image SRC", APEProtocol);


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
          whitelistedAddresses={[
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33"
          ]}
          whitelistedContracts={[
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33"
          ]}
        />
        <ProtocolCard
          title="Maker DAO Protocol"
          src={APEProtocol}
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
          whitelistedAddresses={[
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33"
          ]}
          whitelistedContracts={[
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
            "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33"
          ]}
        />
      </div>

      <div className='flex'>
        Want to get see your protocol in this list ?
        Reach out to us at <a href='mailto:kamalthedev7@gmail.com' className='mx-4'> Mail ID</a>
      </div>
    </main>
  )
}
