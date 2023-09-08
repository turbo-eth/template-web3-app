// import { useSismoConnect } from "@sismo-core/sismo-connect-react"
// import { useState } from "react"


// export const useAuthRequest = ({selectedConfig = {}}) => {

//   const [response, setResponse] = useState({})
//   const [isLoading, setIsLoading] = useState<boolean>(false)

//   const { sismoConnect } = useSismoConnect({ selectedConfig });
//   const onAuthReponse = async() => {
//     setIsLoading(true)

    

//     // const response = await fetch("/api/sismo/auth", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({
        
//     //   }),
//     // })

//     // if (!response.ok) {
//     //   setIsLoading(false)
//     //   throw new Error(response.statusText)
//     // }

//     // const data = response.body
//     // if (!data) {
//     //   return
//     // }


    


//     setIsLoading(false)
//   }


//   return {
//     response,
//     isLoading,
//   }
// }