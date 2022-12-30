import React from 'react'

import { Flex, Text } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { SITE_DESCRIPTION, SITE_TITLE, SOCIAL_GITHUB, SOCIAL_TWITTER } from 'utils/config'

import { LinkComponent } from './LinkComponent'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''

  return (
    <Flex as="footer" className={className} flexDirection="column" justifyContent="center" alignItems="center" my={8}>
      <Text>{SITE_TITLE}</Text>

      <Flex color="gray.500" gap={2} alignItems="center" mt={2}>
        <LinkComponent href={`https://github.com/${SOCIAL_GITHUB}`}>
          <FaGithub />
        </LinkComponent>
        <LinkComponent href={`https://twitter.com/${SOCIAL_TWITTER}`}>
          <FaTwitter />
        </LinkComponent>
      </Flex>
    </Flex>
  )
}
