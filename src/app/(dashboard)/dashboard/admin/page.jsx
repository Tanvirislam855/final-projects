import { getUserSession } from '@/lib/core/session';
import React from 'react';
import AdminOverview from '@/components/dashboard/admin/AdminOverview';
import { protectedFetch } from '@/lib/core/server';

const AdminPage = async () => {
    const user = await getUserSession();
      const dashboardData=await protectedFetch('/admin-dashboard');

    return (
        <div>
            <AdminOverview dashboardData={dashboardData}/>
        </div>
    );
};

export default AdminPage;