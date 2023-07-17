import { motion } from 'framer-motion'
import Image from 'next/image'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export const GeneralInfo = () => {
  return (
    <motion.div
      animate="show"
      className="mb-4 flex items-start justify-start p-4 dark:text-white"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <div className="rounded border border-slate-200 p-5 dark:border-slate-600">
        {/* Network Select */}
        <div className="mb-4 flex items-center">
          <div className="flex w-60 flex-col ">
            <Select value="ethereum">
              <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent className="w-56 bg-white dark:bg-gray-700">
                <SelectItem value="ethereum">
                  <div className="flex items-center justify-between">
                    <Image
                      alt="Ethereum"
                      className="mr-2 rounded-full"
                      height={30}
                      src="/integrations/connext/logos/chains/ethereum.png"
                      width={30}
                    />
                    Ethereum Market
                  </div>
                </SelectItem>
                <SelectItem value="asdf">
                  <div className="flex items-center justify-between">
                    <Image
                      alt="Ethereum"
                      className="mr-2 rounded-full"
                      height={30}
                      src="/integrations/connext/logos/chains/ethereum.png"
                      width={30}
                    />
                    Ethereum Market
                  </div>
                </SelectItem>
                <SelectItem value="qwer">
                  <div className="flex items-center justify-between">
                    <Image
                      alt="Ethereum"
                      className="mr-2 rounded-full"
                      height={30}
                      src="/integrations/connext/logos/chains/ethereum.png"
                      width={30}
                    />
                    Ethereum Market
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Net Worth, Net APY, Health Factor */}
        <div className="flex justify-between">
          <div className="mr-3 text-slate-500 dark:text-slate-300">
            <h3 className="mb-2">Net Worth</h3>
            <p className="font-bold text-black dark:text-white">
              <span className="text-slate-500 dark:text-slate-300">$</span>1.000
            </p>{' '}
            {/* replace with actual value */}
          </div>
          <div className="mr-3 text-slate-500 dark:text-slate-300">
            <h3 className="mb-2">Net APY</h3>
            <p className="font-bold text-black dark:text-white">
              2.5<span className="text-slate-500 dark:text-slate-300">%</span>
            </p>{' '}
            {/* replace with actual value */}
          </div>
          <div className="mr-3 text-slate-500 dark:text-slate-300">
            <h3 className="mb-2">Health Factor</h3>
            <p className="font-bold text-orange-500">1.65</p> {/* replace with actual value */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
