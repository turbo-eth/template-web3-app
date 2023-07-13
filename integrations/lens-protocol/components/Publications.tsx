import { usePublications, Profile } from '@lens-protocol/react-web'
import { FC } from 'react'

// function Publications({ profile }: { profile: Profile }) {

interface Props {
  profile: Profile
}

const ProfilePicture: FC<Props> = ({ profile }) => {
  let { data: publications } = usePublications({
    profileId: profile.id,
    limit: 20,
  })
  publications = publications?.map((publication) => {
    if (publication.__typename === 'Mirror') {
      return publication.mirrorOf
    } else {
      return publication
    }
  })
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold">Publications: </h1>
      {publications?.map((pub: any, index: number) => (
        <div key={index} className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4">
            <p className="text-gray-800">{pub.metadata.content}</p>
          </div>
          {pub.metadata?.media[0]?.original && ['image/jpeg', 'image/png'].includes(pub.metadata?.media[0]?.original.mimeType) && (
            <img className="object-cover w-full h-48 rounded-b-lg" src={pub.metadata.media[0].original.url} alt={profile.handle} />
          )}
        </div>
      ))}
    </>
  )
}

export default ProfilePicture
