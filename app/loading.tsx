import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-primary/10" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}