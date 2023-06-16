import { type Dispatch, type SetStateAction, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { BsCheck2 } from 'react-icons/bs'
import type { Address } from 'wagmi'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useSessionKeys } from '../hooks/use-session-keys'

interface ListSessionKeysProps {
  selectedSessionKey?: Address | undefined
  setSelectedSessionKey?: Dispatch<SetStateAction<Address | undefined>>
}

export function ListSessionKeys({ selectedSessionKey, setSelectedSessionKey }: ListSessionKeysProps = {}) {
  const [search, setSearch] = useState<string>('')
  const { sessionKeys } = useSessionKeys()

  const filteredSessionKeys = sessionKeys?.filter(({ address }) => address.toLowerCase().includes(search.toLowerCase()))

  const handleSelectSessionKey = (address: Address) => {
    if (address === selectedSessionKey) {
      setSelectedSessionKey?.(undefined)
    } else {
      setSelectedSessionKey?.(address)
    }
  }

  return (
    <div className="min-w-[540px]">
      <h2 className="mb-4 text-xl font-bold">Session Keys:</h2>
      <Input placeholder="Search addresses..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <AnimatePresence>
        {filteredSessionKeys?.map(({ address }) => (
          <motion.div
            key={address}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            initial={{
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              delay: 0.15,
            }}>
            <Button
              key={address}
              className="my-3 flex w-full items-center py-2 text-lg"
              variant="subtle"
              onClick={() => handleSelectSessionKey(address)}>
              {address === selectedSessionKey && <BsCheck2 className="mr-2 text-2xl" />}
              <span>{address}</span>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
