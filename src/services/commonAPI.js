import axios from "axios"




export const commonAPI= async (httpmethod,url,reqBody)=>{
    let reqConfig={
        method: httpmethod,
        url,
        data: reqBody,
        Headers:{
            "content-Type":"application/json"
        }
    }
   return await axios(reqConfig).then((result)=>{
    return result
   }).catch((err)=>{
    return err
   })
}