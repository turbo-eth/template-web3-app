import { useCallback, useState } from 'react'

import { useActiveProfile } from '@lens-protocol/react-web'
import { useRouter } from 'next/navigation'

import { LinkComponent } from '@/components/shared/link-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getProfilePictureSrc } from '../utils'
import { IsUserAuthenticated } from './auth/is-user-authenticated'
import { LoginButton } from './auth/login-button'
import { LogoutButton } from './auth/logout-button'
import { NotAuthenticatedYet } from './auth/not-authenticated-yet'

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()
  const search = useCallback(() => {
    router.push(`/integration/lens-protocol/search?q=${searchQuery}`)
  }, [searchQuery])
  const { data: activeProfile } = useActiveProfile()
  return (
    <nav className="xs:px-6 xs:py-4 dark:bg-stone-900 flex-col md:flex-row flex justify-between px-8 py-10 rounded-xl items-center bg-neutral-100">
      <h1 className="text-xl font-bold mb-4 md:mb-0">TurboLens</h1>
      <div className="flex-col md:flex-row flex items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            search()
          }}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" htmlFor="default-search">
            Search
          </label>
          <div className="min-w-[300px] relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <input
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="default-search"
              placeholder="Search..."
              type="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="text-white absolute right-2.5 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit">
              Search
            </button>
          </div>
        </form>
        <ul className="ml-0 md:ml-4 mt-4 md:mt-0 flex items-center space-x-6">
          <li className="font-semibold">
            <LinkComponent href="/integration/lens-protocol/explore">Explore</LinkComponent>
          </li>
          <IsUserAuthenticated showLoading>
            <li className="font-semibold">
              <LinkComponent href="/integration/lens-protocol/profiles">Profiles</LinkComponent>
            </li>
            {activeProfile && (
              <li className="font-semibold">
                <LinkComponent href={`/integration/lens-protocol/profiles/${activeProfile.handle}`}>
                  <Avatar>
                    <AvatarImage src={getProfilePictureSrc(activeProfile)} />
                    <AvatarFallback className="uppercase">{activeProfile.handle.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                </LinkComponent>
              </li>
            )}
          </IsUserAuthenticated>
          <li>
            <IsUserAuthenticated>
              <LogoutButton />
            </IsUserAuthenticated>
            <NotAuthenticatedYet>
              <LoginButton />
            </NotAuthenticatedYet>
          </li>
        </ul>
      </div>
    </nav>
  )
}
