import React from 'react';
import ManageUsers from '@/components/dashboard/admin/ManageUsers';
import { protectedFetch } from '@/lib/core/server';

export const metadata = {
  title: 'Manage Users | Admin Dashboard',
  description: 'Control user permissions, block/unblock, and delete platform accounts.',
};

export default async function AdminUsersPage() {
  const users=await protectedFetch('/users');
  
  
  return (
    <div>
      <ManageUsers users={users}/>
    </div>
  );
}
