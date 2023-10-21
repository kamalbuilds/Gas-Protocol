import { Card } from '@/components/Card'
import HomePage from '@/components/HomePage/HomePage'
import Image from 'next/image'
import Protocol from '../assets/Protocol.png';

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-12">
      Hey there 👋🏻 , welcome to the Gasless world !


      <HomePage />



      <div className='flex gap-12'>
        <Card
          title="Are you a Protocol ?"
          imageSrc="https://academy-public.coinmarketcap.com/optimized-uploads/8c339cbd61b94a9c9ad1278b4b1d49c6.png"
          tags={['Protocol', 'User-Onboarding']}
          description="By registering as a protocol, You basically agree to share Gelato Relay API Key which will get encrypted using Lit Protocol. Protocol will provide API key and wallet Addresses of whitelisted users. Those whitelisted users will be able to use API key to generate gasless transactions using relay. "
          buttonText="Register as a Protocol 🌎"
          url='/protocol'
        />
        <Card
          title="Are you a User ?"
          imageSrc="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          tags={['User', 'minting']}
          description="Register as a User. Create a safe transaction by pressing Login button. You will need to be whitelisted by the protocol to use any transaction gasless."
          buttonText="Register as a User 🚀"
          url='/user'
        />
      </div>
    </main>
  )
}
