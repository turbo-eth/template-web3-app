import React, { useState } from "react"
import { AuthType } from "@sismo-core/sismo-connect-react"
import { SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/integrations/arweave/components/spinner"

import { getConfig } from "../utils/getConfig"
import { connectPropsType, getProps } from "../utils/getProps"
import ConnectButton from "./sismo-connect-button"

export default function Auth() {
  const [pageState, setPageState] = useState<string>("init")
  const [error, setError] = useState<string>("")
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>()

  const selectedConfig = getConfig("auth")
  const connectProps: connectPropsType = getProps("auth")

  return (
    <>
      <h2 className="flex items-center text-2xl">{"Auth"}</h2>
      <div className="mb-8 mt-4 flex items-center">
        Sismo Connect can be used to authenticate a user from multiple sources,
        either from web2 or web3.
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
            disabled={pageState == "verifying"}
            variant="destructive"
            onClick={() => {
              window.location.href = "/integration/sismo/auth"
            }}
            className="mb-8"
          >
            {" "}
            RESET{" "}
          </Button>
          <br></br>
          <div className="status-wrapper">
            {pageState == "verifying" ? (
              <div className="flex h-24 items-center justify-center">
                <Spinner isSmall />
              </div>
            ) : (
              <>
                {error ? (
                  <span className="inline-block rounded-md border border-red-400 bg-red-300 px-4 py-2 text-center text-lg">
                    {" "}
                    Error verifying ZK Proofs: {error}{" "}
                  </span>
                ) : (
                  <span className="emerald-200 inline-block rounded-md border px-4 py-2 text-center text-xl">
                    ZK Proofs verified!🎉
                  </span>
                )}
              </>
            )}
          </div>
        </>
      )}

      {sismoConnectVerifiedResult && (
        <>
          <h3 className="my-4 text-xl dark:text-white">Verified Auths</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg border border-gray-300 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800 dark:shadow-white">
              <thead className="dark:bg-gray-700">
                <tr>
                  <th className="bg-gray-200 px-4 py-2 dark:bg-gray-700 dark:text-white">
                    AuthType
                  </th>
                  <th className="bg-gray-200 px-4 py-2 dark:bg-gray-700 dark:text-white">
                    Verified UserId
                  </th>
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
    </>
  )
}
