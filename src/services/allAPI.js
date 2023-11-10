import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"


//api to upload video
export const uploadAllvideo = async(reqBody)=>{
   return await commonAPI('POST',`${serverURL}/videos`,reqBody)
}
 
//api to get all video
 
export const getAllvideos=async()=>{
   return await commonAPI('GET',`${serverURL}/videos`,"")
}
//api to delete a video
export const deleteVideos=async(id)=>{
   return await commonAPI('DELETE',`${serverURL}/videos/${id}`,"{}")
}

//add watch history

export const addToHistory=async(videoDetails)=>{
   return await commonAPI('POST',`${serverURL}/history`,videoDetails)

}

//to get data from the history
export const getAllHistory=async()=>{
   return await commonAPI('GET',`${serverURL}/history`,"")
}

// api to delete History
export const deleteHistory=async(id)=>{
   return await commonAPI('DELETE',`${serverURL}/history/${id}`,{})
}

//api to Add category
export const addToCategories=async(body)=>{
   return await commonAPI('POST',`${serverURL}/category`,body)

}
//api to get all category
export const getAllCategory=async()=>{
   return await commonAPI('GET',`${serverURL}/category`,"")
}

// api to delete Category
export const deleteCategory=async(id)=>{
   return await commonAPI('DELETE',`${serverURL}/category/${id}`,{})
}

//api to get a value
export const getAnVideo=async(id)=>{
   return await commonAPI('GET',`${serverURL}/videos/${id}`,"")
}

//api call to update the category
export const updateCategory=async(id,body)=>{
  return await commonAPI('PUT',`${serverURL}/category/${id}`,body)
}