'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { ButtonProps } from '@/components/ui/button';

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
}

export function AddToCartButton({ product, ...props }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCartStore();
  const inCart = isInCart(product.id);

  return (
    <Button
      onClick={() => addToCart(product)}
      variant={inCart ? "secondary" : "default"}
      {...props}
    >
      {inCart ? 'Added to Cart' : 'Add to Cart'}
    </Button>
  );
}