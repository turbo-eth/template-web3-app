import FormCredentialIssuanceProofOfHack from '../forms/form-credential-issuance-proof-of-hack'
import { useDiscoIssueCredential } from '../hooks/use-disco-issue-credential'

export default function DiscoIssueCredentials() {
  const { mutation } = useDiscoIssueCredential()

  const { isLoading, isError } = mutation

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Some Issues found!</div>

  return (
    <div className="card w-full">
      <div className="w-full">
        <FormCredentialIssuanceProofOfHack />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Disco Proof Of Hack Credentials Issue</h3>
          <p className="text-center text-sm text-gray-500">Issue a new Proof Of Hack Credentials for any recipient</p>
        </div>
      </div>
    </div>
  )
}
