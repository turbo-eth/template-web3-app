
import { SismoConnect, SismoConnectVerifiedResult, AuthType, ClaimType } from "@sismo-core/sismo-connect-server";
import { getConfig } from "../utils/getConfig";

export async function POST(req: Request) {

  try {
    const res = new Response()

    const config = getConfig('claims')
    console.log('config',config)
    const sismoConnect = SismoConnect({config})
    console.log('sismo',sismoConnect)
    
    const sismoConnectResponse = await req.json().catch((error) => {
      console.error('Error parsing request body as JSON:', error);
      return null;
    });

    console.log('sismoConnectResponse',sismoConnectResponse,'hahahhahahahahha')
    
    if (sismoConnectResponse === null) {
      return new Response('Invalid JSON in request body', { status: 400 });
    }
    
    console.log('claimApi')
    const result:SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
      
      auths: [{ authType: AuthType.GITHUB,isOptional:true }],
      claims: [{
        groupId: "0xda1c3726426d5639f4c6352c2c976b87",
      },
      {
        groupId: "0x1cde61966decb8600dfd0749bd371f12",
        claimType: ClaimType.GTE,
        value: 15, // dhadrien.sismo.eth has a score of 46, eligible. Can reveal more.
        isSelectableByUser: true, // can reveal more than 15 if they want
      },]
      
    });

    if (result) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
    
  }
  catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    return new Response(errorMessage, { status: 500 })}
}
