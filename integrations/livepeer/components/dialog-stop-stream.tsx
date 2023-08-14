import { LinkComponent } from '@/components/shared/link-component'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'

export function DialogStopStream() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn btn-red mt-4 flex w-full cursor-pointer rounded-md">
        <button>Stop Livestream</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-y-4 text-center">
          <span className="text-xl font-bold">You are about to stop your Livestream</span>
          <div className="flex w-full justify-center gap-x-4">
            <AlertDialogAction className="btn-red">
              <LinkComponent href={`/integration/livepeer/livestream/`}>
                <span>Stop Livestream</span>
              </LinkComponent>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
