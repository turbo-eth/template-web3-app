import { HTMLAttributes } from "react"
import Link from "next/link"
import { LuBook } from "react-icons/lu"
import Markdown from "react-markdown"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const DevReadme = `
# Dev guide

The Passport API provides programmatic access to a wallet's Passport score. 
Once you have your API key, you need to include it with each request you make to the API. 
This allows Gitcoin to identify your app and verify that you are authorized to access the API.

## Getting Your API Key

1. **Log in to the developer portal:** Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. **Navigate to the API Keys section:** After logging in, go to the "API Keys" section.
3. **Generate an API key:** Click on the "+ Create a Key" button to generate a unique API key for your account.
4. **Store your API key securely:** Store your API key in a secure place, as it will be used to access the Passport API.

And finally place your API key in the \`.env\` file under the name \`GITCOIN_PASSPORT_API_KEY\`.


## Scorers and Scorer ID

A Scorer is an individual object with a unique ID that is associated with your account. If you are using the Gitcoin Passport API in multiple applications, you can set up separate communities for each one. This allows you to customize the scoring rules for each application and deduplicate any identical Passport VCs that are submitted to the same application.

By using communities, you can manage specific parameter settings and log traffic for your Passport-enabled applications. This can help you ensure that the identity verification functionality is working correctly and meets the needs of your stakeholders.

### Getting your Scorer ID

1. **Log in to the Developer Portal:** Go to [scorer.gitcoin.co](https://www.scorer.gitcoin.co/) and log in to your account by connecting your wallet.
2. **Navigate to the Communities section:** After logging in, go to the "Communities" section
3. **Create a Scorer:** Click on the "+ Create a Scorer" button and input a Scorer name and description.
4. **Find your Scorer ID:** Click on the newly created Scorer and you will see the Scorer ID in the page URL.\
  Example: \`https://www.scorer.gitcoin.co/dashboard/scorer/scorer_id\`

And finally place your Scorer ID in the \`.env\` file under the name \`GITCOIN_PASSPORT_SCORER_ID\`.

`

export default function PageIntegration() {
  return (
    <>
      <Markdown
        components={{
          h1: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <h1
              className="mb-4 border-b-2 border-gray-300/40 pb-2 text-3xl font-bold uppercase"
              {...props}
            />
          ),
          h2: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <h1
              className="mb-4 border-b-2 border-gray-300/40 pb-2 text-2xl font-bold"
              {...props}
            />
          ),
          h3: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <h1
              className="mb-4 border-b-2 border-gray-300/40 pb-2 text-xl font-bold"
              {...props}
            />
          ),
          li: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <>
              <li className="mb-1 text-sm" {...props}>
                {`${(props as { index: number }).index + 1}. `}
                {props.children}
              </li>
            </>
          ),
          p: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <p className="mb-6 text-sm" {...props} />
          ),
          a: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <a
              rel="noopener noreferrer"
              target="_blank"
              {...props}
              className="font-medium text-muted-foreground underline transition-colors"
            />
          ),

          code: ({ ...props }: HTMLAttributes<HTMLElement>) => (
            <code
              {...props}
              className="rounded-sm bg-muted px-1 py-0.5 font-mono font-medium text-muted-foreground"
            />
          ),
        }}
      >
        {DevReadme}
      </Markdown>
      <Link
        href="https://docs.passport.gitcoin.co/building-with-passport/getting-access"
        target="_blank"
        rel="noreferrer noopener"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        <LuBook className="mr-2 h-4 w-4" />
        See the full Documentation
      </Link>
    </>
  )
}
