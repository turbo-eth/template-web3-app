import { useEffect, useState } from "react"
import Link from "next/link"
import { ArAccount } from "arweave-account"
import { TransactionStatusResponse } from "arweave/node/transactions"
import moment from "moment"
import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"

import { arweaveGatewayUrl, getArweaveTxData, getArweaveTxStatus } from ".."
import { getAccountByAddress } from "../arweave-account"
import { getArweaveTx } from "../queries/query-post"
import { humanFileSize, truncateString } from "../utils"
import { ArweavePost, ArweaveTxId } from "../utils/types"
import { Spinner } from "./spinner"

export const Post = ({ txId }: { txId: ArweaveTxId }) => {
  const [txDetails, setTxDetails] = useState<ArweavePost | null>(null)
  const [txStatus, setTxStatus] = useState<TransactionStatusResponse | null>(
    null
  )
  const [txData, setTxData] = useState<string | null>(null)
  const [downloadLink, setDownloadLink] = useState<string | null>(null)
  const [owner, setOwner] = useState<ArAccount | null>(null)
  useEffect(() => {
    getArweaveTx(txId)
      .then((res) => {
        setTxDetails(res)
        if (res.data.type?.split("/")[0] === "image") {
          // TODO: Fix this conditional
        } else if (parseFloat(res.data.size) < 1024) {
          getArweaveTxData(txId)
            .then((res) => setTxData(res))
            .catch(console.error)
        } else {
          setDownloadLink(`${arweaveGatewayUrl}${txId}`)
        }
      })
      .catch(console.error)
    getArweaveTxStatus(txId)
      .then((res) => {
        setTxStatus(res)
        if (res && !res.confirmed) {
          const intervalId = setInterval(() => {
            getArweaveTxStatus(txId)
              .then((res) => {
                setTxStatus(res)
                if (res?.confirmed) clearInterval(intervalId)
              })
              .catch(console.error)
          }, 3000)
        }
      })
      .catch(console.error)
  }, [txId])

  useEffect(() => {
    if (txDetails?.owner)
      getAccountByAddress(txDetails.owner.address)
        .then((acc) => setOwner(acc))
        .catch(console.error)
  }, [txDetails])

  const { toast, dismiss } = useToast()
  const handleToast = (msg: string) => {
    toast({
      title: msg,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }
  return (
    <div className="card w-full text-left">
      <h2>Transaction</h2>
      <div className="mt-2 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex max-w-full flex-wrap items-center gap-2">
          <span className="max-w-full break-words rounded-xl bg-slate-100 p-2 font-mono text-sm text-blue-500 dark:bg-slate-600 dark:text-blue-100">
            {txId}
          </span>
          <CopyToClipboard
            text={txId}
            onCopy={() => handleToast("Arweave Tx ID Copied")}
          >
            <span className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
              <FaCopy className="text-neutral-600 dark:text-neutral-100" />
            </span>
          </CopyToClipboard>
        </div>
        <Link
          href={`https://arweave.app/tx/${txId}`}
          className={cn(buttonVariants(), "text-xs")}
        >
          View on Arweave.app
        </Link>
      </div>
      {txStatus && (
        <div className="mt-8">
          <div>Status</div>
          {txStatus?.confirmed ? (
            <>
              <div className="mt-2 text-sm">
                <span className="text-gray-600 dark:text-gray-500">
                  Confirmations:
                </span>
                <span className="ml-2">
                  {txStatus.confirmed?.number_of_confirmations}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-gray-600 dark:text-gray-500">
                  Block height:
                </span>
                <span className="ml-2">{txStatus.confirmed?.block_height}</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-gray-600 dark:text-gray-500">
                  Block Hash:
                </span>
                <span className="ml-2 break-words font-mono text-xs">
                  {txStatus.confirmed?.block_indep_hash}
                </span>
              </div>
            </>
          ) : (
            <div className="mt-2 flex items-center space-x-4 text-sm">
              <Spinner isSmall={true} />
              Pending
            </div>
          )}
        </div>
      )}
      {txDetails && (
        <div>
          <div className="mt-2 text-sm">
            <span className="text-gray-600 dark:text-gray-500">Fee:</span>
            <span className="ml-2 font-mono text-xs">
              {txDetails.fee.winston} winston
            </span>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-gray-600 dark:text-gray-500">Time:</span>
            <span className="ml-2 font-mono text-xs">
              {txDetails.block?.timestamp
                ? moment(parseInt(txDetails.block.timestamp) * 1000).format(
                    "MMM D, YYYY h:mm A"
                  )
                : "-"}
            </span>
          </div>
          <div className="mt-8">Owner</div>
          <div className="mb-5 mt-2 flex items-center">
            <Avatar>
              <AvatarImage src={owner?.profile?.avatarURL} />
              <AvatarFallback>
                {(owner?.handle ?? txDetails.owner.address).substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-col">
              {owner?.handle && <div className="text-sm">{owner?.handle}</div>}
              <div className="flex items-center font-mono text-xs">
                {truncateString(txDetails.owner.address, 15)}
                <CopyToClipboard
                  text={txDetails.owner.address}
                  onCopy={() => handleToast("Owner address Copied")}
                >
                  <span className="flex-center ml-2 flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                    <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
                  </span>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8">
        <div>Tags</div>
        {txDetails?.tags.map((tag) => (
          <div key={tag.name}>
            <div className="mt-2 inline-block w-auto rounded bg-blue-100 p-2 text-sm dark:bg-slate-800">
              <span className="mr-2 text-gray-600 dark:text-gray-500">
                {tag.name}
              </span>
              <span className="ml-2 font-mono">{tag.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div>Data</div>
        {txDetails && (
          <>
            <div className="mt-2 text-sm">
              <span className="text-gray-600 dark:text-gray-500">Size:</span>
              <span className="ml-2 font-mono text-xs">
                {humanFileSize(txDetails.data.size)}
              </span>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-gray-600 dark:text-gray-500">Type:</span>
              <span className="ml-2 font-mono text-xs">
                {txDetails.data.type ?? "-"}
              </span>
            </div>
          </>
        )}
        {txDetails?.data.type?.split("/")[0] === "image" && (
          <img
            alt=""
            className="mt-3 w-64 rounded"
            src={`${arweaveGatewayUrl}${txId}`}
          />
        )}
        {txData && (
          <div className="mt-2 break-all bg-slate-100 p-4 font-mono text-sm dark:bg-slate-500">
            {txData}
          </div>
        )}
        {downloadLink && (
          <LinkComponent
            isExternal
            className={cn(buttonVariants({ variant: "blue" }), "mt-3")}
            href={downloadLink}
          >
            Download Data from Arweave
          </LinkComponent>
        )}
      </div>
      {(!txDetails || !txStatus) && (
        <div className="mt-2 flex w-full items-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
