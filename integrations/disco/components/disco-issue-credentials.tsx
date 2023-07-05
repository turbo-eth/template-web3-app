import FormCredentialIssuanceProofOfHack from '../forms/form-credential-issuance-proof-of-hack'

export default function DiscoIssueCredentials() {
  return (
    <div className="card w-full">
      <div className="w-full">
        <FormCredentialIssuanceProofOfHack />
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">ERC20 Deploy</h3>
          <p className="text-center text-sm text-gray-500">Deploy a new mintable ERC20 token to any blockchain</p>
        </div>
      </div>
    </div>
  )
}
