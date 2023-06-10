import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'

import { LinkComponent } from '@/components/shared/link-component'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { FormDescription, FormItem } from '@/components/ui/form'

import { useOpenAIPrompt } from '../hooks/use-openai-prompt'
import { openaiPromptControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'

export function FormOpenAIPrompt() {
  const { response, isLoading, handleGenerateResponse, form, handleToast } = useOpenAIPrompt()

  const { register } = form
  return (
    <div className="card w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGenerateResponse)} className="space-y-8">
          {openaiPromptControls.map((item) => {
            const Item = getComponent(item?.component)

            return (
              <FormField
                key={item?.label}
                control={form.control}
                name={item?.formfieldName as 'apiKey' | 'prompt'}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>{item?.label}</FormLabel>
                      <FormControl>
                        <div>
                          <Item
                            {...item?.attribute}
                            placeholder={item?.placeholder}
                            {...field}
                            {...register(item?.formfieldName as 'apiKey' | 'prompt')}
                          />
                        </div>
                      </FormControl>

                      <FormDescription>{item?.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            )
          })}

          {true && (
            <>
              <div className="pb-8">
                {response}
                <CopyToClipboard text={response}>
                  <span
                    onClick={() =>
                      handleToast({
                        title: 'AI response copied to clipboard',
                        description: 'You can now paste the response anywhere you want.',
                      })
                    }
                    className="flex-center absolute right-72 h-4 w-4 cursor-pointer rounded-md pt-6 pb-60 hover:text-gray-700">
                    <FaCopy className=" dark:text-neutral-100" />
                  </span>
                </CopyToClipboard>
              </div>
            </>
          )}

          <Button className="w-full" type="submit">
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </form>
      </Form>

      <hr className="my-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-center">OpenAI</h3>
        <p className="text-center text-sm text-gray-500">
          <LinkComponent className="font-bold" isExternal href={'https://platform.openai.com/account/api-keys'}>
            Get your API keys
          </LinkComponent>{' '}
          to interact with OpenAI.
        </p>
      </div>
    </div>
  )
}
