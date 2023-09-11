import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"

export function DialogStopStream() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="mt-4 w-full">
          Stop Livestream
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-y-4 text-center">
          <span className="text-xl font-bold">
            You are about to stop your Livestream
          </span>
          <div className="flex w-full justify-center gap-x-4">
            <AlertDialogAction>
              <Link
                href={`/integration/livepeer/livestream/`}
                className={cn(buttonVariants({ variant: "destructive" }))}
              >
                <span>Stop Livestream</span>
              </Link>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
