import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

import { LinkComponent } from '@/components/shared/link-component'

import { useGetTransaction } from '../../hooks/transaction'
import { OutputData } from '../output-data'

const defaultValues = {
  chain: '0x1',
  transactionHash: '0xdc85cb1b75fd09c2f6d001fea4aba83764193cbd7881a1fa8ccde350a5681109',
}

interface FormSchema {
  chain: string
  transactionHash: string
}

export function FormGetTransaction() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({ defaultValues })

  const chain = useDebounce(watch('chain'), 500)
  const transactionHash = useDebounce(watch('transactionHash'), 500)

  const { data, error, isFetching, refetch } = useGetTransaction({
    chain,
    transactionHash,
    enabled: false,
  })

  const onsubmit = async () => {
    await refetch?.()
  }

  return (
    <div className="w-full">
      <form className="card flex w-full flex-col gap-4" onSubmit={handleSubmit(onsubmit)}>
        <label>Chain</label>
        <input {...register('chain')} className="input" />
        <label>Transaction Hash</label>
        <input {...register('transactionHash')} className="input" />
        <>{error && <span className="text-red-500">{String(error)}</span>}</>
        <button className="btn btn-emerald mt-4" disabled={isFetching || !chain || !transactionHash} type="submit">
          {isFetching ? 'Loading...' : 'Submit'}
        </button>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <LinkComponent isExternal className="font-bold hover:underline" href="https://docs.moralis.io/web3-data-api/evm/reference/get-transaction">
            <h3 className="text-center">Get transaction by hash</h3>
          </LinkComponent>
          <p className="text-center text-sm text-gray-500">Get the contents of a transaction by the given transaction hash</p>
        </div>
      </form>
      <OutputData data={data} />
    </div>
  )
}
