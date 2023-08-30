import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkComponent } from "@/components/shared/link-component"
import { useArweaveWallet } from "@/integrations/arweave/hooks/use-arweave-wallet"
import { truncateString } from "@/integrations/arweave/utils"

export const ArweaveAccountPreview = () => {
  const { account, balance, address } = useArweaveWallet()
  const { toast, dismiss } = useToast()

  const handleToast = () => {
    toast({
      title: "Arweave wallet address Copied",
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const handleName = account?.profile?.handleName ?? null
  if (!account || !address) return null
  return (
    <LinkComponent
      className="mb-5 flex items-center"
      href="/integration/arweave/settings"
    >
      <Avatar>
        <AvatarImage src={account?.profile?.avatarURL} />
        <AvatarFallback>
          {(handleName ?? address).substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="ml-2 flex-col">
        {handleName && <div>{handleName}</div>}
        <div className="flex items-center font-mono text-sm">
          {truncateString(address, 15)}
          <CopyToClipboard text={address} onCopy={handleToast}>
            <span className="flex-center ml-2 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
              <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
            </span>
          </CopyToClipboard>
        </div>
        {balance !== null && (
          <div className="text-xs text-slate-400">{balance?.ar} AR</div>
        )}
      </div>
    </LinkComponent>
  )
}
