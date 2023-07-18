import { usePublications, Profile } from '@lens-protocol/react-web'
import { FC } from 'react'
import { Publication } from './Publication'

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
      <h1 className="text-4xl font-bold text-center text-blue-600 my-4">My Publications: </h1>
      {publications?.map((pub: any, index: number) => (
        <Publication key={index} publication={pub} />
      ))}
    </>
  )
}

export default ProfilePicture
