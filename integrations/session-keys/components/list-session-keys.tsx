import { type Dispatch, type SetStateAction, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { BsCheck2 } from 'react-icons/bs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useSessionKeys } from '../hooks/use-session-keys'

interface ListSessionKeysProps {
  selectedSessionKey?: `0x${string}` | undefined
  setSelectedSessionKey?: Dispatch<SetStateAction<`0x${string}` | undefined>>
}

export function ListSessionKeys({ selectedSessionKey, setSelectedSessionKey }: ListSessionKeysProps = {}) {
  const [search, setSearch] = useState<string>('')
  const { sessionKeys } = useSessionKeys()

  const filteredSessionKeys = sessionKeys?.filter(({ address }) => address.toLowerCase().includes(search.toLowerCase()))

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
      <Input type="text" placeholder="Search addresses..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
