import { Product } from '@/lib/types';

export async function getProducts(page: number = 1, limit: number = 6) {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) throw new Error('Failed to fetch products');
  
  const products = await res.json();
  const totalProducts = products.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    products: products.slice(startIndex, endIndex),
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page
  };
}

export async function getProduct(id: string): Promise<Product> {
  if (!id) throw new Error('Product ID is required');

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }

  const product = await res.json();
  return product;
}