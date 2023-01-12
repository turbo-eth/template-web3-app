import BranchIsAuthenticated from '@/components/Branch/BranchIsAuthenticated'
import BranchIsWalletConnected from '@/components/Branch/BranchIsWalletConnected'
import { Head } from '@/components/layout/Head'
import ButtonSIWELogin from '@/components/SIWE/ButtonSIWELogin'
import ButtonSIWELogout from '@/components/SIWE/ButtonSIWELogout'
import WalletConnect from '@/components/WalletConnect'

export default function SIWE() {
  return (
    <>
      <Head />
      <main className="flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <h3 className="text-6xl font-normal">💻</h3>
          <h3 className="text-5xl font-bold">Sign-In With Ethereum</h3>

          <h5 className="my-4 text-lg">Login to the application using an Ethereum account</h5>
          <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
            <BranchIsWalletConnected>
              <BranchIsAuthenticated>
                <ButtonSIWELogout className="btn btn-blue btn-lg " />
                <ButtonSIWELogin className="btn btn-emerald btn-lg min-h-[70px] min-w-[200px] text-xl" label="ΞID Connect" />
              </BranchIsAuthenticated>
              <WalletConnect />
            </BranchIsWalletConnected>
          </div>
        </div>
      </main>
    </>
  )
}
