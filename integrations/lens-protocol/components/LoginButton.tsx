import { useActiveProfile, useWalletLogin, useWalletLogout } from '@lens-protocol/react-web'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export function LoginButton({ handle }: { handle?: string }) {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin()
  const { execute: logout, isPending: isLogoutPending } = useWalletLogout()
  const { data: profile } = useActiveProfile()

  const { isConnected } = useAccount()
  const { disconnectAsync } = useDisconnect()

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  })

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { connector } = await connectAsync()

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient()
      await login({
        address: walletClient.account.address,
      })
    }
  }

  const onLogoutClick = async () => {
    await logout()
    await disconnectAsync()
  }

  useEffect(() => {
    if (loginError) toast.error(loginError.message)
  }, [loginError])

  return (
    <>
      {profile ? (
        <div className="flex items-center justify-center mb-4">
          <button className="btn btn-primary" onClick={onLogoutClick} disabled={isLogoutPending}>
            <strong>Log out</strong>
          </button>
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <button className="btn btn-primary" onClick={onLoginClick} disabled={isLoginPending}>
            <strong>Log in</strong>
          </button>
        </div>
      )}
    </>
  )
}
