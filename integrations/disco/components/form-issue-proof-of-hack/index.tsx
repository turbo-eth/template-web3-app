import CopyToClipboard from "react-copy-to-clipboard"
import { FaCopy } from "react-icons/fa"

import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"

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
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-y-8"
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
                        <FormControl className="input border bg-background text-muted-foreground">
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
                <Button
                  variant="emerald"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Issue Proof of Hack Credential"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="justify-between">
          <h3 className="text-center">Proof of Hack</h3>
          <p className="text-center text-sm text-muted-foreground">
            Proof of Hack recognizes the holder for participating in a Hackathon
          </p>
        </CardFooter>
      </Card>
      {isSuccess && (
        <Card className="mt-20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                Successfully Created Proof of Hack Credential
              </h3>
              <CopyToClipboard
                text={JSON.stringify(data, null, 2)}
                onCopy={handleToast}
              >
                <span className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                  <FaCopy className="text-muted-foreground" />
                </span>
              </CopyToClipboard>
            </div>
          </CardHeader>
          <Separator className="mb-8" />
          <CardContent>
            <textarea
              readOnly
              className="input h-96 text-muted-foreground"
              value={JSON.stringify(data, null, 2)}
            />
          </CardContent>
        </Card>
      )}
    </>
  )
}
