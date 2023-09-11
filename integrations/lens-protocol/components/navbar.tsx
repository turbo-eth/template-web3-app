import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { useActiveProfile } from "@lens-protocol/react-web"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LinkComponent } from "@/components/shared/link-component"

import { getProfilePictureSrc } from "../utils"
import { IsUserAuthenticated } from "./auth/is-user-authenticated"
import { LoginButton } from "./auth/login-button"
import { LogoutButton } from "./auth/logout-button"
import { NotAuthenticatedYet } from "./auth/not-authenticated-yet"

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const router = useRouter()
  const search = useCallback(() => {
    router.push(`/integration/lens-protocol/search?q=${searchQuery}`)
  }, [searchQuery])
  const { data: activeProfile } = useActiveProfile()
  return (
    <nav className="flex flex-col items-center rounded-xl bg-neutral-100 px-3 py-4 dark:bg-stone-900 sm:px-8 sm:py-10 lg:flex-row">
      <h1 className="mb-4 text-xl font-bold lg:mb-0">TurboLens</h1>
      <div className="flex w-full flex-1 flex-col items-center md:flex-row md:justify-between lg:w-auto">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0 lg:ml-8">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              search()
            }}
          >
            <label
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="default-search"
            >
              Search
            </label>
            <div className="relative w-full sm:min-w-[300px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                id="default-search"
                placeholder="Search..."
                type="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="blue"
                className="absolute bottom-2.5 right-2.5 rounded-lg"
                type="submit"
              >
                Search
              </Button>
            </div>
          </form>
          <LinkComponent
            href="/integration/lens-protocol/explore"
            className="p-2 font-semibold"
          >
            Explore
          </LinkComponent>
        </div>
        <ul className="ml-0 mt-4 flex items-center space-x-6 md:ml-4 md:mt-0">
          <IsUserAuthenticated showLoading>
            <li className="flex basis-1/3 font-semibold">
              <LinkComponent href="/integration/lens-protocol/profiles">
                Profiles
              </LinkComponent>
            </li>
            {activeProfile && (
              <li className="flex basis-1/3 font-semibold">
                <LinkComponent
                  href={`/integration/lens-protocol/profiles/${activeProfile.handle}`}
                >
                  <Avatar>
                    <AvatarImage src={getProfilePictureSrc(activeProfile)} />
                    <AvatarFallback className="bg-gray-200 uppercase dark:bg-gray-800">
                      {activeProfile.handle.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </LinkComponent>
              </li>
            )}
          </IsUserAuthenticated>
          <li>
            <IsUserAuthenticated>
              <div className="flex basis-1/3">
                <LogoutButton />
              </div>
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
