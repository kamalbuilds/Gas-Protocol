import APEStaking from '@/components/Staking/APEStaking'
import AccountAbstraction from '@/contexts/AccountAbstractionContext'
import Image from 'next/image'
import { Badge } from '@chakra-ui/react';
import Extractor from './Extractor';

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-12">
      hey there
      <Badge>Default</Badge>
      <APEStaking />
      <Extractor />
    </main>
  )
}
