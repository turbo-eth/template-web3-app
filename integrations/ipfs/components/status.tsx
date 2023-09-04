"use client"

import { data } from "tailwindcss/defaultTheme"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { useIpfsStatus } from "../hooks/use-ipfs-status"
import { formatDateTime } from "../utils"
import { getComponent } from "../utils/get-element-component"
import { statusControls } from "../utils/status-controls"

const IpfsStatus: React.FC = () => {
  const { onSubmit, form, isLoading, isError, data, setData } = useIpfsStatus()

  const { handleSubmit, register, getValues } = form
  const values = getValues()

  return (
    <>
      <div className="card h-full w-full ">
        <h3 className="mb-4 justify-start text-left">Enter CID</h3>

        <Form {...form}>
          <form
            className="flex w-full flex-col space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {statusControls.map((item) => {
              const Item = getComponent(item?.component)

              return (
                <FormField
                  key={item?.label}
                  control={form.control}
                  name={item?.formfieldName as "cid"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="input dark:border-gray-600 dark:text-gray-600 dark:[color-scheme:dark]">
                        <Item
                          {...item?.attribute}
                          {...field}
                          {...register(item?.formfieldName as "cid")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
            <div>
              <Button className="w-full" variant="emerald" disabled={isLoading}>
                {isLoading ? "Loading..." : "Status Check"}
              </Button>
            </div>
          </form>
        </Form>
        <div>
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <h3 className="text-center">IPFS Upload</h3>
            <p className="text-center text-sm text-gray-500">
              IPFS uploads provide decentralized and permanent off-chain data
              storage.
            </p>
          </div>
        </div>
        {Object.keys(data).length > 0 ? (
          <div className="mt-10 flex w-full justify-between">
            Sucess ={">"}
            <div className="items-center">
              {" "}
              {data && data.dagSize && <div>DAG Size: {data.dagSize}</div>}{" "}
              {data && data.created && (
                <div>Created: {formatDateTime(data.created)}</div>
              )}
              <button
                onClick={() => {
                  setData({})
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />{" "}
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default IpfsStatus
