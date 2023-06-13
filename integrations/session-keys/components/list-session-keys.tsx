import { type Dispatch, type SetStateAction } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { BsCheck2 } from 'react-icons/bs'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form'
import { FormItem } from '@/components/ui/form'

import { useSessionKeys } from '../hooks/use-session-keys'
import { sessionControls } from '../utils/controls'
import { getComponent } from '../utils/get-element-component'
interface ListSessionKeysProps {
  selectedSessionKey?: `0x${string}` | undefined
  setSelectedSessionKey?: Dispatch<SetStateAction<`0x${string}` | undefined>>
}

export function ListSessionKeys({ selectedSessionKey, setSelectedSessionKey }: ListSessionKeysProps = {}) {
  const { sessionKeys, form } = useSessionKeys()
  const key = form.watch('searchKey')

  const filteredSessionKeys = sessionKeys?.filter(({ address }) => address.toLowerCase().includes(key.toLowerCase()))

  const handleSelectSessionKey = (address: `0x${string}`) => {
    if (address === selectedSessionKey) {
      setSelectedSessionKey?.(undefined)
    } else {
      setSelectedSessionKey?.(address)
    }
  }

  return (
    <div className="min-w-[540px]">
      <h2 className="mb-4 text-xl font-bold">Session Keys:</h2>
      <>
        <Form {...form}>
          <form className="space-y-8">
            {sessionControls.map((item) => {
              const Item = getComponent(item?.component)
              return (
                <FormField
                  key={item?.placeholder}
                  control={form.control}
                  name={item?.formfieldName as 'searchKey'}
                  render={({ field }) => (
                    <>
                      <FormItem>
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
          </form>
        </Form>
      </>
      <AnimatePresence>
        {filteredSessionKeys?.map(({ address }) => (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
              delay: 0.15,
            }}
            exit={{
              opacity: 0,
            }}
            key={address}>
            <Button
              variant="subtle"
              onClick={() => handleSelectSessionKey(address)}
              className="my-3 flex w-full items-center py-2 text-lg"
              key={address}>
              {address === selectedSessionKey && <BsCheck2 className="mr-2 text-2xl" />}
              <span>{address}</span>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}