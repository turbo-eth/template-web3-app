export function PaymentInfo({ useTaskTreasuryFunds }: { useTaskTreasuryFunds: boolean }) {
  return (
    <div>
      <div className="mb-5 flex w-full items-center justify-between opacity-70">
        <h3 className="text-2xl font-bold">Pay with</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <p className="col-span-2 opacity-70 md:col-span-1">Spend</p>
        <p className="col-span-2 md:col-span-3">{useTaskTreasuryFunds ? 'Gelato Balance' : 'Contract Funds'}</p>
      </div>
    </div>
  )
}
