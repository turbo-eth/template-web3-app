import { Player } from '@livepeer/react'
import Image, { StaticImageData } from 'next/image'

import defaultPoster from '../assets/default_poster.png'

export enum PlayerType {
  STREAM = 'stream',
  FILE = 'file',
  IPFS_URL = 'ipfsUrl',
}

interface CommonPlayerProps {
  title: string
  poster?: StaticImageData
  containerBorderRadius?: `${string}px`
  autoPlay?: boolean
}

interface PlayerFileOrStreamProps extends CommonPlayerProps {
  type: PlayerType.FILE | PlayerType.STREAM
  playbackId: string
  ipfsUrl?: never // This ensures that ipfsUrl will not exist when type is FILE or STREAM
}

interface PlayerIpfsUrlProps extends CommonPlayerProps {
  type: PlayerType.IPFS_URL
  ipfsUrl: string
  playbackId?: never // This ensures that playbackId will not exist when type is IPFS_URL
}

type PlayerProps = PlayerFileOrStreamProps | PlayerIpfsUrlProps

export function PlayerComponent({
  type,
  ipfsUrl,
  playbackId,
  title,
  poster = defaultPoster,
  containerBorderRadius = '0px',
  autoPlay = false,
}: PlayerProps) {
  const PosterImage = () => <Image priority alt={title} placeholder="blur" src={poster} />

  const source = type === PlayerType.IPFS_URL ? { src: ipfsUrl } : { playbackId }

  return (
    <Player
      lowLatency
      priority
      showPipButton
      objectFit="cover"
      poster={<PosterImage />}
      title={title}
      {...source}
      autoPlay={autoPlay}
      controls={{
        autohide: 3000,
      }}
      theme={{
        radii: { containerBorderRadius: containerBorderRadius },
      }}
    />
  )
}
