import CopyToClipboard from 'react-copy-to-clipboard'

import { useToast } from '@/lib/hooks/use-toast'

import { PlayerType } from './player'

const assetOnDescription = {
  [PlayerType.STREAM]: 'Livestream',
  [PlayerType.FILE]: 'Video',
  [PlayerType.IPFS_URL]: 'Video',
}

export function ButtonShare({ href, PlayerType }: { href: string; PlayerType: PlayerType }) {
  const url = href.startsWith('/') ? `${origin}/${href}` : href
  const description = `You can now paste the ${assetOnDescription[PlayerType]} URL`

  const { toast, dismiss } = useToast()

  const handleToast = ({ title, description }: { title: string; description: string }) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }
  return (
    <CopyToClipboard text={url}>
      <span
        className="btn btn-emerald mt-4 flex w-full cursor-pointer rounded-md"
        onClick={() => {
          handleToast({
            title: 'Copied to clipboard!',
            description,
          })
        }}>
        <span>{`Share ${assetOnDescription[PlayerType]}`}</span>
      </span>
    </CopyToClipboard>
  )
}
