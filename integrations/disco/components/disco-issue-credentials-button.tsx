import { LinkComponent } from '@/components/shared/link-component'

export default function DiscoIssueCredentialsButton() {
  return (
    <LinkComponent className="btn btn-emerald w-full" href={`/integration/disco/proof-of-hack`}>
      Issue
    </LinkComponent>
  )
}
