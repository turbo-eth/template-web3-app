import React, { useState } from "react"

import { Button } from "@/components/ui/button"

// import { useAuthRequest } from "../hooks/use-auth-request"
import { getConfig } from "../utils/getConfig"
import { getProps } from "../utils/getProps"
import ConnectButton from "./sismo-connect-button"

export default function Auth() {
  const [pageState, setPageState] = useState<string>("init")
  const [error, setError] = useState<string>("")

  const selectedConfig = getConfig("auth")
  const connectProps = getProps("auth")

  console.log("selectedConfig", selectedConfig)
  return (
    <>
      <div>{"auth"}</div>

      {pageState == "init" ? (
        <ConnectButton
          selectedConfig={selectedConfig}
          connectProps={connectProps}
          setError={setError}
          setPageState={setPageState}
        />
      ) : (
        <>
          <Button
            variant="destructive"
            onClick={() => {
              window.location.href = "/integration/sismo/auth"
            }}
          >
            {" "}
            RESET{" "}
          </Button>
          <br></br>
          <div className="status-wrapper">
            {pageState == "verifying" ? (
              <span className="inline-block rounded-md border border-gray-400 bg-gray-300 px-4 py-2 text-center text-lg">
                Verifying ZK Proofs...{" "}
              </span>
            ) : (
              <>
                {error ? (
                  <span className="inline-block rounded-md border border-red-400 bg-red-300 px-4 py-2 text-center text-lg">
                    {" "}
                    Error verifying ZK Proofs: {error}{" "}
                  </span>
                ) : (
                  <span className="emerald-200 inline-block rounded-md border px-4 py-2 text-center text-lg">
                    ZK Proofs verified!
                  </span>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
