import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session";

export const wishList=async()=>{
    const user=await getUserSession();
    const res=await serverFetch(`/api/wish-list?userId=${user?.id}`)
    return res;
}