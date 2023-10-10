import APEStaking from '@/components/Staking/APEStaking'
import AccountAbstraction from '@/contexts/AccountAbstractionContext'
import Image from 'next/image'
import { Badge } from '@chakra-ui/react';

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      hey there
      <Badge>Default</Badge>
      <APEStaking />
    </main>
  )
}
