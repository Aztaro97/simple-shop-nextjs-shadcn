import { ProductGrid } from '@/components/product-grid';
import { ProductGridSkeleton } from '@/components/product-skeleton';
import { getProducts } from '@/lib/services/products';
import { Suspense } from 'react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page || '1');
  
    const { products, totalPages, currentPage } = await getProducts(page);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid 
            initialProducts={products}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    );
}