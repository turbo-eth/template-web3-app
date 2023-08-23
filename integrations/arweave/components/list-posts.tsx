import moment from 'moment'
import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'

import { LinkComponent } from '@/components/shared/link-component'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { ConnectArweaveWallet } from './connect-arweave-wallet'
import { Spinner } from './spinner'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'
import { useGetPosts } from '../hooks/use-get-posts'
import { humanFileSize } from '../utils'

type FormType = {
  tags: {
    values: { value: string }[]
    name: string
  }[]
  address: string
}

const TagValues = ({ control, tagIndex, register }: { control: Control<FormType>; tagIndex: number; register: UseFormRegister<FormType> }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tags.${tagIndex}.values`,
  })
  return (
    <ul className="mb-1">
      {fields.map((item, subIndex) => {
        return (
          <li key={item.id} className="mb-2 flex">
            <FormControl className="mr-2 dark:border-none dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]">
              <Input placeholder="Tag Value" {...register(`tags.${tagIndex}.values.${subIndex}.value`)} />
            </FormControl>
            {fields.length > 1 && (
              <button className="btn btn-primary mr-2 font-mono text-xs" type="button" onClick={() => remove(subIndex)}>
                x
              </button>
            )}
          </li>
        )
      })}
      <button className="btn btn-primary mt-2 text-sm" type="button" onClick={() => append({ value: '' })}>
        + New Value
      </button>
    </ul>
  )
}

export const ListPosts = () => {
  const { wallet, address } = useArweaveWallet()
  const { posts, loading, form, onSubmit, hasNextPage, getNextPage } = useGetPosts()
  const { handleSubmit, control, register, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  if (!wallet) return <ConnectArweaveWallet />
  return (
    <div className="flex w-full flex-col text-left">
      <Form {...form}>
        <form className="flex w-full flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row items-center justify-between">
                  <span>Owner address</span>
                  <button className="btn btn-primary text-xs" type="button" onClick={() => setValue('address', address ?? '')}>
                    Use connected wallet address
                  </button>
                </FormLabel>
                <FormControl className="input dark:border-gray-600 dark:text-gray-400 dark:[color-scheme:dark]">
                  <Input {...field} {...register('address')} className="dark:bg-neutral-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-4">
            <FormLabel>Tags</FormLabel>
            <ul className="mb-1 mt-2">
              {fields.map((item, index) => {
                return (
                  <li key={item.id} className="mb-2 flex">
                    <FormControl className="mr-2 dark:border-none dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]">
                      <Input placeholder="Tag Name" {...register(`tags.${index}.name`)} />
                    </FormControl>
                    <TagValues control={control} register={register} tagIndex={index} />
                    <button
                      className="btn h-10 bg-red-300 text-xs hover:bg-red-400 dark:bg-red-700 hover:dark:bg-red-800"
                      type="button"
                      onClick={() => remove(index)}>
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>
            <button className="btn btn-primary mt-2 text-sm" type="button" onClick={() => append({ name: '', values: [{ value: '' }] })}>
              + New Tag
            </button>
          </div>
          <input className="btn btn-primary my-2" disabled={loading} type="submit" value="Search" />
        </form>
      </Form>
      <h2 className="mt-4 mb-2">Posts</h2>
      {posts.map((p) => (
        <LinkComponent key={p.id} className="card mt-1 mb-2 flex justify-between" href={`/integration/arweave/posts/${p.id}`}>
          <div className="flex flex-col items-start text-sm capitalize">
            <span>{p.data.type?.replace('/', ' ') ?? 'data'}</span>
            <span className="mt-1 text-xs">{p.tags.find((tag) => tag.name === 'Protocol-Name')?.value ?? 'Data'}</span>
          </div>
          <div className="flex flex-col items-end text-xs">
            <span>
              Size: <span className="font-mono">{humanFileSize(p.data.size)}</span>
            </span>
            <span className="mt-1">{p.block?.timestamp ? moment(parseInt(p.block?.timestamp) * 1000).format('MMM D, YYYY h:mm A') : ''}</span>
          </div>
        </LinkComponent>
      ))}
      {!loading && !posts.length && <div>No post matched.</div>}
      {!loading && hasNextPage && (
        <button className="btn btn-primary mt-2 text-sm" onClick={() => getNextPage()}>
          Load more
        </button>
      )}
      {loading && (
        <div className="flex items-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
