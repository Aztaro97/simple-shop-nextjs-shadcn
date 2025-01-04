'use client';

import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '../add-to-cart-button';
import { Card, CardContent, CardFooter } from './card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			  unoptimized
            />
          </div>
          <div>
            <h3 className="font-semibold line-clamp-2 mb-2">{product.title}</h3>
            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="mt-auto p-4">
        <AddToCartButton product={product} className="w-full" />
      </CardFooter>
    </Card>
  );
}