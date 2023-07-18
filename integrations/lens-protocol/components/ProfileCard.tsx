import { Profile } from '@lens-protocol/react-web'

type ProfileCardProps = {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="max-w-sm m-auto p-6 rounded-xl bg-gradient-to-r mb-5 from-indigo-300 to-purple-400 py-4 overflow-hidden shadow-lg flex flex-col items-center border-transparent">
      {profile && profile.picture?.__typename === 'MediaSet' && (
        <img alt={profile.handle} className="rounded-full" height="200" src={profile.picture.original.url} width="200" />
      )}{' '}
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{profile?.handle}</div>
        <p className=" text-base">{profile?.name}</p>
        <p className=" text-base">{profile?.bio}</p>
      </div>
    </div>
  )
}
