"use client"

import { SetStateAction, useState } from "react"

// import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import Auth from "./components/Auth"
import Claim from "./components/Claim"
import Signature from "./components/Signature"

const TAB_MAPPING = {
  auth: <div>auth</div>,
  claims: <div>claims</div>,
  signature: <div>signature</div>,
}

export default function Sismo() {
  // const [tabValue, setTabValue] = useState("claims")
  // const [checkValue, setCheckValue] = useState(false)

  const handleTabClick = (tabName: string) => {
    setTabValue(tabName)
  }

  return (
    <>
      {/* <ConnectButton /> */}
      <div>
        {/* <Switch
          checked={checkValue === true}
          onChange={(isChecked) => {
            setCheckValue(!!isChecked)
          }}
        /> */}
        {/* <Tabs defaultValue="auth" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger onClick={() => handleTabClick("auth")} value="auth">
              Auth
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTabClick("claims")}
              value="claims"
            >
              Claims
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTabClick("signature")}
              value="signature"
            >
              Signature
            </TabsTrigger>
          </TabsList>
          <TabsContent value="auth" className="mt-6">
            <Auth tabValue={tabValue} />
          </TabsContent>
          <TabsContent value="claims" className="mt-6">
            <Claim tabValue={tabValue} />
          </TabsContent>
          <TabsContent value="signature" className="mt-6">
            <Signature tabValue={tabValue} />
          </TabsContent>
        </Tabs> */}

        <Auth />
      </div>
    </>
  )
}
