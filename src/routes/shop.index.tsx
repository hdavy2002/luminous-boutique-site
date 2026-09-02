import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All Fine Jewellery | Aurelle Melbourne" },
      {
        name: "description",
        content:
          "Browse the full Aurelle collection of solid 18ct gold necklaces, rings, earrings and bracelets, hand-finished in Melbourne. AUD pricing, free insured delivery.",
      },
      { property: "og:title", content: "Shop All Fine Jewellery | Aurelle" },
      {
        property: "og:description",
        content: "Solid 18ct gold fine jewellery, hand-finished in Melbourne.",
      },
    ],
  }),
  component: ShopIndex,
});

function ShopIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow text-muted-foreground">The collection</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95]">Everything we make</h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Eight core pieces, cast in solid recycled 18ct gold. We keep the range small on purpose —
          every piece earns its place.
        </p>
      </header>

      <nav className="mt-10 flex flex-wrap gap-3">
        <span className="border border-foreground px-5 py-2 text-xs tracking-[0.14em] uppercase">
          All
        </span>
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/shop/$category"
            params={{ category: c.slug }}
            className="border border-border px-5 py-2 text-xs tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-foreground hover:text-foreground"
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
