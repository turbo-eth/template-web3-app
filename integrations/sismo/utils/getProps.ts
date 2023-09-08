
import { AuthType, SismoConnectResponse } from "@sismo-core/sismo-connect-react";

type ErrorSetter = (error: any) => void; // You should replace 'any' with the actual error type
type PageStateSetter = (state: string) => void;


const CONNECT_BUTTON_PROPS = {
  auth:{
    auths:[{ authType: AuthType.GITHUB },{ authType: AuthType.TWITTER }],
    claims:[],
    signature:{},
    response: async(response: SismoConnectResponse,
      setError: ErrorSetter, 
      setPageState: PageStateSetter
) => 
      {
      const res = await fetch("/api/sismo/auth", {
        method: "POST",
        body: JSON.stringify(response),
      });
      const data = await res.json();
              if (res.ok) {
                  // setSismoConnectVerifiedResult(data);
                setPageState("verified");
                } else {
                  setPageState("error");
                  setError(data);
            }
          }

  },
  claims:{
    auths: [{ authType: AuthType.GITHUB,isOptional:true }],
    claims:[{
      groupId: "0xda1c3726426d5639f4c6352c2c976b87",
    },],
    signature:{},
    response: async(response: SismoConnectResponse,setError: ErrorSetter, 
      setPageState: PageStateSetter) => {
      console.log('claimres',response)
      const res = await fetch("/api/sismo/claim", {
        method: "POST",
        body: JSON.stringify(response),
      });
      console.log('claimres2',res)

      const data = await res.json();
              if (res.ok) {
                  // setSismoConnectVerifiedResult(data);
                setPageState("verified");
                } else {
                  setPageState("error");
                  setError(data);
                }
    }
  },
  signature:{
    auths: [{ authType: AuthType.GITHUB,isOptional:true }],
    claims:[],
    signature:{ message: "I vote Yes to Privacy workworkwokrokwr",isSelectableByUser: true, },
    response: async(response: SismoConnectResponse,
      setError: ErrorSetter, 
      setPageState: PageStateSetter) => {
      console.log('claimres',response)
      const res = await fetch("/api/sismo/signature", {
        method: "POST",
        body: JSON.stringify(response),
      });
      console.log('claimres2',res)

      const data = await res.json();
              if (res.ok) {
                  // setSismoConnectVerifiedResult(data);
                setPageState("verified");
                } else {
                  setPageState("error");
                  setError(data);
                }
    }
  }
}


export const getProps = (tabValue: keyof typeof CONNECT_BUTTON_PROPS = "auth") => {
  const connectProps = CONNECT_BUTTON_PROPS[tabValue]
  return connectProps;
}