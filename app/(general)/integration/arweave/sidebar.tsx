import { turboIntegrations } from "@/data/turbo-integrations"

import { LinkComponent } from "@/components/shared/link-component"
import { ArweaveAccountPreview } from "@/integrations/arweave/components/arweave-account/sidebar-preview"

export const SideBar = () => {
  const arweaveBaseUrl = turboIntegrations.arweave.href
  return (
    <aside aria-label="Sidebar" className="w-full sm:w-64">
      <div className="overflow-y-auto bg-neutral-50 px-3 py-4 text-left dark:bg-neutral-800 sm:h-full">
        <ArweaveAccountPreview />
        <ul className="space-y-2 font-medium">
          <li>
            <LinkComponent
              className="group flex items-center rounded-lg p-2 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              href={`${arweaveBaseUrl}/account`}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 22 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Arweave account</span>
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              className="group flex items-center rounded-lg p-2 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              href={`${arweaveBaseUrl}/posts`}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Posts</span>
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              className="group flex items-center rounded-lg p-2 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              href={`${arweaveBaseUrl}/posts/new`}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">New Post</span>
            </LinkComponent>
          </li>
        </ul>
      </div>
    </aside>
  )
}
