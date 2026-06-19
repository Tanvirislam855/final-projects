import Link from "next/link";
import { loadProductByCategory } from "@/lib/api/product";
import ProductCard from "@/components/shared/ProductCard";
import { getUserSession } from "@/lib/core/session";
import { Package, ArrowLeft, SearchX } from "lucide-react";
import categories from "@/lib/data/categories";

export default async function CategoryProductsPage({ params }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    const validCategory = categories.find(
        (c) => c.title.toLowerCase() === decodedCategory.toLowerCase()
    );

    if (!validCategory) {
        return (
            <div className="container mx-auto py-20 px-4">
                <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                    <div className="p-4 rounded-full mb-4" style={{ background: "rgba(62,95,71,0.08)" }}>
                        <SearchX className="w-10 h-10" style={{ color: "#3E5F47" }} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Category Not Found
                    </h1>
                    <p className="text-muted-foreground text-sm mb-8">
                        We couldn&apos;t find the category &quot;{decodedCategory}&quot;. Browse all categories to find what you&apos;re looking for.
                    </p>
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
                            boxShadow: "0 4px 16px rgba(62,95,71,0.3)",
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Browse Categories
                    </Link>
                </div>
            </div>
        );
    }

    const { products } = await loadProductByCategory(decodedCategory);
    const user = await getUserSession();

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl" style={{ background: "rgba(62,95,71,0.1)" }}>
                    <Package className="w-5 h-5" style={{ color: "#3E5F47" }} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight capitalize">
                    {decodedCategory}
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                {products?.length || 0} {products?.length === 1 ? "product" : "products"} found
            </p>

            {!products || products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
                    <div className="p-4 rounded-full mb-4" style={{ background: "rgba(62,95,71,0.08)" }}>
                        <Package className="w-10 h-10" style={{ color: "#3E5F47" }} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        No Products Found
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8">
                        There are no products in &quot;{decodedCategory}&quot; yet. Check back later or browse other categories.
                    </p>
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
                            boxShadow: "0 4px 16px rgba(62,95,71,0.3)",
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Browse Categories
                    </Link>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}