import moment from "moment"
import { Control, useFieldArray, UseFormRegister } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LinkComponent } from "@/components/shared/link-component"

import { useArweaveWallet } from "../hooks/use-arweave-wallet"
import { useGetPosts } from "../hooks/use-get-posts"
import { humanFileSize } from "../utils"
import { ConnectArweaveWallet } from "./connect-arweave-wallet"
import { Spinner } from "./spinner"

type FormType = {
  tags: {
    values: { value: string }[]
    name: string
  }[]
  address: string
}

const TagValues = ({
  control,
  tagIndex,
  register,
}: {
  control: Control<FormType>
  tagIndex: number
  register: UseFormRegister<FormType>
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tags.${tagIndex}.values`,
  })
  return (
    <ul className="mb-1">
      {fields.map((item, subIndex) => {
        return (
          <li key={item.id} className="mb-2 flex">
            <FormControl className="mr-2 bg-background text-muted-foreground dark:border-none">
              <Input
                placeholder="Tag Value"
                {...register(`tags.${tagIndex}.values.${subIndex}.value`)}
              />
            </FormControl>
            {fields.length > 1 && (
              <Button
                className="mr-2 font-mono text-xs"
                type="button"
                onClick={() => remove(subIndex)}
              >
                x
              </Button>
            )}
          </li>
        )
      })}
      <Button
        className="mt-2 text-sm"
        type="button"
        onClick={() => append({ value: "" })}
      >
        + New Value
      </Button>
    </ul>
  )
}

export const ListPosts = () => {
  const { wallet, address } = useArweaveWallet()
  const { posts, loading, form, onSubmit, hasNextPage, getNextPage } =
    useGetPosts()
  const { handleSubmit, control, register, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  })

  if (!wallet) return <ConnectArweaveWallet />
  return (
    <div className="flex w-full flex-col text-left">
      <Form {...form}>
        <form
          className="flex w-full flex-col space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-row items-center justify-between">
                  <span>Owner address</span>
                  <Button
                    className="text-xs"
                    onClick={() => setValue("address", address ?? "")}
                  >
                    Use connected wallet address
                  </Button>
                </FormLabel>
                <FormControl className="input border text-muted-foreground">
                  <Input
                    {...field}
                    {...register("address")}
                    className="dark:bg-neutral-800"
                  />
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
                    <FormControl className="mr-2 bg-background text-muted-foreground">
                      <Input
                        placeholder="Tag Name"
                        {...register(`tags.${index}.name`)}
                      />
                    </FormControl>
                    <TagValues
                      control={control}
                      register={register}
                      tagIndex={index}
                    />
                    <Button variant="destructive" onClick={() => remove(index)}>
                      Delete
                    </Button>
                  </li>
                )
              })}
            </ul>
            <Button
              className="mt-2 text-sm"
              type="button"
              onClick={() => append({ name: "", values: [{ value: "" }] })}
            >
              + New Tag
            </Button>
          </div>
          <Button
            className="my-2"
            disabled={loading}
            type="submit"
            value="Search"
          />
        </form>
      </Form>
      <h2 className="mb-2 mt-4">Posts</h2>
      {posts.map((p) => (
        <LinkComponent
          key={p.id}
          className="card mb-2 mt-1 flex justify-between"
          href={`/integration/arweave/posts/${p.id}`}
        >
          <div className="flex flex-col items-start text-sm capitalize">
            <span>{p.data.type?.replace("/", " ") ?? "data"}</span>
            <span className="mt-1 text-xs">
              {p.tags.find((tag) => tag.name === "Protocol-Name")?.value ??
                "Data"}
            </span>
          </div>
          <div className="flex flex-col items-end text-xs">
            <span>
              Size:{" "}
              <span className="font-mono">{humanFileSize(p.data.size)}</span>
            </span>
            <span className="mt-1">
              {p.block?.timestamp
                ? moment(parseInt(p.block?.timestamp) * 1000).format(
                    "MMM D, YYYY h:mm A"
                  )
                : ""}
            </span>
          </div>
        </LinkComponent>
      ))}
      {!loading && !posts.length && <div>No post matched.</div>}
      {!loading && hasNextPage && (
        <Button className="mt-2 text-sm" onClick={() => getNextPage()}>
          Load more
        </Button>
      )}
      {loading && (
        <div className="flex items-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
