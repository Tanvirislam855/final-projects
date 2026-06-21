import React from 'react';
import AdminAnalytics from '@/components/dashboard/admin/AdminAnalytics';

export const metadata = {
  title: 'Platform Analytics | Admin Dashboard',
  description: 'View user activity charts, order volumes, and category sales splits.',
};

export default async function AdminAnalyticsPage() {

  
  return (
    <div>
      <AdminAnalytics />
    </div>
  );
}
