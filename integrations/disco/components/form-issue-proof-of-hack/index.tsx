import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { getComponent } from "../../utils/get-element-component"
import { issueProofOfHackFormControls } from "./controls"
import { useDiscoIssueForm } from "./hook"

export function FormCredentialIssuanceProofOfHack() {
  const { onSubmit, form, isLoading, isError, isSuccess, error, data } =
    useDiscoIssueForm()
  const { handleSubmit, register } = form
  const { toast, dismiss } = useToast()

  const handleToast = () => {
    toast({
      title: "Proof of Hack Copied",
      description: "The output has been copied to your clipboard.",
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  return (
    <>
      <div className="card w-full">
        <Form {...form}>
          <form
            className="flex w-full flex-col space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {issueProofOfHackFormControls.map((item) => {
              const Item = getComponent(item?.component)

              return (
                <FormField
                  key={item?.label}
                  control={form.control}
                  name={item?.formfieldName as "eventDate"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item?.label}</FormLabel>
                      <FormControl className="input dark:border-gray-600 dark:text-gray-600 dark:[color-scheme:dark]">
                        <Item
                          {...item?.attribute}
                          {...field}
                          {...register(item?.formfieldName as "eventDate")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
            <div>
              {isError && (
                <div className="mb-3 font-medium text-red-500">
                  {error instanceof Error ? error.message : String(error)}
                </div>
              )}
              <button className="btn btn-emerald w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Issue Proof of Hack Credential"}
              </button>
            </div>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <h3 className="text-center">Proof of Hack</h3>
          <p className="text-center text-sm text-gray-500">
            Proof of Hack recognizes the holder for participating in a Hackathon
          </p>
        </div>
      </div>
      {isSuccess && (
        <div className="card container mt-10 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              Successfully Created Proof of Hack Credential
            </h3>
            <CopyToClipboard
              text={JSON.stringify(data, null, 2)}
              onCopy={handleToast}
            >
              <span className="flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                <FaCopy className=" text-neutral-600 dark:text-neutral-100" />
              </span>
            </CopyToClipboard>
          </div>

          <hr className="my-4" />
          <textarea
            readOnly
            className="input h-96 dark:text-gray-600 dark:placeholder:text-neutral-400"
            value={JSON.stringify(data, null, 2)}
          />
        </div>
      )}
    </>
  )
}
