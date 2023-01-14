import { motion } from 'framer-motion'
import { useQuery } from 'react-query'

import DashboardSidebar from '@/components/layout/DashboardSidebar'
import { Head } from '@/components/layout/Head'
import ButtonSIWELogout from '@/components/siwe/ButtonSIWELogout'
import TransactionsTable from '@/components/TransactionsTable'
import { accountTransactions } from '@/lib/actions/accountTransactions'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/design'

export default function Page() {
  const { isLoading, data } = useQuery('accountTransactions', accountTransactions)
  return (
    <>
      <Head />
      <div className="flex-center container mx-auto flex flex-1 flex-col items-center justify-center">
        <motion.div
          className="grid w-full flex-1 grid-cols-12 gap-x-10"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}>
          <div className="bg-gradient-primary col-span-12 flex w-full flex-col rounded-lg p-6 shadow-lg lg:col-span-3">
            <h3 className="text-gradient-primary text-2xl font-bold">Wallet</h3>
            <hr className="my-5 dark:border-gray-200 dark:opacity-50" />
            <DashboardSidebar className="h-full flex-1" />
            <div className="">
              <hr className="my-5 dark:border-gray-200 dark:opacity-50" />
              <ButtonSIWELogout className="link">Logout</ButtonSIWELogout>
            </div>
          </div>
          <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
            {!isLoading && <TransactionsTable data={data?.transactions} className="w-full" />}
          </div>
        </motion.div>
      </div>
    </>
  )
}
