import { useSubmitPassport } from "../hooks/use-submit-passport"
import { Spinner } from "./spinner"

export const SubmitPassportButton = ({
  onSuccess,
}: {
  onSuccess: () => void
}) => {
  const { submitPassport, isLoading } = useSubmitPassport()
  return (
    <button
      className="btn btn-emerald space-x-4"
      onClick={() => {
        submitPassport()
          .then(() => onSuccess())
          .catch(console.error)
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex flex-row space-x-2">
          <Spinner isSmall />
          <span>Submitting Passport</span>
        </div>
      ) : (
        "Submit Passport"
      )}
    </button>
  )
}
