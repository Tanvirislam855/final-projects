import React from 'react';
import ManageProducts from '@/components/dashboard/admin/ManageProducts';
import { serverFetch } from '@/lib/core/server';
import ProductsPagination from '@/components/shared/ProductsPagination';
import DashboardPagination from '@/components/shared/DashboardPagination';

export const metadata = {
  title: 'Manage Products | Admin Dashboard',
  description: 'Moderate product listings, approve requests, and review user complaints.',
};

export default async function AdminProductsPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const url = `/api/products?page=${currentPage}`
  const { products, totalPage } = await serverFetch(url);

  // { products, totalPage }
  
  return (
    <div>
      <ManageProducts products={products}/>
      <div className="mt-5">
        <DashboardPagination
                currentPage={currentPage}
                totalPage={totalPage}
              />
      </div>
    </div>
  );
}
