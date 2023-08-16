import { useCallback, useRef, useState } from 'react'

import { LinkComponent } from '@/components/shared/link-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { uploadArweaveAccountAvatar } from '../../arweave-account'
import { useArweaveWallet } from '../../hooks/use-arweave-wallet'
import { useEstimateTxFee } from '../../hooks/use-estimate-tx-fee'
import { convertBlobToBase64 } from '../../utils'
import { ConnectArweaveWallet } from '../connect-arweave-wallet'
import { FeeEstimation } from '../fee-estimation'
import { Spinner } from '../spinner'
import { TxStatus } from '../tx-status'

export const ArweaveAccount = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [picture, setPicture] = useState<{ file: ArrayBuffer; type: string; url: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [txId, setTxId] = useState<string | null>(null)
  const { address, account, wallet, getAccount } = useArweaveWallet()
  const handleName = account?.profile?.handleName ?? null
  const { estimatedTxFee, isEstimatingTxFee, estimationError, estimateTxFee } = useEstimateTxFee()
  const upload = useCallback(async () => {
    if (wallet && picture && account?.profile) {
      const [txId, response] = await uploadArweaveAccountAvatar(wallet, account?.profile, picture.file, picture.type)
      if (response.status !== 200) {
        setError(`${response.statusText} - ${(response?.data as { error: string }).error}`)
        return
      }
      setTxId(txId)
    }
  }, [wallet, picture])
  if (!wallet) return <ConnectArweaveWallet />
  if (!account) return <Spinner />
  return (
    <div className="w-full">
      <h4>Arweave Account</h4>
      <div className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src={picture?.url ?? account?.profile?.avatarURL} />
          <AvatarFallback>{(handleName ?? address ?? '').substring(0, 2)}</AvatarFallback>
        </Avatar>
        {!picture ? (
          <button className="btn btn-primary mt-2 text-sm" onClick={() => fileInputRef.current?.click()}>
            <span className="mt-2 text-base leading-normal">Upload profile picture</span>
          </button>
        ) : (
          <>
            <FeeEstimation {...{ estimatedTxFee, isEstimatingTxFee, estimationError }} />
            <button className="btn btn-primary mt-2 text-sm" onClick={() => fileInputRef.current?.click()}>
              <span className="mt-2 text-base leading-normal">Choose another profile picture</span>
            </button>
            <button className="btn btn-primary mt-2 text-sm" onClick={() => setPicture(null)}>
              <span className="mt-2 text-base leading-normal">Cancel</span>
            </button>
            <button className="btn btn-emerald mt-2 text-sm" onClick={() => upload()}>
              <span className="mt-2 text-base leading-normal">Store on Arweave</span>
            </button>
          </>
        )}
        {error && <div className="mt-3 font-medium text-red-500">Error: {String(error)}</div>}
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
            const blobUrl = URL.createObjectURL(e.target.files[0])
            fetch(blobUrl)
              .then((r) => r.blob())
              .then((blob) => {
                convertBlobToBase64(blob)
                  .then((res) => {
                    setPicture({ url: blobUrl, file: res, type: e.target.files?.[0]?.type ?? '' })
                    estimateTxFee(res)
                  })
                  .catch((e) => alert(e))
              })
              .catch((e) => console.error(e))
          }
        }}
      />
      {txId && (
        <TxStatus
          txId={txId}
          onConfirmation={() => {
            getAccount()
            setPicture(null)
          }}
        />
      )}
      <div className="text-left">
        <div className="flex justify-between">
          <h4>Account Info</h4>
          <LinkComponent href="/integration/arweave/account/edit">
            <button>Edit Account info</button>
          </LinkComponent>
        </div>
        {Object.entries(account.profile).map(([key, val]) => (
          <div key={key}>
            <span>{key}</span>
            <span>{JSON.stringify(val)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
