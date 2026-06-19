import { serverFetch } from "../core/server"

export const loadProductByCategory=async(category)=>{
    const url=category ? `/api/products?category=${category}` : '/api/products'
    const res=await serverFetch(url);
    return res
}