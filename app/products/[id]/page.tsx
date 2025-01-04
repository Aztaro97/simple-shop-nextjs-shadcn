import { AddToCartButton } from '@/components/add-to-cart-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getProduct, getProducts } from '@/lib/services/products';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  try {
    const { products } = await getProducts();
    return products.map((product: any) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">← Back to Products</Link>
        </Button>
      </div>
      <Card className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.rating.rate)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="space-y-4">
              <AddToCartButton product={product} className="w-full" size="lg" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}