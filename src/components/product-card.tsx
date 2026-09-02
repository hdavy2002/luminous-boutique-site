import { Link } from "@tanstack/react-router";

import { formatAUD, type Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
      style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
    >
      <div className="relative overflow-hidden rounded-sm bg-sand">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1200}
          height={1504}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-[0.95rem] leading-snug">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.tagline}</p>
        </div>
        <p className="text-sm whitespace-nowrap">{formatAUD(product.price)}</p>
      </div>
    </Link>
  );
}
