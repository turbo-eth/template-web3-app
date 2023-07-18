import { ProfileId, PublicationRevenue, useProfilePublicationRevenue } from '@lens-protocol/react-web'

type ProfileCardProps = {
  profileId: ProfileId
}

export function ProfilePublicationRevenue({ profileId }: ProfileCardProps) {
  const { data: profilePublicationRevenue, loading } = useProfilePublicationRevenue({
    profileId,
  })

  if (loading) {
    return (
      <div className="flex w-full justify-center mt-10">
        <div className=" text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 my-4">Publications Revenue</h1>

      {profilePublicationRevenue?.map((publicationRevenue: PublicationRevenue, idx) => (
        <article key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden p-6 space-y-2">
          {/* eslint-disable-next-line */}
          <p className="text-gray-700">{publicationRevenue.publication.metadata.content}</p>
          <p className="text-sm text-gray-500">{`Currency: ${publicationRevenue?.revenue?.totalAmount?.asset?.name}`}</p>
          <p className="text-sm text-gray-500">{`Symbol: ${publicationRevenue?.revenue?.totalAmount?.asset?.symbol}`}</p>
          <p className="text-sm text-gray-500">{`Amount: ${publicationRevenue?.revenue?.totalAmount.toFixed(2)}`}</p>
        </article>
      ))}
    </div>
  )
}
