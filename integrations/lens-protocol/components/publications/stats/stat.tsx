import { Profile } from "@lens-protocol/react-web"

import { ProfileListModal } from "../../profile/profile-list-modal"

export const Stat = ({
  name,
  value,
  data,
  hasMore,
  loading,
  next,
}: {
  name: string
  value: number
  data?: Profile[]
  hasMore: boolean
  loading: boolean
  next: () => void
}) => (
  <ProfileListModal
    hasMore={hasMore}
    loading={loading}
    next={next}
    profiles={data ?? []}
    title={name}
    trigger={
      <span className="text-sm">
        <span className="mr-1 font-semibold">{value}</span>
        <span className="text-gray-600 dark:text-gray-500">{name}</span>
      </span>
    }
  />
)
