import { useCallback, useRef, useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"

import { uploadArweaveAccountAvatar } from "../../arweave-account"
import { useArweaveWallet } from "../../hooks/use-arweave-wallet"
import { useEstimateTxFee } from "../../hooks/use-estimate-tx-fee"
import { convertBlobToBase64 } from "../../utils"
import { ConnectArweaveWallet } from "../connect-arweave-wallet"
import { FeeEstimation } from "../fee-estimation"
import { InsufficientBalanceError } from "../insufficient-balance-error"
import { PendingTx } from "../pending-tx"
import { Spinner } from "../spinner"

export const ArweaveAccount = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [picture, setPicture] = useState<{
    file: ArrayBuffer
    type: string
    url: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [txId, setTxId] = useState<string | null>(null)
  const [insufficientBalance, setInsufficientBalance] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const { address, account, wallet, getAccount } = useArweaveWallet()
  const handleName = account?.profile?.handleName ?? null
  const { estimatedTxFee, isEstimatingTxFee, estimationError, estimateTxFee } =
    useEstimateTxFee()
  const upload = useCallback(async () => {
    if (wallet && picture && account?.profile) {
      setUploading(true)
      const { txId, response, insufficientBalance } =
        await uploadArweaveAccountAvatar(
          wallet,
          account?.profile,
          picture.file,
          picture.type
        )
      if (insufficientBalance) {
        setInsufficientBalance(true)
        setUploading(false)
        return
      }
      if (response?.status !== 200) {
        setError(
          `${response?.statusText ?? ""} - ${
            (response?.data as { error: string }).error
          }`
        )
        setUploading(false)
        return
      }
      setTxId(txId)
      setUploading(false)
    }
  }, [wallet, picture])
  if (!wallet) return <ConnectArweaveWallet />
  if (!account) return <Spinner />
  return (
    <div className="card w-full">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={picture?.url ?? account?.profile?.avatarURL} />
          <AvatarFallback>
            {(handleName ?? address ?? "").substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        {!picture ? (
          <Button
            className="mt-3"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="mt-2 text-sm leading-normal">
              Select profile picture
            </span>
          </Button>
        ) : (
          <div className="mt-3">
            <FeeEstimation
              {...{ estimatedTxFee, isEstimatingTxFee, estimationError }}
            />
            <div className="flex items-center">
              <Button
                className="mt-2"
                disabled={uploading}
                onClick={() => setPicture(null)}
              >
                <span className="mt-2 text-base leading-normal">Cancel</span>
              </Button>
              <Button
                variant="emerald"
                className="ml-3 mt-2 text-sm"
                disabled={uploading}
                onClick={() => upload()}
              >
                <span className="mt-2 text-base leading-normal">
                  {uploading ? "Storing on Arweave" : "Store on Arweave"}
                </span>
              </Button>
            </div>
          </div>
        )}
        {insufficientBalance && <InsufficientBalanceError />}
        {error && (
          <div className="mt-3 font-medium text-red-500">
            Error: {String(error)}
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        hidden={true}
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setError(null)
            setInsufficientBalance(false)
            const blobUrl = URL.createObjectURL(e.target.files[0])
            fetch(blobUrl)
              .then((r) => r.blob())
              .then((blob) => {
                convertBlobToBase64(blob)
                  .then((res) => {
                    setPicture({
                      url: blobUrl,
                      file: res,
                      type: e.target.files?.[0]?.type ?? "",
                    })
                    estimateTxFee(res)
                  })
                  .catch((e) => alert(e))
              })
              .catch((e) => console.error(e))
          }
        }}
      />
      {txId && (
        <PendingTx
          txId={txId}
          onConfirmation={() => {
            getAccount()
            setPicture(null)
          }}
        />
      )}
      <div className="mt-6 text-left">
        <div className="flex items-center justify-between">
          <h4>Account Info</h4>
          <Link
            href="/integration/arweave/account/edit"
            className={cn(buttonVariants({ variant: "blue" }))}
          >
            Edit Account info
          </Link>
        </div>
        {Object.entries(account.profile)
          .filter(
            ([k]) => !["avatar", "avatarURL", "banner", "bannerURL"].includes(k)
          )
          .map(([key, val]) => (
            <div key={key} className="mt-2">
              <span className="text-sm text-slate-400">
                {key}
                {val instanceof Object ? ":" : ""}
              </span>
              <span className="ml-2 text-sm">
                {val instanceof Object
                  ? Object.entries(val).map(([key, val]) => (
                      <div key={key} className="my-4 ml-6">
                        <span className="text-sm text-slate-400">{key}</span>
                        <span className="ml-2 text-sm">{val ? val : "-"}</span>
                      </div>
                    ))
                  : val
                  ? val
                  : "-"}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
