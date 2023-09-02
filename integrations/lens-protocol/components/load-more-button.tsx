import { Button } from "@/components/ui/button"

import { Spinner } from "./spinner"

export const LoadMoreButton = ({
  hasMore,
  loading,
  onClick,
}: {
  hasMore: boolean
  loading: boolean
  onClick: () => void
}) =>
  hasMore ? (
    <div className="mt-4 flex flex-row items-center justify-center">
      <Button onClick={onClick} disabled={loading} variant="outline">
        {loading ? (
          <>
            <Spinner />
            loading...
          </>
        ) : (
          "Load More"
        )}
      </Button>
    </div>
  ) : null
