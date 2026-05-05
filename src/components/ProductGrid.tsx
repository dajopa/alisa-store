import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  emphasizeDiscount?: boolean;
};

export function ProductGrid({ products, emphasizeDiscount }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          index={i}
          emphasizeDiscount={emphasizeDiscount}
        />
      ))}
    </div>
  );
}
