import React from 'react'

import { Address, Balance, trimFormattedBalance } from '@turbo-eth/core-wagmi'
import { formatEther } from 'ethers/lib/utils.js'

import TableCore from '../shared/table/TableCore'
import TimeFromEpoch from '../shared/time/TimeFromEpoch'

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

function TransactionsTable({ data }: any) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'From',
        accessor: 'from',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'To',
        accessor: 'to',
        Cell: (props: any) => <Address address={props.value} truncate className="text-sm font-medium" />,
      },
      {
        Header: 'Created',
        accessor: 'timeStamp',
        Cell: (props: any) => <TimeFromEpoch epoch={props.value || 0} />,
      },
      {
        Header: 'Sent',
        accessor: 'value',
        // Cell: (props: any) => <span className="">{trimFormattedBalance(props?.value || '0.00')}</span>,
      },
      // {
      //   Header: () => null,
      //   id: 'actions',
      //   accessor: 'hash',
      //   Cell: (props: any) => (
      //     <div className="flex items-center justify-end gap-2">
      //       <Link href={`/dashboard/transaction/${props.value}`}>
      //         <span className="text-xs">View</span>
      //       </Link>
      //     </div>
      //   ),
      // },
    ],
    []
  )
  if (!data) return null
  return <TableCore columns={columns} data={data} className="w-full overflow-hidden rounded-xl" />
}

export default TransactionsTable
