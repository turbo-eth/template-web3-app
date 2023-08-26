import { useWalletLogout } from '@lens-protocol/react-web'

export const LogoutButton = () => {
  const { execute: logout, isPending } = useWalletLogout()

  return (
    <button className="btn btn-primary whitespace-nowrap" disabled={isPending} onClick={logout}>
      Log out
    </button>
  )
}
