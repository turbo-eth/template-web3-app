import { useForm } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

import { LinkComponent } from '@/components/shared/link-component'

import { useGetContractLogs } from '../../hooks/events'
import { OutputData } from '../output-data'

const defaultValues = {
  chain: '0x1',
  address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
}

interface FormSchema {
  chain: string
  address: string
}

export function FormGetContractLogs() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({ defaultValues })

  const chain = useDebounce(watch('chain'), 500)
  const address = useDebounce(watch('address'), 500)

  const { data, error, isFetching, refetch } = useGetContractLogs({
    chain,
    address,
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
        <label>Address</label>
        <input {...register('address')} className="input" />
        <>{error && <span className="text-red-500">{String(error)}</span>}</>
        <button className="btn btn-emerald mt-4" disabled={isFetching || !chain || !address} type="submit">
          {isFetching ? 'Loading...' : 'Submit'}
        </button>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <LinkComponent
            isExternal
            className="font-bold hover:underline"
            href="https://docs.moralis.io/web3-data-api/evm/reference/get-contract-logs">
            <h3 className="text-center">Get logs by contract</h3>
          </LinkComponent>
          <p className="text-center text-sm text-gray-500">Get the logs for a contract</p>
        </div>
      </form>
      <OutputData data={data} />
    </div>
  )
}
