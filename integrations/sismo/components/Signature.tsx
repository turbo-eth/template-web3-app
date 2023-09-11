import React, { useState } from "react"
import { AuthType } from "@sismo-core/sismo-connect-react"
import {
  SignatureRequest,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import { getConfig } from "../utils/getConfig"
import { getProps } from "../utils/getProps"
import ConnectButton from "./sismo-connect-button"
import { Spinner } from "./spinner"

const SIGNATURE_REQUEST: SignatureRequest = {
  message: "I want TurboEth with Sismo",
  isSelectableByUser: true,
}

export default function Signature() {
  const [pageState, setPageState] = useState<string>("init")
  const [error, setError] = useState<string>("")
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>()

  const connectProps = getProps("signature")

  const [toggle, setToggle] = useState(false)

  const selectedConfig = getConfig("signature", toggle)

  return (
    <>
      <div className="mb-6 flex items-center">
        <label className="pr-4" htmlFor="impersonate-mode">
          Impersonate mode
        </label>
        <Switch
          checked={toggle}
          className="bg-green-700"
          onClick={() => setToggle((pv) => !pv)}
        />
      </div>
      <div>
        <h2 className="flex items-center text-2xl">{"Signature"}</h2>
        <div className="mb-8 mt-4 flex items-center justify-start">
          A Signature is a specific message embedded in a generated proof that
          will be checked when verifying the proof. It can be requested from the
          Data Vault via a SignatureRequest.
        </div>
      </div>

      {pageState == "init" ? (
        <ConnectButton
          selectedConfig={selectedConfig}
          connectProps={connectProps}
          setError={setError}
          setPageState={setPageState}
          setSismoConnectVerifiedResult={setSismoConnectVerifiedResult}
        />
      ) : (
        <>
          <Button
            variant="destructive"
            disabled={pageState == "verifying"}
            onClick={() => {
              window.location.href = "/integration/sismo/signature"
            }}
            className="mb-8"
          >
            {" "}
            RESET{" "}
          </Button>
          <br></br>
          <div>
            {pageState == "verifying" ? (
              <div className="flex h-24 items-center justify-center">
                <Spinner isSmall />
              </div>
            ) : (
              <>
                {error ? (
                  <span> Error verifying ZK Proofs: {error} </span>
                ) : (
                  <span>ZK Proofs verified!🎉</span>
                )}
              </>
            )}
          </div>
        </>
      )}

      {sismoConnectVerifiedResult && (
        <>
          <h3 className="my-4 text-2xl dark:text-white">Verified Auths</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg border dark:border-gray-600">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-white">AuthType</th>
                  <th className="px-4 py-2 dark:text-white">Verified UserId</th>
                </tr>
              </thead>
              <tbody>
                {sismoConnectVerifiedResult.auths.map((auth, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : ""
                    }
                  >
                    <td className="px-4 py-2">{AuthType[auth?.authType]}</td>
                    <td className="px-4 py-2">{auth?.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {sismoConnectVerifiedResult && (
        <>
          <h3 className="my-4 text-2xl dark:text-white">
            Signature requested and verified
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg border dark:border-gray-600">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-white">
                    Message Requested
                  </th>
                  <th className="px-4 py-2 dark:text-white">
                    Can User Modify message?
                  </th>
                  <th className="px-4 py-2 dark:text-white">
                    Verified Signed Message
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">{SIGNATURE_REQUEST.message}</td>
                  <td className="px-4 py-2">
                    {SIGNATURE_REQUEST.isSelectableByUser ? "yes" : "no"}
                  </td>
                  <td className="px-4 py-2">
                    {sismoConnectVerifiedResult
                      ? sismoConnectVerifiedResult.signedMessage
                      : "ZK proof not verified yet"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
