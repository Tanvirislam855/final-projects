import React from 'react';
import ManageOrders from '@/components/dashboard/admin/ManageOrders';

export const metadata = {
  title: 'Manage Orders | Admin Dashboard',
  description: 'Monitor orders, update delivery status, and resolve transaction disputes.',
};

export default function AdminOrdersPage() {
  return (
    <div>
      <ManageOrders />
    </div>
  );
}
