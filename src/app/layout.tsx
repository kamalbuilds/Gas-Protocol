import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AccountAbstraction from '@/contexts/AccountAbstractionContext'
import { ChakraProvider } from '@chakra-ui/react'
// app/layout.tsx
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gas Protocol',
  description: 'Onboarding users effortlessly to gasless transactions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AccountAbstraction>
            <div>
                <Navbar />
                {children}
            </div>
          </AccountAbstraction>
        </Providers>
      </body>
    </html>
  )
}
