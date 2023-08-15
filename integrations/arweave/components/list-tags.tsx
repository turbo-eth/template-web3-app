import { useFieldArray, useFormContext } from 'react-hook-form'

import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const FormListTags = () => {
  const { register, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })
  return (
    <div>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id} className="mb-2 flex">
              <FormControl className="mr-2 border-none dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]">
                <Input placeholder="Tag Name" {...register(`tags.${index}.name`)} />
              </FormControl>
              <FormControl className="mr-2 border-none dark:bg-neutral-800 dark:text-gray-400 dark:[color-scheme:dark]">
                <Input placeholder="Tag Value" {...register(`tags.${index}.value`)} />
              </FormControl>
              <button className="btn text-xs" type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
      <button className="btn btn-primary mt-2 text-sm" type="button" onClick={() => append({ name: '', value: '' })}>
        + new tag
      </button>
    </div>
  )
}
