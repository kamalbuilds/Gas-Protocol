import { Card } from '@/components/Card'
import ProtocolCard from '@/components/ProtocolCard/ProtocolCard'
import Image from 'next/image'
import APEProtocol from '../../assets/APECoinProtocol.png';
import Link from 'next/link';


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



      <div>

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
            }]}
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
            }
            ]}
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
