import { PropsWithChildren } from "react"

export function Loadable({
  isLoading,
  children,
}: PropsWithChildren<{ isLoading: boolean }>) {
  return isLoading ? (
    <div className="h-20 w-full animate-pulse rounded-lg bg-muted/80"></div>
  ) : (
    <>{children}</>
  )
}
