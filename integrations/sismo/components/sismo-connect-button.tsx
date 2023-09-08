"use client"

import {
  AuthType,
  SismoConnectButton,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-react"

// import { config } from "../config/sismo-connect-config"

export default function ConnectButton({
  selectedConfig = {},
  connectProps = {},
  setError = () => {},
  setPageState = () => {},
}) {
  return (
    <div>
      <SismoConnectButton
        config={selectedConfig}
        // Sismo Connect Request
        // request proof of Data Sources ownership (e.g EVM, GitHub, Twitter or Telegram)
        auths={connectProps?.auths}
        // request proof of Data Group memberships of source
        // (e.g part of NFT owners, Dao Participants, GitHub commiters)
        claims={connectProps?.claims}
        // request message signature from users.
        signature={connectProps?.signature}
        // onResponseBytes={(response: string) => {
        //   // call your contract with the response as bytes
        // }}
        onResponse={async (response) => {
          console.log("res", response)
          await connectProps?.response(response, setError, setPageState)
        }}
      />
    </div>
  )
}
