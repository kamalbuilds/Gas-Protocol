import { Card } from '@/components/Card'
import Image from 'next/image'

export default function User() {
  return (
    <main className="flex  flex-col items-center justify-between p-12">
      Discover the Ocean of Protocols 🌊 Supporting Gasless Transactions 
      <div className='flex'>
        <Card
          title="APE Protocol"
          imageSrc="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          tags={['Staking', 'User-Onboarding']}
          description="Svartifoss is a waterfall in Skaftafell in Vatnajökull National Park in Iceland, and is one of the most popular sights in the park. It is surrounded by dark lava columns, which gave rise to its name. The base of this waterfall is noteworthy for its sharp rocks."
          buttonText="Enter 🐵 "
          url='/protocol/ape'
        />
        <Card
          title="Maker DAO Protocol"
          imageSrc="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          tags={['Borrowing', 'staking', 'Lending']}
          description="Svartifoss is a waterfall in Skaftafell in Vatnajökull National Park in Iceland, and is one of the most popular sights in the park. It is surrounded by dark lava columns, which gave rise to its name. The base of this waterfall is noteworthy for its sharp rocks."
          buttonText="Enter MakerDAO 🚀"
          url='/protocol/makerdao'
        />
      </div>

      <div className='flex'>
        Want to get see your protocol in this list ?
        Reach out to us at <a href='mailto:kamalthedev7@gmail.com' className='mx-4'> Mail ID</a>
        </div>
    </main>
  )
}
