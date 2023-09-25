"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTally } from "@/integrations/tally/hooks/use-tally"

export const ApiKeyFormGate = ({ children }: { children: ReactNode }) => {
  const { apiKey, setApiKey } = useTally()
  const formSchema = z.object({
    apiKey: z.string().min(1),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  return apiKey ? (
    <>
      {children}
      <Button
        variant="outline"
        className="mt-8"
        onClick={() => setApiKey(null)}
      >
        Remove API key
      </Button>
    </>
  ) : (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) =>
            setApiKey(values.apiKey)
          )}
        >
          <CardHeader>
            <CardTitle>Set Tally API Key</CardTitle>
            <CardDescription>
              Please enter your Tally API key, if you don&apos;t have one, get
              one from{" "}
              <Link
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.tally.xyz/user/settings"
              >
                Tally
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="input">
                    <Input
                      className="border bg-background text-muted-foreground"
                      placeholder="Tally API key"
                      {...field}
                      {...form.register("apiKey")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Set API key
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
