import { Button } from "@/components/ui/button"

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
        Load More
      </Button>
    </div>
  ) : null
