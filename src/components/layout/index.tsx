import React, { ReactNode } from 'react'

import { Box, Container } from '@chakra-ui/react'

import { Footer } from './Footer'
import { Header } from './Header'
import { NetworkStatus } from './NetworkStatus'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <Box margin="0 auto" minH="100vh" className="flex flex-col">
      <Header />

      <Container className="flex flex-1" maxW="container.lg">
        {props.children}
      </Container>

      <Box position="fixed" bottom={2} right={2}>
        <NetworkStatus />
      </Box>

      <Footer />
    </Box>
  )
}
