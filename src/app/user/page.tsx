import { Card } from '@/components/Card'
import ProtocolCard from '@/components/ProtocolCard/ProtocolCard'
import Image from 'next/image'
import APEProtocol from '../../assets/APECoinProtocol.png';
import Link from 'next/link';
import MakerProtocol from '../../assets/makerdao.png';

export default function User() {
  return (
    <main className="flex  flex-col items-center justify-between p-12">
      <p
        className="text-2xl text-center text-gray-300 mb-12"
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >

        You can create your own custom transaction by passing smart contract address and creating your transaction batch.<br />
        Or <br /> You can explore the protocols associated with us.

      </p>

      <div className='self-center my-12'>
        <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]'>
          <Link href={"/transactions"}>
            Create Your Own Custom Transaction
          </Link>
        </button>
      </div>



      <div className='w-[100%]'>

        <div className='flex flex-row items-center gap-8 justify-center my-12'>
          <div className='w-[400px] bg-gray-700 h-[4px]'></div>
          <div className='text-[28px]'>Explore Protocols </div>
          <div className='w-[400px] bg-gray-700 h-[4px]'></div>
        </div>

        <div className='flex  flex-col gap-12 w-[100%]'>

          <ProtocolCard
            title="APE Protocol"
            src={APEProtocol}
            tags={[{
              name: 'Staking',
              color: 'blue'
            }, {
              name: 'User-Onboarding',
              color: 'red'
            },
            {
              name: 'Minting',
              color: 'green'
            }]}
            whitelistedContracts={[
              "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
              "0xF40299b626ef6E197F5d9DE9315076CAB788B6Ef",
              "0x3f228cBceC3aD130c45D21664f2C7f5b23130d23"
            ]}
            whitelistedAddresses={[
              "0x784088E22Aa7BEe9184D6792bc93665B5216B6Eb",
              "0x4657E728aAA33ae73Ce84311F74E34F0723f571a",
              "0x45D16735BEa25901E53B402A554DA6a4d74180E7"
            ]}
            proofrequest={true}
          />
          <ProtocolCard
            title="Maker DAO Protocol"
            src={MakerProtocol}
            tags={[{
              name: 'Borrowing',
              color: 'red '
            }, {
              name: 'staking',
              color: 'blue'
            }, {
              name: 'Deposit',
              color: 'green'
            }
            ]}
            whitelistedAddresses={[
              "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
              "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33",
              "0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33"
            ]}
            whitelistedContracts={[
              "0x83f20f44975d03b1b09e64809b757c47f942beea",
            ]}
            proofrequest={true}
          />

        </div>
      </div>



      <div className='flex'>
        Want to get see your protocol in this list ?
        Reach out to us at <a href='mailto:kamalthedev7@gmail.com' className='mx-4'> Mail ID</a>
      </div>
    </main>
  )
}
