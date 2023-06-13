import { useMemo } from 'react'

import { Address as AddressComponent } from '@turbo-eth/core-wagmi'
import type { Address } from 'wagmi'

import TableCore from '../../../components/shared/table/table-core'
import TimeFromEpoch from '../../../components/shared/time-from-epoch'

/*
{
    "blockNumber": "15204742",
    "timeStamp": "1658658027",
    "hash": "0x3aa360849f6985569d3946508cbec462a8051cdcbcb03fd41658dcef800c9b65",
    "nonce": "2681446",
    "blockHash": "0x600cc1f0a66a5ada08b2c944d5366b54a7e151e26b4d839652e7af21cc3c230e",
    "transactionIndex": "50",
    "from": "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
    "to": "0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
    "value": "771500000000000000",
    "gas": "21000",
    "gasPrice": "7555699848",
    "isError": "0",
    "txreceipt_status": "1",
    "input": "0x",
    "contractAddress": "",
    "cumulativeGasUsed": "3987451",
    "gasUsed": "21000",
    "confirmations": "1200526",
    "methodId": "0x",
    "functionName": ""
}
*/

export function TransactionsTable({ data }: any) {
  const columns = useMemo(
    () => [
      {
        Header: 'From',
        accessor: 'from',
        Cell: ({ value }: { value: Address }) => <AddressComponent address={value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'To',
        accessor: 'to',
        Cell: ({ value }: { value: Address }) => <AddressComponent address={value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'Created',
        accessor: 'timeStamp',
        Cell: ({ value }: { value: string | number }) => <TimeFromEpoch epoch={value || 0} />,
      },
      {
        Header: 'Sent',
        accessor: 'value',
      },
    ],
    []
  )
  if (!data) return null
  return <TableCore columns={columns} data={data} className="w-full overflow-hidden rounded-xl" />
}

export default TransactionsTable
