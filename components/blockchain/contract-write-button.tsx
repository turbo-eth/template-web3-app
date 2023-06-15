import { ButtonHTMLAttributes } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContractWriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoadingTx: boolean
  isLoadingWrite: boolean
  write?: boolean
  loadingWriteText?: string
  loadingTxText?: string
  text?: string
}

export const ContractWriteButton = ({
  children,
  className,
  isLoadingTx,
  isLoadingWrite,
  write = true,
  loadingWriteText = 'Sign the transaction in your wallet',
  loadingTxText = 'Writing...',
  ...props
}: ContractWriteButtonProps) => {
  return (
    <Button disabled={!write || isLoadingWrite || isLoadingTx} className={cn('btn w-full', className)} {...props}>
      {isLoadingWrite ? loadingWriteText : isLoadingTx ? loadingTxText : children}
    </Button>
  )
}
