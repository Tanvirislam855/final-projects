import ProductDetailsPage from '@/components/shared/ProductDetails';
import { serverFetch } from '@/lib/core/server';
import { getUserSession } from '@/lib/core/session';

const ProductDetails = async ({ params }) => {
    const { id } = await params;

    const [productDetails, user] = await Promise.all([
        serverFetch(`/api/product/${id}`),
        getUserSession()
    ])

    return (
        <div>
           <ProductDetailsPage product={productDetails} user={user} />
        </div>
    );
};

export default ProductDetails;