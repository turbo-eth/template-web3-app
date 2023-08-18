import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, useFormContext } from 'react-hook-form'

import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Form = {
  data: string
  tags: {
    value: string
    name: string
  }[]
  file?: File | undefined
}

export const FormListTags = ({
  fields,
  append,
  remove,
}: {
  fields: FieldArrayWithId<Form, 'tags', 'id'>[]
  append: UseFieldArrayAppend<Form, 'tags'>
  remove: UseFieldArrayRemove
}) => {
  const { register } = useFormContext()
  return (
    <div>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id} className="mb-2 flex">
              <FormControl className="mr-2 dark:border-none dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]">
                <Input placeholder="Tag Name" {...register(`tags.${index}.name`)} />
              </FormControl>
              <FormControl className="mr-2 dark:border-none dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]">
                <Input placeholder="Tag Value" {...register(`tags.${index}.value`)} />
              </FormControl>
              <button
                className="btn bg-red-300 text-xs hover:bg-red-400 dark:bg-red-700 hover:dark:bg-red-800"
                type="button"
                onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
      <button className="btn btn-primary mt-2 text-sm" type="button" onClick={() => append({ name: '', value: '' })}>
        + New Tag
      </button>
    </div>
  )
}
