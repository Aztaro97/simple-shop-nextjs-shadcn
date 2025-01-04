import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Welcome to Our <span className="text-primary">Store</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of products with amazing deals and exceptional quality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="group">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/products?featured=true">
              Featured Items
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
