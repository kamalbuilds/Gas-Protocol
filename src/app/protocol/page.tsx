import { Card } from '@/components/Card'
import ProtocolCard from '@/components/ProtocolCard/ProtocolCard'
import Image from 'next/image'
import APEProtocol from '../../assets/APECoinProtocol.png';

export default function User() {

  console.log("Image SRC", APEProtocol);


  return (
    <main className="flex  flex-col items-center justify-between p-12">
      Discover the Ocean of Protocols 🌊 Supporting Gasless Transactions

      <div className='self-end'>
        <button className='border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8]'>Register</button>
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
        />
        <ProtocolCard
          title="Maker DAO Protocol"
          src={APEProtocol}
          tags={['Borrowing', 'staking', 'Lending']}
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

      <div className='flex'>
        Want to get see your protocol in this list ?
        Reach out to us at <a href='mailto:kamalthedev7@gmail.com' className='mx-4'> Mail ID</a>
      </div>
    </main>
  )
}
