import { serverMutation } from "../core/serverMutation"

export const addProducts=async(data)=>{
    const res=await serverMutation('/api/products',data)
    return res
}