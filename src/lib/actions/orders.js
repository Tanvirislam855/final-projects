'use server'
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation"

export const updateOrderStatus = async (id, status) => {
    const res = await serverMutation(`/seller-order-status?id=${id}&orderStatus=${status}`, null, 'PATCH');
    revalidatePath('/dashboard/seller/orders')
    return res
}


export const updateOrderStatusByAdmin = async (data) => {
    const res = await serverMutation(`/update-order-status`, data, 'PATCH');
    revalidatePath('/dashboard/admin/orders');
    return res;
}