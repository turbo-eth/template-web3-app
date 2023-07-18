import { useActiveProfileSwitch, useActiveProfile, useProfilesOwnedByMe } from '@lens-protocol/react-web'

function ProfileSwitcher() {
  const { data: activeProfile } = useActiveProfile()
  const { execute: switchActiveProfile, isPending } = useActiveProfileSwitch()
  const { data: profiles, error, loading } = useProfilesOwnedByMe()

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="my-5 flex flex-col items-center">
      <p className="font-semibold text-lg mb-2">Active profile: {activeProfile?.handle}</p>
      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li key={profile.id} className="list-none">
            <button
              disabled={isPending || activeProfile?.id === profile.id}
              className={`px-4 py-2 rounded text-white font-semibold ${
                isPending || activeProfile?.id === profile.id ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={() => {
                /* eslint-disable-next-line */
                switchActiveProfile(profile.id)
              }}>
              {profile.handle}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ProfileSwitcher
