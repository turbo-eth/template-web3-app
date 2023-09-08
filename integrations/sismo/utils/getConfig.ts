
const CONFIG_MAPPING= {
  auth:{
    appId: "0x6687efe350ee1dc1af93a8b118cf016e", 
    vault: {
      impersonate: [
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "github:leosayous21",
        "twitter:dhadrien_:2390703980",
      ]
    },
    displayRawResponse: false,
    vaultAppBaseUrl: "https://vault-beta.sismo.io"
  },
  claims:{
    appId: "0x32403ced4b65f2079eda77c84e7d2be6", 
    vault: {
      impersonate: [
        "dhadrien.sismo.eth",
        "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38",
        "0x1b9424ed517f7700e7368e34a9743295a225d889",
        "0x82fbed074f62386ed43bb816f748e8817bf46ff7",
        "0xc281bd4db5bf94f02a8525dca954db3895685700",
        // Github Data Source
        "github:dhadrien",
        // Twitter Data Source
        "twitter:dhadrien_",
        // Telegram Data Source
        "telegram:dhadrien",]
    },
    displayRawResponse: false,
    vaultAppBaseUrl: "https://vault-beta.sismo.io"
  
  },
  signature:{
    appId: "0x32403ced4b65f2079eda77c84e7d2be6", 
    vault: {
      impersonate: [
        // "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        // "github:leosayous21",
        // "twitter:dhadrien_:2390703980",
      ]
    }
  
  }
}






import { SismoConnectConfig } from "@sismo-core/sismo-connect-react";

export const getConfig = (tabValue: keyof typeof CONFIG_MAPPING = "auth") => {
  const config: SismoConnectConfig = CONFIG_MAPPING[tabValue]
  return config;
}