import { Profile, useExploreProfiles } from '@lens-protocol/react-web'
import Link from 'next/link'
import { convertIpfsUrl } from '@/lib/utils'
import AppearAnimation from './AppearAnimation'

const Explore = () => {
  const { data: exploreProfiles, loading } = useExploreProfiles()
  if (loading) {
    return (
      <div className="flex w-full justify-center mt-10">
        <div className=" text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-[1200px] w-full p-8 mx-auto sm:p-[70px]">
        <div className="text-white text-[32px] md:text-[50px] mb-[40px] w-full m-auto text-center">
          <h1 className="text-4xl font-bold text-center text-blue-600 my-4">Explore Profiles</h1>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {exploreProfiles?.map((profile: Profile) => (
            <Link
              key={profile.id}
              passHref
              className="border rounded-lg p-1.5 flex items-center bg-wagmi-black border-wagmi-gray"
              href={`/integration/lens-protocol/profile/${profile.handle}`}>
              <AppearAnimation className="card h-[200px] ">
                <div className="card-header mx-4 -mt-6">
                  {/* <img src={profile.picture.original.url} alt={profile.name ?? profile.handle} /> */}
                  {profile && profile.picture?.__typename === 'MediaSet' && (
                    <img
                      alt={profile.handle}
                      className="rounded-md w-[75px] h-[75px] mr-2 object-cover border-white bg-white border-4"
                      src={convertIpfsUrl(profile.picture.original.url) ?? 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
                    />
                  )}{' '}
                </div>
                <div className="card-body p-4">
                  <h4 className="font-semibold text-white w-[200px] text-ellipsis	overflow-hidden">{profile.name ?? profile.handle}</h4>
                  <p className="text-white mb-3 break-all line-clamp-3">{profile.bio}</p>
                </div>
              </AppearAnimation>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Explore
