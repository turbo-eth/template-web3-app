"use client"

import {
  SismoConnectButton,
  SismoConnectConfig,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react"

import { connectPropsType } from "../utils/getProps"

type ErrorSetter = (error: any) => void
type PageStateSetter = (state: string) => void
type SismoConnectVerifiedResultSetter = (
  result: SismoConnectVerifiedResult
) => void

interface ConnectButtonProps {
  selectedConfig: SismoConnectConfig
  connectProps: connectPropsType
  setError: ErrorSetter
  setPageState: PageStateSetter
  setSismoConnectVerifiedResult: SismoConnectVerifiedResultSetter
}

export default function ConnectButton({
  selectedConfig,
  connectProps,
  setError,
  setPageState,
  setSismoConnectVerifiedResult,
}: ConnectButtonProps) {
  return (
    <div>
      <SismoConnectButton
        config={selectedConfig}
        auths={connectProps?.auths}
        claims={connectProps?.claims}
        signature={connectProps?.signature}
        onResponse={(response) => {
          connectProps?.response(
            response,
            setError,
            setPageState,
            setSismoConnectVerifiedResult
          )
        }}
      />
    </div>
  )
}
