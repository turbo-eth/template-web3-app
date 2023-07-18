import { useWalletLogout } from '@lens-protocol/react-web'
import { useDisconnect } from 'wagmi'

export function LogoutButton() {
  const { execute: logout, isPending: isLogoutPending } = useWalletLogout()
  const { disconnectAsync } = useDisconnect()
  const onLogoutClick = async () => {
    await logout()
    await disconnectAsync()
  }

  return (
    <div className="flex justify-center my-4">
      <button className="btn btn-primary" disabled={isLogoutPending} onClick={onLogoutClick}>
        <strong>Log out</strong>
      </button>
    </div>
  )
}
