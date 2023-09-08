import {
  AuthRequest,
  AuthType,
  ClaimRequest,
  ClaimType,
  SismoConnectResponse,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react"

type ErrorSetter = (error: any) => void
type PageStateSetter = (state: string) => void
type SismoConnectVerifiedResultSetter = (
  result: SismoConnectVerifiedResult
) => void

export interface connectPropsType {
  auths: AuthRequest[]
  claims?: ClaimRequest[]
  signature?: {
    message: string
    isSelectableByUser: boolean
  }
  response: (
    response: SismoConnectResponse,
    setError: ErrorSetter,
    setPageState: PageStateSetter,
    setSismoConnectVerifiedResult: SismoConnectVerifiedResultSetter
  ) => void
}

const CONNECT_BUTTON_PROPS = {
  auth: {
    auths: [
      { authType: AuthType.GITHUB, isOptional: true },
      { authType: AuthType.TWITTER },
      { authType: AuthType.VAULT },
      { authType: AuthType.EVM_ACCOUNT },
    ],
    claims: [],
    response: async (
      response: SismoConnectResponse,
      setError: ErrorSetter,
      setPageState: PageStateSetter,
      setSismoConnectVerifiedResult: SismoConnectVerifiedResultSetter
    ) => {
      setPageState("verifying")

      const res = await fetch("/api/sismo/auth", {
        method: "POST",
        body: JSON.stringify(response),
      })
      const data = await res.json()
      if (res.ok) {
        setSismoConnectVerifiedResult(data)
        setPageState("verified")
      } else {
        setPageState("error")
        setError(data)
      }
    },
  },
  claims: {
    auths: [{ authType: AuthType.GITHUB, isOptional: true }],
    claims: [
      {
        groupId: "0xda1c3726426d5639f4c6352c2c976b87",
      },
      {
        groupId: "0x1cde61966decb8600dfd0749bd371f12",
        claimType: ClaimType.GTE,
        value: 15, // dhadrien.sismo.eth has a score of 46, eligible. Can reveal more.
        isSelectableByUser: true, // can reveal more than 15 if they want
      },
    ],
    response: async (
      response: SismoConnectResponse,
      setError: ErrorSetter,
      setPageState: PageStateSetter,
      setSismoConnectVerifiedResult: SismoConnectVerifiedResultSetter
    ) => {
      setPageState("verifying")

      const res = await fetch("/api/sismo/claim", {
        method: "POST",
        body: JSON.stringify(response),
      })

      const data = await res.json()
      if (res.ok) {
        setSismoConnectVerifiedResult(data)
        setPageState("verified")
      } else {
        setPageState("error")
        setError(data)
      }
    },
  },
  signature: {
    auths: [{ authType: AuthType.GITHUB, isOptional: true }],
    claims: [],
    signature: {
      message: "I want TurboEth with Sismo",
      isSelectableByUser: true,
    },
    response: async (
      response: SismoConnectResponse,
      setError: ErrorSetter,
      setPageState: PageStateSetter,
      setSismoConnectVerifiedResult: SismoConnectVerifiedResultSetter
    ) => {
      setPageState("verifying")

      const res = await fetch("/api/sismo/signature", {
        method: "POST",
        body: JSON.stringify(response),
      })
      const data = await res.json()
      if (res.ok) {
        setSismoConnectVerifiedResult(data)
        setPageState("verified")
      } else {
        setPageState("error")
        setError(data)
      }
    },
  },
}

export const getProps = (
  tabValue: keyof typeof CONNECT_BUTTON_PROPS = "auth"
) => {
  const connectProps: connectPropsType = CONNECT_BUTTON_PROPS[tabValue]
  return connectProps
}
