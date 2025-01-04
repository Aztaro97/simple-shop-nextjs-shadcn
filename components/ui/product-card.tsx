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
          <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
            <div className="aspect-square w-full">
              <Image
                src={product.image}
                alt={product.title}
                width={700}
                height={700}
                className="object-contain w-full h-full transition-transform group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
				priority
              />
            </div>
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