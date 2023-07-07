import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useDiscoIssueCredential } from '../hooks/use-disco-issue-credential'
import { discoControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

const FormCredentialIssuanceProofOfHack = () => {
  const { form, onSubmit, mutation } = useDiscoIssueCredential()
  // const { data, isLoading, isError } = ApiCall()
  // const { isLoading, isError, isSuccess, error, data } = mutation

  const { watch, handleSubmit, register } = form

  // const date = watch('eventDate')
  //console.log('data:::::', mutation.isSuccess)
  return (
    <div className="card w-full">
      <>
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
                    // console.log('item::', field)
                    return (
                      <>
                        <FormItem>
                          <FormLabel>{item?.label}</FormLabel>
                          <FormControl>
                            <Item
                              {...item?.attribute}
                              // onClick={() => console.log('kjwbcjkw')}
                              {...field}
                              {...register(item?.formfieldName as 'eventDate')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )
                  }}
                />
              )
            })}

            <Button className="btn btn-emerald w-full">Issue</Button>
          </form>
        </Form>
      </>
    </div>
  )
}
export default FormCredentialIssuanceProofOfHack
