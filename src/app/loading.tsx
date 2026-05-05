import { ProductSkeletonGrid } from "@/components/ProductSkeletonGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1600px] bg-white px-4 py-28 sm:px-6 lg:px-10">
      <div className="mb-14 h-12 max-w-md animate-pulse rounded bg-gradient-to-r from-violet-muted/25 via-violet-muted/10 to-lime-brand/20" />
      <ProductSkeletonGrid />
    </div>
  );
}
