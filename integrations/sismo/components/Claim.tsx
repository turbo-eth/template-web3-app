import React, { useState } from "react"
import { AuthType, ClaimType } from "@sismo-core/sismo-connect-react"
import { SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import { getConfig } from "../utils/getConfig"
import { getProps } from "../utils/getProps"
import ConnectButton from "./sismo-connect-button"
import { Spinner } from "./spinner"

export default function Claim() {
  const [pageState, setPageState] = useState<string>("init")
  const [error, setError] = useState<string>("")
  const connectProps = getProps("claims")
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>()

  const [toggle, setToggle] = useState(false)

  const selectedConfig = getConfig("claims", toggle)

  return (
    <>
      <div className="mb-6 flex items-center">
        <label className="Label pr-4" htmlFor="impersonate-mode">
          Impersonate mode
        </label>
        <Switch
          checked={toggle}
          className="bg-green-700"
          onClick={() => setToggle((pv) => !pv)}
        />
      </div>
      <h2 className="flex items-center text-2xl">{"Claims"}</h2>
      <div className="mb-8 mt-4 flex items-center">
        Sismo Connect can be used to request zero-knowledge proofs (ZKPs) that
        attest group membership from users.
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
              window.location.href = "/integration/sismo/claim"
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
          <h3 className="my-4 text-2xl dark:text-white">Verified Claims</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg border dark:border-gray-600">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-white">groupId</th>
                  <th className="px-4 py-2 dark:text-white">ClaimType</th>
                  <th className="px-4 py-2 dark:text-white">Verified Value</th>
                </tr>
              </thead>
              <tbody>
                {sismoConnectVerifiedResult.claims.map((claim, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-gray-100 dark:bg-gray-600" : ""
                    }
                  >
                    <td className="px-4 py-2">
                      <a
                        target="_blank"
                        href={`https://factory.sismo.io/groups-explorer?search=${
                          claim.groupId || ""
                        }`}
                      >
                        {claim.groupId}
                      </a>
                    </td>
                    <td className="px-4 py-2">{ClaimType[claim.claimType!]}</td>
                    <td className="px-4 py-2">{claim.value}</td>
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
