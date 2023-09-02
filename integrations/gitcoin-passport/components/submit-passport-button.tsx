import { Button } from "@/components/ui/button"

import { useSubmitPassport } from "../hooks/use-submit-passport"
import { Spinner } from "./spinner"

export const SubmitPassportButton = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => {
  const { submitPassport, isLoading } = useSubmitPassport()
  return (
    <Button
      variant="emerald"
      className="space-x-4"
      onClick={() => {
        submitPassport()
          .then(() => onSuccess())
          .catch(console.error)
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex flex-row items-center justify-center space-x-2">
          <Spinner isSmall />
          <span>Submitting Passport</span>
        </div>
      ) : (
        "Submit Passport"
      )}
    </Button>
  )
}
