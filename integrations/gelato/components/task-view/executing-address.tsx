import { useState } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'

import { GELATO_CONSTANTS } from '../../utils/constants'

export function ExecutingAddress() {
  const [copied, setCopied] = useState(false)

  return (
    <div>
      <div className="mb-5 flex w-full items-center justify-between opacity-70">
        <h3 className="text-2xl font-bold">Executing address</h3>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <p className="col-span-2 opacity-70 md:col-span-1">Your msg.sender</p>
        <p className="col-span-2 md:col-span-3">
          <CopyToClipboard
            text={GELATO_CONSTANTS.whitelistAddress}
            onCopy={() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 3000)
            }}>
            <div className="flex cursor-pointer space-x-3 text-lg">
              {copied ? (
                <>Copied!</>
              ) : (
                <>
                  <span>{GELATO_CONSTANTS.whitelistAddress}</span> <FaCopy />
                </>
              )}
            </div>
          </CopyToClipboard>
        </p>
      </div>
    </div>
  )
}
