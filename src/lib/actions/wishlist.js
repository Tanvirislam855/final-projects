import { serverMutation } from "../core/serverMutation"

export const addToWishList=async(data)=>{
    const res=await serverMutation('/api/wish-list',data)
    return res;
}