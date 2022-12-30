import { Heading, Text } from '@chakra-ui/react'

import { Head } from 'components/layout/Head'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_NAME } from 'utils/config'

export default function Home() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <h3 className="text-6xl font-normal">{SITE_EMOJI}</h3>
          <Heading as="h3" className="text-3xl">
            {SITE_NAME}
          </Heading>

          <Text as="h5" className="text-base">
            {SITE_DESCRIPTION}
          </Text>
        </div>
      </main>
    </>
  )
}
