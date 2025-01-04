import { Card, CardContent, CardFooter } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function ProductSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4">
        <Skeleton className="aspect-square w-full mb-4" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="mt-auto p-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}