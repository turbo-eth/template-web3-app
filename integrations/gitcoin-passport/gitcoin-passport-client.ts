import { useAccount } from 'wagmi'
export const CheckConnection = () => {
  const { address, isConnected } = useAccount()
  if (isConnected) {
    return address
  } else {
    console.log('not connected...')
  }

}
