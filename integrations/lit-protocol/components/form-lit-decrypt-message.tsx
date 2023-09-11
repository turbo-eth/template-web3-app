import { useState } from "react"
import { Separator } from "@radix-ui/react-select"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { useToast } from "@/lib/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

import { useLitClient } from "../hooks/use-lit-client"

interface FormLitDecryptMessageProps {
  initialEencryptedMessageId: string
}

export function FormLitDecryptMessage({
  initialEencryptedMessageId,
}: FormLitDecryptMessageProps) {
  const [encryptedMessageId, setEncryptedMessageId] = useState<string>(
    initialEencryptedMessageId
  )
  const [decryptedMessage, setDecryptedMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { decryptMessage } = useLitClient()
  const { register, handleSubmit } = useForm()
  const { toast, dismiss } = useToast()

  const isValid = encryptedMessageId.length > 0

  const onSubmit = async () => {
    if (!isValid) return
    setIsLoading(true)
    const { decryptedString, error } = await decryptMessage(encryptedMessageId)
    setIsLoading(false)

    if (!error) {
      setDecryptedMessage(decryptedString)
    } else if (error === "Message not found") {
      handleToast(
        "No ID found",
        "The ID you entered does not match any encrypted message. Please check the ID and try again."
      )
      return
    } else if (error === "Access denied") {
      handleToast(
        "Access denied",
        "Your address do not met the access control conditions of this message."
      )
      return
    } else {
      handleToast("Error", "Something went wrong. Please try again.")
      return
    }
  }

  const handleToast = (title: string, description: string) => {
    toast({
      title,
      description,
    })

    setTimeout(() => {
      dismiss()
    }, 4200)
  }

  return (
    <div className="w-full">
      <IsWalletConnected>
        <div className="w-full">
          <motion.form
            animate="show"
            initial="hidden"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card>
              <CardContent>
                <label>ID:</label>
                <input
                  className="input mt-4"
                  {...register("message")}
                  value={encryptedMessageId}
                  onChange={(e) => setEncryptedMessageId(e.target.value)}
                />
                <Button
                  variant="emerald"
                  className="mt-4"
                  disabled={isLoading || !isValid}
                  type="submit"
                >
                  {isLoading ? "Loading..." : "Decrypt"}
                </Button>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="justify-between">
                <h3 className="text-center">Encrypted message ID</h3>
                <p className="text-center text-sm text-muted-foreground">
                  The ID of the encrypted message saved into a database.
                </p>
              </CardFooter>
            </Card>
          </motion.form>
          {decryptedMessage && (
            <motion.div
              animate="show"
              className="my-8"
              initial="hidden"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Card>
                <CardContent>
                  <h4>Decrypted Message:</h4>
                  <Textarea
                    readOnly
                    className="input mt-4 h-40 text-muted-foreground"
                    value={decryptedMessage}
                  />
                </CardContent>
                <Separator className="my-4" />
                <CardFooter className="justify-between">
                  {" "}
                  <h3 className="text-center">Decrypted Message</h3>
                  <p className="text-center text-sm text-muted-foreground">
                    Make sure to only share the decrypted message with trusted
                    individuals.
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex items-center justify-center gap-10">
          <WalletConnect />
        </div>
      </IsWalletDisconnected>
    </div>
  )
}
