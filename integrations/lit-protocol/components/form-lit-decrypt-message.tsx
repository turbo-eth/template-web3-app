import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { Button } from '@/components/ui/button'
import { FormItem, FormLabel } from '@/components/ui/form'
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form'
import { getComponent } from '@/integrations/erc20/utils/get-element-component'
import { useToast } from '@/lib/hooks/use-toast'

import { useLitClient } from '../hooks/use-lit-client'
import { litControls } from '../utils/controls'

interface FormLitDecryptMessageProps {
  initialEencryptedMessageId: string
}

export function FormLitDecryptMessage({ initialEencryptedMessageId }: FormLitDecryptMessageProps) {
  const [encryptedMessageId, setEncryptedMessageId] = useState<string>(initialEencryptedMessageId)
  const [decryptedMessage, setDecryptedMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { decryptMessage, form } = useLitClient()
  const { register, handleSubmit } = useForm()
  const { toast, dismiss } = useToast()

  const isValid = encryptedMessageId.length > 0

  const onSubmit = async () => {
    if (!isValid) return
    setIsLoading(true)
    const { decryptedString, error } = await decryptMessage(encryptedMessageId)
    setIsLoading(false)

    if (!error) {
      setDecryptedMessage(decryptedString)
    } else if (error === 'Message not found') {
      handleToast('No ID found', 'The ID you entered does not match any encrypted message. Please check the ID and try again.')
      return
    } else if (error === 'Access denied') {
      handleToast('Access denied', 'Your address do not met the access control conditions of this message.')
      return
    } else {
      handleToast('Error', 'Something went wrong. Please try again.')
      return
    }
  }

  const handleToast = (title: string, description: string) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  const FormComponent = () => {
    return (
      <>
        <Form {...form}>
          <form className="space-y-8">
            {litControls.map((item) => {
              const Item = getComponent(item?.component)
              return (
                <FormField
                  key={item?.placeholder}
                  control={form.control}
                  name={item?.formfieldName as 'searchKey'}
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>{item?.label}</FormLabel>
                        <FormControl>
                          <Item {...item?.attribute} placeholder={item?.placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              )
            })}

            <Button className="w-full" type="submit">
              {isLoading ? 'Loading...' : 'Decrypt'}
            </Button>
          </form>
        </Form>
      </>
    )
  }

  return (
    <div className=" card w-full">
      <BranchIsWalletConnected>
        <div className="w-full">
          <h2 className="mb-4 text-xl font-bold">Decrypt here</h2>
          <FormComponent />
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">Encrypted message ID</h3>
            <p className="text-center text-sm text-gray-500">The ID of the encrypted message saved into a database.</p>
          </div>
          {/* <motion.form
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            initial="hidden"
            animate="show"
            className="card flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            <label>ID:</label>
            <input
              className="input mt-4"
              {...register('message')}
              value={encryptedMessageId}
              onChange={(e) => setEncryptedMessageId(e.target.value)}
            />
            <button disabled={isLoading || !isValid} type="submit" className="btn btn-emerald mt-4 disabled:opacity-50">
              {isLoading ? 'Loading...' : 'Decrypt'}
            </button>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <h3 className="text-center">Encrypted message ID</h3>
              <p className="text-center text-sm text-gray-500">The ID of the encrypted message saved into a database.</p>
            </div>
          </motion.form> */}

          {/* {decryptedMessage && (
            <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} initial="hidden" animate="show" className="card my-8">
              <h4>Decrypted Message:</h4>
              <Textarea readOnly value={decryptedMessage} className="input mt-4 h-40 dark:text-gray-600 dark:placeholder:text-neutral-400" />
              <hr className="my-4" />
              <div className="flex items-center justify-between">
                <h3 className="text-center">Decrypted Message</h3>
                <p className="text-center text-sm text-gray-500">Make sure to only share the decrypted message with trusted individuals.</p>
              </div>
            </motion.div>
          )} */}
        </div>
        <div className="flex items-center justify-center gap-10">
          <WalletConnect />
        </div>
      </BranchIsWalletConnected>
    </div>
  )
}
