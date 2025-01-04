'use client';

import { Product } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PaginationControls } from './pagination-controls';
import { ProductGridSkeleton } from './product-skeleton';
import { ProductCard } from './ui/product-card';

interface ProductGridProps {
  initialProducts: Product[];
  totalPages: number;
  currentPage: number;
}

export function ProductGrid({ 
  initialProducts,
  totalPages,
  currentPage: initialPage
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchProducts = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Ensure page is within valid range
      if (page < 1 || page > totalPages) {
        throw new Error('Invalid page number');
      }

      const response = await fetch(`/api/products?page=${page}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Invalid data format received');
      }

      setProducts(data.products);
      setCurrentPage(page);
      
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`/products?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [router, searchParams, totalPages]);

  const handlePageChange = useCallback((page: number) => {
	console.log("page changed", page)
    if (page === currentPage || page < 1 || page > totalPages) return;
	router.push(`/products?page=${page}`, { scroll: false });
  }, [currentPage, totalPages]);

  const createPageUrl = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/products?${params.toString()}`;
  }, [searchParams]);

  useEffect(() => {
    setProducts(initialProducts);
    setCurrentPage(initialPage);
    setError(null);
  }, [initialProducts, initialPage]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <p className="text-destructive">{error}</p>
        <button 
          onClick={() => fetchProducts(currentPage)}
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={loading}
          createPageUrl={createPageUrl}
        />
      </div>
    </div>
  );
}