import { LinkComponent } from '@/components/shared/link-component'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ArweaveAccountPreview } from '@/integrations/arweave/components/arweave-account/sidebar-preview'

export const SideBar = () => {
  const ipfsBaseUrl = turboIntegrations.ipfs.href
  return (
    <aside aria-label="Sidebar" className="w-full sm:w-64">
      <div className="overflow-y-auto bg-neutral-50 px-3 py-4 text-left dark:bg-neutral-800 sm:h-full">
        <ArweaveAccountPreview />
        <ul className="space-y-2 font-medium">
          <li>
            <LinkComponent
              className="group flex items-center rounded-lg p-2 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              href={`${ipfsBaseUrl}/node`}>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 22 21"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Uploaded List</span>
            </LinkComponent>
          </li>
          <li>
            <LinkComponent
              className="group flex items-center rounded-lg p-2 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              href={`${ipfsBaseUrl}/status`}>
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Status</span>
            </LinkComponent>
          </li>

          <li>
            <LinkComponent
              className="group flex items-center rounded-lg p-2 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
              href={`${ipfsBaseUrl}/upload/`}>
              <svg
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-neutral-500 transition duration-75 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                {' '}
                <path d="M0 0h24v24H0z" fill="none" />{' '}
                <path d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zM13 12v4h-2v-4H8l4-4 4 4h-3z" />{' '}
                ={' '}
              </svg>

              <span className="ml-3 flex-1 whitespace-nowrap">New Upload</span>
            </LinkComponent>
          </li>
        </ul>
      </div>
    </aside>
  )
}
