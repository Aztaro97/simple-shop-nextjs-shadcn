import { ProductGrid } from '@/components/product-grid';
import { ProductGridSkeleton } from '@/components/product-skeleton';
import { getProducts } from '@/lib/services/products';
import { Suspense } from 'react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const page = await (await searchParams).page;
	const currentPage = Number(page) || 1;
  
  const { products, totalPages, currentPage: returnedPage } = await getProducts(currentPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid 
          initialProducts={products}
          totalPages={totalPages}
          currentPage={returnedPage}
        />
      </Suspense>
    </div>
  );
}