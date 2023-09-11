import { Button } from "@/components/ui/button"

import { useSubmitPassport } from "../hooks/use-submit-passport"

export const SubmitPassportButton = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => {
  const { submitPassport, isLoading } = useSubmitPassport()
  return (
    <div>
      <div className="mb-2 text-sm">
        <div className="font-semibold">Submit Passport for Scoring</div>
        this is simply a message-signing to verify you are the owner of the
        wallet. This operation does not include any fees. once submitted your
        passport will be created/updated in this community. hit the submit
        button to get your passport score.
      </div>
      <Button
        variant="emerald"
        className="w-auto space-x-4"
        onClick={() => {
          submitPassport()
            .then(() => onSuccess())
            .catch(console.error)
        }}
        disabled={isLoading}
      >
        Submit
      </Button>
    </div>
  )
}
