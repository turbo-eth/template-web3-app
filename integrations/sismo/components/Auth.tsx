import React, { useState } from "react"
import { useRouter } from "next/router"

// import { useAuthRequest } from "../hooks/use-auth-request"
import { getConfig } from "../utils/getConfig"
import { getProps } from "../utils/getProps"
import ConnectButton from "./sismo-connect-button"

export default function Auth() {
  const [pageState, setPageState] = useState<string>("init")
  const [error, setError] = useState<string>("")

  const selectedConfig = getConfig("auth")
  const connectProps = getProps("auth")

  // const router = useRouter()

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
          <button
            onClick={() => {
              window.location.href = "/integration/sismo/auth"
              // await router.push("/integration/sismo/auth")
            }}
          >
            {" "}
            RESET{" "}
          </button>
          <br></br>
          <div className="status-wrapper">
            {pageState == "verifying" ? (
              <span className="verifying"> Verifying ZK Proofs... </span>
            ) : (
              <>
                {error ? (
                  <span className="error">
                    {" "}
                    Error verifying ZK Proofs: {error}{" "}
                  </span>
                ) : (
                  <span className="verified"> ZK Proofs verified!</span>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
