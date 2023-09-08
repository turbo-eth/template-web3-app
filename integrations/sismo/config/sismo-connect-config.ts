import { SismoConnectConfig } from "@sismo-core/sismo-connect-react";

export const config: SismoConnectConfig = {
  // you will need to get an appId from the Factory
  appId: "0xf4977993e52606cfd67b7a1cde717069", 
  vault: {
    // For development purposes insert the identifier that you want to impersonate here
    // Never use this in production
    impersonate: [
      // "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      // "github:leosayous21",
      // "twitter:dhadrien_:2390703980",
    ]
  }
}