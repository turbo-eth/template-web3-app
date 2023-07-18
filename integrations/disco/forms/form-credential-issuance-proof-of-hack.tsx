import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useDiscoIssueCredential } from '../hooks/use-disco-issue-credential'
import { useDiscoIssueForm } from '../hooks/use-disco-issue-form'
import { discoControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

const FormCredentialIssuanceProofOfHack = () => {
  const { mutation } = useDiscoIssueCredential()
  const { onSubmit, form } = useDiscoIssueForm()
  const { isLoading } = mutation

  const { handleSubmit, register } = form

  return (
    <div className="card w-full">
      <Form {...form}>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {discoControls.map((item) => {
            const Item = getComponent(item?.component)

            return (
              <FormField
                key={item?.label}
                control={form.control}
                name={item?.formfieldName as 'eventDate'}
                render={({ field }) => {
                  return (
                    <>
                      <FormItem>
                        <FormLabel>{item?.label}</FormLabel>
                        <FormControl>
                          <Item {...item?.attribute} {...field} {...register(item?.formfieldName as 'eventDate')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )
                }}
              />
            )
          })}

          <Button className="btn btn-emerald w-full dark:bg-green-600 dark:text-white" disabled={isLoading}>
            Issue
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default FormCredentialIssuanceProofOfHack
