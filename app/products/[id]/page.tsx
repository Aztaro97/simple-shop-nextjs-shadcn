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
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id
  const product = await getProduct(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">← Back to Products</Link>
        </Button>
      </div>
      <Card className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative bg-gray-100 rounded-lg">
            <div className="aspect-square w-full">
              <Image
                src={product.image}
                alt={product.title}
                width={800}
                height={800}
                className="object-contain w-full h-full"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
				unoptimized
              />
            </div>
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
            <div className="space-y-4 mt-20">
              <AddToCartButton product={product} className="w-full" size="lg" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}