
import { SismoConnect, SismoConnectVerifiedResult, AuthType } from "@sismo-core/sismo-connect-server";
import { getConfig } from "../utils/getConfig";

export async function POST(req: Request) {

  try {
    const res = new Response()

    const config = getConfig('signature')
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
    
    // console.log('okreq',req)
    // console.log('resinapi',await req.json())
    console.log('signapi')
    // const info = await verifyAuth(sismoConnectResponse)



    const result:SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
      
      signature:{ message: "I vote Yes to Privacy workworkwokrokwr",isSelectableByUser: true, },

      
    });



    console.log('result',result)

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
