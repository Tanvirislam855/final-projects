import React from 'react';
import ManageProducts from '@/components/dashboard/admin/ManageProducts';

export const metadata = {
  title: 'Manage Products | Admin Dashboard',
  description: 'Moderate product listings, approve requests, and review user complaints.',
};

export default function AdminProductsPage() {
  return (
    <div>
      <ManageProducts />
    </div>
  );
}
