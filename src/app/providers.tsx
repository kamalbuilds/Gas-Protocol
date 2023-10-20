// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider , extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        // Add styles here to customize the input component
        color: 'black', // Change the text color to black
        bg: 'white',    // Change the background color to white
      },
    },
  },
});

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}