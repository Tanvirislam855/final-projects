import React from 'react';
import ManageOrders from '@/components/dashboard/admin/ManageOrders';
import { protectedFetch } from '@/lib/core/server';

export const metadata = {
  title: 'Manage Orders | Admin Dashboard',
  description: 'Monitor orders, update delivery status, and resolve transaction disputes.',
};

export default async function AdminOrdersPage() {
  const orderData=await protectedFetch(`/all-orders`);
  console.log(orderData);
  
  return (
    <div>
      <ManageOrders orderData={orderData}/>
    </div>
  );
}
