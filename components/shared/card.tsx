import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import Balancer from 'react-wrap-balancer'

import { FADE_UP_ANIMATION_VARIANTS } from '@/config/design'

import { LinkComponent } from './link-component'

export default function Card({
  title,
  description,
  href,
  demo,
  large,
}: {
  title: string
  description: string
  demo: ReactNode
  large?: boolean
  href?: string
}) {
  return (
    <motion.div
      className={`relative col-span-1  overflow-hidden rounded-xl border border-gray-200 bg-white px-4 shadow-md dark:border-gray-800 dark:bg-neutral-800 dark:text-white ${
        large ? 'md:col-span-2' : ''
      }`}
      variants={FADE_UP_ANIMATION_VARIANTS}>
      <div className="flex h-60 items-center justify-center">{demo}</div>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="mb-3 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-xl font-bold text-transparent dark:from-stone-100 dark:to-emerald-200 md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="content prose-sm -mt-2 leading-normal text-gray-500 md:prose dark:text-gray-100">
          <Balancer>
            <ReactMarkdown
              components={{
                a: ({ ...props }) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                    className="font-medium text-gray-800 underline transition-colors dark:text-blue-200"
                  />
                ),

                code: ({ ...props }) => <code {...props} className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800" />,
              }}>
              {description}
            </ReactMarkdown>
          </Balancer>
        </div>
        {!href ? null : (
          <LinkComponent href={href}>
            <button className="btn btn-light my-4">Demo</button>
          </LinkComponent>
        )}
      </div>
    </motion.div>
  )
}
