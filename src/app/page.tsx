import { Card } from '@/components/Card'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-12">
      Hey there 👋🏻 , welcome to the Gasless world !
      <div className='flex gap-12'>
        <Card
          title="Are you a Protocol ?"
          imageSrc="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          tags={['Protocol', 'User-Onboarding']}
          description="Svartifoss is a waterfall in Skaftafell in Vatnajökull National Park in Iceland, and is one of the most popular sights in the park. It is surrounded by dark lava columns, which gave rise to its name. The base of this waterfall is noteworthy for its sharp rocks."
          buttonText="Yes ✅"
          url='/protocol'
        />
        <Card
          title="Are you a User ?"
          imageSrc="https://images.unsplash.com/photo-1667420170858-39d40cb413e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          tags={['User', 'minting']}
          description="Svartifoss is a waterfall in Skaftafell in Vatnajökull National Park in Iceland, and is one of the most popular sights in the park. It is surrounded by dark lava columns, which gave rise to its name. The base of this waterfall is noteworthy for its sharp rocks."
          buttonText="Lets GO 🚀"
          url='/user'
        />
      </div>
    </main>
  )
}
