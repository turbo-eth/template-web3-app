import { Heading, Text } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_NAME } from 'utils/config'

export default function Home() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="text-center h-full flex flex-center flex-col justify-center items-center flex-1">
          <h3 className="font-normal text-6xl">{SITE_EMOJI}</h3>
          <Heading as="h3" className="text-3xl">
            {SITE_NAME}
          </Heading>
          <Text as="h5" className="text-baseline">
            {SITE_DESCRIPTION}
          </Text>
        </div>
      </main>
    </>
  )
}
