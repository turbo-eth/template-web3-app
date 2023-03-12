'use client'

import AppUsersTable from '@/components/app/app-users-table'
import { useGetAppUsers } from '@/lib/hooks/app/use-get-app-users'
import useUser from '@/lib/hooks/app/use-user'

export default function PageAdmin() {
  const { user } = useUser()
  const { isLoading, isError, data } = useGetAppUsers(user)
  return (
    <section className="p-10 lg:p-20">
      <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
        {isError && <h3 className="text-lg font-normal">Unauthorized Access</h3>}
        {!isLoading && <AppUsersTable data={data?.users} className="w-full flex-1" />}
      </div>
    </section>
  )
}
