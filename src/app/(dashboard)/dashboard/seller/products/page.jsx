import { protectedFetch } from '@/lib/core/server';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import MyProductsPage from './MyProductsPage';

const ProductDashboard = async ({searchParams}) => {
    const params=await searchParams
    console.log(params);
    
    const user = await getUserSession();
    const productData = await protectedFetch(`/api/seller-product?id=${user.id}&search=${params.search || ""}&category=${params.category || ""}&status=${params.status || ""}`)
    
    
    return (
        <div>
            <MyProductsPage productData={productData}/>
        </div>
    );
};

export default ProductDashboard;